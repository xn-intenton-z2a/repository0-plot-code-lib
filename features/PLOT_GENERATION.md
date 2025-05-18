# Overview
This feature adds the ability to generate plot images in SVG or PNG format from expression time series data and save them to a file.

# CLI Arguments
- Add a new flag --plot that takes a value of svg or png to specify the output image format
- Add a new flag --output that takes a file path where the generated plot image will be saved
- Validate that when --plot is provided, --output must also be provided and point to a writable location

# Plot Generation
- After obtaining the time series array of objects with x and y values, invoke chartjs-node-canvas to create a line chart
- Configure chart data with x values as labels and y values in a dataset
- For svg output, configure the canvas render mode as svg and obtain an svg buffer
- For png output, obtain a png buffer using the default canvas settings
- Write the resulting buffer to the specified output file using filesystem APIs

# Testing
- Add unit tests for the plot generation utility given a fixed series to verify it returns a buffer of nonzero length and correct MIME signature
- Add CLI integration tests by simulating process arguments with expression range plot and output flags, invoking main, and asserting that the image file exists and matches the requested format

# Documentation
- Update README.md to include example commands that generate svg and png plots with sample file paths and show thumbnail previews or file information

# Dependencies
- Add chartjs-node-canvas to package.json dependencies for chart rendering functionality