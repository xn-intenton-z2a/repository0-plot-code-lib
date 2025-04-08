# CORE_ENGINE Feature Specification

## Description
This feature consolidates and refines the core plotting engine by integrating multiple functionalities into a unified module. It supports:

- **Advanced Plotting:** Enables multiple output formats (SVG, JSON, CSV, Markdown, ASCII, HTML) and supports various plot types (spiral, polar heatmap, dual axis, box plot, etc.).
- **Diagnostics Mode:** Activated with the `--diagnostics` flag, it runs self-tests, health checks, and configuration verifications, providing a detailed status report for rapid troubleshooting.
- **Numeric Parameter Validation:** Enhanced handling of colon-delimited segments with comma-separated numeric inputs. Validates tokens (treating 'NaN' as a valid value) and converts them to native numbers.
- **Interactive Wizard Mode & Logging:** Incorporates an interactive CLI wizard (`--wizard` flag) to guide users through plot configuration, along with a configurable logging subsystem for real-time debugging and traceability.
- **Web Interface Integration:** Offers an Express-based web server that supports plot generation through a dynamic HTML form, ensuring consistent behavior between CLI and web interactions.
- **Help Mode:** Introduces a new `--help` flag to display an overview of available commands, plot types, and usage examples. This mode provides users with quick guidance on how to invoke the various functionalities of the tool.

## Motivation
- **Unified Experience:** Delivering a consistent CLI and web interface experience by consolidating diagnostics, plotting, validation, and help functionalities.
- **Improved Usability:** The addition of a help mode makes it easier for new users to understand and use the tool effectively.
- **Enhanced Reliability and Maintenance:** Further streamlining of core functionalities supports better troubleshooting and easier future enhancements.

## Implementation Details
1. **Module Consolidation and CLI Parser Enhancements:**
   - Maintain existing advanced plotting, diagnostics, numeric validation, interactive wizard, and web functionalities.
   - Extend the CLI parser (in `src/lib/main.js`) to recognize a new `--help` flag. When detected, it displays a help message including:
     - An overview of all available modes and flags (`--advanced`, `--diagnostics`, `--wizard`, `--export <format>`, and the new `--help` flag).
     - A list of supported plot types and a brief description of each.
     - Usage examples mirroring the ones in the README.

2. **Integration with Existing Features:**
   - Ensure that if the `--help` flag is provided, it takes precedence and displays the help message without invoking other plot routines.
   - Preserve the behavior of other modes when their respective flags are used.

3. **Testing and Documentation:**
   - Update tests to verify that invoking `--help` displays the correct help message without error.
   - Update the README and CONTRIBUTING documents to include details on the new help mode and usage examples.

## Usage Examples

**Help Mode:**
```bash
node src/lib/main.js --help
```

**CLI Advanced Plotting Example:**
```bash
node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1"
```

**Diagnostics Mode:**
```bash
node src/lib/main.js --diagnostics
```

**Interactive Wizard Mode:**
```bash
node src/lib/main.js --wizard
```

**Web Interface:**
1. Start the server:
   ```bash
   npm run start:web
   ```
2. Visit `http://localhost:3000` to use the plotting form.
