Usage
=====

.. _installation:

Installation
------------

To use Read the Docs, first install it using pip:

.. code-block:: console

        (.venv) $ pip install sphinx-rtd-theme

.. _describing code:

Describing Code
----------------

To do X, you can use the ``foobar( )`` function:

.. c:type:: void (*foobar)(void);

    A test for a C typedef declaration. Here is an example of a cross reference to :cpp:type:`fooptr`.

To do Y, you can use the ``robolib.barfoo()`` function:

.. py:function:: barfoo(a=None, b=None)

    A test for a Python function 

    :param a: Some data
    :type a: datatype

    :param b: Optional data
    :type b: datatype or None

    :raise BarFooExceptionHandler: If ``a`` is invalid

    :return: Generic Data.
    :rtype: datatype

The ``a`` parameter should be ``"x"``, ``"y"``, or ``"z"``. Otherwise, :py:func:`robolib.barfoo` will raise an exception.

.. py:exception:: robolib.BarFooExceptionHandler

    Raise if the ``a`` is invalid