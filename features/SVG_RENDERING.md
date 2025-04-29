# Overview
This update enhances the existing SVG_RENDERING feature by integrating comprehensive accessibility improvements. In addition to consolidating static and animated SVG plot generation with performance enhancements, the feature now embeds an accessible title within each generated SVG. This <title> element improves readability for screen readers and aligns with SVG best practices for accessibility.

# Accessibility Enhancements
- A new CLI/HTTP parameter (--svgTitle) is supported to allow the user to specify a custom title text for the SVG output. If provided, the SVG output will include a <title> element as the first child. If not provided, a default title based on the expression (for example, "Plot for: {expression} in range {range}") is used.
- The inclusion of a <title> element ensures improved accessibility and better compliance with SVG 1.1 standards, making graphical content more descriptive.

# Implementation
- Update the createSvgPlot function to check for a new parameter (svgTitle) in the customLabels object. If the parameter exists and is non-empty, embed a <title>{provided text}</title> element immediately after the opening <svg> tag.
- If no custom title is provided, automatically generate a default title using the expression and range values. This guarantees every SVG has an accessible description.
- Ensure that the <title> element is inserted before any other child elements (such as <defs> or <text>) to satisfy best practices for SVG accessibility.
- Update CLI and HTTP endpoint logic so that the new parameter is properly recognized and passed to the SVG generation routine. This is integrated as part of parameter merging in the configuration management.
- Extend error handling and unit tests to validate that when a title is provided or generated, it adheres to the accessibility requirements.

# Impact
- Enhances usability by providing meaningful descriptions for SVG plots, which benefits users relying on assistive technologies.
- Aligns sharply with the mission of being the go-to plot library, ensuring that produced graphics are not only visually effective but also accessible.
- Consolidates accessible attributes within the unified SVG rendering process, reducing additional overhead and ensuring consistency across both CLI and HTTP interfaces.