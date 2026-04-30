Design Overview
===============

The RoboFlock rover is a four-wheel, skid-steered outdoor robot built around a
3D-printed structural frame and a pair of 4080 aluminum extrusion rails. The
mechanical design optimizes for outdoor durability, modular iteration during
prototyping, and a low center of gravity for stability on uneven terrain such
as the Black Rock playa.

This page is a high-level walkthrough. Detailed geometry, fasteners, and CAD
files for every part live in the :doc:`parts_catalog` and the per-subsystem
pages linked below.



Design Goals
^^^^^^^^^^^^

- **Stable Sensor Integration** — provide a clear 360° view for the LiDAR and a
  fixed forward placement for the ultrasonic sensors and GPS antenna.

- **Electronics Accommodation** — segregate the battery (low, in a separate
  compartment) from compute and motor drivers (in the upper hull), with
  organized cable routing between the two.

- **Outdoor Operation** — maintain a rigid structure, good impact resistance,
  and a low center of gravity for rough terrain.

- **Modular Suspension** — a rocker-differential linkage that keeps all four
  wheels in ground contact across uneven terrain without active components.

- **Iterability** — a fully parametric Fusion 360 design so dimensions, mounts,
  and structural features can be updated without re-engineering the system.



Architecture at a Glance
^^^^^^^^^^^^^^^^^^^^^^^^

From the ground up:

#. **Drive corners (×4)** — each wheel is driven by a BLDC motor. The motor
   bolts to a 3D-printed bracket containing a press-fit radial bearing that
   supports the motor shaft. The keyed shaft drives a clamping coupling, which
   bolts to a 3D-printed adapter, which carries an 18″ airless wheel.

#. **Side rails (×2)** — one 4080 T-slot extrusion runs front-to-back on each
   side (mounted with the 40 mm face down, 80 mm tall). Both motor brackets on
   that side bolt to the **inner** rail of the extrusion; the suspension
   bracket clamps to the **outer** rail.

#. **Side suspension pivots (×2)** — a printed bracket clamps onto each
   extrusion (4 bolts: 2 top rail, 2 bottom rail) and carries a 12 mm bore
   pivot hub. From each hub a hollow rod stub extends inboard. The two stubs
   meet near the centerline, where a solid linear rod slides inside both
   halves and acts as the through-shaft bearing surface — letting each side
   pivot independently.

#. **Main chassis frame** — a 3D-printed structure with two L-shaped "ears"
   that drop down from above the extrusions. Each ear has a press-fit ball
   bearing whose inner race rides on the OD of the inboard hollow rod. This
   is the per-side pivot the rest of the body hangs from.

#. **Differential coupling** — a 3D-printed rocker-differential arm sits on a
   vertical shoulder bolt at the front of the main frame. Two pushrod
   assemblies (threaded rod with a ball-joint rod end at each tip) link this
   arm to the side suspension brackets — the side-facing rod end couples to
   the bracket, the upward-facing rod end couples to the arm. This forces
   anti-symmetric travel: when one side rises, the other is driven down.

#. **Battery compartment** — bolted to the underside of the main frame,
   housing the 3S LiPo and bus-bar wiring.

#. **Hull and top cover** — the main hull bolts to the top of the main frame
   and houses the Jetson Orin Nano and motor drivers. Motor leads route up
   from the battery compartment into the hull. The hull top latches down,
   carries the LiDAR (in a twist-lock slot) and the GPS ground plane.

This mechanical architecture is **independent (per-side vertical pivot) plus
dependent (rocker-differential)**: each side can articulate over an obstacle,
but the front cross-link constrains both sides to share roll axis travel. With
no steering linkage, heading is controlled purely by differential torque
across the four BLDCs (skid-steer).



Where to Read Next
^^^^^^^^^^^^^^^^^^

- :doc:`subsystems/frame_and_extrusion` — extrusion layout and main frame geometry
- :doc:`subsystems/drivetrain` — motor → coupling → wheel torque path
- :doc:`subsystems/suspension` — rocker-differential mechanics in detail
- :doc:`subsystems/hull_and_enclosures` — hull, top cover, battery compartment, sensor mounts
- :doc:`fabrication_guide` — step-by-step assembly order
- :doc:`parts_catalog` — every part with files and BOM
- :doc:`hardware_catalog` — fasteners, inserts, bearings