# Overview

Enhance and consolidate plot rendering capabilities with comprehensive tests and documentation updates. Ensure users have clear CLI and programmatic examples for generating SVG and PNG plots.

# Unit Tests

Create or update tests/unit/plot-rendering.test.js

• Test that renderPlot(data) returns a string starting with <svg and containing a path element.
• Provide a small sample data array, call renderPlot, and assert basic shape expectations.
• Use sharp to convert the SVG string to a PNG buffer and assert the first eight bytes match the PNG signature.

# Integration Tests

Create tests/unit/cli-plot-integration.test.js

• Invoke the CLI with --expression y=x --range 0:2 --format svg --output temp.svg:
  – Assert exit code is 0.
  – Assert fs.existsSync(temp.svg) is true.
  – Read file contents and assert it starts with <svg.
  – Clean up temp.svg.

• Similarly, invoke the CLI with --expression y=x --range 0:2 --format png --output temp.png:
  – Assert exit code is 0.
  – Assert fs.existsSync(temp.png) is true.
  – Read the first eight bytes and verify they match the PNG signature bytes.
  – Clean up temp.png.

# Documentation Updates

## USAGE.md

Under "Generating Plots", ensure examples for both formats are present:

repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --output plot.svg
repository0-plot-code-lib --expression "y=cos(x)" --range 0:6.28 --format png --output plot.png

Add a new section "Programmatic Rendering Examples" after CLI examples:

Import the library and render an SVG string or PNG buffer:

```js
import { renderPlot } from "@xn-intenton-z2a/repository0-plot-code-lib";
import sharp from "sharp";

const data = [ { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 4 } ];
// SVG output
const svg = renderPlot(data);
console.log(svg);

// PNG output
sharp(Buffer.from(svg))
  .png()
  .toBuffer()
  .then(buffer => {
    console.log(buffer.slice(0, 8));
  });
```

## README.md

Under the "Examples" section, split into two subsections:

**CLI Rendering Examples**

```
# SVG plot via CLI
repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --output sin.svg

# PNG plot via CLI
repository0-plot-code-lib --expression "y=cos(x)" --range 0:6.28 --format png --output cos.png
```

**Programmatic Rendering Examples**

```js
import { renderPlot } from "@xn-intenton-z2a/repository0-plot-code-lib";
import sharp from "sharp";

const data = Array.from({ length: 100 }, (_, i) => ({ x: i, y: i * i }));

// Generate SVG
const svg = renderPlot(data, { width: 800, height: 600, margin: 40 });
console.log(svg.startsWith("<svg"));

// Generate PNG
sharp(Buffer.from(svg))
  .png()
  .toBuffer()
  .then(buffer => {
    console.log(buffer.slice(0, 8));
  });
```