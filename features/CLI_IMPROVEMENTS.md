# CLI_IMPROVEMENTS Update with VERBOSE Logging

This update extends the existing CLI_IMPROVEMENTS feature to include a detailed verbose logging mode. In addition to the help mode and diagnostics already present, the CLI tool will now emit detailed operational logs when the `--verbose` flag is supplied. This is aimed at improving the transparency of the tool’s internal operations and providing easier troubleshooting for both plot generation and time series data processing.

## Overview

- **Purpose:**
  - Enhance user understanding of internal execution flow.
  - Log key steps during input parsing, expression evaluation, sample generation, and file output operations.
  - Provide immediate feedback on operations to aid in debugging and performance analysis.

## Implementation

### Source Code Changes (src/lib/main.js)

- Insert a new check for the `--verbose` flag after processing the help and diagnostics flags. When enabled, print log messages at significant steps:
  - Log initial options and arguments received.
  - Log the start of expression evaluation and sample count determination.
  - Log before starting time series generation, and after completing it.
  - For file generation, log the file type detected and the initiation of file writing, followed by a success message.

Example snippet:

```js
if (options.verbose) {
  console.log('Verbose Mode: Starting processing with options:', options);
}

// Example before time series generation:
if (options.expression && options.range && !options.file) {
  if (options.verbose) console.log('Verbose Mode: Evaluating expression and preparing time series generation');
  // ... generate series ...
  if (options.verbose) console.log('Verbose Mode: Time series generation completed with', n, 'samples');
}

// Similarly, add logs around file generation steps
```

### Test File Updates (tests/unit/main.test.js)

- Add a new test case verifying that when `--verbose` is provided, the output includes verbose log messages. Use a spy on `console.log` to assert that expected log messages such as "Starting processing" or "Time series generation completed" appear.

Example test snippet:

```js
describe("Verbose Logging", () => {
  test("should output detailed logs when --verbose flag is provided", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    main(["--expression", "Math.sin(x)", "--range", "x=0:6.28", "--verbose"]);
    const logs = logSpy.mock.calls.map(call => call[0]);
    expect(logs.join(' ')).toContain('Verbose Mode: Starting processing');
    expect(logs.join(' ')).toContain('Time series generation completed');
    logSpy.mockRestore();
  });
});
```

### Documentation Updates (README.md)

- Update the CLI Usage section to include a description of the `--verbose` flag:

```markdown
### Verbose Logging Mode

When running the CLI tool with the `--verbose` flag, additional details about the internal processing steps are logged to the console. This includes information on argument parsing, expression evaluation, time series generation progress, and file writing status.

Example:

```bash
node src/lib/main.js --expression "Math.sin(x)" --range "x=0:6.28" --verbose
```
```

## Consistency and Mission Alignment

- This enhancement further aligns with our mission of making the tool accessible and transparent. Detailed logging aids developers and users alike in understanding the operational flow, thus reinforcing trust and reliability in the tool's performance.
