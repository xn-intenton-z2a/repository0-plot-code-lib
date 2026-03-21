# SAVE_PLOT

Overview
This feature defines saving rendered plots to disk by inferring format from filename extension. Supported extensions are .svg and .png.

Specification
- Provide a named export savePlot(output, filePath) where output is a string for SVG or a Buffer for PNG and filePath is a destination path.
- If filePath ends with .svg write the output as UTF-8 text. If it ends with .png write binary data. For any other extension throw an Error indicating unsupported format.
- Ensure proper error handling for filesystem write errors and return a Promise that resolves on success.

Rationale
CLI and programmatic users must be able to persist generated images; inferring format from extension keeps the interface simple.

Acceptance criteria
- savePlot with an SVG string and path ending in .svg creates a file on disk containing the SVG text.
- savePlot with a PNG Buffer and path ending in .png creates a file that begins with PNG magic bytes.
- Passing an unsupported extension results in an error.

Implementation notes
- Export savePlot from src/lib/main.js and add integration tests that run the CLI to produce files and assert file contents.