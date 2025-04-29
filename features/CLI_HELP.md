# Overview
This feature introduces robust CLI help and version functionality into the plot library. Users can now invoke the application with a --help flag to display comprehensive usage instructions, and a --version flag to output the current version. This change enhances user experience by providing immediate, clear guidance on how to use the CLI options and by aligning with common CLI application standards.

# Implementation
- Update the main source file to parse and recognize the "--help" and "--version" flags. When either flag is detected, print an informative help message or the version extracted from package.json, then exit gracefully.
- Incorporate help text that covers all major CLI flags, including those for expression input, range, file type, configuration file, and additional custom styling options.
- Add version output which retrieves the version number from the dependencies file, ensuring consistency with the repository version.
- Enhance existing unit tests (in tests/unit/main.test.js and tests/unit/configManagement.test.js) to verify that the help and version flags return the correct output.
- Update the README and USAGE documentation files to include examples of using the --help and --version flags.

# Impact
- Increases user-friendliness by providing an immediate way to understand and explore the available CLI options.
- Reduces user errors by offering quick reference documentation directly from the command line, helping users to correctly format expressions and ranges.
- Supports the mission by reinforcing the library’s goal to be the go-to tool for formula visualization via its clear and comprehensive CLI interactions.