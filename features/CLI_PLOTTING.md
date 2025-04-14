# CLI_PLOTTING Enhancement with ENV Integration

## Overview

This update refines the CLI_PLOTTING feature by fully integrating environment variable support using a `.env` file. Users can now set default plotting configurations (such as SVG width, height, padding, points, etc.) via environment variables. The CLI arguments will continue to take precedence over environment variables, ensuring backward compatibility. This enhancement solidifies our mission by making the tool even more user-friendly and customizable.

## Implementation Details

- **Source File Update (`src/lib/main.js`):**
  - Import and initialize the `dotenv` library at the very top of the file to load environment variables from a `.env` file. For example:
    ```js
    import dotenv from 'dotenv';
    dotenv.config();
    ```
  - Update default parameter logic to fallback on `process.env` when CLI arguments are not provided. For example, replace:
    ```js
    const svgWidth = width || 500;
    ```
    with:
    ```js
    const svgWidth = width || (process.env.SVG_WIDTH ? parseInt(process.env.SVG_WIDTH, 10) : 500);
    ```
  - Add similar fallback logic for `height`, `padding`, `points`, and any other configurable parameter.
  - Include conditional logging to indicate when a parameter is derived from environment variables.

- **Test File Update (`tests/unit/main.test.js`):**
  - Add tests to simulate cases where environment variables are provided (and CLI arguments omitted) to ensure they are properly picked up and reflected in the output.

- **Documentation Update (`README.md`):**
  - Add a new section titled "Environment Variable Configuration" explaining how users can create a `.env` file with sample content:
    ```bash
    SVG_WIDTH=600
    SVG_HEIGHT=400
    SVG_PADDING=30
    SVG_POINTS=20
    ```
  - Clarify that environment variables serve as the fallback for default plotting parameters if CLI arguments are missing.

- **Dependencies Update (`package.json`):**
  - Ensure that the `dotenv` dependency (e.g., version ^16.4.7) is installed and referenced.

## Impact and Benefits

- **User Flexibility:** Users can configure default plotting parameters without needing to always supply them as command line arguments.
- **Backward Compatibility:** CLI arguments will continue to override environment variables if both are provided, ensuring existing behavior is maintained.
- **Enhanced Debuggability:** Clear logging informs users when environment variables are used, improving transparency.

By implementing this enhancement, the CLI_PLOTTING feature becomes more robust and user-friendly by leveraging standard environment configuration practices.
