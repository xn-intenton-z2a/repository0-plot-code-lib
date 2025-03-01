# `plot-code-lib`

## Overview

`plot-code-lib` is a demo repository that showcases GitHub workflows imported from intentïon agentic‑lib. It serves as a seed for the Equation Plotter — a CLI tool that generates plots for mathematical functions including quadratic, linear, sine, cosine, polar, exponential, and logarithmic functions. The tool supports multiple output formats (SVG, JSON, CSV, Markdown, ASCII, and HTML) and includes the following features:

- **Interactive Mode:** Allows real-time user input via the `--interactive` flag.
- **Default Behavior:** When no arguments are provided, the tool prints a usage message, outputs a demo SVG file (`output.svg`) with example plots, and terminates immediately.
- **Automatic Format Selection:** The output format is inferred from flags or the extension of the output file name (e.g., `.md` for Markdown).
- **Improved Consistency:** Code has been refactored for better consistency in structure and formatting in line with our contributing guidelines.
- **Extended Functionality:** A stub for PNG conversion has been added (via the `plotToPng` function), explicitly throwing a "PNG conversion is not implemented yet." error, paving the way for future enhancements.

**Version:** Equation Plotter Library version 0.2.1-9

Generated using:
```
npm run start output.png
```
[Example output](examples/output.png)

## What’s Inside

- **GitHub Workflows:**
  Workflows in the `.github/workflows/` directory consume reusable workflows from intentïon agentic‑lib.

- **Source Code:**
  The main functionality is implemented in `src/lib/main.js`, including plotting logic, formula parsing, and CLI management. It adheres to the guidelines outlined in [CONTRIBUTING.md](CONTRIBUTING.md) and reflects our mission: "Be a go-to plot library with a CLI, be the jq of formulae visualisations." 

- **Dependencies:**
  The `package.json` file lists dependencies required for CLI argument parsing, file generation, testing, and various output conversions.

- **Tests:**
  Unit tests in `tests/unit/` validate core functions, CLI behavior (including interactive mode and default demo output), error handling, and additional exported functions. New tests ensure the PNG conversion stub correctly throws a not implemented error.

- **Documentation & Contributions:**
  We welcome contributions! Please ensure your changes adhere to our [CONTRIBUTING.md](CONTRIBUTING.md) guidelines. Our automated contribution workflow using intentïon agentic‑lib ensures every contribution aligns with our project standards and mission.

## Running the CLI

- **No Arguments (Default Demo Output):**
  When run without arguments, the CLI prints a usage message, creates an `output.svg` file with demo plots, and terminates immediately. For example:
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
  (Automatically detected if the output file ends with `.md` or using the `--md` flag):
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

Future plans include:

- **Advanced Rotation and Custom Titles:** Allow users to specify rotation angles and custom plot titles.
- **Summary Statistics:** Provide summary statistics for each plotted function.
- **PNG Conversion:** Currently a stub; future releases will enable full PNG export functionality.
- **Enhanced Interactive Mode:** Streamline real-time user interactions.

## Linting

ESLint and Prettier are used for code quality and formatting. The `no-console` rule is disabled in `src/lib/main.js` to permit necessary CLI output.

## Test Coverage

Unit tests cover core CLI functions, exported methods, and error handling. They are located in the `tests/unit/` directory.

## Tuning the Agentic Coding System

As the project evolves, tune the following files:

- `README.md`
- `package.json`
- `src/lib/main.js`
- `tests/unit/main.test.js`
- `CONTRIBUTING.md`
- `eslint.config.js`

## Contributing

Interested in contributing? Please review our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our automated contribution process using intentïon agentic‑lib. Your contributions are vital to our project’s evolution, and adherence to these guidelines ensures every contribution aligns with our mission: "Be a go-to plot library with a CLI, be the jq of formulae visualisations." 

## Diary of an Agentic Coding System - Day 1

In its early hours, `plot-code-lib` emerged with the revolutionary idea of transforming mathematical formulae into visual plots. Initially featuring quadratic curves and sine waves, the functionality has now expanded to include linear, cosine, polar, exponential, and logarithmic plots. This release improves consistency in code structure and documentation, aligning CLI behavior with our contribution guidelines.

**Version:** Equation Plotter Library version 0.2.1-9
