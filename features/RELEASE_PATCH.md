# RELEASE_PATCH

# Overview

Add a new `release-patch` subcommand to automate the patch release workflow. Default behavior reads package.json version, increments the patch segment, updates CHANGELOG.md, commits changes, tags the release, pushes to remote, publishes to npm, and opens a GitHub release. Support explicit version override with `--version` flag.

# CLI Usage

repository0-plot-code-lib release-patch [--version <version>] [--token <token>] [--registry <url>] [--dry-run] [--no-git-push] [--no-npm-publish]

Options:

- `--version`, `-v`: explicit semver version string to release
- `--token`, `-t`: GitHub token or GITHUB_TOKEN environment variable
- `--registry`, `-r`: npm registry url (default npmjs)
- `--dry-run`, `-d`: print steps without executing file writes or git operations
- `--no-git-push`: skip pushing commits and tags to remote
- `--no-npm-publish`: skip publishing package to npm

# Implementation Details

1. Argument parsing with yargs; enforce valid flags and require token unless running dry run
2. Version resolution: if `--version` is provided, validate semver format and set newVersion; otherwise read version from package.json, strip any prerelease identifiers, increment patch segment
3. Update package.json: set version field to newVersion and write back with JSON formatting
4. Changelog update: read existing CHANGELOG.md; retrieve last git tag via git describe; collect commit messages since last tag; prepend new section heading `## v<newVersion> 20YYYY-MM-DD` followed by commit list and existing content
5. Git operations: stage package.json and CHANGELOG.md; commit with message chore(release): v<newVersion>; create lightweight tag v<newVersion>; push commits and tags unless `--no-git-push` is specified
6. npm publish: execute npm publish --registry <url> unless skipped by `--no-npm-publish`
7. GitHub release: use Octokit to create a release for v<newVersion> with changelog entry as the release body
8. Dry run: when `--dry-run` is passed, log each step instead of performing side effects

# Testing

- Unit tests: mock fs.readFile and writeFile, execSync, and Octokit calls; test default auto bump and explicit `--version`; test invalid version input errors; verify behavior of dry run, no-git-push, and no-npm-publish flags
- Integration tests: in a temporary git repository, run release-patch end to end; validate that package.json and CHANGELOG.md are updated correctly, git tag created, npm publish called or skipped, and GitHub release created

# Documentation Updates

Update USAGE.md and README.md to document the new `--version` flag and include CLI examples for both default auto bump and explicit version override