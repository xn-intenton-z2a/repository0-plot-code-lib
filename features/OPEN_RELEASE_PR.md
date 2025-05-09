# OPEN_RELEASE_PR

## Overview
Enhance the open-release-pr subcommand to support automatic patch version bumping when no explicit version is provided, streamline option parsing with yargs, add dry-run mode, and improve error handling and documentation.

## CLI Usage

repository0-plot-code-lib open-release-pr --token <token> --base <branch> [--release-version <version> | --patch] [--changelog <path>] [--dry-run]

Options:
- --token, -t: GitHub personal access token or GITHUB_TOKEN environment variable (required)
- --base, -b: Base branch for the new PR (required)
- --release-version, -r: Explicit semver version string (mutually exclusive with --patch)
- --patch, -p: Read package.json version, strip prerelease suffixes, increment patch component (default behavior when neither --release-version nor --patch is provided)
- --changelog, -c: Path to the changelog file to update (default: CHANGELOG.md)
- --dry-run, -d: Simulate all steps without making file, git, or API changes

## Implementation Details

1. Command Definition:
   - Use yargs to register an open-release-pr command with strict options, aliases, and demandOption settings.

2. Version Resolution:
   - If --release-version is provided, validate it with semver.valid and use it.
   - Else, read package.json version, remove any prerelease suffix, and increment the patch segment using semver.inc.

3. Package Update:
   - Read package.json, update the version field to the resolved version, and write back formatted JSON.

4. Changelog Update:
   - Ensure CHANGELOG.md exists; if missing, exit with code 1 and prompt to run init-changelog.
   - Use git describe to find the previous tag and git log to collect commits since that tag.
   - Prepend a new changelog entry with heading ## v<version> – <YYYY-MM-DD> and commit list.
   - Write updated content back to the changelog file.

5. GitHub Pull Request:
   - Use Octokit to:
     a. Read base branch ref and create a new branch release/v<version>.
     b. Commit package.json and changelog updates on that branch.
     c. Create a pull request targeting the base branch with title chore(release): v<version> and body Release v<version>.

6. Dry-Run Handling:
   - When --dry-run is specified, log each intended action instead of executing file writes, git operations, or API calls.

7. Exit Codes:
   - 0 on success; 1 on invalid arguments, missing files, semver validation errors, or API failures.

## Testing

- Unit Tests:
  - Mock yargs parsing to simulate different flag combinations.
  - Mock fs.readFile and fs.writeFile, semver.valid/inc, execSync, and Octokit calls.
  - Verify default patch bump behavior, explicit version paths, dry-run logging, and error exit codes.

- Integration Tests:
  - In a temporary git repository, run open-release-pr without --release-version to confirm patch bump, branch creation, and changelog update.
  - Run with an explicit --release-version and verify correct behavior.
  - Test --dry-run to verify no side effects and correct log output.

## Documentation Updates

- Update USAGE.md to describe the --patch flag, default patch behavior, and --dry-run option with examples.
- Update README.md to include new CLI examples for patch auto bump and dry-run.
- Add semver to dependencies in package.json for version parsing and incrementing.