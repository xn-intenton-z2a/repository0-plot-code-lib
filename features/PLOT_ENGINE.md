# PLOT_ENGINE Feature Specification (Enhanced with Unit Conversion, Cache Inspection, and Template Management)

## Overview
This feature provides the core plotting capabilities for evaluating mathematical expressions, generating clear colorized ASCII plots, and exporting data in multiple formats. This update integrates comprehensive unit conversion support, cache inspection, and a robust template management system to streamline repeated plotting operations. The unified design enhances diagnostic capabilities and reinforces our mission to be the go-to plot library for formula visualisations.

## Plot Generation and Output
- **Expression Evaluation:** Utilizes mathjs to parse and compute data points over a specified interval with a given step size.
- **ASCII Plotting:** Maps computed data onto an ASCII grid with optional color enhancements for clear visualization.
- **Export Options:** Supports file export via a designated flag (e.g., `--export`) or JSON output with `--json-out`.
- **Template Integration:** Provides basic template saving, listing, and recall functionality to simplify repeated plotting scenarios.

## Integrated Caching and Inspection
- **Caching Mechanism:**
  - Implements an in-memory cache using a JavaScript `Map`, keyed by a hash computed from parameters including formula, interval, step, and color.
  - Each cache entry is assigned a Time-To-Live (TTL) to ensure automatic invalidation of stale plot data.
  - Provides a manual flush option via the `--clear-cache` flag.
- **Cache Inspection:**
  - A dedicated `--inspect-cache` CLI flag triggers cache introspection, listing active cache keys with metadata and TTL values.
  - Supports an interactive mode (using `--interactive`) for selective deletion or flushing of cache entries.

## Unit Conversion Integration
- **Parameter Pre-processing:**
  - Merges the unit conversion functionality directly into the plot engine.
  - Supports CLI flags `--input-unit` and `--output-unit` to allow users to specify measurement units for parameters such as intervals, step sizes, and angles.
- **Conversion Logic:**
  - Automatically detects trigonometric functions (e.g., `sin`, `cos`, `tan`) and converts angle measurements (degrees to radians or vice versa) when both unit flags are provided.
  - Utilizes built-in conversion factors or lightweight libraries to perform numerical adjustments prior to plot computation.
  - Validates provided units and outputs informative error messages for unsupported unit combinations.

## Template Management
- **Template Saving:**
  - Enables users to save the current plotting configuration (formula, interval, step, color, unit settings, etc.) as a reusable template.
  - Templates can be stored in a simple JSON configuration file within the repository or user directory.
- **Listing and Recall:**
  - Provides CLI commands (e.g., `--list-templates`) to display available templates with brief summaries.
  - Allows users to recall a template by name (e.g., `--apply-template <template_name>`), automatically populating plot parameters.
- **Template Editing:**
  - Supports basic editing of saved templates via command flags or by directly modifying the JSON file.
  - Includes versioning or timestamp metadata to help users manage template updates over time.

## Testing and Documentation
- **Unit and Integration Tests:**
  - Validate correct expression evaluation, cache functionality (including TTL expiration and manual flush), and accurate unit conversions.
  - Include new tests to verify template saving, listing, recall, and editing functionalities.
- **Documentation Updates:**
  - Update README.md and CONTRIBUTING.md with usage examples, including detailed scenarios combining plotting with unit conversion and template management.
  - Provide troubleshooting guidelines and code examples demonstrating common conversion and template application use cases.

## Benefits
- **Seamless Integration:** Consolidates core plotting logic, unit conversion, cache inspection, and template management into one feature, reducing redundancy and improving maintainability.
- **Enhanced Accuracy:** Ensures plot computations are based on standardized units and that frequently used plotting configurations can be quickly reapplied via templates.
- **Diagnostics and Efficiency:** The cache inspection mechanism aids performance tuning while template management streamlines repeated workflows.

## Summary
This enhanced PLOT_ENGINE feature not only consolidates the core plotting logic, cache inspection, and unit conversion support but also introduces a robust Template Management system. By enabling users to save, recall, and edit plotting configurations, the feature significantly improves repeatability and user experience, aligning with our mission of being the go-to plot library for formula visualisations.