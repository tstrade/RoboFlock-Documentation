Rotations with Quaternions
==========================

.. include:: ../../_templates/constants.rst


Transformation matrices are an essential component to TF2. They allow for all the different components in a robot to use different reference axes (or *frames*) and their relationships. *A Concise Introduction to Robot Programming with ROS2* (Rico 2023, pg. 65-66) gives a good overview of the general process that TF2 uses:

.. container:: colored-quote

    Algebraically, [relating frames] is done using homogeneous coordinates of a point :math:`P` in a frame :math:`A`, this is :math:`P_{A}`, we can calculate :math:`P_{B}` in frame :math:`B` using the transformation matrix :math:`RT_{A \rightarrow B}` as follows:

    .. math::
        \begin{align} P_{B} &= RT_{A \rightarrow B} * P_{A} & (4.1) \end{align}

    .. math::
        \begin{align} \begin{pmatrix} x_{B} \\ y_{B} \\ z_{B} \\ 1 \end{pmatrix} &= \begin{pmatrix} R^{xx}_{A \rightarrow B} & R^{xy}_{A \rightarrow B} & R^{xz}_{A \rightarrow B} & T^{x}_{A \rightarrow B} \\ R^{yx}_{A \rightarrow B} & R^{yy}_{A \rightarrow B} & R^{yz}_{A \rightarrow B} & T^{y}_{A \rightarrow B} \\ R^{zx}_{A \rightarrow B} & R^{zy}_{A \rightarrow B} & R^{zz}_{A \rightarrow B} & T^{z}_{A \rightarrow B}  \\ 0 & 0 & 0 & 1\end{pmatrix} * \begin{pmatrix} x_{A} \\ y_{A} \\ z_{A} \\ 1 \end{pmatrix} & (4.2) \end{align}

:raw-html:`<br />`
TF2 uses messages of type :code:`tf2_msgs/msg/TFMessage`, which holds the following data:

.. code-block:: console

    $ ros2 interface show tf2_msgs/msg/TFMessage

    geometry_msgs/TransformStamped[] transforms
        std_msgs/Header header
        string child_frame_id
        Transform transform
            Vector3 translation
                float64 x
                float64 y
                float64 z
            Quaternion rotation
                float64 x 0
                float64 y 0
                float64 z 0
                float64 w 1

As transformations are propagated through a system's TF tree, it is standard for the output header to match the input header. The child frame ID is the ID of the new frame to be created by a given transformation. 

The transform itself consists of a translation and a rotation. The translation describes the Euclidean distance between the "origin" of each frame. For example, this could be the distance from the robot's center to the center of one of its sensors. The rotation describes how the frame is rotated after the translation is applied. For example, two of RoboFlock's ultrasonic sensor's do not face the same direction as the robot's "forward" direction, so a rotation would need to be applied. 

This message definition contains an interesting term: *quaternion*. Quaternions are mathematical objects used to described 3D orientations and rotations. From *Quaternions: Theory and Applications* (Griffin 2017, pg.88-89):

