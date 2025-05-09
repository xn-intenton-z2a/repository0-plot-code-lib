# Overview

Add a new reseed subcommand to the CLI that restores source, test, documentation, and dependency files to their original seed state as defined in agent configuration. This enables maintainers and automation workflows to consistently reset the repository to a known baseline.

# CLI Commands

- `repository0-plot-code-lib reseed`
  - Restores all tracked files (source, tests, README, USAGE.md, package.json) to the seed versions specified in the agent configuration.
- `repository0-plot-code-lib reseed --dry-run`
  - Prints a list of files that would be replaced without making any changes.
- `repository0-plot-code-lib reseed --verbose`
  - Logs each file copy operation and its source and destination paths.

# Implementation

- Update `src/lib/main.js` to:
  - Parse the first CLI argument as a subcommand and recognize "reseed".
  - Accept `--dry-run` and `--verbose` flags, validated with zod.
  - Load the agent configuration file (AGENT_CONFIG_FILE) to read the mapping of seed file paths.
  - For each mapping entry, copy the seed file over the target file using Node fs/promises.
  - If `--dry-run` is set, skip file writes and log the planned actions.
  - Exit with code 0 on success and non-zero on error.
- Add any necessary dependencies (e.g., zod for validation, fs-extra or use built-in fs/promises).

# Testing

- Extend `tests/unit/main.test.js` or create a new `tests/unit/reseed.test.js` to verify:
  - Running `main(["reseed", "--dry-run"])` returns successfully without modifying the filesystem.
  - Running `main(["reseed"])` in a temporary directory copies seed files into place.
  - `--verbose` emits detailed logs.
  - Invalid flags or missing configuration produce clear error messages and non-zero exit codes.

# Documentation

- Update `USAGE.md` and `README.md` with:
  - A new "Reseed" section describing the command and its flags.
  - Example invocations demonstrating reset, dry-run, and verbose modes.
  - Clarify which files are managed by reseed based on agent configuration mapping.