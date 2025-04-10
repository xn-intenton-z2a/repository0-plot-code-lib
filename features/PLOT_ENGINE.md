# PLOT_ENGINE Feature Specification (Enhanced with Data Import, Unit Conversion, Cache Inspection, Template Management, SVG EXPORT, Interactive Preview, and Live Update Preview)

## Overview
This feature provides the core plotting capabilities for evaluating mathematical expressions and generating clear visual representations, including ASCII plots and scalable vector graphics (SVG) exports. In this update, the feature is extended to support data import from external files alongside the existing functionalities. Additionally, a new interactive preview mode has been integrated that now includes a dynamic live update preview, allowing users to see immediate changes to plots as they iteratively modify formulas or configuration parameters. This expansion enhances flexibility, user feedback, and workflow efficiency while preserving robust unit conversion, caching, and template management mechanisms.

## Implementation Details
### Expression Evaluation and Data Import
- **Expression Evaluation:** Utilizes mathjs to parse and compute data points over a specified interval using a given formula, interval, and step size.
- **Data Import Integration:**
  - Introduces a new CLI flag (e.g., `--import-data <filepath>`) that allows users to provide a path to a CSV or JSON file containing external data.
  - Implements lightweight parsers for CSV and JSON formats to load and validate imported data.
  - Offers options to overlay the imported data on computed results or replace them entirely, depending on user preference.
  - Includes error handling and default fallbacks in case of parsing issues or invalid data formats.

### ASCII Plotting and SVG Export
- **ASCII Plotting:** Maps computed or imported data onto an ASCII grid, with optional color enhancements for clear terminal visualization.
- **Export Options:**
  - Supports export in ASCII or JSON formats via the `--export` flag.
  - **SVG Export Capability:** A dedicated CLI flag (`--export-svg`) enables users to generate high-quality SVG files, ideal for digital publications and presentations.
  - Provides configuration options for output dimensions and styling to suit diverse publishing needs.

### Integrated Caching and Inspection
- **Caching Mechanism:**
  - Uses an in-memory cache (via a JavaScript Map) keyed by a hash of parameters (formula, interval, step, color, and data import details).
  - Assigns Time-To-Live (TTL) values to cache entries to ensure automatic invalidation of stale data.
  - Offers a manual flush option with the `--clear-cache` flag.
- **Cache Inspection:** Implements a CLI flag (`--inspect-cache`) that lists active cache keys along with metadata and TTL values, and provides an interactive mode for selective management.

### Unit Conversion and Template Management
- **Unit Conversion:**
  - Integrates conversion flags (`--input-unit` and `--output-unit`) into the data processing pipeline to standardize units across formula evaluation and imported data.
- **Template Management:**
  - Allows users to save current plotting configurations—including formulas, data import settings, unit preferences, and visual styles—as reusable templates stored in a JSON file.
  - Facilitates listing available templates with a `--list-templates` flag and reloading via `--apply-template <template_name>` for quick reinitialization.

### Interactive Plot Preview and Live Update Preview
- **Interactive Plot Preview:**
  - Introduces a new CLI flag (`--preview`) that provides an immediate, simplified ASCII preview of the plot based on current parameters.
  - Allows users to quickly assess the plot layout and data representation before proceeding with full rendering or export.
  - Integrates with existing caching and configuration systems to ensure that the preview accurately reflects both computed and imported data.
  - Provides inline feedback and suggestions for adjustments, enhancing user experience during iterative plot development.
- **Live Update Preview:**
  - Enhances the interactive preview mode with real-time updates, allowing users to modify formulas or settings and immediately see preview changes in the terminal.
  - Utilizes optimized event listeners and debounced input handlers to provide a seamless live updating experience without overwhelming system resources.
  - Supports both command-line and configuration file triggered refreshes, ensuring the live preview stays synchronized with user inputs.

## Testing and Documentation
- **Unit and Integration Tests:**
  - Tests simulate scenarios combining formula evaluation with imported data, ensuring that both sources are correctly parsed, merged, and rendered.
  - Additional tests validate that the interactive preview and live update preview correctly reflect changes in real-time and integrate seamlessly with other plotting functionalities.
  - Other tests cover cache functionality, unit conversion accuracy, and SVG export standards.
- **Documentation Updates:** README.md and CONTRIBUTING.md are updated with comprehensive usage examples covering data import, combined plotting workflows, interactive preview usage, live update functionality, and troubleshooting guidelines for different data formats and error conditions.

## Benefits
- **Enhanced Flexibility:** Users can augment or replace computed data with externally sourced datasets, broadening the scope of visualisations and analysis.
- **Improved Output Quality:** The SVG export option paired with rich data inputs allows for high-quality, publication-ready graphics.
- **Interactive User Feedback:** The integrated preview modes let users quickly visualize and iteratively modify their plots, improving workflow efficiency and reducing errors.
- **Seamless Live Updates:** The live update enhancement provides an immediate, responsive plotting experience, reinforcing the repository’s mission to be the go-to plot library for formula visualisations.

## Summary
The enhanced PLOT_ENGINE feature now consolidates core plotting, unit conversion, caching, and template management with a new data import capability, interactive preview, and a dynamic live update preview mode. This expansion not only increases the versatility of the plotting tool but also supports a wider range of use cases—from mathematical function visualisation to real-world data analysis—fully aligning with our mission to provide a powerful yet user-friendly CLI tool.
