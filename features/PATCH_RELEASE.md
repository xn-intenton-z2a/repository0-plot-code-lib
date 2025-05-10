# Overview
Add a new release mode to automate version bumping, changelog updates, pull request creation, and npm publishing for v1.2.0.

# CLI Interface
Add a --release flag to the CLI. Support an optional --dry-run flag to preview steps without execution.

Examples:
repository0-plot-code-lib --release
repository0-plot-code-lib --release --dry-run

# Implementation
- Detect --release and --dry-run flags in src/lib/main.js using manual parsing of process.argv.
- Read package.json via fs.promises and update version from 1.2.0-0 to 1.2.0.
- Use npx conventional-changelog -p angular -i CHANGELOG.md -s to update CHANGELOG.md.
- Commit changes and tag v1.2.0 using child_process.spawn for git add, git commit, and git tag.
- Create a GitHub pull request using gh CLI: gh pr create --title 'chore(release): v1.2.0' --body file:CHANGELOG.md.
- After PR merge, publish to npm using npm publish.
- Log descriptive messages at each step and handle errors with non-zero exit codes.

# Testing
- Add tests in tests/unit/release-pr.test.js mocking fs.promises and child_process.spawn to simulate version bump, changelog update, git, gh, and npm commands.
- Verify that --release triggers the correct sequence and that --dry-run outputs planned steps without executing commands.

# Documentation Updates
- Update README.md with a "Release Workflow" section describing the --release flag and usage examples.
- Update USAGE.md to reference release mode and flags.