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

## open-release-pr

The `open-release-pr` command automates version bumping, changelog update, and opening a pull request via GitHub API.

**Usage**:
```bash
repository0-plot-code-lib open-release-pr --token <token> --base <branch> --release-version <version> --changelog <path>
```

**Options**:

- `--token`, `-t`           GitHub personal access token (or set `GITHUB_TOKEN` environment variable)
- `--base`, `-b`            Base branch for the new release (required)
- `--release-version`, `-r` Semver version string for the new release (required)
- `--changelog`, `-c`       Path to the changelog file to update (required)

**Examples**:
```bash
repository0-plot-code-lib open-release-pr --token mytoken --base develop --release-version 1.2.3 --changelog CHANGELOG.md
```

On success, prints the URL of the created pull request and exits with code `0`.
On error, prints an error message to stderr and exits with code `1`.
