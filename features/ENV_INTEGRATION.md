# ENV_INTEGRATION

This update enhances the CLI plotting functionality by enabling environment variable integration. By supporting a `.env` file for setting default parameters, users can conveniently configure plotting options without having to supply them every time via the CLI.

## Overview

- **Objective:** Allow users to specify default parameters (SVG width, height, padding, number of points) via environment variables.
- **Benefits:** Simplifies configuration for recurring usage; environment variables act as fallback when CLI arguments are omitted.
- **Alignment:** Enhances usability under our mission to be the go-to plot library.

## Implementation Details

1. **Source File Update (`src/lib/main.js`):**
   - Import `dotenv` at the top of the file and initialize it to load environment variables:
     ```js
     import dotenv from 'dotenv';
     dotenv.config();
     ```
   - Update the fallback logic for plotting parameters. For instance, change:
     ```js
     const svgWidth = width || 500;
     ```
     to use environment variables if CLI arguments are not provided:
     ```js
     const svgWidth = width || (process.env.SVG_WIDTH ? parseInt(process.env.SVG_WIDTH, 10) : 500);
     ```
   - Repeat similar adjustments for `height`, `padding`, and `points`.
   - Add console logging indicating when environment variables are used, for example:
     ```js
     if (!width && process.env.SVG_WIDTH) {
       console.log(`Using environment SVG_WIDTH=${process.env.SVG_WIDTH}`);
     }
     ```

2. **Test Updates (`tests/unit/main.test.js`):**
   - Add tests that set environment variables before invoking the main function, then verify that these fallback values are applied when CLI arguments are missing.
   - Ensure tests clear/restore environment variables so as not to impact other tests.

3. **Documentation Update (`README.md`):**
   - Add a new section titled "Environment Variable Configuration".
   - Provide example content for a `.env` file:
     ```bash
     SVG_WIDTH=600
     SVG_HEIGHT=400
     SVG_PADDING=30
     SVG_POINTS=20
     ```
   - Explain that these values are used as defaults and are overridden by any explicitly provided CLI arguments.

4. **Dependencies (`package.json`):**
   - Verify that `dotenv` is listed as a dependency (it already is).

## Impact on Existing Functionality

- **Backward Compatibility:** Existing CLI argument usage remains unaffected; if a parameter is provided via CLI, it takes precedence over the environment variable.
- **User Feedback:** Console logs provide clear feedback when a parameter is being set from an environment variable.
- **Testing:** Unit tests are enhanced to ensure the new behavior is correctly executed.

Implementing the ENV_INTEGRATION update will streamline configuration management and enhance the flexibility of the CLI tool.