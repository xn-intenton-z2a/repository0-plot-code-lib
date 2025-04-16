# CLI_IMPROVEMENTS Update

This update refines the CLI tool to enhance user guidance and troubleshooting by introducing an additional verbose mode. The verbose mode, activated by the `--verbose` flag, provides detailed logging throughout the execution process. This complements the existing help and diagnostic features by offering deeper insight into the tool's internal operations, making it easier to trace computation steps, debug issues, and verify processing stages.

## Overview

- **Purpose:**
  - Enhance CLI transparency and troubleshooting by logging detailed runtime operations.
  - Provide insights into option parsing, input validation, time series generation, and file-writing operations.
  - Improve the user experience and reliability in alignment with our mission of becoming the go-to plot library for formula visualisations.

## Implementation

### Source Code Changes (src/lib/main.js)

- **Verbose Flag Implementation:**
  - Parse a new CLI flag `--verbose` alongside existing options.
  - If `--verbose` is set, log detailed information such as:
    - The parsed options immediately after argument processing.
    - Key stages of the computation (e.g., before generating time series data, before writing output files, etc.).

  - Example code snippet:

  ```js
  // After parsing CLI options
  if (options.verbose) {
    console.log('Verbose Mode Activated: Parsed Options:', options);
  }

  // Continue with processing. Additional verbose logs can be added around critical operations:
  if (options.expression && options.range) {
    if (options.verbose) console.log('Starting plot or time series generation...');
    // ... existing plot generation or time series code
  }
  ```

### Testing (tests/unit/main.test.js)

- **New Test Cases for Verbose Mode:**
  - Add tests to confirm that when the `--verbose` flag is provided, the execution logs include detailed debug statements.
  - The test should spy on `console.log` and check for the expected verbose message, e.g., a message starting with "Verbose Mode Activated:".

  - Example test snippet:

  ```js
  describe("Verbose Mode", () => {
    test("should log detailed information when --verbose is provided", () => {
      const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--expression", "Math.sin(x)", "--range", "x=0:6.28", "--verbose"]);
      const firstLog = logSpy.mock.calls.find(call => call[0] && call[0].includes('Verbose Mode Activated'));
      expect(firstLog).toBeDefined();
      logSpy.mockRestore();
    });
  });
  ```

### Documentation Updates (README.md)

- **CLI Usage Section:**
  - Add a subsection detailing the verbose mode:

  ```markdown
  ### Verbose Mode

  To activate verbose mode and view detailed process logs, run:

  ```bash
  node src/lib/main.js --expression "Math.sin(x)" --range "x=0:6.28" --verbose
  ```

  When enabled, the CLI tool will output additional information about the executed operations, which is useful for debugging and tracing.
  ```

## Consistency and Mission Alignment

- This verbose mode enhances user experience by providing clear, detailed insights about internal processing, which reinforces our commitment to transparency and reliability in data visualization. 
- The feature integrates seamlessly with existing CLI improvements (help, diagnostics, and maintenance handling) to make the tool more accessible and informative.
