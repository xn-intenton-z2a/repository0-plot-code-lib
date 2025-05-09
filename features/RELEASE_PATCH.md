# RELEASE_PATCH

## Overview

Add a new `release-patch` subcommand that automates the complete patch release workflow. It will read and bump the patch component in package.json, prepend a new section in CHANGELOG.md with commits since the last tag, commit the changes, create a Git tag, push commits and tags, optionally publish to npm, and open a GitHub release.

## CLI Usage

- repository0-plot-code-lib release-patch --token <token> --registry <url> [--dry-run] [--no-git-push] [--no-npm-publish]

Options:

- `--token`, `-t`: GitHub personal access token or read from GITHUB_TOKEN for tagging and release creation
- `--registry`, `-r`: npm registry URL for publishing (default: npmjs)
- `--dry-run`, `-d`: Print each action without performing file writes, git operations, or publish
- `--no-git-push`: Skip pushing commits and tags to remote
- `--no-npm-publish`: Skip publishing package to npm registry

## Implementation Details

1. Argument Parsing
   - Use yargs to define the `release-patch` command and validate options
   - Enforce that `--token` is provided or available in environment when Git operations run
2. Version Bump
   - Read package.json, parse JSON, strip any prerelease identifiers
   - Increment the patch segment, update the version field, and write back with formatting
3. Changelog Update
   - Read CHANGELOG.md and retrieve the previous tag via `git describe --tags --abbrev=0`
   - Collect commit messages since that tag with `git log` and format them as bullet points
   - Prepend a new heading `## v<newVersion> - <YYYY-MM-DD>` followed by commit list and existing content
   - Write updated CHANGELOG.md
4. Git Operations
   - Stage package.json and CHANGELOG.md, commit with message `chore(release): v<newVersion>`
   - Create a lightweight tag `v<newVersion>`
   - Unless `--no-git-push`, push commits and tags to origin
5. npm Publish
   - Unless `--no-npm-publish`, execute `npm publish --registry <url>`
6. GitHub Release
   - Use Octokit to create a release for `v<newVersion>` with changelog entry as body
7. Dry Run
   - When `--dry-run` is set, log each step instead of executing

## Testing

- Unit Tests:
  - Mock `fs.promises.readFile`/`writeFile`, `execSync`, and child_process `spawn` for `npm publish`
  - Simulate version bump, changelog rewrite, git commands, and publish operations
  - Verify that flags `--no-git-push`, `--no-npm-publish`, and `--dry-run` alter behavior correctly
- Integration Tests:
  - In a temporary git repository, run `release-patch` end-to-end
  - Validate that package.json and CHANGELOG.md are updated, git tag is created, and npm publish command is invoked or skipped depending on flags

## Documentation Updates

- Update USAGE.md and README.md with CLI examples and description of `release-patch` command
- Add note about required environment variables and default behaviors