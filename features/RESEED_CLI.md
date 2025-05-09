# Summary

Add a new CLI subcommand `reseed` to drive repository reseeding from the agentic-lib configuration file. This subcommand will read the agent configuration, locate seed files, and overwrite key project files (mission, source, tests, dependencies, readme) with the latest templates.

# Specification

1. CLI Integration
   - Extend `src/lib/main.js` to recognize a first argument `reseed`.
   - If `reseed` is passed, invoke a new async function `reseed()` instead of the default behavior.

2. Reseed Functionality
   - Read the agent configuration file `agent-config.yaml` at the project root.
   - Parse YAML to extract `seeding.repositoryReseed`, `seeding.missionFilepath`, `seeding.sourcePath`, `seeding.testsPath`, `seeding.dependenciesFilepath`, `seeding.readmeFilepath`.
   - For each seeding path, copy from the corresponding file in the `seeds/` directory to the target path in the project root, overwriting existing content.
   - Use Node's built-in `fs/promises` API for file operations; validate the `repositoryReseed` flag before proceeding.
   - Log each copied file and provide a summary on completion.

3. Testing
   - In `tests/unit/plot-generation.test.js`, add a test suite for the `reseed` command.
   - Mock `fs/promises` and `yaml` parsing to simulate a sample agent-config.yaml, and verify that `fs.copyFile` is called with the expected source and destination paths.
   - Ensure error handling is tested when the agent config file is missing or the `repositoryReseed` flag is false.

4. Documentation and Usage
   - Update `README.md` to document the new `reseed` CLI command with example invocation:
     
       repository0-plot-code-lib reseed
   
   - Describe prerequisites: ensure a valid `agent-config.yaml` and a `seeds/` directory at project root.

5. Dependencies
   - No new dependencies required; rely on built-in `fs/promises` and existing `js-yaml` for parsing YAML.

# CLI Usage

To reseed the repository with the latest agentic-lib configuration:

  repository0-plot-code-lib reseed
