# Overview

Add a release automation command to the CLI tool that handles version bump, CHANGELOG update, and opening a pull request on GitHub for v1.2.0 releases.

# CLI Options

* **release**: Subcommand to trigger release automation
* **--version**: The new version string to be applied (for example, 1.2.0)
* **--changelog**: Path to the CHANGELOG.md file (default is project root CHANGELOG.md)
* **--token**: GitHub personal access token for opening PRs
* **--dry-run**: If specified, simulate all steps without making changes

# Processing Steps

1. Parse and validate all CLI options and ensure version follows semver
2. Read package.json, update the version field, and write the file back
3. Open or update the Unreleased section in CHANGELOG.md by adding a new header for the supplied version with the current date
4. Stage package.json and CHANGELOG.md changes in Git
5. Create a new branch named release-v<version>
6. Commit changes with message chore(release): v<version>
7. Push the branch to the origin remote
8. Use GitHub API (via octokit) to open a pull request from release-v<version> into the default branch with title Release v<version>
9. If dry-run is specified, log all intended operations without executing them

# Dependencies

Add or update dependencies to include:
* semver for version parsing and validation
* @octokit/rest for GitHub API interactions

# Tests

Provide unit tests to cover:

* Correct parsing and validation of the --version option
* Version field update in a mock package.json content
* CHANGELOG.md file update logic for inserting a new version section
* Simulation mode where dry-run logs operations without altering files or calling GitHub
* Mock GitHub API call to verify PR creation payload