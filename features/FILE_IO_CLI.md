# FILE_IO_CLI

Summary
Implement a command line interface that accepts expression or CSV input and writes a plot file. The CLI infers output format from the file extension and supports a --help flag that prints usage examples.

Specification
- Supported flags: --expression STRING, --range start:step:end, --csv PATH, --file PATH, --help.
- Behavior: when --expression is provided, evaluate over the given range and produce the plot; when --csv is provided, load the CSV and produce the plot. The output format is inferred from the extension of --file (svg or png). Exit codes should be 0 on success and non-zero on failure.
- The --help output must include brief usage examples and exit immediately.

Acceptance criteria
- Running the CLI with --help prints usage text containing a short example and exits with code 0.
- Running the CLI with --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg produces an output file named output.svg (tests may simulate file writing).

Test plan
- Add tests/unit/cli.test.js that spawn the CLI or call the exported main function with mocked fs to verify help text and file output behavior.

Files to change
- src/lib/main.js: implement and export a CLI entry point and a main helper that can be invoked from tests.
- tests/unit/cli.test.js: unit tests as described.
