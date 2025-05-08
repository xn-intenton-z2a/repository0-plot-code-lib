# Agent Configuration Sync

## Overview

Add a `sync-config` subcommand to the CLI to read, validate, and summarize the agent configuration YAML.

## Behavior

When the CLI is invoked with `sync-config`:

- It accepts an optional `--config <path>` argument (default `agent-config.yaml`).
- Reads the YAML file, parsing:
  - `schedule`: string identifying the agentic-lib workflow schedule.
  - `paths`: mapping of symbolic keys to file path entries with optional `permissions` and `limit`.
- Validates the parsed object against a Zod schema to ensure:
  - `schedule` is a nonempty string.
  - `paths` is an object whose values include required `path` string, optional `permissions` array of strings, optional `limit` number.
- On successful validation:
  - Prints a summary table to console showing each key, its path, permissions, and limits.
  - Exits with status code 0.
- On missing file, parse error, or validation failure:
  - Logs a clear error message to stderr.
  - Exits with status code 1.

## Implementation

1. **CLI Command**
   - Update `src/lib/main.js` to detect the `sync-config` command and parse `--config` option using a minimal argument parser or manual lookup.
2. **YAML Parsing & Validation**
   - Use `fs.promises.readFile` to load the YAML file.
   - Use `js-yaml` to parse into JavaScript.
   - Use `zod` to define and validate the config schema.
3. **Summary Output**
   - Use `console.table` or formatted console logs to display configuration entries.
4. **Error Handling**
   - Catch file read errors and syntax errors separately, providing helpful messages.
   - On Zod validation failure, display each issue.
5. **Tests**
   - Add unit tests in `tests/unit/main.test.js` covering:
     - Successful sync with default config file and custom path.
     - Missing config file scenario.
     - Invalid YAML syntax.
     - Schema validation failures (missing keys, wrong types).
6. **Documentation**
   - Update `README.md` with:
     - Description of `sync-config` command.
     - Usage examples for default and custom config path.
     - Expected summary output sample.

## Files to Update

- **src/lib/main.js**: add command handler, YAML parsing, validation, summary logic.
- **tests/unit/main.test.js**: extend tests for sync-config scenarios.
- **README.md**: document the new `sync-config` command with examples.
- **package.json**: ensure `js-yaml` and `zod` are listed as dependencies (already present).