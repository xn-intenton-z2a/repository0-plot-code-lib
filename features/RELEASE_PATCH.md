# RELEASE_PATCH

## Overview
Automate the creation and publication of a patch release (vX.Y.Z) and update the CHANGELOG.md accordingly. The new release-patch subcommand reads the current version from package.json, strips any prerelease suffix, increments the patch segment, updates package.json, prepends a new changelog entry with commit history, commits and tags the changes, pushes to remote, publishes to npm, and creates a GitHub release.

## CLI Usage

- Create and publish a patch release with automatic version bump:
  repository0-plot-code-lib release-patch [--token <token>] [--registry <url>]

- Override the automatic version bump with an explicit semver version:
  repository0-plot-code-lib release-patch --version <version> [--token <token>] [--dry-run]

Options:
- `--version`, `-v`      Explicit semver version for the release (skips auto bump)
- `--token`, `-t`        GitHub token or GITHUB_TOKEN environment variable (required for GitHub operations)
- `--registry`, `-r`     npm registry URL (default: npmjs)
- `--dry-run`, `-d`      Print planned steps without performing file writes, git, npm, or GitHub operations
- `--no-git-push`        Skip pushing commits and tags to the remote repository
- `--no-npm-publish`     Skip publishing the package to npm

## Implementation Details

1. Argument Parsing
   - Use yargs to define the release-patch command, flags, aliases, defaults, and demandOption for required flags when needed.

2. Version Resolution
   - Read package.json and parse the version field.
   - If `--version` is provided, validate it with semver.valid.
   - Otherwise, remove any prerelease identifiers and increment the patch component with semver.inc.

3. Update package.json
   - Set the version field to the resolved version and overwrite package.json with formatted JSON.

4. Update CHANGELOG.md
   - Read existing CHANGELOG.md. If missing, exit with code 1 and suggest running init-changelog.
   - Use `git describe --tags --abbrev=0` to find the previous tag, then `git log prevTag..HEAD --pretty=format:"- %s"` to gather commit messages.
   - Prepend a new section heading `## v<version> – YYYY-MM-DD` followed by the commit list and a blank line, then the previous content.
   - Write the updated content to CHANGELOG.md.

5. Git Operations
   - Stage package.json and CHANGELOG.md, commit with message `chore(release): v<version>`, and tag with `v<version>`.
   - Push commits and tags unless `--no-git-push` is specified.

6. npm Publish
   - Execute `npm publish --registry <url>` unless `--no-npm-publish` is specified.

7. GitHub Release
   - Use Octokit to create a GitHub release for the new tag with the changelog section as the release body.

8. Dry Run
   - When `--dry-run` is used, log each action instead of performing it.

9. Dependencies
   - Add `semver` to dependencies for version parsing and incrementing.

10. Exit Codes
    - `0` on full success
    - `1` on argument validation errors, missing files, semver errors, or GitHub failures
    - `2` reserved for unexpected failures

## Testing

- Unit Tests:
  - Mock fs.readFile/writeFile, execSync, semver.valid/inc, Octokit, and child_process exec for git and npm.
  - Test default auto bump, explicit `--version`, and invalid version input.
  - Validate CHANGELOG update logic, including missing CHANGELOG.md.
  - Test dry-run for no side effects.

- Integration Tests:
  - In a temporary git repository with sample commits, run the subcommand and verify package.json version, CHANGELOG.md content, git tag, and npm publish invocation.
  - Run with `--dry-run` and confirm no file changes or external operations.

## Documentation Updates

- Update README.md and USAGE.md to describe the release-patch command, its flags, and example invocations.
- Document the release-patch API in README for library consumers.
