USAGE.md
# USAGE.md
# Usage

This document describes the available CLI subcommands for `repository0-plot-code-lib`.

## reseed

Overwrite repository files from seed definitions in a YAML configuration.

**Usage**:
```bash
repository0-plot-code-lib reseed [--config <path>]
```

**Options**:
- `--config`, `-c`  Specify a custom agent config YAML (default: `agent-config.yaml`).

**Examples**:
```bash
# Use default configuration
repository0-plot-code-lib reseed

# Use a custom configuration file
repository0-plot-code-lib reseed --config custom-config.yaml
```

**Output**:
- On success: prints
  ```
  Overwrote: <comma-separated list of target file paths>
  ```
- On error: writes an error message to stderr and exits with code `1`.

## open-release-pr

Automate version bumping, changelog update, and opening a pull request via the GitHub API.

**Usage**:
```bash
repository0-plot-code-lib open-release-pr --token <token> --base <branch> --release-version <version> --changelog <path>
```

**Options**:
- `--token`, `-t`           GitHub personal access token (or set `GITHUB_TOKEN`)
- `--base`, `-b`            Base branch for the PR (required)
- `--release-version`, `-r` Semver version for the release (required)
- `--changelog`, `-c`       Path to the changelog file (required)

**Example**:
```bash
repository0-plot-code-lib open-release-pr \
  --token mytoken \
  --base develop \
  --release-version 1.2.3 \
  --changelog CHANGELOG.md
```

**Output**:
- On success: prints the URL of the created PR and exits with code `0`.
- On error: writes an error message to stderr and exits with code `1`.
