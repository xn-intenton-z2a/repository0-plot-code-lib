features/PERFORMANCE_PROFILING.md
# features/PERFORMANCE_PROFILING.md
# PERFORMANCE_PROFILING

## Overview
Extend the existing profile command to support profiling of large dataset files (CSV or JSON), measuring read, parse, and optional render times, with memory usage deltas, sampling, streaming, and concurrency. Provide single-file, batch, and directory profiling, export metrics in text, JSON, or CSV formats, and enable threshold-based alerts for automated performance validation in CI pipelines.

## CLI Usage

- Profile a single data file (JSON, CSV, YAML):
  repository0-plot-code-lib profile --input <file> [--format text|json|csv] [--max-duration <ms>] [--max-memory <bytes>] [--max-records <n>] [--stream] [--output <path>]

- Profile multiple files in batch mode:
  repository0-plot-code-lib profile --input <file1> --input <file2> [--batch] [--concurrency <n>] [--format csv] [--output metrics.csv]

- Directory batch profiling:
  repository0-plot-code-lib profile --batch-dir <directory> [--format csv] [--max-duration <ms>] [--output <path>]

Options:
- `--input`, `-i`: Path to a JSON, YAML, or CSV dataset file (multiple allowed).
- `--batch`, `-b`: Enable batch processing; requires multiple `--input` or `--batch-dir`.
- `--batch-dir`: Directory containing data files with extensions .json, .yaml, .yml, or .csv.
- `--format`, `-f`: Output format: text (default), json, or csv.
- `--max-duration`: Threshold in milliseconds for combined read and parse time; exit code 2 if exceeded.
- `--max-memory`: Threshold in bytes for memory usage delta; exit code 2 if exceeded.
- `--max-records`: Maximum number of records to parse per CSV file for sampling (default: parse all).
- `--stream`: For CSV files, stream lines instead of full-file read.
- `--concurrency`: Number of files to process in parallel (default: 1).
- `--output`, `-o`: File path to write report; defaults to stdout.

## Implementation Details

1. CLI Parsing:
   - Extend argument parser to accept `--input` alias `-i`, `--batch`, `--batch-dir`, `--max-records`, `--stream`, and `--concurrency`.
   - Deprecate `--config` alias for backward compatibility.
   - Enforce that either a single input or batch mode (`--batch` with multiple inputs or `--batch-dir`) is provided.

2. File Discovery and Reading:
   - If `--batch-dir` is set, read directory entries and filter supported extensions.
   - For each file:
     - Detect extension: JSON, YAML, or CSV.
     - For records profiling on CSV:
       - If `--stream` is set, use fs.createReadStream and readline to process up to `--max-records` lines.
       - Otherwise, read full file via fs.promises.readFile.
     - For JSON/YAML, read full file and parse with `JSON.parse` or `yaml.load`.

3. Profiling Logic:
   - For each file:
     - Capture start time (process.hrtime.bigint()) and initial memoryUsage().
     - Perform read or stream logic; record read completion time.
     - Parse content and count records (for CSV); record parse completion time.
     - Capture final memoryUsage(); compute durations and memory delta.
     - Compare metrics against thresholds; mark `alert` if any threshold is exceeded.

4. Reporting:
   - **Text**: Print per-file summary including durations, record count, memory usage, and alerts.
   - **JSON**: Output an array of objects: file, readDurationMs, parseDurationMs, recordCount, memoryDelta, alert.
   - **CSV**: First line header, then one row per file with same columns.
   - Write to `--output` file or stdout.

5. Exit Codes:
   - `0` when all files processed successfully with no threshold violations.
   - `2` when any file exceeded `--max-duration` or `--max-memory`.
   - `1` on file read errors, parse errors, invalid arguments, or unsupported formats.

## Testing

1. Unit Tests:
   - Mock fs.promises.readFile, fs.createReadStream, yaml.load, and JSON.parse to simulate small and large files.
   - Fake process.hrtime.bigint() and process.memoryUsage() for deterministic timing and memory values.
   - Verify single-file and batch profiling produce correct metrics for each format.
   - Test CSV streaming with `--stream` and sampling via `--max-records`.
   - Validate threshold flags trigger exit code 2 when limits are exceeded.
   - Simulate missing files, unsupported extensions, and parse errors; confirm stderr messages and exit code 1.

