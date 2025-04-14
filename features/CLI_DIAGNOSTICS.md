# CLI_DIAGNOSTICS Enhancement

## Overview
This update refines the CLI_DIAGNOSTICS feature by implementing a diagnostics mode in the CLI. When the user provides the `--diagnostics` flag, the tool will bypass the normal plotting functionality and instead output key runtime and configuration details. This diagnostic output includes the Node.js version, operating system platform, and selected environment variables. This improvement aligns with our mission by ensuring that users can quickly verify their installation and runtime environment for improved debugging and transparency.

## Implementation Details

### Source File Update (`src/lib/main.js`)
- **CLI Argument Parsing:**
  - Update the `parseCLIArgs` function to detect the `--diagnostics` flag, adding a new parameter (e.g. `diagnostics: false` by default).
  - Example:
    ```js
    case "--diagnostics":
      params.diagnostics = true;
      break;
    ```

- **Diagnostics Mode Execution:**
  - At the start of the `main` function, check if `params.diagnostics` is true. If so, bypass all plotting and CSV data logic.
  - Gather diagnostics information such as:
    - Node.js version via `process.version`
    - Operating system platform via `process.platform`
    - A snapshot of relevant environment variables (for example, those loaded from `.env` if available).
    - Optionally, read and parse `package.json` to list dependency versions.
  - Log the diagnostics information in a clear and structured format and exit the program gracefully.
  - Example snippet:
    ```js
    if (params.diagnostics) {
      console.log('Diagnostics Information:');
      console.log('Node.js Version:', process.version);
      console.log('Platform:', process.platform);
      console.log('Environment Variables:', {
        SVG_WIDTH: process.env.SVG_WIDTH,
        SVG_HEIGHT: process.env.SVG_HEIGHT,
        // add more as needed
      });
      process.exit(0);
    }
    ```

### Test File Update (`tests/unit/main.test.js`)
- Add tests to simulate the use of the `--diagnostics` flag:
  - Verify that when the flag is provided, the output contains the expected diagnostics information such as Node.js version and platform.
  - Ensure that no plotting or file I/O operations occur during diagnostics mode.

### Documentation Update (`README.md`)
- Add a new section under CLI options explaining the diagnostics mode:
  - Document that invoking the tool with `--diagnostics` will output diagnostic details instead of a plot.
  - Provide example output for user clarity.

### Dependencies Update (`package.json`)
- Confirm that all relevant dependencies (like `dotenv` for environment variable support) remain current.

## Impact and Benefits
- **Improved Debuggability:** Users can quickly obtain diagnostic information to troubleshoot configuration or runtime issues.
- **Transparency:** Clear output of Node.js version, platform, and environment settings helps users understand the state of their runtime environment.
- **User Empowerment:** Simplifies the process of verifying that the tool is properly installed and configured before attempting to generate plots.

This enhancement leverages modifications in the existing source, test, and documentation to deliver a valuable diagnostic tool for both end users and developers.