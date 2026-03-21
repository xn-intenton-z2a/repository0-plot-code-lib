# FILE_SAVE

Summary
Save generated plot output to disk, inferring output format from the file extension and delegating to the appropriate renderer.

Goals
- Provide a single savePlot(filePath, dataOrOptions) helper that writes either SVG text or PNG bytes depending on the file extension .svg or .png.
- Ensure correct file mode and atomic write behaviour where feasible.

API Contract
- savePlot(filePath, { svg?: String, png?: Buffer } or { series, options }) -> Promise<void>
  - If filePath ends with .svg, write the SVG string; if .png, write the PNG bytes.
  - When caller provides series and options, the helper will call renderSvg or renderPng as required before writing.

Behavior and constraints
- The function must create parent directories as needed and throw a descriptive Error on write failures.

Acceptance Criteria
- Saving to output.svg creates a file that begins with the characters <svg and contains a viewBox attribute.
- Saving to output.png creates a file whose contents begin with the PNG magic bytes.
- The function is exported as a named helper and used by the CLI implementation.

Deliverables
- Named export savePlot from src/lib/main.js and unit tests that write to a temporary directory and verify file signatures.

Notes
- Use Node fs promises and ensure tests clean up temporary files.