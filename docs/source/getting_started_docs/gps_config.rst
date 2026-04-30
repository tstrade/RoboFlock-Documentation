========================
GPS Module Configuration
========================

.. include:: ../_templates/constants.rst


.. note::

    The following guide for configuring the GPS modules assumes access to a Windows machine.


1. `Download and Install u-center 25.06 <https://content.u-blox.com/sites/default/files/2025-06/u-center_v25.06_installer.zip>`_
:raw-html:`<br />`

2. Open u-center and connect the GPS module to your computer. 
:raw-html:`<br />`

3. Click the drop down arrow next to the "Connect Serial Port" icon in the toolbar and select the COM port corresponding to the GPS module.
:raw-html:`<br />`

4. Click the "Configuration View" icon in the toolbar and select the "GNSS (GNSS Config)" option from the list of configurations.
:raw-html:`<br />`

5. In the "GNSS (GNSS Config)" window, tick the "Configure" option, then tick the "Enable" boxes for GNSS "GPS" and "GLONASS" options. Send these options to the GPS module.
:raw-html:`<br />`

.. note::

    To send configuration options to the GPS module module, click the "Send" button on the bottom toolbar of the "Configuration View" window.


6. From the list of configurations, select the "MSG (Messages)" option and click the dropdown arrow next to the "Message" setting.
:raw-html:`<br />`

7. In the dropdown menu, select the "F0-00 NMEA GxGGA" message and tick the boxes for UART2. Send these options to the GPS module.
:raw-html:`<br />`

8. From the list of configurations, select the "PRT (Ports)" option and click the dropdown arrow next to the "Target" setting.
:raw-html:`<br />`

9. In the dropdown menu, select the "1 - UART1" if configuring the ZED-F9P or the "2 - UART2" target if configuring the NEO-M8P. Click the dropdown arrow next to the "Protocol in" setting and select "none." 
:raw-html:`<br />`

10. Within the corresponding UART menu, click the dropdown arrow next to the "Protocol out" setting and select the "1 - NMEA" setting.
:raw-html:`<br />`

11. Within the "1 - NMEA" menu, click the dropdown arrow next to the "Baudrate" setting and select "9600". Send these options to the GPS module.
:raw-html:`<br />`

12. From the list of configuration options, select "CFG (Configuration)" to save all the settings sent to the GPS module.
:raw-html:`<br />`

13. In the "CFG - Configuration" window, tick the "Save current configuration" option. Then, in the "Devices" section, highlight both "0 - BBR" and "1 - FLASH". Send these options to the GPS module. 
:raw-html:`<br />`
