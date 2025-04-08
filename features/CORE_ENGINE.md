# CORE_ENGINE Feature Specification

## Description
This feature consolidates the core plotting, diagnostics, parameter validation, interactive wizard, web interface integration, and now an enhanced help mode into a unified module. It supports:

- **Advanced Plotting:** Enables multiple output formats (SVG, JSON, CSV, Markdown, ASCII, HTML) and supports various plot types (spiral, polar heatmap, dual axis, box plot, etc.).
- **Diagnostics Mode:** Activated with the `--diagnostics` flag, it runs self-tests, health checks, and configuration verifications to provide detailed troubleshooting insights.
- **Numeric Parameter Validation:** Robust validation and conversion of colon-delimited segments containing comma-separated numeric tokens. Special handling is provided for the literal string 'NaN' (case insensitive), converting it to the native JavaScript NaN.
- **Interactive Wizard Mode & Logging:** A CLI wizard (`--wizard` flag) guides users through plot configuration along with real-time debugging logs.
- **Web Interface Integration:** Exposes an Express-based web server for plot generation from an HTML form, ensuring a consistent experience with the CLI.
- **Help Mode:** Introduces a new `--help` flag that, when invoked, bypasses all other operations to display a comprehensive help message. This help message details available commands, flags, usage examples, and plot types.

## Motivation
- **Unified Experience:** Combining all plotting routines and support functionalities into one feature ensures consistency across CLI and web environments.
- **Enhanced Usability:** The addition of a dedicated help mode improves onboarding and user friendliness by giving immediate guidance.
- **Improved Reliability:** Comprehensive numeric validation and diagnostics reduce runtime errors.

## Implementation Details
1. **Flag Detection:**
   - Enhance the CLI parser in `src/lib/main.js` to check for the `--help` flag early in the processing sequence.
   - When `--help` is detected, immediately output a detailed help message and bypass any further processing.

2. **Help Message Content:**
   - The help message should include an overview of available functionality including:
     - **Advanced Plotting:** List supported plot types with short descriptions.
     - **Diagnostics Mode:** Explain the `--diagnostics` flag usage.
     - **Interactive Wizard:** Detail the benefits and usage of `--wizard` mode.
     - **Numeric Parameter Handling:** Describe the numeric validation, including how comma-delimited numbers and the 'NaN' token are processed.
     - **Web Interface:** Outline the endpoints available for web-based plotting.

3. **Integration and Testing:**
   - Ensure that the help mode interrupts any ongoing process so that only the help message is displayed.
   - Update and add unit tests to verify that when `--help` is provided, the output contains all relevant documentation and bypasses other functionalities.
   - Update the README and CONTRIBUTING documents to include detailed help mode usage and flags explanation.

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
