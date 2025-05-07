# Overview

Enhance and consolidate plot rendering tests and documentation to ensure robust SVG and PNG outputs from both library and CLI interfaces. This feature defines unit tests for renderPlot, integration tests for the CLI tool, and updates USAGE.md and README.md with comprehensive usage examples for both CLI and programmatic rendering.

# Unit Tests

Create or update tests/unit/plot-rendering.test.js:

• Test that renderPlot(data) returns a valid SVG string:
  - Provide a small data array of known points.
  - Assert the output string starts with <svg and contains a <path element with expected d attributes.

• Test PNG conversion via sharp:
  - Call renderPlot to get an SVG string for a small data set.
  - Use sharp to convert the SVG string to a PNG buffer.
  - Assert the first eight bytes of the buffer match the PNG signature: [0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A].

# Integration Tests

Create tests/unit/cli-plot-integration.test.js:

• "generates SVG file via CLI":
  - Spawn the CLI with ["--expression","y=x","--range","0:2","--format","svg","--output",tempSvgPath].
  - Assert exit status is 0.
  - Assert fs.existsSync(tempSvgPath) is true.
  - Read the file and assert it starts with <svg.
  - Clean up tempSvgPath.

• "generates PNG file via CLI":
  - Spawn the CLI with ["--expression","y=x","--range","0:2","--format","png","--output",tempPngPath].
  - Assert exit status is 0.
  - Assert fs.existsSync(tempPngPath) is true.
  - Read the first eight bytes and assert PNG signature.
  - Clean up tempPngPath.

# Documentation Updates

## USAGE.md

In the "Generating Plots" section:

• Add or update examples for SVG and PNG CLI commands:
  
```
repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --output sin.svg
repository0-plot-code-lib --expression "y=cos(x)" --range 0:6.28 --format png --output cos.png
```

Include brief notes about inspecting generated files.

## README.md

Under "Examples", add two subsections:

### CLI Rendering Examples

```
# SVG plot via CLI
repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --output sin.svg

# PNG plot via CLI
repository0-plot-code-lib --expression "y=cos(x)" --range 0:6.28 --format png --output cos.png
```

### Programmatic Rendering Examples

```js
import { renderPlot } from "@xn-intenton-z2a/repository0-plot-code-lib";
import sharp from "sharp";

const data = [ { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 } ];

// Generate SVG string
const svg = renderPlot(data, { width: 800, height: 600, margin: 40 });
console.log(svg.startsWith("<svg"));

// Generate PNG buffer
sharp(Buffer.from(svg))
  .png()
  .toBuffer()
  .then(buffer => {
    console.log(buffer.slice(0, 8));
  });
```