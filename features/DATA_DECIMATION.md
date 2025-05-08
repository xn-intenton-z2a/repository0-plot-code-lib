# DATA_DECIMATION

## Purpose
Improve rendering performance of large datasets by reducing the number of plotted points through Chart.js built-in data decimation, allowing faster exports while preserving visual fidelity.

## Specification

### Source Changes
1. In package.json update dependencies:
   - Add "chartjs-plugin-decimation": "^2.0.0" under dependencies.
2. In src/lib/main.js:
   - Import and register the decimation plugin:
     import { Chart, registerables } from 'chart.js';
     import decimation from 'chartjs-plugin-decimation';
     Chart.register(...registerables, decimation);
   - In the renderPlot and renderPlotChunked functions extend options to include:
     - decimationEnabled (boolean, default false)
     - decimationAlgorithm (string, default "largest_triangle_three_buckets")
     - decimationSamples (number, default 1000)
   - When decimationEnabled is true, merge into chart configuration:
     options.plugins = options.plugins || {};
     options.plugins.decimation = {
       algorithm: decimationAlgorithm,
       enabled: true,
       samples: decimationSamples
     };
   - Ensure CLI parsing adds flags:
     --decimation-enabled
     --decimation-algorithm <algorithm>
     --decimation-samples <number>
   - Pass parsed decimation options through to renderPlot or renderPlotChunked calls.

### Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add a test for decimation:
     - Mock ChartJSNodeCanvas to capture the chart configuration passed.
     - Invoke renderPlot with decimationEnabled true, decimationAlgorithm "largest_triangle_three_buckets", decimationSamples 5 and a series of length > 5.
     - Assert that the configuration passed to ChartJSNodeCanvas contains options.plugins.decimation.enabled true,
       options.plugins.decimation.algorithm matches the flag,
       and the dataset length is trimmed to decimationSamples.

### Documentation Changes
1. In USAGE.md:
   - Document new CLI flags:
     --decimation-enabled       Enable Chart.js data decimation plugin (default false)
     --decimation-algorithm <algorithm>  Select decimation algorithm (default largest_triangle_three_buckets)
     --decimation-samples <number>       Number of samples to retain after decimation (default 1000)
   - Provide an example:
     node src/lib/main.js --flow-sync --start 0 --end 1000 --step 1 sin(x) --decimation-enabled --decimation-samples 200 --format svg
2. In README.md:
   - Update the "Rendering Charts" section to mention decimation for large datasets and show CLI example.

### Dependencies
- Add chartjs-plugin-decimation ^2.0.0 to package.json dependencies.

### Backward Compatibility
Defaults to decimationEnabled false so existing behavior remains unchanged when decimation flags are not provided.

### Alignment with Mission
Supports the mission of being the go-to CLI library for formula visualisations by optimizing rendering performance on large datasets and enabling efficient exports.