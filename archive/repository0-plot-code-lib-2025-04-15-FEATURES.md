features/CLI_THEME.md
# features/CLI_THEME.md
# CLI_THEME Feature

## Overview
This feature enhances the CLI tool by introducing a new optional flag `--theme` which allows users to specify the visual theme for SVG plot outputs. When provided, the theme value should be either `light` or `dark`. The theme influences the styling of SVG elements, such as text color and, optionally, background elements.

## Implementation
- **Source File Updates (`src/lib/main.js`):**
  - **Argument Parsing:** Update the `parseArgs` function to check for the `--theme` flag and store its value in the options object.
  - **Validation Schema:** Extend the `cliOptionsSchema` by adding an optional `theme` property defined as `z.enum(["light", "dark"]).optional()`.
  - **SVG Plot Generation:** In the block that generates SVG content, check if the `theme` option is provided:
    - For `dark` theme: set the `<text>` element's fill attribute to `features/CLI_VALIDATION.md
# features/CLI_VALIDATION.md
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
- Manually test by invoking the CLI with the `--theme` flag to inspect the modified SVG output and verify that the text styles change according to the selected theme.features/CLI_DIAGNOSTICS.md
# features/CLI_DIAGNOSTICS.md
# CLI_DIAGNOSTICS Feature Update with Version Info

## Overview
This update enhances the existing CLI diagnostics functionality by adding a new `--version` flag. When this flag is provided, the CLI tool will output the current version of the plot library (sourced from the package.json) along with the existing diagnostic details such as Node.js version, environment variables, and CLI arguments. This extension provides users with immediate version information, aiding in troubleshooting and ensuring compatibility.

## Implementation
- **Source File (`src/lib/main.js`):**
  - **Argument Parsing:** Extend the `parseArgs` function to recognize the `--version` flag and set a version indicator in the options object.
  - **Diagnostics Update:** In the main function, before proceeding with any other actions, check if the `--version` flag is present. If so:
    - Read the version field from `package.json` (using an appropriate synchronous file read or import method).
    - Output the version information along with diagnostics (Node.js version, environment variables, and parsed CLI arguments).
    - Terminate the process after printing version details.
  
- **Test File (`tests/unit/main.test.js`):**
  - Add new test cases that simulate CLI invocation with the `--version` flag.
  - Verify that the output contains the package version and other relevant diagnostic details.

- **Documentation Updates (`README.md`):)**
  - Update the CLI usage section to include the new `--version` flag.
  - Provide examples showing how to invoke the version information: 
    ```bash
    node src/lib/main.js --version
    ```

## Benefits
- **Enhanced Diagnostics:** Users can quickly retrieve the current version of the tool, facilitating support and troubleshooting.
- **Improved Transparency:** By combining version info with system diagnostics, users have a comprehensive snapshot of their runtime environment.
- **Ease of Use:** This feature makes it simpler to verify installation details, particularly useful when reporting issues or confirming updates.

## Testing and Validation
- Run `npm test` to ensure that both diagnostics and version info are correctly output.
- Manually test using:
  ```bash
  node src/lib/main.js --version
  ```
  to verify that the version information (as well as other diagnostics if needed) is displayed as expected.