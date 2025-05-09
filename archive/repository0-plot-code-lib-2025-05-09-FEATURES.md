features/SEED_WORKFLOW.md
# features/SEED_WORKFLOW.md
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
4. Test behavior when `repositoryReseed` is false to ensure no copies occur.features/PLOT_COMMAND.md
# features/PLOT_COMMAND.md
# Overview

Add a new plot subcommand to the CLI that accepts a mathematical formula and generates a simple line plot as an SVG image. This enables users to quickly visualize functions without leaving the terminal.

# CLI Usage

repository0-plot-code-lib plot "<formula>" [options]

Options:
  --output <file>       Path to output SVG file, default plot.svg
  --width <pixels>      Width of the SVG canvas, default 800
  --height <pixels>     Height of the SVG canvas, default 600
  --range <min:max>     Domain for x axis, default -10:10

Examples:
  repository0-plot-code-lib plot "sin(x)" --output sin.svg
  repository0-plot-code-lib plot "x^2 - 3*x + 2" --range -5:5 --width 500 --height 500

# Implementation

1. Detect when the first argument is "plot" in src/lib/main.js.  If so, route to a new plotCommand handler.
2. Parse the formula string and options manually or via a minimal flag parser.  Validate presence of a formula.
3. Add mathjs as a dependency and use it to compile and evaluate the formula over a set of sample points.
4. Generate an SVG polyline path: compute N points evenly spaced across the specified range and join them into an SVG path element.
5. Assemble a complete SVG document with axes and the computed path, respecting width and height.
6. Write the SVG output to the specified file using fs/promises.
7. Exit with status 0 on success or nonzero on parsing or file errors, printing descriptive messages.

# Testing

1. Create tests in tests/unit/plot-command.test.js.  Mock fs/promises to capture write calls.
2. Test correct exit when missing formula or invalid range.
3. Provide a simple formula, invoke main(['plot','x+1','--output','out.svg']), and verify mathjs is called and fs.writeFile is called with an SVG string containing a <polyline>.
4. Test default values: no flags yields plot.svg with default dimensions and range.
5. Ensure errors in evaluation produce nonzero exit and descriptive error output.

# Documentation

Update README.md to include the new plot subcommand in the Usage section and provide examples.  Document plotCommand as part of the public API.