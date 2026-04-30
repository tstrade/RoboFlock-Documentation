Hardware Catalog
================

This page is the cross-reference for fasteners, threaded inserts, bearings,
and other hardware that are reused across multiple parts. Where a printed
part's BOM in the :doc:`parts_catalog` references a hardware ID, that ID is
defined here.

Hardware is grouped by category. Each item has a unique ID and a single
canonical entry - multiple printed parts that use the same insert or
fastener should reference the same hardware ID rather than restating the
spec inline.

.. note::
   This catalog is currently seeded with the hardware referenced by the
   first generation of printed parts. Additional fasteners, T-nuts,
   bearings, and rod-end ball joints will be added soon.



Threaded Inserts
^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1
   :widths: 30 18 22 15 15

   * - Hardware ID
     - Thread
     - Material
     - Pack Qty
     - Unit Cost
   * - ``INS-M2.5-BRASS-HEATSET``
     - M2.5
     - Brass
     - 4
     - $1.80
   * - ``INS-M6-BRASS-HEATSET``
     - M6
     - Brass
     - 4
     - $1.80



Fasteners
^^^^^^^^^

To be populated as fastener sizes are finalized in each printed part's BOM.
Anticipated entries include:

- M3, M4, M5 socket head cap screws (multiple lengths)
- M8 cap screws + matching T-nuts for 4080 extrusion
- Shoulder bolt for the rocker differential arm vertical pivot (TBD)



Bearings
^^^^^^^^


- Motor-shaft radial bearing (motor bracket press-fit) - bore TBD
- Frame-ear pivot bearing (chassis frame press-fit, rides on hollow rod
  stub OD) - bore TBD



Linkage Hardware
^^^^^^^^^^^^^^^^

- Ball-joint rod ends (used on both ends of each pushrod, mixed orientations)
- Threaded rod stock for pushrods
- Jam nuts for pushrod adjustment locking



Source of Truth
^^^^^^^^^^^^^^^

Quantities listed in this catalog are *per-piece* unit costs as of May 1st, 2026. The total
hardware cost for any single printed part is shown in that part's detail
panel in the :doc:`parts_catalog`. A robot-wide rollup will be added once
all part BOMs have been finalized.
