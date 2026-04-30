============
Drive System
============

The RoboFlock is driven by four identical BLDC motors — one per wheel — with
heading controlled purely by differential torque across left and right pairs
(skid-steer). There is no steering linkage; the wheels are fixed in
orientation relative to the side rail they mount to.



Drive Corner — Torque Path
++++++++++++++++++++++++++

Each of the four drive corners is mechanically identical and follows the same
chain from motor to ground:

.. code-block:: text

    BLDC motor
        │  (keyed shaft)
        ▼
    Clamping shaft coupling   ── RV1-DRV-CPL-001
        │
        ▼
    Wheel drive adapter       ── RV1-WHL-001
        │
        ▼
    18″ airless wheel

The motor itself is fixed to a 3D-printed motor bracket (``RV1-DRV-BKT-001``).
Inside the bracket, a press-fit radial ball bearing supports the motor shaft
on the coupling side — this offloads radial load from the motor's internal
bearings, which would otherwise be cantilevered through the coupling.

The clamping coupling has two bores: one keyed for the motor shaft, one
plain-bored for the adapter shoulder. The adapter is screwed into the
coupling's plain bore and bolted to the wheel hub pattern, converting the
airless wheel into a driven wheel.



Motor Mounting
++++++++++++++

The motor bracket bolts to the **inner rail** of the side extrusion using 3
bolts and T-nuts. Mounting is symmetric front-to-back (the same bracket part
is used for both motor positions on a side), and mirror-imaged left-to-right.

.. important::

   Apply medium-strength threadlocker to the motor-to-bracket fasteners.
   These bolts see oscillating loads through the bearing-coupling stack and
   are the most likely fastener on the robot to back out under vibration.



Per-Corner Hardware
+++++++++++++++++++

For one drive corner you will need:

- 1× BLDC motor (assembly model TBD — see hardware catalog)

- 1× motor-shaft radial bearing, press-fit into bracket (TBD)

- 1× ``RV1-DRV-BKT-001`` motor bracket (printed)

- 3× M? cap screws + T-nuts, bracket → extrusion (TBD)

- 1× ``RV1-DRV-CPL-001`` clamping shaft coupling

- 1× ``RV1-WHL-001`` wheel drive adapter (printed)

- 1× 18″ airless wheel

- Adapter-to-coupling and adapter-to-wheel fasteners (TBD)

.. @todo: The robot uses **four** drive corners total — full quantities live in the :doc:`../parts_catalog`.



Cable Management
++++++++++++++++

Motor leads route up the inner face of the extrusion and pass through
grommeted holes in the bottom of the main chassis frame. Inside the body,
they continue up into the hull through the floor of the battery compartment
and terminate at the motor drivers. Service loops at each end let the
suspension pivot through its full range without pulling on the strain
reliefs.

.. @todo: See :doc:`hull_and_enclosures` for the cable pass-through points and :doc:`../wiring_specifications` for wire gauge and color conventions.



.. seealso::

    :doc:`Frame and Extrusion <frame_and_extrusion>`
        The rails the motors mount to

    :doc:`Suspension <suspension>`
        What couples the two sides under articulation

.. @todo: :doc:`../parts_catalog` — files and BOM for each drive part