# IMAGE_QUALITY Feature Enhancement

This feature introduces additional CLI flags to allow users to control the resolution and quality of the generated image outputs (PNG and PDF). The new flags, such as `--dpi` (dots per inch) and `--quality` (for compression quality), enable users to customize the appearance and clarity of their plots. This enhancement is achievable by updating the existing source file, test file, README, and dependency file content without creating or deleting files, and it aligns with our mission to provide versatile visualisation capabilities in a single repository.

# Overview

- **Objective:** Allow fine-tuning of output image quality and resolution when generating PNG and PDF plots.
- **Benefit:** Users can control image appearance by specifying DPI and quality values, ensuring the plots meet various usage requirements ranging from high-quality printing to fast web previews.
- **Usage Example:**
  ```sh
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.png --dpi 300 --quality 90
  ```

# CLI Parameter Integration

- **New Flags:**
  - `--dpi`: Specifies the resolution (dots per inch) to be used when converting SVG to PNG or PDF output.
  - `--quality`: Specifies the quality/compression level for image output (applicable to formats that support quality adjustments, e.g. PNG via sharp and JPEG export options can be derived similarly).

- **Parsing:** Extend the argument parser in `src/lib/main.js` to recognize these flags and convert their values to numbers.

# Implementation Details

- **Source File Modifications (src/lib/main.js):**
  - After processing other CLI parameters, read `--dpi` and `--quality` options.
  - When generating PNG output using sharp, use the `png({ quality: <quality_value>, compressionLevel: <derived from dpi if applicable> })` method to apply the quality setting. If `--dpi` is provided, adjust the output dimensions accordingly (for example, multiplying the width and height by a factor derived from the DPI value compared to a base DPI).
  - For PDF output, configure PDFDocument settings where possible, or annotate the output with DPI metadata if applicable.
  - Ensure that if these flags are not provided, the system defaults to its current behavior.

- **Testing Enhancements:**
  - Update `tests/unit/main.test.js` to include scenarios where `--dpi` and `--quality` flags are provided.
  - Verify that sharp is invoked with the expected quality settings when generating PNG files by mocking sharp and checking its parameters.
  - Add tests to ensure that the CLI message reflects the use of quality and DPI parameters.

- **Documentation Updates:**
  - Update `README.md` to document the new flags with usage examples and explanations:
    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1" --file output.png --dpi 300 --quality 90
    ```
  - Explain that `--dpi` adjusts the resolution and `--quality` sets the image output quality to meet various needs.

# Conformance with Mission and Guidelines

- **Repository Impact:** All changes are confined to modifying source files, tests, README, and dependencies if necessary. No new files are created or deleted.
- **Mission Alignment:** By providing users control over image output quality and resolution, the library becomes even more versatile and user friendly, reinforcing its mission to be the go-to plot library and "jq of formulae visualisations."