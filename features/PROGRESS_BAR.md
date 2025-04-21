# PROGRESS_BAR Feature Enhancement

This feature adds a progress indicator to the CLI tool for long-running plot generation and file conversion operations. When generating output files (especially PNG and PDF formats), users will see a progress bar in the terminal. This immediate feedback enhances the user experience by providing real-time status updates on the ongoing processing tasks.

# Overview

- **Objective:** Display a progress bar during operations that may take noticeable time (e.g., image conversion using sharp or PDF generation with pdfkit).
- **Benefit:** Improves usability, particularly for users with slower machines or large input data, by informing them of the current progress and estimated completion.

# Implementation Details

- **Source File Changes (src/lib/main.js):**
  - Integrate a lightweight progress indicator that updates during file conversion processes. The progress bar can be implemented using simple console output updates (e.g. reprinting a line with carriage returns) or via a dependency if already present in the repository.
  - Wrap long-running asynchronous operations, such as conversion to PNG using sharp or PDF generation using pdfkit, with progress update callbacks. For example, during the conversion process, update the user every time a chunk of data is processed.
  - Ensure that the progress indicator only appears when the operation takes longer than a configurable threshold.

- **Test File Updates (tests/unit/main.test.js):**
  - Add tests to simulate and verify that a progress output line is generated for PNG and PDF operations. Use mocking to capture console output and check for the expected progress messages.
  - Verify that progress messages do not interfere with the final file output or other CLI outputs.

# Documentation Updates

- **README.md:**
  - Update the CLI usage section with an example showing that the progress bar will be visible during long-running operations. For example:
    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.png
    ```
  - Explain that the progress indicator provides real-time feedback and can be disabled by a command-line flag (e.g. `--no-progress`) if users prefer a quieter output.

# Conformance with Mission and Guidelines

- **Repository Impact:** All modifications are restricted to existing files: the source file, related tests, the README, and possibly minor dependency file changes.
- **Mission Alignment:** By enhancing user interaction during processing, this feature contributes to making the tool the go-to plot library that not only generates visualisations but also provides an improved command-line experience.
