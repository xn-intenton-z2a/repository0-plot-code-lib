# Overview
This update enhances the SVG_PLOTTING feature to support batch plotting mode in addition to the existing dynamic, configurable plot generation. In batch mode, users can supply multiple mathematical expressions and ranges in a single CLI invocation or configuration file. The system will generate a combined output (concatenated SVGs) or process each plot sequentially for separate output, based on user preferences.

# Implementation
- Add a new CLI flag, --batch, which when enabled will allow users to supply multiple expressions. The expressions may be provided either
  as a semicolon separated list in the expression parameter or as a JSON array in the configuration file.
- Extend the configuration parser (loadConfig) and command line options parser to detect and correctly process batch mode input.
- In batch mode, for each expression-range pair the system will compute plot data and build corresponding SVG content. The output file will
  either contain the concatenated SVG contents (with clear separators) or multiple SVG outputs if the user specifies a suitable output pattern.
- Update error handling to check that every expression in batch mode includes the variable x and that each corresponding range is valid.
- Ensure compatibility with the existing customization options (markers, gradients, stroke styling, smoothing, etc.) for each individual plot.
- Update unit tests in tests/unit to include new scenarios for batch plotting, confirming that multiple plots are generated, proper output is produced, and errors are raised for any invalid item in the batch.
- Update the README and USAGE documentation to explain how to use the new batch plotting mode, including examples of both CLI and HTTP invocations with multiple expressions.

# Impact
- Empowers users to generate multiple plots in one run, increasing efficiency when visualizing collections of mathematical expressions.
- Consolidates extended plotting capabilities into a single, robust module, aligning with the mission of making plot-code-lib the go-to tool for formula visualisations.
- Provides clear and consistent feedback in batch mode to ensure users can easily diagnose and correct errors in any of the batched input expressions and ranges.