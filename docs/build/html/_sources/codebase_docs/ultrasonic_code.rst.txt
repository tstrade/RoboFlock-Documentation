Ultrasonic Sensor Code
======================

Custom Data Packet
^^^^^^^^^^^^^^^^^^

+-------+---------+-----------+-----------+-------------+----------+------------+------+
| START | LEFT_ID | LEFT_DATA | CENTER_ID | CENTER_DATA | RIGHT_ID | RIGHT_DATA | STOP |
+=======+=========+===========+===========+=============+==========+============+======+
| 0xCA  | 0xD3    | 0x--      | 0xD5      | 0x--        | 0xD7     | 0x--       | 0xCB |
+-------+---------+-----------+-----------+-------------+----------+------------+------+


USB Configuration
^^^^^^^^^^^^^^^^^
- /dev/
- termios
- Baud rate (cfsetispeed/cfsetospeed)
- Control modes
- Raw/non-canonical mode
    - Input modes
    - Output modes
    - Local modes
- Special
- tcsetattr


Reading and Writing
^^^^^^^^^^^^^^^^^^^
- open/close
- tcflush
- writing/reading
- arduino code


Ultrasonic Publisher
^^^^^^^^^^^^^^^^^^^^
- inits (usb, msg type, topic name)
- callback
- data filtering
- QoS


https://man7.org/linux/man-pages/man3/termios.3.html

