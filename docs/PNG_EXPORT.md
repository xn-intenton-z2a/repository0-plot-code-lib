# PNG Export

The library exposes a PNG export API that currently returns a small valid PNG image (1x1 transparent) to avoid requiring native dependencies in CI.

- The PNG output begins with the standard PNG signature bytes: 89 50 4E 47 0D 0A 1A 0A.
- Tests assert the first eight bytes to verify PNG output correctness.

To improve fidelity (rendering the actual SVG to PNG) add a renderer such as `sharp` or `canvas` and update `renderPng` to convert an SVG string to a full-resolution PNG image.
