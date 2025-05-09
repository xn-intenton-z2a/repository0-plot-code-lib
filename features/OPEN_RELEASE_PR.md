# Overview
Integrate a new release subcommand into the CLI that automates version bumping, changelog generation, and opening a pull request on GitHub for a specified release version. This streamlines the release process by extracting commit history, updating package metadata, and leveraging the GitHub API to create and track a release pull request.

# CLI Usage

- repository0-plot-code-lib release --version <version> [--changelog <path>] [--branch <name>] [--token <token>] [--dry-run]

Options:
- --version, -v  Semver version string for the new release (required)
- --changelog, -c  Path to CHANGELOG.md (default: CHANGELOG.md)
- --branch, -b  Name of the release branch to create (default: release-v{version})
- --token, -t  GitHub personal access token for API calls (or read from GITHUB_TOKEN env)
- --dry-run  Show steps without performing file writes, git operations, or API calls

# Implementation Details

1. CLI Parsing
   - Use yargs to detect `release` command, require `--version` argument, support other flags.
   - Enforce semver format for the version argument.

2. Changelog Generation
   - Invoke git via child_process.exec to list commit messages since last tag: `git log --pretty=format:"- %s" v${previousVersion}..HEAD`.
   - Read or create CHANGELOG.md, prepend a new heading `## v{version} – {YYYY-MM-DD}` and the commit list under it.

3. Version Bump
   - Read package.json, update the top-level `version` field to the new version.
   - Write updated package.json back to disk.

4. Git Operations
   - Create a new branch (default `release-v{version}`), stage CHANGELOG.md and package.json, commit with message `chore(release): v{version}`.
   - Push branch to origin.

5. Pull Request Creation
   - Use @octokit/rest to authenticate with the GitHub API via provided token.
   - Create a pull request with title `Release v{version}`, body summarizing changelog entries, base branch `main`, head branch release branch.
   - Output PR URL to stdout.

6. Dry Run Mode
   - When `--dry-run` is set, simulate each step by logging actions without file writes, git calls, or API requests.

# Testing

- Unit Tests:
  - Mock fs.promises.readFile and writeFile to verify package.json and CHANGELOG.md updates.
  - Stub child_process.exec to return synthetic commit messages and verify parsing logic.
  - Mock Octokit client to confirm PR creation payload and output.
  - Test dry-run mode prints expected logs and skips file writes and API calls.

- Integration Tests:
  - Use a temporary git repository fixture with tags and commits to run the full `release` command end-to-end.
  - Verify that a branch is created, files are updated on disk, and PR creation is invoked with correct parameters.
