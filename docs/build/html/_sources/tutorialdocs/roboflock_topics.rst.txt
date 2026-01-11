Using RoboFlock's Topics
========================

To see a list of available interfaces, use the following command:

:code:`ros2 interface list | grep "/msg/"`

To get details about a specific interface, use the following command:

:code:`ros2 interface show [interface name]`

Optionally, if you want to copy the output to your clipboard, make sure :code:`xclip` is installed and use the following command:

:code:`ros2 interface show [interface name] | xclip -selection clipboard`


Ultrasonic Sensors
^^^^^^^^^^^^^^^^^^

:code:`sensor_msgs/msg/Range`

.. code-block:: console

    # Single range reading from an active ranger that emits energy and reports
    # one range reading that is valid along an arc at the distance measured.
    # This message is  not appropriate for laser scanners. See the LaserScan
    # message if you are working with a laser scanner.
    #
    # This message also can represent a fixed-distance (binary) ranger.  This
    # sensor will have min_range===max_range===distance of detection.
    # These sensors follow REP 117 and will output -Inf if the object is detected
    # and +Inf if the object is outside of the detection range.

    std_msgs/Header header # timestamp in the header is the time the ranger
            builtin_interfaces/Time stamp
                    int32 sec
                    uint32 nanosec
            string frame_id
                                # returned the distance reading

    # Radiation type enums
    # If you want a value added to this list, send an email to the ros-users list
    uint8 ULTRASOUND=0
    uint8 INFRARED=1

    uint8 radiation_type    # the type of radiation used by the sensor
                            # (sound, IR, etc) [enum]

    float32 field_of_view   # the size of the arc that the distance reading is
                            # valid for [rad]
                            # the object causing the range reading may have
                            # been anywhere within -field_of_view/2 and
                            # field_of_view/2 at the measured range.
                            # 0 angle corresponds to the x-axis of the sensor.

    float32 min_range       # minimum range value [m]
    float32 max_range       # maximum range value [m]
                            # Fixed distance rangers require min_range==max_range

    float32 range           # range data [m]
                            # (Note: values < range_min or > range_max should be discarded)
                            # Fixed distance rangers only output -Inf or +Inf.
                            # -Inf represents a detection within fixed distance.
                            # (Detection too close to the sensor to quantify)
                            # +Inf represents no detection within the fixed distance.
                            # (Object out of range)

    float32 variance        # variance of the range sensor
                            # 0 is interpreted as variance unknown


LiDAR
^^^^^

:code:`sensor_msgs/msg/LaserScan`

.. code-block:: console

    # Single scan from a planar laser range-finder
    #
    # If you have another ranging device with different behavior (e.g. a sonar
    # array), please find or create a different message, since applications
    # will make fairly laser-specific assumptions about this data

    std_msgs/Header header # timestamp in the header is the acquisition time of
            builtin_interfaces/Time stamp
                    int32 sec
                    uint32 nanosec
            string frame_id
                                # the first ray in the scan.
                                #
                                # in frame frame_id, angles are measured around
                                # the positive Z axis (counterclockwise, if Z is up)
                                # with zero angle being forward along the x axis

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
    float32[] intensities        # intensity data [device-specific units].  If your
                                # device does not provide intensities, please leave
                                # the array empty.


Accelerometer
^^^^^^^^^^^^^

:code:`sensor_msgs/msg/Imu` 

.. code-block:: console

    # This is a message to hold data from an IMU (Inertial Measurement Unit)
    #
    # Accelerations should be in m/s^2 (not in g's), and rotational velocity should be in rad/sec
    #
    # If the covariance of the measurement is known, it should be filled in (if all you know is the
    # variance of each measurement, e.g. from the datasheet, just put those along the diagonal)
    # A covariance matrix of all zeros will be interpreted as "covariance unknown", and to use the
    # data a covariance will have to be assumed or gotten from some other source
    #
    # If you have no estimate for one of the data elements (e.g. your IMU doesn't produce an
    # orientation estimate), please set element 0 of the associated covariance matrix to -1
    # If you are interpreting this message, please check for a value of -1 in the first element of each
    # covariance matrix, and disregard the associated estimate.

    std_msgs/Header header
            builtin_interfaces/Time stamp
                    int32 sec
                    uint32 nanosec
            string frame_id

    geometry_msgs/Quaternion orientation
            float64 x 0
            float64 y 0
            float64 z 0
            float64 w 1
    float64[9] orientation_covariance # Row major about x, y, z axes

    geometry_msgs/Vector3 angular_velocity
            float64 x
            float64 y
            float64 z
    float64[9] angular_velocity_covariance # Row major about x, y, z axes

    geometry_msgs/Vector3 linear_acceleration
            float64 x
            float64 y
            float64 z
    float64[9] linear_acceleration_covariance # Row major x, y z


