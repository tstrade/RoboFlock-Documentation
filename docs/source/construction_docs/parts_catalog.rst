Parts Catalog
=============

Every mechanical part on the RoboFlock is catalogued below. Use the search
box to find a part by ID or name, and the dropdowns to narrow by type
(Printed / Stock / Assembly), assembly group, or status.

The detail panel for each part shows the relevant subset of:

- **Printed parts** - print specs (orientation, infill, layer height),
  Fusion source, mesh export, and engineering drawing, plus the fastener
  bill of materials and total hardware cost.
- **Stock parts** - specification, supplier, supplier part number, supplier
  link, and unit cost.
- **Assemblies** - component list and assembly notes.

Fields marked *TBD* are pending finalization - typically because the
geometry is in Draft, the supplier has not been selected yet, or the
hardware revision is still in flux.

To add or update a part, edit the ``PARTS`` array at the top of
``_static/parts_catalog.js`` and rebuild the docs.

.. raw:: html

    <div id="roboflock-parts-catalog"></div>
    <script src="../_static/parts_catalog.js"></script>


Catalog Conventions
^^^^^^^^^^^^^^^^^^^

**Part ID format**: ``RV{version}-{ASSY}-{TYPE}-{NUM}``

- ``RV1`` - robot version 1
- ``ASSY`` - assembly group:

  - ``CHS`` - chassis
  - ``DRV`` - drive system
  - ``WHL`` - wheels
  - ``SUS`` - suspension
  - ``HUL`` - hull and body
  - ``ELE`` - electronics mounts and brackets

- ``TYPE`` *(optional)* - sub-category within an assembly group, e.g.
  ``BKT`` (bracket), ``CPL`` (coupling), ``HUB`` (hub), ``RBR`` (rocker
  body bracket), ``FRM`` (frame stock)
- ``NUM`` - sequential within the (assembly, type) pair, zero-padded to 3
  digits

**Status values**:

- *Active* - design is finalized and built
- *Draft* - design is in progress, geometry may change
- *Deprecated* - superseded by another part; still in catalog for traceability

For fastener and hardware cross-reference, see the :doc:`hardware_catalog`.
