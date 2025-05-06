# Overview
When the CLI is invoked without arguments, the tool replaces the placeholder behavior with automatic generation of a sample sine wave plot in SVG format. This provides an immediate demonstration of core functionality and gives users a visual example of the library in action.

# Source File Updates
1. In main(args): detect args.length === 0 and no flags. Instead of printing the placeholder, set expression to sin(x) and range to x=0:6.28:0.1.
2. Call generateTimeSeries with the sine expression and default step to produce an array of points for one full period.
3. Call renderPlot with format svg, width 800, height 600, and labels { x: "x", y: "sin(x)" } to produce an SVG string.
4. If --output is provided, write the SVG string to the specified file via fs.writeFileSync; otherwise write it to stdout via process.stdout.write.
5. Return exit code 0 on success.

# Tests
1. Add a unit test that spies on renderPlot to return a fake SVG and invokes main([]), asserting that process.stdout.write is called with the SVG string and that the exit code is 0.
2. Add an integration test that runs the CLI without arguments and captures stdout to verify the output begins with <svg and contains expected chart elements.
3. Add a test for --output flag: spy on fs.writeFileSync, run main with output path, and assert the file write is invoked with the SVG content.

# Documentation
1. Update USAGE.md default section: replace the placeholder Run with placeholder message with an example invocation and expected SVG snippet for the sine wave sample.
2. Update README.md under Features to describe that running the CLI with no arguments produces a sample sine wave plot in SVG format.