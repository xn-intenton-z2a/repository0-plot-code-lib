# CUSTOM_THEMES Feature Specification

## Description
This feature introduces customizable theming capabilities to the plotting library. It enables users to personalize the appearance of their plots by applying custom color palettes, fonts, and styling options. Themes can be specified via a CLI flag, through an external configuration file (in JSON format), or interactively through the web interface. This expansion not only enhances visual appeal but also allows users to adapt plots to suit branding or publication requirements.

## Motivation
- **Enhanced Visual Customization:** Users can override default styles, ensuring consistent appearance across different outputs such as presentations, reports, or academic publications.
- **Flexibility and Branding:** By enabling custom themes, the library becomes more adaptable to organizational color schemes and style guides.
- **Mission Alignment:** In line with our mission to be the go-to plotting tool for formula-based visualisations, this feature adds a layer of versatility that caters to diverse user needs and aesthetic preferences.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new flag (e.g., `--theme`) that accepts a file path to a theme configuration or an inline JSON string with theme settings.
   - Validate and parse the provided theme configuration using schema validation libraries (such as `zod`).

2. **Configuration File Parsing:**
   - Allow users to define theme properties (colors, fonts, line styles, background settings) in an external JSON file.
   - Incorporate error handling and validations to ensure the configuration adheres to the expected schema.

3. **Web Interface Support:**
   - Extend the web interface by adding a theme customization panel where users can select from pre-defined themes or adjust settings interactively.
   - Provide real-time preview of the applied themes directly on the plot, with options to save or export the configuration.

4. **Rendering Engine Enhancements:**
   - Modify the existing rendering pipeline to check for custom theme settings and apply them during plot generation.
   - Ensure compatibility across all supported output formats (SVG, PNG, ASCII, etc.).

5. **Testing and Documentation:**
   - Develop comprehensive unit and integration tests to verify that theme configurations correctly override default styling.
   - Update the README and CONTRIBUTING documentation with examples of theme configuration usage and troubleshooting guidelines.

## Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --theme path/to/myTheme.json "linear:column1,column2,-10,10,1"
  ```
- **Web Interface Example:**
   - Navigate to the theme customization section, select a pre-defined theme or create a new one, and view live previews of your custom settings on generated plots.