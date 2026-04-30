=============
Communication
=============

To provide means of communication between RoboFlock's owner, the robot, and the beacon, we make use of `Meshtastic <https://meshtastic.org/>`_ radio devices. Meshtastic is an open-source long-range radio (LoRa) protocol and software platform that allows for the creation of a decentralized mesh network between nearby Meshtastic devices. 

The main advantage of Meshtastic is that it operates independently of traditional communication infrastructure such cellular networks or Wi-Fi, which are unavailable at the Burning Man site. The low power consumption of LoRa radios also makes Meshtastic devices ideal for battery-powered deployments.

Conveniently, the increasing popularity of the Meshtastic protocol among Burning Man attendees works to our advantage. Since each device in the mesh can relay messages for other nodes, this extends the overall range of the network well beyond the direct point-to-point of any single radio. This can range from 2 - 5 km between any single device, or up to 100 km for a well-designed / well-populated mesh.

With a reliable line of communication established, RoboFlock's owner can transmit commands and make status requests directly to the robot and the beacon. The robot can also send status messages if it gets stuck and is low on battery. 

Additionally, the GPS coordinates of the robot and beacon are sent out to the mesh and used for waypoint following and location visualization. Since the Meshtastic devices are configured with the companion Meshtastic mobile app, we can have encrypted communication channels for this all the information to go through and stop external devices from grabbing our data.
