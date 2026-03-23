# FILE_SAVER

Status: Implemented

Overview

Write plot outputs to disk, inferring output handling from the file extension. The current implementation writes SVG as UTF-8 text and PNG bytes as binary buffer writes.

Behavior

- Expose savePlot(filename, content) which writes .svg text or .png binary based on extension.
- For .svg the SVG string is written using UTF-8 encoding. For .png a Buffer is written as binary.

Acceptance criteria (testable)

- Calling savePlot with a .svg filename writes a UTF-8 file that contains a viewBox attribute and a polyline element.
- Calling savePlot with a .png filename writes a binary file whose first bytes match the PNG magic bytes.
- Errors writing files surface clear messages when the target directory is invalid or write permissions are missing.

Testing notes

- Unit tests should write to a temporary directory and assert file existence and initial bytes for .png and substring presence for .svg.

Implementation notes

- Implementation location: src/lib/main.js. Use Node fs promises or sync helpers in tests to keep behavior deterministic.
