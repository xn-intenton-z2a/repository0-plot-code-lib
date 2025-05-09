# Overview

Extend the existing open-release-pr subcommand to support automatic patch bumping when no explicit version is provided, default to updating CHANGELOG.md with a new entry, and streamline dry-run, error handling, and documentation.

# CLI Usage

- repository0-plot-code-lib open-release-pr --token <token> --base <branch> [--release-version <version> | --patch] [--changelog <path>] [--dry-run]

Options:
- --token, -t    GitHub personal access token or read from GITHUB_TOKEN environment variable (required)
- --base, -b     Base branch for the new release pull request (required)
- --release-version, -r   Semver version string for the new release. Mutually exclusive with --patch
- --patch, -p    Read package.json version, strip pre-release suffixes, increment patch component, and use that as release-version. Defaults to this behavior if neither flag is provided
- --changelog, -c    Path to the changelog file to update (default: CHANGELOG.md)
- --dry-run      Simulate all steps without making git or file system changes

# Implementation Details

1. Argument Parsing
   - Use yargs to parse commands and options, enforce that --token and --base are present.  
   - Allow either --release-version or --patch; if neither is provided, default to patch bump behavior.  
   - Validate final version against semver format (\d+.\d+.\d+).

2. Version Resolution
   - Read package.json, parse version string, strip any pre-release identifiers.
   - If --patch, increment patch segment; if --release-version, use that value.  

3. Package and Changelog Update
   - Update package.json version field and write back with JSON.stringify formatting.  
   - Read existing changelog file (default CHANGELOG.md).  
   - Determine previous git tag via git describe; collect commit messages since previous tag.  
   - Prepend new entry to changelog with heading `## v<version> - <YYYY-MM-DD>` and commit list.  

4. Git and GitHub Operations
   - Create new branch `release/v<version>` from specified base via Octokit.  
   - Commit updated package.json and changelog to branch.  
   - Push branch and open a pull request via GitHub API with title `chore(release): v<version>`.  

5. Dry Run
   - When --dry-run is passed, log each action instead of executing file writes, git operations, or API calls.  

# Testing

- Unit Tests:
  - Mock fs.readFile and writeFile to simulate package.json and changelog modifications.  
  - Mock execSync to control git tag lookup and commit history.  
  - Mock Octokit to verify branch creation, file updates, and pull request payload.  
  - Test: default patch behavior when no --release-version flag provided.  
  - Test: explicit --release-version paths and validation errors when version is invalid.  
  - Test: dry-run logs correct sequence and skips side effects.  
  - Test: error paths for missing required options, file I/O failures, git or API failures exit with code 1.

- Integration Tests:
  - In a temporary git repo, run open-release-pr without flags to confirm auto-patch bump, branch creation, and changelog update.  
  - Verify real file writes (package.json and CHANGELOG.md) when not in dry-run.  

# Documentation Updates

- Update USAGE.md to include --patch behavior and default changelog path.  
- Update README.md with CLI examples illustrating patch auto bump and explicit version usage.  
- Add dependency on semver to package.json for robust version parsing and incrementing if not already present.