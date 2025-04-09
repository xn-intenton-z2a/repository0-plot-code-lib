# FILE_EXPORT Feature Specification

## Overview
This feature introduces the ability to export generated ASCII plots to a file. By extending the current PLOT_ENGINE functionality, users can save their plotted output directly to a text file via the command line or programmatically when using the library. This aligns with our mission by enhancing usability for documentation and sharing, while maintaining a lightweight, single-repository implementation.

## Implementation Details
- **CLI Integration:**
  - Add support for an additional flag (for example, `--export`) in the main CLI (src/lib/main.js) to trigger export functionality when used alongside the `--plot` option.
  - If the flag is provided, compute the ASCII plot using the existing PLOT_ENGINE routines and determine the file path (from an argument or default to a predefined filename).
- **File Export Logic:**
  - Use Node’s built-in `fs` module to write the output string to the specified file.
  - Implement error handling to manage file I/O issues, reporting errors back to the user and gracefully falling back to console output if necessary.
- **Library Exposure:**
  - Expose a function (e.g., `exportPlot`) that accepts parameters (formula, interval, step, and output path) and writes the resultant ASCII plot to the file system.

## Testing and Documentation
- **Testing:**
  - Develop unit tests to simulate the `--export` flag, verifying that file write operations function correctly and contain expected plot data.
  - Employ mocks for file system I/O to avoid actual disk writes during tests.
- **Documentation:**
  - Update the README.md and CONTRIBUTING.md documents to include detailed usage examples covering both CLI and programmatic exports.
  - Provide troubleshooting tips for common file permission or path issues.

## Usage Example
- **CLI Example:**
  - Command: `node src/lib/main.js --plot "sin(x)" --export myplot.txt`
  - This will render the plot for sin(x) and save the output to `myplot.txt`.
- **Library Example:**
  - Import the export function with `import { exportPlot } from './src/lib/fileExport.js';` and call `exportPlot('sin(x)', [-10, 10], 0.5, 'myplot.txt');` to produce a file export from within a script.
