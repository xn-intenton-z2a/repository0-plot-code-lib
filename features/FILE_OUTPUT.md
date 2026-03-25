# FILE_OUTPUT

## Summary

Save generated plots to disk, inferring output format from the file extension and validating output bytes for correctness.

## Motivation

CLI and programmatic usage must be able to persist plots as .svg or .png files with minimal friction.

## Scope

- Provide savePlot(output, filename) where output is either an SVG string or a Buffer containing PNG bytes.
- Determine format by the filename extension (.svg or .png). For unrecognized extensions, return a clear error.

## Requirements

- For .svg files write the SVG string using UTF-8 encoding.
- For .png files write the Buffer bytes exactly.
- Export savePlot as a named export from src/lib/main.js.

## Acceptance Criteria

- Calling savePlot with an svg string and filename ending .svg creates a file that contains an <svg element and a viewBox attribute.
- Calling savePlot with a PNG buffer and filename ending .png creates a file whose first 8 bytes are the PNG magic bytes.
- Attempting to save to an unknown extension returns an error describing accepted extensions.

## Notes

- Implement file writes with Node fs promises so callers can await completion; include clear error messages when writes fail due to permissions or missing directories.
