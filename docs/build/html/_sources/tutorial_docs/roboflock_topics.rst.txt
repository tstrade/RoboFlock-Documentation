Using RoboFlock's Topics
========================

To see a list of available interfaces, use the following command:

:code:`ros2 interface list | grep "/msg/"`

To get details about a specific interface, use the following command:

:code:`ros2 interface show [interface name]`

Optionally, if you want to copy the output to your clipboard, make sure :code:`xclip` is installed and use the following command:

:code:`ros2 interface show [interface name] | xclip -selection clipboard`

All messages share a :code:`header` element, which consists of the time the message was created (in both seconds and nanoseconds) and of a frame ID, which is how the navigation system keeps track of where each component is in 3D space, tying the incoming data to the appropriate transformations. The following sections describe the key components of each message type used by RoboFlock. Irrelevant components (e.g., z-axis information) are excluded.


Ultrasonic Sensors
^^^^^^^^^^^^^^^^^^

:code:`sensor_msgs/msg/Range`

.. code-block:: console

    float32 field_of_view   # the size of the arc that the distance reading is
                            # valid for [rad]
                            # the object causing the range reading may have
                            # been anywhere within -field_of_view/2 and
                            # field_of_view/2 at the measured range.
                            # 0 angle corresponds to the x-axis of the sensor.

    float32 min_range       # minimum range value [m]
    float32 max_range       # maximum range value [m]

    float32 range           # range data [m]
                            # (Note: values < range_min or > range_max should be discarded)



LiDAR
^^^^^

:code:`sensor_msgs/msg/LaserScan`

.. code-block:: console

    float32 angle_min            # start angle of the scan [rad]
    float32 angle_max            # end angle of the scan [rad]
    float32 angle_increment      # angular distance between measurements [rad]

    float32 time_increment       # time between measurements [seconds] - if your scanner
                                # is moving, this will be used in interpolating position
                                # of 3d points
    float32 scan_time            # time between scans [seconds]

    float32 range_min            # minimum range value [m]
    float32 range_max            # maximum range value [m]

    float32[] ranges             # range data [m]
                                # (Note: values < range_min or > range_max should be discarded)


Accelerometer
^^^^^^^^^^^^^

:code:`sensor_msgs/msg/Imu` 

.. code-block:: console

    geometry_msgs/Quaternion orientation
            float64 x 0
            float64 y 0
            float64 w 1

    geometry_msgs/Vector3 angular_velocity
            float64 x
            float64 y

    geometry_msgs/Vector3 linear_acceleration
            float64 x
            float64 y



Motors
^^^^^^

:code:`geometry_msgs/msg/Twist`

.. code-block:: console

    # This expresses velocity in free space broken into its linear and angular parts.
    Vector3  linear
        float64 x
        float64 y
    Vector3  angular
        float64 x
        float64 y



Navigation
^^^^^^^^^^

:code:`sensor_msgs/msg/nav_sat_fix`

.. code-block:: console

    # Satellite fix status information.
    NavSatStatus status

    # Latitude [degrees]. Positive is north of equator; negative is south.
    float64 latitude

    # Longitude [degrees]. Positive is east of prime meridian; negative is west.
    float64 longitude

    # Position covariance [m^2] defined relative to a tangential plane
    # through the reported position. The components are East, North, and
    # Up (ENU), in row-major order.
    float64[9] position_covariance




