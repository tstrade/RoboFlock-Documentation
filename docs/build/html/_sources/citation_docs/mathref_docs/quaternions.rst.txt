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
Let's break this down, one equation at a time:

1. **The Quaternion Definition**

A quaternion :math:`q` can also be described by :math:`a + b \hat{\imath} + c \hat{\jmath} + d \hat{k}; \ a, b, c, d \in \mathbb{R}` with :math:`a` being its rotational scalar and :math:`b, c, d` being the coefficients of its basis vectors. We can also visualize this as a :math:`4 \times 1` column vector, but we'll use the given coefficients instead of :math:`a,b,c,d`:

.. math::
    \begin{pmatrix} \cos \frac{\beta}{2} \\ e_{1} \sin \frac{\beta}{2} \\ e_{2} \sin \frac{\beta}{2} \\ e_{3} \sin \frac{\beta}{2} \end{pmatrix}


2. **The Set of All Quaternions**

We can think of :math:`q_{0}^{2} + \vec{q}^{T} \vec{q} = 1` in a similar way as the definition of a unit circle, :math:`x^{2} + y^{2} = 1`. Remember that the dot prouct :math:`\vec{q}^{T} \vec{q}` (which is equivalent to :math:`\vec{q} \vec{q}^{T}`) produces a scalar value. If we expand this notation out, our equation looks like this:

.. math::
    \cos^{2} \frac{\beta}{2} + \sin^{2} \frac{\beta}{2} \cdot (e_{1}^{2} + e_{2}^{2} + e_{3}^{2}) = 1

The other rule, :math:`q = [q_{0} \vec{q}^{T}]^{T}`, simply means that the quaternion :math:`q` is a column vector in which the first entry is the rotational scalar :math:`q_{0}`, and the following three entries corresponding to quaternion's 3D vector. 


3. **Quaternion Multiplication**

Quaternion multiplication is a non-commutative (i.e., order matters) operation that essentially applies each quaternion's rotation in succession. Consider quaternions :math:`q = [a b c d]^{T}` and :math:`p = [e f g h]^{T}`. We define their product, :math:`t`, as follows:

.. math::
    q \otimes p = \begin{pmatrix} ae - bf - cg -dh \\ af + be + ch + dg \\ ag - bh + ce + df \\ ah + bg - cf + de \end{pmatrix} = \begin{pmatrix} t_{0} \\ t_{1} \\ t_{2} \\ t_{3} \end{pmatrix}


4. **Conjugate Quaternion Multiplication**

Here we refer to the quaternion's conjugate, which is obtained by negating each of the vector's entries, effectively inverting the direction of the quaternion's vector component. In our case, the conjugate is:

.. math::
    \overline{q} = \begin{pmatrix} \cos \frac{\beta}{2} \\ -e_{1} \sin \frac{\beta}{2} \\ -e_{2} \sin \frac{\beta}{2} \\ -e_{3} \sin \frac{\beta}{2} \end{pmatrix}


5. **Rotation Matrices**

Rotation matrices are use in matrix multiplication with column vectors to enact some rotation in the vector's plane by some angle. Here, we are given the rotation matrix :math:`C(q)` that is made up of four components:

    i. :math:`q_{0}^{2} - \vec{q}^{\ T} \vec{q}` results in an arbitrary scalar value that we'll denote as :math:`\omega`.

    ii. :math:`I_{3}` is the :math:`3 \times 3` identity matrix, i.e., its diagonal entries are all 1 and all other entries are 0.

    iii. :math:`\vec{q} \ \vec{q}^{\ T}` is the dot product between the quaternion's vector component and itself, which we will denote as :math:`\alpha`.

    iv. :math:`[\vec{q}^{\ x}]` is a skew symmetric tensor with axis vector :math:`\vec{q}`.

.. note::
    Tensors are a whole discussion of their own, so we won't go into depth about them, but here's a broad overview:
    
    - *Tensors* are algebraic objects that describe multilinear relationships (i.e., relationships between multiple linear variables) between sets of algebraic objects associated with a vector space, such as vectors, scalars, matrices, and other tensors. :raw-html:`<br />`

    - *Skew-symmetric tensors* are tensors whose components change signs when any two indices are swapped, i.e., for some tensor :math:`T`, we have :math:`T^{T} = -T`. 

:raw-html:`<br />`
Given each of these components, the resulting rotation matrix should look like:

.. math::
    C(q) = \begin{pmatrix} \omega & -2(\alpha - q_{0})q_{3} & 2(\alpha - q_{0})q_{2} \\ 2(\alpha - q_{0})q_{3} & \omega & -2(\alpha - q_{0})q_{1} \\ -2(\alpha - q_{0})q_{2} & 2(\alpha - q_{0})q_{1} & \omega \end{pmatrix}

:raw-html:`<br />`
Notice the symmetry between the columns and the rows. Each axis moves in its own plane by the scalar :math:`\omega`. In the remaining two planes, the axis moves by the scalar :math:`(\alpha - q_{0})` times the respective vector component :math:`q_{i}`. This is how quaternions end up describing 3D rotations! The rotation angle :math:`\beta`, which controls the value of :math:`q_{0}`, ultimately decides how a quaternion acts on a 3D object. 

In the context of ROS2, we can think of our :code:`odom` frame as being the Euler axis, :math:`\vec{e}`. Describing our translations between frames is essentially defining a value of :math:`\beta` that can enact the necessary rotations between any two frames. By setting up the relationships between frames, we are giving TF2 the information it needs to use dynamic translations that update as the robot moves around. In other words, TF2 gives the robot a sense of its surroundings. 



References
^^^^^^^^^^

Rico, F. (2023). *A Concise Introduction to Robot Programming with ROS2.* CRC Press. 

Griffin, S. (Ed.). (2017). *Quaternions : Theory and applications.* Nova Science Publishers, Incorporated.