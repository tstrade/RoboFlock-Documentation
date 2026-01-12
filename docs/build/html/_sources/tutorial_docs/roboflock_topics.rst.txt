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

.. code-block:: console

    # Iff stamped, this header is included in the msg
    # An accel with reference coordinate frame and timestamp
    std_msgs/Header header
        builtin_interfaces/Time stamp
            int32 sec
            uint32 nanosec
        string frame_id

    # Base information for all versions of accel msg
    # This expresses acceleration in free space broken into its linear and angular parts.
    Vector3  linear
        float64 x
        float64 y
        float64 z
    Vector3  angular
        float64 x
        float64 y
        float64 z

    # Iff using covariance, this matrix is included in the msg
    # Row-major representation of the 6x6 covariance matrix
    # The orientation parameters use a fixed-axis representation.
    # In order, the parameters are:
    # (x, y, z, rotation about X axis, rotation about Y axis, rotation about Z axis)
    float64[36] covariance


:code:`control_msgs/msg/SteeringControllerCommand`

.. code-block:: console

    std_msgs/Header header
        builtin_interfaces/Time stamp
            int32 sec
            uint32 nanosec
        string frame_id

    float64 steering_angle  # in rad
    float64 linear_velocity # in m/s



Navigation
^^^^^^^^^^

:code:`nav_msgs/msg/OccupancyGrid`

.. code-block:: console

    # This represents a 2-D grid map
    std_msgs/Header header
        builtin_interfaces/Time stamp
            int32 sec
            uint32 nanosec
        string frame_id

    # MetaData for the map
    MapMetaData info
        builtin_interfaces/Time map_load_time
            int32 sec
            uint32 nanosec
        float32 resolution
        uint32 width
        uint32 height
        geometry_msgs/Pose origin
            Point position
                float64 x
                float64 y
                float64 z
            Quaternion orientation
                float64 x 0
                float64 y 0
                float64 z 0
                float64 w 1

    # The map data, in row-major order, starting with (0,0).
    # Cell (1, 0) will be listed second, representing the next cell in the x direction.
    # Cell (0, 1) will be at the index equal to info.width, followed by (1, 1).
    # The values inside are application dependent, but frequently,
    # 0 represents unoccupied, 1 represents definitely occupied, and
    # -1 represents unknown.
    int8[] data



:code:`nav_msgs/msg/Goals`

.. code-block:: console

    # An array of navigation goals

    # This header will store the time at which the poses were computed (not to be confused with the stamps of the poses themselves)
    # In the case that individual poses do not have their frame_id set or their timetamp set they will use the default value here.
    std_msgs/Header header
        builtin_interfaces/Time stamp
            int32 sec
            uint32 nanosec
        string frame_id

    # An array of goals to for navigation to achieve.
    # The goals should be executed in the order of the array.
    # The header and stamp are intended to be used for computing the position of the goals.
    # They may vary to support cases of goals that are moving with respect to the robot.
    geometry_msgs/PoseStamped[] goals
        std_msgs/Header header
            builtin_interfaces/Time stamp
                int32 sec
                uint32 nanosec
            string frame_id
        Pose pose
            Point position
                float64 x
                float64 y
                float64 z
            Quaternion orientation
                float64 x 0
                float64 y 0
                float64 z 0
                float64 w 1


:code:`nav_msgs/msg/Odometry`

.. code-block:: console

    # This represents an estimate of a position and velocity in free space.
    # The pose in this message should be specified in the coordinate frame given by header.frame_id
    # The twist in this message should be specified in the coordinate frame given by the child_frame_id

    # Includes the frame id of the pose parent.
    std_msgs/Header header
        builtin_interfaces/Time stamp
            int32 sec
            uint32 nanosec
        string frame_id

    # Frame id the pose points to. The twist is in this coordinate frame.
    string child_frame_id

    # Estimated pose that is typically relative to a fixed world frame.
    geometry_msgs/PoseWithCovariance pose
        Pose pose
            Point position
                float64 x
                float64 y
                float64 z
            Quaternion orientation
                float64 x 0
                float64 y 0
                float64 z 0
                float64 w 1
        float64[36] covariance

    # Estimated linear and angular velocity relative to child_frame_id.
    geometry_msgs/TwistWithCovariance twist
        Twist twist
            Vector3  linear
                float64 x
                float64 y
                float64 z
            Vector3  angular
                float64 x
                float64 y
                float64 z
        float64[36] covariance


:code:`nav_msgs/msg/Path`

.. code-block:: console

    # An array of poses that represents a Path for a robot to follow.

    # Indicates the frame_id of the path.
    std_msgs/Header header
        builtin_interfaces/Time stamp
            int32 sec
            uint32 nanosec
        string frame_id

    # Array of poses to follow.
    geometry_msgs/PoseStamped[] poses
        std_msgs/Header header
            builtin_interfaces/Time stamp
                int32 sec
                uint32 nanosec
            string frame_id
        Pose pose
            Point position
                float64 x
                float64 y
                float64 z
            Quaternion orientation
                float64 x 0
                float64 y 0
                float64 z 0
                float64 w 1



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
