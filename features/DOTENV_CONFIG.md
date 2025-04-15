# DOTENV_CONFIG Feature Enhancement

This feature consolidates and refines the environment variable override functionality into a single cohesive update. It ensures that the CLI tool loads configuration from a `.env` file using the `dotenv` package and provides fallback values for required CLI parameters. This update merges the functionality previously described in the CLI_UTILS, CLI_OVERRIDES, and ENV_OVERRIDES feature documents.

## Source File Updates

- At the very top of `src/lib/main.js`, import the `dotenv` package and invoke `dotenv.config()` to load environment variables.
- After parsing CLI arguments, check if key parameters (`--expression`, `--range`, `--file`) are missing. If any parameters are missing, assign their values from the corresponding environment variables (`PLOT_EXPRESSION`, `PLOT_RANGE`, `PLOT_FILE`).
- Ensure command-line provided parameters always take precedence over environment defaults.
- Preserve existing CLI argument validation with `zod` and ensure that the environment overrides integrate seamlessly with error handling and further processing.

## Test File Updates

- Update `tests/unit/main.test.js` to include test cases simulating the omission of required CLI arguments while setting the respective environment variables. Verify that when a CLI flag is missing, the application correctly picks up the default value from `process.env`.
- Ensure tests cover scenarios where both CLI arguments and environment variables are present (with CLI taking precedence) and when only environment variables are provided.

## README File Updates

- Update the CLI usage documentation in `README.md` to highlight that users can define default values in a `.env` file. Include an example snippet:

```sh
# .env file example
PLOT_EXPRESSION=y=cos(x)
PLOT_RANGE=x=0:10,y=0:5
PLOT_FILE=output.svg
```

- Explain that the CLI will use these defaults if the corresponding flags are omitted on the command line.

## Benefits

- **Flexibility:** Streamlines configuration for repetitive CLI usage by allowing default parameter configuration via environment variables.
- **Robustness:** Improves resilience by ensuring required parameters are sourced from the environment if missing from CLI input.
- **Maintainability:** Consolidates similar environment override features into a single coherent update, reducing duplication and simplifying future enhancements.