.. container:: colored-quote 

    [The] attitude of a rigid body can be represented by unit quaternion, consisting of a unit vector :math:`\vec{e}` known as the Euler axis, and a rotation angle :math:`\beta` about this axis. The quaternion :math:`q` is the defined as follows:

    .. math::
        \begin{align} q &= \begin{pmatrix} \cos \frac{\beta}{2} \\ \vec{e} \sin \frac{\beta}{2} \end{pmatrix} = \begin{pmatrix} q_{0} \\ \vec{q} \end{pmatrix} \in \mathbb{H} & (1) \end{align}

    where

    .. math::
        \begin{align} \mathbb{H} &= \ \ \begin{array}{ll} \qquad \ \{ \ q \ | \ q_{0}^{2} + \vec{q}^{\ T} \ \vec{q} = 1 \\ q = [ \ q_{0} \ \vec{q}^{\ T} \ ]^{\ T}, \ q_{0} \in \mathbb{R}, \ \vec{q} \in \mathbb{R}^{3} \ \} \end{array} & (2) \end{align}

    :math:`\vec{q} = [q_{1} \ q_{2} \ q_{3}]^{T}` and :math:`q_{0}` are known as the vector and scalar parts of the quaternion respectively. In attitude control applications, the unit quaternion represents the rotation from an inertial coordinate systen :math:`N(x_{n}, \ y_{n}, \ z_{n})` located at some point in the space (for instance, the earth NED frame), to the body coordinate system :math:`B(x_{b}, \ y_{b}, \ z_{b})` located on the center of mass of a rigid body.

    If :math:`\vec{r}` is a vector expressed in :math:`N`, then its coordinates in :math:`B` are expressed by:

    .. math::
        \begin{align} b &= \overline{q} \otimes r \otimes q & (3) \end{align}

    where :math:`b = [0 \ \vec{b}^{\ T}]^{T}` and :math:`r = [0 \ \vec{r}^{\ T}]^{T}` are the quaternions associated to vectors :math:`\vec{b}` and :math:`\vec{r}` respectively. :math:`\otimes` denotes the quaternion multiplication and :math:`\overline{q}` is the conjugate quaternion multiplication of :math:`q`, defined as:

    .. math::
        \begin{align} \overline{q} &= [q_{0} - \vec{q}^{\ T}]^{T} & (4) \end{align}

    The rotation matrix :math:`C(q)` corresponding to the attitude quaternion :math:`q`, is computed as:

    .. math::
        \begin{align} C(q) &= (q_{0}^{2} - \vec{q}^{\ T} \ \vec{q})I_{3} + 2(\vec{q} \vec{q}^{\ T} - q_{0} [\vec{q}^{x}]) & (5) \end{align}

    where :math:`I_{3}` is the identity matrix and :math:`[\xi^{x}]` is a skew symmetric tensor associated with the axis vector :math:`\xi`:

    .. math::
        \begin{align} [\xi^{x}] &= \begin{pmatrix} \xi_{1} \\ \xi_{2} \\ \xi_{3} \end{pmatrix}^{x} = \begin{pmatrix} 0 & -\xi_{3} & \xi_{2} \\ \xi_{3} & 0 & -\xi_{1} \\ -\xi_{2} & \xi_{1} & 0 \end{pmatrix} & (6) \end{align}

    Thus, the coordinate of vector :math:`\vec{r}` expressed in the :math:`B` frame is given by:

    .. math::
        \begin{align} \vec{b} &= C(q)\vec{r} & (7) \end{align}

:raw-html:`<br />`
Here, we can see that Griffin's Eq. 7 is equivelent to Rico's Eq. 4.1. Thanks to TF2, we don't have to worry about computing any of these intermediate steps. However, understanding the underlying mechanics helps us appreciate the work that TF2 does behind the scenes. 

.. note::

    - :math:`\mathbb{H}` is the set of all quaternions. :raw-html:`<br />`


    - *Euler's Rotation Theorem* says that any displacement of a rigid body in 3D space such that a point on said body remains fixed, is equivalent to a single rotation about some axis that runs through the fixed point. This axis is known as an *Euler axis*, denoted as :math:`\vec{e}` or :math:`\hat{e}`. :raw-html:`<br />`


    - *Quaternion multiplication* is a non-commutative operation that applies the first rotation followed by the second rotation. :raw-html:`<br />`


    - *Conjugate quaternion multiplication* first inverses the vector of a quaternion and then multiplies, which effectively reverse the direction of rotation. :raw-html:`<br />`


    - *Rotation matrices* are use in multiplication with column vectors to enact some rotation in the vector's plane by some angle :math:`\theta`. :raw-html:`<br />`


    - *Tensors* are algebraic objects that describe multilinear relationships between sets of algebraic objects associated with a vector space, such as vectors, scalars, matrices, and other tensors. :raw-html:`<br />`


    - *Skew-symmetric tensors* are tensors whose components change signs when any two indices are swapped, i.e., for some tensor :math:`T`, we have :math:`T^{T} = -T`. 


References
^^^^^^^^^^

Rico, F. (2023). *A Concise Introduction to Robot Programming with ROS2.* CRC Press. 

Griffin, S. (Ed.). (2017). *Quaternions : Theory and applications.* Nova Science Publishers, Incorporated.