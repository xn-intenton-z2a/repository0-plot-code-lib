# Overview

This update extends the CLI tool by integrating a JSON output mode alongside the existing text preview and file output (SVG/PNG) functionalities. The JSON output mode allows users to receive computed time series data in a structured and formatted JSON format, facilitating integration with other CLI tools and automated data processing pipelines.

# Implementation Details

1. CLI Argument Parsing:
   - Extend the existing argument parser in src/lib/main.js to recognize a new flag --json.
   - Update the Zod schema to include an optional boolean flag for --json. The flag is mutually exclusive with --file; if both are provided, file output takes precedence.

2. Update Main Logic:
   - After computing the plot points, add a condition that checks for the presence of the --json flag. If provided and no file output is requested, output the points as a pretty-printed JSON string to stdout instead of the text preview.
   - Maintain existing behavior for generating SVG or PNG files when --file is specified.

3. Testing and Documentation:
   - Enhance unit tests in tests/unit/plot-generation.test.js to add cases verifying that valid JSON output is generated when the --json flag is used in appropriate scenarios.
   - Update the README.md and USAGE.md to document the new JSON output mode, including examples of usage and error handling when conflicting options (e.g., --json and --file) are provided.

# Impact

This enhancement increases the versatility of the CLI tool by offering a machine-readable output mode. It directly supports integration with modern data processing workflows and tools while reinforcing the mission to be the go-to plot library that offers quality, accessible visualization capabilities.
