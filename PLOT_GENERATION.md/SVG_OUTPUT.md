# SVG OUTPUT FEATURE

This feature introduces the ability to export the generated SVG plot directly to a file when an optional flag (--output) is provided. Currently, the tool outputs SVG to the console, and file export is implemented only for PNG output via the --file flag. With SVG_OUTPUT, users can now save the SVG content to a specified file, enhancing usability for automated workflows and integration into further processing pipelines.

## Functionality

- Checks for an optional --output flag when no PNG conversion is triggered or when outputFormat is not set to png. If provided, the SVG content is written to the specified file path instead of being printed to the console.
- Maintains current behavior for PNG conversion (requires --file) and for console output when --output is absent.
- Updates validations and error reporting to include missing file path when --output is provided but empty.
- Minimal changes in the source file (src/lib/main.js) to add a conditional branch for SVG file output, along with appropriate updates to CLI parsing and validations.

## Testing and Documentation

- Updates in unit tests (tests/unit/plot-generation.test.js) to check for file creation when the --output flag is used in SVG mode.
- README and USAGE documentation are enhanced to provide examples for exporting SVG plots to a file using the --output flag.
- This feature does not affect existing PNG conversion or CLI behavior for direct console SVG generation.

## Impact

The SVG_OUTPUT feature provides a high-impact, user-centric enhancement that streamlines the workflow for users who require persistent SVG outputs. This aligns with the mission of delivering a robust, user-friendly plot library that can be easily integrated into larger systems and automation scripts.
