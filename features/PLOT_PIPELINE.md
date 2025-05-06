# Overview

Fully implement plot rendering pipeline to generate svg and png images from time series data via cli and programmatic api.

# Source File Updates

In src lib main js

1. implement renderPlot
  - instantiate ChartJSNodeCanvas using width and height or defaults 800 and 600
  - build chart configuration of type line using data x as labels and data y as dataset
  - apply axis labels from options labels x and options labels y if provided
  - if options format equals svg call renderToBuffer with mimeType image slash svg plus xml return buffer to string utf8
  - if options format equals png call renderToBuffer with mimeType image slash png return buffer
  - throw error if format is unsupported

2. update main to handle plot format
  - after data generation detect plot format
  - call await renderPlot with data and options object
  - determine write target if output provided use file system write file sync for svg with utf8 encoding and for png write buffer
  - if no output write svg to stdout using console log and png to standard output write method
  - return exit code zero on success and non zero on error

# Tests

In tests unit plot generation test js

- add unit test stub ChartJSNodeCanvas renderToBuffer return buffer starting with svg assert renderPlot returns string starting with svg
- stub renderToBuffer return buffer with png signature assert renderPlot returns buffer with correct content
- add cli integration tests for plot format svg and png stub renderPlot return known string or buffer spy on file system write file sync and process dot stdout write verify correct content and encoding
- add test for unsupported plot format invoke main with invalid format assert exit code non zero and error message printed to standard error

# Documentation

Update README md and USAGE md

- document plot format flag valid values svg and png describe width height and labels options
- provide cli examples generating svg and png images to file and to stdout
- extend programmatic api section with example of calling renderPlot directly and handling returned svg string or png buffer