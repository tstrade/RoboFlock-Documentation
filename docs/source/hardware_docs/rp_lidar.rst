RPLIDAR A1M8 Laser Range Scanner
================================

.. include:: ../_templates/constants.rst
    

**Datasheet:** :raw-html:`<br />`
`RPLIDAR A1 Low Cost 360 Degree Laser Range Scanner Introduction and Datasheet (Model A1M8) <rplidar_>`_


**Features:** :raw-html:`<br />`
0.15m to 12m Distance Range :raw-html:`<br />`
360° Angular Range :raw-html:`<br />`
8000Hz Sample Frequency


**Connection:** :raw-html:`<br />`

.. figure:: ../_images/fig3-2_lidar_usb_adapter.png
    :align: center
    :width: 50%
    :loading: link

    UART to USB Type-A Adapter


RPLiDAR A1 USB Adapter Pin Descriptions

+-----------+-------------+--------+-----------------------------+------+---------+---------+
| Interface | Signal Name | Type   | Description                 | Min  | Typical | Max     |
+===========+=============+========+=============================+======+=========+=========+
|           | 5V MOTO     | Power  | Power for RPLiDAR A1 Motor  | --   | 5V      | 9V      |
+           +-------------+--------+-----------------------------+------+---------+---------+
|           |             |        | Enable signal for           |      |         |         |
| Motor     | CTRL_MOTO   | Input  | RPLidAR A1 Motor/PWM        | 0V   | --      | 5V_MOTO |
| Interface |             |        | Control Signal              |      |         |         |
+           +-------------+--------+-----------------------------+------+---------+---------+
|           | GND_MOTO    | Power  | GND for RPLIDAR A1 Motor    | --   + 0V      | --      |
+-----------+-------------+--------+-----------------------------+------+---------+---------+
|           | VCC_5       | Power  | Power for RPLIDAR A1        | 4.9V | 5V      | 5.5V    |
|           |             |        | Range Scanner Core          |      |         |         |
+           +-------------+--------+-----------------------------+------+---------+---------+
|           | TX          | Output | Serial output for Range     | 0V   | --      | 5V      |
| Core      |             |        | Scanner Core                |      |         |         |
+ Interface +-------------+--------+-----------------------------+------+---------+---------+
|           | RX          | Input  | Serial input for Range      | 0V   | --      | 5V      |
|           |             |        | Scanner Core                |      |         |         |
+           +-------------+--------+-----------------------------+------+---------+---------+
|           | GND         | Power  | GND for RPLIDAR A1 Range    | --   | 0V      | V5.0    |
|           |             |        | Scanner Core                |      |         |         |
+-----------+-------------+--------+-----------------------------+------+---------+---------+


**Interfacing:** :raw-html:`<br />`
`Slametec RPLIDAR Public SDK for C++ <slamtec_>`_


**Dimensions:** :raw-html:`<br />`
96.8mm x 70.3mm x 70mm

.. figure:: ../_images/fig3-1_lidar_dims.png
    :align: center
    :width: 50%
    :loading: link


**Use-Case:** :raw-html:`<br />`
Detects obstacles and collects data for mapping RoboFlock's environment.



.. _slamtec: https://github.com/Slamtec/rplidar_sdk

.. _rplidar: https://cdn-shop.adafruit.com/product-files/4010/4010_datasheet.pdf