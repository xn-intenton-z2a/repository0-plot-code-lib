# FILE_IO_CLI

Summary
Document the command line interface behavior implemented by handleCliArgs and the main entry point.

Specification
- Supported flags: --expression STRING, --range start:step:end, --csv PATH, --file PATH, --help, --version, --identity.
- Behavior: --help prints usage examples and returns; --expression with --range evaluates the expression over the range; --csv loads a CSV time series; output format is inferred from the --file extension (svg or png); files are written via savePlot.
- Error handling: missing required arguments or IO errors result in logged errors and thrown exceptions when unhandled by the caller.

Acceptance criteria
- Calling handleCliArgs with --help prints usage text containing at least one example and returns without throwing.
- Invoking the CLI with --expression y=Math.sin(x) --range -3.14:0.01:3.14 --file output.svg causes an output file named output.svg to be written (tests may use temporary paths).

Test plan
- tests/unit/cli.test.js should invoke handleCliArgs or main with mocked or temporary filesystem and assert printed help and file creation behavior.
