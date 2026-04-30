===================
Frame and Extrusion
===================

The structural backbone of the RoboFlock is split between two parts that work
together: a pair of 4080 aluminum extrusions running along the sides of the
robot, and a 3D-printed main chassis frame that hangs above them.

This split keeps the high-load mounting interfaces (motor brackets, suspension
brackets) on rigid metal extrusion, while the printed frame carries the lower
loads associated with the body, battery compartment, and hull.



Side Rails — 4080 Extrusion
+++++++++++++++++++++++++++

Each side of the robot has a single length of 4080 T-slot aluminum extrusion
running front-to-back. The profile is mounted with the **40 mm face down**, so
the rail stands 80 mm tall.

Each rail provides three structural functions:

- **Inner rail** (the face pointing toward the centerline of the robot) — the
  two motor brackets for that side bolt to this rail, 3 bolts each, into the
  T-slot.

- **Outer rail** (the face pointing outward) — the rocker body bracket for
  that side clamps around this rail, anchored with 4 bolts (2 into the top
  T-slot, 2 into the bottom).

- **Top rail** — provides the mounting interface for the printed main chassis
  frame, which sits over and across both extrusions.

.. @todo: See ``RV1-CHS-FRM-001`` in the :doc:`../parts_catalog` for sourcing and exact length.

.. note::

   Length, fastener size, and T-nut style are still TBD in the catalog —
   confirm with assembly hardware once the first set is sourced.



Main Chassis Frame
++++++++++++++++++

The main chassis frame (``RV1-CHS-001``) is the largest single 3D-printed
part on the robot. It serves three roles:

#. Mounts the body, battery compartment, and hull (top + bottom screw
   interfaces).

#. Provides the **suspension pivot ears** — two L-shaped projections that
   drop down from above the extrusions. Each ear contains a press-fit
   bearing whose inner race rides on the outer diameter of the suspension's
   inboard hollow rod stub. This pair of bearings defines the per-side
   suspension pivot axis.

#. Anchors the rocker differential arm — at the front of the frame, a
   shoulder bolt threads upward into the frame, providing a vertical pivot
   for ``RV1-SUS-001``.

The frame is printed in ABS, flat on bed, 40% infill at 0.2 mm layer height.
Brass M6 heat-set inserts (``INS-M6-BRASS-HEATSET``, 4×) handle the high-load
mating surfaces.

.. attention::

   The "ears" carry the entire suspended weight of the robot through their
   pressed bearings. Inspect for layer delamination or insert pull-out before
   each test session and re-print if any cracking is visible around the
   bearing seats.



Load Path Summary
+++++++++++++++++

Vertical load travels:

.. code-block:: text

    Hull, electronics, battery
              │
              ▼
        Main chassis frame
              │
              ▼
    Bearings in frame ears
              │
              ▼
       Hollow rod stubs
              │
              ▼
        12 mm pivot hubs
              │
              ▼
      Rocker body brackets
              │
              ▼
         4080 extrusions
              │
              ▼
    Motor brackets ───► Motors ───► Wheels ───► Ground

The differential arm and its pushrods do **not** carry vertical load directly —
they constrain anti-symmetric pivot motion between the two sides, and absorb
only the differential force needed to enforce that constraint.



.. seealso::

    :doc:`Drive System <drivetrain>` 
        What bolts to the inner rails of the extrusions

    :doc:`Suspension <suspension>`
        What hangs from the ears of the main frame

.. @todo: - :doc:`../parts_catalog` — files and BOM for every part referenced here