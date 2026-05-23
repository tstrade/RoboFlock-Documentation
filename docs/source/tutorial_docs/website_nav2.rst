Working with Nav2
=================

Nav2 (Navigation2) is the standard ROS 2 navigation stack. It takes a goal pose and produces velocity commands on ``/cmd_vel`` to reach that goal while avoiding obstacles. RoboFlock uses Nav2 for autonomous beacon-following.

**Official Nav2 documentation:** https://docs.nav2.org/

----

How Nav2 Works in RoboFlock
----------------------------

.. code-block:: text

   ZED-F9P (beacon GPS)
          │ NMEA via HC-12
          ▼
   HC-12 node → /beacon_gps
          │
          ▼
   GPS node   → /fix (robot GPS)
          │
          ▼
   Tracking node
     • Converts lat/lon pair to relative bearing + distance
     • Sends ActionGoal to Nav2 BT Navigator
          │
          ▼
   Nav2 BT Navigator
     • Global planner: finds route on the map
     • Local planner (DWA):  produces /cmd_vel avoiding obstacles
          │
          ▼
   /cmd_vel → ODESC motor controllers → wheels

The RPLIDAR A1 scan (``/scan``) is consumed by Nav2's costmap layers to mark obstacles in both the global and local costmaps. The ultrasonic sensors feed a separate safety layer that stops the robot if an object is within ~30 cm.

----

Required TF Tree
----------------

Nav2 requires a valid TF tree before it will plan. The minimum required frames are:

.. code-block:: text

   map
    └── odom
         └── base_link
               └── laser

- ``map → odom``: provided by a localisation node (AMCL for known maps, or a GPS→map transform for outdoor use)
- ``odom → base_link``: provided by wheel odometry or IMU integration
- ``base_link → laser``: provided by ``robot_state_publisher`` reading your URDF

Verify the tree is intact at any time with:

.. code-block:: bash

   ros2 run tf2_tools view_frames

This generates a ``frames.pdf`` showing every published transform.

----

Installing Nav2
---------------

.. code-block:: bash

   sudo apt update
   sudo apt install ros-humble-navigation2 ros-humble-nav2-bringup

----

Nav2 Configuration File
------------------------

Nav2 behaviour is controlled by a YAML params file. A minimal configuration for RoboFlock (differential drive, outdoor GPS use, no pre-built map):

.. code-block:: yaml

   # nav2_params.yaml
   bt_navigator:
     ros__parameters:
       use_sim_time: false
       global_frame: map
       robot_base_frame: base_link
       odom_topic: /odom
       bt_loop_duration: 10
       default_server_timeout: 20

   controller_server:
     ros__parameters:
       use_sim_time: false
       controller_frequency: 20.0
       FollowPath:
         plugin: "nav2_regulated_pure_pursuit_controller::RegulatedPurePursuitController"
         desired_linear_vel: 0.5
         lookahead_dist: 0.6
         min_lookahead_dist: 0.3
         max_lookahead_dist: 0.9
         transform_tolerance: 0.1
         use_velocity_scaled_lookahead_dist: true
         min_approach_linear_velocity: 0.05
         approach_velocity_scaling_dist: 0.6
         use_collision_detection: true
         max_allowed_time_to_collision_up_to_carrot: 1.0

   local_costmap:
     local_costmap:
       ros__parameters:
         update_frequency: 5.0
         publish_frequency: 2.0
         global_frame: odom
         robot_base_frame: base_link
         use_sim_time: false
         rolling_window: true
         width: 3
         height: 3
         resolution: 0.05
         robot_radius: 0.30
         plugins: ["voxel_layer", "inflation_layer"]
         voxel_layer:
           plugin: "nav2_costmap_2d::VoxelLayer"
           enabled: true
           publish_voxel_map: true
           origin_z: 0.0
           z_resolution: 0.05
           z_voxels: 16
           observation_sources: scan
           scan:
             topic: /scan
             max_obstacle_height: 2.0
             clearing: true
             marking: true
             data_type: "LaserScan"
         inflation_layer:
           plugin: "nav2_costmap_2d::InflationLayer"
           cost_scaling_factor: 3.0
           inflation_radius: 0.55

   global_costmap:
     global_costmap:
       ros__parameters:
         update_frequency: 1.0
         publish_frequency: 1.0
         global_frame: map
         robot_base_frame: base_link
         use_sim_time: false
         robot_radius: 0.30
         resolution: 0.05
         track_unknown_space: true
         plugins: ["static_layer", "obstacle_layer", "inflation_layer"]
         obstacle_layer:
           plugin: "nav2_costmap_2d::ObstacleLayer"
           enabled: true
           observation_sources: scan
           scan:
             topic: /scan
             max_obstacle_height: 2.0
             clearing: true
             marking: true
             data_type: "LaserScan"
             raytrace_max_range: 3.0
             raytrace_min_range: 0.0
             obstacle_max_range: 2.5
             obstacle_min_range: 0.0
         static_layer:
           plugin: "nav2_costmap_2d::StaticLayer"
           map_subscribe_transient_local: true
         inflation_layer:
           plugin: "nav2_costmap_2d::InflationLayer"
           cost_scaling_factor: 3.0
           inflation_radius: 0.55

