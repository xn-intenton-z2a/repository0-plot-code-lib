# CLI_PLOTTING Environment Variable Integration Update

This update expands the existing CLI plotting feature to fully integrate environment variable support. By loading configuration values from a `.env` file, users can set default values for key plotting parameters (SVG width, height, padding, and the number of data points) without specifying them on the command line every time. CLI arguments continue to take precedence over environment variables.

## Overview

- **Objective:** Enhance flexibility and simplify configuration by allowing default plotting parameters to be specified in a `.env` file.
- **Alignment with Mission:** This update further solidifies our tool as the go-to plotting library by improving usability and configurability.

## Implementation Details

1. **Environment Initialization:**
   - Add dependency initialization at the very top of `src/lib/main.js` by importing `dotenv` and calling `dotenv.config()`. This ensures that all environment variables are loaded before any plotting logic is executed.
   - Example:
     ```js
     import dotenv from 'dotenv';
     dotenv.config();
     ```

2. **Parameter Fallback Logic:**
   - Update the default values for plotting parameters in the main execution function. For each parameter (`width`, `height`, `padding`, `points`), check for a corresponding environment variable if the CLI argument is not provided:
     ```js
     const svgWidth = width || (process.env.SVG_WIDTH ? parseInt(process.env.SVG_WIDTH, 10) : 500);
     const svgHeight = height || (process.env.SVG_HEIGHT ? parseInt(process.env.SVG_HEIGHT, 10) : 300);
     const pad = padding || (process.env.SVG_PADDING ? parseInt(process.env.SVG_PADDING, 10) : 20);
     const numPoints = pointsArg || (process.env.SVG_POINTS ? parseInt(process.env.SVG_POINTS, 10) : 10);
     ```
   - Add logging messages to indicate when a fallback to an environment variable is used. For example:
     ```js
     if (!width && process.env.SVG_WIDTH) {
       console.log(`Using environment SVG_WIDTH=${process.env.SVG_WIDTH}`);
     }
     ```

3. **Testing Adjustments:**
   - Enhance `tests/unit/main.test.js` by incorporating cases that simulate missing CLI arguments while environment variables are set. Verify that the fallback values are correctly applied and logged.

4. **Documentation Updates:**
   - Update `README.md` to include a new section titled "Environment Variable Configuration". Provide example `.env` content:
     ```bash
     SVG_WIDTH=600
     SVG_HEIGHT=400
     SVG_PADDING=30
     SVG_POINTS=20
     ```
   - Explain that these values are used only when corresponding CLI arguments are not provided.

5. **Dependencies:**
   - Ensure that the `dotenv` package remains listed in `package.json` under dependencies.

## Impact on Existing Functionality

- **Backward Compatibility:** Existing CLI argument usage is not affected. If both an environment variable and a CLI argument are provided for a parameter, the CLI argument takes precedence.
- **Error Reporting:** If environment variables are used, clear logging messages help users understand which values are being applied.

This update is achievable within a single repository and respects the current project guidelines for file modifications (source file, tests, README, and dependencies).
