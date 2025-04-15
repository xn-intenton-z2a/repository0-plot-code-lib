# ENV_OVERRIDES Feature Update

This feature enhances the CLI behavior by enabling support for environment variable overrides. If required CLI parameters are not explicitly provided as command line flags, the application will attempt to load their defaults from a `.env` file using the `dotenv` package.

## Overview

- **Environment Loading:** On startup, the CLI will load environment variables from a `.env` file by invoking `dotenv.config()` at the very beginning of execution.
- **Default Parameter Overrides:** For key parameters (`--expression`, `–-range`, and `--file`), if the user omits these flags, the application will retrieve corresponding values from environment variables (`PLOT_EXPRESSION`, `PLOT_RANGE`, and `PLOT_FILE`). Command line arguments, if provided, will take precedence over environment variables.
- **Documentation and Testing:** Updated README and tests will describe and validate this additional behavior, ensuring a seamless developer experience.

## Implementation Details

### Source File (`src/lib/main.js`)

- **Load dotenv:** Add `import dotenv from 'dotenv';` and immediately call `dotenv.config();` at the top of the file.
- **Override Logic:** After parsing CLI arguments, check if any required parameters (`expression`, `range`, or `file`) are missing. If so, assign them from `process.env.PLOT_EXPRESSION`, `process.env.PLOT_RANGE`, and `process.env.PLOT_FILE` respectively.
- **Validation:** Ensure that once the parameters are set (either from CLI or environment), the existing validation using the `zod` schema is applied.

### Test File (`tests/unit/main.test.js`)

- **Additional Test Cases:** Include tests that simulate the absence of CLI flags by setting corresponding environment variables and then verifying that the application retrieves and uses these values for plotting.

### README File (`README.md`)

- **Update Documentation:** Enhance the CLI usage instructions to include a section describing how to use a `.env` file for providing default values. Include an example snippet:

```sh
# .env file example
PLOT_EXPRESSION=y=cos(x)
PLOT_RANGE=x=0:10,y=0:5
PLOT_FILE=output.svg
```

## Benefits

- **Usability:** Streamlines repetitive CLI usage by allowing default overrides via environment configuration.
- **Flexibility:** Enables easier testing and automation setups, as default parameters can be centrally configured in the environment.
- **Robustness:** Enhances the fallback mechanism ensuring that missing critical parameters are handled gracefully.

This update aligns with the mission of becoming the go-to plot library by making CLI usage more user-friendly and configurable.