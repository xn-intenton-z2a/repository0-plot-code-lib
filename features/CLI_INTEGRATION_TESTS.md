# Overview

Add integration tests for the CLI tool to verify that SVG and PNG outputs are generated correctly as files.  Ensure end-to-end behavior of the command-line interface, including exit codes, file creation, and output content validation.  Update documentation with concrete examples of CLI usage and expected output signatures.

# Integration Tests

Create tests/unit/cli-integration.test.js:

• "generates SVG file via CLI"
  - Spawn the CLI with ["--expression","y=x","--range","0:2","--format","svg","--output",svgPath].
  - Assert exit code is 0.
  - Assert fs.existsSync(svgPath) is true.
  - Read the first line of the file and assert it starts with "<svg".
  - Clean up svgPath after assertion.

• "generates PNG file via CLI"
  - Spawn the CLI with ["--expression","y=x","--range","0:2","--format","png","--output",pngPath].
  - Assert exit code is 0.
  - Assert fs.existsSync(pngPath) is true.
  - Read the first eight bytes of the file and assert they match the PNG signature bytes [137,80,78,71,13,10,26,10].
  - Clean up pngPath after assertion.

# Documentation Updates

In USAGE.md under "Generating Plots": add an "Integration Examples" subsection showing:

```
# SVG output via CLI
repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --output plot.svg
# Inspect first line of plot.svg to confirm <svg
```

```
# PNG output via CLI
repository0-plot-code-lib --expression "y=cos(x)" --range 0:6.28 --format png --output plot.png
# Inspect first bytes: 89 50 4E 47 0D 0A 1A 0A
```

In README.md under "Examples": add a subsection "CLI Integration Examples" with the same commands and brief notes on verifying file signatures.