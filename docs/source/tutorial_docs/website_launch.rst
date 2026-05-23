Making Launch Files
===================

A ROS 2 launch file lets you start multiple nodes, set parameters, and configure remappings from a single command instead of running ``ros2 run`` for every node individually. RoboFlock uses launch files to bring up the full sensor and navigation stack in one call.

**Official ROS 2 reference:** https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Launch-Main.html

----

Why Use Launch Files
--------------------

Without a launch file you would need a separate terminal for every node:

.. code-block:: bash

   ros2 run joy joy_node
   ros2 run bring_up self_destruct
   ros2 run rplidar_ros rplidar_composition
   ros2 run nav2_bringup bringup_launch.py
   # ... and so on

A launch file starts all of these together, in the right order, with the right parameters.

----

Basic Structure
---------------

ROS 2 launch files are plain Python scripts. The entry point is always a function called ``generate_launch_description()`` that returns a ``LaunchDescription`` object.

.. code-block:: python

   from launch import LaunchDescription
   from launch_ros.actions import Node

   def generate_launch_description():
       return LaunchDescription([
           Node(
               package='joy',
               executable='joy_node',
               name='joy_node',
               output='screen',
           ),
           Node(
               package='bring_up',
               executable='self_destruct',
               name='ps4_teleop',
               output='screen',
           ),
       ])

Save this file as ``my_launch.py`` in your package's ``launch/`` directory, then register it in ``CMakeLists.txt``:

.. code-block:: cmake

   install(DIRECTORY launch
     DESTINATION share/${PROJECT_NAME}
   )

Run it with:

.. code-block:: bash

   ros2 launch bring_up my_launch.py

----

Setting Node Parameters
-----------------------

Parameters can be set inline or loaded from a YAML file.

**Inline parameters:**

.. code-block:: python

   Node(
       package='joy',
       executable='joy_node',
       parameters=[{
           'deadzone': 0.05,
           'autorepeat_rate': 20.0,
       }]
   )

**From a YAML file:**

.. code-block:: python

   import os
   from ament_index_python.packages import get_package_share_directory

   params_file = os.path.join(
       get_package_share_directory('bring_up'), 'config', 'teleop_params.yaml'
   )

   Node(
       package='bring_up',
       executable='self_destruct',
       parameters=[params_file]
   )

----

Topic Remapping
---------------

Remapping lets two nodes that publish/subscribe to different topic names talk to each other without changing source code.

.. code-block:: python

   Node(
       package='bring_up',
       executable='self_destruct',
       remappings=[
           ('cmd_vel', 'robot/cmd_vel'),   # remap output topic
           ('joy', 'ds4/joy'),             # remap input topic
       ]
   )

----

Including Other Launch Files
-----------------------------

Large systems split launch logic across multiple files. Use ``IncludeLaunchDescription`` to compose them:

.. code-block:: python

   from launch.actions import IncludeLaunchDescription
   from launch.launch_description_sources import PythonLaunchDescriptionSource
   from ament_index_python.packages import get_package_share_directory
   import os

   nav2_launch = IncludeLaunchDescription(
       PythonLaunchDescriptionSource(
           os.path.join(
               get_package_share_directory('nav2_bringup'),
               'launch', 'bringup_launch.py'
           )
       ),
       launch_arguments={'use_sim_time': 'false'}.items()
   )

   def generate_launch_description():
       return LaunchDescription([
           nav2_launch,
           # ... other nodes
       ])

----

RoboFlock Launch File
---------------------

RoboFlock currently uses ``bring_up.sh`` (a bash script managed by ``robot.service``) to start nodes sequentially rather than a single unified launch file. The equivalent launch file would look like this:

.. code-block:: python

   from launch import LaunchDescription
   from launch_ros.actions import Node

   def generate_launch_description():
       return LaunchDescription([
           # Joystick driver
           Node(package='joy', executable='joy_node', name='joy_node', output='screen'),

           # Teleop node (PS4 controller → cmd_vel)
           Node(package='bring_up', executable='self_destruct', name='ps4_teleop', output='screen'),

           # LiDAR
           Node(
               package='rplidar_ros',
               executable='rplidar_composition',
               name='rplidar_node',
               output='screen',
               parameters=[{'serial_port': '/dev/rplidar', 'frame_id': 'laser'}]
           ),

           # Robot GPS
           Node(package='gps_pkg', executable='gps_node', name='gps_node', output='screen'),

           # Ultrasonic aggregator (reads from Arduino Nano serial)
           Node(package='ultrasonic_pkg', executable='ultrasonic_node', name='ultrasonic_node', output='screen'),
       ])

.. note::

   To convert RoboFlock to use this launch file instead of the bash script, replace the
   ``ros2 run`` lines in ``bring_up.sh`` with a single ``ros2 launch bring_up roboflock_launch.py``
   call and rebuild the package.

----

Further Reading
---------------

- `ROS 2 launch tutorials <https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Launch-Main.html>`_
- `Launch file substitutions <https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Using-Substitutions.html>`_
- `ros2 launch CLI reference <https://docs.ros.org/en/humble/How-To-Guides/Launch-file-different-formats.html>`_
