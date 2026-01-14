HC-SR04 Ultrasonic Distance Sensor
==================================

**Datasheet Link:**

`ELEC Freaks - Ultrasonic Ranging Module HC-SR04 <datasheet_>`_



**Features:**

- 2cm to 400cm Measurement Range

- 3mm Ranging Accuracy

- 40Hz Working Frequency



**Setup:**

- "Vcc" to 5V Supply

- "Trig" to Digital Pin

- "Echo" to Digital Pin

- "Gnd" to 0V Ground



**Interfacing:**

The following instructions are designed specifically for RoboFlock, which uses Arduinos with code uploaded from the Arduino IDE. For examples of interacting with hardware through an embedded Linux environment, see our other hardware documents, such as :doc:`NEO-M8P-2 GNSS/GPS Module <neo_m8p>`.

1. Connect each of the pins as listed above

2. Include ``<Servo.h>`` in your program and declare a Servo object(s) for your HC-SR04 module(s)

3. Set the "Trig" pin as an output and the "Echo" pin as an input using the ``pinMode()`` function 

4. Set the "Trig" pin to logic low using the ``digitalWrite()`` function

5. To make the HC-SR04 take a sample, it needs a 10 microsecond logic-high pulse, which can be done using the ``digitalWrite()`` and ``delayMicroseconds()`` functions 

6. To read the HC-SR04's sample, call the ``pulseIn()`` function and use one of the formulas given in the HC-SR04's datasheet to find the distance detected by the module

That's it! 



**Dimensions:**

45mm x 20mm x 15mm



**Use-Case:**

Close-range obstacle detection for the front-facing portion of RoboFlock. Acts as a failsafe for objects not detected by the LiDAR module.



.. _datasheet: https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf