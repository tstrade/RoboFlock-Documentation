ODESC V4.2 Brushless Servo Motor Controller
===========================================

.. include:: ../_templates/constants.rst



**Datasheet (Firmware: ODrive v3.6):** :raw-html:`<br />`
`ODrive v3.6 Datasheet <odrive_docs_>`_

**Features:** :raw-html:`<br />`
**Microprocessor:** STM32F405RGT6 :raw-html:`<br />`
**Power:** 8V-24V DC input; 70A continuous / 120A peak current :raw-html:`<br />`
**Control Modes:** Position, Velocity, Torque, Current, and Trajectory Planning :raw-html:`<br />`
**Encoder Support:** Hall sensors, Incremental (AB/ABI), Absolute (SPI), and AMT102/103 :raw-html:`<br />`
**Interfaces:** USB-C, CAN, UART (ASCII), PWM, Step/Direction, and Analog Input :raw-html:`<br />`
**Thermal Design:** Integrated aluminum heat sink with high-current open skylight PCB design :raw-html:`<br />`
**Compatibility:** Software configuration compatible with ODriveTool, ROS, and Arduino :raw-html:`<br />`

**Connection:** :raw-html:`<br />`
*DC -* to 24V battery - (GND) :raw-html:`<br />`
*DC +* to 24V battery + (POWER) :raw-html:`<br />`
*A* to motor's 16AWG Green wire :raw-html:`<br />`
*B* to motor's 16AWG Blue wire :raw-html:`<br />`
*C* to motor's 16AWG Yellow wire :raw-html:`<br />`
*Hall* to motor's Hall sensor :raw-html:`<br />`

**Interfacing:** :raw-html:`<br />`
*USB-C* to Jetson *USB* :raw-html:`<br />`


**Dimensions:** :raw-html:`<br />`
63*58*30mm / 2.5*2.3*1.2 inches


**Use-Case:** :raw-html:`<br />`
Provides high-performance Field Oriented Control (FOC) for brushless motors, enabling precise motion control and obstacle avoidance integration within the Nav2 stack.


.. _odrive_docs: https://docs.odriverobotics.com/v/0.5.6/getting-started.html