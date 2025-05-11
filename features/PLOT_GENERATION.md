# Overview
Adds CLI support for rendering generated time series data as SVG or PNG images.

# CLI Options
--plot-format <format>  Required: Output image format, either svg or png. Defaults to svg.
--width <pixels>  Optional: Width of the generated plot in pixels. Defaults to 800.
--height <pixels>  Optional: Height of the generated plot in pixels. Defaults to 600.
--output <file>  Optional: Path to write the generated image file. If omitted, writes base64-encoded image to stdout.

# Behavior
Generates time series data from the provided expression and range (reuse existing options). Renders a line chart representing x vs y using QuickChart for SVG output. If png is requested, processes the SVG through Sharp to produce a PNG image. Outputs the image to the specified file or stdout.

# Examples
repository0-plot-code-lib --expression "Math.sin(x)" --range 0:6.28:0.1 --plot-format svg --output sine.svg
repository0-plot-code-lib --expression "x*x" --range 0:10:0.5 --plot-format png --width 1024 --height 768 --output parabola.png

# Validation
Validates that plot-format is svg or png, width and height are positive integers, and output path is writable. Existing expression and range validation applies.

# Error Handling
Exits with code 1 and prints an error message if options are missing, invalid formats are provided, or rendering fails.