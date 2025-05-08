# RENDER_PLOT_EXPORT

## Purpose
Streamline plot rendering for large datasets by integrating ChartJSNodeCanvas with a streaming approach, while retaining existing SVG and PNG export capabilities. Add comprehensive unit and integration tests and update documentation to illustrate render output.

## Specification

### Source Changes
- No additional source code changes required; existing renderPlot function and CLI flags remain unchanged.

### Test Changes
- In tests/unit/plot-generation.test.js:
  - Add unit test for renderPlot function:
    - Import renderPlot from main.js.
    - Invoke renderPlot with a small seriesData array and options.format set to svg and png.
    - For svg, assert returned string contains opening <svg tag.
    - For png, assert returned Buffer begins with PNG header bytes (0x89 50 4E 47).
  - Add CLI integration tests:
    - Run CLI main with --flow-sync --start 0 --end 2 --step 1 x --format svg and capture console.log output. Assert output starts with <svg.
    - Run CLI main with --flow-sync --start 0 --end 2 --step 1 x --format png and capture output buffer. Assert it begins with PNG signature bytes.

### Documentation Changes
- Update USAGE.md:
  - Document new --format flag with options svg and png and default format behavior.
  - Provide CLI examples:
    node src/lib/main.js --flow-sync --start 0 --end 4 --step 1 x --format svg
    node src/lib/main.js --flow-sync --start 0 --end 4 --step 1 x --format png
- Update README.md:
  - Add rendering examples section showing SVG and PNG output snippets.

### Dependencies
- No new dependencies required for testing or documentation.

### Backward Compatibility
- Default behavior and existing flags remain unchanged when --format is omitted; preserve SVG as default format.

## Alignment with Mission
Enhances library reliability through comprehensive tests and clarifies user workflows, furthering our mission to be the go-to CLI for formula visualizations.