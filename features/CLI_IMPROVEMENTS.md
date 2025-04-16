# CLI_IMPROVEMENTS Update

This update refines the CLI tool to not only support the version flag but also incorporate a help mode. The help mode provides users with a comprehensive overview of available CLI options. This enhancement improves user accessibility by offering clear guidance directly from the command line.

## Purpose
- **Version Flag:** Ensure the CLI outputs the current version immediately when invoked with `--version`.
- **Help Flag:** Display detailed usage information and flag descriptions when the CLI is invoked with `--help`.

## Implementation

### Source Code Changes (src/lib/main.js)

- **Version Flag:**
  - Retain the existing conditional branch that checks for `--version` and outputs the package version.

- **Help Flag:**
  - Add a new conditional branch early in the argument parsing logic to check for `--help`.
  - If the `--help` flag is provided, output a well-formatted multi-line help message which includes:
    - A brief description of the tool and its mission.
    - Detailed explanations for each CLI option, including `--expression`, `--range`, `--file`, `--samples`, `--diagnostics`, `--maintenance`, and `--version`.
    - Instructions to refer to the README.md for extended documentation.
  - Example implementation snippet:

  ```js
  if (options.help) {
    const helpText = `
Usage: node src/lib/main.js [options]

Options:
  --expression <expression>  Specify the mathematical expression to evaluate (prefix with 'y=' is allowed).
  --range <range>            Specify the range in the format x=min:max.
  --file <filename>          Generate a plot file (supports SVG and PNG).
  --samples <number>         (Optional) Number of sample points for time series data (default is 100).
  --diagnostics              Output diagnostic information in JSON format.
  --version                Output the current version and exit.
  --maintenance            Display maintenance issue error if open issues exist.
  --help                   Show this help message and exit.

For more information, please refer to the README.md file.
`;
    console.log(helpText);
    return;
  }
  ```

### Testing

- **Unit Tests (tests/unit/main.test.js):**
  - Add a test case to invoke the CLI with the `--help` flag.
  - Verify that the output contains key phrases such as "Usage:" and option descriptions for `--expression`, `--range`, etc.

  ```js
  describe("Help Flag", () => {
    test("should output help information containing usage instructions and options", () => {
      const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      main(["--help"]);
      const output = logSpy.mock.calls[0][0];
      expect(output).toContain("Usage:");
      expect(output).toContain("--expression");
      expect(output).toContain("--range");
      expect(output).toContain("--file");
      expect(output).toContain("--samples");
      expect(output).toContain("--diagnostics");
      expect(output).toContain("--version");
      expect(output).toContain("--maintenance");
      helpSpy.mockRestore();
    });
  });
  ```

### Documentation Updates (README.md)

- Add a new subsection under the CLI Usage section for the Help Option. Example:

  ```markdown
  ### Help Option

  To view detailed usage instructions and available options, run:

  ```bash
  node src/lib/main.js --help
  ```

  This command displays guidance on how to use the CLI tool, including descriptions of each flag.
  ```

## Consistency and Mission Alignment

- **Consistency:**
  - The help flag is processed early in the CLI flow to immediately provide guidance, preventing any further processing of other options.

- **Mission Alignment:**
  - By incorporating a help mode, the tool becomes more accessible and user-friendly, reinforcing our mission of being a go-to plot library with clear, transparent usage.
