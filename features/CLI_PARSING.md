# Overview

Introduce a structured, discoverable CLI using yargs to replace raw argument logging. Provide built-in help and version commands, while retaining programmatic access via main(args).

# Behavior

When invoked:
- `--help` or `-h` displays usage information and exits 0.
- `--version` or `-v` shows the package version and exits 0.
- Without flags, shows help and exits 0.
- The default command captures flags and passes parsed arguments to `main(parsedArgs)` without exiting.

Programmatic use:
- Calling `main(argsArray)` returns the parsed arguments object.

# Implementation

- Add `yargs` dependency in package.json.
- In `src/lib/main.js`:
  - Import yargs and `hideBin`.
  - Wrap existing `main(args)` export.
  - Configure `yargs(hideBin(process.argv))` with `.help()`, `.version()` and default command handler calling `main(argv)`.
  - Ensure exit codes: `0` for help/version, no error on main invocations.

# Tests

- In `tests/unit/main.yargs.test.js`:
  - Test `--help` and `-h` both exit 0 and stdout contains "Usage:".
  - Test `--version` exits 0 and outputs version matching package.json.
  - Test `main(['--expression','y=x','--range','x=0:1:1'])` returns expected parsed object.

# Documentation

- Update `README.md` with a `## CLI Usage` section showing help and version examples.
- Update `USAGE.md` to document how to invoke help and version flags, and reference programmatic use of `main()`.