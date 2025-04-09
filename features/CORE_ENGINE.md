# CORE_ENGINE Feature Specification

## Overview
The CORE_ENGINE is the backbone of the plotting library. It consolidates essential plotting functionalities including advanced plotting, diagnostics, numeric parameter validation, an interactive CLI wizard, integrated preview mode, a built-in help system, web interface integration, and history logging. This unified engine ensures a consistent experience across CLI and web interactions.

## Description
- **Advanced Plotting:** Supports multiple output formats (SVG, JSON, CSV, Markdown, ASCII, HTML) and various plot types such as spiral, polar heatmap, dual axis, box plot, violin plot, cumulative average, inverse function, modulated sine, extended 3D plot, test plot, contour plot, and scatter matrix.

- **Diagnostics Mode:** Activated using the `--diagnostics` flag. Runs self-tests, health checks, and configuration verifications to provide detailed troubleshooting insights.

- **Numeric Parameter Validation:** Implements robust regex-based numeric validation including integers, decimals, scientific notation, and handles multiple accepted aliases for Not-a-Number (NaN): "NaN", "not a number", "notanumber", and "na" (case-insensitive and whitespace-tolerant). Provides explicit error messages for near miss tokens like "n/a".

- **Interactive Wizard Mode & Logging:** Guides users through plot configuration via the CLI wizard (triggered by `--wizard`) and logs real-time debugging information.

- **Preview Mode:** Triggered by the `--preview` flag. Validates parameters, summarizes plot attributes (type, expected dimensions, output format), and provides immediate feedback without executing full plot rendering.

- **Built-in CLI Help:** Introduces a comprehensive help system accessible with the `--help` flag. When triggered, the engine displays detailed usage instructions, descriptions of available commands and flags, and examples. This feature consolidates documentation from the README and CONTRIBUTING files to assist users in navigating the CLI.

- **Web Interface Integration:** Provides an Express-based server for generating plots via an HTML form, ensuring the web interface behavior is consistent with the CLI.

- **History Logging:** Persists every executed plot command (advanced plotting, diagnostics, wizard mode, formula evaluations, and help requests) along with parameters and timestamps into a local JSON file. The `--history` flag allows users to review past commands.

## Implementation Details
1. **CLI Parser Enhancements:**
   - Extend the CLI parser in `src/lib/main.js` to detect new flags: `--preview` for preview mode and `--help` for help.
   - For the `--help` flag, bypass other operations and invoke the integrated help handler which outputs a structured guide on available commands and usage examples.

2. **Help Handler Function:**
   - Develop a `displayHelp` function that compiles usage instructions from the repository documentation. This function should format output with clear sections describing available plotting modes (advanced, diagnostics, wizard, preview) and include examples.
   - Ensure that the help output is concise yet comprehensive, making it easier for users to understand the plotting commands and their respective parameters.

3. **Integration and Testing:**
   - Integrate the help handler with the main control flow in `src/lib/main.js` so that when `--help` is detected, it outputs the help message and exits gracefully.
   - Augment unit tests (e.g., in `tests/unit/main.test.js`) to verify help output and ensure that invoking the help flag does not interfere with other modes.
   - Update the README and CONTRIBUTING documentation to include instructions on using the built-in help system.

## Usage Examples

**Advanced Plotting:**
```bash
node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1"
```

**Preview Mode:**
```bash
node src/lib/main.js --preview spiral "1,NaN,5,-10,10,1"
```

**Diagnostics Mode:**
```bash
node src/lib/main.js --diagnostics
```

**Interactive Wizard Mode:**
```bash
node src/lib/main.js --wizard
```

**CLI Help Mode:**
```bash
node src/lib/main.js --help
```

This updated CORE_ENGINE not only supports the comprehensive range of plotting functionalities but also empowers users with clarity through the integrated help system, ensuring a superior and accessible user experience.