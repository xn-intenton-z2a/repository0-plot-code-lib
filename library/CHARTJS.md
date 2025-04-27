# CHARTJS

## Crawl Summary
Chart.js documentation provides comprehensive API details for constructing charts using an HTML5 canvas element. The library exposes a Chart constructor accepting a configuration object with keys type, data, and options. Detailed configuration options include animation specifications (delay, duration, easing, loop), scale settings (e.g., LinearScaleOptions with beginAtZero and tick configuration), and plugin integration. The migration guides for v4.x and v3.x detail breaking changes such as property renaming (e.g., grid.drawBorder to border.display) and the shift to ESM-only builds with manual registration of components for tree shaking.

## Normalised Extract
Table of Contents:
1. Installation and Setup
   - CDN integration or npm module installation with ESM support
2. Chart Initialization
   - new Chart(ctx, config) API using a configuration object
3. Configuration Options
   - Data schema: labels array and datasets array
   - Options object containing scales, plugins, and animation settings
4. Animation Specifications
   - AnimationSpec<T>: delay (default 0), duration (default 1000), easing (default 'easeOutQuart'), loop (default false), onComplete and onProgress callbacks
5. Scale Configuration
   - LinearScaleOptions: beginAtZero, grace, suggestedMax, suggestedMin, ticks: count, format, precision, stepSize
6. Migration Guidelines
   - v4.x: Renamed properties in scales (grid.drawBorder to border.display, etc.), ESM-only package, configuration changes
   - v3.x: Removal of xAxes/yAxes arrays, new tree-shakable registration using Chart.register(), updated tooltip and interaction settings

Detailed Implementation:
Installation via npm requires setting "type": "module" in package.json. For browser integration, include Chart.js from CDN.
Usage: Obtain canvas element, create config object with mandatory keys (type, data, options), then call new Chart(element, config).
For animations, specify per-property animation parameters in AnimationSpec. Scale configuration must use direct mapping with scale identifier keys (e.g. x, y) where options such as beginAtZero are defined.
Manual registration example in v3+:
import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

Troubleshooting: If encountering a configuration error, check renamed properties according to migration guides. For ESM errors with Jest, refer to Jest documentation or migrate to Vitest.

