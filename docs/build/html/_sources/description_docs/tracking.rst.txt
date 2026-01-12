Tracking
========



Beacon
^^^^^^

The beacon will be a portable-handheld device. It will act as a homing system for the robot, and the robot will follow it at a certain distance to the best of its ability in an outdoor environment. The beacon consists of a battery system, GPS module, and LEDs to make it exciting to possess. It will also alert the user if the robot has any problems, such as getting stuck or low battery power.



Architectural Block Diagram
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. figure:: ../_images/fig5_beacon_rover_datastream.png
    :align: center
    :width: 80%
    :loading: link

    Figure 5: Block Diagram for the Beacon to Rover Correction Data Stream



Tracking Functionality
^^^^^^^^^^^^^^^^^^^^^^

Real-time kinematic (RTK) positioning is a form of differential GPS that uses a known coordinate location to determine errors in GPS coordinates with centimeter-level accuracy. This information is used to obtain correctional data that can be sent out to other GPS modules in the area. In short, RTK allows for the system to work based on relative locations instead of absolute locations. 

The setup involves a “rover” and “base” module, which are analogous to the robot and beacon, respectively. Each module obtains GPS coordinates individually, with the addition that the beacon also provides error corrections that are sent out to the robot. Using the beacon’s location as the frame of reference, a position vector in the direction of the beacon will guide the robot from its current position to its next position.



GPS Visualization Simulation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As an intermediate step between fully implementing and starting to test the GPS visualization functionality, we will simulate the expected outputs from the Beacon and Robot GPS modules to the Jetson Orin Nano.  By simulating this network traffic under assumption of NMEA data format used for the GPS data we will write a script in Python that extracts latitude and longitude information from each module’s raw NMEA data stream and using this position information we visualize the location of the Robot and Beacon on a map using the Folium mapping library.

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



NEO-M8P-2
^^^^^^^^^

The NEO-M8P-2 module is an RTK capable GPS module with L1 satellite constellations mounted on the Robot which will accept RTCM correction data from the ZED-F9P GPS module in order to achieve centimeter level position coordinate accuracy in Rover configuration relative to the Beacon’s moving baseline configuration.  We will use this module to obtain position coordinates of the Robot which in combination with the position coordinates of the Beacon obtained via the ZED-F9P will allow us to track the Beacon and Robot positions relative to one another.

.. figure:: ../_images/fig8_neo_pinout.png
    :align: center
    :width: 50%
    :loading: link

    Figure 8: u-blox NEO-M8P Pinout



ZED-F9P
^^^^^^^

The ZED-F9P GPS module is a RTK capable module with access to the L1 and L2 satellite constellations.  We will use this module on the Beacon as a moving baseline, allowing for GPS correction data to be determined relative to the Beacon’s position and sent to the Robot’s NEO-M8P-2 GPS module resulting in centimeter level position coordinate accuracy for both Beacon and Robot.

.. figure:: ../_images/fig9_zed_pinout.png
    :align: center
    :width: 50%
    :loading: link
    
    Figure 9: u-blox ZED-F9P Pinout



HC-12
-----

The HC-12 wireless serial port communication module is a new-generation multichannel embedded wireless data transmission module. Its wireless working frequency band is 433.4-473.0MHz, multiple channels can be set, with the stepping of 400 KHz, and there are totally 100 channels. The maximum transmitting power of the module is 100mW (20dBm), the receiving sensitivity is -117dBm at a baud rate of 5,000bps in the air, and the communication distance is 1,000m in open space.

.. figure:: ../_images/fig10_hc12_pinout.png
    :align: center
    :width: 50%
    :loading: link

    Figure 10: HC-12 Pinout

***HC-12 Pin Layout***

- 3: RXD, UART input port

- 4: TXD, UART output port

- 5: SET, config control port

- 6: ANT, external antenna for transmission and reception

This module interfaces seamlessly with microcontrollers via the UART hardware interface, enabling reliable communication through the RXD and TXD pins.