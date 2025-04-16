# CLI_IMPROVEMENTS Update

This update enhances the CLI tool by fully implementing the diagnostics mode as originally specified in our design guidelines. In addition to the existing help, maintenance, and plot generation functionalities, this update ensures that the CLI supports a new `--diagnostics` flag. When this flag is provided, the tool outputs a JSON object containing key diagnostic details, such as the package version and the Node.js runtime version.

## Overview

- **Diagnostics Mode:** When the CLI is invoked with the `--diagnostics` flag, the tool outputs a JSON object with diagnostic information and exits immediately. This assists users and developers in verifying the tool's environment settings quickly.
- **Existing Functionality Preservation:** The update maintains all prior behaviors for help display, maintenance issue detection, plot generation, and time series data generation.

## Source Code Changes

- In `src/lib/main.js`, add a new conditional block at the very beginning of the argument processing. This block should check for the presence of the `--diagnostics` flag before performing other operations. If detected:
  - Import or define the package version (from either a hard-coded value or by reading from package.json).
  - Retrieve the Node.js runtime version using `process.version`.
  - Output the diagnostic information as a valid JSON object and exit the program.

Example snippet:
```js
if (options.diagnostics) {
  const pkgVersion = "1.2.0-0"; // Alternatively, require package.json version if needed
  const diagnosticsInfo = {
    version: pkgVersion,
    nodeVersion: process.version
  };
  console.log(JSON.stringify(diagnosticsInfo));
  return;
}
```

## Testing Enhancements

- In `tests/unit/main.test.js`, add a new test case to ensure that invoking the CLI with the `--diagnostics` flag produces valid JSON output containing at least the keys `version` and `nodeVersion`.
- Confirm that this diagnostic mode does not interfere with existing test cases for plot generation, maintenance flag handling, and incomplete options.

Expected test outline:
```js
describe("Diagnostics Mode", () => {
  test("should output valid JSON with version and nodeVersion keys", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--diagnostics"]);
    const output = logSpy.mock.calls[0][0];
    let diagnostics;
    expect(() => { diagnostics = JSON.parse(output); }).not.toThrow();
    expect(diagnostics).toHaveProperty("version");
    expect(diagnostics).toHaveProperty("nodeVersion");
    logSpy.mockRestore();
  });
});
```

## Documentation Updates

- Update the `README.md` file under the CLI Usage section to include a new subsection for Diagnostics Mode.
- Document that running the command `node src/lib/main.js --diagnostics` will output a JSON object with diagnostic details.
- Provide an example invocation and expected output snippet.

Example update snippet:
```markdown
### Diagnostics Mode

To retrieve diagnostic information, run:

```bash
node src/lib/main.js --diagnostics
```

This command outputs a JSON object with fields such as `version` and `nodeVersion`.
```

## Alignment with Mission & Contributing Guidelines

- **Mission Compliance:** By providing immediate access to runtime diagnostics, this feature enhances debuggability and user support, aligning with our mission of making `plot-code-lib` the go-to visualisation tool.
- **Contributing Guidelines:** The update is confined to modifications in the source, tests, README, and dependency files as necessary. The changes adhere to the established code style and testing standards, ensuring backward compatibility and enhanced documentation.
