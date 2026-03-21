# CLI Usage and Examples

This document records the CLI examples used by the test-suite and README.

Usage examples:

Render a sine wave to SVG:

```
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file out.svg
```

Load a CSV and render to PNG (Node only):

```
node src/lib/main.js --csv data.csv --file out.png
```

Show help:

```
node src/lib/main.js --help
```

Notes:
- The SVG output will contain a `<polyline>` element and a `viewBox` attribute.
- The PNG output currently produces a valid PNG file (1x1 placeholder) whose first eight bytes match the PNG signature.
