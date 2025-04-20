# PDF_EXPORT Feature Enhancement

This feature introduces PDF export capabilities to the CLI tool. Leveraging the already included PDFKit library, users can now output their generated plots as PDF files by using the `--pdf` flag. This enhancement provides an additional export option to complement the existing SVG and PNG outputs, aligning with the mission to be a versatile plot library.

# Overview

- Introduce a new CLI flag `--pdf` to enable PDF export of the generated plots.
- Utilize PDFKit to create a PDF document from the plot data and output it as a file.
- Ensure that the PDF export does not interfere with the existing functionalities (e.g., `--svg`, `--png`, `--expression`, `--range`, `--stats`).

# CLI Integration

- Update the argument parsing in `src/lib/main.js` to recognize the `--pdf` flag. For example, extend the zod schema with:

  ```js
  pdf: z.boolean().optional()
  ```

- Modify the main execution branch to check if the `--pdf` flag is active, and if so, invoke the PDF generation routine.

# Implementation Details

- **Source Code Modifications:**
  - In `src/lib/main.js`, after computing the plot data, check for the presence of the `--pdf` flag.
  - Use PDFKit to create a PDF document. The PDF output should include a basic rendering of the plot (e.g., plot title, computed data, and any graphical representation available from the in-memory plot generation).
  - Ensure proper resource handling by piping the PDF output to a file stream (the filename can be derived from the provided `--file` parameter or a default name such as `output.pdf`).

- **Error Handling:**
  - Provide clear error messages if PDF generation fails or if PDFKit encounters issues.

# Testing Enhancements

- **Unit Tests:**
  - Update `tests/unit/main.test.js` to simulate CLI invocation with the `--pdf` flag.
  - Verify that when the flag is provided, the PDF generation routine is triggered (this may be validated via logging or by checking for expected function calls).
  - Ensure that the addition of the PDF export does not break existing tests.

# Documentation Updates

- **README.md:**
  - Add a section describing the new `--pdf` flag and how to use it. Include an example command such as:
    ```sh
    node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" --pdf --file output.pdf
    ```
  - Explain that when using the `--pdf` flag, the tool will generate a PDF using PDFKit.

# Dependency and Compliance

- No additional dependencies are required since PDFKit is already present in the repository.
- All changes conform to the guidelines (source, tests, README, dependencies) and are in line with the mission of providing comprehensive CLI visualisations as a go-to plot library.
