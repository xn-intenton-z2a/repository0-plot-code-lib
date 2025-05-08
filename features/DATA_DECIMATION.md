# DATA_DECIMATION

## Purpose
Improve rendering performance for large datasets by reducing the number of data points drawn using Chart.js decimation plugin.

## Specification

### Source Changes
1. In package.json:
   - Add chartjs-plugin-decimation ^2.x to dependencies.
2. In src/lib/main.js:
   - Import decimation plugin and register with Chart:
     import { Chart, registerables } from 'chart.js';
     import decimation from 'chartjs-plugin-decimation';
     Chart.register(...registerables, decimation);
   - Extend renderPlot to accept new options:
     - decimationEnabled (boolean, default false)
     - decimationAlgorithm (string, default 'largest_triangle_three_buckets')
     - decimationSamples (number, default 1000)
   - If decimationEnabled is true:
     - Add options.plugins.decimation settings with algorithm and samples before chart instantiation.
   - Maintain existing batch rendering and export behaviors.

### Test Changes
1. In tests/unit/plot-generation.test.js:
   - Add unit test for decimation:
     - Mock ChartJSNodeCanvas and run renderPlot with decimationEnabled true and a large seriesData array.
     - Verify that chart configuration received a data array trimmed to decimationSamples length.

### Documentation Changes
1. USAGE.md:
   - Document new CLI flags:
     --decimation-enabled
     --decimation-algorithm <algorithm>
     --decimation-samples <number>
   - Provide example usage with decimation enabled for large datasets.
2. README.md:
   - Update “Rendering Plots” section to describe how decimation improves performance for heavy data series.

### Dependencies
- Add chartjs-plugin-decimation ^2.x

### Backward Compatibility
Defaults decimationEnabled to false, preserving existing behavior when the plugin is not requested.