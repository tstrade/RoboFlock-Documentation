Getting Started
===============

Installation
^^^^^^^^^^^^

- `ROS2 <humbledownload_>`_

- `RoboFlock GitHub Repository <roboflockrepo_>`_

- System Configuration

RoboFlock uses a number of USB connections, which is convenient in terms of wiring, but the approach must be treated with caution. When a device is plugged in, there is no gaurantee that the Link user device manager (:code:`udev`) will assign the same name to a device each time it is plugged in. 

.. code-block:: bash

    

Example:

.. code-block::

    SUBSYSTEM=="tty", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", ATTRS{serial}=="A10LVY3A", SYMLINK+="arduino_usb"

User Manual
^^^^^^^^^^^

- Setup

- Usage

- Maintenance



.. _humbledownload: https://docs.ros.org/en/humble/Installation.html

.. _roboflockrepo: https://github.com/shouvik-d/RoboFlock