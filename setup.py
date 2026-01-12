from setuptools import setup
import os

# Read requirements from requirements.txt
with open('requirements.txt') as f:
    requirements = f.read().splitlines()

setup(
    name="RoboFlock",
    version="1.1",
    install_requires=requirements,
)
