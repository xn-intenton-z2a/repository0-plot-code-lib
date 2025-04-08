# CORE_ENGINE Feature Specification

## Description
This feature consolidates and refines the core plotting engine by merging diagnostics handling and numeric parameter validation into a unified module. It now integrates several key functionalities:

- **Advanced Plotting:** Supports multiple output formats including SVG, JSON, CSV, Markdown, ASCII, and HTML, with dedicated routines for various plot types (e.g., spiral, polar heatmap, dual axis, box plot, etc.).
- **Diagnostics Mode:** Activated with the `--diagnostics` flag, this mode runs self-tests and health checks (including parameter validation tests, advanced plotting dry-runs, and configuration verifications) and produces a detailed status report. This helps in rapid troubleshooting and ensures system integrity.
- **Numeric Parameter Validation:** Extracts and refines logic to validate and convert colon-delimited, comma-separated numeric inputs. The module now treats 'NaN' (case-insensitive) as a valid token, converting it to native JavaScript `NaN`, while providing clear error messages for invalid tokens.
- **Interactive Wizard Mode & Logging:** Incorporates an interactive CLI wizard (`--wizard` flag) for guided plot configuration and integrates a configurable logging subsystem with adjustable verbosity for real-time debugging and traceability.
- **Web Interface Integration:** Provides an Express-based web server supporting plot generation via a user-friendly HTML form. The web interface allows users to select plot types, input parameters, choose export formats, and view logs.

## Motivation
- **Unified Experience:** Merging diagnostics, validation, and plotting into a single module delivers a consistent CLI and web interface experience.
- **Improved Reliability:** Enhanced numeric validation and integrated diagnostics ensure that both user inputs and system configurations are correct and robust.
- **Better Troubleshooting:** The new diagnostics mode, coupled with detailed logging, allows rapid detection and resolution of issues across various subsystems.
- **Maintainability:** Consolidating related functionality simplifies the codebase and future development, reducing redundancy and potential code conflicts.

## Implementation Details
1. **Module Consolidation:**
   - Merge the diagnostic routines from the old DIAGNOSTICS feature and numeric validations from PARAM_VALIDATION into the core engine module.
   - Update the CLI parser in `src/lib/main.js` to detect the following flags:
     - `--advanced`: Trigger advanced plotting routines.
     - `--diagnostics`: Execute comprehensive system health checks.
     - `--wizard`: Initiate an interactive session for plot configuration.
     - `--export <format>`: Specify the desired output format for plots.

2. **Numeric Parameter Handling:**
   - Refactor numeric input parsing to split colon-delimited segments with comma-separated numbers.
   - Convert valid numeric tokens to JavaScript numbers, treating 'NaN' (case-insensitive) as native `NaN` and rejecting empty or non-numeric tokens with explicit error messages.

3. **Diagnostics Mode:**
   - Implement self-test routines including parameter validation tests and advanced plotting dry-runs.
   - Compile the results into a structured report displayed on the console and return appropriate summary status codes for CI/CD integration.

4. **Logging Subsystem and Interactive Wizard:**
   - Integrate logging across all modules to record significant runtime events with timestamps and configurable log levels (e.g., INFO, DEBUG, ERROR).
   - Develop an interactive CLI wizard mode to guide users through plot selection, parameter input (with validation), and export format decisions.

5. **Web Interface Enhancements:**
   - Extend the Express-based server (`src/web/app.js`) to support advanced plotting through a dynamic HTML form.
   - Incorporate backend validation and logging to ensure consistent behavior between CLI and web interactions.

6. **Testing and Documentation:**
   - Update tests to cover new diagnostics and numeric validation routines, along with interactive wizard operations and logging behavior.
   - Revise the README and CONTRIBUTING documents to document new usage examples, including CLI invocations and web interface operations.

## Usage Examples

**CLI Advanced Plotting:**
```bash
node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1" --export SVG
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
1. Start the web server:
   ```bash
   npm run start:web
   ```
2. Access the application at `http://localhost:3000` and use the form to generate plots.
