# Overview

Add end-to-end CLI integration tests to verify SVG and PNG rendering and update README examples for image output.

# Test File Changes

## Extend tests/unit/plot-generation.test.js

1. Import necessary modules at the top:
   • spawnSync from child_process
   • existsSync, readFileSync, unlinkSync from fs
   • path from path

2. Add a new describe block "CLI Integration Tests" with two tests:
   - "generates SVG file via CLI":
     • Use spawnSync to run the CLI with arguments ["--expression", "y=x", "--range", "0:2", "--format", "svg", "--output", tempSvgPath]
     • Assert exit status is 0
     • Assert existsSync(tempSvgPath) is true
     • Read contents via readFileSync and assert it starts with "<svg"
     • Clean up tempSvgPath with unlinkSync

   - "generates PNG file via CLI":
     • Use spawnSync to run the CLI with arguments ["--expression", "y=x", "--range", "0:2", "--format", "png", "--output", tempPngPath]
     • Assert exit status is 0
     • Assert existsSync(tempPngPath) is true
     • Read first eight bytes via readFileSync and compare to PNG signature bytes [0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]
     • Clean up tempPngPath with unlinkSync

# Documentation Updates

## README.md

Under the Examples section, ensure there are concrete commands for both formats:

```
# SVG plot via CLI
repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --format svg --output sin.svg

# PNG plot via CLI
repository0-plot-code-lib --expression "y=cos(x)" --range 0:6.28 --format png --output cos.png
```

Add or update these lines to guide users on generating and inspecting plot files.