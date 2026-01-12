.. RoboFlock documentation master file, created by
   sphinx-quickstart on Wed Dec 17 22:54:23 2025.

RoboFlock Documentation
=======================

**The RoboFlock Project is an autonomous robot design that follows its user.** From LiDAR-based obstacle detection and GPS Real-Time Kinematic tracking to robust process management and powerful computational capabilities, RoboFlock is a reliable companion that will follow you for life (or until the battery gives out).

Previously known as Project Dust Runners, the RoboFlock Project has made a lot of changes to its design. **The goal of the RoboFlock Project is to improve obstacle detection, response time, user accessibility, and environmental resistance.** These changes will take advantage of the foundation laid by Project Dust Runners and leverage new technology to improve the design.

.. _getting_started:

Getting Started
^^^^^^^^^^^^^^^

- :doc:`Overview <overview>`
   - RoboFlock background and description

- :doc:`Tutorials <tutorial_docs/tutorials>`
   - Learn how to setup and interact with RoboFlock's nodes

- :doc:`NVIDIA Jetson Orin Nano <description_docs/nvidia_jetson_orin_nano>`
   - Information on the processor chosen for RoboFlock

- :doc:`Interactions with the Surroundings <description_docs/interactions_with_the_surroundings>`
   - How is RoboFlock going to get around? With lasers!

- :doc:`Tracking <description_docs/tracking>`
   - High-level explaination of GPS RTK and user-to-robot communication

- :doc:`Software <description_docs/software>`
   - ROS2: the backbone of RoboFlock

- :doc:`Chassis Design <construction_docs/chassis_design>`
   - 2-D and 3-D models of RoboFlock's new exterior

- :doc:`Wiring Specifications <construction_docs/wiring_specifications>`
   - RoboFlock has a lot of hardware that needs to be connected, so we made a helpful guide to prevent the headache of debugging electrical connections

- :doc:`Future Considerations <description_docs/future_considerations>`
   - Project RoboFlock only has so much time and money, but future teams will be able to take our ideas and designs to the next level

.. _useful information:

Useful Information
^^^^^^^^^^^^^^^^^^

To see the research and resource specifications that went into the development of Project RoboFlock, check out:

- :doc:`Bibliography <citation_docs/bibliography>`
   - References and inspirations

- :doc:`Appendix A <citation_docs/appendix_a>`
   - Electronics, power supplies, and more

- :doc:`Appendix B <citation_docs/appendix_b>`
   - Datasheets and schematics


.. toctree::
   :titlesonly:
   :maxdepth: 1
   :hidden:

   overview
   tutorial_docs/tutorials
   description_docs/nvidia_jetson_orin_nano
   description_docs/interactions_with_the_surroundings
   description_docs/tracking
   description_docs/software
   construction_docs/chassis_design
   construction_docs/wiring_specifications
   construction_docs/constructing_the_roboflock
   description_docs/future_considerations
   citation_docs/bibliography
   citation_docs/appendix_a
   citation_docs/appendix_b

