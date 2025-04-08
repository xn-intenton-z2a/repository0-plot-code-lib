# CORE_ENGINE Feature Specification

## Description
This feature consolidates and refines the core plotting capabilities of the repository by integrating multiple functionalities into a unified module. It supports:

- **Advanced Plotting:** Enables multiple output formats (SVG, JSON, CSV, Markdown, ASCII, HTML) and supports various plot types (spiral, polar heatmap, dual axis, box plot, etc.).
- **Diagnostics Mode:** Activated with the `--diagnostics` flag, it runs self-tests, health checks, and configuration verifications, providing a detailed status report for troubleshooting.
- **Numeric Parameter Validation:** Enhanced validation and conversion of numeric parameters. It accepts colon-delimited segments with comma-separated numeric tokens. The literal string 'NaN' (case insensitive) is correctly converted to the native JavaScript NaN value and numeric strings are converted appropriately.
- **Interactive Wizard Mode & Logging:** Provides an interactive CLI wizard (`--wizard` flag) that guides users through plot configuration and offers configurable logging for real-time debugging.
- **Web Interface Integration:** Offers an Express-based web server that supports plot generation through a dynamic HTML form, ensuring consistency with the CLI experience.
- **Help Mode:** Introduces a new `--help` flag that displays a comprehensive help message covering available commands, supported plot types, flag options, and usage examples. This mode takes precedence over other operations when activated.

## Motivation
- **Unified Experience:** By consolidating multiple plotting and diagnostic functionalities into one feature, users experience a consistent interface across both CLI and web environments.
- **Improved Usability:** The addition of the help mode improves onboarding and documentation, offering quick guidance on using various commands and flags.
- **Enhanced Reliability:** Built-in diagnostics and improved parameter handling reduce runtime errors and facilitate easier troubleshooting.

## Implementation Details
1. **CLI Parser Enhancements:**
   - Modify the CLI parser in `src/lib/main.js` to detect the `--help` flag.
   - If the `--help` flag is provided, display a help message that lists:
     - An overview of all available modes: advanced plotting (`--advanced`), diagnostics (`--diagnostics`), interactive wizard (`--wizard`) and help (`--help`).
     - Supported plot types with short descriptions for each, drawing from usage examples in the README.
   - Ensure that the help mode interrupts any ongoing plotting or diagnostic operations so that only the help message is displayed.

2. **Integration with Existing Functionality:**
   - Preserve all current functionalities (advanced plotting, diagnostics, numeric validation, interactive wizard, and web interface integration) when the `--help` flag is not used.
   - When `--help` is detected, bypass other processing steps and display the help message exclusively.

3. **Testing and Documentation:**
   - Update unit tests to include a test case verifying that invoking the CLI with `--help` displays the complete help message without triggering other routines.
   - Update the README and CONTRIBUTING documents to detail the usage, flags, and available commands including the new help mode.

## Usage Examples

**Help Mode:**
```bash
node src/lib/main.js --help
```

**Advanced Plotting Example:**
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
2. Open a browser and navigate to `http://localhost:3000`.
