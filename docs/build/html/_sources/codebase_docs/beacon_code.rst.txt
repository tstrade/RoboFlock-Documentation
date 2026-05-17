==================
:code:`beacon_pkg`
==================

This package creates a ROS2 node called :code:`BeaconGoalPose` that converts incoming GPS coordinates to a target coordinate, or waypoint, for the robot. The node subscribes to a stream of NMEA GGA messages from the beacon and extracts the latitude, longitude, and altitude from each message. These three values are then translated to the :code:`global` frame and published as a :code:`PoseStamped` message to the :code:`/goal_pose` topic.


The three main files for the package are:

* :code:`beacon_goalpose.cpp`

    - Subscribes to the topic the data is coming in

    - Converts to latitude/longitude to UTM

    - Publishes converted to a :code:`PoseStamped` message


* :code:`beacon_goalpose.launch.py`

    - Launches :code:`beacon_pkg` with defined default parameters


* :code:`beacon_receiver.launch.py`

    - Remaps the beacon's publication topic to :code:`/gps/beacon/fix`

    - Launches :code:`nmea_navsat_driver` with defined default parameters



System Design
+++++++++++++

The GPS beacon transmits NMEA GGA sentences that contain latitude and longitude coordinates through the HC-12 connection. The resulting sentences will be automatically read on the :code:`/fix` topic, so to avoid data conflicts between the robot and beacon, they are remapped to publish to with :code:`/gps/robot/fix` and :code:`/gps/beacon/fix`, respectively.

Since Nav2 uses Cartesian map coordinates (x,y), this node convert the geographic coordinates into local map coordinates relative to a fixed origin using the :code:`geodesy` package (see the `geographic_info GitHub repository <https://github.com/ros-geographic-info/geographic_info>`_). The Cartesion coordinates are then published to the /goal_pose topic used for waypoint following.


High-Level Data Flow
++++++++++++++++++++

.. code-block:: text

    GPS Beacon
        │
        ▼
    nmea_serial_driver
        │
        ▼
    /gps/beacon/fix   (NavSatFix message)
        │
        ▼
    BeaconGoalPose Node
        │
        ▼
    Convert Lat/Lon → UTM
        │
        ▼
    Compute Local X/Y Relative to Origin
        │
        ▼
    /goal_pose        (PoseStamped message)
        │
        ▼
    Nav2 Navigation Stack


:code:`class BeaconGoalPose : public rclcpp::Node`
++++++++++++++++++++++++++++++++++++++++++++++++++

This node consists of both a publisher and a subscriber. The publisher, as mentioned above, publishes a :code:`PoseStamped` message to the :code:`/goal_pose` topic. The subscriber subscribes to the :code:`/gps/beacon/fix` topic that hosts a :code:`NavSatFix` message. 

There are two characteristics of the subscriber that are worth noting:

1. :code:`rclcpp::QoS(10)` - a ROS2 `Quality of Service setting <https://docs.ros.org/en/humble/Concepts/Intermediate/About-Quality-of-Service-Settings.html>`_ that tells the node to keep a history of the 10 most-recent messages

2. :code:`std::bind(&BeaconGoalPose::callback, this, std::placeholders::_1))` - the node's overall functionality is entirely dependent on this subscription, so the callback is bound to the subscriber to prevent repeated publications of stale data


The callback takes the message data and converts it to UTM coordinates that are compared to an origin point. This origin is set when the very first subscripted message is received. The difference between these two points is the corresponding Cartesion coordinate in the :code:`global` frame. 