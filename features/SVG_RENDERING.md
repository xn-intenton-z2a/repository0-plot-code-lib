# Overview
This feature consolidates and enhances the existing SVG plotting and animation functionalities into a unified SVG_RENDERING module. By merging static plotting and dynamic animation logic, it provides a single, cohesive interface for all SVG-based visualizations. In addition, the feature introduces an in-memory caching mechanism to store computed plot data, thereby reducing redundant computations and significantly improving performance for repeated plot requests.

# Implementation
- Merge the functionalities of the current SVG_PLOTTING and SVG_ANIMATION features into one unified rendering engine. This will support both static plots (using polyline elements) and animated plots (using SMIL <animate> elements) within the same code path.
- Introduce an in-memory cache (for example, a simple JavaScript object) in the source code that is keyed by a hash computed from the expression, range, and customization parameters. Before computing plot data (via computePlotData), check the cache for a valid result. If present, return the cached SVG output; otherwise, compute and store the result in the cache.
- Update the createSvgPlot function to incorporate both static and smooth path generation (controlled by the smooth flag and smoothingFactor) and embed gradient, marker, and styling options as already implemented.
- Update the CLI and HTTP endpoint logic in the main source file so that both modes benefit from the caching mechanism. Ensure that when a configuration reload (via SIGHUP) occurs, the cache is either cleared or updated accordingly.
- Enhance error handling to properly report cache retrieval or key generation issues, ensuring that any fallback to standard computation is smooth.

# Impact
- Significantly reduces computation time for repeated plots by avoiding re-evaluation of the same expression and range parameters.
- Simplifies user experience by providing a single, robust interface for both static and animated SVG plot rendering.
- Improves overall performance and responsiveness, in line with the mission to be the go-to plot library for formula visualisations.

# Notes
- The cache is maintained in memory during the process lifetime and can be reset on receipt of the SIGHUP signal or via explicit CLI commands if necessary.
- This merged feature will replace the individual SVG_PLOTTING and SVG_ANIMATION features, reducing code duplication and easing future maintenance.