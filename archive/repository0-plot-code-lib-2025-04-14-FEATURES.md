features/CLI_PLOTTING.md
# features/CLI_PLOTTING.md
# CLI_PLOTTING Environment Variable Integration Update

This update refines the CLI plotting feature to fully integrate environment variable support for key parameters. The aim is to allow users to set default plotting configurations via a `.env` file while still preserving CLI argument overrides. This change enhances flexibility and makes usage simpler, aligning with our mission of providing a go-to plot library with both a user-friendly CLI and robust configuration options.

## Overview

- Integrate the `dotenv` package at the top of the main source file to initialize environment variables.
- Update key plotting parameters (SVG width, height, padding, and number of data points) to fallback to environment variables when no CLI argument is provided.
- Log informative messages when a parameter is provided via environment variable rather than via CLI argument.

## Implementation Details

1. **Environment Initialization:**
   - At the very beginning of `src/lib/main.js`, import and initialize the dotenv package:
     ```js
     import dotenv from 'dotenv';
     dotenv.config();
     ```

2. **Parameter Fallback Logic:**
   - Modify the assignments for plotting parameters to incorporate environment variables. For example:
     ```js
     const svgWidth = width || (process.env.SVG_WIDTH ? parseInt(process.env.SVG_WIDTH, 10) : 500);
     const svgHeight = height || (process.env.SVG_HEIGHT ? parseInt(process.env.SVG_HEIGHT, 10) : 300);
     const pad = padding || (process.env.SVG_PADDING ? parseInt(process.env.SVG_PADDING, 10) : 20);
     const numPoints = pointsArg || (process.env.SVG_POINTS ? parseInt(process.env.SVG_POINTS, 10) : 10);
     ```
   - Add logging to indicate when a fallback to an environment variable occurs. Example:
     ```js
     if (!width && process.env.SVG_WIDTH) {
       console.log(`Using environment SVG_WIDTH=${process.env.SVG_WIDTH}`);
     }
     ```

3. **Testing Adjustments:**
   - Update `tests/unit/main.test.js` to include test cases simulating scenarios where CLI parameters are omitted and environment variables are set. Verify that the fallback is correctly applied and that CLI arguments still take precedence.

## Documentation

1. **README.md:**
   - Add a new section titled "Environment Variable Configuration" explaining how to use a `.env` file to set default values for plot parameters. Provide example content:
     ```bash
     SVG_WIDTH=600
     SVG_HEIGHT=400
     SVG_PADDING=30
     SVG_POINTS=20
     ```
   - Emphasize that these defaults are only used if the corresponding CLI arguments are not provided.

2. **Dependencies:**
   - Ensure that `dotenv` remains listed in `package.json` under dependencies.

This refined integration ensures that the CLI tool is both flexible and easy to configure, meeting user expectations for environment-based configuration while preserving explicit command line overrides.features/CLI_DIAGNOSTICS.md
# features/CLI_DIAGNOSTICS.md
# CLI_DIAGNOSTICS Feature

## Overview

This feature adds a diagnostics mode to the CLI interface. When the user passes the `--diagnostics` flag, the application will bypass the regular plotting functionality and instead output key system and configuration details. This information includes Node.js version, dependency versions (as declared in package.json), environment variables, and other runtime diagnostic information. This feature supports easier debugging and verification of the installation and runtime environment, aligning with our mission of being a go-to plotting tool by providing transparent insights into the tool’s operation.

## Technical Changes

- **Argument Parsing:**
  - Update the argument parser in `src/lib/main.js` to recognize the `--diagnostics` flag.
  - If `--diagnostics` is detected, skip normal plotting logic and trigger diagnostics output.

- **Diagnostics Output:**
  - Collect and display relevant runtime information such as:
    - Node.js version (via `process.version`)
    - Current platform (via `process.platform`)
    - Versions of major dependencies (read from `package.json` if necessary, or hard code from the running environment)
    - Any other environment details that might assist with debugging
  - Use clear and concise console logging for output.

- **Code Organization:**
  - Encapsulate the diagnostics logic within its own section inside `src/lib/main.js` so that it remains maintainable.
  - Ensure that when diagnostics mode is active, the program exits gracefully after outputting the diagnostics information.

## Testing

- **Unit Tests:**
  - Update `tests/unit/main.test.js` to add tests that simulate the `--diagnostics` flag input and verify that the output contains expected diagnostic information (e.g., Node version, platform information).
  - Ensure tests verify that no plotting or file I/O occurs when diagnostics mode is active.

## Documentation

- **README Update:**
  - Update `README.md` to include a section about the diagnostics mode. Document how to invoke it using `--diagnostics` and describe the kind of information that will be output. 
  - Provide examples demonstrating the use of the diagnostics flag.

