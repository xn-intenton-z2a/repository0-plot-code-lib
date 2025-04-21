# TIMESTAMP OVERLAY Feature Enhancement

This feature adds a timestamp overlay to generated plot outputs (SVG, PNG, PDF) to clearly indicate the date and time when the plot was created. By embedding the generation time directly onto the plot, users gain an immediate reference for when the data visualization was produced, aiding in auditability and version tracking.

# Overview

- **Objective:** Automatically include a generation timestamp on each plot output as a visual footer element.
- **Benefit:** Provides context for the visualized data and helps users track the creation time of plots. It reinforces reproducibility and documentation without adding external complexity.

# Implementation Details

- **Source Code Modifications:**
  - Update the plot generation function in the existing source file (src/lib/main.js) to generate a timestamp string (using the current date and time in a readable format).
  - Insert a new SVG `<text>` element in a non-intrusive location (e.g., bottom-right corner) that displays the timestamp.
  - Ensure that the timestamp is included regardless of the output format (SVG, PNG, PDF) by incorporating it as part of the SVG content before conversion.
  - The timestamp should update dynamically with each invocation.

- **Testing Enhancements:**
  - Update unit tests (in tests/unit/main.test.js) to verify that when a plot is generated, the resulting SVG contains a text element matching a datetime pattern.
  - Check that the timestamp text is positioned at the expected coordinates and does not interfere with existing plot elements.

- **Documentation Updates:**
  - Update the README.md to document the new `TIMESTAMP_OVERLAY` feature, including a usage example:
    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.svg
    ```
    The generated plot will now include a footer with the generation timestamp.

# Conformance with Mission and Guidelines

- **Repository Impact:** All modifications remain confined to existing source files, tests, README, and dependency files as per contribution guidelines.
- **Achievability:** This enhancement is simple, self-contained, and immediately delivers added value by making plots self-documented, in line with the mission of being the go-to plot library for formula visualisations.
