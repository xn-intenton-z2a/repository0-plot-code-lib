# Overview
Extend the existing open-release-pr subcommand to infer or auto-increment patch version from the current package.json when the user omits or requests a patch bump. This enhancement streamlines publishing a patch release by reducing manual version specification and aligns the command with common patch release workflows.

# CLI Usage

- repository0-plot-code-lib open-release-pr --token <token> --base <branch> [--release-version <version>] [--patch] [--changelog <path>] [--dry-run]

Options:
- --token, -t  GitHub personal access token or read from GITHUB_TOKEN environment variable.
- --base, -b  Base branch for the new release pull request (required).
- --release-version, -r  Semver version string for the new release. If omitted and --patch is not set, error.
- --patch, -p  Automatically read package.json version and increment the patch component. Overrides omission of --release-version.
- --changelog, -c  Path to the changelog file to update (default: CHANGELOG.md).
- --dry-run  Log actions without performing file writes, git operations, or API calls.

Examples:
- Auto bump patch from current version and publish:
  repository0-plot-code-lib open-release-pr --token mytoken --base main --patch --changelog CHANGELOG.md
- Explicitly publish version 1.2.0:
  repository0-plot-code-lib open-release-pr --token mytoken --base main --release-version 1.2.0 --changelog CHANGELOG.md

# Implementation Details

1. Argument Parsing
   - Parse --token, --base, --changelog, --release-version, --patch, and --dry-run.
   - If --patch is present, read and parse package.json version, strip any prerelease identifiers, and increment the patch number.
   - If --release-version is provided use that value; if neither is provided exit with an error about missing version.
   - Validate resolved version against semver pattern.

2. Version Bump and Changelog Generation
   - Read and update package.json version to resolved version.
   - Determine previous git tag. Extract commit messages since previous tag.
   - Prepend new changelog entry with heading for resolved version and commit list.

3. Git and GitHub Operations
   - Create and switch to a release branch named release/v{resolvedVersion}.
   - Commit updated package.json and changelog with consistent messages.
   - Push branch to origin.
   - Use Octokit to open a pull request against the specified base branch with title and body summarizing the release.

4. Dry Run Mode
   - When --dry-run is specified, simulate and log each step without performing any file writes, git commands, or API calls.

# Testing

- Unit Tests:
  - Mock fs.promises.readFile and writeFile to simulate package.json and changelog updates.
  - Mock execSync to simulate git tag lookup and commit history.
  - Mock Octokit to verify PR creation payload and correct branch and commit references.
  - Test default behavior with --patch flag to confirm correct version increment and branch naming.
  - Test explicit --release-version paths and validation errors when neither version nor patch flag is set.
  - Test dry-run mode logs actions and skips side effects.

- Integration Tests:
  - In a temporary git repository with an existing semver tag, run open-release-pr with --patch and confirm package.json, CHANGELOG.md updates and branch creation.
  - Verify that a pull request request is constructed against the correct base branch with the expected title and body.

# Documentation Updates

- Update USAGE.md with new examples for patch auto bump.
- Update README.md to describe the --patch option and default version inference.