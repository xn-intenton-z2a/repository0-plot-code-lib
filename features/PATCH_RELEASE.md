# Overview
Implement an automated patch release command to bump the package version, update the changelog section in the README, and prepare for publishing.

# Behavior
When the CLI is invoked with release patch:

- Reads package.json and increments the patch version component (semver).
- Updates the version field in package.json to the new patch version.
- Locates or creates a Changelog section in README.md and prepends a new entry for the new version with date and a placeholder for release notes.
- Prints summary of changes applied (new version and changelog update).
- Returns exit code 0 on success, or 1 on any file read/write error.

# Implementation
1. Source Updates (src/lib/main.js)
   - Add a new command branch: if args[0] equals "release" and args[1] equals "patch".
   - Read package.json, parse JSON, bump patch version (using semver from dependencies or manual split).
   - Write updated package.json back to disk with proper formatting.
   - Read README.md, search for a "## Changelog" heading. If missing, insert heading at end of file.
   - Prepend under "## Changelog" a new subsection with the new version number, current date in ISO format, and a placeholder for notes "- Add release notes here".
   - Write updated README.md back to disk.
   - Console.log the new version and confirm changelog updated.
   - Handle and throw descriptive errors for read/write JSON or file operations.

2. Tests
   - Add unit tests in tests/unit/release.test.js.
   - Mock fs.readFileSync and fs.writeFileSync to simulate package.json and README.md content.
   - Validate that invoking main(["release","patch"]) updates JSON version and README content correctly.
   - Test error handling when package.json or README.md cannot be read or written.

# Documentation
- Update README.md to include usage for the new release command:

## release patch
Bumps the patch version, updates README Changelog, and prepares a patch release.

Usage:

  repository0-plot-code-lib release patch

Exit Codes:

  0 on success
  1 on error (file read/write failure)