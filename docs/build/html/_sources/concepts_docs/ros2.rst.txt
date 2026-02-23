ROS2
====


Architectural Block Diagram
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. figure:: ../_images/fig11_ros2_overview.png
    :align: center
    :width: 50%
    :loading: link

    Figure 11: Overview of ROS2 Setup



Overview
^^^^^^^^

ROS2 is the main software framework for the robot. It handles message passing, timing, and modularity. Each sensor, controller, and algorithm runs as a ROS2 node. These nodes will use one of the following communication methods provided by the framework:

1. *Topics* are used for continuous streams of data. Nodes can publish messages via topics and nodes can subscribe to messages via topics.


2. *Services* are used for call-and-response communication. Many nodes can act as the service client, each capable of sending requests to the node acting as the service server.

Simpler tasks, such as collecting the ultrasonic data or telling the motors how fast to move, will be communicated via topics. More complex tasks, such as obtaining the beacon’s location, will be communicated via services.



Perception
^^^^^^^^^^

The LiDAR node publishes range data at its native scan rate. The ultrasonic nodes publish short range distance readings. The GPS node publishes the robot’s global position. The HC-12 module publishes relative range data when available. The motor controller node accepts velocity commands and drives the ESC. 

The ultrasonic sensors are added as a safety feature for immediate obstacle detection. 



Planning
^^^^^^^^

The navigation system uses Nav2 to move the robot toward the beacon while avoiding obstacles by computing a target waypoint from the GPS position of the beacon. The robot updates this waypoint as the beacon moves.

Nav2 builds a local cost map from LiDAR and ultrasonic data, showing both free space and blocked space around the robot. This map is updated at a high rate, giving it smooth motion around obstacles, even when they appear without warning.

Nav2 runs two planners:

- The global planner draws a simple route toward the target point. 

- The local planner produces velocity commands that steer the robot along the route without hitting obstacles. It adjusts speed when space becomes tight. It slows or stops when the ultrasonic sensors report close-range hazards.
