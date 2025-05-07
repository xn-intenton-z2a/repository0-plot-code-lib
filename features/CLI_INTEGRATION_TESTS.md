# Overview

Add comprehensive end-to-end integration tests for the CLI tool to verify SVG and PNG outputs are generated correctly both as files and to standard output. Update USAGE.md and README.md with concrete examples showing how to run these commands and verify their outputs.

# Integration Tests

Create tests/unit/cli-integration.test.js with the following tests:

• generates SVG file via CLI
  - Spawn the CLI with ["--expression","y=x","--range","0:2","--format","svg","--output", svgPath]
  - Assert exit code is 0
  - Assert fs.existsSync(svgPath) is true
  - Read the first line of the file and assert it starts with "<svg"
  - Clean up svgPath after assertion

• generates PNG file via CLI
  - Spawn the CLI with ["--expression","y=x","--range","0:2","--format","png","--output", pngPath]
  - Assert exit code is 0
  - Assert fs.existsSync(pngPath) is true
  - Read the first eight bytes of the file and assert they match the PNG signature [137,80,78,71,13,10,26,10]
  - Clean up pngPath after assertion

• writes SVG to stdout when no output file specified
  - Spawn the CLI with ["--expression","y=x","--range","0:2","--format","svg"]
  - Capture stdout and assert it starts with "<svg"

• writes PNG to stdout when no output file specified
  - Spawn the CLI with ["--expression","y=x","--range","0:2","--format","png"]
  - Capture stdout as Buffer and assert the first eight bytes match the PNG signature

# Documentation Updates

In USAGE.md under "Generating Plots", add an "Integration Examples" subsection:

repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --output plot.svg  
Inspect first line: <svg

repository0-plot-code-lib --expression "y=cos(x)" --range 0:6.28 --format png --output plot.png  
Inspect PNG signature: 89 50 4E 47 0D 0A 1A 0A

In README.md under "Examples", add a subsection "CLI Integration Examples" with the same commands and brief verification notes.