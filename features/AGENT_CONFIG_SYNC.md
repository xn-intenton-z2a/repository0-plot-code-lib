# Agent Configuration Sync

## Overview

Enhance the existing `sync-config` subcommand to include comprehensive integration tests and add detailed documentation in the README. This ensures end-to-end validation of CLI behavior and clear user guidance.

## Behavior

When the CLI is invoked with `sync-config`:

- Accepts an optional `--config <path>` argument (default `agent-config.yaml`).
- Reads and parses the YAML file, extracting `schedule` (nonempty string) and `paths` mapping entries.
- Validates the parsed object against a Zod schema:
  - `schedule` must be a nonempty string.
  - `paths` must map keys to objects with required `path` string, optional `permissions` array of strings, optional `limit` number.
- On successful validation:
  - Prints a summary table to stdout showing each key, its path, permissions, and limit.
  - Exits with status code 0.
- On missing file, YAML syntax error, or schema validation failure:
  - Prints a descriptive error message to stderr.
  - Exits with status code 1.

## Implementation

1. **CLI Invocation**
   - No change to `src/lib/main.js` logic; ensure it continues to throw errors for error cases and return on success.

2. **Integration Testing**
   - Extend `tests/unit/main.test.js` to include end-to-end tests using `child_process.spawnSync`:
     - Create temporary fixture files for valid and invalid configs.
     - Invoke `node src/lib/main.js sync-config` and `sync-config --config <path>`.
     - Verify stdout contains a formatted table and exit code 0 for success cases.
     - Verify stderr contains appropriate error messages and exit code 1 for failure cases (missing file, invalid YAML, schema errors).

3. **Unit Testing Updates**
   - Retain existing import and default invocation tests.
   - Add targeted unit tests for parsing and validation error cases by mocking `fs.readFileSync` and `yaml.load`.

## Documentation

### README.md Updates

- Add a new section under "## CLI Commands":

  ### sync-config
  
  Reads, validates, and summarizes the agent configuration YAML file.
  
  **Usage:**
  
    repository0-plot-code-lib sync-config [--config <path>]
  
  **Options:**
  
  - `--config <path>`: Path to the YAML configuration file. Defaults to `agent-config.yaml`.
  
  **Examples:**
  
    $ repository0-plot-code-lib sync-config
    ┌─────────┬───────────────────────────┬───────────────┬──────────────┐
    │ (index) │           key             │     path      │ permissions  │ limit │
    ├─────────┼───────────────────────────┼───────────────┼──────────────┼───────┤
    │    0    │ missionFilepath           │ MISSION.md    │              │       │
    │    1    │ librarySourcesFilepath    │ SOURCES.md    │ write        │ 16    │
    └─────────┴───────────────────────────┴───────────────┴──────────────┴───────┘
  
    $ repository0-plot-code-lib sync-config --config custom-config.yaml
  
  **Exit Codes:**
  
  - `0` on success
  - `1` on error (file not found, parse error, validation failure)

Ensure consistency with existing USAGE.md content.