Motors
^^^^^^

:code:`geometry_msgs/msg/Accel{Stamped, WithCovariance, WithCovarianceStamped}`

:code:`control_msgs/msg/SteeringControllerCommand`


Navigation
^^^^^^^^^^

:code:`nav_msgs/msg/OccupancyGrid{Update}`

:code:`nav_msgs/msg/ProjectedMapInfo`

:code:`nav_msgs/msg/Goals`
    

Battery Life
^^^^^^^^^^^^

:code:`sensor_msgs/msg/BatteryState` 

.. code-block:: console

    # Constants are chosen to match the enums in the linux kernel
    # defined in include/linux/power_supply.h as of version 3.7
    # The one difference is for style reasons the constants are
    # all uppercase not mixed case.

    # Power supply status constants
    uint8 POWER_SUPPLY_STATUS_UNKNOWN = 0
    uint8 POWER_SUPPLY_STATUS_CHARGING = 1
    uint8 POWER_SUPPLY_STATUS_DISCHARGING = 2
    uint8 POWER_SUPPLY_STATUS_NOT_CHARGING = 3
    uint8 POWER_SUPPLY_STATUS_FULL = 4

    # Power supply health constants
    uint8 POWER_SUPPLY_HEALTH_UNKNOWN = 0
    uint8 POWER_SUPPLY_HEALTH_GOOD = 1
    uint8 POWER_SUPPLY_HEALTH_OVERHEAT = 2
    uint8 POWER_SUPPLY_HEALTH_DEAD = 3
    uint8 POWER_SUPPLY_HEALTH_OVERVOLTAGE = 4
    uint8 POWER_SUPPLY_HEALTH_UNSPEC_FAILURE = 5
    uint8 POWER_SUPPLY_HEALTH_COLD = 6
    uint8 POWER_SUPPLY_HEALTH_WATCHDOG_TIMER_EXPIRE = 7
    uint8 POWER_SUPPLY_HEALTH_SAFETY_TIMER_EXPIRE = 8

    # Power supply technology (chemistry) constants
    uint8 POWER_SUPPLY_TECHNOLOGY_UNKNOWN = 0 # Unknown battery technology
    uint8 POWER_SUPPLY_TECHNOLOGY_NIMH = 1    # Nickel-Metal Hydride battery
    uint8 POWER_SUPPLY_TECHNOLOGY_LION = 2    # Lithium-ion battery
    uint8 POWER_SUPPLY_TECHNOLOGY_LIPO = 3    # Lithium Polymer battery
    uint8 POWER_SUPPLY_TECHNOLOGY_LIFE = 4    # Lithium Iron Phosphate battery
    uint8 POWER_SUPPLY_TECHNOLOGY_NICD = 5    # Nickel-Cadmium battery
    uint8 POWER_SUPPLY_TECHNOLOGY_LIMN = 6    # Lithium Manganese Dioxide battery
    uint8 POWER_SUPPLY_TECHNOLOGY_TERNARY = 7 # Ternary Lithium battery
    uint8 POWER_SUPPLY_TECHNOLOGY_VRLA = 8    # Valve Regulated Lead-Acid battery

    std_msgs/Header  header
        builtin_interfaces/Time stamp
            int32 sec
            uint32 nanosec
        string frame_id
    float32 voltage          # Voltage in Volts (Mandatory)
    float32 temperature      # Temperature in Degrees Celsius (If unmeasured NaN)
    float32 current          # Negative when discharging (A)  (If unmeasured NaN)
    float32 charge           # Current charge in Ah  (If unmeasured NaN)
    float32 capacity         # Capacity in Ah (last full capacity)  (If unmeasured NaN)
    float32 design_capacity  # Capacity in Ah (design capacity)  (If unmeasured NaN)
    float32 percentage       # Charge percentage on 0 to 1 range  (If unmeasured NaN)
    uint8   power_supply_status     # The charging status as reported. Values defined above
    uint8   power_supply_health     # The battery health metric. Values defined above
    uint8   power_supply_technology # The battery chemistry. Values defined above
    bool    present          # True if the battery is present

    float32[] cell_voltage   # An array of individual cell voltages for each cell in the pack
                            # If individual voltages unknown but number of cells known set each to NaN
    float32[] cell_temperature # An array of individual cell temperatures for each cell in the pack
                            # If individual temperatures unknown but number of cells known set each to NaN
    string location          # The location into which the battery is inserted. (slot number or plug)
    string serial_number     # The best approximation of the battery serial number
