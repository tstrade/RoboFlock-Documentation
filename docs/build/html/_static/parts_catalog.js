/* ============================================================================
 * RoboFlock parts catalog widget
 * ----------------------------------------------------------------------------
 * Renders a filterable, master-detail catalog of mechanical parts into the
 * element with id="roboflock-parts-catalog". Intended to be loaded from
 * construction_docs/parts_catalog.rst via a <script src="..."> tag.
 *
 * To add or edit a part: edit the PARTS array below. Three "type" values are
 * supported, each rendering a different detail layout:
 *   - "Printed"  : 3D-printed parts. Shows print specs, files, fastener BOM.
 *   - "Stock"    : Off-the-shelf items. Shows spec + supplier sourcing block.
 *   - "Assembly" : Sub-assemblies built from other parts. Shows components.
 *
 * Field reference (omit fields that don't apply):
 *   id, name, type, assembly, status ("Active" | "Draft" | "Deprecated")
 *   version, designer, date, material, orientation, infill, layer
 *   files: { f3d, stl, drawing }   -- url strings, or null/"" for TBD
 *   hardware: [ { qty, hwid, desc, ext } ]
 *   spec, qty, supplier, supplierPN, supplierUrl, cost
 *   components: [ "string", ... ]
 *   notes, cost
 *
 * File naming convention: RV1-XXX-NNN_Part_Name.{ext}
 *   - Part number prefix uses hyphens, part name uses underscores
 *   - Part name comes from Title 1 of the technical drawing
 *   - .f3d  -> ../mechanical/fusion/
 *   - .stl  -> ../mechanical/meshes/
 *   - .pdf  -> ../mechanical/drawings/
 * ========================================================================= */

