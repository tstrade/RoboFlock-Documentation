Wiring Specifications
=====================

This section will describe the wire gauges used throughout the system and how they interact with different components in the system. The specifications are as follows:

**Bus Bars**

For direct connections to the batteries, we are using 12 AWG stranded wire. Red and black wire will be used for power and ground, respectively. 


**Electric Motors and Speed Controllers**

For the electric motors and the speed controllers, we are using 18 AWG stranded wire. Yellow and blue wire will be used for the signal connections MTR+ and MTR-, respectively.


**Low Power and Data Lines**

For the remaining connections in the system, such as connections to a microcontroller, we are using 22 AWG stranded wire. The coloring specifications are given in Table 4.


*Table 4: Color Scheme for RoboFlock Wiring*

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
