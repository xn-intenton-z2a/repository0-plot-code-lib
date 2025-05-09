# Overview
Automate the creation and publication of a patch release (vX.Y.Z) and the corresponding update to CHANGELOG.md in a single command. The feature reads the current version from package.json, handles prerelease suffixes or explicit version overrides, updates package.json and CHANGELOG.md, commits and tags changes in Git, publishes to npm, and creates a GitHub release.

# CLI Usage

- Create and publish a patch release with default behavior:
  repository0-plot-code-lib release-patch [--token <token>] [--registry <url>] [--dry-run]

- Strip prerelease suffix without bumping patch:
  repository0-plot-code-lib release-patch --no-bump [--token <token>] [--registry <url>]

- Specify an explicit semver version:
  repository0-plot-code-lib release-patch --version <version> [--token <token>] [--dry-run]

Options:
- --version, -v: Explicit semver version for the release, skipping auto bump or strip behavior
- --no-bump: Remove any prerelease suffix from current version without incrementing the patch segment
- --token, -t: GitHub token or GITHUB_TOKEN environment variable (required for GitHub operations)
- --registry, -r: npm registry URL (default: npmjs)
- --dry-run, -d: Log planned steps without writing files, running git, npm, or API calls
- --no-git-push: Skip pushing commits and tags to remote
- --no-npm-publish: Skip publishing the package to npm

# Implementation Details

1. Argument Parsing
   - Use yargs to define the release-patch command with all flags and aliases
   - Validate mutual exclusivity and required environment variables

2. Version Resolution
   - Read current version from package.json
   - If --version is provided, validate with semver.valid and use it
   - Else if current version has a prerelease suffix and --no-bump is set (or by default), strip suffix and use base version
   - Else increment patch component via semver.inc

3. Update package.json
   - Overwrite the version field with resolved version and write formatted JSON

4. Update CHANGELOG.md
   - Ensure CHANGELOG.md exists, else exit with code 1
   - Determine previous tag via git describe --tags --abbrev=0
   - Collect commit messages since previous tag via git log
   - Prepend a new section heading ## v<version> – YYYY-MM-DD followed by commit list and blank line before existing content

5. Git Operations
   - Stage package.json and CHANGELOG.md, commit with message chore(release): v<version>, and tag v<version>
   - Push commits and tags unless --no-git-push is specified

6. npm Publish and GitHub Release
   - Run npm publish with --registry unless --no-npm-publish is set
   - Use Octokit to create a GitHub release for the new tag, using the changelog section as the release body

7. Dry Run
   - When --dry-run is used, log each intended action instead of executing side effects

8. Exit Codes
   - 0 on complete success, 1 on validation errors or GitHub failures, 2 on unexpected errors

# Testing

- Unit Tests:
  - Create tests in tests/unit/release-patch.test.js mocking fs.readFile/writeFile, execSync, semver.valid/inc, Octokit methods, and child_process calls
  - Verify version resolution paths: prerelease strip, patch bump, explicit version
  - Test CHANGELOG.md update logic, including missing file scenario
  - Simulate --dry-run to assert no side effects and correct logs
  - Confirm exit codes for each error and success scenario

- Integration Tests:
  - In a temporary git repo with sample commits and package.json version 1.2.0-0, run release-patch to confirm version becomes 1.2.0, CHANGELOG.md is updated, commit and tag are created, and GitHub release is invoked (mocked)
  - Test explicit --version and --no-bump flags

# Documentation Updates

- Update README.md to include release-patch command, flags, and examples for stripping prerelease suffix, bumping patch, and dry-run mode
- Update USAGE.md to reflect new options and usage patterns under a "release-patch" section
- Document behavior of version resolution and changelog update in USAGE.md
