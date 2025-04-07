# THEME_MANAGER Feature Specification

## Description
This feature introduces a theme management system for our plotting tool. Users can select from a variety of predefined themes or create their own custom themes to control the visual appearance of plots. Themes include settings for color palettes, background colors, grid styles, and line aesthetics. The feature integrates with the existing configuration support so that theme preferences can be applied via command-line flags or configuration files.

## Motivation
- **Enhanced Customization:** Users can quickly switch between different styles to match presentation contexts, publication requirements, or personal preferences.
- **Consistency:** Themes ensure that plots maintain a consistent look and feel across different sessions and outputs.
- **Mission Alignment:** By offering versatile visual customization, the tool reinforces our mission to be the go-to plot library for formula visualisations, making it more adaptable for various users and scenarios.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--theme <themeName>`) that allows users to specify the theme for the current plotting session.
   - Update the argument parser in `src/lib/main.js` to detect and apply the theme flag alongside other configurations.

2. **Theme Storage and Management:**
   - Define a default set of themes (for example, `DEFAULT`, `DARK_MODE`, `LIGHT_MODE`, `HIGH_CONTRAST`).
   - Allow themes to be loaded from an external file (e.g., `themes.json` or integrated in the configuration file supported by the `--config` flag).
   - Provide an API or utility module for querying, applying, and even saving new theme configurations.

3. **Rendering Engine Integration:**
   - Modify the rendering pipeline to apply theme settings (e.g., colors, fonts, grid styles) to the generated plots.
   - Ensure that theme changes are reflected consistently whether the output is SVG, PNG, ASCII, or HTML.

4. **Error Handling and Validation:**
   - Validate theme names supplied via the CLI. If a theme is not recognized, return an informative error message and list available themes.
   - Allow fallbacks to a default theme if custom themes are missing or invalid.

5. **Testing and Documentation:**
   - Write unit tests to validate theme parsing, application, and merging with default settings.
   - Update the README and CONTRIBUTING documentation with examples on how to use the `--theme` flag and how to define custom themes.

## Usage
- **Basic Theme Application:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1" --theme DARK_MODE
  ```
- **Defining Custom Themes:**
   - Users can define custom theme configurations in a JSON file. An example `themes.json`:
   ```json
   {
     "MY_CUSTOM_THEME": {
       "backgroundColor": "#f0f0f0",
       "gridColor": "#cccccc",
       "lineColor": "#ff5733",
       "font": "Arial, 12px"
     }
   }
   ```
   - Load the custom theme using the `--config` flag along with `--theme MY_CUSTOM_THEME`.

This feature enhances the versatility and aesthetic control of the plotting tool, enabling users to adapt plot visuals effortlessly to diverse scenarios.