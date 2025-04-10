# VERSION_INFO Feature Specification

## Overview
This feature introduces a simple version information display for the repository. The new CLI flag `--version` will allow users to retrieve the current version of the library as specified in the `package.json` file, along with optional metadata such as the library description. This addition enhances usability by making it easier to verify the installed version, ensuring compatibility and aiding in debugging or support queries.

## Implementation Details
### CLI Integration
- **New Flag:** Add a new CLI flag, `--version`, that when used, reads and displays the repository version and other relevant metadata from `package.json`.
- **Execution Flow:**
  - Detect the flag in the main CLI entry point (`src/lib/main.js`).
  - If the flag is present, read the `package.json` file to extract the version and description.
  - Display the information to the user and terminate the program without executing any further functionality.

### Code Considerations
- **Reading Package File:** Use Node's built-in `fs` module with proper error handling to safely read `package.json`.
- **Synchronous Operation:** For simplicity and based on the lightweight nature of the flag, synchronous file reading is acceptable.
- **Fallback Mechanism:** In case `package.json` cannot be read (e.g., missing file or permission issues), display a default version message.

## Testing and Documentation
### Testing
- **Unit Tests:** Write tests to simulate the invocation of the `--version` flag, ensuring that the output contains the correct version information as provided in `package.json`.
- **Integration Tests:** Ensure that when the flag is used, no other functionality is executed and that the process terminates gracefully.

### Documentation Updates
- **README.md:** Update the README to include usage examples of the new `--version` flag.
- **CONTRIBUTING.md:** Document the new flag in the CLI usage section and provide guidelines on how to update the version information in the repository.

## Usage Examples
- **Display Version:**
  - Command: `node src/lib/main.js --version`
  - Expected Output: `repository0-plot-code-lib version: 0.8.1-3` along with a short description from `package.json`.
