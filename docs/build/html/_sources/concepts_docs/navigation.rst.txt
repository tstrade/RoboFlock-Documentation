Navigation
==========


For RoboFlock to follow the user, they must be holding a beacon. This beacon is a portable-handheld device that acts as a homing system for the robot, and the robot will follow within a few meters to the best of its ability in an outdoor environment. The beacon consists of a battery system, GPS module, wireless RF communication module, and LEDs to make it exciting to possess. It will also alert the user if the robot has any problems, such as getting stuck or low battery power.



Architectural Block Diagram
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. @todo: Update figure


.. figure:: ../_images/fig5_beacon_rover_datastream.png
    :align: center
    :width: 40%
    :loading: link

    Figure 5: Block Diagram for the Beacon to Rover Correction Data Stream



Tracking Functionality
^^^^^^^^^^^^^^^^^^^^^^

.. @todo: remove / replace with correct description

Real-time kinematic (RTK) positioning is a form of differential GPS that uses a known coordinate location to determine errors in GPS coordinates with centimeter-level accuracy. This information is used to obtain correctional data that can be sent out to other GPS modules in the area. In short, RTK allows for the system to work based on relative locations instead of absolute locations. 

The setup involves a “rover” and “base” module, which are analogous to the robot and beacon, respectively. Each module obtains GPS coordinates individually, with the addition that the beacon also provides error corrections that are sent out to the robot. Using the beacon’s location as the frame of reference, a position vector in the direction of the beacon will guide the robot from its current position to its next position.



GPS Visualization Simulation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. @todo: is this still relevant?

As an intermediate step between testing and fully implementing the GPS visualization functionality, we will simulate the expected outputs from the beacon and robot GPS modules to the Jetson Orin Nano. By simulating this network traffic under assumption of NMEA data format used for the GPS data, we will write a script in Python that extracts latitude and longitude information from each module’s raw NMEA data stream and using this position information we visualize the location of the Robot and Beacon on a map using the Folium mapping library.

.. figure:: ../_images/fig6_ex_gps_visuals.png
    :align: center
    :width: 50%
    :loading: link

    Figure 6: Example of GPS Visualization of Robot's Position on Map of Black Rock City (Burning Man Site)



Design
^^^^^^

The beacon is designed to be portable, allowing users to carry it around and pass the beacon off to others without having to reset the system. No user input is required; a simple LED indicates the beacon’s status to its user. 

The robot uses a NEO-M8P module that wirelessly receives error correction data from the beacon via the HC-12. The beacon uses a ZED-F9P module that is connected to two HC-12 wireless communication devices, designated as Base 1 and Base 2, which use separate radio frequencies to avoid interference with one another.  

Two bases are required for transmitting GPS data since the ZED-F9P provides both coordinates and error correction data. These must be handled separately to ensure proper data processing. Their use-cases are as follows:

- Base 1: transmits the beacon’s GPS coordinates to the Jetson Orin Nano for use in tracking functionality.

- Base 2: transmits real-time correction messages to the robot’s NEO-M8P-2 module

.. figure:: ../_images/fig7-1_beacon_robo_comms.png
    :align: center
    :width: 50%
    :loading: link

    Figure 7.1: Beacon-to-Robot Communication

.. figure:: ../_images/fig7-2_beacon_robo_dataflow.png
    :align: center
    :width: 50%
    :loading: link

    Figure 7.2: Beacon-to-Robot GPS Data Flowchart
