========================================
ODESC V4.2 Motor Configuration and Setup
========================================

.. include:: ../_templates/constants.rst

**Overview:**

- Controllers: `ODESC V4.2 <ctrl_>`_

- Firmware Download: `ODrive v0.5.6 <firmware_>`_

- Motors: `24V Geared BLDC with Hall Sensors <motors_>`_

- Battery: 25.2V 20Ah

- Software: `ODrive Documentation <odrive_>`_

++++++++
Flashing
++++++++

Before configuring, ensure the ODESC board is running the official ODrive v0.5.6 firmware:

1. Connect the ODESC to your computer via USB. 

2. Perform MASS ERASE to remove current firmware, then flash the standard ODrive v0.5.6 firmware using an `ST-Link <stlink_>`_ and `STM32CubeProgrammer <stm_>`_ .

3. Once flashed, launch :code:`odrivetool` in your terminal to connect.

After confirming that the firmware has been flashed and the controller is recognized by your computer, unplug the controller.

++++++++++++++++++
Base Configuration
++++++++++++++++++

Next, connect the battery to the controller and connect the USB cable to the controller and your computer. In your terminal, launch :code:`odrivetool` and run the following blocks to configure the power limits, motor hardware, and anti-shake tuning.

1. Power Limits (25.2V Battery)

.. code-block:: python

    dev0.config.dc_bus_undervoltage_trip_level = 18.0

    dev0.config.dc_bus_overvoltage_trip_level = 32.0

    dev0.config.dc_max_positive_current = 40.0

    dev0.config.dc_max_negative_current = -5.0


2. Motor Configuration and Voltage Bump Calibration

.. code-block:: python


    dev0.axis0.motor.config.pole_pairs = 5

    dev0.axis0.motor.config.current_lim = 10.5

    dev0.axis0.motor.config.calibration_current = 5.0

    dev0.axis0.motor.config.resistance_calib_max_voltage = 10.0


3. Hall Sensor Configuration and Noise Filter

.. code-block:: python

    dev0.axis0.encoder.config.mode = ENCODER_MODE_HALL

    dev0.axis0.encoder.config.cpr = 30

    dev0.axis0.encoder.config.calib_scan_distance = 150

    dev0.axis0.encoder.config.bandwidth = 100


4. Tuning and Limits

.. code-block:: python

    dev0.axis0.controller.config.vel_limit = 60

    dev0.axis0.controller.config.vel_limit_tolerance = 2.0

    dev0.axis0.controller.config.vel_gain = 0.02

    dev0.axis0.controller.config.vel_integrator_gain = 0.05

    dev0.axis0.controller.config.control_mode = CONTROL_MODE_VELOCITY_CONTROL


5. Save Base Settings and Reboot

.. code-block:: python

    dev0.save_configuration()

    dev0.reboot()


++++++++++++++++++++
Calibration Sequence
++++++++++++++++++++

Wait for the board to reconnect to :code:`odrivetool` after the reboot. Ensure the motor is free to spin.

.. code-block:: python

    # Start calibration

    dev0.axis0.requested_state = AXIS_STATE_FULL_CALIBRATION_SEQUENCE

Allow approximately 15 to 20 seconds for the motor to beep and calibrate.


++++++++++++++++++++++++++
Enable Pre-Calibrated Mode
++++++++++++++++++++++++++

The next step is to lock the settings into flash memory so calibration process doesn't need to be repeated. 

.. code-block:: python

    # Tell the controller not to forget the calibration alignment

    dev0.axis0.motor.config.pre_calibrated = True

    dev0.axis0.encoder.config.pre_calibrated = True

    # (Optional) Automatically enter closed-loop control on boot

    dev0.axis0.config.startup_closed_loop_control = True

    # Lock it in

    dev0.save_configuration()

    dev0.reboot()


+++++++
Testing
+++++++

Wait for the board to reconnect to :code:`odrivetool` after the reboot.

.. code-block:: python

    # Test movement (2 turns per second)

    dev0.axis0.controller.input_vel = 2

    # Stop movement

    dev0.axis0.controller.input_vel = 0



.. _ctrl: https://www.amazon.com/Brushless-Controller-Configuration-Compatible-Odrivetool/dp/B0C9Q5D8T2

.. _firmware: https://odrive-cdn.nyc3.digitaloceanspaces.com/releases/firmware/HTTTMCnIwl3chDI0XEEoKH_AKMueQzzs6XZcfKgO-TA/firmware.elf

.. _motors: https://www.omc-stepperonline.com/24v-200w-100rpm-geared-brushless-dc-motor-15-00nm-2124-17oz-in-30-1-planetary-gearbox-m82b200-24p-30s-g82-30s1

.. _odrive: https://docs.odriverobotics.com/v/latest/index.html

.. _stlink: https://www.st.com/en/development-tools/st-link-v2.html

.. _stm: https://www.st.com/en/development-tools/stm32cubeprog.html

