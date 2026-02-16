Real-Time Kinematic Positioning
===============================

.. include:: ../../_templates/constants.rst

Reliable GPS data is a necessity for RoboFlock. Without it, the robot wouldn't be able to find its user. Using the NEO-N8P and ZED-F9P GNSS modules, which have integrated RTK, we can obtain centimeter-level accuracy about the location of the robot and its user. 

GNSS uses signals from multiple satellites that a receiver can use to pinpoint its location in 3D space through a process called *trilateration*. The receiver measures the ToF from any given satellite and then generates a copy of the signal. The amount of time required to align the signals, based on the receiver's internal frequency, eventually produces the receiver's *pseudorange observation*. We use the prefix *pseudo* because the data is still noisy and needs further processing.

The receiver also measures the the phase difference between the original signal and its copied version using a PLL. This is the receiver's *carrier-phase measurement*. Since the signal has a very small wavelength, this measurement is more precise the the pseudorange observation.

Without combining these observations or correcting for error, we can mathematically represent the pseudorange, :math:`P_{r,j}^{s}`, and the carrier-phase, :math:`\Phi_{r,j}^{k}`, for receiver :math:`r` and satellite :math:`s` with frequency :math:`f` at epoch :math:`k` as follows:

.. math::

    \begin{align} P_{r, j}^{s} (k) &= \varrho_{r}^{s} (k, k - \delta) + cdt_{r}(k) - cdt^{2}(k - \delta) + D_{r, j}(k) \\ &- d_{j}^{s} (k - \delta) + \mathcal{E}_{r,j}^{s} \\ \\ \Phi_{r,j}^{s} &= \varrho_{r}^{s} (k, k - \delta) + cdt_{r}(k) - cdt^{2}(k - \delta) + B_{r, j}(k) \\ &- b_{j}^{s} (k - \delta) + \lambda_{j}a_{r,j}^{s} + \mathcal{e}_{r,j}^{s} \end{align}

where 

- :math:`\varrho_{r}^{s}` is the satellite-to-receiver range (m), 

- :math:`c` is the speed of light in a vacuum (m/s), 

- :math:`\delta` is the signal travel time (s), 

- :math:`dt_{r}` / :math:`dt^{s}` is the receiver/satellite clock offset (s),

- :math:`D_{r,j}` / :math:`d_{j}^{s}` is the receiver/satellite code hardware delay (m),

- :math:`B_{r,j}^{s}` / :math:`b_{j}^{s}` is the receiver/satellite phase hardware delay (m), 

- :math:`\lambda_{j}` is the signal's wavelength (m/cycle), and

- :math:`\mathcal{E}_{r,j}^{s}` / :math:`\mathcal{e}_{r,j}^{s}` is a substitute for additional error factors, e.g. atmospheric delay, which have been condensed here for simplicity.

All the different symbols may make these equations look complex, but they each describe exactly what was discussed above. Synchronization delay and ToF data, along with some physical constants like the speed of light and signal wavelength, are used to generate the values of the pseudorange and carrier-phase observations. 

RTK uses a *double differenced (DD) operator*, which uses data between two satellites and two receivers to effectively eliminate error caused by hardware delays. 


For a more in-depth discussion about the error factors, and GNSS RTK in general, check out "GNSS Real-Time Kinematic Positioning: Theory and Applications" (Li, 2025).


.. rst-class:: colored-definitions

    **GNSS** - Global Navigation Satellite System

    **RTK** - Real-Time Kinematic

    **ToF** - Time of Flight

    **PLL** - Phase-Locked Loop


References
^^^^^^^^^^

Li, Bofeng, et al. (2025). GNSS Real-Time Kinematic Positioning: Theory and Applications. Springer, 2025. 