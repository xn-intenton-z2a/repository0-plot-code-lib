# repository0-plot-code-lib

"Be a go-to plot library with a CLI, be the jq of formulae visualisations."

A lightweight command-line tool to reseed repository files and automate GitHub pull requests for releases.

## Installation

Install globally via npm:

```bash
npm install -g @xn-intenton-z2a/repository0-plot-code-lib
```

Or add to your project:

```bash
npm install --save @xn-intenton-z2a/repository0-plot-code-lib
```

## Usage

Once installed, the `repository0-plot-code-lib` command provides the following subcommands:

### reseed

Overwrite repository files from a YAML seed configuration. By default, it reads `agent-config.yaml` in the project root.

**Usage**:
```bash
repository0-plot-code-lib reseed [--config <path>]
```

**Options**:
- `--config`, `-c`  Specify a custom path to the agent config YAML (default: `agent-config.yaml`).

**Example**:
```bash
# Use default config at project root
repository0-plot-code-lib reseed

# Use a custom configuration file
repository0-plot-code-lib reseed --config custom-agent-config.yaml
```

On success, the tool prints a list of files it overwrote:
```
Overwrote: <comma-separated list of target file paths>
```
On error, it logs a message to stderr and exits with code `1`.

### open-release-pr

Automate a patch release pull request by bumping `package.json`, updating a changelog, and opening a GitHub PR.

**Usage**:
```bash
repository0-plot-code-lib open-release-pr --token <token> --base <branch> --release-version <version> --changelog <path>
```

**Options**:
- `--token`, `-t`           GitHub personal access token (or set `GITHUB_TOKEN` environment variable)
- `--base`, `-b`            Base branch for the new release (required)
- `--release-version`, `-r` Semver version string for the new release (required)
- `--changelog`, `-c`       Path to the changelog file to update (required)

**Example**:
```bash
repository0-plot-code-lib open-release-pr \
  --token $GITHUB_TOKEN \
  --base main \
  --release-version 1.2.3 \
  --changelog CHANGELOG.md
```

On success, it prints the URL of the created pull request and exits with code `0`.
On error, it logs a message and exits with code `1`.

## Development & Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on setting up, testing, and submitting changes.

## License

MIT