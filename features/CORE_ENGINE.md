# CORE_ENGINE Feature Specification

## Overview
The CORE_ENGINE is the backbone of the plotting library, consolidating advanced plotting functionalities, diagnostics, numeric parameter validation, interactive wizard, web interface integration, and an enhanced help mode. This feature provides a unified and consistent experience across both CLI and web-based interactions.

## Description
- **Advanced Plotting:** Supports multiple output formats including SVG, JSON, CSV, Markdown, ASCII, and HTML. It covers a variety of plot types such as spiral, polar heatmap, dual axis, box plot, violin plot, cumulative average, inverse function, modulated sine, and extended 3D plot.
- **Diagnostics Mode:** Activated using the `--diagnostics` flag. It runs self-tests, health checks, and configuration verifications, providing detailed troubleshooting insights.
- **Numeric Parameter Validation:** Robust handling of colon-delimited segments with comma-separated numeric tokens. It seamlessly converts valid numeric inputs (including integers, decimals, scientific notation, and the literal 'NaN' in any case) to native JavaScript numbers.
- **Interactive Wizard Mode & Logging:** Guides the user through plot configuration using the CLI wizard (`--wizard` flag) and offers real-time debugging logs.
- **Web Interface Integration:** Provides an Express-based server for generating plots via an HTML form, delivering a consistent experience with CLI operations.
- **Enhanced Help Mode:** Implements a dedicated `--help` flag that immediately displays a comprehensive help message and bypasses further processing. The help message includes:
  - An overview of available functionalities
  - Detailed explanations of flags and use-cases including advanced plotting, diagnostics, interactive wizard, and numeric parameter handling
  - Usage examples for both CLI and web interactions

## Implementation Details
1. **Flag Detection and Processing:**
   - Update the CLI parser in `src/lib/main.js` to check for flags such as `--advanced`, `--diagnostics`, `--wizard`, and `--help` early in the execution process.
   - If `--help` is detected, generate and display a detailed help message covering commands, usage examples, plot types, and integrated functionalities.

2. **Numeric Validation:**
   - Utilize regex-based validation to ensure robust conversion of numeric tokens. Convert any token matching 'NaN' (case insensitive) to the native JavaScript NaN.
   - Support both simple and colon-separated parameters with proper error messages on invalid inputs.

3. **Integrated Help Mode:
   - Interrupt standard command processing when the `--help` flag is provided.
   - Ensure that the help mode outputs a complete guide that covers all aspects of the CORE_ENGINE functionality.
   - Include examples covering advanced plotting, diagnostics, interactive wizard, and numeric validation.

4. **Testing and Documentation:**
   - Extend unit tests to validate help mode behavior and ensure the help message is complete and accurate.
   - Update README and CONTRIBUTING documentation to reflect the enhanced help mode and any changes to CLI flag processing.

## Usage Examples

**Help Mode:**
```bash
node src/lib/main.js --help
```

**Advanced Plotting:**
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
