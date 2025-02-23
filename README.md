# `plot-code-lib`

## Overview

`plot-code-lib` is a demo repository that showcases the GitHub workflows imported from intentïon agentic‑lib. Its primary purpose is to demonstrate automated CI/CD workflows and serves as a seed for the Equation Plotter—a CLI tool that generates plots for mathematical functions including quadratic, linear, sine, cosine, polar, exponential, and logarithmic functions. The tool supports multiple output formats (SVG, JSON, CSV, Markdown, ASCII, and HTML) and offers additional features:

- **Interactive Mode:** Allows real-time user input via the `--interactive` flag.
- **Default Behavior:** When no arguments are provided, the tool prints a usage message, outputs a demo SVG file (`output.svg`), and terminates immediately without waiting for user input.
- **Improved Error Handling & Consistency:** Enhanced input validation and consistent code formatting for better maintenance.

## What’s Inside

- **GitHub Workflows:**
  Workflows in the `.github/workflows/` directory consume reusable workflows from intentïon agentic‑lib.

- **Source Code:**
  The main functionality resides in `src/lib/main.js`. This file implements the plotting logic, various parsing functions, and the CLI. The CLI defaults to printing a usage message and a demo SVG file (`output.svg`) when no arguments are provided, then exits immediately.

- **Dependencies:**
  The dependencies in `package.json` support functionalities including CLI argument parsing, file generation, testing, and output conversion.

- **Tests:**
  Unit tests located in `tests/unit/` validate core functionalities and ensure correct CLI behavior (including interactive mode and default demo output) as well as error handling.

- **Docs:**
  This `README.md` documents repository usage and tracks the evolution of the Equation Plotter CLI.

## Getting Started

This repository is preconfigured with essential workflows and scripts. Ensure you provide the required secrets:
- `CHATGPT_API_SECRET_KEY`

You can set these in your repository settings under *Settings > Secrets and Variables > Actions*. They are crucial for automated workflows like publishing packages and managing issues.

### Running the CLI

When you run the CLI with no arguments, it prints a usage message, outputs an SVG file named `output.svg`, and exits immediately.

- Run with no arguments (default demo output):
  ```bash
  node src/lib/main.js
  ```
  This will print a usage message, create an `output.svg` file in the current directory, and terminate.

- Generate JSON output:
  ```bash
  node src/lib/main.js output.json "sine:1,1,0,0,360,30"
  ```

- Generate CSV output:
  ```bash
  node src/lib/main.js output.csv "quad:1,0,0,-10,10,1"
  ```

- Generate Markdown output:
  ```bash
  node src/lib/main.js output.md "y=2x+3:-10,10,1"
  ```

- Generate ASCII art output:
  ```bash
  node src/lib/main.js output.txt "sine:1,1,0,0,360,30"
  ```

- Generate HTML output with grid overlay:
  ```bash
  node src/lib/main.js output.html --grid "y=2x+3:-10,10,1"
  ```

- **Interactive Mode:**
  Engage real-time input with:
  ```bash
  node src/lib/main.js --interactive
  ```
  You will be prompted to enter semicolon-separated formula strings.

Other available flags:

- `--help` or `-h`: Display detailed usage instructions.
- `--json`, `--csv`, `--ascii`, `--md`, `--html`: Select the respective output format.
- `--grid`: Overlay grid lines on the generated SVG plots.
- `--debug`: Output internal parsed plot data for troubleshooting.
- `--interactive`: Enable interactive mode for real-time user input.
- `--version`: Show version information.

## Linting

The project uses ESLint to enforce code quality and consistency. The `no-console` rule has been disabled in `src/lib/main.js` to support necessary CLI output.

## Test Coverage

Unit tests verify core functions, CLI behavior (including interactive mode and default demo output), and error handling. These tests help ensure that enhancements do not break existing functionality.

## Future Enhancements

While the Equation Plotter CLI is fully functional:

- **Performance Optimization:** Further refine SVG rendering logic and plotting algorithms.
- **Enhanced Interactive CLI:** Improve the interactive mode for a smoother user experience.
- **Advanced Error Handling:** Continue refining error management and logging.
- **Additional Output Formats:** Explore integration with advanced plotting libraries for extended formats.
- **Mobile-Friendly Outputs:** Optimize visuals for different device displays.

## Tuning the agentic coding system

The current setup is open for future tuning. Modify the key files below as the project evolves:

- `README.md`
- `package.json`
- `src/lib/main.js`
- `tests/unit/main.test.js`

Other files taken into account by our workflows include:

- `CONTRIBUTING.md` - Contribution guidelines for the project
- `eslint.config.js` - Linting and formatting configuration

## Diary of an agentic coding system - Day 1

(An exploration of our repository's evolution through the Equation Plotter Library's development.)

In its early hours, `plot-code-lib` emerged with the revolutionary idea of transforming mathematical formulae into visual plots. Initially featuring quadratic curves and sine waves, the functionality has been expanded to include linear, cosine, polar, exponential, and logarithmic plots. This release aligns the CLI features with our contributing guidelines by removing unsupported features such as rotation, custom titles, summary statistics, and PNG conversion.

**Version:** Equation Plotter Library version 0.2.0-15
