# CLI_THEME Feature

## Overview
This feature enhances the CLI tool by introducing a new optional flag `--theme` which allows users to specify the visual theme for SVG plot outputs. When provided, the theme value should be either `light` or `dark`. The theme influences the styling of SVG elements, such as text color and, optionally, background elements.

## Implementation
- **Source File Updates (`src/lib/main.js`):**
  - **Argument Parsing:** Update the `parseArgs` function to check for the `--theme` flag and store its value in the options object.
  - **Validation Schema:** Extend the `cliOptionsSchema` by adding an optional `theme` property defined as `z.enum(["light", "dark"]).optional()`.
  - **SVG Plot Generation:** In the block that generates SVG content, check if the `theme` option is provided:
    - For `dark` theme: set the `<text>` element's fill attribute to `