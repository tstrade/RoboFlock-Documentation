Nvidia Jetson Orin Nano Super Developer Kit
===========================================

.. include:: ../_templates/constants.rst


Motivation
^^^^^^^^^^

In the alpha design, four Teensy 4.1s were used to process and transmit sensor data. At the time this was written, one Teensy 4.1 goes for ~$35, putting the cost to about $150. For comparison, the Nvidia Jetson Orin Nano is ~$250. The increase in price is worth it, and here's how:

- *Computational power*: The Teensy 4.1 is not powerful enough to run ROS2. As such, much of the previous codebase was built from scratch, with other portions consisting of modified versions of existing libraries. This is a patchwork solution to a complex problem.

- *Synchronization*: Dealing with real-time systems that need to react quickly and accurately relies on solid communication. Passing sensor data and other processed signals around multiple microcontrollers introduces race conditions (timing issues) that can ruin the system. 

- *Interfaces*: The Jetson not only supplies the same communication protocols as the Teensy 4.1 through its 40-pin expansion header (UART, SPI, I2S, I2C, and GPIO), it also has four USB-A ports and one USB-C port that make interacting with peripheral devices, such as an additional Arduino, much easier and cleaner (less wires!).


The Nvidia Jetson Orin Nano is an affordable, yet powerful, mini-computer that will act as the brains of this operation. The Jetson boasts a powerful 6-core Arm Cortex 64-bit CPU, a GPU with 1024 CUDA cores and 32 tensor cores, and 8GB of low-power DDR5 RAM. Further details are shown in Figure 2.1 below. 

Additionally, the new RoboFlock design makes use of the Jetson’s carrier board that provides a  connections, as well as other useful features shown in Figure 2.2 below. Almost all the hardware in the new design makes use of this expansion header. To accommodate the overlap in protocols that the design requires, an Arduino Nano will be used as essentially another expansion header. More details about these connections are given Table 1 below.

Although this seems like overkill (and it probably is), using the Jetson leaves ample space for future teams to implement more advanced hardware such as 4-D LiDAR sensors, cameras, L5 GPS modules, or other solutions that have not yet been considered. The current motivation is centered on the software frameworks that are used in the design. The Jetson’s embedded Linux environment provides the new RoboFlock design with the ability to process data and synchronize communication using ROS2, a set of software libraries and tools for building robot applications. 



Hardware Specifications
^^^^^^^^^^^^^^^^^^^^^^^

.. figure:: ../_images/fig2-1_jetson_block_diagram.png
    :align: center
    :width: 50%
    :loading: link

    Figure 2-1: Jetson Orin Nano Block Diagram (citation here)

.. figure:: ../_images/fig2-2_jetson_carrier_connections.png
    :align: center
    :width: 50%
    :loading: link

    Figure 2-2: Jetson Orin Nano Carrier Board Connections

.. @todo: Update connections

Table 1: Pins Used on the Carrier Board's 40-Pin Expansion Header

+-------+------------+---------------------+----------------------+
| Pin # | Name       | Connection          | Comments             |
+=======+============+=====================+======================+
|   1   | 3.3V Power | Power Bus           |                      |
+-------+------------+---------------------+----------------------+
|   2   | 5V Power   | Power Bus           |                      |
+-------+------------+---------------------+----------------------+
|   3   | I2C1_SDA   | MAX17048 SDA        | Power Guage          |
+-------+------------+---------------------+----------------------+
|   5   | I2C1_SCL   | MAX17048 SCL        | Power Guage          |
+-------+------------+---------------------+----------------------+
|   6   | GND        | Ground Bus          |                      |
+-------+------------+---------------------+----------------------+
|   8   | UART1_TXD  | HC-12.1a RXD        | GPS Error Correction |
+-------+------------+---------------------+----------------------+
|  10   | UART1_RXD  | HC-12.1a TXD        | GPS Error Correction |
+-------+------------+---------------------+----------------------+
|  15   | GPIO12     | ESC PWM Signal      | Drive System         |
+-------+------------+---------------------+----------------------+
|  27   | I2C0_SDA   | NEO-M8P Pin 18      | GPS Coordinates      |
+-------+------------+---------------------+----------------------+
|  28   | I2C0_SCL   | NEO-M8P Pin 19      | GPS Coordinates      |
+-------+------------+---------------------+----------------------+
|  29   | GPIO01     | Arduino Nano Pin 16 | Sonar 1              |
+-------+------------+---------------------+----------------------+
|  30   | GND        | Ground Bus          |                      |
+-------+------------+---------------------+----------------------+
|  31   | GPIO11     | Arduino Nano Pin 15 | Sonar 2              |
+-------+------------+---------------------+----------------------+
|  32   | GPIO7      | INJ5235 PWM Signal  | Steering System      |
+-------+------------+---------------------+----------------------+
|  33   | GPIO13     | Arduino Nano Pin 14 | Sonar 3              |
+-------+------------+---------------------+----------------------+

**Datasheet:** :raw-html:`<br />`
`NVIDIA Jetson Orin Nano Series Modules: Ampere GPU + Arm Cortex-A78AE CPU + LPDDR5 Data Sheet <nvidia_>`_

**Features:** :raw-html:`<br />`


**Connection:** :raw-html:`<br />`


**Interfacing:** :raw-html:`<br />`


**Dimensions:** :raw-html:`<br />`


**Use-Case:** :raw-html:`<br />`




.. _nvidia: https://developer.download.nvidia.com/assets/embedded/secure/jetson/orin_nano/docs/Jetson-Orin-Nano-Series-Modules-Datasheet_DS-11105-001_v1.7.pdf?__token__=exp=1773603870~hmac=a5ab250a60add7ab6548a64051da8d337176d999af47904c3690beb59c7a2bad&t=eyJscyI6IndlYnNpdGUiLCJsc2QiOiJkZXZlbG9wZXIubnZpZGlhLmNvbS9sb2dpbiJ9