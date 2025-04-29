# Overview
This feature consolidates runtime interface and SVG rendering capabilities into a unified plot engine that now supports bulk export of plots. In addition to maintaining CLI and HTTP interactions for single plot generation, the feature introduces the ability to accept an array of plot definitions from configuration files for batch processing.

# Implementation
- Extend the configuration loader to detect a new 'plots' array. When present, each element must include an 'expression', 'range', and a target output file. For each entry, the system will validate the expression using existing routines, compute plot data, and generate the output (SVG/PNG/JSON) based on the provided or default parameters.
- In CLI mode, if a 'plots' array is detected in the configuration file, iterate through each plot definition to generate multiple outputs in one command execution. Each plot will use the same configuration and interpolation mechanisms already in place, ensuring consistency.
- Update the HTTP endpoint to accept an additional query parameter (for example, bulkExport) to allow clients to request batch processing of plots. When enabled, the server will process an array of plot definitions and return a combined JSON response with details for each generated plot.
- Integrate bulk export logic seamlessly with existing features such as environment variable interpolation, configuration validation via Zod, advanced SVG rendering (including smoothing, dynamic color gradients, markers, and stroke styling) and error handling.
- Ensure detailed error feedback for each plot in a bulk operation, so that failures are isolated to individual plot definitions without stopping the entire batch process.

# Impact
- Enables users to generate multiple plots in a single run, reducing repetitive command invocations and enhancing productivity.
- Simplifies maintenance by merging runtime interface and SVG rendering into one cohesive plot engine.
- Advances the mission of being a go-to plot library by supporting both single and bulk plot generation, addressing a real user need for scalable visualizations.