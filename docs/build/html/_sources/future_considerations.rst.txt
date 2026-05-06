=====================
Future Considerations
=====================

Lighter build 

- Current build weighs ~60lbs, largely from motors


Return home functionality

- Use meshtastic system to send goalpose to robot


Battery life / monitor

- Look into different types of batteries to prioritize capacity

- Motors last 30 minutes at maximum speed

- Find safer alternative to LiPo

- Implement fuel guage


Upgrade GPS capabilities

- Upgrade NEO to ZED

- Invest in L5 GPS

- Work on RTK


Upgrade sensors

- 4D LiDAR

- Camera (computer vision)

- Upgrade / remove ultrasonic sensors

- Consider multiple IMUs for redundancy

- Motor encoders (already have, but need to be configured / fully implemented with ROS2)


Nvidia (ISAAC) ROS 2 Projects

- Currently not using any of the Jetson's AI processing capabilities

- Computer vision, user identification, remote access, etc. 


Error handling / user-friendly debugging

- Parse logs from different nodes so not printing all at once

- Process errors behind-the-scenes and only show user the diagnostic summary

- Stop, handle, & restart ROS2 (or some other solution) when there is a fatal error


