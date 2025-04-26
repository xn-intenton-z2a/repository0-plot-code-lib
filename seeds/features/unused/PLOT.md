# PLOT Feature Enhancement

This update refines the PLOT feature by adding robust CLI argument parsing, parameter validation, and improved error handling. This ensures users receive clear guidance for command usage.

# CLI Argument Parsing & Validation

- Update `src/lib/main.js` to parse CLI arguments for the following parameters:
  - `--expression`: A mathematical expression string (e.g., "y=sin(x)").
  - `--range`: A range in the format "x=start:end,y=start:end". Validate the format using a robust library or custom regex ensuring both parts are present.
  - `--file`: A file path where the plot output (e.g., SVG) is confirmed to be generated.

- Implement clear error messages in cases of missing or improperly formatted parameters.

- Include a usage guide that is printed when the argument input is invalid or incomplete. This guide should illustrate the correct command usage:

```sh
node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg
```

# Test Enhancements

- Update `tests/unit/main.test.js` to include tests for:
  - Successful execution when valid parameters are passed.
  - Cases where one or more parameters are missing or badly formatted, ensuring the appropriate error message is produced.

# Documentation Updates

- Update the README.md to reflect the enhanced CLI usage, including updated examples and detailed explanation of parameter formats and error cases.

# Dependency and Code Integrity

- Ensure that all updates remain compatible with Node 20 and ESM standards.
- Leverage existing dependencies (e.g., zod) if needed for parameter validation.
- Confirm that changes remain compliant with `CONTRIBUTING.md` guidelines and minimal file modifications, affecting only source, tests, README, and package.json if necessary.

This enhancement consolidates the PLOT feature by providing a more resilient and user-friendly CLI interface, directly aligning with the mission to be the go-to plot library for formula visualisations.
