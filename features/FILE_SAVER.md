# FILE_SAVER

# Description

Provide a small utility that saves generated plot content to disk, inferring format from the file extension. When given a path ending with .svg the saver writes SVG text; when given .png it writes PNG binary data. Errors for unsupported extensions are reported clearly.

# Acceptance Criteria

- Export savePlot from src/lib/main.js which accepts a path and content (string or Buffer) and writes the file to disk.
- Calling the CLI or API to save to output.svg produces a file at that path containing valid SVG text and calling it with output.png produces a file beginning with PNG signature bytes 0x89 0x50 0x4E 0x47.
- savePlot throws a descriptive error for unsupported extensions and for filesystem write failures.