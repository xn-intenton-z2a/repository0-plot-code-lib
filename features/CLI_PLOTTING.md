# CLI_PLOTTING Environment Integration

This update enhances the existing CLI_PLOTTING feature by integrating robust support for environment variable configuration using the `dotenv` package. When CLI arguments are absent, the application will attempt to source default values from a `.env` file. This improvement supports better user configurability and aligns with the mission to provide a seamless plotting experience.

## Environment Variable Loading

- **Initialization:**
  - At the very beginning of `src/lib/main.js`, import the `dotenv` package and call `dotenv.config()`.
  - Example:
    ```js
    import dotenv from 'dotenv';
    dotenv.config();
    ```

- **Parameter Resolution:**
  - For parameters such as `width`, `height`, `padding`, and `points`, check if the corresponding CLI argument is provided. If not, attempt to read the default value from environment variables:
    - `SVG_WIDTH` for the width
    - `SVG_HEIGHT` for the height
    - `SVG_PADDING` for the padding
    - `SVG_POINTS` for the number of data points
  - The fallback code should parse the environmental variable (if exists) to an integer. If neither is provided, fallback to the hard-coded defaults (e.g., 500 for width, 300 for height, etc.).
  - Example update:
    ```js
    const svgWidth = widthArg || (process.env.SVG_WIDTH ? parseInt(process.env.SVG_WIDTH, 10) : 500);
    ```

- **Logging:**
  - Add console logging to indicate when a default value is taken from an environment variable. For example:
    ```js
    if (!widthArg && process.env.SVG_WIDTH) {
      console.log(`Using environment SVG_WIDTH=${process.env.SVG_WIDTH}`);
    }
    ```

## Integration Points

- **Source File (`src/lib/main.js`):**
  - Begin with environment variable initialization.
  - Update parameter assignments to incorporate environment variable checks for `width`, `height`, `padding`, and `points`.

- **Test File (`tests/unit/main.test.js`):**
  - Extend tests to simulate scenarios with environment variables. Ensure that when CLI parameters are absent, the code correctly falls back to environment defaults. Also verify that CLI inputs override .env settings.

- **Documentation (`README.md`):**
  - Update the README with a new section explaining environment variable usage. Provide examples of a `.env` file with:
    ```bash
    SVG_WIDTH=600
    SVG_HEIGHT=400
    SVG_PADDING=30
    SVG_POINTS=20
    ```

- **Dependencies (`package.json`):**
  - Confirm that `dotenv` is listed among dependencies to enable the feature.

## How to Test

1. Create a `.env` file in the repository root with custom default values for SVG_WIDTH, SVG_HEIGHT, SVG_PADDING, and SVG_POINTS.
2. Run the CLI without specifying the respective parameters and verify that the output now uses the environment-sourced values (observe console logs).
3. Run the CLI with explicit CLI parameters to verify they take precedence over environment values.
4. Update and run unit tests to cover these new scenarios.

This feature upgrade is focused and achievable within a single repository update, ensuring that the plot generation experience becomes more flexible and user-friendly.
