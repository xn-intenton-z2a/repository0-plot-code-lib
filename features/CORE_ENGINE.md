# CORE_ENGINE Feature Specification

## Overview
The CORE_ENGINE is the backbone of the plotting library and consolidates essential plotting functionalities, diagnostics, numeric parameter validation, interactive wizard, web interface integration, history logging, and now an integrated preview mode. Building on robust CLI and web-based interactions, CORE_ENGINE delivers a consistent user experience.

## Description
- **Advanced Plotting:** Supports multiple output formats including SVG, JSON, CSV, Markdown, ASCII, and HTML. It covers a variety of plot types such as spiral, polar heatmap, dual axis, box plot, violin plot, cumulative average, inverse function, modulated sine, extended 3D plot, test plot, contour plot, and scatter matrix.
- **Diagnostics Mode:** Activated using the `--diagnostics` flag. It runs self-tests, health checks, and configuration verifications, providing detailed troubleshooting insights.
- **Numeric Parameter Validation:** Uses a robust regex-based conversion system that handles integers, decimals, scientific notation, and multiple indicators for Not-a-Number (NaN). Supported NaN aliases include "NaN", "not a number", "notanumber", and "na" (case-insensitive and whitespace-tolerant).
- **Interactive Wizard Mode & Logging:** Guides users through plot configuration via the CLI wizard (`--wizard` flag) and offers real-time debugging logs.
- **Web Interface Integration:** Provides an Express-based server for generating plots via an HTML form, ensuring consistent behavior with the CLI operations.
- **History Logging:** Persists every executed plot command (including advanced plotting, diagnostics, wizard mode, and formula evaluation) with parameters and timestamps to a local JSON file. Users can view the command history with the `--history` flag.
- **Preview Mode:** A new addition to CORE_ENGINE, the preview mode allows users to simulate and preview plot configurations before full rendering. Triggered by the `--preview` flag, this mode validates parameters, summarizes plot attributes (e.g., type, expected dimensions, output format), and provides immediate feedback without executing the full plot generation. This is aimed at enhancing user confidence and reducing unnecessary computation.

## Implementation Details
1. **Flag Detection and Processing:**
   - Extend the CLI parser in `src/lib/main.js` to detect the new `--preview` flag. When present, bypass full plot generation and call a preview handler.
   - Reuse and integrate existing numeric validation and parameter parsing logic to ensure consistency.

2. **Preview Mode Functionality:**
   - Implement a new function `previewPlot` (within CORE_ENGINE) that takes in the plot type and parameters, validates them, and computes a summary of the expected plot output (such as anticipated output format, plot dimensions, and parameter summaries).
   - Ensure the preview output is user-friendly and clearly communicates what the full plot will render.

3. **Testing and Documentation:**
   - Add unit tests to cover preview mode behavior to ensure accurate parameter validation and summary output.
   - Update the README and CONTRIBUTING documentation to include usage examples for the `--preview` flag.

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