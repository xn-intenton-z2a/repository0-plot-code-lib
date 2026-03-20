# CLI_OPTIONS

Status: Proposed

Summary
Extend the CLI and save pipeline to accept explicit rendering options (pixel width, pixel height, stroke color, stroke width, margin) and ensure these options flow through renderSVG and renderPNG so output files match user-specified dimensions and styling.

Behavior
- Add CLI flags: --width <number>, --height <number>, --stroke <color>, --stroke-width <number>, --margin <number>. All flags are optional; sensible defaults apply.
- The CLI main entry parses these flags and passes an options object to renderSVG and renderPNG so the produced SVG includes the requested styling and the PNG encoder receives the desired pixel dimensions.
- Saving logic (savePlotToFile) should accept and honour the width/height options for PNG output and ensure SVG output includes either width/height attributes or a viewBox consistent with the requested pixel dimensions.

API
- main(argv, options?) should accept programmatic options for width/height/styling to facilitate tests and programmatic usage.
- Exported functions maintain backwards compatibility: renderSVG(points, options) and renderPNG(svgOrSeries, options).

Acceptance Criteria
- CLI: node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file out.svg --width 800 --height 300 produces an out.svg string that either embeds width="800" height="300" attributes or a viewBox whose width/height mapping corresponds to those pixel dimensions.
- PNG: node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file out.png --width 640 --height 480 produces out.png where the returned PNG bytes have an IHDR width of 640 and height of 480 (Buffer.readUInt32BE(16) === 640 and Buffer.readUInt32BE(20) === 480) when a renderer is available.
- Programmatic API: calling main({}, { width: 200, height: 100 }) or renderPNG(svg, { width:200, height:100 }) results in outputs matching the requested pixel size.
- Documentation: README.md and the CLI help text document the new flags with example commands and examples showing both SVG and PNG outputs using the width/height options.
