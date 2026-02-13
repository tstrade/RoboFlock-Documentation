Writing Custom CML Files
========================

Creating C++ packages can be difficult to navigate for first-time users of ROS2. This tutorial will explain the basic structure of a CMakeLists.txt file, otherwise known as a CML file. Importantly, we will cover how to properly compile and link pacakages with several files and subdirectories found in the :code:`include/` and :code:`src/` directories of the ROS2 package.

First, we want to guarantee compatibilty by enforcing a lower bound on the CMake version. For example, RoboFlock uses CMake version 3.8, so the first line of the CML file should be:

.. code-block:: cmake
    :linenos:

    cmake_minimum_required(VERSION 3.8)


In the context of ROS2, the project name should be the *extactly the same* as the package name created in the ROS2 environment. Let's call our project :code:`hello_world_pkg` and assume it has the following directory structure:

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


Now that we have our compatibility requirements, we need to make sure that the compiler can find all our files, properly link libraries, etc. First, let's tell the compiler where to search for included files:

.. code-block:: cmake
    :lineno-start: 15

    # Adds include/ directory to compiler's search path for ALL targets
    #   This is what allows for the preprocessor directive "#include" to work on our files
    #
    include_directories(
        include/${PROJECT_NAME}/
    )


Next, we'll handle our source files. We can organize all the source files into a single variable so that we don't have to repeat commands and file names for every single source file. For extra precaution, we'll ensure that these files exist. The code in our CML file should look like this:

.. code-block:: cmake
    :lineno-start: 21

    # Creates the variable LIB_HEADER_FILES used to organize header files for the library
    #
    set (LIB_HEADER_FILES
        include/${PROJECT_NAME}/greetings/hello_source1.hpp
        include/${PROJECT_NAME}/greetings/hello_source2.hpp
        include/${PROJECT_NAME}/salutations/goodbye_source1.hpp
        include/${PROJECT_NAME}/salutations/goodbye_source2.hpp

    )

    # Loop through each file in LIB_HEADER_FILES to make sure that they exist
    #
    foreach(hdr_file ${LIB_HEADER_FILES})
        if(NOT EXISTS ${CMAKE_CURRENT_SOURCE_DIR}/${hdr_file})
            message(WARNING "Header file not found: ${hdr_file}")
        else()
            message(STATUS "Found header file: ${hdr_file}")
        endif()
    endforeach()

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


Libraries are collections of pre-written code that help with code reusability and scalability. There are a few different types of libraries that we can make:

- *Static libraries* contain compiled code of all the files and are linked directly to an executable at compile time. 

- *Shared (Dynamic) libraries* contain compiled code only for required files and are loaded at runtime

If this package is intended to be used by downstream packages, we can create our own library. To add a library, there are configuration rules that need to be defined so that it uses the correct source code and that everything is properly linked together. The heavy-lifters here will be the :code:`target_include_directories()` and :code:`target_link_libraries()` commands:

.. code-block:: cmake
    :lineno-start: 56

    # Create the library target
    #
    add_library(${PROJECT_NAME}_lib ${LIB_SOURCE_FILES} ${LIB_HEADER_FILES})

    # Add the include path to the library target
    #   PUBLIC indicates that both the library target and anything linking to it gets these includes
    #
    target_include_directories(${PROJECT_NAME}_lib PUBLIC
	    "$<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>"
	    "$<INSTALL_INTERFACE:include/${PROJECT_NAME}>"
    )

    # Tell the linker which specific libraries to use when linking the target and its dependents
    #   Usage requirements are propagated
    #
    target_link_libraries(${PROJECT_NAME}_lib PUBLIC
        ${rclcpp_LIBRARIES}
        ${std_msgs_LIBRARIES}
    )

    # Specify that our library's include directory is installed into the workspace's include directory
    #
    install(DIRECTORY include/${PROJECT_NAME}
        DESTINATION include
    )

    # Specify that our library will be installed as a shared library, a static library, and as a binary
    #   Also, export the library so that it can be used downstream and provide correct environment variables
    install(TARGETS ${PROJECT_NAME}_lib
        EXPORT ${PROJECT_NAME}_lib_targets
        LIBRARY DESTINATION lib # shared library (.so)
        ARCHIVE DESTINATION lib # static library (.a)
        RUNTIME DESTINATION bin # executable
        INCLUDES DESTINATION include/${PROJECT_NAME}
    )


Next, we'll use :code:`ament_cmake`, which is the build system for C++ packages in ROS2, to make our package discoverable to other ROS2 packages:

.. code-block:: cmake
    :lineno-start: 91

    # Export the corresponding objects for CMake, allowing the library's clients to use the
    #   `target_link_libraries(client hello_world_pkg_lib::hello_world_pkg_lib)` syntax
    #
    ament_export_include_directories(include)
    ament_export_libraries(${PROJECT_NAME}_lib)
    ament_export_targets(${PROJECT_NAME}_lib_targets HAS_LIBRARY_TARGET)
    ament_export_dependencies(rclcpp std_msgs)


In order for us to use our ROS2 node, we're going to need an executable. This is the first step to getting the command :code:`ros2 run [package name] [node name]` to work. The executable's name should be the same as the node's name. Then we'll set the visibility, configuration, and installation rules.

.. code-block:: cmake
    :lineno-start: 98

    # Add an executable target to be built from our node's source code
    #
    add_executable(hello_world_node src/hello_world_node.cpp)

    # Tell the compiler what include directories we want to use
    #   PRIVATE indicates that our include/ directory is only available to our source code and is not propagated to other targets
    #
    target_include_directories(hello_world_node PRIVATE
        "$<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>"
	    "$<INSTALL_INTERFACE:include/${PROJECT_NAME}>"
    )

    # Tell the linker which specific libraries to use when linking the executable target
    #
    target_link_libraries(hello_world_node 
        ${PROJECT_NAME}_lib
        rclcpp::rclcpp
        ${std_msgs_TARGETS}
    )

    # Specify that our node's executable will be installed into lib/hello_world_pkg
    # 
    install(TARGETS hello_world_node 
        DESTINATION lib/${PROJECT_NAME}
    )


This last line is *essential* to the entire CML file because it generates all of the configuration files and setup scripts. It also registers our package in the ROS2 workspace, allowing us to run the node.

.. code-block:: cmake
    :lineno-start: 123

    # Last line of the CML file
    ament_package()
        

Now you should be able to write, build, and run your own C++ packages in ROS2 without CMake semantics slowing you down! Simply substitute your directory and file names for the names used in this example. 