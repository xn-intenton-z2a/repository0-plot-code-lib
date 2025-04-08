# CORE_ENGINE Feature Specification

## Overview
The CORE_ENGINE is the backbone of the plotting library, consolidating advanced plotting functionalities, diagnostics, numeric parameter validation, an interactive wizard, web interface integration, enhanced help mode, and now persistent history logging. This feature provides a unified and consistent experience across both CLI and web-based interactions.

## Description
- **Advanced Plotting:** Supports multiple output formats including SVG, JSON, CSV, Markdown, ASCII, and HTML. It covers a variety of plot types such as spiral, polar heatmap, dual axis, box plot, violin plot, cumulative average, inverse function, modulated sine, and extended 3D plot.
- **Diagnostics Mode:** Activated using the `--diagnostics` flag. It runs self-tests, health checks, and configuration verifications, providing detailed troubleshooting insights.
- **Numeric Parameter Validation:** Robust handling of colon-delimited segments with comma-separated numeric tokens. It seamlessly converts valid numeric inputs (including integers, decimals, scientific notation, and the literal 'NaN' in any accepted alias) to native JavaScript numbers.
- **Interactive Wizard Mode & Logging:** Guides the user through plot configuration using the CLI wizard (`--wizard` flag) and offers real-time debugging logs.
- **Web Interface Integration:** Provides an Express-based server for generating plots via an HTML form, delivering a consistent experience with CLI operations.
- **Enhanced Help Mode:** Implements a dedicated `--help` flag that immediately displays a comprehensive help message, covering all available functionalities and usage examples.
- **History Logging:** Introduces persistent command history logging. Every executed plot command (including advanced plotting, diagnostics, wizard mode, and formula evaluation) is logged with its parameters and a timestamp to a local JSON file (e.g., `~/.plot_history.json`). The history can be reviewed using the `--history` flag, which displays a formatted list of previous commands to help users easily re-run or audit their past actions.

## Implementation Details
1. **Flag Detection and Processing:**
   - Update the CLI parser in `src/lib/main.js` to detect the new `--history` flag. When present, the program will bypass normal plotting operations and output the formatted command history.
   - Continue to detect existing flags such as `--advanced`, `--diagnostics`, `--wizard`, and `--help`.

2. **History Logging Mechanism:**
   - Integrate a logging utility within CORE_ENGINE that appends executed command details along with timestamps to a designated JSON file.
   - Ensure thread-safe and error-resistant logging operations, including file creation if it does not exist.
   - Format the JSON log file to be human-readable and easily parsable, supporting future enhancements such as filtering by command type.

3. **Testing and Documentation:**
   - Extend unit tests to cover the new history logging and retrieval functionality, ensuring that log entries are correctly appended and displayed.
   - Update README and CONTRIBUTING documentation with detailed usage examples for the `--history` flag, and instructions on how to view and clear history logs if needed.

## Usage Examples

**Standard Advanced Plotting:**
```bash
node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1"
```

**History Logging:**
```bash
node src/lib/main.js --history
```

**Diagnostics Mode:**
```bash
node src/lib/main.js --diagnostics
```

**Interactive Wizard Mode:**
```bash
node src/lib/main.js --wizard
```