Save this file as ``config/nav2_params.yaml`` in your ``bring_up`` package.

----

Launching Nav2
--------------

.. code-block:: bash

   ros2 launch nav2_bringup bringup_launch.py \
     use_sim_time:=false \
     params_file:=/path/to/nav2_params.yaml \
     map:=''

Pass ``map:=''`` (empty string) to run without a pre-built map (Nav2 will use an empty map and rely entirely on the local costmap for obstacle avoidance, which is suitable for open outdoor following).

----

Sending a Goal Pose Programmatically
--------------------------------------

The tracking node sends Nav2 a new goal each time the beacon GPS updates. The pattern using the Nav2 action interface:

.. code-block:: python

   import rclpy
   from rclpy.node import Node
   from rclpy.action import ActionClient
   from nav2_msgs.action import NavigateToPose
   from geometry_msgs.msg import PoseStamped

   class TrackingNode(Node):
       def __init__(self):
           super().__init__('tracking_node')
           self._client = ActionClient(self, NavigateToPose, 'navigate_to_pose')

       def send_goal(self, x, y, yaw=0.0):
           goal = NavigateToPose.Goal()
           goal.pose = PoseStamped()
           goal.pose.header.frame_id = 'map'
           goal.pose.header.stamp = self.get_clock().now().to_msg()
           goal.pose.pose.position.x = x
           goal.pose.pose.position.y = y
           # Convert yaw to quaternion
           goal.pose.pose.orientation.w = 1.0  # simplified: facing forward
           self._client.wait_for_server()
           self._client.send_goal_async(goal)

The ``x`` and ``y`` values are the beacon's position in the ``map`` frame, computed by the GPS coordinate transform node from the two NMEA GGA fixes.

----

Monitoring Nav2 in RViz
-----------------------

.. code-block:: bash

   rviz2

Add these displays to visualise the navigation stack:

- **Map** — topic: ``/map``
- **LaserScan** — topic: ``/scan``
- **Path** — topic: ``/plan``
- **Costmap** — topic: ``/local_costmap/costmap``
- **TF** — enable to see all coordinate frames

----

Common Nav2 Issues
------------------

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Issue
     - Fix
   * - ``Costmap is empty``
     - Verify ``/scan`` is publishing and ``frame_id`` matches URDF laser link name
   * - ``Could not find a valid plan``
     - Robot may be too close to a wall. Clear costmaps: ``ros2 service call /clear_costmaps``
   * - ``TF lookup would require extrapolation``
     - Clock skew. Ensure ``use_sim_time: false`` everywhere and system time is correct
   * - ``Goal was rejected by the server``
     - Nav2 not fully initialised. Wait for "Nav2 is ready" log before sending goals
   * - Robot oscillates near goal
     - Increase ``xy_goal_tolerance`` and ``yaw_goal_tolerance`` in ``controller_server`` params

----

Further Reading
---------------

- `Nav2 Getting Started <https://docs.nav2.org/getting_started/index.html>`_
- `Nav2 Configuration Guide <https://docs.nav2.org/configuration/index.html>`_
- `Nav2 Concepts <https://docs.nav2.org/concepts/index.html>`_
- `Regulated Pure Pursuit Controller <https://docs.nav2.org/configuration/packages/configuring-regulated-pp.html>`_
