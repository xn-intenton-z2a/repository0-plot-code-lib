# Description
This feature adds customizable watermark support to the plotting library. Users can overlay a text or image watermark on their plots to assert branding, confidentiality, or simply for aesthetic appeal. The watermark is applied during the rendering process and can be customized in terms of content, position, opacity, and styling. This functionality is accessible via both CLI flags and the web interface, ensuring a consistent experience across output formats (SVG, PNG, etc.).

# Motivation
- **Branding and Consistency:** Allows organizations or individual users to embed their logo or signature text on every plot, reinforcing brand identity.
- **Security and Attribution:** Watermarks can help prevent unauthorized use of generated plots or clearly mark the source, aiding in intellectual property protection.
- **User Customization:** Empowers users to personalize their plots without modifying the core visualizations, aligning with our mission of being the go-to plot library for formula-based visualisations.

# Implementation Details
1. **CLI Integration:**
   - Introduce a new flag (e.g., `--watermark`) that accepts a text string or path to an image file.
   - Provide optional parameters to adjust watermark position (e.g., top-left, center, bottom-right), opacity, font size, and color (for text).
   - Validate input and merge watermark settings with the existing rendering pipeline so that the watermark is applied as a final overlay.

2. **Web Interface Support:**
   - Add a watermark configuration panel where users can input watermark text or upload an image.
   - Include interactive previews for positioning and styling adjustments using a drag-and-drop or slider interface.
   - Ensure that watermark settings can be saved as part of user profiles or configuration files for consistency in repeated use.

3. **Rendering Engine Enhancements:**
   - Modify the rendering functions to incorporate an overlay layer that applies watermark elements on top of the plot.
   - Ensure compatibility across all supported output formats. For image watermarks, implement scaling options to preserve clarity.
   - Provide a fallback mechanism if an image file fails to load, defaulting to a text watermark with a standard message.

4. **Testing and Documentation:**
   - Develop unit and integration tests to verify that watermarks are correctly rendered under various configurations and output formats.
   - Update the README and CONTRIBUTING documents with usage examples, configuration settings, and troubleshooting tips related to watermark customization.

# Usage
- **CLI Example:**
  ```bash
  node src/lib/main.js --import data.csv --plot "line:column1,column2,-10,10,1" --watermark "Confidential" --watermark-position bottom-right --watermark-opacity 0.3
  ```

- **Web Interface Example:**
   - Launch the web server with `npm run start:web`.
   - Navigate to the plotting interface and access the watermark settings panel to input custom watermark text or upload a logo, then preview the effect on the generated plot.