2. Integration Tests:
   - Create temporary JSON, YAML, and CSV files of varying sizes; run CLI end-to-end.
   - Test `--batch-dir` processing and `--concurrency` parallel execution.
   - Validate output written to files via `--output` flag in all formats.
   - Confirm exit codes and alert flags behave as specified.features/RELEASE_PATCH.md
# features/RELEASE_PATCH.md
# RELEASE_PATCH

## Overview
Automate the creation and publication of a patch release and the corresponding update to CHANGELOG.md in a single command. The command reads the current version from package.json, handles prerelease suffix stripping or explicit version overrides, updates package.json and CHANGELOG.md, commits and tags changes in Git, publishes the package to npm, and creates a GitHub release for the new tag.

## CLI Usage

- Create and publish a patch release with default behavior (bump patch or strip prerelease):
  repository0-plot-code-lib release-patch [--token <token>] [--registry <url>] [--dry-run]

- Strip prerelease suffix without bumping patch:
  repository0-plot-code-lib release-patch --no-bump [--token <token>] [--registry <url>]

- Specify an explicit semver version:
  repository0-plot-code-lib release-patch --version <version> [--token <token>] [--dry-run]

Options:
- --version, -v   Explicit semver version for the release, skipping auto bump or strip behavior
- --no-bump       Remove any prerelease suffix from current version without incrementing the patch segment
- --token, -t     GitHub token or GITHUB_TOKEN environment variable (required for GitHub operations)
- --registry, -r  npm registry URL (default: https://registry.npmjs.org)
- --dry-run, -d   Log planned steps without writing files, running git, npm, or API calls
- --no-git-push   Skip pushing commits and tags to remote
- --no-npm-publish Skip publishing the package to npm

## Implementation Details

1. Argument Parsing
   - Use yargs to define the release-patch command with flags and aliases, enforce mutual exclusivity between --version and --no-bump.
   - Validate required environment variables and options.

2. Version Resolution
   - Read the current version from package.json. If --version is provided, validate it using semver.valid and use it. Otherwise, if the current version has a prerelease suffix and --no-bump is specified or by default, strip the suffix and use the base version. Otherwise, increment the patch component via semver.inc.

3. Update package.json
   - Overwrite the version field in package.json with the resolved version and write back formatted JSON with a trailing newline.

4. Update CHANGELOG.md
   - Verify that CHANGELOG.md exists, otherwise exit with code 1 and instruct to run init-changelog.
   - Determine the previous tag via git describe --tags --abbrev=0, then collect commit messages since that tag using git log.
   - Prepend a new section heading ## v<version> – YYYY-MM-DD followed by the list of commits and a blank line before the existing content.

5. Git Operations
   - Stage package.json and CHANGELOG.md. Commit with message chore(release): v<version> and create a tag v<version>.
   - Push commits and tags unless --no-git-push is set.

6. npm Publish
   - Run npm publish with the resolved registry URL unless --no-npm-publish is set.

7. GitHub Release
   - Use Octokit to create a GitHub release for the new tag with the changelog section as the release body.

8. Dry Run
   - When --dry-run is used, log each intended action instead of executing it.

9. Exit Codes
   - 0 on complete success
   - 1 on validation errors, missing files, or Git/GitHub operation failures
   - 2 on unexpected errors during execution

## Testing

1. Unit Tests
   - Create tests in tests/unit/release-patch.test.js, mocking fs.readFile/writeFile, execSync, semver.valid/inc, Octokit methods, and child_process calls.
   - Verify version resolution paths: prerelease strip, patch bump, and explicit version.
   - Test CHANGELOG.md update logic including missing file scenario.
   - Simulate --dry-run to assert no side effects and correct logs.
   - Confirm exit codes for each error and success scenario.

2. Integration Tests
   - Use a temporary git repository with sample commits and package.json version X.Y.Z-0; run release-patch to confirm version becomes X.Y.Z, CHANGELOG.md is updated, commit and tag are created, package is published, and GitHub release is invoked (mocked).
   - Test explicit --version and --no-bump flags to ensure correct behavior.

## Documentation Updates

- Update README.md to include the release-patch command, flags, and examples.
- Update USAGE.md under a release-patch section to reflect new options and usage patterns.
features/OPEN_RELEASE_PR.md
# features/OPEN_RELEASE_PR.md
# Overview
Enhance the open-release-pr subcommand to support automatic patch version bumping, streamlined option parsing, dry-run mode, improved error handling, and optional CI status verification. When invoked, the command will bump the version, update package.json and changelog, create a pull request on GitHub, and optionally wait for continuous integration checks on the new branch to complete successfully before exiting.

# CLI Usage

repository0-plot-code-lib open-release-pr --token <token> --base <branch> --changelog <path> [--release-version <version> | --patch] [--wait-ci] [--ci-timeout <ms>] [--dry-run]

Options:
- --token, -t            GitHub personal access token or GITHUB_TOKEN environment variable (required)
- --base, -b             Base branch for the pull request (required)
- --changelog, -c        Path to the changelog file (required)
- --release-version, -r  Explicit semver version string (mutually exclusive with --patch)
- --patch, -p            Strip prerelease suffix and increment patch segment (default behavior when neither release-version nor patch is provided)
- --wait-ci, -w          Wait for GitHub Actions checks on the new pull request branch to pass before exiting
- --ci-timeout           Maximum time in milliseconds to wait for CI completion (default: 300000)
- --dry-run, -d          Simulate all file, git, and API operations without making changes

# Implementation Details

1. Command Definition
   - Use yargs to register an open-release-pr command with aliases, demandOption for token, base, and changelog, and mutual exclusivity for release-version and patch.
   - Add options --wait-ci, --ci-timeout, and --dry-run with defaults and descriptions.

2. Version Resolution and File Updates
   - If --release-version is provided, validate with semver.valid; otherwise read package.json, strip prerelease suffix if present or bump patch with semver.inc.
   - Read and parse package.json, set version, and write back formatted JSON.
   - Read existing changelog file; use git describe to find the previous tag and git log to collect commits since that tag. Prepend a new section ## v<version> – YYYY-MM-DD with commit list.
   - Write updated changelog back to file.

3. GitHub Operations
   - Use Octokit with auth token to:
     a. Create a new branch release/v<version> from the specified base branch.
     b. Commit updated package.json and changelog to that branch via createOrUpdateFileContents.
     c. Open a pull request with title chore(release): v<version> and body Release v<version>.
   - Capture the created pull request number, head branch name, and latest commit SHA.

4. CI Status Verification
   - If --wait-ci is set and not in dry-run mode:
     - Poll GitHub status or checks API (repos.getCombinedStatusForRef or checks.listForRef) for the commit SHA at regular intervals (e.g., every 5000ms).
     - Continue polling until all required checks report status success or a timeout is reached.
     - On success, log a confirmation message and exit code 0; on timeout or any failure state, log an error and exit code 1.

5. Dry-Run Handling
   - If --dry-run is specified, log planned actions for version bump, changelog update, branch creation, file commits, pull request creation, and CI polling steps without executing them.

6. Exit Codes
   - 0: All operations completed successfully (and CI passed if --wait-ci).
   - 1: Invalid arguments, missing files, semver validation errors, GitHub API failures, or CI failure/timeouts.

# Testing

1. Unit Tests
   - Mock yargs parsing to simulate flag combinations including --wait-ci, --dry-run, and ci-timeout paths.
   - Mock fs.readFile/writeFile, semver.valid/inc, execSync, and Octokit methods for getRef, createRef, createOrUpdateFileContents, and pulls.create.
   - Mock GitHub status and checks API to simulate passing, failing, and timeout scenarios. Verify correct polling behavior, success logging, and exit codes.
   - Validate dry-run mode logs all intended actions without calling file or API functions.

2. Integration Tests
   - In a temporary git repository with sample commits, run open-release-pr to verify patch bump, changelog update, branch creation, PR creation, and CI polling with a mocked GitHub server.
   - Test --wait-ci behavior by simulating GitHub Actions passing after a few polls, and simulate timeout or failure states.

# Documentation Updates

- Update README.md to describe the open-release-pr command with new flags --wait-ci and --ci-timeout, examples of waiting for CI completion, and dry-run usage.
- Update USAGE.md to include details for --wait-ci and --ci-timeout options under open-release-pr section.
- Ensure semver is listed in dependencies for version parsing and incrementing.features/AGENT_CONFIG_RESEED.md
# features/AGENT_CONFIG_RESEED.md
# AGENT_CONFIG_RESEED

## Overview

Add a reseed subcommand to the CLI that reads an agentic lib YAML configuration file, parses it, and outputs the configuration as JSON. This facilitates seeding and reseeding the repository with updated agentic lib driven settings.

## CLI Usage

- repository0-plot-code-lib reseed
- repository0-plot-code-lib reseed --config <path>
- repository0-plot-code-lib reseed -c <path>

When invoked, the tool reads the specified configuration file or defaults to agent config yaml in the project root, parses it using js yaml, and prints the JSON representation of the configuration.

## Implementation Details

1. Extend main js to detect the first CLI argument reseed and shift processing into reseed mode.
2. Accept a --config or -c option to specify the path to the YAML file.
3. Use fs promises readFile to load the YAML file asynchronously.
4. Parse the file content with js yaml load or safeLoad.
5. Log the parsed object via console log with JSON stringified output.
6. If the file cannot be read or parsed, exit with a non zero code and print an error to stderr.

## Testing

- Mock fs promises readFile to return a sample YAML string.
- Test that calling main with reseed and config path results in console log being called with the expected JSON string.
- Verify that errors in file read or YAML parsing are reported and cause process exit with non zero code.
features/RENDER_PLOT.md
# features/RENDER_PLOT.md
# Overview
Enhance the render-plot subcommand to use ChartJSNodeCanvas for full SVG and PNG output. Provide a consistent library API and CLI interface that allows users to generate charts programmatically or via the command line.

# CLI Usage
repository0-plot-code-lib render-plot --input <data.json> [--format svg|png] [--type <chartType>] [--width <px>] [--height <px>] [--background <color>] [--output <file>]

Options:
--input, -i       Path to a JSON file containing chart data and optional chart options.
--format, -f      Output format: svg (default) or png.
--type, -t        Chart type: line, bar, pie, radar, etc. (default: line).
--width           Canvas width in pixels (default: 800).
--height          Canvas height in pixels (default: 600).
--background, -b  Background color (default: transparent).
--output, -o      File path to write output; if omitted, write SVG to stdout or print PNG as Base64 string.

# Dependencies
Add to package.json dependencies:
- chart.js: for chart definitions
- chartjs-node-canvas: for headless rendering to SVG and PNG buffers

# Implementation Details
1. CLI Registration
- In src/lib/main.js, register a 'render-plot' command with yargs, defining options and handler.

2. Library API
- Export async function renderPlot(data, options) in a new module (e.g., src/lib/renderPlot.js).
- Instantiate ChartJSNodeCanvas with width, height, and background color.
- Call renderToBuffer when format is 'png' and renderToBuffer when format is 'svg', specifying MIME type 'image/svg+xml'.
- Return Buffer for PNG or string for SVG.

3. CLI Handler
- Read and parse the input JSON file via fs.promises.readFile.
- Merge CLI flags into chart data and options.
- Invoke renderPlot and obtain result.
- If output path provided, write Buffer or string to file with correct file extension; else write SVG string to stdout or console.log Base64 PNG.
- Use exit code 0 on success, 1 on input or render errors.

# Testing
1. Unit Tests
- tests/unit/render-plot.test.js: mock ChartJSNodeCanvas and its methods to return sample SVG string and PNG Buffer; verify renderPlot returns correct values.

2. CLI Tests
- tests/unit/cli-render-plot.test.js: invoke main with ['render-plot','--input',tmpJson,'--format','svg','--output',tmpFile]; assert file contents and exit code; test PNG Base64 output via stdout.

3. Integration Tests
- Run CLI end-to-end in temp directory with sample data.json; generate both SVG and PNG outputs; assert file existence and valid headers.

# Documentation Updates
- Update README.md to include render-plot command with examples for svg and png output.
- Update USAGE.md under 'render-plot' section to detail options and examples.
- Document renderPlot function signature and return types for library users.features/CHANGELOG_MANAGEMENT.md
# features/CHANGELOG_MANAGEMENT.md
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
  1. Similar test for release-patch: when CHANGELOG.md is missing, error suggests init-changelog and exit code 1.features/PLOT_SERVER.md
# features/PLOT_SERVER.md
# PLOT_SERVER

## Overview

Introduce a new `serve` subcommand that launches a lightweight HTTP server for interactive chart rendering. Users can send JSON payloads or use a built-in HTML form to post data and options to the server and receive rendered SVG or PNG charts in response. This enables rapid prototyping, embedded charts in browser-based dashboards, and integration with other services via REST.

## CLI Usage

- Start the server on the default port:
  repository0-plot-code-lib serve

- Specify a custom port and optional EJS template for the HTML form:
  repository0-plot-code-lib serve --port 4000 --template ./templates/chart-form.ejs

Options:
- `--port`, `-p`: Port number to listen on (default: 3000).
- `--template`, `-t`: Path to an EJS template that renders a data-input form (default: built-in minimal form).

## Implementation Details

1. **Entry Point**: In `src/lib/main.js`, detect the first argument `serve` and shift to server mode when invoked.

2. **Dependencies**:
   - Add `express` to dependencies and reuse `ejs` and `chartjs-node-canvas` from existing features.
   - Import:
     ```js
     import express from 'express'
     import bodyParser from 'body-parser'
     import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
     import path from 'path'
     ```

3. **Server Setup**:
   - Initialize an Express app, configure `bodyParser.json()` middleware for JSON requests.
   - Configure EJS as the view engine; set `views` to either the provided template directory or fallback to an internal template.

4. **Routes**:
   - **GET /**: Render an HTML form allowing users to paste JSON data and chart options. Fields: data (labels, series), format, type, size, background.
   - **POST /plot**: Accept a JSON payload with keys `data` and `options`, then:
     1. Instantiate `ChartJSNodeCanvas` with provided width, height, background.
     2. Generate a chart buffer or string via `renderToBuffer` (SVG) or `renderToBuffer` (PNG).
     3. Send the result with appropriate `Content-Type` (`image/svg+xml` or `image/png`).
   - **Error Handling**: Return HTTP 400 for invalid payloads, 500 for render errors.

5. **Startup**:
   - Listen on the configured port.
   - Log the listening URL to stdout.

## Testing

- **Unit Tests**:
  - Mock `express` and route handlers to ensure GET `/` invokes the correct render function with fallback template.
  - Mock `bodyParser` and `ChartJSNodeCanvas` to simulate rendering and verify correct status codes and headers in `/plot`.
  - Validate error responses when payload is missing required fields or rendering fails.

- **Integration Tests**:
  - Launch the server in a temporary environment on a random port.
  - Send a POST request to `/plot` with a sample JSON file and verify the response is a valid SVG string or PNG buffer.
  - Request the root path and assert the returned HTML contains form elements for JSON input.

## Documentation Updates

- **README.md**: Add a new section for the `serve` command with examples.
- **USAGE.md**: Document `serve` options, example requests, and expected responses.
- **dependencies file**: Add `express` to the `dependencies` block.
features/MISSION_UPDATE.md
# features/MISSION_UPDATE.md
# MISSION_UPDATE

# Overview
Add an update-mission subcommand to the CLI that regenerates MISSION.md to reflect currently supported CLI commands and list upcoming features for better alignment with the project mission.

# CLI Usage
- repository0-plot-code-lib update-mission [--preview]
- --preview: Show the updated mission content without writing to file.

# Implementation Details
1. Register a new update-mission command in src/lib/main.js using yargs.
2. Collect supported commands by reading USAGE.md headings or introspecting yargs command definitions.
3. Collect upcoming feature names by scanning the features directory for markdown files and extracting their headings.
4. Generate MISSION.md content:
   - Project title and description from README.md.
   - A list of supported CLI commands with brief summaries.
   - An "Upcoming Features" section listing feature names.
5. If --preview is set, print the generated content to stdout; otherwise overwrite MISSION.md with the new content.
6. Exit with code 0 on success and 1 on any error.

# Testing
- Mock fs.readFile and fs.writeFile, and simulate the features directory to verify the generated content.
- Test preview mode to confirm it logs content without writing to MISSION.md.
- Integration test: run the update-mission command in a sample repo and verify MISSION.md contains all expected sections.

# Documentation Updates
- Update README.md to include the update-mission command and its options along with example invocations.