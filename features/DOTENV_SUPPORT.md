# DOTENV SUPPORT

This feature integrates dotenv configuration to allow the tool to automatically load environment variables from a .env file. It enhances user flexibility by enabling default configuration for CLI parameters. When no explicit CLI arguments are provided, the tool will check for environment variables to supply default values for the mathematical expression, range, and output file path. This is especially useful for automated environments and for users preferring configuration files over command-line flags.

## Implementation

- At the top of the main source file (src/lib/main.js), import the dotenv configuration with: import 'dotenv/config'. This ensures that the environment variables defined in a .env file will be loaded when the application starts.

- In the CLI main function, update the behavior so that if the required flags (--expression, --range, and --file) are not provided and if the corresponding environment variables (DEFAULT_EXPRESSION, DEFAULT_RANGE, DEFAULT_FILE) are set, then use these environment variables as the default arguments. This does not override provided CLI flags; defaults are used only when flags are absent.

- Update error handling to ensure that if neither CLI flags nor the corresponding environment variables are available for a required parameter, the existing error messages are retained.

- Update the README and documentation files (e.g. docs/USAGE.md) to include instructions on how to create a .env file with these default values. Provide examples such as:

  DEFAULT_EXPRESSION=y=sin(x)
  DEFAULT_RANGE=x=-1:1,y=-1:1
  DEFAULT_FILE=output.svg

## Testing

- Modify existing CLI test cases in the tests/unit/main.test.js file to include scenarios where no CLI flags are provided but the environment variables are set. Verify that the tool processes the .env defaults and generates the output file as expected.

- Ensure that the tests for CLI plot generation still work correctly when explicit CLI arguments are provided, so that the environment variables are only used when CLI parameters are missing.

## Impact

By adding dotenv support, users can configure default behavior without requiring all parameters on every run, thus simplifying repetitive tasks, fostering automation and making the CLI tool easier to integrate with deployment pipelines and development environments.