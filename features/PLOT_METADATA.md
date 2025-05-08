# PLOT_METADATA

## Purpose
Allow users to enrich exported plots with descriptive metadata, including chart titles, axis labels, and legends. This enhances interpretability of visualizations generated via CLI or programmatic API.

## Source Changes
1. In src/lib/main.js:
   - Extend CLI argument parsing to support new flags:
     - --title <string>           Chart title text
     - --x-label <string>         X-axis label text
     - --y-label <string>         Y-axis label text
     - --show-legend <boolean>    Enable or disable legend display (default true)
   - Pass parsed metadata options into renderPlot or renderPlotChunked calls via options.metadata object:
     {
       title: { text: titleValue },
       scales: { x: { title: { display: Boolean(xLabel), text: xLabel } },
                 y: { title: { display: Boolean(yLabel), text: yLabel } } },
       plugins: { legend: { display: showLegend } }
     }
   - Ensure renderPlot and chunked rendering functions merge metadata into the ChartJS configuration before instantiation.

## Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add unit tests for metadata flags:
     a. Mock ChartJSNodeCanvas to capture chart configuration when main is invoked with --flow-sync and metadata flags.
        - Ensure config.options.plugins.legend.display matches --show-legend value.
        - Ensure config.options.title.text matches provided title.
        - Ensure config.options.scales.x.title.text and scales.y.title.text match provided labels.
   - Test default behavior when metadata flags are absent: title undefined, legend display true.

## Documentation Changes
1. In USAGE.md:
   - Document new metadata flags with descriptions and examples:
     node src/lib/main.js --flow-sync --start 0 --end 10 --step 1 x --format svg --title "Sine Wave" --x-label "Time (s)" --y-label "Amplitude" --show-legend false
2. In README.md:
   - Add section "Custom Plot Metadata":
     Describe how to add chart titles, axis labels, and toggle legends for both CLI and programmatic renderPlot calls.

## Dependencies
No new dependencies; leverage Chart.js built-in metadata configuration.

## Backward Compatibility
Default behavior remains unchanged when metadata flags are not provided: no title, axis labels omitted, legend displayed by default.

## Alignment with Mission
Enhances core visualization capabilities by making formula-driven plots more informative and publication-ready, supporting the mission to be the go-to CLI library for formula visualizations.