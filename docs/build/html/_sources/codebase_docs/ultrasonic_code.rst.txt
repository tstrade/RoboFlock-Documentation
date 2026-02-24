======================
Ultrasonic Sensor Code
======================

.. note::

    As with all code, there is likely a better way to execute this process. Through our own testing (and online Nvidia Jetson forums), we found that using the Jetson to directly control the ultrasonic sensors is not ideal. Additionally, that would be 6 pins on the Jetson's expansion header that could be better used elsewhere. Instead, the ultrasonic sensors are controlled with an Arduino Uno, which takes care of the data collection and preprocessing. Future iterations of RoboFlock may choose to exclude the ultrasonic sensors completely in lieu of more powerful sensors (See :doc:`Future Considerations <../future_considerations>`)

Since we are dealing with three separate ultrasonic sensors that are all sending data through a single USB cable, we are using a custom data packet to make sure that the Jetson is receiving complete and parseable messages from the Arduino. Here is the packet's structure:

+-------+---------+-----------+-----------+-------------+----------+------------+------+
| START | LEFT_ID | LEFT_DATA | CENTER_ID | CENTER_DATA | RIGHT_ID | RIGHT_DATA | STOP |
+=======+=========+===========+===========+=============+==========+============+======+
| 0xCA  | 0xD3    | 0x--      | 0xD5      | 0x--        | 0xD7     | 0x--       | 0xCB |
+-------+---------+-----------+-----------+-------------+----------+------------+------+

The bytes chosen to represent each field are first motivated by the fact that the ultrasonic sensors are meant as a backup for the LiDAR scanner, so we only care about closer values. A single byte gives a range of 0 to 255 centimeters. This is already more than we need, which is good because we also need to reserve at least 5 unique bytes to use as our field labels. We also reserve the byte :code:`0xFF` to represent out-of-range or invalid data, as well as the byte :code:`0xBE` our request message. As long as these contraints are met, the actual labels themselves are arbitrary.

The current cutoff is 200 centimeters, but if you want to maximize the distances that the Arduino will transfer, you can simply change the reserved bytes to :code:`0xF9 - 0xFF`. This works out to a new maximum distance of 248 centimeters.



+++++++++++++++++++
Reading and Writing
+++++++++++++++++++

When dealing with devices (USB, I2C, etc.), it is important to understand that in the Linux filesystem, *everything is a file or a directory*. This means that by using the Standard C Library, we can call functions like :code:`open()`, :code:`close()`, :code:`read()`, and :code:`write()` to interact with our USB device in the same we would with any other file. Check out `Linux Filesystem Hierarchy: Chapter 1 <dev_>`_ to learn more.

To start, we will need the absolute path to the device, which in our case is :code:`/dev/ttyACM0`. There are a few ways to figure this out, with the simplest being to just look at the entries in :code:`/dev/` before and after plugging in the USB device. The new entry, which usually falls with the other :code:`tty` devices, is the entry corresponding to the USB device. When using multiple USB ports, it's not guaranteed that a given device will be assigned the same filename each time its connected, so it's important to make sure you are actually interfacing with the correct one. Check out :doc:`Managing USB Devices <../tutorial_docs/init_dev>` to learn about assigned static names to your devices via symbolic links. 

The basic structure of interfacing with the Arduino via USB connection is as follows:

1. *Open* the file as read-write without it becoming the process's controlling terminal (`open(2) - Linux manual page <open_>`)

.. code-block:: cpp

    /* `O_RDWR` and `O_NOCTTY` are argument flags that we can use */
    /*   to specify access modes, file creation, and file status  */
    int fd = open ("/dev/ttyACM0", O_RDWR | O_NOCTTY);


2. *Write* the request message to the file (`write(2) - Linux manual page <write_>`)

.. code-block:: cpp

    /* Writes `sizeof(REQUEST)` bytes to the file     */
    /*  starting at the address provided by `REQUEST` */
    const unsigned char REQUEST[] = { 0xBE };
    int bytes_written = write (fd, REQUEST, sizeof (REQUEST));


3. *Read* the response message from the file (`read(2) - Linux manual page <read_>`)

.. code-block:: cpp

    /* Reads `sizeof(read_buf)` bytes from the file and stores */
    /*  them at the starting address provided by `read_buf`    */
    char read_buf[PACKETLEN];
    memset (read_buf, 0, sizeof (read_buf));
    int bytes_read = read (fd, read_buf, sizeof (read_buf));

        
4. *Close* the file so that the file descriptor may be reused (`close(2) - Linux manual page <close_>`)

.. code-block:: cpp

    close (fd)



+++++++++++++++++
USB Configuration
+++++++++++++++++

Since we are using our own request-receive protocol, we need to use the :code:`termios` structure to provide the means to control the asynchronous communications. It allows for the configuration of baud rates, I/O modes, timeouts, etc. In terms of the number of lines of code, the configuration is fairly simple. Most flags, or parameters, are a single bit or small bit field that can be set or unset via predefined masks given by the standard C library. We want complete control over the data movement, so it will mostly just be clearing default flags to put the device into *noncanonical mode*. Checkout `Serial Programming/termios <termios_>`_ and `termios(3) - Linux manual page <tty_>`_ to learn more.

