Hull and Enclosures
===================

The body of the RoboFlock is split into three printed enclosures: a lower
**battery compartment** under the chassis, the **main hull** above it, and a
latching **hull top** that carries the LiDAR and GPS.

This split keeps the high-current battery physically
separated from the low-voltage logic and motor drivers, simplifies access
during testing (the hull top latches off without disturbing the rest of the
robot), and gives each major sensor a fixed, repeatable mounting reference.



Lower Battery Compartment
^^^^^^^^^^^^^^^^^^^^^^^^^

The battery compartment screws into the underside of the main chassis frame.
It houses:

- Two 3S 6 Ah LiPo batteries
- The 24v 20Ah 40A Lithium Ion Battery 
- Cable pass-throughs that route motor leads upward into the main hull

Main Hull
^^^^^^^^^

The main hull (``RV1-HUL-001``) bolts to the **top** of the main chassis
frame. It houses the upper electronics stack:

- Jetson Orin Nano on its carrier board
- Motor drivers (one per BLDC, ×4)
- Power distribution from the battery compartment below
- Sensor cabling on its way up to the hull top

Motor leads route from the battery compartment up through the floor of the
hull and terminate at the motor drivers inside. Service loops at each end
allow the suspension to articulate through its full range without putting
tension on the strain reliefs.

.. note::
   The hull is currently in Draft status - the print spec block in the
   :doc:`../parts_catalog` is intentionally TBD until the geometry stabilizes.



Hull Top
^^^^^^^^

The hull top (``RV1-HUL-002``) latches onto the main hull and acts as both a
weather cover and a sensor mounting plate. Two sensors mount directly to it:

- **LiDAR** - secured in a forward-facing twist-lock slot. Drop the LiDAR
  base into the slot and rotate to lock; the slot constrains both vertical
  and rotational position so the LiDAR repeats its mounting orientation
  every time the cover is reinstalled.
- **GPS antenna** - sits on a flat base plate immediately behind the LiDAR.
  The plate provides the ground plane required by the patch antenna.

The latching mechanism lets the top come off in one motion for service,
without unplugging any sensor cabling that lives below the hull-top plane.

.. note::
   Sensor cables route through the dedicated hole in the hull top - verify
   strain relief and make sure the LiDAR cable has enough slack to allow
   the twist-lock action without binding.



Electronics Brackets
^^^^^^^^^^^^^^^^^^^^

Smaller printed brackets handle individual electronics modules. The first
of these is the LiDAR mounting bracket (``RV1-ELE-BKT-001``), which mates
the LiDAR body to the twisting slot in the hull top via 4× M2.5 brass
heat-set inserts.

Additional brackets - ultrasonic sensor housings, IMU mount, GPS antenna
retention, status LED housings - will be added to the catalog as they
finalize.



Cable Routing Summary
^^^^^^^^^^^^^^^^^^^^^

.. code-block:: text

    Battery compartment ─────► Main hull ─────► Hull top
       (batteries)    (Jetson, drivers)   (LiDAR, GPS)

       motor leads (×4) ──┐
                          ▼
                  pass through floor
                          │
                          ▼
                    motor drivers

For wire gauge, color conventions, and full pinouts see
:doc:`../wiring_specifications`.



Related Pages
^^^^^^^^^^^^^

- :doc:`frame_and_extrusion` - what these enclosures bolt to
- :doc:`../parts_catalog` - files and BOM for hull and bracket parts
- :doc:`../wiring_specifications` - electrical interfaces between compartments
