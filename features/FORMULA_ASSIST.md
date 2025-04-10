# FORMULA_ASSIST Feature Specification

## Overview
This feature merges and refines the capabilities of expression tracing with context-aware formula hints and auto-correction. It provides users with both an in-depth, step-by-step breakdown of mathematical expression evaluations as well as intelligent suggestions and corrections to improve formula accuracy. The integration enhances debugging, learning, and ease of use while adhering to our mission of being the go-to plot library for formula visualisations.

## Implementation Details
- **Integrated CLI Flags:**
  - `--trace`: Enables detailed logging of the evaluation process including parsing, unit conversion, intermediate calculations, and cache decisions.
  - `--autocorrect`: Activates the auto-correction mode that suggests and applies safe corrections to common formula mistakes before execution.

- **Core Functionalities:**
  - **Expression Trace:** Logs each significant step during the computation, from formula parsing to final ASCII plot generation. This information can also be exposed via an HTTP API endpoint for remote debugging (e.g., `GET /trace?formula=<formula>`).
  - **Context-Aware Hints:** Uses string similarity algorithms and user history to offer precise suggestions when a formula error occurs, along with links to documentation and usage examples.
  - **Auto-Correction:** Presents a preview of the auto-corrected formula before applying changes, ensuring users can validate corrections. It records changes in the history manager for eventual auditing.

## Testing and Documentation
- **Unit Tests:**
  - Validate that when `--trace` is enabled, the detailed evaluation steps are correctly produced without impacting performance.
  - Test various error scenarios to ensure that the hint and auto-correction mechanisms trigger appropriately without altering critical user input.
- **Documentation:**
  - Update the README.md and CONTRIBUTING.md to include usage instructions for the integrated trace and formula assist functionalities.
  - Provide example scenarios and troubleshooting tips specific to this merged feature.

## Benefits
- **Enhanced Debugging:** Combined insights into the evaluation process and dynamic formula suggestions reduce the time to diagnose and fix errors.
- **Improved Usability:** Lowers the entry barrier by assisting users in constructing correct formulas and understanding the underlying computation steps.
- **Mission Alignment:** Supports our goal to be the definitive tool for formula visualisations by integrating learning and correction tools directly into the plotting workflow.

## Summary
The FORMULA_ASSIST feature consolidates expression tracing and formula hinting into one cohesive module. By leveraging advanced debugging, context-aware suggestions, and safe auto-correction, it significantly elevates the user experience for both novice and advanced users.