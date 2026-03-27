# FILE_OUTPUT

Overview

Save a generated plot to disk, inferring the desired output format from the file extension. Support .svg and .png; default to .svg if the extension is omitted.

Behavior

- Inspect the output filename extension to decide whether to write SVG or PNG content.
- Create parent directories when needed and overwrite existing files unless an explicit no-overwrite option is provided.
- Return a promise or success indication once the file has been written to disk.

Acceptance Criteria

- Saving to output.svg writes a text file containing valid SVG with viewBox and polyline.
- Saving to output.png writes a binary file beginning with PNG magic bytes.
- Unsupported extensions return a descriptive error.
- File-writing is exposed through a named API and used by the CLI.