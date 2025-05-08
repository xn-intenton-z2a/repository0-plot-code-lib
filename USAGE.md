# repository0-plot-code-lib CLI Usage

The `repository0-plot-code-lib` CLI supports the following commands:

## sync-config

Reads, validates, and summarizes the agent configuration YAML file.

Usage:
```
repository0-plot-code-lib sync-config [--config <path>]
```

Options:

- `--config <path>`: Path to the YAML configuration file. Defaults to `agent-config.yaml`.

Behavior:

- On success, displays a table of configuration entries (key, path, permissions, limit).
- On error, prints a descriptive error message.

Examples:
```
$ repository0-plot-code-lib sync-config
┌─────────┬───────────────────────────┬───────────────┬──────────────┬───────┐
│ (index) │           key             │     path      │ permissions  │ limit │
├─────────┼───────────────────────────┼───────────────┼──────────────┼───────┤
│    0    │ missionFilepath           │ MISSION.md    │              │       │
│    1    │ librarySourcesFilepath    │ SOURCES.md    │ write        │ 16    │
└─────────┴───────────────────────────┴───────────────┴──────────────┴───────┘

$ repository0-plot-code-lib sync-config --config custom-config.yaml
```