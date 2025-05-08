# Agent Configuration Sync

## Overview
Extend the existing sync-config subcommand to include comprehensive integration tests and update documentation in README and USAGE files. Ensure end-to-end validation of CLI behavior and clear guidance for users.

## Behavior
When the CLI is invoked with sync-config [--config <path>]:

- Reads YAML configuration from the specified path or defaults to agent-config.yaml
- Parses schedule as nonempty string and paths as a mapping of keys to objects with path, optional permissions array, and optional limit number
- On successful validation prints a table of entries showing key, path, permissions, and limit then exits with code 0
- On missing file, YAML syntax error, or schema validation failure prints descriptive error to stderr and exits with code 1

## Implementation

1. Integration Tests
   - Create or extend test file under tests/unit/sync-config.integration.test.js
   - Use child_process.spawnSync to invoke repository0-plot-code-lib sync-config and sync-config --config custom-config.yaml
   - Prepare fixture files for valid and invalid configurations under tests/fixtures
   - Assert stdout contains expected table rows and exit code 0 for valid cases
   - Assert stderr contains descriptive messages and exit code 1 for error cases

2. Unit Tests
   - Augment tests/unit/main.test.js to mock fs.readFileSync and yaml.load for parsing and validation error paths
   - Cover missing file, invalid YAML, and schema violation scenarios

3. Source Updates
   - Ensure main function throws errors for file read failures, YAML parse errors, and Zod validation failures
   - Confirm console.table usage for summary output remains correct

## Documentation

### README.md and USAGE.md Updates

Under a new section CLI Commands add:

### sync-config

Reads, validates, and summarizes the agent configuration YAML file.

Usage

  repository0-plot-code-lib sync-config [--config <path>]

Options

  --config <path>  Path to the YAML configuration file. Defaults to agent-config.yaml

Examples

  $ repository0-plot-code-lib sync-config
  ┌─────────┬───────────────────────────┬───────────────┬──────────────┬───────┐
  │ (index) │           key             │     path      │ permissions  │ limit │
  ├─────────┼───────────────────────────┼───────────────┼──────────────┼───────┤
  │    0    │ missionFilepath           │ MISSION.md    │              │       │
  │    1    │ librarySourcesFilepath    │ SOURCES.md    │ write        │ 16    │
  └─────────┴───────────────────────────┴───────────────┴──────────────┴───────┘

  $ repository0-plot-code-lib sync-config --config custom-config.yaml

Exit Codes

  0 on success
  1 on error (file not found, parse error, or validation failure)