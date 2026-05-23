Troubleshooting and Debugging
==============================

This page covers common failure modes across every RoboFlock subsystem and the commands needed to diagnose them.

----

Quick Diagnostic Checklist
---------------------------

Run these commands over SSH first. They answer the most common questions in under 30 seconds.

.. code-block:: bash

   # 1. Are the nodes running?
   ros2 node list

   # 2. Are the topics publishing?
   ros2 topic list

   # 3. Is cmd_vel getting values?
   ros2 topic echo /cmd_vel

   # 4. Is the LiDAR spinning?
   ros2 topic hz /scan        # should be ~10 Hz

   # 5. What is the service doing?
   sudo systemctl status robot.service

   # 6. Recent service logs
   journalctl -u robot.service -n 50 --no-pager

   # 7. Are all USB devices assigned?
   ls /dev/rplidar /dev/odesc_* /dev/hc12 /dev/gps

   # 8. Jetson resource usage
   tegrastats

----

Environment / ROS2 Discovery
------------------------------

**Symptom:** ``ros2 node list`` returns nothing after SSH.

This is almost always an ``ROS_LOCALHOST_ONLY`` mismatch between the running service and your SSH terminal.

.. code-block:: bash

   # Check what the service process sees
   sudo cat /proc/$(pgrep -f self_destruct | head -1)/environ \
     | tr '\0' '\n' | grep -E "ROS|DOMAIN|LOCALHOST"

   # Check your terminal
   env | grep -E "ROS|DOMAIN|LOCALHOST"

If ``ROS_LOCALHOST_ONLY`` differs between the two, fix your terminal:

.. code-block:: bash

   export ROS_LOCALHOST_ONLY=0
   ros2 daemon stop
   ros2 daemon start
   ros2 node list

To make this permanent, add the export to ``~/.bashrc``:

.. code-block:: bash

   echo "export ROS_LOCALHOST_ONLY=0" >> ~/.bashrc
   source ~/.bashrc

----

robot.service
-------------

**Symptom:** Service shows ``failed`` or ``inactive``.

.. code-block:: bash

   sudo systemctl status robot.service
   journalctl -u robot.service -n 100 --no-pager

Common causes:

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Log message
     - Fix
   * - ``source: No such file or directory`` on ``install/setup.bash``
     - Package was never built. Run ``colcon build --packages-select bring_up`` then restart service.
   * - ``PermissionError: [Errno 13] Permission denied: 'log'``
     - Service is running as root. Add ``User=roboflock`` to the ``[Service]`` section of ``/etc/systemd/system/robot.service``, then ``sudo systemctl daemon-reload``.
   * - ``[ERROR] device or resource busy``
     - USB device claimed by another process. Run ``sudo fuser /dev/rplidar`` to find and kill it.
   * - Service exits immediately
     - Last ``ros2 run`` command failed. Change all but the last node to background (``&``) in ``bring_up.sh``.

----

Controller / Teleop
--------------------

**Symptom:** Robot does not move when R2 is pressed.

The most common cause is R1 (dead-man switch) not being held. R1 must be held continuously for any motion to be sent.

.. code-block:: bash

   # Watch raw joy input
   ros2 topic echo /joy

Press each button and confirm the correct ``axes[]`` or ``buttons[]`` index changes.

**Symptom:** Controller will not pair (light bar keeps flashing).

.. code-block:: bash

   # Restart the Bluetooth service
   sudo systemctl restart bluetooth
   # Wait 5 seconds, then press PS button on controller

**Symptom:** ``joy_node`` is running but ``/joy`` topic is empty.

.. code-block:: bash

   ls /dev/input/js*        # controller should appear here after pairing
   ros2 param get /joy_node dev   # confirm device path

If no ``js*`` device appears, the OS has not recognised the controller. Try:

.. code-block:: bash

   sudo dmesg | tail -20    # look for Bluetooth HID events

----

ODESC Motor Controllers
-----------------------

**Symptom:** One or more wheels not spinning.

.. code-block:: bash

   # Check USB devices
   ls /dev/odesc_*          # should show 4 entries

   # Check which ODESC UIDs are present
   udevadm info /dev/odesc_0

If a device is missing, the ODESC may not have initialised. Disconnect and reconnect its USB cable, then restart the service.

**Symptom:** ``/cmd_vel`` publishes but wheels do not respond.

The ODESC driver node may have crashed silently. Check:

.. code-block:: bash

   ros2 node list | grep odesc

