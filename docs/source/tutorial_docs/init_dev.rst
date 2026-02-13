Initializing RoboFlock (Developers)
===================================

Installing ROS2

Roboflock Repo

Managing USB Devices
^^^^^^^^^^^^^^^^^^^^

RoboFlock reads from multiple USB devices and it is important that these do not get mixed up. When a USB device is plugged in, Linux adds an entry for the device to the :code:`/dev/` directory and gives it a name such as :code:`/dev/ttyUSB0`. The issue here is that we can't guarantee that our devices will be given the same entry name everytime. The solution is to create a Udev rule that assigns a *symbolic link* to the device based on details such as the product ID. 

To do this, first plug in the device and find its entry name by either manually checking the :code:`/dev/` directory, or by running the command :code:`dmesg | grep ttyUSB*`. Next, we need to grab some identifiers about the USB device. To do this, run the following using the appropriate name for your device:

.. code-block:: console

    $ udevadm info --name=/dev/ttyUSB0 --attribute-walk

You can either scroll through the output or use the command :code:`grep` to find the correct values from :code:`ATTRS{idVendor}=="xxxx"`, :code:`ATTRS{idProduct}=="yyyy"`, and :code:`ATTRS{serial}="zzzzzzzz"`. Now we can write our custom rule for the USB device. Create the rules file:

.. code-block:: console

    $ sudo gedit /etc/udev/rules.d/99-my-serial.rules

and write the following content: 

    SUBSYSTEM=="tty", ATTRS{idVendor}=="xxxx", ATTRS{idProduct}=="yyyy", ATTRS{serial}=="zzzzzzzz", SYMLINK+="my_usb"


Configuring the 40-Pin Header
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Graphical User Interface**

.. code-block:: console

    $ sudo /opt/nvidia/jetson-io/jetson-io.py

Export as Device-Tree Overlay (DTBO) - stores file in :code:`/boot/` directory


**Command Line Interface**

.. code-block:: console

    # Display current config >> config-by-pin.py [<options>]

    # Ex.) Display config of pin 10 on expansion header 2
    $ sudo /opt/nvidia/jetson-io/config-by-pin.py -p 10 -n 2

    # Displays and configures I/O functions >> config-by-function.py [<options>]

    # Ex.) Create new overlay with header pin 1 configured 
    #   for i2s4/spi1 and header pin 2 configured for dmic2
    $ sudo /opt/nvidia/jetson-io/config-by-function.py -o dtbo 1="i2s4 spi1" 2=dmic2

    # Displays and configures hardware modules >> config-by-hardware.py [<options>]

    # Ex.) Configure header pin 1 for the Adafruit SPH0645LM4H
    $ sudo /opt/nvidia/jetson-io/config-by-hardware.py -n 1="Adafruit SPH0645LM4H"


**Device Tree Overlays**

Device tree overlay files (:code:`.dtbo` files) allow for custom hardware support and must define the following properties:

- :code:`overlay-name`: Unique name to distinguish overlay from others

- :code:`jetson-header-name`: Associates device with the following hardware:

    - *40-Pin Expansion Header* = "Jetson 40pin Header"

    - *M.2 Key E Slot* = "Jetson M.2 Key E Slot"

    - *CSI Connector* = "Jetson AGX Xavier CSI Connector"

- :code:`compatible`: Indicates which Jetson modules and carrier board the overlay supports. The correct string for your device can be found using the command :code:`cat /sys/firmware/devicetree/base/compatible`, or see here for the `complete table of valid property values <jetsonheaders_>`_.






.. _jetsonheaders: https://docs.nvidia.com/jetson/archives/r35.3.1/DeveloperGuide/text/HR/ConfiguringTheJetsonExpansionHeaders.html