(function () {
  "use strict";

  /* ---------- DATA --------------------------------------------------------- */

  const PARTS = [
    {
      id: "RV1-CHS-001",
      name: "Chassis Frame",
      type: "Printed",
      assembly: "Chassis",
      status: "Active",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-05-06",
      material: "PETG-CF",
      orientation: "Flat on bed",
      infill: "58% Gyroid",
      layer: "0.3 mm",
      files: {
        f3d: "../mechanical/fusion/RV1-CHS-001_Frame.f3d",
        stl: "../mechanical/meshes/RV1-CHS-001_Frame.stl",
        drawing: "../mechanical/drawings/RV1-CHS-001_Frame.pdf"
      },
      hardware: [
        { qty: 4, hwid: "INS-M6-BRASS-HEATSET", desc: "M6 brass heat-set insert", ext: 1.80 }
      ],
      notes: "Primary 3D-printed structural frame. L-shaped ears each carry a pressed bearing that supports the lateral pivot rod for that side's suspension. Battery compartment (RV1-HUL-003) screws to the underside; main hull (RV1-HUL-001) screws to the top.",
      cost: 1.80
    },
    {
      id: "RV1-CHS-FRM-001",
      name: "4080 T-slot Extrusion",
      type: "Stock",
      assembly: "Chassis",
      status: "Active",
      spec: "40 \u00d7 80 mm 6-slot T-extrusion, 8 mm slot \u2014 length: TBD",
      qty: 2,
      supplier: null,
      supplierPN: null,
      supplierUrl: null,
      cost: null,
      notes: "One per side. Mounted with the 40 mm face down (80 mm tall). Inner rail receives the two motor brackets (3 bolts each). Outer rail receives the rocker beam bracket (4 bolts: 2 top, 2 bottom)."
    },
    {
      id: "RV1-DRV-BKT-001",
      name: "Motor Bracket",
      type: "Printed",
      assembly: "Drive System",
      status: "Active",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-05-06",
      material: "PA6-CF",
      orientation: "Sideways",
      infill: "100%",
      layer: "0.3",
      files: {
        f3d: "../mechanical/fusion/RV1-DRV-BKT-001_Motor_Bracket.f3d",
        stl: "../mechanical/meshes/RV1-DRV-BKT-001_Motor_Bracket.stl",
        drawing: "../mechanical/drawings/RV1-DRV-BKT-001_Motor_Bracket.pdf"
      },
      hardware: [
        { qty: 3, hwid: null, desc: "M8 cap screw + T-nut \u2014 inner-rail mount to extrusion", ext: null },
        { qty: 1, hwid: null, desc: "Radial ball bearing, press-fit (motor shaft support)", ext: null },
        { qty: "?", hwid: null, desc: "Motor-to-bracket fasteners (motor model dependent)", ext: null }
      ],
      notes: "Holds the BLDC motor against the inner rail of the 4080 extrusion. A pressed bearing supports the motor shaft to relieve radial load on the coupling. Four required (2 per side).",
      cost: 0
    },
    {
      id: "RV1-DRV-CPL-001",
      name: "Clamping Shaft Coupling",
      type: "Stock",
      assembly: "Drive System",
      status: "Active",
      spec: "Bore A (motor side, keyed): TBD \u2022 Bore B (adapter side): TBD",
      qty: 4,
      supplier: null,
      supplierPN: null,
      supplierUrl: null,
      cost: null,
      notes: "One per drive corner. Clamps onto the keyed motor shaft on one side and bolts to the wheel hub adapter on the other."
    },
    {
      id: "RV1-WHL-001",
      name: "Wheel Hub Adapter",
      type: "Printed",
      assembly: "Wheels",
      status: "Active",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-05-06",
      material: "PA6-CF",
      orientation: "Flat on Bed - Larger Diameter Side",
      infill: "100%",
      layer: "0.3",
      files: {
        f3d: "../mechanical/fusion/RV1-WHL-001_Wheel_Hub_Adapter.f3d",
        stl: "../mechanical/meshes/RV1-WHL-001_Wheel_Hub_Adapter.stl",
        drawing: "../mechanical/drawings/RV1-WHL-001_Wheel_Hub_Adapter.pdf"
      },
      hardware: [
        { qty: "?", hwid: null, desc: "Adapter-to-coupling fasteners", ext: null },
        { qty: "?", hwid: null, desc: "Adapter-to-wheel fasteners (matches pneumatic wheel hub pattern)", ext: null }
      ],
      notes: "Adapts the 18\u2033 pneumatic wheel mounting pattern to the clamping shaft coupling, converting a passive wheel into a driven wheel. Four required.",
      cost: 0
    },
    {
      id: "RV1-SUS-001",
      name: "Rocker Differential Arm",
      type: "Printed",
      assembly: "Suspension",
      status: "Draft",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-02-18",
      material: "PA6-CF",
      orientation: "Flat on Bed",
      infill: "100%",
      layer: "0.3",
      files: {
        f3d: "../mechanical/fusion/RV1-SUS-001_Rocker_Differential_Arm.f3d",
        stl: "../mechanical/meshes/RV1-SUS-001_Rocker_Differential_Arm.stl",
        drawing: "../mechanical/drawings/RV1-SUS-001_Rocker_Differential_Arm.pdf"
      },
      hardware: [
        { qty: 1, hwid: null, desc: "Shoulder bolt \u2014 vertical pivot into front of main frame", ext: null },
        { qty: 2, hwid: null, desc: "Ball-joint rod end \u2014 left and right pushrod terminations (upward-facing)", ext: null }
      ],
      notes: "Pivots about a vertical shoulder bolt at the front of the main chassis frame. Couples the two side rockers via the L+R pushrods so that one side rising forces the other to drop \u2014 the dependent stage of the rocker-differential.",
      cost: 0
    },
    {
      id: "RV1-SUS-002",
      name: "Pushrod Linkage Assembly",
      type: "Assembly",
      assembly: "Suspension",
      status: "Active",
      version: "v1.0",
      qty: 2,
      components: [
        "Threaded rod (size: TBD, length set during assembly to define ride height)",
        "Ball-joint rod end \u00d7 2 (one vertical-axis end, one 90\u00b0 side-facing end)",
        "Jam nuts \u00d7 2"
      ],
      notes: "One assembly per side. Couples the side-facing ball-joint mount on the rocker beam bracket to the upward-facing mount on the rocker differential arm. Length is set on assembly to define static ride height.",
      cost: null
    },
    {
      id: "RV1-SUS-RBR-001",
      name: "Rocker Beam Bracket",
      type: "Printed",
      assembly: "Suspension",
      status: "Active",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-05-06",
      material: "PETG-CF",
      orientation: "Flat on bed",
      infill: "58% Gyroid",
      layer: "0.3 mm",
      files: {
        f3d: "../mechanical/fusion/RV1-SUS-RBR-001_Rocker_Beam_Bracket.f3d",
        stl: "../mechanical/meshes/RV1-SUS-RBR-001_Rocker_Beam_Bracket.stl",
        drawing: "../mechanical/drawings/RV1-SUS-RBR-001_Rocker_Beam_Bracket.pdf"
      },
      hardware: [
        { qty: 4, hwid: null, desc: "M? cap screw + T-nut \u2014 2 top rail, 2 bottom rail (extrusion clamp)", ext: null },
        { qty: 4, hwid: null, desc: "M4 SHCS \u2014 bracket-to-hub", ext: null },
        { qty: 1, hwid: null, desc: "Ball-joint mount \u2014 side-facing pushrod terminus", ext: null }
      ],
      notes: "Slides onto the 4080 extrusion and clamps with 4 bolts (2 top, 2 bottom). Carries the 12 mm pivot hub via 4\u00d7 M4 and anchors the side-facing end of the pushrod. Two required (one per side).",
      cost: 0
    },
    {
      id: "RV1-SUS-HUB-001",
      name: "12 mm Pivot Hub",
      type: "Stock",
      assembly: "Suspension",
      status: "Active",
      spec: "12 mm bore \u2022 4-hole M4 mounting pattern \u2022 integral hollow shaft stub",
      qty: 2,
      supplier: null,
      supplierPN: null,
      supplierUrl: null,
      cost: null,
      notes: "One per side. Bolts to the rocker beam bracket via 4\u00d7 M4. Carries the inboard hollow rod stub that meets the centerline pivot."
    },
    {
      id: "RV1-HUL-001",
      name: "Main Hull",
      type: "Printed",
      assembly: "Hull/Body",
      status: "Active",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-05-06",
      material: "ABS",
      orientation: "Flat on Bed",
      infill: "15% Grid",
      layer: "0.2mm",
      files: {
        f3d: "../mechanical/fusion/RV1-HUL-001_Main_Hull.f3d",
        stl: "../mechanical/meshes/RV1-HUL-001_Main_Hull.stl",
        drawing: "../mechanical/drawings/RV1-HUL-001_Main_Hull.pdf"
      },
      hardware: [],
      notes: "Hull body bolted to the top of the main chassis frame. Houses the Jetson, motor drivers, and cable runs from the lower compartment.",
      cost: 0
    },
    {
      id: "RV1-HUL-002",
      name: "Hull Top",
      type: "Printed",
      assembly: "Hull/Body",
      status: "Active",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-05-06",
      material: "PETG",
      orientation: "Sideways - Short Edge",
      infill: "15% Grid",
      layer: "0.2mm",
      files: {
        f3d: "../mechanical/fusion/RV1-HUL-002_Hull_Top.f3z",
        stl: "../mechanical/meshes/RV1-HUL-002_Hull_Top.stl",
        drawing: "../mechanical/drawings/RV1-HUL-002_Hull_Top.pdf"
      },
      hardware: [],
      notes: "Latching top cover of the main hull. Forward twist-lock slot retains the Lidar holder (RV1-ELE-BKT-001); flat region behind it carries the GPS base plate mount (RV1-ELE-BKT-003).",
      cost: 0
    },
    {
      id: "RV1-HUL-003",
      name: "Lower Compartment Body",
      type: "Printed",
      assembly: "Hull/Body",
      status: "Active",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-05-06",
      material: "PLA",
      orientation: "Flat on Bed",
      infill: "15% Grid",
      layer: "0.2mm",
      files: {
        f3d: "../mechanical/fusion/RV1-HUL-003_Lower_Compartment_Body.f3z",
        stl: "../mechanical/meshes/RV1-HUL-003_Lower_Compartment_Body.stl",
        drawing: "../mechanical/drawings/RV1-HUL-003_Lower_Compartment_Body.pdf"
      },
      hardware: [],
      notes: "Lower compartment beneath the main chassis frame. Houses the LiPo battery, bus-bar wiring, and main switch. Cover (RV1-HUL-004) latches into it; motor leads pass through dedicated holes up into the main hull.",
      cost: 0
    },
    {
      id: "RV1-HUL-004",
      name: "Lower Compartment Cover",
      type: "Printed",
      assembly: "Hull/Body",
      status: "Active",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-05-06",
      material: "PLA",
      orientation: "Flat on Bed",
      infill: "15% Grid",
      layer: "0.2mm",
      files: {
        f3d: "../mechanical/fusion/RV1-HUL-004_Lower_Compartment_Cover.f3z",
        stl: "../mechanical/meshes/RV1-HUL-004_Lower_Compartment_Cover.stl",
        drawing: "../mechanical/drawings/RV1-HUL-004_Lower_Compartment_Cover.pdf"
      },
      hardware: [],
      notes: "Removable cover for the lower compartment (RV1-HUL-003). Provides battery access for charging and swap-out without disturbing the rest of the robot.",
      cost: 0
    },
    {
      id: "RV1-ELE-BKT-001",
      name: "Lidar Holder",
      type: "Printed",
      assembly: "Electronics",
      status: "Active",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-05-06",
      material: "ABS",
      orientation: "Sideways - Long Edge",
      infill: "15% Gyroid",
      layer: "0.2mm",
      files: {
        f3d: "../mechanical/fusion/RV1-ELE-BKT-001_Lidar_Holder.f3d",
        stl: "../mechanical/meshes/RV1-ELE-BKT-001_Lidar_Holder.stl",
        drawing: "../mechanical/drawings/RV1-ELE-BKT-001_Lidar_Holder.pdf"
      },
      hardware: [
        { qty: 4, hwid: "INS-M2.5-BRASS-HEATSET", desc: "M2.5 brass heat-set insert", ext: 1.80 }
      ],
      notes: "Mates the Lidar to the hull-top twist-lock slot.",
      cost: 1.80
    },
    {
      id: "RV1-ELE-BKT-002",
      name: "Ultrasonic Sensor Mount",
      type: "Printed",
      assembly: "Electronics",
      status: "Active",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-05-06",
      material: "ABS",
      orientation: "Sideways - Short Edge",
      infill: "10% Gyroid",
      layer: "0.2mm",
      files: {
        f3d: "../mechanical/fusion/RV1-ELE-BKT-002_Ultrasonic_Sensor_Mount.f3d",
        stl: "../mechanical/meshes/RV1-ELE-BKT-002_Ultrasonic_Sensor_Mount.stl",
        drawing: "../mechanical/drawings/RV1-ELE-BKT-002_Ultrasonic_Sensor_Mount.pdf"
      },
      hardware: [],
      notes: "Mount for an LVMAX ultrasonic sensor (\u00d817 mm sensor through-hole). Quantity per robot pending confirmation \u2014 sensor layout uses three sensors total (forward, port, starboard).",
      cost: 0
    },
    {
      id: "RV1-ELE-BKT-003",
      name: "GPS Base Plate Mount",
      type: "Printed",
      assembly: "Electronics",
      status: "Active",
      version: "v1.0",
      designer: "Andrew Collado",
      date: "2026-05-06",
      material: "ABS",
      orientation: "Flat on Bed",
      infill: "15% Gyroid",
      layer: "0.2mm",
      files: {
        f3d: "../mechanical/fusion/RV1-ELE-BKT-003_GPS_Base_Plate_Mount.f3d",
        stl: "../mechanical/meshes/RV1-ELE-BKT-003_GPS_Base_Plate_Mount.stl",
        drawing: "../mechanical/drawings/RV1-ELE-BKT-003_GPS_Base_Plate_Mount.pdf"
      },
      hardware: [],
      notes: "Mounts the GPS antenna ground plane to the hull top, immediately behind the Lidar holder. The 120 \u00d7 120 mm footprint provides the ground plane required by the patch antenna.",
      cost: 0
    },
    {
      id: "INS-M6-BRASS-HEATSET",
      name: "M6 Brass Heat Insert",
      type: "Stock",
      assembly: "Chassis",
      status: "Active",
      spec: "",
      qty: 8,
      supplier: null,
      supplierPN: null,
      supplierUrl: null,
      cost: null,
      notes: ""
    },
    {
      id: "BEARING-6001ZZ",
      name: "6001ZZ Deep Groove Ball Bearing",
      type: "Stock",
      assembly: "Chassis",
      status: "Active",
      spec: "12x28x8mm Pre-Lubricated",
      qty: 2,
      supplier: "XIKE",
      supplierPN: "6001ZZ",
      supplierUrl: "https://www.amazon.com/dp/B07S9MHMM8",
      cost: 4.49,
      notes: "Link contains 2 pack. Cost is per unit"
    },
    {
      id: "ROD-LINEAR-300MM",
      name: "Linear Motion Rod",
      type: "Stock",
      assembly: "Chassis",
      status: "Active",
      spec: "10mm OD - 300mm Length",
      qty: 1,
      supplier: "Vigorous",
      supplierPN: "23030011",
      supplierUrl: "https://www.amazon.com/dp/B0BZQ7T7JJ",
      cost: 5.99,
      notes: "Link contains 2 pack. Cost is per unit"
    },
    {
      id: "ROD-HOLLOW-LINEAR-150MM",
      name: "Hollow Linear Rod",
      type: "Stock",
      assembly: "Chassis",
      status: "Active",
      spec: "12mm OD - 10mm ID - 150mm Length",
      qty: 2,
      supplier: "Eowpower",
      supplierPN: null,
      supplierUrl: "https://www.amazon.com/dp/B0C3CYHKGX",
      cost: 2.59,
      notes: "Link contains 5 pack. Cost is per unit. Tubing is 300mm long. Must be cut into halves of 150mm each"
    },
  ];

  /* ---------- STYLES ------------------------------------------------------- */

  const CSS = `
.rfpc { font-family: inherit; color: #404040; margin: 1rem 0; }
.rfpc * { box-sizing: border-box; }
.rfpc-tb { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 8px; }
.rfpc-tb input[type="search"], .rfpc-tb select {
  font: inherit; font-size: 13px; padding: 6px 10px; border: 1px solid #cfcfcf;
  border-radius: 4px; background: #fff; color: #404040; outline: none;
}
.rfpc-tb input[type="search"] { flex: 1; min-width: 200px; }
.rfpc-tb input[type="search"]:focus, .rfpc-tb select:focus { border-color: #2980b9; }
.rfpc-tb select { min-width: 110px; cursor: pointer; }
.rfpc-sm { font-size: 12px; color: #727272; margin: 0 0 12px; }
.rfpc-gd { display: grid; grid-template-columns: 240px 1fr; gap: 16px; align-items: start; }
@media (max-width: 700px) { .rfpc-gd { grid-template-columns: 1fr; } }
.rfpc-ls { display: flex; flex-direction: column; gap: 2px; max-height: 620px; overflow-y: auto; padding-right: 2px; }
.rfpc-it { padding: 8px 10px; border-radius: 4px; border: 1px solid transparent; cursor: pointer; transition: background .1s; }
.rfpc-it:hover { background: #f7f7f7; }
.rfpc-it.sel { background: #f0f0f0; border-color: #cfcfcf; }
.rfpc-iid { font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; font-size: 11px; color: #727272; }
.rfpc-inm { font-size: 13px; font-weight: 600; margin-top: 2px; line-height: 1.3; color: #303030; }
.rfpc-rw { display: flex; gap: 6px; margin-top: 4px; flex-wrap: wrap; }
.rfpc-b { font-size: 11px; padding: 2px 7px; border-radius: 3px; font-weight: 600; line-height: 1.5; white-space: nowrap; }
.rfpc-b-prn { background: #EEEDFE; color: #3C3489; }
.rfpc-b-stk { background: #E1F5EE; color: #085041; }
.rfpc-b-asy { background: #FAEEDA; color: #633806; }
.rfpc-b-act { background: #EAF3DE; color: #27500A; }
.rfpc-b-drf { background: #F1EFE8; color: #444441; }
.rfpc-b-dep { background: #FCEBEB; color: #791F1F; }
.rfpc-dt { background: #fff; border: 1px solid #e1e1e1; border-radius: 6px; padding: 16px 18px; min-height: 320px; }
.rfpc-hd { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid #e1e1e1; }
.rfpc-hnm { font-size: 17px; font-weight: 600; margin: 4px 0 0; line-height: 1.3; color: #303030; }
.rfpc-sc { margin-top: 14px; }
.rfpc-lb { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #999; margin: 0 0 8px; font-weight: 600; }
.rfpc-sp { display: grid; grid-template-columns: 130px 1fr; gap: 6px 12px; font-size: 13px; }
.rfpc-k { color: #727272; }
.rfpc-v { color: #404040; }
.rfpc-mn { font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; font-size: 12px; }
.rfpc-fl { display: flex; flex-wrap: wrap; gap: 6px; }
.rfpc-bt { font: inherit; font-size: 12px; padding: 5px 11px; border-radius: 4px; border: 1px solid #cfcfcf; background: #fff; cursor: pointer; color: #404040; text-decoration: none; display: inline-block; }
.rfpc-bt:hover { background: #f7f7f7; text-decoration: none; }
.rfpc-bt[data-disabled="true"] { opacity: 0.45; cursor: not-allowed; }
.rfpc-bm { width: 100%; font-size: 12px; border-collapse: collapse; }
.rfpc-bm th { text-align: left; padding: 6px 8px; color: #727272; font-weight: 600; border-bottom: 1px solid #e1e1e1; font-size: 11px; text-transform: uppercase; letter-spacing: 0.03em; }
.rfpc-bm td { padding: 6px 8px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
.rfpc-bm tr:last-child td { border-bottom: 0; }
.rfpc-nt { font-size: 13px; line-height: 1.6; color: #404040; margin: 0; }
.rfpc-em { color: #999; font-size: 13px; padding: 8px 0; font-style: italic; }
.rfpc-ct { font-size: 13px; font-weight: 600; }
.rfpc-li { color: #2980b9; text-decoration: none; }
.rfpc-li:hover { text-decoration: underline; }
.rfpc-cmp { margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.7; }
.rfpc-tbd { color: #999; font-style: italic; }
`;

  /* ---------- INIT --------------------------------------------------------- */

  function init() {
    const root = document.getElementById("roboflock-parts-catalog");
    if (!root) return;

    const styleEl = document.createElement("style");
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    root.classList.add("rfpc");
    root.innerHTML = `
      <div class="rfpc-tb">
        <input type="search" id="rfpc-search" placeholder="Search by ID or name\u2026" aria-label="Search parts" />
        <select id="rfpc-f-type" aria-label="Filter by type">
          <option value="all">All types</option>
          <option value="Printed">Printed</option>
          <option value="Stock">Stock</option>
          <option value="Assembly">Assembly</option>
        </select>
        <select id="rfpc-f-assy" aria-label="Filter by assembly"><option value="all">All assemblies</option></select>
        <select id="rfpc-f-stat" aria-label="Filter by status">
          <option value="all">All status</option>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Deprecated">Deprecated</option>
        </select>
      </div>
      <p class="rfpc-sm" id="rfpc-summary">Loading\u2026</p>
      <div class="rfpc-gd">
        <div class="rfpc-ls" id="rfpc-list"></div>
        <div class="rfpc-dt" id="rfpc-detail"><div class="rfpc-em">Select a part.</div></div>
      </div>
    `;

    const assemblies = [...new Set(PARTS.map(p => p.assembly))].sort();
    const aSel = document.getElementById("rfpc-f-assy");
    assemblies.forEach(a => {
      const o = document.createElement("option");
      o.value = a; o.textContent = a;
      aSel.appendChild(o);
    });

    let selectedId = PARTS[0].id;

    const tBadge = t => t === "Printed" ? "rfpc-b-prn" : t === "Stock" ? "rfpc-b-stk" : "rfpc-b-asy";
    const sBadge = s => s === "Active" ? "rfpc-b-act" : s === "Deprecated" ? "rfpc-b-dep" : "rfpc-b-drf";
    const esc = s => String(s ?? "").replace(/[<>&"]/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;","\"":"&quot;"})[c]);
    const v = (x, fb = "TBD") => (x === null || x === undefined || x === "") ? `<span class="rfpc-tbd">${fb}</span>` : esc(x);
    const mv = x => (x === null || x === undefined || x === "") ? `<span class="rfpc-tbd">TBD</span>` : `<span class="rfpc-mn">${esc(x)}</span>`;
    const cur = n => (n === null || n === undefined) ? "\u2014" : "$" + Number(n).toFixed(2);

    function fileBtn(label, url) {
      if (!url) return `<span class="rfpc-bt" data-disabled="true">${label}</span>`;
      return `<a class="rfpc-bt" href="${esc(url)}" download rel="noopener">${label}</a>`;
    }

    function renderList() {
      const search = document.getElementById("rfpc-search").value.toLowerCase();
      const fT = document.getElementById("rfpc-f-type").value;
      const fA = document.getElementById("rfpc-f-assy").value;
      const fS = document.getElementById("rfpc-f-stat").value;

      const filtered = PARTS.filter(p => {
        if (fT !== "all" && p.type !== fT) return false;
        if (fA !== "all" && p.assembly !== fA) return false;
        if (fS !== "all" && (p.status || "Draft") !== fS) return false;
        if (search && !(p.id.toLowerCase().includes(search) || p.name.toLowerCase().includes(search))) return false;
        return true;
      });

      document.getElementById("rfpc-summary").textContent = filtered.length + " of " + PARTS.length + " parts";

      if (!filtered.find(p => p.id === selectedId) && filtered.length > 0) {
        selectedId = filtered[0].id;
      }

      const list = document.getElementById("rfpc-list");
      if (filtered.length === 0) {
        list.innerHTML = `<div class="rfpc-em">No parts match.</div>`;
      } else {
        list.innerHTML = filtered.map(p => {
          const status = p.status || "Draft";
          return `
            <div class="rfpc-it ${p.id === selectedId ? "sel" : ""}" data-id="${p.id}" tabindex="0">
              <div class="rfpc-iid">${p.id}</div>
              <div class="rfpc-inm">${esc(p.name)}</div>
              <div class="rfpc-rw">
                <span class="rfpc-b ${tBadge(p.type)}">${p.type}</span>
                <span class="rfpc-b ${sBadge(status)}">${status}</span>
              </div>
            </div>`;
        }).join("");
        list.querySelectorAll(".rfpc-it").forEach(el => {
          el.addEventListener("click", () => { selectedId = el.dataset.id; renderList(); });
          el.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectedId = el.dataset.id; renderList(); }
          });
        });
      }
      renderDetail();
    }

    function renderDetail() {
      const p = PARTS.find(x => x.id === selectedId);
      const d = document.getElementById("rfpc-detail");
      if (!p) { d.innerHTML = `<div class="rfpc-em">Select a part.</div>`; return; }

      const status = p.status || "Draft";
      let html = `
        <div class="rfpc-hd">
          <div>
            <div class="rfpc-iid">${p.id}</div>
            <div class="rfpc-hnm">${esc(p.name)}</div>
          </div>
          <div class="rfpc-rw">
            <span class="rfpc-b ${tBadge(p.type)}">${p.type}</span>
            <span class="rfpc-b ${sBadge(status)}">${status}</span>
          </div>
        </div>`;

      if (p.type === "Printed") {
        html += `
          <div class="rfpc-sc"><div class="rfpc-lb">Overview</div>
            <div class="rfpc-sp">
              <div class="rfpc-k">Assembly</div><div class="rfpc-v">${v(p.assembly)}</div>
              <div class="rfpc-k">Version</div><div class="rfpc-v">${v(p.version)}</div>
              <div class="rfpc-k">Designer</div><div class="rfpc-v">${v(p.designer)}</div>
              <div class="rfpc-k">Date</div><div class="rfpc-v">${v(p.date)}</div>
              <div class="rfpc-k">Material</div><div class="rfpc-v">${v(p.material)}</div>
            </div></div>
          <div class="rfpc-sc"><div class="rfpc-lb">Print specs</div>
            <div class="rfpc-sp">
              <div class="rfpc-k">Orientation</div><div class="rfpc-v">${v(p.orientation)}</div>
              <div class="rfpc-k">Infill</div><div class="rfpc-v">${v(p.infill)}</div>
              <div class="rfpc-k">Layer height</div><div class="rfpc-v">${v(p.layer)}</div>
            </div></div>
          <div class="rfpc-sc"><div class="rfpc-lb">Files</div>
            <div class="rfpc-fl">
              ${fileBtn("Fusion (.f3d)", p.files && p.files.f3d)}
              ${fileBtn("Mesh (.stl)", p.files && p.files.stl)}
              ${fileBtn("Drawing (PDF)", p.files && p.files.drawing)}
            </div></div>
          <div class="rfpc-sc"><div class="rfpc-lb">Hardware bill of materials</div>
            ${p.hardware && p.hardware.length ? `
              <table class="rfpc-bm">
                <thead><tr><th style="width:40px;">Qty</th><th>Hardware ID</th><th>Description</th><th style="text-align:right; width:70px;">Ext.</th></tr></thead>
                <tbody>${p.hardware.map(h => `
                  <tr><td>${esc(h.qty)}</td><td>${mv(h.hwid)}</td><td>${esc(h.desc)}</td><td style="text-align:right;">${cur(h.ext)}</td></tr>
                `).join("")}</tbody>
              </table>
              <div style="margin-top:10px; text-align:right;" class="rfpc-ct">Total hardware: ${cur(p.cost)}</div>
            ` : `<div class="rfpc-em">No fasteners specified.</div>`}
          </div>
          <div class="rfpc-sc"><div class="rfpc-lb">Notes</div>
            <p class="rfpc-nt">${esc(p.notes || "\u2014")}</p>
          </div>`;
      } else if (p.type === "Stock") {
        html += `
          <div class="rfpc-sc"><div class="rfpc-lb">Overview</div>
            <div class="rfpc-sp">
              <div class="rfpc-k">Assembly</div><div class="rfpc-v">${v(p.assembly)}</div>
              <div class="rfpc-k">Spec</div><div class="rfpc-v">${v(p.spec)}</div>
              <div class="rfpc-k">Qty needed</div><div class="rfpc-v">${v(p.qty)}</div>
            </div></div>
          <div class="rfpc-sc"><div class="rfpc-lb">Sourcing</div>
            <div class="rfpc-sp">
              <div class="rfpc-k">Supplier</div><div class="rfpc-v">${v(p.supplier)}</div>
              <div class="rfpc-k">Part number</div><div class="rfpc-v">${mv(p.supplierPN)}</div>
              <div class="rfpc-k">Link</div><div class="rfpc-v">${p.supplierUrl ? `<a class="rfpc-li" href="${esc(p.supplierUrl)}" target="_blank" rel="noopener">View product \u2192</a>` : `<span class="rfpc-tbd">TBD</span>`}</div>
              <div class="rfpc-k">Unit cost</div><div class="rfpc-v">${cur(p.cost)}</div>
            </div></div>
          <div class="rfpc-sc"><div class="rfpc-lb">Notes</div>
            <p class="rfpc-nt">${esc(p.notes || "\u2014")}</p>
          </div>`;
      } else {
        html += `
          <div class="rfpc-sc"><div class="rfpc-lb">Overview</div>
            <div class="rfpc-sp">
              <div class="rfpc-k">Assembly</div><div class="rfpc-v">${v(p.assembly)}</div>
              <div class="rfpc-k">Version</div><div class="rfpc-v">${v(p.version)}</div>
              <div class="rfpc-k">Qty needed</div><div class="rfpc-v">${v(p.qty)}</div>
            </div></div>
          <div class="rfpc-sc"><div class="rfpc-lb">Components</div>
            <ul class="rfpc-cmp">${(p.components || []).map(c => `<li>${esc(c)}</li>`).join("")}</ul>
          </div>
          <div class="rfpc-sc"><div class="rfpc-lb">Notes</div>
            <p class="rfpc-nt">${esc(p.notes || "\u2014")}</p>
          </div>`;
      }
      d.innerHTML = html;
    }

    document.getElementById("rfpc-search").addEventListener("input", renderList);
    document.getElementById("rfpc-f-type").addEventListener("change", renderList);
    document.getElementById("rfpc-f-assy").addEventListener("change", renderList);
    document.getElementById("rfpc-f-stat").addEventListener("change", renderList);

    renderList();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();