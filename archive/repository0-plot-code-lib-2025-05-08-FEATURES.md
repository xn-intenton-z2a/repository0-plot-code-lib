features/AGENT_CONFIG_SYNC.md
# features/AGENT_CONFIG_SYNC.md
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
features/RELEASE_PULL_REQUEST.md
# features/RELEASE_PULL_REQUEST.md
# Release Pull Request Automation

Enable the CLI to automate creation of a release pull request for a specified version. This feature adds a release-pr command that updates the version in package.json, updates CHANGELOG.md, commits changes, pushes a release branch, and opens a GitHub pull request with the changelog entry.

# Command-Line Interface

- `repository0-plot-code-lib release-pr --version <semver>`
  - Reads package.json and updates the version field to `<semver>`.
  - Updates CHANGELOG.md by prepending a new section for `<semver>` with the current date and placeholder notes.
  - Creates and checks out a git branch named `release/v<semver>`.
  - Commits the updated package.json and CHANGELOG.md with message `chore: release v<semver>`.
  - Pushes the branch to the origin remote.
  - Opens a pull request via the GitHub CLI (`gh`) using the new changelog entry as the PR title and body.

# Implementation Details

- In `src/lib/main.js`:
  - Parse arguments to detect `release-pr` subcommand and `--version` option.
  - Use `fs.promises` to read and write `package.json` and `CHANGELOG.md`.
  - Use `child_process.exec` to run git commands (`git checkout -b`, `git add`, `git commit`, `git push`) and GitHub CLI (`gh pr create`).
  - Require `GITHUB_TOKEN` environment variable for authentication with GitHub.
  - Handle missing or invalid semver argument with a descriptive error and exit code 1.

# Testing

- Extend tests in `tests/unit/main.test.js`:
  - Mock `fs.promises` to simulate reading and writing of `package.json` and `CHANGELOG.md`.
  - Mock `child_process.exec` to assert correct git and `gh` commands are invoked for a given version.
  - Verify error handling when `--version` is missing or semver is invalid.

# Documentation Updates

- Update `README.md`:
  - Add a `release-pr` section under Usage.
  - Show example invocation:
    repository0-plot-code-lib release-pr --version 1.2.0
  - Include expected console output and sample pull request title and body.