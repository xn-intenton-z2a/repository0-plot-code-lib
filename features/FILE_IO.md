# FILE_IO

Status: Implemented (closed: #7, #8, #13, #22, #28, #30)

Summary
Provide a small, well-documented file save pipeline and ensure CLI rendering options flow through to the file output stage. The feature covers inference of output format from the filename extension, deterministic SVG output (viewBox preserved) and passing explicit rendering options (pixel width/height, stroke, strokeWidth, margin) from the CLI and programmatic API into the renderers.

Behavior
- Implement savePlotToFile(contentOrSvgString, filePath, options?) which infers format from filePath extension and writes the correct bytes to disk.
- When filePath ends with .svg the exact SVG string must be saved (UTF-8) and contain a root svg element with a viewBox attribute.
- When filePath ends with .png the function must call the available PNG renderer (see PNG_RENDERER) to produce PNG bytes and write them as binary.
- The CLI and programmatic entrypoint main(...) parse and forward rendering options: width, height, stroke, stroke-width, margin. Defaults should be documented and sensible.

API
Export named functions from src/lib/main.js:
- savePlotToFile(contentOrSvgString, filePath, options?) -> Promise<void>
- main(argv?) -> Promise<number|void>  (programmatic invocation returns 0 on success)

Acceptance Criteria
- savePlotToFile("<svg ... viewBox=\"0 0 100 50\">...", "out.svg") writes out.svg and the file contents include the substring "<svg" and include a viewBox=" attribute on the root element.
- savePlotToFile(svgString, "out.png", { width: 200, height: 100 }) writes out.png and when a PNG renderer is available the returned bytes begin with the PNG signature (hex 89 50 4E 47 0D 0A 1A 0A) and the IHDR width/height fields (Buffer.readUInt32BE(16) === 200 and Buffer.readUInt32BE(20) === 100) match the requested dimensions.
- main invoked as a CLI (node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file out.svg --width 640 --height 240) creates out.svg that contains <svg and a viewBox attribute and exits with a success status.
- When file extension is unsupported (for example .txt) savePlotToFile rejects with an Error whose message contains "unsupported output format".
- The CLI forwards styling options to the renderers so renderSVG(renderOptions) produces an SVG consistent with width/height/stroke settings; tests may verify attribute presence or pixel IHDR values in the PNG path.

Notes
This feature intentionally keeps CLI parsing simple and defers heavy rasterization behaviour to the PNG_RENDERER feature which defines renderer selection and fallbacks.