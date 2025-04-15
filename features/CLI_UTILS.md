# CLI UTILITIES ENHANCEMENT UPDATE

This update refines the CLI utilities by adding two important improvements:

1. Integration of a new version flag (`--version`) that outputs the current application version as reported by `package.json`.
2. Adoption of environment variable overrides by leveraging the `dotenv` package, allowing default configuration of CLI parameters if they are omitted from the command line.

## Version Flag Functionality

- **Objective**: Allow users to quickly verify the current application version.
- **Implementation**:
  - Update the CLI entry point to check early for a `--version` flag.
  - On detection, the program reads the version string from `package.json`, prints it in the format `Version: x.y.z`, and exits immediately.

## Environment Variable Overrides

- **Objective**: Enhance configurability by allowing default CLI parameter values to be set through environment variables. This facilitates usage in different deployment environments by reducing the need for repetitive CLI parameter inputs.
- **Requirements**:
  - Use the already included `dotenv` dependency to load variables from a `.env` file if present. For example, variables like `PLOT_EXPRESSION`, `PLOT_RANGE`, and `PLOT_FILE` can serve as defaults for `--expression`, `--range`, and `--file` respectively.
  - Update the logic in `src/lib/main.js` so that if a parameter is not provided on the CLI, the program checks for its corresponding environment variable.
  - Ensure that explicit CLI parameters override any environment defaults.

## Test File Updates

- **File Affected**: `tests/unit/main.test.js`
  - Add new test cases to simulate the scenario where a required CLI argument is omitted but provided via environment variables.
  - Verify that the defaults loaded from the environment are correctly applied and that CLI parameters take precedence over environment values.

## README Updates

- **Documentation Changes**:
  - Update the CLI usage section to document the new environment variable override feature.
  - Include examples demonstrating how to create and use a `.env` file for default configuration, e.g.

    ```sh
    # .env file example
    PLOT_EXPRESSION=y=cos(x)
    PLOT_RANGE=x=0:10,y=0:5
    PLOT_FILE=output.svg
    ```

    Running the CLI without these parameters should now pick up defaults from the environment.

## Dependency and Code Integrity

- **Compatibility**: Ensure that the changes remain compatible with Node 20 and ECMAScript Module (ESM) standards.
- **Guidelines Compliance**: Follow the repository’s `CONTRIBUTING.md` for code quality and testing. The new functionality must be accompanied by appropriate unit tests and documentation updates.

## Benefits

- **Flexibility**: Users can now set up their environment with default parameters, making repeated CLI usage more convenient.
- **Enhanced User Experience**: Faster and more flexible configuration management by reading from environment variables where applicable.
- **Consistency**: Maintains all existing CLI features (help, diagnostics, plot generation, CSV export, etc.) while adding these improvements in a minimal and cohesive manner.
