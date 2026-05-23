Creating the URDF
=================

A URDF (Unified Robot Description Format) is an XML file that describes a robot's physical structure — its links (rigid bodies), joints (connections), sensors, and collision geometry. Nav2 and RViz both require a URDF to understand the robot's shape and transform sensor data into the correct reference frames.

**Official ROS 2 reference:** https://docs.ros.org/en/humble/Tutorials/Intermediate/URDF/URDF-Main.html

----

Key Concepts
------------

**Links** are the rigid bodies of the robot: the chassis, wheels, sensor mounts.

**Joints** connect links together. The joint type controls how they move relative to each other:

- ``fixed`` — no movement (e.g. a sensor bolted to the chassis)
- ``continuous`` — rotates freely (e.g. wheels)
- ``revolute`` — rotates within limits (e.g. a steering joint)

**Frames** — each link defines a coordinate frame. Nav2 uses these to transform sensor readings (e.g. laser scan in the ``laser`` frame) into the robot body frame (``base_link``) and the map frame (``map``).

----

RoboFlock Physical Dimensions
------------------------------

Use these values when building the RoboFlock URDF. Measure your specific build and update these if they differ.

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Parameter
     - Value
   * - Chassis length
     - ~0.45 m
   * - Chassis width
     - ~0.35 m
   * - Chassis height (to top deck)
     - ~0.15 m
   * - Wheel diameter
     - ~0.12 m (measure your specific motors)
   * - Wheel width
     - ~0.05 m
   * - Wheelbase (front-to-rear axle)
     - ~0.30 m
   * - Track width (left-to-right axle)
     - ~0.32 m
   * - LiDAR mount height above base_link
     - ~0.22 m
   * - LiDAR horizontal offset (forward)
     - ~0.05 m
   * - Ultrasonic sensor height
     - ~0.08 m

----

Minimal URDF Structure
-----------------------

Every URDF starts with a ``<robot>`` tag and must contain at least a ``base_link``.

.. code-block:: xml

   <?xml version="1.0"?>
   <robot name="roboflock">

     <!-- ── BASE LINK ────────────────────────────────────────────── -->
     <link name="base_link">
       <visual>
         <geometry>
           <box size="0.45 0.35 0.15"/>
         </geometry>
         <origin xyz="0 0 0.075" rpy="0 0 0"/>
       </visual>
       <collision>
         <geometry>
           <box size="0.45 0.35 0.15"/>
         </geometry>
         <origin xyz="0 0 0.075" rpy="0 0 0"/>
       </collision>
       <inertial>
         <mass value="8.0"/>
         <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
       </inertial>
     </link>

     <!-- ── FRONT-LEFT WHEEL ─────────────────────────────────────── -->
     <link name="wheel_fl">
       <visual>
         <geometry>
           <cylinder radius="0.06" length="0.05"/>
         </geometry>
       </visual>
       <collision>
         <geometry>
           <cylinder radius="0.06" length="0.05"/>
         </geometry>
       </collision>
       <inertial>
         <mass value="0.5"/>
         <inertia ixx="0.001" ixy="0" ixz="0" iyy="0.001" iyz="0" izz="0.001"/>
       </inertial>
     </link>

     <joint name="wheel_fl_joint" type="continuous">
       <parent link="base_link"/>
       <child link="wheel_fl"/>
       <origin xyz="0.15 0.175 0.0" rpy="-1.5708 0 0"/>
       <axis xyz="0 0 1"/>
     </joint>

     <!-- Repeat for wheel_fr, wheel_rl, wheel_rr with appropriate xyz offsets -->

     <!-- ── LIDAR LINK ────────────────────────────────────────────── -->
     <link name="laser">
       <visual>
         <geometry>
           <cylinder radius="0.04" length="0.05"/>
         </geometry>
       </visual>
       <collision>
         <geometry>
           <cylinder radius="0.04" length="0.05"/>
         </geometry>
       </collision>
       <inertial>
         <mass value="0.17"/>
         <inertia ixx="0.0001" ixy="0" ixz="0" iyy="0.0001" iyz="0" izz="0.0001"/>
       </inertial>
     </link>

     <joint name="laser_joint" type="fixed">
       <parent link="base_link"/>
       <child link="laser"/>
       <!-- Adjust height and forward offset to match your mount -->
       <origin xyz="0.05 0 0.22" rpy="0 0 0"/>
     </joint>

     <!-- ── IMU LINK ──────────────────────────────────────────────── -->
     <link name="imu_link"/>
     <joint name="imu_joint" type="fixed">
       <parent link="base_link"/>
       <child link="imu_link"/>
       <origin xyz="0 0 0.05" rpy="0 0 0"/>
     </joint>

   </robot>

----

Four-Wheel Offsets
------------------

For a robot with four independently driven wheels, the joint origins relative to ``base_link`` are:

.. code-block:: text

   Front-left  (wheel_fl): xyz =  0.15   0.175  0.0
   Front-right (wheel_fr): xyz =  0.15  -0.175  0.0
   Rear-left   (wheel_rl): xyz = -0.15   0.175  0.0
   Rear-right  (wheel_rr): xyz = -0.15  -0.175  0.0

The ``rpy="-1.5708 0 0"`` rotation rotates the wheel cylinder so its spin axis aligns with Y (left-right in the robot frame). All four wheels use the same rotation value.

----

Publishing the Robot Description
---------------------------------

Add ``robot_state_publisher`` to your launch file to broadcast the URDF transforms over ``/tf``:

.. code-block:: python

   from launch_ros.actions import Node
   from launch.substitutions import Command
   from ament_index_python.packages import get_package_share_directory
   import os

   urdf_path = os.path.join(
       get_package_share_directory('bring_up'), 'urdf', 'roboflock.urdf'
   )

   Node(
       package='robot_state_publisher',
       executable='robot_state_publisher',
       parameters=[{'robot_description': Command(['cat ', urdf_path])}]
   )

This publishes transforms between every ``fixed`` joint automatically. For ``continuous`` wheel joints you also need a ``joint_state_publisher`` that publishes the wheel angle, or encoder odometry from the ODESC controllers.

----

Validating Your URDF
--------------------

.. code-block:: bash

   # Install check tool
   sudo apt install ros-humble-urdf

   # Validate syntax
   check_urdf roboflock.urdf

   # Visualise in RViz
   ros2 launch urdf_tutorial display.launch.py model:=roboflock.urdf

A correct URDF will show the robot chassis and all four wheels in RViz with no red error text in the terminal.

----

URDF and Nav2
-------------

Nav2 uses two key frames from the URDF:

- ``base_link`` — the robot body frame. All navigation is computed relative to this.
- ``laser`` (or whatever you name the LiDAR joint's child link) — must match the ``frame_id`` parameter in your ``rplidar_ros`` node config.

If the ``laser`` frame name in your URDF does not match the ``frame_id`` published by ``rplidar_ros``, the costmap will be empty. Verify with:

.. code-block:: bash

   ros2 topic echo /scan --field header.frame_id

The output should match the child link name of your LiDAR joint.

----

Further Reading
---------------

- `URDF tutorials (ROS 2 Humble) <https://docs.ros.org/en/humble/Tutorials/Intermediate/URDF/URDF-Main.html>`_
- `robot_state_publisher <https://docs.ros.org/en/humble/p/robot_state_publisher/>`_
- `tf2 and coordinate frames <https://docs.ros.org/en/humble/Tutorials/Intermediate/Tf2/Tf2-Main.html>`_
