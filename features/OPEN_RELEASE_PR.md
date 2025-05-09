# Overview
Enhance the open-release-pr subcommand to support automatic patch version bumping, streamlined option parsing, dry-run mode, improved error handling, and optional CI status verification. When invoked, the command will bump the version, update package.json and changelog, create a pull request on GitHub, and optionally wait for continuous integration checks on the new branch to complete successfully before exiting.

# CLI Usage

repository0-plot-code-lib open-release-pr --token <token> --base <branch> --changelog <path> [--release-version <version> | --patch] [--wait-ci] [--ci-timeout <ms>] [--dry-run]

Options:
- --token, -t            GitHub personal access token or GITHUB_TOKEN environment variable (required)
- --base, -b             Base branch for the pull request (required)
- --changelog, -c        Path to the changelog file (required)
- --release-version, -r  Explicit semver version string (mutually exclusive with --patch)
- --patch, -p            Strip prerelease suffix and increment patch segment (default behavior when neither release-version nor patch is provided)
- --wait-ci, -w          Wait for GitHub Actions checks on the new pull request branch to pass before exiting
- --ci-timeout           Maximum time in milliseconds to wait for CI completion (default: 300000)
- --dry-run, -d          Simulate all file, git, and API operations without making changes

# Implementation Details

1. Command Definition
   - Use yargs to register an open-release-pr command with aliases, demandOption for token, base, and changelog, and mutual exclusivity for release-version and patch.
   - Add options --wait-ci, --ci-timeout, and --dry-run with defaults and descriptions.

2. Version Resolution and File Updates
   - If --release-version is provided, validate with semver.valid; otherwise read package.json, strip prerelease suffix if present or bump patch with semver.inc.
   - Read and parse package.json, set version, and write back formatted JSON.
   - Read existing changelog file; use git describe to find the previous tag and git log to collect commits since that tag. Prepend a new section ## v<version> – YYYY-MM-DD with commit list.
   - Write updated changelog back to file.

3. GitHub Operations
   - Use Octokit with auth token to:
     a. Create a new branch release/v<version> from the specified base branch.
     b. Commit updated package.json and changelog to that branch via createOrUpdateFileContents.
     c. Open a pull request with title chore(release): v<version> and body Release v<version>.
   - Capture the created pull request number, head branch name, and latest commit SHA.

4. CI Status Verification
   - If --wait-ci is set and not in dry-run mode:
     - Poll GitHub status or checks API (repos.getCombinedStatusForRef or checks.listForRef) for the commit SHA at regular intervals (e.g., every 5000ms).
     - Continue polling until all required checks report status success or a timeout is reached.
     - On success, log a confirmation message and exit code 0; on timeout or any failure state, log an error and exit code 1.

5. Dry-Run Handling
   - If --dry-run is specified, log planned actions for version bump, changelog update, branch creation, file commits, pull request creation, and CI polling steps without executing them.

6. Exit Codes
   - 0: All operations completed successfully (and CI passed if --wait-ci).
   - 1: Invalid arguments, missing files, semver validation errors, GitHub API failures, or CI failure/timeouts.

# Testing

1. Unit Tests
   - Mock yargs parsing to simulate flag combinations including --wait-ci, --dry-run, and ci-timeout paths.
   - Mock fs.readFile/writeFile, semver.valid/inc, execSync, and Octokit methods for getRef, createRef, createOrUpdateFileContents, and pulls.create.
   - Mock GitHub status and checks API to simulate passing, failing, and timeout scenarios. Verify correct polling behavior, success logging, and exit codes.
   - Validate dry-run mode logs all intended actions without calling file or API functions.

2. Integration Tests
   - In a temporary git repository with sample commits, run open-release-pr to verify patch bump, changelog update, branch creation, PR creation, and CI polling with a mocked GitHub server.
   - Test --wait-ci behavior by simulating GitHub Actions passing after a few polls, and simulate timeout or failure states.

# Documentation Updates

- Update README.md to describe the open-release-pr command with new flags --wait-ci and --ci-timeout, examples of waiting for CI completion, and dry-run usage.
- Update USAGE.md to include details for --wait-ci and --ci-timeout options under open-release-pr section.
- Ensure semver is listed in dependencies for version parsing and incrementing.