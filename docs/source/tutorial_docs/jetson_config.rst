Setting up the Nvidia Jetson Orin Nano
======================================

*This document is based entirely on the* `Jetson Orin Nano Developer Kit Getting Started Guide <gettingstarted_>`_ *, and is included here for convenience. All credit belongs to Nvidia.*

Before getting started, make sure you have the following items:

- 64+ GB microSD card (and adapter if host PC does not have a built-in SD card slot)

- USB keyboard and mouse

- Computer display and DisplayPort cable

- USB cable


Write Image to the microSD Card
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Open the terminal and insert the microSD card, then enter the following command:

.. code-block:: console

    $ dmesg | tail | awk '$3 == "sd" {print}'

*For example, the microSD card may be assigned as** ``/dev/sda``

2. Write the zipped SD card image to the microSD card using the following command:

.. code-block:: console

    $ /usr/bin/unzip -p ~/Downloads/jetson_nano_devkit_sd_card.zip | sudo /bin/dd of=/dev/sd<x> bs=1M status=progress

*Replace* ``/dev/sd<x>`` *with the proper name assigned to the microSD card*

3. Once the ``dd`` command finishes, eject the microSD card with the following command:

.. code-block:: console

    $ sudo eject /dev/sd<x>

*Replace* ``/dev/sd<x>`` *with the proper name assigned to the microSD card*

Then, physically removed the microSD card from the host PC.


.. note::

    Image flashing tools like `balenaEtcher <etcher_>`_ also work, but we prefer the terminal to relying on 3rd-party software.



Setup and First Boot
^^^^^^^^^^^^^^^^^^^^

1. Insert the microSD card (with the system image already written to it) into the slot on the underside of the Jetson Orin Nano

2. Power on the computer display and connect I/O devices (DisplayPort cable, USB keyboard and mouse). Then connect the power supply to the Jetson Orin Nano Developer Kit.

3. A green LED next to the USB-C connect will light as soon as the developer kit powers on. Follow the initial setup:

    a. Review and accept Nvidia Jetson sofware EULA

    b. Select system language, keyboard layout, and time zone

    c. Connect to Wireless network

    d. Create username, password, and computer name

    e. Log in


The Nvidia Jetson Orin Nano is now properly setup! Continue to :doc:`init_dev` to set up the environment for ROS2 and RoboFlock.

.. _gettingstarted: https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit#intro

.. _jpsdk: https://developer.nvidia.com/downloads/embedded/l4t/r36_release_v4.3/jp62-orin-nano-sd-card-image.zip

.. _writesd: https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit#write

.. _etcher: https://etcher.balena.io/