The USB setup is as follows:

1. Set the baud rate for the input and output

.. code-block:: cpp

    /* `tty` is the name (arbitrarily) assigned to our `struct termios` */
    /* The I/O baud rates MUST match the Arduino's baud rate            */
    cfsetispeed (&tty, B9600);
    cfsetospeed (&tty, B9600);


2. Configure the control mode

.. code-block:: cpp

    /* Define a character to be 8 bits (remember, type size is not    */
    /*  necessarily standard across different systems, so be explicit */
    /* Enable receiving and ignore modem control lines                */
    tty.c_cflag = CS8 | CREAD | CLOCAL;


3. Configure the input, output, and local modes to be non-canonical

.. code-block:: cpp

    /* Non-canonical mode allows for characters to be immediately available */
    /*  instead of having to wait for a line-ending character, no input     */
    /*  processing is performed, and line editing is disabled               */
    tty.c_iflag = 0;
    tty.c_oflag = 0;
    tty.c_lflag = 0;


4. Define our own "end-of-line" parameters

.. code-block:: cpp

    /* `read()` will block until at least PACKETLEN (8) characters have */
    /*  been received, or until it hits the 0.5 second timeout          */
    tty.c_cc[VMIN] = PACKETLEN;
    tty.c_cc[VTIME] = 5;


5. Apply the new attributes 

.. code-block:: cpp

    /* `TCSANOW` applies the configuration immediately, and then we "flush" */
    /*  the internal filesystem buffer for our file descriptor just to make */
    /*  sure that there isn't garbage data sitting around                   */
    tcsetattr (fd, TCSANOW, &tty);
    tcflush (fd, TCIOFLUSH);



+++++++++++++++++++
Arduino Uno Control
+++++++++++++++++++

The code that actually controls the ultrasonic sensors is simple. The HC-SR04 is *triggered* by a digital pulse and then, based on the time it took for the ultrasonic waves to *echo*, outputs a digital pulse to the Arduino that can be used to find the distance of the detected object. Currently, a simple averaging filter is used on a set of samples to produce a less noisy sample for RoboFlock to use. Any data that surpasses our maximum distance of 200 centimeters is filtered out and marked with our "out-of-range" byte, :code:`0xFF`. 

The important part here is our main loop. A data packet containing samples from all 3 ultrasonic sensors is only built once per loop because it takes about 300-400 microseconds to collect and filter all the data. Then, we move to our request-receive system, which includes using the onboard LED to indicate whether or not the Arduino is waiting on a request. This all relies on just a few key functions from the Arduino's serial library, which you can read more about in the documentation: `Language Reference - Communication Functions <serial_>`_.

The main loop is as follows:

1. Wait for the Jetson to send the request byte

.. code-block:: cpp

    digitalWrite (LED_BUILTIN, HIGH);
    while (Serial.available () < 1)
    {
        delay (1);
    }
    digitalWrite (LED_BUILTIN, LOW);


2. Once the Jetson sends data, read until the buffer is empty (which realistically, should only be one byte, but better safe than sorry)

.. code-block:: cpp

    byte request = Serial.read ();
    while (Serial.available () > 0)
    {
        Serial.read ();
    }


3. If the request is valid, send the Jetson the new data packet

.. code-block:: cpp

    if (request == 0xBE)
    {
        Serial.write (BDP, PACKETLEN);
        Serial.flush ();
    }


++++++++++++++++++++
Ultrasonic Publisher
++++++++++++++++++++

The last part is to get the data published to RoboFlock's ROS2 workspace. Currently, there are 3 separate publishers contained in a single node. ROS2 provides a message type called :code:`sensor_msgs/msg/Range`, which you can read more about in :doc:`RoboFlock Topics <../tutorial_docs/roboflock_topics>`. The node first sets up the connection with the Arduino: if this fails, the ultrasonic publishers *do not get initialized*.  Upon success, the node logs its progress and then creates the three publishers and their corresponding topics. 

Each time :code:`UltrasonicPublisher::timer_callback()` runs, the Jetson sends a request to the Arduino Uno and receives the data packet, only creating a message for valid measurements. A :code:`sensor_msgs/msg/Range` message is defined by a timestamp, frame ID, radiation type (in this case, ULTRASOUND), field of view (in radians), minimum range (meters), maximum range (meters), and the distance data obtained from the corresponding ultrasonic sensor.

.. note::

    The Arduino sends the distance as an integer value with centimeters as the corresponding unit, whereas the ROS2 message uses a floating point value with meters as the corresponding unit. This conversion is made by the ROS2 node to maintain simplicity and minimal size in terms of our data packet; otherwise, the size of the data packet would quadruple!



.. _dev: https://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/dev.html

.. _open: https://man7.org/linux/man-pages/man2/open.2.html

.. _close: https://man7.org/linux/man-pages/man2/close.2.html

.. _read: https://man7.org/linux/man-pages/man2/read.2.html

.. _write: https://man7.org/linux/man-pages/man2/write.2.html

.. _termios: https://en.wikibooks.org/wiki/Serial_Programming/termios

.. _tty: https://man7.org/linux/man-pages/man3/termios.3.html

.. _serial: https://docs.arduino.cc/language-reference/en/functions/communication/serial/