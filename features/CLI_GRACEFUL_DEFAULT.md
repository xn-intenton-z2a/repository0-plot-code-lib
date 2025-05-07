# Overview

This feature enhances the CLI tool to provide a graceful default invocation and help interface when required parameters are missing or when users explicitly request assistance. Instead of exiting with an error on missing arguments, the CLI will display a concise usage message and exit with code 0.

# CLI Interface

--help, -h : Display usage information and exit with status code 0.  No other flags are processed when help is requested.

# Behavior

1. If the user supplies --help or -h, the CLI prints the usage help text to standard output and exits with code 0.
2. If the CLI is invoked with no arguments or with missing required flags (--expression or --range), it prints the same usage help text to standard output and exits with code 0, avoiding a non-zero error state.
3. When both --expression and --range are provided, the CLI proceeds with existing time series generation logic.

# Tests

- Create tests/unit/main-help.test.js:
  • Test that invoking main with [] arguments prints the help text and returns an empty array or does not throw.
  • Test that invoking main with ["--help"] or ["-h"] prints the help text and returns an empty array or does not throw.
  • Spy on console.log to capture help output and verify it includes the usage examples from USAGE.md.

# Documentation Updates

- In USAGE.md, add a section "Help and Default Invocation" describing the --help and default behavior with example output.
- In README.md, under Examples, show how to invoke the CLI with --help and demonstrate the printed usage message.