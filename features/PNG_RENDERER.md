# PNG_RENDERER

## Summary

Provide a way to produce PNG output from a plot. PNG rendering may be implemented by converting SVG to PNG with a trusted library or by drawing on a canvas and exporting a PNG buffer.

## Motivation

PNG is required for raster output and for compatibility with tools that consume bitmap images.

## Scope

- Provide renderPNGFromSVG(svgString, options) which returns a Promise<Buffer> containing PNG bytes.
- The implementation may depend on an external library such as sharp or canvas; document the dependency in the README and package.json when implemented.

## Requirements

- The PNG buffer must begin with PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A.
- Export renderPNGFromSVG from src/lib/main.js when PNG rendering is available.

## Acceptance Criteria

- Converting a simple SVG to PNG yields a Buffer whose first 8 bytes match the PNG signature.
- The feature documents the chosen approach (sharp or canvas) and any installation notes for native dependencies.

## Notes

- Using sharp is recommended for Node.js server-side conversion of SVG to PNG; canvas can be used when more programmatic drawing is needed.
- Keep PNG options (width, height, background) configurable.
