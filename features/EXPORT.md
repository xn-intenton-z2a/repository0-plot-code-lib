# EXPORT Feature

## Overview
This feature updates and expands the existing PDF export functionality to serve as a comprehensive export solution. In addition to generating PDF outputs from the SVG plots, the feature now supports optional SVG minification. By enabling the new `--minify` CLI flag, users can obtain optimized SVG files with reduced file size and cleaner markup, which can be beneficial for web usage and performance.

## Implementation Details
- **Source File Changes**:
  - Update the CLI argument parser in `src/lib/main.js` to recognize the new `--minify` flag.
  - After generating the SVG content (for files with a `.svg` extension), check if the `--minify` flag is set. If so, pass the SVG string through the SVGO library to optimize and minify the SVG content before writing it to the file.
  - Integrate SVGO by importing it in `src/lib/main.js` and adding logic similar to:
    ```js
    import { optimize } from 'svgo';

    if (options.file.endsWith('.svg') && options.minify) {
      const optimized = optimize(svgContent, { multipass: true });
      svgContent = optimized.data;
    }
    ```
  - Ensure that the new flag does not interfere with the existing PDF conversion using Sharp.

- **Testing**:
  - Update the unit test file (`tests/unit/main.test.js`) to include scenarios that verify SVG output is minified when the `--minify` flag is provided. This may involve checking for removal of extraneous whitespace or unnecessary elements.
  - Verify that when `--minify` is not used, the SVG output remains unchanged (aside from any expected formatting).

- **Dependencies**:
  - Update `package.json` to add the SVGO library (e.g., "svgo": "^3.0.0") as a dependency.

## Documentation
- Update the `README.md` file to describe the new `--minify` CLI option. Provide usage examples, such as:

    node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg --minify

- Explain that enabling SVG minification can lead to reduced file sizes and cleaner SVG markup, which may improve performance in web settings.

## Compatibility and Value
This upgrade aligns with the mission to be the go-to plot library by enhancing output quality and efficiency. Users seeking both high-resolution PDF exports and optimized SVG files can benefit from a unified export solution.