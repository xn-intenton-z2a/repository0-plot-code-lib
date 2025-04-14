# CLI_PLOTTING

This feature update consolidates the plotting functionality with enhanced environment variable integration. By merging the previous ENV_INTEGRATION improvements into CLI_PLOTTING, the tool now supports seamless default parameter configuration via a `.env` file, while preserving the existing CLI argument logic.

## Overview

- **Objective:** Allow users to specify default plotting parameters (such as SVG width, height, padding, and number of data points) using environment variables through a `.env` file. CLI arguments will continue to take precedence in order to maintain backward compatibility.
- **Benefits:** Simplifies configuration for recurring usage and improves user experience by reducing repetitive argument declarations. Clear logging is provided when environment-derived values are used.
- **Alignment:** This update enhances our mission to be the go-to CLI plotting tool by offering flexibility and ease of customization.

## Implementation Details

1. **Source File Update (`src/lib/main.js`):**
   - Import `dotenv` at the top and initialize it to load default values from a `.env` file.
   - Update fallback logic for parameters (`width`, `height`, `padding`, `points`) to read from `process.env` if CLI arguments are not provided. For example:
     ```js
     const svgWidth = width || (process.env.SVG_WIDTH ? parseInt(process.env.SVG_WIDTH, 10) : 500);
     ```
   - Add conditional logging to indicate when environment variables are used for parameter defaults.

2. **Test Updates (`tests/unit/main.test.js`):**
   - Enhance tests to simulate scenarios where CLI arguments are omitted and environment variables are set. Ensure tests reset the environment between cases to avoid state leakage.

3. **Documentation Update (`README.md`):**
   - Add a new section titled "Environment Variable Configuration" that details how to set parameters in a `.env` file. Provide sample content such as:
     ```bash
     SVG_WIDTH=600
     SVG_HEIGHT=400
     SVG_PADDING=30
     SVG_POINTS=20
     ```
   - Explain that environment variables serve as fallback values when no corresponding CLI argument is provided.

4. **Dependencies (`package.json`):**
   - Ensure that the required `dotenv` dependency is included.

## Impact on Existing Functionality

- **Backward Compatibility:** Existing CLI argument usage remains unchanged. If a parameter is provided both via CLI and environment variable, the CLI value takes precedence.
- **User Feedback:** Console logs now provide clear feedback whenever a parameter is set using an environment variable.
- **Testing and Documentation:** Updates ensure that behavior is verified by unit tests and documented for user clarity.

This merge brings together the improvements from the ENV_INTEGRATION feature with the CLI_PLOTTING update, ensuring a cohesive and streamlined user experience.