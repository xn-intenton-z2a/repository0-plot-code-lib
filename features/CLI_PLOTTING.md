# CLI_PLOTTING Environment Variable Integration

This update enhances the CLI plotting functionality by integrating environment variable support, allowing users to configure default plotting parameters without always providing CLI arguments. The update aligns with our mission of providing a user-friendly and flexible plotting tool.

## Overview

- Adds dotenv-based configuration that initializes environment variables from a `.env` file.
- Enables fallback to environment variables for key settings such as SVG width, height, padding, and number of data points if their corresponding CLI arguments are not supplied.
- Provides detailed logging to indicate when an environment variable is used instead of CLI input.

## Implementation Details

1. **Environment Initialization:**
   - Import the `dotenv` package and initialize it at the top of `src/lib/main.js`:
     ```js
     import dotenv from 'dotenv';
     dotenv.config();
     ```

2. **Parameter Resolution Update:**
   - Update the assignment of parameters to incorporate environment variables. For example:
     ```js
     const svgWidth = width || (process.env.SVG_WIDTH ? parseInt(process.env.SVG_WIDTH, 10) : 500);
     const svgHeight = height || (process.env.SVG_HEIGHT ? parseInt(process.env.SVG_HEIGHT, 10) : 300);
     const pad = padding || (process.env.SVG_PADDING ? parseInt(process.env.SVG_PADDING, 10) : 20);
     const numPoints = pointsArg || (process.env.SVG_POINTS ? parseInt(process.env.SVG_POINTS, 10) : 10);
     ```
   - Add logging to indicate when a setting is coming from an environment variable, for example:
     ```js
     if (!width && process.env.SVG_WIDTH) {
       console.log(`Using environment SVG_WIDTH=${process.env.SVG_WIDTH}`);
     }
     ```

3. **Source File Update:**
   - Modify `src/lib/main.js` to incorporate the above changes without altering its overall structure. This ensures seamless integration with existing plotting logic.

## Testing

- **Unit Tests:**
  - Extend `tests/unit/main.test.js` to simulate cases where CLI arguments are omitted, but environment variables are provided. The tests should verify that the application correctly falls back to the environment settings.
  - Confirm that if explicit CLI arguments are provided, they override the environment values.

## Documentation

- **README.md:**
  - Add a new section detailing how to use environment variables to set default plotting parameters. Include an example `.env` file content:
    ```bash
    SVG_WIDTH=600
    SVG_HEIGHT=400
    SVG_PADDING=30
    SVG_POINTS=20
    ```
  - Document that these environment variables are read at startup and used as fallbacks when the corresponding CLI options are not specified.

## Dependencies

- Ensure that the `dotenv` package is listed in `package.json` (it is already present).

This update not only simplifies configuration for end users but also enhances the flexibility of plot generation, aligning with our mission to be the go-to plot library with a robust and user-friendly CLI.