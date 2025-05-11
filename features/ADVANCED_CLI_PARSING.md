# Overview

Integrate a robust argument parsing framework to streamline and standardize CLI behavior, replace custom parsing logic, and provide built-in help, version, and error messaging. Ensure consistent handling of all flags and support of future subcommands.

# CLI Behavior

- repository0-plot-code-lib [options]
- -x, --expression <string>   Define a mathematical expression (for example "y=sin(x)")
- -r, --range <string>        Specify variable ranges in the form "x=min:max[:step]"
- -o, --output <path>         Write generated output (SVG/PNG or data) to the specified file
- -V, --version               Display version information and exit
- -h, --help                  Show help information for the command

Additionally, support future subcommands such as plot and export with consistent flag definitions.

# Implementation Details

1. Remove minimist dependency and import a dedicated CLI framework such as commander.
2. In src/lib/main.js:
   - Initialize a new Command instance.
   - Define options for expression, range, output, version, and help.
   - Parse process.argv and validate required options.
   - On parse errors, display user-friendly messages and exit with nonzero status.
   - Map parsed option values into a structured args object and pass to existing main logic.
3. Ensure exported main function remains compatible with library usage by accepting an options object.
4. Update package.json to add commander as a dependency and remove minimist if no longer used.

# Testing Requirements

- Create tests in tests/unit/cli-parsing.test.js:
  - Validate help output includes all defined options.
  - Verify version output matches package.json version.
  - Test parsing of single and combined flags, ensuring main receives the correct args object.
  - Simulate invalid flag usage to ensure proper error exit code and message.
- Achieve full coverage of parsing logic and error branches.

# Documentation

Update README.md with a dedicated CLI Reference section:

- Describe each option with its aliases and usage.
- Provide examples for generating a plot, exporting to a file, and displaying help or version.
- Show how to invoke future subcommands and mention extensibility.