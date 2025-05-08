# Usage

## reseed

The `reseed` command overwrites repository files from seed files defined in `agent-config.yaml`.

**Usage**:
```bash
repository0-plot-code-lib reseed [--config <path>]
```

**Options**:

- `--config`, `-c`  Specify path to agent config YAML (default: `agent-config.yaml`).

**Examples**:
```bash
repository0-plot-code-lib reseed
repository0-plot-code-lib reseed --config custom-config.yaml
```

On success, prints:
```
Overwrote: MISSION.md, src/lib/main.js, tests/unit/plot-generation.test.js, tests/unit/main.test.js, package.json, README.md
```

On error, prints an error message to stderr and exits with code `1`.
