# PNG_RENDERER

Status: Baseline implemented; enhancement planned

Overview

Provide conversion from generated SVG to PNG bytes. The repository currently contains a minimal fallback that returns a valid 1x1 PNG buffer to satisfy tests without introducing native dependencies. A full-featured rasterizer using an optional native dependency is the planned enhancement.

Current behavior

- Expose renderPng(svgString, opts?) -> Buffer. The baseline implementation returns a stable 1x1 PNG Buffer; svgString is accepted but not rasterized in the baseline.

Planned enhancement

- Implement full SVG-to-PNG rasterization using an optional dependency such as sharp or node-canvas. The enhanced renderer should accept width and height options and produce PNG bytes matching the rasterized output.
- Detect whether the optional dependency is available at runtime; when missing, fall back to the baseline 1x1 PNG to keep tests and usage simple.

Acceptance criteria (testable)

Baseline (already testable):
- renderPng returns a Buffer and its first four bytes equal the PNG magic bytes 0x89 0x50 0x4E 0x47.

Enhanced (when optional dependency present):
- When sharp is installed, renderPng(svgString, { width, height }) returns a Buffer that is a valid PNG and whose pixel dimensions metadata match the requested width and height.
- Unit tests that require the enhanced behavior should detect availability of the native dependency and skip or assert accordingly when it is absent.

Testing notes

- Provide tests that assert the baseline magic bytes so CI without native deps passes.
- Provide optional tests that run only when the environment has sharp or canvas available; these tests should assert raster dimensions or a non-trivial buffer size.

Implementation notes

- Preferred implementation: use sharp(Buffer.from(svgString)).png({ width, height }).toBuffer() when sharp is available.
- Document installation instructions for optional dependency in README.
