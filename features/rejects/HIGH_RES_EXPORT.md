# HIGH_RES_EXPORT Feature Specification

## Description
This feature introduces high resolution export capabilities to the plotting library, enabling users to generate exportable plots in high DPI formats such as PNG and JPEG. In addition to the existing SVG, ASCII, and HTML outputs, users can now specify a resolution (DPI) parameter to produce images suited for presentations, printed materials, and publications.

## Motivation
- **Professional Output:** High resolution images are critical for printed media and professional presentations, ensuring crisp and clear visuals.
- **Expanded Use Cases:** Enhances the tool's utility in academic publications, marketing materials, and digital media where high quality is essential.
- **Mission Alignment:** Reinforces our mission to be the go-to plot library for formula visualisations by offering versatile, publication-quality outputs.

## Implementation Details
1. **CLI Integration:**
   - Introduce a new CLI flag (e.g., `--high-res`) to activate high resolution export mode.
   - Allow an optional parameter (e.g., `--dpi <value>`) that defines the desired dots-per-inch resolution. If not specified, default to a high standard (e.g., 300 DPI).
   - Update the argument parser in `src/lib/main.js` to detect and process these flags alongside existing plotting commands.

2. **Rendering Adjustments:**
   - Modify the rendering pipeline to generate plot outputs with increased pixel density. For SVG outputs, embed scaling instructions to ensure resolution independence prior to conversion.
   - For bitmap-based outputs (PNG, JPEG), integrate an optional conversion step. This could involve using an external module (such as `sharp` if available) to convert high quality SVGs to PNG/JPEG formats without degradation.
   - Validate numeric inputs for DPI and notify users of any invalid entries with clear error messages.

3. **Output Formats:**
   - Support output in high resolution PNG and JPEG in addition to current formats.
   - Ensure that high resolution images maintain aspect ratio and accurate plotting details, even when scaled.

4. **Testing and Documentation:**
   - Add unit tests and integration tests to simulate high resolution export scenarios. Validate that the DPI setting correctly influences the rendered output resolution.
   - Update the README and CONTRIBUTING guidelines with examples demonstrating how to use the new high resolution export feature.

## Usage
- **Basic High Resolution Export:**
  ```bash
  node src/lib/main.js --high-res output.png "quad:1,0,0,-10,10,1"
  ```
- **Specify Custom DPI:**
  ```bash
  node src/lib/main.js --high-res --dpi 600 output.jpeg "sine:1,1,0,0,360,30"
  ```
- **Fallback Behavior:**
  - If an unsupported output format is specified for high resolution mode, the tool should provide an informative error message and a list of supported formats.

This feature significantly improves the versatility of our plotting tool, enabling users to generate professional-grade, high quality visuals that meet rigorous standards required across various industries.