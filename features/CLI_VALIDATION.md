# CLI_VALIDATION Feature Update with Theme Support

## Overview
This update expands the existing CLI validation functionality to support an optional theming option. In addition to validating required parameters (`--expression`, `--range`, and `--file`), the CLI now accepts a new optional flag `--theme` allowing users to choose between `light` and `dark` themes for plot generation. When provided, the theme will affect the appearance of SVG plots by adjusting text styling to improve visual clarity. This enhancement maintains the clear separation of validation and plot generation while adding customisable visual output.

## Implementation
- **Source File (`src/lib/main.js`):**
  - **Argument Parsing:** Update the `parseArgs` function to recognize the `--theme` flag and store its value if provided.
  - **Validation:** Update the existing `zod` schema to include an optional `theme` property. Use `z.enum(["light", "dark"]).optional()` to enforce allowed values.
  - **Plot Generation:** In the SVG plot generation block, if a valid theme is supplied:
    - For `dark` theme, add a fill attribute (e.g., `fill="white"`) to the `<text>` elements and optionally adjust the background color.
    - For `light` theme, ensure the text appears clearly (e.g., `fill="black"`).
  - **Fallback:** If no theme is provided, continue with the default style.

- **Test File (`tests/unit/main.test.js`):**
  - Add new tests to invoke the CLI with the `--theme` flag using valid values (`light` and `dark`).
  - For SVG outputs, verify that the generated markup includes the appropriate color attributes (e.g., checking for `fill="white"` when `--theme dark` is used).
  - Ensure that supplying an invalid theme (if tested) results in a descriptive validation error.

- **Documentation (`README.md`):**
  - Update the CLI usage section to include the new `--theme` flag.
  - Provide examples showing how the theme option affects output, for instance:
    ```bash
    node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg --theme dark
    ```

- **Dependencies:**
  - No new dependencies are needed; continue using the integrated libraries (`zod`, `mathjs`).

## Benefits
- **Enhanced Customisation:** Users can now select a theme that best suits their display environments, enhancing readability and plot aesthetics.
- **Consistent**: Integrates seamlessly with the existing validation logic while preserving backward compatibility.
- **Improved User Experience:** The addition of theming provides quick visual customisation, making the tool more versatile for different output contexts.

## Testing and Validation
- Run `npm test` to ensure both standard validations and theme-specific customisations work as intended.
- Manually test by invoking the CLI with the `--theme` flag to inspect the modified SVG output and verify that the text styles change according to the selected theme.