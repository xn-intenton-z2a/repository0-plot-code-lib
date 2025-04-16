# CLI_IMPROVEMENTS Update

This update expands the CLI tool functionality by fully implementing the version flag in addition to the existing diagnostics and maintenance modes. The improvements are achieved by updating source file logic, expanding unit tests, and enhancing documentation. This adheres to our mission of transparency and ease of use for our visualisation tool.

## Version Flag Implementation

- **Purpose:**
  - The CLI tool now supports the `--version` flag. When invoked, it retrieves and outputs the current package version (e.g., "1.2.0-0") and terminates immediately. This gives users a quick method to verify the version of the tool in use.

- **Implementation Details:**
  - In `src/lib/main.js`, add a conditional check at the top of the argument parsing:
    ```js
    if (options.version) {
      const pkgVersion = "1.2.0-0"; // Alternatively, read from package.json
      console.log(pkgVersion);
      return;
    }
    ```
  - This check must be placed before processing any other options to ensure immediate exit upon invocation of the version flag.

## Testing Enhancements

- **Unit Tests:**
  - In `tests/unit/main.test.js`, include tests to cover the new `--version` flag functionality:
    ```js
    describe("Version Flag", () => {
      test("should output the correct package version", () => {
        const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        main(["--version"]);
        expect(logSpy).toHaveBeenCalledWith("1.2.0-0");
        logSpy.mockRestore();
      });
    });
    ```
  - This test ensures that the version flag outputs the correct version string and exits without processing further logic.

## Documentation Updates

- **README.md:**
  - Update the CLI Usage section to include details for the version flag:
    ```markdown
    ### Version Flag

    To check the current version of the tool, run:

    ```bash
    node src/lib/main.js --version
    ```

    This will output the version number (e.g. "1.2.0-0") and exit immediately.
    ```
  - These documentation updates guide users on how the version feature works and align with the overall CLI usage instructions.

## Consistency with Existing Features

- The version flag works alongside existing options like `--diagnostics` and `--maintenance`. The order of condition checks in `src/lib/main.js` is designed to ensure that the version flag is prioritised, thereby preventing further processing if `--version` is present.

## Alignment with Mission & Contributing Guidelines

- **Mission Compliance:**
  - Providing an immediate response when invoked with `--version` improves usability and transparency, in line with our mission of making the tool the go-to visualisation library.

- **Contributing Guidelines:**
  - This update is confined to modifications of source code, tests, and documentation, ensuring adherence to our coding, testing, and documentation standards.

This enhancement represents a focused, valuable iteration of the CLI tool, ensuring that all major functionalities are present and operate cohesively within a single repository.
