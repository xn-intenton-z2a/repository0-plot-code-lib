# RELEASE_PATCH

## Overview
Automate the creation and publication of a patch release (vX.Y.Z) and the corresponding update to CHANGELOG.md. This command reads the current version from package.json, supports dropping prerelease suffixes without incrementing, optionally increments the patch segment, updates package.json, prepends a new changelog entry with commit history, and handles version control and package publication steps.

## CLI Usage

- Create and publish a patch release with default auto behavior:
  repository0-plot-code-lib release-patch [--token <token>] [--registry <url>] [--dry-run]

- Strip prerelease suffix without bumping patch:
  repository0-plot-code-lib release-patch --no-bump [--token <token>] [--registry <url>]

- Force an explicit semver version:
  repository0-plot-code-lib release-patch --version <version> [--token <token>] [--dry-run]

Options:
- `--version`, `-v`: Explicit semver version for the release (skips auto bump or strip behavior)
- `--no-bump`: When current package.json version has a prerelease suffix, strip the suffix and use the base version without incrementing the patch component
- `--token`, `-t`: GitHub token or GITHUB_TOKEN environment variable (required for GitHub operations)
- `--registry`, `-r`: npm registry URL (default: npmjs)
- `--dry-run`, `-d`: Print planned steps without performing file writes, git, npm, or GitHub operations
- `--no-git-push`: Skip pushing commits and tags to the remote repository
- `--no-npm-publish`: Skip publishing the package to npm

## Implementation Details

1. Argument Parsing
   - Use yargs to define the release-patch command with flags: version, no-bump, token, registry, dry-run, no-git-push, no-npm-publish.

2. Version Resolution
   - Read the current version from package.json.
   - If `--version` is provided, validate with semver.valid and use that version.
   - Else if the current version includes a prerelease suffix and `--no-bump` is set (or by default strip prerelease): remove any prerelease identifiers and use the base version.
   - Else if no prerelease suffix or if explicit bump is desired, increment the patch component via semver.inc.

3. Update package.json
   - Set the version field to the resolved version and overwrite package.json with formatted JSON.

4. Update CHANGELOG.md
   - Read or validate existence of CHANGELOG.md; exit code 1 if missing.
   - Determine the previous tag via `git describe --tags --abbrev=0` and collect commits via `git log prevTag..HEAD --pretty=format:"- %s"`.
   - Prepend a new section heading `## v<version> – YYYY-MM-DD` with the commit list and blank line before existing content.
   - Write the updated content back to CHANGELOG.md.

5. Git Operations
   - Stage package.json and CHANGELOG.md, commit with message `chore(release): v<version>`, and tag with `v<version>`.
   - Push commits and tags unless `--no-git-push` is specified.

6. npm Publish
   - Execute `npm publish --registry <url>` unless `--no-npm-publish` is specified.

7. GitHub Release
   - Use Octokit to create a GitHub release for the new tag with the changelog section as the release body.

8. Dry Run
   - When `--dry-run` is used, log each action instead of performing side effects.

9. Exit Codes
   - `0` on full success
   - `1` on argument validation errors, missing files, semver errors, or GitHub failures
   - `2` reserved for unexpected failures

## Testing

- Unit Tests:
  - Mock fs.readFile/writeFile, execSync, semver.valid/inc, Octokit, and child_process exec for git and npm.
  - Test default behavior when current version includes a prerelease suffix: strip suffix without bump.
  - Test default bump for stable versions and explicit `--version` paths.
  - Validate CHANGELOG update logic, including missing CHANGELOG.md.
  - Test `--no-bump` and `--dry-run` behaviors.

- Integration Tests:
  - In a temporary git repository with sample commits and package.json version `1.2.0-0`, run the subcommand to confirm release v1.2.0 is created and tagged.
  - Run without prerelease suffix to confirm version increments to next patch.
  - Test with `--version 1.2.5` and `--dry-run` to verify no side effects and correct logs.

## Documentation Updates

- Update README.md and USAGE.md to describe the release-patch command, flags `--no-bump` and examples for stripping prerelease suffix, default bump and explicit version usage.
- Document new version resolution logic under a "Version Resolution" section in USAGE.md.