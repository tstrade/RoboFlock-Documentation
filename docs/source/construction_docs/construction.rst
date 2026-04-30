Construction
============

Mechanical design and fabrication of the RoboFlock rover. This section covers
the design intent for each subsystem, the parts that make it up, the hardware
that holds it together, and a step-by-step build order.

The robot is organized into six mechanical assemblies:

- **Chassis** — the structural frame and the 4080 extrusion rails it sits on
- **Drive System** — BLDC motors, brackets, couplings driving each corner
- **Wheels** — airless wheels and the printed adapters that drive them
- **Suspension** — rocker-differential linkage that couples left and right sides
- **Hull / Body** — outer enclosures, top cover, sensor mounts
- **Electronics** — printed brackets and mounts for sensors and compute

Each assembly has its own subsystem page; every part across all assemblies is
catalogued (with files, hardware BOM, and sourcing) in the
:doc:`parts_catalog`.

.. toctree::
    :titlesonly:
    :maxdepth: 2
    :hidden:

    design_overview
    subsystems/frame_and_extrusion
    subsystems/drivetrain
    subsystems/suspension
    subsystems/hull_and_enclosures
    fabrication_guide
    parts_catalog
    hardware_catalog
    wiring_specifications