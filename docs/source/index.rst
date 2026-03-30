.. RoboFlock documentation master file, created by
   sphinx-quickstart on Wed Dec 17 22:54:23 2025.

RoboFlock Documentation
=======================


**The RoboFlock Project is an autonomous robot design that follows its user.** From LiDAR-based obstacle detection and GPS Real-Time Kinematic tracking to robust process management and powerful computational capabilities, RoboFlock is a reliable companion that will follow you for life (or until the battery gives out).

Previously known as Project Dust Runners, the RoboFlock Project has made a lot of changes to its design. **The goal of the RoboFlock Project is to improve obstacle detection, response time, user accessibility, and environmental resistance.** These changes will take advantage of the foundation laid by Project Dust Runners and leverage new technology to improve the design.

The core components of the project include the robot and the beacon. Using the Robot Operating System 2 (ROS2), the whole system can be defined as an interconnected collection of nodes that run tasks in parallel. With most of the process management, sensor data fusion, and navigation being handled by ROS2, Project Roboflock essentially turns into writing a series of drivers and configuration files. This framework allows us to improve the codebase to support better tracking technology, obstacle detection, and navigation.


Main Changes From Alpha Design
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Tracking Technology
    * Dust Runners used UWB anchors and tags to calculate time of flight for distance and bearing information.
    * RoboFlock uses Global Positioning System (GPS) data from both the robot and the beacon to calculate the distance and direction the robot needs to travel to reach the beacon.

2. Computational Power
    * Dust Runners used a distributed system with multiple Teensy 4.1 microcontrollers for handling sensor, motor, and beacon logic.
    * RoboFlock uses a centralized Nvidia Jetson Orin Nano running ROS2 which handles perception, navigation, and motor control.

3. Obstacle Detection
    * Dust Runners used 3 ultrasonic sensors for obstacle avoidance ahead of the robot.
    * RoboFlock uses a LiDAR module for longer-range obstacle detection, improved accuracy, avoidance, and planning, with the three ultrasonic sensors still being used as a fail-safe.

4. Visualization
    * Using the GPS information, the robot and beacon positions can be projected onto map of Black Rock City, where Burning Man takes place, to aid in the retrieval of a robot. This visualization can be viewed on a laptop or handlheld device.

5. Beacon Communication
    * Using Meshtastic devices, a mesh network is established, allowing us to communicate messages such as requesting that a robot returns to base or receiving vital system status information.


.. @todo: Change

.. figure:: _images/fig1_finalprod_overview.png
    :align: center
    :width: 50%
    :loading: link

    Figure 1: Overview of Final Product



:doc:`Getting Started <getting_started_docs/getting_started>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

:doc:`Additional Information <citation_docs/additional_info>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. toctree::
   :titlesonly:
   :maxdepth: 2
   :hidden:

   getting_started_docs/getting_started
   concepts_docs/concepts
   tutorial_docs/tutorials
   codebase_docs/codebase
   hardware_docs/hardware
   construction_docs/construction
   future_considerations
   citation_docs/additional_info

