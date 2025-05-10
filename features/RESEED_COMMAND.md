# Reseed Command

Introduce a reseed subcommand in the CLI to plan or perform a reset of core repository files to their initial seed state. This iteration supports a dry run mode to list which files would be overwritten, without modifying any files.

# Behaviour

When the first argument is "reseed" is provided:
- If the --dry-run flag is present, the tool lists each target file that would be reset.
- Future iterations will honor a --force flag to actually overwrite files with embedded seed content.
- If neither flag is provided, the tool prints a summary hinting at available modes.

# Command Line Interface

repository0-plot-code-lib reseed --dry-run

Flags:
  --dry-run    Show the list of files that would be reset without performing writes.
  --force      (Planned) Overwrite each target file with its initial seed version.

# Examples

Calling the tool in dry-run mode should output lines such as:
  Would reset README.md
  Would reset MISSION.md
  Would reset src/lib/main.js
  Would reset tests/unit/main.test.js
  Would reset tests/unit/plot-generation.test.js
  Would reset package.json

# Testing

Add or update a unit test to invoke main with arguments ["reseed","--dry-run"] and assert that console output contains the list of target file names. Ensure tests mock console.log to capture messages and verify each expected line appears.
