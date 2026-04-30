========================
Meshtastic Configuration
========================

.. include:: ../_templates/constants.rst

RoboFlock uses three distinct Meshtastic devices: one for the beacon, one for the robot, and one for a Windows tablet.


Beacon
++++++

.. admonition:: Current Configured Device Info:
    :collapsible:
    
    Name = d700 :raw-html:`<br />`
    Node # = 1819531008 :raw-html:`<br />`
    User ID = !6c73d700 :raw-html:`<br />`


1. Download the Meshtastic App on your phone from it's native app marketplace. 
:raw-html:`<br />`

2. Make sure your phone's bluetooth is on, then open the Meshtastic app and click "Connect". 
:raw-html:`<br />`

3. In the "Available Radios" section, select the radio labeled "d700" (the device name). 
:raw-html:`<br />`

4. Click on the "Settings" button, then the "Channels" option. From here, select "Add Channel". 
:raw-html:`<br />`

5. In the "Channel Details" page, name the channel "from Jetson" and assign it a "Key Size" of 128 bits.  
:raw-html:`<br />`

.. note::
    
    Copy the generated key from the "Key" value and save it to use for later setup of other devices.

6. Set the "Channel Role" to "Secondary". 
:raw-html:`<br />`

7. Under the "Position" section, turn off "Allow Position Requests". 
:raw-html:`<br />`

8. Under the "MQTT" section, turn off "Uplink Enabled" and "Downlink Enabled". Click save at the bottom of the page. 
:raw-html:`<br />`

9. Repeat Steps 4 - 8 to create a channel named "from Tom" and another channel named "gps Coords". Click save at the bottom of the page. 
:raw-html:`<br />`

10. Click on the "Settings" button again and then the "Bluetooth" option. 
:raw-html:`<br />`

11. Under the "Options" section, click the "Enabled" button. Click save at the bottom of the page. 
:raw-html:`<br />`

12. Click on the "Settings" button again and then the "Device Config" option. 
:raw-html:`<br />`

13. Set "Device Role" to "Client Mute", "Rebroadcast Mode" to "Local Only", and "Node Info Broadcast Interval" to "Three Hours". Click save at the bottom of the page. 
:raw-html:`<br />`

14. Click on the "Settings" button again and then the "Position Config" option. 
:raw-html:`<br />`

15. Set "Broadcast Interval" to "Never" and turn off "Smart Position". Under the "Device GPS" section, set to "Disabled" and turn off "Fixed Position". Click save at the bottom of the page. 
:raw-html:`<br />`

16. Click on the "Settings" button again and then the "LoRa Config" option. 
:raw-html:`<br />`

17. Set "Region" to "United States" and turn on "Use Preset". Under the "Presets" section, select "Long Range - Fast". Under "Advanced" turn on "Ignore MQTT", "Transmit Enabled", and "RX Boosted Gain", turn off "Ok to MQTT", and set "Number of hops" to 3. Click save at the bottom of the page. 
:raw-html:`<br />`



Robot
+++++

.. admonition:: Current Configured Device Info:
    :collapsible:
     
    Name = 3480 :raw-html:`<br />`
    Node # = 1819554944 :raw-html:`<br />`
    User ID = !6c743480 :raw-html:`<br />`


1. Make sure your phone's bluetooth is on, then open the Meshtastic app and click "Connect". 
:raw-html:`<br />`

2. In the "Available Radios" section, select the radio labeled "3480" (the device name). 
:raw-html:`<br />`

3. Click on the "Settings" button, then the "Channels" option. From here, select "Add Channel". 
:raw-html:`<br />`

4. In the "Channel Details" page, name the channel "from Jetson" and assign it a "Key Size" of 128 bits. Use the generated key from the Beacon's Meshtastic setup as the key for this channel. 
:raw-html:`<br />`

5. Follow Steps 6 - 17 from the Beacon's Meshtastic setup, except with "Device Role" set to "Client" instead of "Client Mute". 
:raw-html:`<br />`


Tablet
++++++

.. note:: Current Configured Device Info:
    :collapsible:

    Name = e074 :raw-html:`<br />`
    Node # = 3145785460 :raw-html:`<br />`
    User ID = !bb80e074 :raw-html:`<br />`


1. Make sure your phone's bluetooth is on, then open the Meshtastic app and click "Connect". 
:raw-html:`<br />`

2. In the "Available Radios" section, select the radio labeled "e074" (the device name). 
:raw-html:`<br />`

3. Click on the "Settings" button, then the "Channels" option. From here, select "Add Channel". 
:raw-html:`<br />`

4. In the "Channel Details" page, name the channel "from Jetson" and assign it a "Key Size" of 128 bits. Use the generated key from the Beacon's Meshtastic setup as the key for this channel. 
:raw-html:`<br />`

5. Follow Steps 6 - 17 from the Beacon's Meshtastic setup. 
:raw-html:`<br />`



