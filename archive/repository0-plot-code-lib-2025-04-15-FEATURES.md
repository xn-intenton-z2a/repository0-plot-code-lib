features/PLOT.md
# features/PLOT.md
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
features/CLI_UTILS.md
# features/CLI_UTILS.md
# CLI UTILITIES ENHANCEMENT Update

This update enhances the CLI utilities by implementing a new `--version` flag, while preserving the existing diagnostics and plotting functionality. The update provides a single point of truth for key runtime details including version display, diagnostics information, and plot generation.

## Overview

- **Version Information:** When the `--version` flag is provided, the CLI will read the version from `package.json` and output it immediately.
- **Diagnostics Mode:** Retains the existing `--diagnostics` flag that outputs runtime details including Node.js version, dependency confirmations, and environment information.
- **Plot Functionality:** Continues to support plotting with validated parameters, along with an optional `--evaluate` flag for time series data output.

## Implementation Details

### Source File (`src/lib/main.js`)

- Add a check for the `--version` flag before processing other CLI arguments. If present, import the version from `package.json` and log it.

Example snippet:
```js
if (parsedArgs.version) {
  import(pkgPath).then(pkg => {
    console.log(`Version: ${pkg.version}`);
    process.exit(0);
  }).catch(err => {
    console.error('Error reading version:', err);
    process.exit(1);
  });
  return;
}
```

- Ensure that the new flag does not interfere with the existing behavior for help, diagnostics, and plotting.

### Test File (`tests/unit/main.test.js`)

- Add tests to simulate CLI invocation with `--version`, confirming that the output starts with "Version: " and matches a semantic version pattern.

Example test case:
```js
import { main } from '@src/lib/main.js';

describe('Version Flag', () => {
  test('should display version when --version is passed', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    // Ensure to simulate asynchronous behavior if necessary
    await main(['--version']);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/^Version: \d+\.\d+\.\d+/));
    consoleSpy.mockRestore();
  });
});
```

### README Updates (`README.md`)

- Document the new `--version` flag in the CLI usage section:
  - Explain that running `node src/lib/main.js --version` will output the application version as defined in `package.json`.
  - Provide an example snippet demonstrating the new flag usage.

Example documentation update:
```sh
node src/lib/main.js --version
# Output: Version: x.y.z
```

## Benefits

- **Quick Version Verification:** Users and developers can easily check which version of the application is running, aiding in debugging and version control.
- **Unified CLI Enhancements:** Consolidating diagnostics and version information streamlines the user interface and simplifies maintenance.
- **Improved Transparency:** The immediate availability of version data builds trust and assurance that the correct release is in use.
