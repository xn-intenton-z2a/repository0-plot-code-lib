# CLI_IMPROVEMENTS Update

This update enhances the CLI tool by expanding its diagnostic output modes. In addition to the already implemented `--diagnostics` flag, this update adds a new `--version` flag. When invoked with either flag, the CLI tool provides immediate feedback about the runtime environment.

## Version Flag

- **Purpose:**
  - When the CLI is invoked with the `--version` flag, the tool should output the package version (read from package.json or a hard-coded value) and exit immediately. This provides users with a quick way to verify the version of the tool in use.

- **Implementation Details:**
  - In `src/lib/main.js`, add a conditional check at the beginning of the argument parsing. If `options.version` is detected:
    - Retrieve the package version (e.g. from a hard-coded string or by requiring package.json).
    - Output the version as a plain string or JSON object.
    - Terminate execution immediately to avoid executing further logic.

Example snippet:
```js
if (options.version) {
  const pkgVersion = "1.2.0-0"; // Alternatively, require package.json to get the current version
  console.log(pkgVersion);
  return;
}
```

## Diagnostics Mode Reviewed

- **Diagnostics Mode:**
  - Remains as implemented with the `--diagnostics` flag. The mode outputs a JSON object containing key diagnostic details such as the package version and the Node.js runtime version.

- **Consistency Check:**
  - Both the `--diagnostics` and `--version` flags are designed to provide environment feedback without interfering with the main operations of the CLI.

## Testing Enhancements

- **Unit Tests:**
  - In `tests/unit/main.test.js`, add tests to ensure that:
    - Invoking the CLI with the `--version` flag outputs the correct version string.
    - The `--diagnostics` mode continues to function as expected.

Test outline for version flag:
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

## Documentation Updates

- **README.md:**
  - Update the CLI Usage section to include a new subsection for the Version Flag:

```markdown
### Version Flag

To retrieve the current version of the tool, run:

```bash
node src/lib/main.js --version
```

This command outputs the version number (e.g. `1.2.0-0`).
```

## Alignment with Mission & Contributing Guidelines

- **Mission Compliance:**
  - By providing immediate version feedback, this enhancement improves the tool’s usability and supports transparency with users, aligning with our mission of making `plot-code-lib` the go-to visualisation tool.

- **Contributing Guidelines:**
  - The update is confined to modifications in the source file, tests, and README.md, ensuring adherence to established coding, testing, and documentation standards.
