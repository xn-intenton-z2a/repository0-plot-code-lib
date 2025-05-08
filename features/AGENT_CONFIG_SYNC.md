# Agent Config Synchronization

Enable the CLI to read, validate, and apply settings from the agentic-lib workflow configuration file.  This feature adds a `sync-config` command that synchronizes the repository’s internal behavior with the definitions in the `agent-config.yaml` file.

# Command-Line Interface

- `repository0-plot-code-lib sync-config [--config <path>]`
  - Reads the workflow configuration file (defaults to `agent-config.yaml` in the project root).
  - Parses the YAML using `js-yaml`.
  - Validates required keys: `schedule`, `paths` mapping.
  - Outputs a summary of loaded schedule and accessible paths.
  - Exits with code 0 on success, non-zero on validation errors.

# Implementation Details

- In `src/lib/main.js`:
  - Parse arguments to detect the `sync-config` subcommand.
  - Load filesystem via `fs.promises.readFile`.
  - Parse YAML with `js-yaml`.
  - Validate presence of top-level keys: `schedule` and `paths`.
  - Print a formatted summary of `schedule` and list of path mappings.
  - Handle errors with descriptive messages.

- In `package.json`:
  - Ensure `js-yaml` dependency is listed.

# Testing

- Add unit tests in `tests/unit/plot-generation.test.js`:
  - Mock filesystem to supply a sample `agent-config.yaml`.
  - Verify that `main(['sync-config'])` reads and parses the YAML correctly.
  - Test error handling when required keys are missing.

# Documentation Updates

- Update `README.md` to document the new `sync-config` command under Usage.
- Provide an example invocation and sample output.
