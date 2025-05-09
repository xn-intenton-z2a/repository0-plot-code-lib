# Overview

Implement a seed workflow subcommand in the CLI that reads the seeding configuration from package.json and copies predefined seed files into their respective target locations. This enables maintainers to quickly reset or reseed repository-critical files based on the workflow changes defined in seeding settings.

# Configuration

Read the `seeding` section under the root of package.json. It contains mappings for seed source files and target destinations:

  "seeding": {
    "repositoryReseed": "true",
    "missionFilepath": "seeds/zero-MISSION.md",
    "sourcePath": "seeds/zero-main.js",
    "testsPath": "seeds/zero-tests.js",
    "dependenciesFilepath": "seeds/zero-package.json",
    "readmeFilepath": "seeds/zero-README.md"
  }

When the seed subcommand runs, for each key ending in Filepath or Path, copy the file from the specified source under the repository root into the matching path in the repository. Overwrite existing files.

# CLI Usage

Add a new subcommand `seed` alongside the default invocation. Examples:

  repository0-plot-code-lib seed

This will:

 1. Load package.json
 2. Parse the `seeding` mapping
 3. For each mapping entry copy source→destination
 4. Log the list of files copied
 5. Exit with status 0

# Behavior

1. Exit early if `repositoryReseed` is not set to `true` in package.json.
2. Validate existence of each seed source; if missing, print a warning and continue.
3. Use native `fs/promises` and `path` modules; no extra dependencies.
4. Ensure permissions and file modes are preserved.

# Testing

Add unit tests under `tests/unit/seed-workflow.test.js` to:

1. Mock `fs/promises` to capture copy operations.
2. Provide a fake package.json in a temporary directory.
3. Invoke `main(["seed"])` and verify correct file copy calls and exit behavior.
4. Test behavior when `repositoryReseed` is false to ensure no copies occur.