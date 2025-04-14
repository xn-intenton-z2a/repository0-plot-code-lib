# CLI_PLOTTING Environment Variable Integration

This update refines the CLI_PLOTTING feature to further enhance user configurability by integrating environment variable support using the `dotenv` package. With this update, key plotting parameters such as SVG dimensions, padding, and the number of data points can be set via environment variables. When CLI arguments are absent, the application will fall back to default values provided in the environment, accompanied by informative logging.

## Implementation Details

- **Environment Initialization:**
  - Import and initialize the `dotenv` package at the very start of the source file (`src/lib/main.js`) using:
    ```js
    import dotenv from 'dotenv';
    dotenv.config();
    ```

- **Parameter Resolution:**
  - Update the assignment for parameters like `width`, `height`, `padding`, and `points` to check for the corresponding environment variables if the CLI argument is missing. For example:
    ```js
    const svgWidth = widthArg || (process.env.SVG_WIDTH ? parseInt(process.env.SVG_WIDTH, 10) : 500);
    const svgHeight = heightArg || (process.env.SVG_HEIGHT ? parseInt(process.env.SVG_HEIGHT, 10) : 300);
    const padding = paddingArg || (process.env.SVG_PADDING ? parseInt(process.env.SVG_PADDING, 10) : 20);
    const numPoints = pointsArg || (process.env.SVG_POINTS ? parseInt(process.env.SVG_POINTS, 10) : 10);
    ```
  - Add console logging to indicate when a value is sourced from the environment. For instance:
    ```js
    if (!widthArg && process.env.SVG_WIDTH) {
      console.log(`Using environment SVG_WIDTH=${process.env.SVG_WIDTH}`);
    }
    ```

## Testing

- **Unit Tests:**
  - Extend tests in `tests/unit/main.test.js` to simulate scenarios where environment variables are provided. Verify that when CLI parameters are omitted, the system uses the environment variable values.
  - Confirm that explicit CLI arguments always override environment settings.

## Documentation

- **README.md:**
  - Update the README with a new section describing the usage of environment variables. Provide an example `.env` file:
    ```bash
    SVG_WIDTH=600
    SVG_HEIGHT=400
    SVG_PADDING=30
    SVG_POINTS=20
    ```
  - Document that users can now configure plotting defaults through the `.env` file in the repository root.

## Dependencies

- Ensure that `dotenv` is listed in the dependencies (as already present in `package.json`).

This update aligns with the mission of creating a flexible and user-friendly plotting tool, allowing both CLI and environment-based configurations in a single repository update.