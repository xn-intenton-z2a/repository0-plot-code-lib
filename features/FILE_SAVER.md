FILE_SAVER

Overview

Save a plot either as SVG or PNG by inferring format from the file extension. This feature coordinates rendering and output.

Behavior

- Expose a named export savePlot({svg, pngBuffer} or {svgString}, filePath, opts) which writes the correct bytes to disk based on the extension of filePath (.svg or .png).
- For .svg the function writes the SVG string as UTF-8 text. For .png the function writes binary PNG bytes (calling the PNG renderer when necessary).

API

- savePlot(output, filePath, options?) -> Promise<void>
  - output may be an svg string or an object with svg and/or pngBuffer.  
  - If filePath ends with .svg the svg string is written; if .png ensure a PNG buffer is available or call renderPng to produce it.

Acceptance criteria

- Calling the CLI or library save path with .svg produces a file that contains a viewBox attribute and polyline element.  
- Calling with .png produces a file starting with PNG magic bytes.  
- Errors writing files surface clear messages when the target directory is invalid or write permissions are missing.

Testing

- Unit tests may write to a temporary directory and assert file existence and initial bytes for .png and substring presence for .svg.

Implementation notes

- Use Node fs promises for file operations. Ensure correct encoding for text vs binary writes.