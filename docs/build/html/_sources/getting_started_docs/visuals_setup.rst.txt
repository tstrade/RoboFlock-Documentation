=======================
GPS Visualization Setup
=======================

.. include:: ../_templates/constants.rst


In order to make use of the GPS visualization system, the :doc:`Meshtastic devices <meshtastic_config>`, :doc:`GPS modules <gps_config>`, and HC-12 devices must already be configured.

Hardware Connections
++++++++++++++++++++


Beacon
------

* Connect Meshtastic device "d700" to the USB power source.

* Connect the ZED-F9P to the USB power source.

Robot
-----

* Connect Meshtastic device "3480" to an open USB port on the Jetson Orin Nano.

* Connect the NEO-M8P module to another open USB port on the Jetson Orin Nano.

* Connections *from* the HC-12 *to* the ZED-F9P:

    * VCC ⟶ 5V

    * GND ⟶ GND

    * TXD ⟶ RX2

    * RXD ⟶ TX2


Tablet
------

* Connect Meshtastic device "e074" to the tablet's USB-C port with the help of a USB-A to USB-C adapter.


Software Setup
++++++++++++++

1. Turn on the beacon's USB power source
:raw-html:`<br />`

2. Turn on the robot. The :code:`jetsonBoth.py` script will automatically run and begin sending GPS coordinates to the tablet.
:raw-html:`<br />`

3. Login to the tablet and launch a new Powershell window. Navigate to the :code:`Roboflock` directory using the :code:`cd` command.
:raw-html:`<br />`

.. note::

    This direction should contain two folders, :code:`static` and :code:`template`, as well as two files, :code:`jetsonBoth.py` and :code:`tomBoth.py`.

4. In the :code:`Roboflock` directory, run the following:
:raw-html:`<br />`

.. code-block:: console

    python tomBoth.py


5. As messages are printed to the Powershell window, watch for "GPS RECEIVED" and the coordinates that follow. Wait until the robot and beacon's coordinates are non-zero.
:raw-html:`<br />`

6. Open a new web browser window and enter the URL http://localhost:5000/ 
:raw-html:`<br />`

If successful, you should be able to see the location of both the robot (red) and the beacon (blue) on the map. As they move, their paths will be traced out in their corresponding colors. 

The page should also show buttons labeled "STOP ROBOT" and "COME TO BASE" that will each send a message to the other devices in the Meshtastic network. If a Meshtastic device receives either of these messages, it will be displayed on the device's screen.

Otherwise, start over by checking all hardware connections and then repeating the software setup.