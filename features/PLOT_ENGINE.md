# OVERVIEW
This update further improves the core Plot Engine by enhancing its SVG generation capabilities with advanced accessibility features. In addition to previously implemented functionalities such as SVG minification, dynamic gradients, curve smoothing, marker support, and custom styling for axis labels, the Plot Engine now supports inclusion of accessibility elements. 

# ACCESSIBILITY ENHANCEMENTS
- New configuration options (e.g., svgTitle and svgDesc) are accepted via CLI flags or configuration files. When provided, these parameters add a <title> element as the first child of the SVG and an optional <desc> element for additional description.
- A unique ID is generated for the <title> element, and the SVG element is updated with an aria-labelledby attribute referencing the title (and description if available). This follows best practices outlined in SVG_ACCESSIBILITY guidelines.
- The implementation ensures that if the accessibility parameters are omitted, the SVG output remains unchanged and backward compatibility is maintained.

# IMPLEMENTATION
- Update the createSvgPlot function in src/lib/main.js to detect new parameters: svgTitle and svgDesc from the customLabels object.
- When svgTitle is provided, inject a <title id='uniqueID'> element as the first child of the SVG. If svgDesc is also provided, inject a corresponding <desc id='uniqueDescID'> element and set the aria-labelledby attribute on the SVG to reference both IDs.
- Generate unique IDs (e.g., using the current timestamp) to avoid collisions.
- Update corresponding tests in the unit test files to validate that the SVG output includes the expected <title> and <desc> elements when the parameters are used.

# IMPACT
- Improved accessibility and compliance with web standards for SVG graphics.
- Enhanced usability for visually impaired users by providing clear, descriptive text embedded in the SVG image.
- Strengthens the mission of repository0-plot-code-lib by making formula visualizations more inclusive and accessible.
