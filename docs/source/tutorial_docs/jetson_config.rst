Setting up the Nvidia Jetson Orin Nano
======================================

*This document is based entirely on the* `Jetson Orin Nano Developer Kit Getting Started Guide <gettingstarted_>`_ *, and is included here for convenience. All credit belongs to Nvidia.*

Before getting started, make sure you have the following items:

- 64+ GB microSD card (and adapter if host PC does not have a built-in SD card slot)

- USB keyboard and mouse

- Computer display and DisplayPort cable

- USB cable

Update Firmware usind SDK Manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. On an x86 PC running Ubuntu 22.04 or 20.04, install Nvidia's SDK Manager. 

**For Ubuntu 22.04**

.. code-block:: console

    $ wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
    $ sudo dpkg -i cuda-keyring_1.1-1_all.deb
    $ sudo apt-get update
    $ sudo apt-get -y install sdkmanager

**For Ubuntu 20.04**

.. code-block:: console

    $ wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
    $ sudo dpkg -i cuda-keyring_1.1-1_all.deb
    $ sudo apt-get update
    $ sudo apt-get -y install sdkmanager

Then launch SDK Manager:

.. code-block:: console

    $ sdkmanager

*If using using SDK Manager for the first time, log in with Nvidia Developer credientials and check "Stay logged in", then click "LOGIN"*


2. Connect either the microSD card or NVMe SSD to the host PC. 

3. Put the Jetson in recovery mode by shorting ``pin 9`` and ``pin 10`` of ``J14`` with a jumper pin or paper clip, then insert the DC power supply plug into the DC jack of the carrier board to power it on.

4. On the SDK Manager, select the target hardware and click "OK," then uncheck the host machine and click "Continue"

5. Uncheck all software components except for **"Jetson Linux"** and accept the terms and conditions of the license agreements, then click **"Continue"** and wait for the next prompt to appear.

6. Once the flashing prompt appears, select **"Runtime"** for the OEM Configuration and select the storage type (NVMe SSD or microSD), then click **"Flash"** and wait for the process to complete.

7. Remove the jumper pin or paper clip from the header and connect I/O devices to the Jetson Orin Nano (DisplayPort cable, USB keyboard and mouse). Unplug the power supply and put back in, then finish the software setup with ``oem-config``



Write Image to the microSD Card (Etcher Method)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Download the Jetson Orin Nano Developer Kit SD Card image from `JetPack SDK Page <jpsdk_>`_

2. Write the image to your microSD card by following the instructions below (if using Windows or Mac, click `here <writesd_>`_ for instructions).

    a. Download, install, and launch `balenaEtcher <etcher_>`_

    b. Click "Select image" and choose the zipped image file downloaded earlier

    c. Insert the microSD card and ensure that it is listed as the target device, then click **"Flash!"**

    d. After Etcher finishes, properly eject the microSD card and then physically remove from the host PC



Write Image to the microSD Card (Terminal Method)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

.. _jpsdk: https://developer.nvidia.com/embedded/jetpack

.. _writesd: https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit#write

.. _etcher: https://etcher.balena.io/

