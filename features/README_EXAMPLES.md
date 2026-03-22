# README_EXAMPLES

# Description

Update the repository README with concrete usage examples for the CLI and a short explanation of how SVG and PNG rendering are implemented. Include sample commands and describe the expected output files so users and tests can verify behaviour.

# Acceptance Criteria

- The README contains example CLI commands showing expression and CSV usage, such as node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg and node src/lib/main.js --csv data.csv --file output.png.
- The README documents the PNG generation approach (canvas or SVG conversion) and any runtime dependency required.
- The README includes a brief note explaining that the library exports named functions from src/lib/main.js for programmatic use and lists the key exported function names: parseExpression, parseRange, evaluateRange, loadTimeSeriesCsv, renderSvg, renderPng, savePlot.