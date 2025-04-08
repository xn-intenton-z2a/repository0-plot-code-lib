# BATCH_MODE Feature Specification

## Overview
The BATCH_MODE feature enables users to automate plotting tasks by processing multiple plotting instructions from a single configuration file. This allows for batch execution of various commands such as advanced plotting, formula evaluation, diagnostics, and more. By supporting a JSON-based configuration file input, users can generate multiple plots in one run, increasing productivity and aligning with our mission to be the go-to library for formula visualisations.

## Description
- **Configuration File Input:** Accepts a JSON file containing an array of command objects. Each command specifies the type (e.g., advanced, formula) and the associated parameters.
- **Command Types:** Supports commands for advanced plotting, formula evaluation, diagnostics, and interactive wizard modes. Integrates seamlessly with the CORE_ENGINE and FORMULA_ENGINE features.
- **Error Handling:** Includes robust validations for file existence, proper JSON format, and validity of each command. Provides descriptive error messages for malformed or unsupported configurations.
- **Progress Reporting:** Logs progress during batch execution, summarising completed tasks and flagging errors to help users quickly identify issues.
- **Seamless Integration:** Leverages the existing CLI parsing logic to incorporate the --batch flag, ensuring a consistent user experience.

## Implementation Details
1. **Flag Detection:** Enhance the CLI parser to detect the `--batch` flag and read the provided file path.
2. **File Parsing and Validation:** Check if the configuration file exists; parse the JSON content and validate that it contains an array of valid command objects.
3. **Command Execution:** Iterate over the array, executing each command by delegating to the corresponding functionality in CORE_ENGINE or FORMULA_ENGINE.
4. **Logging and Summary:** Provide detailed logging of each step, and output a summary report upon completion indicating success and any errors encountered.
5. **Unit Tests and Documentation:** Update the test suite with tests covering valid and invalid batch configurations. Update README and CONTRIBUTING documents with usage examples and configuration file format details.

## Usage Examples
**CLI Usage:**
```bash
node src/lib/main.js --batch batch_config.json
```

**Example JSON Configuration (batch_config.json):**
```json
[
  { "command": "advanced", "plotType": "spiral", "params": "1,NaN,5,-10,10,1" },
  { "command": "formula", "formula": "sin(x) + cos(x)", "domain": [0, 10, 0.1] }
]
```

## Motivation and Value
- **Efficiency:** Simplifies repetitive plotting tasks by automating multiple commands through a single file input.
- **Improved User Experience:** Users can prepare and execute complex workflows in one go, reducing manual intervention.
- **Strategic Alignment:** Enhances our mission by expanding the tool's capabilities to handle a variety of formula visualisations in batch mode, making it a one-stop solution.
