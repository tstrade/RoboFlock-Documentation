Writing Custom CML Files
========================

Creating C++ packages can be difficult to navigate for first-time users of ROS2. This tutorial will explain the basic structure of a CMakeLists.txt file, otherwise known as a CML file. Importantly, we will cover how to properly compile and link pacakages with several files and subdirectories found in the :code:`include/` and :code:`src/` directories of the ROS2 package.

First, we want to guarantee compatibilty by enforcing a lower bound on the CMake version. For example, RoboFlock uses CMake version 3.8, so the first line of the CML file should be:

.. code-block:: cmake
    :linenos:

    cmake_minimum_required(VERSION 3.8)


In the context of ROS2, the project name should be the *extactly the same* as the package name created in the ROS2 environment. Let's call our project :code:`hello_world_pkg` and assume it has the following structure:

.. literalinclude:: ./hello_world_tree.txt
    :language: text


We can use the :code:`project()` command to give our project a name and to set environmental variables for the absolute paths to the source and binary directories.

.. code-block:: cmake
    :lineno-start: 2

    project(hello_world_pkg)


The next few lines set parameters for the compiler, such as the C++ standard being used and various compiler flags.

.. code-block:: cmake
    :lineno-start: 3

    if(NOT CMAKE_CXX_STANDARD)
        set(CMAKE_CXX_STANDARD 14)
    endif()

    if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
        add_compile_options(-Wall -Wextra -Wpedantic)
    endif()


ROS2 allows for a complex network of packages and nodes to interact with one another, and as such, we need to tell the build process what packages have dependencies. In our project, we will use three built-in ROS2 packages (:code:`ament_cmake`, :code:`rclcpp`, and :code:`std_msgs`) that are needed for most of RoboFlock's nodes. 

.. code-block:: cmake
    :lineno-start: 10

    # Creates variables like rclcpp_LIBRARIES and and std_msgs_INCLUDE_DIRS
    #
    find_package(ament_cmake REQUIRED) # ROS2 build system
    find_package(rclcpp REQUIRED)      # ROS2 C++ client library
    find_package(std_msgs REQUIRED)    # ROS2 standard msg types


Now that we have our compatibility requirements, we need to make sure that the compiler can find all our files and properly link libraries. First, let's tell the compiler where to search for included files:

.. code-block:: cmake
    :lineno-start: 15

    # Adds include/ directory to compiler's search path for ALL targets
    #   This allows for the preprocessor directive "#include" to work properly for our code
    #
    include_directories(
        include
    )


Next, we'll handle our source files. We can organize all the source files into a single variable so that we don't have to repeat commands and file names for every single source file. For extra precaution, we'll ensure that these files exist. The code in our CML file should look like this:

.. code-block:: cmake
    :lineno-start: 21

    # Creates the variable LIB_SOURCE_FILES used to organize source files for the library
    #
    set(LIB_SOURCE_FILES
        src/greetings/hello_source1.cpp
        src/greetings/hello_source2.cpp
        src/salutations/goodbye_source1.cpp
        src/salutations/goodbye_source2.cpp
    )

    # Loop through each file in LIB_SOURCE_FILES to make sure that they exist
    #
    foreach(src_file ${LIB_SOURCE_FILES})
        if(NOT EXISTS ${CMAKE_CURRENT_SOURCE_DIR}/${src_file})
            message(WARNING "Source file not found: ${src_file}")
        else()
            message(STATUS "Found source file: ${src_file}")
        endif()
    endforeach()


Libraries are a collections of pre-written code that are helpful with code reusability and scalability. There are a few different types of libraries that we can make:

- *Static libraries* contain compiled code of all the files and is linked directly to an executable at compile time. 

- *Shared (Dynamic) libraries* contain compiled code only for required files and is loaded at runtime


Let's add a library target to be built from the source files and then link everything together. The heavy-lifters here will be the :code:`target_include_directories()` and :code:`target_link_libraries()` commands. We can use the :code:`PUBLIC` keyword to make our custom library visible to other packages, allowing it to be added as a dependency:

.. code-block:: cmake
    :lineno-start: 39

    # Create the library target
    #
    add_library(${PROJECT_NAME}_lib ${LIB_SOURCE_FILES})

    # Add the include path to the library target
    #   PUBLIC indicates that both the library target and anything linking to it gets these includes
    #
    target_include_directories(${PROJECT_NAME}_lib PUBLIC
        include
    )

    # Tell the linker which specific libraries to use when linking the target and its dependents
    #   Usage requirements are propagated
    #
    target_link_libraries(${PROJECT_NAME}_lib PUBLIC
        ${rclcpp_LIBRARIES}
        ${std_msgs_LIBRARIES}
    )


In order to run our ROS2 node, we're going to need an executable:

.. code-block:: cmake
    :lineno-start: 57

    # Add an executable target to be built from our node's source code
    #
    add_executable(hello_world_node src/hello_world_node.cpp)

    # Tell the compiler what include directories we want to use
    #   PRIVATE indicates that our include/ directory is only available to our source code and is not propagated to other targets
    #
    target_include_directories(hello_world_node PRIVATE include)

    # Tell the linker which specific libraries to use when linking the executable target
    #   Usage requirements are propagated
    #
    target_link_libraries(hello_world_node PUBLIC
        ${PROJECT_NAME}_lib
        rclcpp::rclcpp
        ${std_msgs_TARGETS}
    )


The CML file should specify where our libraries and executable are being installed by generating a set of rules using the :code:`install()` command. We'll also create static and shared libraries and executables that can be used by other packages:

.. code-block:: cmake
    :lineno-start: 74

    # Specify that our node's executable and custom library will be installed into lib/hello_world_pkg
    #   Then, we'll specify options for our output artifacts (compiled binaries generated during the build process)
    install(TARGETS 
        hello_world_node 
        ${PROJECT_NAME}_lib 
        DESTINATION lib/${PROJECT_NAME}
        ARCHIVE DESTINATION lib         # Static libraries (.a)
        LIBRARY DESTINATION lib         # Shared libraries (.so)
        RUNTIME DESTINATION bin         # Executables
    )

    # Specify that our custom include files will be installed in include
    install(DIRECTORY include/
        DESTINATION include/
    )

*Note: the paths provided here are relative to the project's directory found in* :code:`install/`*. For our example, the path to our include files looks like:* :code:`ros2env_rootdir/install/hello_world_pkg/include`


Finally, we'll use :code:`ament_cmake`, which is the build system for C++ packages in ROS2, to make our package discoverable to other ROS2 packages. The last line is *essential* to the entire CML file because it generates configuration files and setup scripts. It also registers our package in the ROS2 workspace, allowing us to actually run the node.

.. code-block:: cmake
    :lineno-start: 89

    ament_export_include_directories(include)
    ament_export_libraries(${PROJECT_NAME}_lib)
    ament_export_dependencies(rclcpp std_msgs)

    # Last line of the CML file
    ament_package()
        

Now you should be able to write, build, and run your own C++ packages in ROS2 without CMake semantics slowing you down! Simply substitute your directory and file names for the names used in this example.

