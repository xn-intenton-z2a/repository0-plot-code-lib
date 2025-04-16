# CLI_IMPROVEMENTS Update

This update refines the CLI tool by augmenting the existing verbose mode with a new help mode. The new help mode is activated by the `--help` flag and displays comprehensive usage instructions extracted from the README. This ensures that users have immediate, in-context guidance on how to use the CLI tool, bolstering the mission to be accessible and transparent.

## Overview

- **Purpose:**
  - Provide immediate, clear guidance via a help mode when users invoke the CLI with the `--help` flag.
  - Enhance user troubleshooting by integrating both verbose operational logging (via `--verbose`) and detailed help instructions.
  - Ensure the CLI remains simple yet self-documenting, reinforcing our mission of accessibility and reliability.

## Implementation

### Source Code Changes (src/lib/main.js)

- **Help Mode Implementation:**
  - Parse a new `--help` flag in the CLI argument parser.
  - When `--help` is detected, output comprehensive usage information. This can be a static string containing usage examples, options, and a summary of operations extracted from the README’s CLI Usage section.
  - Ensure that the help information is printed before any other processing.

  ```js
  // Check for help flag early in the argument parsing
  if (options.help) {
    console.log(`Usage: node src/lib/main.js [options]\n\nOptions:\n  --expression <expression>   Mathematical expression to evaluate\n  --range <range>             Range in the format x=min:max\n  --file <file>               Output file for plot generation (SVG/PNG)\n  --samples <number>          (Optional) Number of sample points (default: 100)\n  --verbose                   Show detailed operational logs\n  --diagnostics               Output diagnostics information in JSON format\n  --maintenance               Show maintenance issues error\n  --help                    Show this help message\n\nExamples:\n  node src/lib/main.js --expression "Math.sin(x)" --range "x=0:6.28"\n  node src/lib/main.js --expression "y=cos(x)" --range "x=-1:1" --file output.svg\n`);
    return;
  }
  ```

- **Retain Existing Features:**
  - Ensure the existing parsing for `--verbose`, `--diagnostics`, and other flags remains intact.

### Testing (tests/unit/main.test.js)

- **New Test Cases for Help Mode:**
  - Add test(s) to confirm that when `--help` is provided, the CLI outputs the expected help content.

  ```js
  describe("Help Mode", () => {
    test("should display usage instructions when --help is provided", () => {
      const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--help"]);
      const output = logSpy.mock.calls[0][0];
      expect(output).toContain("Usage: node src/lib/main.js");
      expect(output).toContain("--expression");
      expect(output).toContain("--range");
      expect(output).toContain("--file");
      logSpy.mockRestore();
    });
  });
  ```

### Documentation Updates (README.md)

- **CLI Usage Section:**
  - Add or update a subsection to describe the new help mode:

  ```markdown
  ### Help Mode

  To view complete usage instructions and options, run:

  ```bash
  node src/lib/main.js --help
  ```

  This will output detailed information on all available CLI flags and examples on how to use them.
  ```

## Consistency and Mission Alignment

- The addition of a help mode reinforces our mission to make the CLI tool accessible and self-explanatory.
- By integrating concise, built-in usage instructions, users can troubleshoot and explore the tool without needing to search external documentation.
- This update complements the verbose mode and diagnostics feature to make the CLI a robust, user-friendly interface for formula visualisations.
