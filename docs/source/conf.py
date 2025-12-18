# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here.
import sys
import os
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.append(os.path.abspath("/home/School/Fall_2025/Hardware_Software_Integration/RoboFlock-Documentation/docs/source/robolib"))


# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'RoboFlock'
copyright = '2025, Thomas Strade, Aditya Challamarad, Marco Bianco, Nicholas Pitsakis, Krish Puwar, Shouvik Das, Andrew Collado'
author = 'Thomas Strade, Aditya Challamarad, Marco Bianco, Nicholas Pitsakis, Krish Puwar, Shouvik Das, Andrew Collado'
release = '0.1'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx.ext.duration',
    'sphinx.ext.doctest',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx_rtd_theme',
]

templates_path = ['_templates']
exclude_patterns = []



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']
html_theme_options = {
    'collapse_navigation': False,
    'sticky_navigation': False,
    'prev_next_buttons_location': "both",
    'style_external_links': True,
}
