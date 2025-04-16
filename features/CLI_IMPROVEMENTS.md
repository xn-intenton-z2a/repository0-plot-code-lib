# CLI_IMPROVEMENTS Update

This update refines the CLI tool by fully implementing the version flag functionality as outlined in our existing feature documentation. The update ensures that when a user invokes the CLI with `--version`, the tool immediately outputs the current package version and exits without processing additional arguments.

## Version Flag Implementation

- **Purpose:**
  - Allow users to quickly check the tool's version using the command `node src/lib/main.js --version`.
  - Improve usability and transparency, aligning with our mission statement.

- **Source Code Changes:**
  - In `src/lib/main.js`, add a conditional block at the beginning of the argument processing:

    ```js
    if (options.version) {
      // Hard-coded version from package.json or defined constant
      const pkgVersion = "1.2.0-0";
      console.log(pkgVersion);
      return;
    }
    ```

    This check should occur before any other processing of options to ensure an immediate response.

## Test Enhancements

- **Unit Tests:**
  - In `tests/unit/main.test.js`, add a test case to confirm that the version flag outputs the correct version and halts further processing:

    ```js
    describe("Version Flag", () => {
      test("should output the correct package version and exit immediately", () => {
        const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        main(["--version"]);
        expect(logSpy).toHaveBeenCalledWith("1.2.0-0");
        logSpy.mockRestore();
      });
    });
    ```

## Documentation Updates

- **README.md:**
  - Update the CLI Usage section to include usage of the `--version` flag:

    ```markdown
    ### Version Flag

    To check the current version of the tool, run:

    ```bash
    node src/lib/main.js --version
    ```

    This command outputs the version number (e.g., "1.2.0-0") and exits immediately.
    ```

## Consistency and Mission Alignment

- **Consistency:**
  - The version flag is prioritized and handled before any other CLI options, ensuring no interference with functionalities like maintenance alerts or plot generation.

- **Mission Alignment:**
  - By providing an immediate and transparent method for version checking, this update supports our mission of making the tool accessible and reliable.
