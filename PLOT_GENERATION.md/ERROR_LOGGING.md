# ERROR_LOGGING

## Overview
This feature introduces enhanced error logging for the CLI tool. In addition to outputting error messages to the console, error details will be logged to a file when the LOG_FILE environment variable is set. This improvement aims to help users and maintainers diagnose any issues more systematically and track error occurrences over time.

## Implementation
The main source file (src/lib/main.js) will be updated to include a new logError function. This function will check if the LOG_FILE environment variable is defined. If it is, the function will append each error message along with a timestamp to the file specified. All error messages already printed to the console will be passed to this logging function. Modifications will be made in all error handling code blocks to ensure consistency.

## Testing
The test file (tests/unit/main.test.js) will be enhanced with additional test cases that mimic error conditions and set the LOG_FILE environment variable. These tests will verify that an error message is both output to the console and written to the log file. The log file can subsequently be inspected to confirm the inclusion of the error details with the correct timestamp.

## Documentation
The README.md and USAGE.md files will be updated to include instructions on how to enable error logging by setting the LOG_FILE environment variable. Any examples provided will demonstrate how the error log is generated. This feature will ensure that users have clearer insights into errors and can more easily troubleshoot issues that occur during operation.
