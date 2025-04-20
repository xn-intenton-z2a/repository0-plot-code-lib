# PREVIEW Feature Enhancement

This feature introduces a new `--preview` CLI flag that launches an interactive web preview server for the generated plot. When users invoke the CLI with the `--preview` flag (in combination with the usual expression, range, and file options), the tool will spin up a lightweight HTTP server using Express to display the rendered SVG (or placeholder plot) directly in a browser.

## Overview

- **CLI Flag Addition:** Introduce the `--preview` flag to the argument parser in `src/lib/main.js`.
- **Express Integration:** Utilize the already available `express` dependency to create a simple HTTP server.
- **Interactive Preview:** When `--preview` is active, the server will render a web page containing a preview of the plot generated from the provided mathematical expression and range.
- **Non-Blocking Behavior:** If both `--file` and `--preview` are provided, the tool will generate the file as usual and additionally open the preview server.

## Implementation Details

### Source Code Changes (src/lib/main.js)

- **Flag Detection:** Extend the argument parsing logic in `main()` to detect the `--preview` flag.
- **Express Server Setup:**
  - Import Express. For example:
    ```js
    import express from 'express';
    ```
  - If the `--preview` flag is active, initialize an Express server on a configurable port (defaulting to 3000).
  - The server will serve a simple HTML page embedding the plot (for now, a placeholder SVG or text message such as "Preview of generated plot").
  - Include a route (e.g. `/`) that returns the HTML content. Optionally, log the URL to the console.
- **Flow Integration:**
  - Maintain current functionality (e.g. statistics, diagnostics, expression evaluation, and plotting) and add the preview as an additional output channel.
  - Ensure that if the preview is active, the main execution does not block the CLI but continues to run the preview server until manually terminated.

### Test Enhancements (tests/unit/main.test.js)

- Add tests to simulate running the CLI with the `--preview` flag. The tests should verify that:
  - When `--preview` is passed, no errors occur during server startup.
  - A log message indicating the preview URL is produced (or a function responsible for starting preview is called).

### Documentation Updates (README.md)

- Update the README to introduce the new `--preview` flag. For example:

  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --preview
  ```

- Provide instructions on how to access the preview (e.g. navigate to http://localhost:3000 in a browser) and mention configuration details if any (like changing the server port via an environment variable).

## Dependency and Build Consistency

- No additional dependencies are required as `express` is already included.
- The changes conform to Node 20 and ECMAScript module standards.
- All modifications adhere to the repository guidelines (only modifying existing source files, tests, README, and dependencies file if necessary).

## Conformance with the Mission

This feature reinforces the mission of being a go-to plot library by enabling users to quickly visualize their formula outputs in an interactive manner, akin to a live demo. It complements the existing CLI functionalities and makes the tool more user-friendly.