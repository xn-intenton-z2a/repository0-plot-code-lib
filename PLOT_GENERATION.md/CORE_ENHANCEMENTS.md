# Overview
This feature consolidates two critical aspects of the CLI tool into one robust enhancement: improved error logging and comprehensive input validation. The error logging component ensures that all runtime errors are captured with timestamps and optionally written to a log file when the environment variable LOG_FILE is set. The input validation component leverages the Zod library to enforce strict constraints on command line arguments, ensuring that users supply the necessary inputs in the correct format. By merging these functionalities, the tool provides a more reliable and user-friendly experience while maintaining clarity in usage and troubleshooting.

# Implementation
Modifications will be made to the main source file (src/lib/main.js):
- Introduce a logError function that checks for the LOG_FILE environment variable and appends error messages with timestamps to the specified file.
- Enhance all error handling segments to call logError in addition to printing to the console.
- Update the parseArgs function to validate incoming arguments using a Zod schema, ensuring that:
  - The --expression flag is provided and non-empty.
  - The output format is strictly either 'svg' or 'png'.
  - When output format is png, the --file flag is mandated.

# Testing
The test file (tests/unit/main.test.js) will be updated with additional scenarios to simulate error conditions and invalid inputs. New tests will check that:
- Errors produce both console outputs and log file entries when LOG_FILE is set.
- The Zod schema correctly rejects malformed or missing parameters, and valid inputs are processed without error.

# Documentation
Relevant sections in the README.md and USAGE.md files will be amended to reflect the updated behavior. Documentation will include instructions on:
- Enabling error logging via the LOG_FILE environment variable.
- Guidelines on the required flags and allowed values for command line arguments, highlighting the role of input validation in preventing runtime errors.

This consolidated enhancement directly addresses the product mission by improving reliability and user guidance, aligning with the core functionality required to generate accurate and visually consistent plots.