If absent, restart ``robot.service``. If it keeps crashing, check ``journalctl -u robot.service`` for ODESC-specific errors.

----

LiDAR (RPLIDAR A1)
------------------

**Symptom:** RPLIDAR motor does not spin on boot.

.. code-block:: bash

   ls /dev/rplidar           # should exist
   ros2 topic hz /scan       # should be ~10 Hz

If ``/dev/rplidar`` does not exist:

.. code-block:: bash

   dmesg | grep -i "cp210x\|ch34\|rplidar"   # look for USB serial events

Re-seat the USB cable. If the device still does not appear, test the cable with a different port.

**Symptom:** ``/scan`` publishes but costmap is empty in RViz.

.. code-block:: bash

   ros2 topic echo /scan --field header.frame_id

The ``frame_id`` must exactly match the child link of the LiDAR joint in your URDF. If they differ (e.g. ``/scan`` says ``laser_frame`` but URDF says ``laser``), either update the URDF joint or set ``frame_id: laser_frame`` in the ``rplidar_ros`` node parameters.

----

GPS / Beacon Tracking
----------------------

**Symptom:** ``/beacon_gps`` topic is empty.

.. code-block:: bash

   ls /dev/hc12              # HC-12 device must exist
   ros2 topic echo /beacon_gps

If ``/dev/hc12`` is missing:

.. code-block:: bash

   dmesg | grep -i "cp210x\|ch34"   # HC-12 uses a CH340 or CP2102 chip

Check that the beacon HC-12 is powered and within range (typically < 100 m line-of-sight). The HC-12 TX LED on the beacon should blink at 1 Hz when transmitting.

**Symptom:** Robot GPS (``/fix``) has no fix.

.. code-block:: bash

   ros2 topic echo /fix

Check ``status.status``. A value of ``-1`` means no fix. Move to an area with clear sky view and wait up to 90 seconds for the first fix.

----

Nav2
----

**Symptom:** Nav2 refuses to accept goals.

.. code-block:: bash

   ros2 topic echo /initialpose     # check initial pose is set
   ros2 service call /clear_costmaps nav2_msgs/srv/ClearEntireCostmap

Check the Nav2 lifecycle nodes are active:

.. code-block:: bash

   ros2 lifecycle list /controller_server

All nodes should be in ``active`` state. If any are in ``unconfigured``, the params file likely has a YAML error. Validate it with:

.. code-block:: bash

   python3 -c "import yaml; yaml.safe_load(open('nav2_params.yaml'))"

**Symptom:** Robot reaches goal area but circles endlessly.

Increase goal tolerances in ``nav2_params.yaml``:

.. code-block:: yaml

   goal_checker:
     plugin: "nav2_controller::SimpleGoalChecker"
     xy_goal_tolerance: 0.5
     yaw_goal_tolerance: 0.785

----

Viewing the TF Tree
--------------------

A broken TF tree is behind most Nav2 planning failures.

.. code-block:: bash

   # Save TF tree to PDF
   ros2 run tf2_tools view_frames
   evince frames.pdf

   # Live TF monitor
   ros2 run tf2_ros tf2_monitor

   # Check specific transform
   ros2 run tf2_ros tf2_echo base_link laser

If ``map → odom → base_link`` is not present, Nav2 cannot plan. Ensure ``robot_state_publisher`` is running with a valid URDF and that your odometry or GPS localisation node is publishing to ``/tf``.

----

Useful One-Liners
-----------------

.. code-block:: bash

   # All topics with type and publisher count
   ros2 topic list -v

   # Node graph (text)
   ros2 node list && ros2 topic list

   # Kill a specific node cleanly
   ros2 lifecycle set /controller_server shutdown

   # Replay a rosbag for debugging (record first)
   ros2 bag record -o my_bag /scan /cmd_vel /fix /joy
   ros2 bag play my_bag

   # Check Jetson CPU throttling
   sudo cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq

   # Clear and restart the udev rules
   sudo udevadm control --reload-rules
   sudo udevadm trigger

----

Further Reading
---------------

- `ROS 2 command line tools reference <https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/>`_
- `Debugging with ros2 topic / ros2 node <https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html>`_
- `Nav2 troubleshooting guide <https://docs.nav2.org/troubleshooting/index.html>`_
- `tf2 debugging <https://docs.ros.org/en/humble/Tutorials/Intermediate/Tf2/Tf2-Main.html>`_
