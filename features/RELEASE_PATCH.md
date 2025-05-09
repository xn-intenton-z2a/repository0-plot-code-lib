# RELEASE_PATCH

## Overview
Automate the creation and publication of a patch release and the corresponding update to CHANGELOG.md in a single command. The command reads the current version from package.json, handles prerelease suffix stripping or explicit version overrides, updates package.json and CHANGELOG.md, commits and tags changes in Git, publishes the package to npm, and creates a GitHub release for the new tag.

## CLI Usage

- Create and publish a patch release with default behavior (bump patch or strip prerelease):
  repository0-plot-code-lib release-patch [--token <token>] [--registry <url>] [--dry-run]

- Strip prerelease suffix without bumping patch:
  repository0-plot-code-lib release-patch --no-bump [--token <token>] [--registry <url>]

- Specify an explicit semver version:
  repository0-plot-code-lib release-patch --version <version> [--token <token>] [--dry-run]

Options:
- --version, -v   Explicit semver version for the release, skipping auto bump or strip behavior
- --no-bump       Remove any prerelease suffix from current version without incrementing the patch segment
- --token, -t     GitHub token or GITHUB_TOKEN environment variable (required for GitHub operations)
- --registry, -r  npm registry URL (default: https://registry.npmjs.org)
- --dry-run, -d   Log planned steps without writing files, running git, npm, or API calls
- --no-git-push   Skip pushing commits and tags to remote
- --no-npm-publish Skip publishing the package to npm

## Implementation Details

1. Argument Parsing
   - Use yargs to define the release-patch command with flags and aliases, enforce mutual exclusivity between --version and --no-bump.
   - Validate required environment variables and options.

2. Version Resolution
   - Read the current version from package.json. If --version is provided, validate it using semver.valid and use it. Otherwise, if the current version has a prerelease suffix and --no-bump is specified or by default, strip the suffix and use the base version. Otherwise, increment the patch component via semver.inc.

3. Update package.json
   - Overwrite the version field in package.json with the resolved version and write back formatted JSON with a trailing newline.

4. Update CHANGELOG.md
   - Verify that CHANGELOG.md exists, otherwise exit with code 1 and instruct to run init-changelog.
   - Determine the previous tag via git describe --tags --abbrev=0, then collect commit messages since that tag using git log.
   - Prepend a new section heading ## v<version> – YYYY-MM-DD followed by the list of commits and a blank line before the existing content.

5. Git Operations
   - Stage package.json and CHANGELOG.md. Commit with message chore(release): v<version> and create a tag v<version>.
   - Push commits and tags unless --no-git-push is set.

6. npm Publish
   - Run npm publish with the resolved registry URL unless --no-npm-publish is set.

7. GitHub Release
   - Use Octokit to create a GitHub release for the new tag with the changelog section as the release body.

8. Dry Run
   - When --dry-run is used, log each intended action instead of executing it.

9. Exit Codes
   - 0 on complete success
   - 1 on validation errors, missing files, or Git/GitHub operation failures
   - 2 on unexpected errors during execution

## Testing

1. Unit Tests
   - Create tests in tests/unit/release-patch.test.js, mocking fs.readFile/writeFile, execSync, semver.valid/inc, Octokit methods, and child_process calls.
   - Verify version resolution paths: prerelease strip, patch bump, and explicit version.
   - Test CHANGELOG.md update logic including missing file scenario.
   - Simulate --dry-run to assert no side effects and correct logs.
   - Confirm exit codes for each error and success scenario.

2. Integration Tests
   - Use a temporary git repository with sample commits and package.json version X.Y.Z-0; run release-patch to confirm version becomes X.Y.Z, CHANGELOG.md is updated, commit and tag are created, package is published, and GitHub release is invoked (mocked).
   - Test explicit --version and --no-bump flags to ensure correct behavior.

## Documentation Updates

- Update README.md to include the release-patch command, flags, and examples.
- Update USAGE.md under a release-patch section to reflect new options and usage patterns.
