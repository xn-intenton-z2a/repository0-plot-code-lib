# CLI_PLOTTING Enhancement with ENV Integration

## Overview
This update refines the CLI_PLOTTING feature by fully integrating support for environment variable configuration via a `.env` file. In addition to accepting CLI arguments, the tool now reads default plotting parameters such as SVG width, height, padding, and data points from environment variables. These environment values serve as fallbacks when corresponding CLI arguments are absent, ensuring a more flexible and user-friendly experience without breaking backward compatibility.

## Implementation Details

### Source File (`src/lib/main.js`)
- **Environment Variable Loading:**
  - Import the `dotenv` library by adding `import dotenv from 'dotenv';` at the top of the file and initialize it with `dotenv.config();` to automatically load variables from a `.env` file.

- **Default Parameter Logic:**
  - For each configurable parameter, update the default assignment. For example, replace:
    ```js
    const svgWidth = width || 500;
    ```
    with:
    ```js
    const svgWidth = width || (process.env.SVG_WIDTH ? parseInt(process.env.SVG_WIDTH, 10) : 500);
    ```
  - Apply similar fallback logic for parameters like `svgHeight`, `padding`, and number of `points`.

- **Conditional Logging:**
  - Optionally add logging statements (when in a debug mode) to indicate when a parameter is being sourced from an environment variable.

### Test File (`tests/unit/main.test.js`)
- **Environment Variable Simulation:**
  - Enhance tests to simulate cases where certain environment variables are set, ensuring that if CLI arguments are omitted, the parameters are correctly derived from the environment.

### README Update (`README.md`)
- **Documentation Update:**
  - Add a section titled "Environment Variable Configuration" that explains how to create a `.env` file with keys such as `SVG_WIDTH`, `SVG_HEIGHT`, `SVG_PADDING`, and `SVG_POINTS`.

### Dependencies File (`package.json`)
- Ensure the `dotenv` dependency is referenced (e.g., version `^16.4.7`), confirming that the project can properly load and parse environment variables.

## Impact and Benefits
- **Increased Flexibility:** Users can now configure their plotting defaults without needing to provide all parameters as CLI arguments every time.
- **Backward Compatibility:** CLI options will always override environment variables, so existing usage remains unaffected.
- **Enhanced Debuggability:** With optional logging, users can easily determine whether a parameter was set via the CLI or the environment, aiding troubleshooting.

This improved integration supports our mission of being the "go-to plot library with a CLI" by adding a layer of configurability and customization that is easily accessible and clearly documented.
