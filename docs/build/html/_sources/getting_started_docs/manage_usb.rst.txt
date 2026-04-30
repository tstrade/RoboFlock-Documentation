====================
Managing USB Devices
====================

RoboFlock reads from multiple USB devices and it is important that these do not get mixed up. When a USB device is plugged in, Linux adds an entry for the device to the :code:`/dev/` directory and gives it a name such as :code:`/dev/ttyUSB0`. The issue here is that we can't guarantee that our devices will be given the same entry name everytime. The solution is to create a Udev rule that assigns a *symbolic link* to the device based on details such as the product ID. 

To do this, first plug in the device and find its entry name by either manually checking the :code:`/dev/` directory, or by running the command :code:`dmesg | grep ttyUSB*`. Next, we need to grab some identifiers about the USB device. To do this, run the following using the appropriate name for your device:

.. code-block:: console

    $ udevadm info --name=/dev/ttyUSB0 --attribute-walk

You can either scroll through the output or use the command :code:`grep` to find the correct values from :code:`ATTRS{idVendor}=="xxxx"`, :code:`ATTRS{idProduct}=="yyyy"`, and :code:`ATTRS{serial}="zzzzzzzz"`. Now we can write our custom rule for the USB device. Create the rules file:

.. code-block:: console

    $ sudo gedit /etc/udev/rules.d/99-my-serial.rules

and write the following content: 

.. code-block:: text

    SUBSYSTEM=="tty", ATTRS{idVendor}=="xxxx", ATTRS{idProduct}=="yyyy", ATTRS{serial}=="zzzzzzzz", SYMLINK+="my_usb"