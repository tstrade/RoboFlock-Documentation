import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.append(str(Path('sphinext').resolve()))


# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'RoboFlock'
copyright = '2025, Project RoboFlock'
author = 'Thomas Strade, Aditya Challamarad, Marco Bianco, Nicholas Pitsakis, Krish Puwar, Shouvik Das, Andrew Collado'
version = '1.1'
release = '1.1'
language = 'en'
# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx.ext.duration',
    'sphinx.ext.doctest',
    'sphinx.ext.autodoc',
    'sphinx.ext.intersphinx',
    'sphinx.ext.autosummary',
    'sphinx_tabs.tabs',
    'sphinx_rtd_theme',
    'sphinx_new_tab_link',
    'sphinx_copybutton',
    'sphinx_carousel.carousel',
    'sphinxcontrib.video',
    'sphinx_design',
]

copybutton_exclude = '.linenos, .gp, .go'
templates_path = ['_templates']
exclude_patterns = ['citation_docs/mathref_docs/kalmanfilters.rst']
highlight_language = 'cmake'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'
html_static_path = [
    '_static',
    '_images',
]
html_logo = "_images/Robo.png"
html_css_files = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    ('custom.css', {'priority': 800}),
]

html_theme_options = {
    'logo_only': True,
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 2,
    'prev_next_buttons_location': "both",
    'style_external_links': True,
    'body_max_width': 'none',
}

def skip_carousel_nodes(app, doctree):
    from sphinx_carousel.nodes import CarouselMainNode, CarouselItemNode
    
    for node in doctree.traverse(CarouselMainNode):
        if 'classes' not in node:
            node['classes'] = []
        node['classes'].append('no-search')
    for node in doctree.traverse(CarouselItemNode):
        if 'classes' not in node:
            node['classes'] = []
        node['classes'].append('no-search')

def setup(app):
    app.connect('doctree-read', skip_carousel_nodes)