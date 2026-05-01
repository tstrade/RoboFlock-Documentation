=================
Fabrication Guide
=================

.. include:: ../_templates/constants.rst

This page walks through the assembly of the RoboFlock from the ground up. It
assumes all printed parts have been printed and post-processed, all stock
parts have been received, and all hardware is available - see the
:doc:`Parts Catalog <parts_catalog>` and :doc:`Hardware Catalog <hardware_catalog>` for the full inventory.

The build proceeds in five stages, each completable and inspectable on its
own:

#. Drive corners - wheels, motors, brackets


#. Side rails - extrusions, motor brackets, suspension brackets, pivot hubs


#. Suspension assembly - frame ears, hollow rod stubs, centerline rod


#. Differential coupling - rocker arm and pushrods


#. Body - battery compartment, main hull, hull top, sensors


The recommended order is bottom-up: each stage references geometry from the
previous one, and earlier stages are easier to inspect with later ones not
yet installed.

.. note::
    
   Dimensions, fastener sizes, and torque specs marked TBD will be filled
   in as the first complete prototype is assembled and measured.



Stage 1 - Drive Corners
+++++++++++++++++++++++

Build all four drive corners first. Each corner is identical and follows the
same sequence:

#. Press the radial bearing into ``RV1-DRV-BKT-001`` (motor bracket). The diameter should be exact to the bearing 
   (may need to use a dremel to round out the whole if clearance is too tight). Do not hammer.


#. Bolt the BLDC motor to the bracket. Apply medium-strength threadlocker.
   Confirm the motor shaft passes through and seats into the pressed bearing
   without binding.


#. Bolt the 10" pneumatic wheel to the adapter using its hub pattern.


#. Bolt the wheel drive adapter (``RV1-WHL-001``) into the plain bore of the
   coupling.


#. Slide the clamping shaft coupling (``RV1-DRV-CPL-001``) onto the keyed
   motor shaft.


#. Spin the assembly by hand and verify free rotation with no axial play.
   Then torque the clamping coupling onto the keyed shaft.


Repeat ×4. Set the four assemblies aside.



Stage 2 - Side Rails
++++++++++++++++++++

For each side (build both):

#. Lay one 4080 extrusion (``RV1-CHS-FRM-001``) on a flat surface, 40 mm face
   down (80 mm tall).


#. Begin with passing bolts through all 3 holes in the motor bracket. Then screw
   on T-nuts to the bolts (do not tighten)


#. Slide the T-nuts into the **lower** rail T-slot for both motor bracket
   positions. Tighten two of the drive corner assemblies (3 bolts each) to the
   lower rail. Confirm both wheels are oriented the same direction.


#. Bolt the 12 mm pivot hub (``RV1-SUS-HUB-001``) to the rocker body bracket
   using 4× M4 Socket Head Cap Screws. The hollow rod stub on the hub should point **inboard**
   (toward the centerline of the robot).


#. Slide the rocker body bracket (``RV1-SUS-RBR-001``) onto the **outer**
   rail. Anchor it with 4 bolts (2 into the top T-slot, 2 into the bottom).


Both side-rail subassemblies are now complete and stand on their own wheels.



Stage 3 - Suspension Assembly
+++++++++++++++++++++++++++++

#. Press a ball bearing into each of the two ears on the underside of the
   main chassis frame (``RV1-CHS-001``). Verify both bearings
   seat fully and rotate freely.


#. Position the two side-rail subassemblies parallel to each other on the
   work surface, oriented so their inboard hollow rod stubs face each other
   along the centerline.


#. Lower the main chassis frame onto the assembly so that each frame ear
   slides over the OD of the corresponding hollow rod stub. The pressed
   bearings in the ears should seat onto the stubs.


#. Slide the solid linear rod (centerline through-shaft) into one of the
   hollow stubs. Push it across the gap into the opposite stub - it should
   bridge both stubs and act as a sliding bearing between them.


#. Verify both sides articulate freely about the centerline pivot. With no
   front cross-link installed yet, the two sides should move independently.


Stage 3 leaves the robot in **independent-pivot** configuration: each side
articulates independently with no coupling between them.



Stage 4 - Differential Coupling
+++++++++++++++++++++++++++++++

#. Install the rocker differential arm (``RV1-SUS-001``) at the front of the main chassis frame using a vertical shoulder bolt threaded upward into the frame. The arm should rotate freely in the horizontal plane.


#. Build two pushrod assemblies (``RV1-SUS-002``):


   - Thread a ball-joint rod end onto each end of a length of threaded rod.

   - One rod end orients vertically (for the differential arm); the other orients horizontally (for the rocker body bracket).

   - Set both rods to the same starting length per the CAD reference.

#. With the robot on a flat surface and both sides level, attach each pushrod:


   - **Vertical end** → mount on the rocker differential arm

   - **Side-facing end** → mount on the rocker body bracket

#. Verify anti-symmetric travel: lift one side; the other should drop by the same amount through the action of the differential arm. If travel is not symmetric, equalize the pushrod lengths.


#. Lock both rod ends with jam nuts.


The suspension is now in its full **rocker-differential** configuration.



Stage 5 - Body
++++++++++++++

#. Bolt the battery compartment to the underside of the main chassis frame. Verify the lower lid latches. Install batteries. 


#. Pass the motor leads through the grommet holes of the lower lid, leaving service loops at each end so the suspension can articulate without putting tension on the cables.. Install the batteries by setting them in the lower lid, and latch the lid to the affixed battery compartment housing.


#. Bolt the main hull (``RV1-HUL-001``) to the top of the main chassis frame. Install the Jetson and motor drivers. Route the four motor leads from the battery compartment up through the hull floor to the motor
   drivers.


#. Install the LiDAR mounting bracket (``RV1-ELE-BKT-001``) in the hull top (``RV1-HUL-002``). Install the GPS antenna on the base plate behind the LiDAR slot.


#. Drop the LiDAR into the twist-lock slot and rotate to engage. Verify cable strain relief.


#. Latch the hull top onto the main hull.


The robot is now mechanically complete. Continue with electrical bring-up per the :doc:`Wiring Specifications <wiring_specifications>` and the codebase tutorials.



Pre-Test Checklist
++++++++++++++++++

Before powering on for the first time:

- All four wheels rotate freely with no binding from the couplings or bearings.


- Suspension articulates smoothly through its full range, with anti-symmetric travel between the two sides.


- Pushrod jam nuts are tight.


- Motor leads do not bind or stretch at full articulation.


- Hull top and battery compartment latches and unlatches cleanly without snagging on internal components.


- LiDAR seats into its twist-lock without forcing.


- Battery compartment lid is secured.

    