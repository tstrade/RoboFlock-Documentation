==================
Installation Guide
==================

First, ensure that the Jetson Orin Nano has been properly setup by following the :doc:`configuration guide <jetson_config>`


Next, we'll get ROS2 and RoboFlock installed onto the Jetson. The ROS2 Humble installation can either be done by following the instructions below or by visiting the `ROS2 Humble Installation Guide <https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html>`_.


First, set the locale (parameter's relating to date / numerical formats, currency symbols, etc.):

.. code-block:: console

    $ locale # check for UTF-8

    $ sudo apt update && sudo apt install locales
    $ sudo locale-gen en_US en_US.UTF-8
    $ sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
    $ export LANG=en_US.UTF-8

    $ locale # verify that LC_ALL and LANG are UTF-8


Next, setup the source repositories (`Ubuntu Universe repository <https://help.ubuntu.com/community/Repositories/Ubuntu>`_ and `ros-apt-source <https://github.com/ros-infrastructure/ros-apt-source/>`_): 

.. code-block:: console

    $ sudo apt install software-properties-common
    $ sudo add-apt-repository universe

    $ sudo apt update && sudo apt install curl -y
    $ export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
    $ curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
    $ sudo dpkg -i /tmp/ros2-apt-source.deb


Install development and ROS tools:

.. code-block:: console

    $ sudo apt update && sudo apt install -y \
      python3-flake8-docstrings \
      python3-pip \
      python3-pytest-cov \
      ros-dev-tools

    $ sudo apt install -y \
      python3-flake8-blind-except \
      python3-flake8-builtins \
      python3-flake8-class-newline \
      python3-flake8-comprehensions \
      python3-flake8-deprecated \
      python3-flake8-import-order \
      python3-flake8-quotes \
      python3-pytest-repeat \
      python3-pytest-rerunfailures

Now we can install the ROS2 packages:

.. code-block:: console

    $ sudo apt update && sudo apt upgrade
    $ sudo apt install ros-humble-desktop
    $ sudo apt install ros-dev-tools
    $ echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
    $ source ~/.bashrc


Check that the environment was setup correctly:

.. code-block:: console

    $ printenv | grep -i ROS


You should see the following variable assignments in the output:

.. code-block:: console

    ROS_VERSION=2
    ROS_PYTHON_VERSION=3
    ROS_DISTRO=humble


If this is not the case, visit the ROS2 installation guide or `get answers <https://robotics.stackexchange.com/>`_ from the community.


Set the domain ID and package scope variables:

.. code-block:: console

    $ echo "export ROS_DOMAIN_ID=0" >> ~/.bashrc
    $ echo "export ROS_LOCALHOST_ONLY=1" >> ~/.bashrc
    $ source ~/.bashrc


Install other ROS2 plugins and tools:

.. code-block:: console

    $ sudo apt update && sudo apt upgrade
    $ sudo apt install '~nros-humble-rqt*'
    $ sudo apt install python3-colcon-common-extensions
    $ sudo apt install rosdep
    $ sudo rosdep init
    $ rosdep update


Clone the RoboFlock workspace to the home directory, install dependencies, and build packages:

.. code-block:: console

    $ git clone https://github.com/shouvik-d/roboflock_ws.git
    $ cd ~/roboflock_ws
    $ rosdep install --from-path src --rosdistro humble -y
    $ colcon build --symlink-install # if freezing, add the `--executor sequential` argument

    $ echo "source /usr/share/colcon_cd/function/colcon_cd.sh" >> ~/.bashrc
    $ echo "export _colcon_cd_root=/opt/ros/humble/" >> ~/.bashrc
    $ source ~/.bashrc
    $ source install/setup.bash

.. note::

    :code:`source install/setup.bash` will need to be run in the workspace's root directory every time a new terminal window is opened. This adds all required environment variables, paths, and bash commands needed by the packages. It also has to be run whenever a new package is added. 
    
    It is recommended to do this step manually every time, but you can choose to offload this to your startup script by executing :code:`echo "source ~/roboflock_ws/install/setup.bash" >> ~/.bashrc`. Keep in mind that the ``install`` directory *must exist* to avoid errors. It should also be placed after :code:`source /opt/ros/humble/setup.bash` to properly setup the environment.


If this installation process fails, you can execute :code:`rm -rf ~/roboflock_ws`, remove any ROS2 additions to ``~/.bashrc``, and uninstall ROS2. Restart the Jetson Orin Nano before reattempting the installation process. 

If the installation is successful, check out :doc:`Managing USB Devices <manage_usb>` to get all USB devices ready for use, then run through the remaining configuration guides for all other components (GPS modules, motor drivers, etc.). 