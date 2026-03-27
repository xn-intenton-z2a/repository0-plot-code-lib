# PNG_RENDERER

Overview

Produce PNG output from a data series. The implementation can either rasterise an SVG to PNG or draw directly to a canvas; using an optional external dependency such as sharp or canvas is allowed but must be documented in the README.

Behavior

- Accept the same input and sizing options as the SVG renderer and produce a PNG binary buffer.
- If the runtime lacks the optional PNG dependency, the API should return a clear error explaining the missing dependency.

Acceptance Criteria

- A produced PNG binary begins with the PNG magic bytes (hex 89 50 4E 47).
- The PNG renderer is documented in README.md with the chosen implementation approach and any optional dependency installation steps.
- The PNG render function is exported as a named API from src/lib/main.js.