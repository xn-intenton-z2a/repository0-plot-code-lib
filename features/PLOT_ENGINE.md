# PLOT_ENGINE Feature Specification (Enhanced with Unit Conversion, Cache Inspection, Template Management, and SVG EXPORT)

## Overview
This feature provides the core plotting capabilities for evaluating mathematical expressions, generating clear colorized ASCII plots, and exporting data in multiple formats. In this update, we enhance the core functionality with comprehensive unit conversion support, cache inspection, a robust template management system, and a new SVG export capability. These integrations streamline repeated plotting operations and elevate export quality, fully aligning with our mission of being the go-to plot library for formula visualisations.

## Plot Generation and Output
- **Expression Evaluation:** Utilizes mathjs to parse and compute data points over a specified interval with a given step size.
- **ASCII Plotting:** Maps computed data onto an ASCII grid with optional color enhancements for clear visualization.
- **Export Options:** 
  - Supports file export through a designated flag (e.g., `--export`) for ASCII or JSON output.
  - **SVG Export Capability:** A newly integrated option allows users to export plots in scalable vector graphics (SVG) format by using a dedicated CLI flag (`--export-svg`). This enhances output quality for inclusion in digital documents and presentations without sacrificing simplicity or performance.

## Integrated Caching and Inspection
- **Caching Mechanism:**
  - Implements an in-memory cache using a JavaScript Map keyed by a hash computed from parameters (formula, interval, step, and color).
  - Each cache entry is assigned a Time-To-Live (TTL) to ensure automatic invalidation of stale plot data.
  - Includes a manual flush option via the `--clear-cache` flag.
- **Cache Inspection:**
  - A dedicated `--inspect-cache` CLI flag triggers cache introspection, listing active cache keys along with metadata and TTL values.
  - Supports an interactive mode (`--interactive`) for selective deletion or flushing of cache entries.

## Unit Conversion Integration
- **Parameter Pre-processing:**
  - Merges unit conversion functionality directly into the plotting engine via flags like `--input-unit` and `--output-unit` to standardize units for intervals, step sizes, and angles.
  - Automatically detects common functions requiring conversion (e.g., `sin`, `cos`, `tan`) and applies conversions as needed.
  - Outputs informative error messages for unsupported or mismatched unit combinations.

## Template Management
- **Template Saving and Reuse:**
  - Enables users to save the current plotting configuration (including formula, interval, step, color, and unit settings) as reusable templates stored in a JSON configuration file.
  - Allows listing available templates with a `--list-templates` flag and application via `--apply-template <template_name>` to quickly reinitialize plotting parameters.
- **Template Editing:**
  - Supports basic editing of saved templates with command-line flags or via direct modifications of the JSON file, including versioning or timestamp metadata to manage updates.

## SVG Export Integration
- **SVG Export Capability:**
  - Introduces a new export format that allows users to generate high-quality SVG files of their plots. 
  - Activated with the CLI flag `--export-svg`, the feature leverages minimal dependencies to convert computed plot data into a scalable vector graphic.
  - Provides configuration options for output dimensions and styling to suit various publishing needs.

## Testing and Documentation
- **Unit and Integration Tests:**
  - Ensure proper expression evaluation, cache functionality (including TTL expiration and manual flush), and unit conversions are accurate.
  - Validate the new SVG export option by verifying that the output adheres to SVG standards and reflects user-specified configurations.
- **Documentation Updates:**
  - Update README.md and CONTRIBUTING.md with usage examples combining plotting, unit conversion, template management, and SVG export options.
  - Provide troubleshooting guidelines and code snippets demonstrating common scenarios using the SVG export feature.

## Benefits
- **Comprehensive Functionality:** Consolidates core plotting logic, unit conversion, cache inspection, template management, and now a professional-grade SVG export capability into a single cohesive module.
- **Enhanced Output Quality:** The SVG export option offers a high-quality, scalable alternative to ASCII and JSON outputs, ideal for digital publications and detailed presentations.
- **Diagnostics and Efficiency:** Integrated caching and template management improve performance and streamline repeated workflows, making the tool both robust and user-friendly.

## Summary
The enhanced PLOT_ENGINE feature now not only consolidates core plotting, unit conversion, cache inspection, and template management, but also introduces a robust SVG export capability. This update broadens the export options from simple ASCII and JSON outputs to include high-quality, scalable SVG files, thereby providing a valuable tool for both technical and presentation purposes.