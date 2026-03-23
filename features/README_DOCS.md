README_DOCS

Overview

Document CLI usage, the PNG rendering approach, and typical examples so users can run the tool and understand optional dependencies.

Behavior

- Update repository README with examples that match the CLI usage lines from the mission.  
- Describe the PNG rendering strategy: recommend sharp for server-side usage and show how to enable it (install as an optional dependency).  
- Document the SVG output characteristics (uses polyline and viewBox) and how to inspect produced files.

Acceptance criteria

- README contains the example CLI lines from the mission.  
- README documents that PNG rendering requires an optional dependency and which package is recommended.  
- README describes how to run the CLI and how to run unit tests.

Testing

- Tests are not required for README content, but CI should confirm README exists and contains the example strings as part of repository quality checks if desired.

Implementation notes

- Keep examples short and copy-pasteable. Mention that the library exports named functions for programmatic use.