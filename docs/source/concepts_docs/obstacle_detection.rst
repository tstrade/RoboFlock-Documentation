Obstacle Detection
==================


In order to navigate through the chaotic environment of Burning Man, the robot uses an onboard, 360° 2-D LiDAR. A near-infrared laser diode creates a beam that is swept around the environment by a rotating mirror and reflected off of any in-range objects back to the sensor. Time-of-flight (ToF) data is used by the LiDAR sensor to measure the relative distance of surrounding objects and produce a continuous stream of polar coordinates. These measurements are then sent to the Nvidia Jetson through USB-A connection. 


To complement the location mapping provided by the LiDAR sensor, three ultrasonic sensors will provide data for short-distance obstacle avoidance. This system acts as a fail-safe to the LiDAR’s obstacle avoidance in the case that there are environmental factors that hinder the functionality of the LiDAR sensor. Furthermore, they are positioned at the ground different from the angle of the LiDAR and can be used to detect obstacles that are not detected by the LiDAR.


.. figure:: ../_images/fig4-2_sonar_positions.png
    :align: center
    :width: 50%
    :loading: link

    Ultrasonic Sensor Positioning and Ranges


.. note::

    See :doc:`../hardware_docs/rp_lidar` and :doc:`../hardware_docs/hc_sr04` for hardware specifications.
