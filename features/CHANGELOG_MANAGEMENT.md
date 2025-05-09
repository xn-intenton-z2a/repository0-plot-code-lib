# CHANGELOG_MANAGEMENT

## Overview
Provide a dedicated init-changelog subcommand to initialize and manage a standard CHANGELOG.md file. This ensures a single source of truth for release notes and integrates with existing open-release-pr and release-patch workflows.

## CLI Usage

- Initialize a new changelog:
  repository0-plot-code-lib init-changelog [--force]

Options:
- --force, -f    Overwrite existing CHANGELOG.md file if present

## Implementation Details

1. Command Routing:
   - In src/lib/main.js, detect args[0] === "init-changelog".
   - Parse optional --force or -f flag.

2. File Initialization:
   - Check for existence of CHANGELOG.md in the project root using fs.promises.readFile.
   - If the file is missing or --force is provided, write a template file with content:
     # Changelog

     All notable changes to this project will be documented in this file.

     ## [Unreleased]

   - If the file exists and no force flag, log error and exit with code 1.

3. Integration with Releases:
   - In open-release-pr and release-patch handlers, before reading CHANGELOG.md, verify its existence.
   - If missing, print error suggesting running init-changelog and exit with code 1.

4. Dependency Impact:
   - No new dependencies required.

## Testing

- tests/unit/changelog-init.test.js:
  1. Mock fs.readFile to reject with ENOENT and fs.writeFile to capture output. Invoke main(["init-changelog"]). Expect writeFile called with root path "CHANGELOG.md" and the template content, then exit code 0.
  2. Mock fs.readFile to succeed. Invoke main(["init-changelog"]). Expect error logged "CHANGELOG.md already exists" and exit code 1.
  3. With force flag, mock fs.readFile to succeed. Invoke main(["init-changelog","--force"]). Expect overwrite and exit code 0.

- tests/unit/open-release-pr-changelog.test.js:
  1. Mock fs.readFile in open-release-pr to throw ENOENT when reading CHANGELOG.md. Invoke main(["open-release-pr","--token","T","--base","main","--release-version","1.0.0","--changelog","CHANGELOG.md"]). Expect error suggesting init-changelog and exit code 1.

- tests/unit/release-patch-changelog.test.js:
  1. Similar test for release-patch: when CHANGELOG.md is missing, error suggests init-changelog and exit code 1.