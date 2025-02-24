# `plot-code-lib`

## Overview

`plot-code-lib` is a demo repository that showcases GitHub workflows imported from intentïon agentic‑lib. It serves as a seed for the Equation Plotter—a CLI tool that generates plots for mathematical functions including quadratic, linear, sine, cosine, polar, exponential, and logarithmic functions. The tool supports multiple output formats (SVG, JSON, CSV, Markdown, ASCII, and HTML) and includes the following features:

- **Interactive Mode:** Allows real-time user input via the `--interactive` flag.
- **Default Behavior:** When no arguments are provided, the tool prints a usage message, outputs a demo SVG file (`output.svg`), and terminates immediately without waiting for user input.
- **Automatic Format Selection:** The output format is inferred from flags or the extension of the output file name (e.g., `.md` for Markdown, `.txt` for ASCII).
- **Improved Error Handling & Consistency:** Robust input validation and consistent code formatting ensure maintainability. Recent updates ensure that the CLI defaults to usage and demo output, and terminates execution promptly.

## What’s Inside

- **GitHub Workflows:**
  Workflows in the `.github/workflows/` directory consume reusable workflows from intentïon agentic‑lib.

- **Source Code:**
  The main functionality is implemented in `src/lib/main.js`, including plotting logic, formula parsing, and CLI management. Recent updates ensure that running the CLI without input prints the usage and a demo output, then exits without waiting for user input.

- **Dependencies:**
  The `package.json` file lists dependencies required for CLI argument parsing, file generation, testing, and various output conversions.

- **Tests:**
  Unit tests in `tests/unit/` validate core functions, CLI behavior (including interactive mode and default demo output), error handling, and additional exported functions to improve test coverage.

- **Documentation:**
  This `README.md` explains repository usage and the evolution of the Equation Plotter CLI.

## Running the CLI

- **No Arguments (Default Demo Output):**
  When run without arguments, the CLI prints a usage message, creates an `output.svg` file with demo plots, and exits immediately. For example:
  ```bash
  node src/lib/main.js
  ```

- **Generate JSON Output:**
  ```bash
  node src/lib/main.js output.json "sine:1,1,0,0,360,30"
  ```

- **Generate CSV Output:**
  ```bash
  node src/lib/main.js output.csv "quad:1,0,0,-10,10,1"
  ```

- **Generate Markdown Output:**
  Automatically detected if the output file ends with `.md` or using the `--md` flag:
  ```bash
  node src/lib/main.js output.md "y=2x+3:-10,10,1"
  ```

- **Generate ASCII Art Output:**
  ```bash
  node src/lib/main.js output.txt "sine:1,1,0,0,360,30"
  ```

- **Generate HTML Output with Grid Overlay:**
  ```bash
  node src/lib/main.js output.html --grid "y=2x+3:-10,10,1"
  ```

- **Interactive Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```
  You will be prompted to enter semicolon-separated formula strings.

Other available flags include `--help`/`-h` for help and `--version` to display version information.

## Future Enhancements

While the Equation Plotter CLI is fully functional, the following features are planned for future implementation:

- **Advanced Rotation and Custom Titles:** Allow users to specify rotation angles and custom titles for plots.
- **Summary Statistics:** Include summary statistics for each plot.
- **PNG Conversion:** Enable exporting plots as PNG images.
- **Enhanced Interactive Mode:** Improve the CLI for a smoother real-time user experience.

_Upcoming features will further extend the capabilities of the Equation Plotter._

## Linting

ESLint and Prettier are used for code quality and formatting. The `no-console` rule is disabled in `src/lib/main.js` to permit necessary CLI output.

## Test Coverage

Unit tests have been expanded to cover additional CLI functions and exported methods to ensure robust error handling and correct output across all formats. They are located in the `tests/unit/` directory.

## Tuning the Agentic Coding System

As the project evolves, you can tune the following files:

- `README.md`
- `package.json`
- `src/lib/main.js`
- `tests/unit/main.test.js`
- `CONTRIBUTING.md`
- `eslint.config.js`

## Diary of an Agentic Coding System - Day 1

In its early hours, `plot-code-lib` emerged with the revolutionary idea of transforming mathematical formulae into visual plots. Initially featuring quadratic curves and sine waves, the functionality has expanded to include linear, cosine, polar, exponential, and logarithmic plots. This release aligns the CLI behavior with the contributing guidelines, ensuring that a default usage message and demo output are displayed when no input is provided, and that the program terminates without waiting for additional user input.

**Version:** Equation Plotter Library version 0.2.0-17
