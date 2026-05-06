Suspension
==========

The RoboFlock suspension is a passive **rocker-differential** linkage. It has
no springs, dampers, or active components - instead it uses a single
geometric constraint to keep all four wheels in ground contact across uneven
terrain.

The mechanism is built up in two stages: an **independent** per-side pivot,
and a **dependent** front cross-link that couples the two sides together. The
two stages combine to give a single articulation axis with anti-symmetric
travel between left and right.



Stage 1 - Independent Per-Side Pivot
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Each side of the robot can rotate independently about a single horizontal
axis that runs left-to-right across the centerline of the robot. The side
itself - extrusion, both motor brackets, both wheels - is rigidly attached
together, so the entire side rocks as a unit.

The pivot axis is built from two nested mechanical interfaces:

#. **Outer interface (frame ear bearings).** The 3D-printed main chassis
   frame has two L-shaped ears that drop down from above the extrusions. Each
   ear has a ball bearing pressed into its lower face. The inner race of
   each bearing rides on the outer diameter of a hollow rod stub.

#. **Inner interface (centerline through-shaft).** Each side's hollow rod
   stub extends inboard from a 12 mm pivot hub (``RV1-SUS-HUB-001``). The two
   stubs from left and right meet near the centerline. A solid linear rod is
   slipped inside both hollow stubs so that one rod bridges across - this
   acts as a sliding plain bearing between the two halves and locks the
   pivot axes of the two sides into a single shared line.

Each pivot hub bolts to a printed rocker beam bracket
(``RV1-SUS-RBR-001``) via 4× M4 SHCS. The rocker beam bracket itself slides
onto the 4080 extrusion and clamps with 4 bolts (2 into the top T-slot, 2
into the bottom).

.. note::
   At this stage - independent pivot only, no front cross-link installed -
   the two sides are mechanically disconnected from each other. If you
   articulate one side, the other does not move. The **dependent** behavior
   is added in Stage 2.



Stage 2 - Dependent Cross-Link (Rocker-Differential Arm)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

At the front of the main chassis frame, a 3D-printed differential arm
(``RV1-SUS-001``) sits on a vertical shoulder bolt that threads upward into
the frame. The arm pivots in the horizontal plane.

Two pushrod assemblies (``RV1-SUS-002``) connect this arm to the two side
suspensions, one per side. Each pushrod is a length of threaded rod with a
ball-joint rod end at each tip:

- The **upward-facing** rod end attaches to the differential arm.
- The **side-facing** rod end (90° rotated) attaches to a mount on the side's
  rocker beam bracket.

Geometry is mirror-symmetric across the centerline. As one side pivots
upward, its pushrod rotates the differential arm in one direction; the
opposite-side pushrod, attached to the same arm but on the other side, is
forced to translate the matching distance in the opposite sense - pushing
the other side down.

The result is **anti-symmetric travel**: when one side is pushed up by an
obstacle, the other side is geometrically driven downward by the same
amount, keeping the average pitch of the body constant and keeping all four
wheels loaded against the ground.

.. note::
   Pushrod length is set on assembly (via the threaded rod between the two
   ball-joint ends) and defines the static ride height. After initial
   assembly, set both pushrods to the same length with the robot on a flat
   surface so the body sits level; lock the rod ends with jam nuts.



Articulation Limits
^^^^^^^^^^^^^^^^^^^

The mechanical articulation envelope is bounded by:

- The clearance between the rocker beam bracket and the frame ears as the
  side pivots upward (the upper hard stop)
- The angle at which the ball joints reach the end of their rotational
  travel (the geometric stop on either side)
- The clearance between the wheels and the underside of the hull (the lower
  hard stop on the opposite side)

.. note::
   Verify the actual articulation envelope on the assembled prototype before
   field testing - TBD pending first build measurements.



Failure Modes to Watch
^^^^^^^^^^^^^^^^^^^^^^

- **Ball joint loosening.** Vibration over rough terrain may back jam nuts off.
  Monitor and re-torque after every test session if needed.
- **Frame ear bearing seat creep.** Repeated articulation under load can
  deform the printed bearing seat. Inspect for ovalization periodically and
  reprint the frame if the press fit becomes loose.
- **Centerline rod gallng.** The inner sliding rod relies on the hollow stub
  bores being clean. Wipe down and lightly lubricate during reassembly.



Related Pages
^^^^^^^^^^^^^

- :doc:`frame_and_extrusion` - the ears and the rails this assembly hangs from
- :doc:`drivetrain` - what's rigidly attached to each side
- :doc:`../parts_catalog` - files and BOM for the suspension parts
- :doc:`../fabrication_guide` - assembly order for the full suspension
