# JPG_EXPORT Feature Enhancement

This feature adds support for exporting plots as JPEG images. Currently, the CLI tool supports CSV, SVG, and PNG outputs. With the addition of JPEG export, users have another widely supported image format to choose from.

# Overview

- **Objective:** Enable users to generate JPEG images by specifying an output file with the ".jpg" extension.
- **Benefits:** Provides additional flexibility and compatibility by offering JPEG output, appealing to users who prefer or require that format.
- **Integration:** The CLI argument parser in `src/lib/main.js` will be updated to detect when the output filename ends with `.jpg`. When detected, the tool will generate SVG content as before and use Sharp's `jpeg()` method to convert the SVG buffer into JPEG format.

# Implementation Details

- **Source Code Changes:**
  - In `src/lib/main.js`, add an additional condition in the output file type check. For files ending with `.jpg`, convert the generated SVG content to a JPEG buffer using Sharp:
    ```js
    if (outputFile.endsWith(".jpg")) {
      const svgContent = `<svg><text x='10' y='20'>Expression: ${expression}</text><text x='10' y='40'>Range: ${range}</text></svg>`;
      try {
        const buffer = await sharp(Buffer.from(svgContent)).jpeg().toBuffer();
        fs.writeFileSync(outputFile, buffer);
        console.log(`JPEG file generated: ${outputFile}`);
      } catch (err) {
        console.error(`Error creating JPEG file ${outputFile}:`, err);
      }
    }
    ```

- **Testing Enhancements:**
  - Update the test suite in `tests/unit/main.test.js` to include tests for JPEG file generation.
  - Verify that when `--file` ends with `.jpg`, a file is generated and its buffer starts with the JPEG signature (bytes: `0xFF, 0xD8, 0xFF`).

- **Documentation Updates:**
  - Update `README.md` to document the new `--file` behavior for JPEG export. For example:
    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28" --file output.jpg
    ```

# Conformance with Mission and Guidelines

This feature is fully compatible with existing modifications limited to source files, tests, and documentation. It extends the plot library's export capabilities, aligning with the mission of being a go-to plot library that offers diverse output options.
