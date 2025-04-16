# CLI_IMPROVEMENTS

This feature consolidates and enhances the CLI functionality by merging the existing help and CLI enhancements into a unified, robust CLI tool. In addition, the feature introduces a new diagnostics mode to provide runtime and version information. This update ensures that all CLI interactions — help, maintenance warnings, and diagnostics — adhere to our mission of making the tool accessible and informative.

## Overview

- **Help:** Continue to support the `--help` flag by displaying usage information and examples.
- **Maintenance:** Retain the existing check for the `--maintenance` flag which prevents new maintenance issues when open issues exist.
- **Diagnostics:** Introduce a new `--diagnostics` flag which, when invoked, outputs diagnostic information in JSON format. This information includes the current package version and the Node.js runtime version.

## Source Code Changes

- In `src/lib/main.js`:
  - Merge functionality from the previous CLI help and CLI enhancement features into one unified section.
  - Before processing other options, check for the `--diagnostics` flag. If present, output diagnostic information. For example:
    ```js
    if (options.diagnostics) {
      const pkgVersion = "1.2.0-0"; // This could be imported from package.json if needed
      const diagnosticsInfo = {
        version: pkgVersion,
        nodeVersion: process.version
      };
      console.log(JSON.stringify(diagnosticsInfo));
      return;
    }
    ```
  - Ensure that the check for `--help` and `--maintenance` remains, but now under the consolidated CLI improvements block.

## Testing Enhancements

- In `tests/unit/main.test.js`:
  - Update existing test cases to confirm that help and maintenance functionalities remain unchanged.
  - Add a new test case that verifies when the CLI is invoked with `--diagnostics`, the output is valid JSON containing at least the `version` and `nodeVersion` keys. For example:
    ```js
    test("should output diagnostics info when --diagnostics flag is provided", () => {
      const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--diagnostics"]);
      const output = logSpy.mock.calls[0][0];
      let diagnostics;
      expect(() => { diagnostics = JSON.parse(output); }).not.toThrow();
      expect(diagnostics).toHaveProperty("version");
      expect(diagnostics).toHaveProperty("nodeVersion");
      logSpy.mockRestore();
    });
    ```

## Documentation Updates

- In `README.md`:
  - Under the CLI Usage section, add a new subsection for Diagnostics Mode:
    - Explain that running the tool with `--diagnostics` will output JSON-formatted diagnostic information.
    - Provide an example command:
      ```bash
      node src/lib/main.js --diagnostics
      ```
      and describe the expected JSON output.

## Alignment with Mission & Contributing Guidelines

- **Mission Compliance:** Enhancing CLI accessibility with consolidated help, maintenance, and diagnostics functionalities supports our mission to be the go-to plot library with a user-friendly CLI.
- **Contributing Guidelines:** All changes are confined to existing repository files (source, tests, README, and dependencies). The feature follows established coding standards and includes thorough test coverage and documentation.
