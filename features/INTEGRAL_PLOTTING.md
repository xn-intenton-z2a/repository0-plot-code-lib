# Overview
Add support for shading the area under a plotted curve to emphasize the integral of a series over its range. When enabled, the plot will include a filled region from the baseline (default y=0) up to the data points.

# CLI Flags
- --integral <true|false>  Boolean flag to enable area shading under each series. Defaults to false.  
- --baseline <number>      Optional numeric flag to specify the baseline y-value for shading. Defaults to 0.

# Implementation
1. Schema Updates  
   • In cliSchema extend with:
     - integral: z.string().regex(/^(true|false)$/, 'integral must be true or false').optional()  
     - baseline: z.string().optional()  
2. Argument Parsing  
   • In parseArgs detect --integral and convert to boolean showIntegral = parsedArgs.integral === 'true'.  
   • Parse --baseline into a number baselineValue or default 0.  
3. Programmatic API  
   • Extend generatePlot schema to include:
     - integral: z.boolean().optional()  
     - baseline: z.number().optional()  
   • In generatePlot parse options.integral and options.baseline  
4. Data and SVG Generation  
   • After data series generation, if integral is true:
     - For each series or single data array, construct a filled polygon or path by adding baseline points at first and last x with y=baseline.  
     - Pass integral and baseline into generateSVG options.  
   • In generateSVG extend signature to accept options.integral and options.baseline.  
     - When options.integral true insert a <polygon> or <path> element before polyline strokes, filling with semi-transparent series color.  

# Testing
- Create tests/unit/integral-plotting.test.js:  
  • CLI mode: run main with --integral true and --baseline 1 inspect written SVG for a polygon with fill attribute shading from baseline to curve.  
  • Programmatic API: call generatePlot with integral true and baseline 2 and verify returned SVG contains shading path.  
  • Error cases: invalid integral values or non-numeric baseline should trigger schema errors and exit code 1.

# Documentation
- Update USAGE.md and README.md under plot styling section to describe --integral and --baseline flags with usage examples.  
- Provide a sample SVG snippet showing a shaded polygon beneath the curve.