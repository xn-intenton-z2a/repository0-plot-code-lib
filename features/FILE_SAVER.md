# FILE_SAVER

Purpose
Save a rendered plot to disk, inferring the output format from the file extension and using the appropriate encoder.

Scope
- Accept a destination file path and a render output payload (SVG string or PNG bytes)
- For .svg write text using UTF-8 encoding
- For .png write binary data without encoding transformations

Implementation Notes
- Detect extension case-insensitively; support at least .svg and .png
- Validate that the renderer output matches the requested extension before writing
- Use Node fs writeFile with the correct encoding options for text versus binary

Acceptance Criteria
- Saving to a path ending in .svg produces a file that contains an SVG string with viewBox and polyline content
- Saving to a path ending in .png produces a binary file whose first bytes are the PNG magic bytes
- Unit tests perform an in-memory or temp-file write and verify contents match expectations
