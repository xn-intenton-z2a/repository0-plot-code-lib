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