## Supplementary Details
Installation: npm install chart.js or include via CDN (https://cdn.jsdelivr.net/npm/chart.js). Ensure package.json includes "type": "module" for ESM compatibility.

Configuration Options:
- Chart Type: 'bar', 'line', 'doughnut', etc.
- Data: { labels: string[], datasets: [{ label: string, data: number[], borderWidth: number }] }
- Options:
    scales: { x: { type: 'time'|'linear'|'category', display: true, title: { display: true, text: 'Label' }, ticks: { beginAtZero: boolean, stepSize: number } } }
    plugins: { tooltip: { callbacks: { label: function(context) { ... } } } }
    animation: { delay: 0, duration: 1000, easing: 'easeOutQuart', loop: false }

API Method Signatures:
- Chart Constructor: new Chart(ctx: HTMLCanvasElement | CanvasRenderingContext2D, config: ChartConfiguration): Chart
- Chart.register(...components: ChartComponentLike[]): void

Migration Changes (v4.x examples):
- scales[id].grid.drawBorder -> scales[id].border.display
- scales[id].grid.borderWidth -> scales[id].border.width
- scales[id].grid.borderColor -> scales[id].border.color
- scales[id].grid.borderDash -> scales[id].border.dash
- scales[id].grid.borderDashOffset -> scales[id].border.dashOffset

Implementation steps:
1. Include Chart.js via CDN or npm
2. Create canvas element in HTML
3. Define configuration object with type, data, and options
4. Call new Chart(ctx, config)
5. For advanced scenarios, import module components and register them manually

Best Practices:
- Use tree shaking by manually registering only required controllers, elements, and plugins
- Migrate to ESM for consistent module support
- Validate configuration changes when upgrading from v3 to v4 using detailed migration guides

Troubleshooting Procedures:
- Verify canvas context availability
- Check for typos in configuration property names (e.g., border.display vs grid.drawBorder)
- For ESM issues, ensure package.json declares module type
- Use console logging in animation callbacks to debug performance.

## Reference Details
API Specifications:

Chart Constructor:
Signature: new Chart(ctx: HTMLCanvasElement | CanvasRenderingContext2D, config: ChartConfiguration) => Chart
Config Object:
{
  type: ChartType, // e.g., 'bar', 'line', 'pie'
  data: {
    labels: string[],
    datasets: Array<{
      label: string,
      data: number[] | (number | [number, number] | Point | BubbleDataPoint)[],
      borderWidth: number
    }>
  },
  options: {
    scales: {
      [scaleId: string]: {
        type?: 'linear' | 'logarithmic' | 'time' | 'category' | 'timeseries',
        display?: boolean,
        beginAtZero?: boolean,
        title?: { display: boolean, text: string },
        ticks?: { stepSize?: number, count?: number, precision?: number, format?: Intl.NumberFormatOptions }
      }
    },
    plugins: {
      tooltip?: {
        callbacks?: {
          label?: (context: TooltipItem) => string
        }
      }
    },
    animation?: {
      delay?: number,          // Default: 0
      duration?: number,       // Default: 1000
      easing?: string,         // Default: 'easeOutQuart'
      loop?: boolean,          // Default: false
      onComplete?: (this: Chart, event: AnimationEvent) => void,
      onProgress?: (this: Chart, event: AnimationEvent) => void
    }
  }
}

SDK Method Signatures:
Chart.register(...components: ChartComponentLike[]): void

Example Code:
-----------------------------------------------------
// HTML:
<div>
  <canvas id="myChart"></canvas>
</div>

// JavaScript using CDN:
const ctx = document.getElementById('myChart');
const config = {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
};
new Chart(ctx, config);

// Example Using ESM (v3+):
import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
const chart = new Chart(ctx, {
  type: 'line',
  data: { ... },
  options: {
    plugins: { title: { display: true, text: 'Chart Title' } },
    scales: { x: { type: 'linear' }, y: { type: 'linear' } }
  }
});
-----------------------------------------------------

Configuration Options with Values:
- Animation: { delay: 0, duration: 1000, easing: 'easeOutQuart', loop: false }
- Linear Scale: { beginAtZero: true, ticks: { stepSize: 1, count: 5, precision: 0 } }
- Migration v4.x changes: scales[id].border.display (was grid.drawBorder), scales[id].border.width (was grid.borderWidth), etc.

Troubleshooting Commands:
- Verify installation: npm list chart.js
- Run build: npm run build
- For module errors, check package.json for "type": "module"
- Use console.log on config object to validate property names before instantiating Chart.

Best Practices:
- Register only required components to optimize bundle size
- Follow migration guides for breaking changes
- Utilize scriptable options for dynamic configurations in animations and tooltips

## Information Dense Extract
Chart.js v4.4.9; new Chart(ctx, {type: string, data: {labels: string[], datasets: [{label: string, data: number[], borderWidth: number}]}, options: {scales: {[id:string]: {type?: 'linear'|'time'|'category', display?: boolean, beginAtZero?: boolean, title?:{display: boolean, text: string}, ticks?: {stepSize?: number, count?: number, precision?: number}}}, plugins: {tooltip?: {callbacks?: {label?: function}}}, animation?: {delay?: number (default:0), duration?: number (default:1000), easing?: string (default:'easeOutQuart'), loop?: boolean (default:false), onComplete?: function, onProgress?: function}}}); Migration v4.x: scales[id].grid.drawBorder->border.display, borderWidth->border.width, borderColor->border.color, borderDash->border.dash, borderDashOffset->border.dashOffset; ESM-only package; Register components manually via Chart.register(...components); Code examples provided for CDN and ESM usage; Troubleshooting via npm list, package.json "type": "module" verification; API interfaces and SDK method signatures explicitly defined.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
   - CDN integration or npm module installation with ESM support
2. Chart Initialization
   - new Chart(ctx, config) API using a configuration object
3. Configuration Options
   - Data schema: labels array and datasets array
   - Options object containing scales, plugins, and animation settings
4. Animation Specifications
   - AnimationSpec<T>: delay (default 0), duration (default 1000), easing (default 'easeOutQuart'), loop (default false), onComplete and onProgress callbacks
5. Scale Configuration
   - LinearScaleOptions: beginAtZero, grace, suggestedMax, suggestedMin, ticks: count, format, precision, stepSize
6. Migration Guidelines
   - v4.x: Renamed properties in scales (grid.drawBorder to border.display, etc.), ESM-only package, configuration changes
   - v3.x: Removal of xAxes/yAxes arrays, new tree-shakable registration using Chart.register(), updated tooltip and interaction settings

Detailed Implementation:
Installation via npm requires setting 'type': 'module' in package.json. For browser integration, include Chart.js from CDN.
Usage: Obtain canvas element, create config object with mandatory keys (type, data, options), then call new Chart(element, config).
For animations, specify per-property animation parameters in AnimationSpec. Scale configuration must use direct mapping with scale identifier keys (e.g. x, y) where options such as beginAtZero are defined.
Manual registration example in v3+:
import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

Troubleshooting: If encountering a configuration error, check renamed properties according to migration guides. For ESM errors with Jest, refer to Jest documentation or migrate to Vitest.

## Original Source
Chart.js Documentation
https://www.chartjs.org/docs/latest/

## Digest of CHARTJS

# Chart.js Documentation Digest

Retrieved on: 2025-04-15

# Overview
Chart.js is a popular open-source charting library maintained under the MIT license. It renders charts on HTML5 canvas and provides configurable chart types, plugins, and defaults that help developers quickly create production-ready charts.

# Core API and Usage
- API Entry: new Chart(ctx, config)
- Config Object Structure:
  - type: string (e.g., 'bar', 'line', 'doughnut')
  - data: { labels: array, datasets: array }
  - options: object for scales, plugins, animations, etc.

# Detailed API Specifications
## Chart Constructor
Signature: new Chart(ctx: (HTMLCanvasElement | CanvasRenderingContext2D), config: ChartConfiguration) => Chart

## ChartConfiguration Object
Properties:
  - type: ChartType
  - data: { labels: string[] | any[], datasets: Array<ChartDatasetProperties> }
  - options: {
       scales: { [scaleId: string]: ScaleOptions },
       plugins: { [pluginId: string]: Object },
       animation: AnimationOptions
    }

## Animation Options
Type AnimationSpec<T>:
  {
    delay?: number;  // Default 0 ms
    duration?: number; // Default 1000 ms
    easing?: string; // Default 'easeOutQuart'
    loop?: boolean; // Default false
    onComplete?: (this: Chart, event: AnimationEvent) => void;
    onProgress?: (this: Chart, event: AnimationEvent) => void
  }

## Scale Options
Example for LinearScaleOptions:
  {
    beginAtZero: boolean,
    grace?: string | number,
    suggestedMax?: number,
    suggestedMin?: number,
    ticks: {
      count: number,
      format: Intl.NumberFormatOptions,
      precision: number,
      stepSize: number
    }
  }

# Migration Guides and Breaking Changes
## Chart.js v4.x
- Defaults: Animations enabled by default. New property mappings:
    - scales[id].grid.drawBorder is now scales[id].border.display
    - scales[id].grid.borderWidth is now scales[id].border.width
    - scales[id].grid.borderColor is now scales[id].border.color
    - scales[id].grid.borderDash is now scales[id].border.dash
    - scales[id].grid.borderDashOffset is now scales[id].border.dashOffset
- API becomes ESM-only; ensure package.json contains "type": "module".

## Chart.js v3.x
- Removal of xAxes/yAxes arrays: Scales are now defined directly under options.scales with the scale ID (e.g., x, y).
- New tree-shakable module design. Import and register required components manually:
  Example:
    import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
- Tooltip and interaction configurations have been updated. Use options.plugins.tooltip and options.interaction for shared defaults.

# Code Example
HTML:
<div>
  <canvas id="myChart"></canvas>
</div>

JavaScript:
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const ctx = document.getElementById('myChart');
  const chartConfig = {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  };
  new Chart(ctx, chartConfig);
</script>

# Attribution
Data Size: 2582759 bytes; Crawled Links: 36406

## Attribution
- Source: Chart.js Documentation
- URL: https://www.chartjs.org/docs/latest/
- License: MIT License
- Crawl Date: 2025-04-27T16:49:44.693Z
- Data Size: 2582759 bytes
- Links Found: 36406

## Retrieved
2025-04-27
