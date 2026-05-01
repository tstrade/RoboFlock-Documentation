=====================
Wiring Specifications
=====================

This section will describe the wire gauges used throughout the system and how they interact with different components in the system. The specifications are as follows:

**Bus Bars**

For direct connections to the batteries, we are using 12 AWG stranded wire. Red and black wire will be used for power and ground, respectively. 


**Electric Motors and Speed Controllers**

For the electric motors and the speed controllers, we are using 18 AWG stranded wire. 


**Low Power and Data Lines**

For the remaining connections in the system, such as connections to a microcontroller, we are using 22 AWG solid core wire. The coloring specifications are below:

+--------+---------------+
| Color  | Use-Case      |
+========+===============+
| Red    | 5V Power      |
+--------+---------------+
| Orange | 3.3V Power    |
+--------+---------------+
| Black  | GND           |
+--------+---------------+
| Pink   | UART Rx, MOSI |
+--------+---------------+
| Purple | UART Tx, MISO |
+--------+---------------+
| Yellow | SCL, MTR+     |
+--------+---------------+
| Blue   | SDA, MTR-     |
+--------+---------------+
| Green  | PWM, SCK      |
+--------+---------------+
| Brown  | GND           |
+--------+---------------+
| White  | GPIO, CS      |
+--------+---------------+
