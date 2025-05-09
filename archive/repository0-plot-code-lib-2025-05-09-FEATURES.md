features/RESEED_REPOSITORY.md
# features/RESEED_REPOSITORY.md
# Reseed Repository

Add a reseed subcommand to the CLI that reads the agent configuration and restores the repository from seed files in the seeds directory.

# Usage

Add reseed as a new command to the CLI. When invoked it examines the agent_config.yml schedule and seeding settings and copies the seed files over current source, test, README and package.json.

repository0-plot-code-lib reseed

# Behavior

1. Load agent_config.yml from project root
2. Verify repositoryReseed is true
3. Locate each seed file path for sourcePath, testsPath, dependenciesFilepath, readmeFilepath
4. Copy seed files into their target locations, overwriting existing content
5. Print a summary of files replaced and success status
6. Exit with status code 0 on success and nonzero on error

# Implementation Details

Use built-in filesystem and path modules to read and write files. Parse agent_config.yml with js-yaml. Add new tests to simulate reseeding with temporary files and assert that files have been overwritten correctly. Update README to document the reseed command. Update package.json scripts to include a reseed alias under start or bin configuration.