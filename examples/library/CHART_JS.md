# CHART_JS

## Crawl Summary
Chart.js documentation provides complete technical details including API constructors, type definitions, configuration examples, and migration guides. Key points include canvas rendering, built-in TypeScript typings, detailed animation options (AnimationSpec, AnimationsSpec), and chart configuration (scales, options). Migration sections document breaking changes from v3 to v4, including renamed scale parameters and file bundle adjustments. A complete code example for creating a basic bar chart is provided with all necessary HTML and JavaScript elements.

## Normalised Extract
## Table of Contents
1. Overview & Features
2. Chart Creation & Configuration
3. Animation & Scriptable Options
4. Scales & Defaults
5. Migration Guides (4.x and 3.x)

### 1. Overview & Features
- **License:** MIT
- **Rendering:** HTML5 Canvas
- **Performance:** Data decimation, tree-shaking support

### 2. Chart Creation & Configuration
- **Chart Initialization Example:**
  ```javascript
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
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
  });
  ```
- **Constructor Signature:**
  `new Chart(element, config)` where `config` includes `type`, `data`, and optional `options`.

### 3. Animation & Scriptable Options
- **AnimationSpec<TType>:**
  - `delay?: Scriptable<number, ScriptableContext<TType>>` (Default: 0)
  - `duration?: Scriptable<number, ScriptableContext<TType>>` (Default: 1000)
  - `easing?: Scriptable<EasingFunction, ScriptableContext<TType>>` (Default: 'easeOutQuart')
  - `loop?: Scriptable<boolean, ScriptableContext<TType>>` (Default: false)
- **AnimationsSpec<TType>:** Index signature allowing custom animations with properties `fn`, `from`, `to`, and `type` specifications.

### 4. Scales & Defaults
- **LinearScale Options:**
  ```javascript
  scales: {
    y: {
      beginAtZero: true
    }
  }
  ```
- **Renamed Options (v4 Migration):**
  - `scales[id].grid.drawBorder` -> `scales[id].border.display`
  - `scales[id].grid.borderWidth` -> `scales[id].border.width`
  - `scales[id].grid.borderColor` -> `scales[id].border.color`
  - `scales[id].grid.borderDash` -> `scales[id].border.dash`
  - `scales[id].grid.borderDashOffset` -> `scales[id].border.dashOffset`

### 5. Migration Guides (4.x & 3.x)
#### 4.x Migration
- Removal of default tooltip callbacks override.
- ES module only package; include "type": "module" in package.json.
- File renaming and scale configuration changes.

#### 3.x Migration
- Horizontal bar chart type removed; use `indexAxis`.
- Scales are now configured as keys directly under `options.scales` (e.g., `x`, `y`).
- Example of component registration for tree-shaking:
  ```javascript
  import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
  ```


## Supplementary Details
### Detailed Configuration Options

1. **Animation Options:**
   - `delay`: Number (in ms) before animation starts. Default: 0
   - `duration`: Duration in ms of animation. Default: 1000
   - `easing`: Easing function (e.g., 'easeOutQuart').
   - `loop`: Boolean to loop animations. Default: false

2. **Chart Options:**
   - **Data Object:** Must include `labels` (array of strings) and `datasets` (array of dataset objects).
   - **Dataset Object:** Includes properties like `label`, `data` (array of numbers or objects), and `borderWidth`.
   - **Scales Configuration:** Directly configure axes. For example, the y-axis option `beginAtZero: true` ensures that the y-axis starts at zero.

3. **Migration Specific Configurations:**
   - For Chart.js v4, renamed scale properties and removal of certain defaults (e.g., tooltip callbacks).
   - For Chart.js v3, scales are now defined as keys and options like `xAxes` arrays are deprecated.

4. **ES Module Integration:**
   - Ensure your `package.json` includes `{ "type": "module" }` for using Chart.js as an ES module.
   - For component registration and tree shaking: import and register only required controllers, elements, scales, and plugins.

5. **Best Practices:**
   - Always assign a dedicated container for the canvas element for responsiveness.
   - When using custom plugins or animation, provide explicit configurations in the Chart constructor to avoid default overrides.

6. **Troubleshooting Procedures:**
   - Use browser developer tools to inspect the canvas element if rendering issues occur.
   - Check the console for errors related to ESM imports if package.json misconfiguration exists.
   - Ensure that the provided canvas context is not already in use; the Chart constructor will throw an error if it is.
   - Verify the migration changes if upgrading from v3 to v4 to ensure deprecated options are updated.


## Reference Details
### Complete API Specifications & Method Signatures

1. **Chart Constructor:**
   ```typescript
   class Chart {
     constructor(
       item: string | CanvasRenderingContext2D | HTMLCanvasElement | { canvas: HTMLCanvasElement },
       config: {
         type: ChartType,
         data: ChartData,
         options?: ChartOptions
       }
     );
   }
   ```
   - **Parameters:**
     - `item`: DOM element or context where the chart is rendered.
     - `config`: Object containing `type` (e.g., 'bar', 'line'), `data` (labels and datasets), and `options` (configuration options such as scales and animations).

2. **Animation Specification:**
   ```typescript
   interface AnimationSpec<TType extends ChartType> {
     delay?: Scriptable<number, ScriptableContext<TType>>; // Default: 0
     duration?: Scriptable<number, ScriptableContext<TType>>; // Default: 1000
     easing?: Scriptable<EasingFunction, ScriptableContext<TType>>; // Default: 'easeOutQuart'
     loop?: Scriptable<boolean, ScriptableContext<TType>>; // Default: false
   }
   
   interface AnimationsSpec<TType extends ChartType> {
     [name: string]: false | (AnimationSpec<TType> & {
       fn: <T>(from: T, to: T, factor: number) => T;
       from: Scriptable<Color | number | boolean, ScriptableContext<TType>>;
       properties: string[];
       to: Scriptable<Color | number | boolean, ScriptableContext<TType>>;
       type: 'color' | 'number' | 'boolean';
     });
   }
   ```

3. **Scale Options Example (Linear Scale):**
   ```typescript
   interface LinearScaleOptions extends CartesianScaleOptions {
     beginAtZero: boolean;
     grace?: string | number;
     suggestedMax?: number;
     suggestedMin?: number;
     ticks: {
       count: number;
       format: Intl.NumberFormatOptions;
       precision: number;
       stepSize: number;
     };
   }
   ```

4. **Migration Example (Component Registration for Tree Shaking):**
   ```javascript
   import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
   
   // Register only the components you need
   Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
   
   // Create a new chart instance
   const ctx = document.getElementById('myChart');
   const chart = new Chart(ctx, {
     type: 'line',
     data: {/* ... */},
     options: {
       plugins: {
         title: {
           display: true,
           text: 'Chart Title'
         }
       },
       scales: {
         x: { type: 'linear' },
         y: { type: 'linear' }
       }
     }
   });
   ```

5. **Troubleshooting Commands:**
   - **Check Canvas Context Availability:**
     ```javascript
     if (!ctx) { console.error('Canvas element not found or already in use.'); }
     ```
   - **ES Module Configuration:**
     Ensure your package.json contains:
     ```json
     { "type": "module" }
     ```
   - **Browser Console:** Inspect error messages to verify misconfigurations in chart options or registration issues.

This complete API specification provides developers with exact parameter types, method signatures, code examples with comments, configuration options including defaults, and step-by-step troubleshooting commands.

## Original Source
Chart.js Documentation
https://www.chartjs.org/docs/latest/

## Digest of CHART_JS

# Chart.js Documentation Digest

**Retrieved:** 4/15/2025, 1:19:05 PM

# Overview
Chart.js is an open-source JavaScript charting library under the MIT license, providing built-in chart types, plugins, and extensive customization options. It renders charts on an HTML5 canvas for performance and is compatible with frameworks like React, Vue, Svelte, and Angular.

# Core Features & Configuration
- **Built-in Chart Types:** Bar, Line, Pie, Doughnut, Radar, Polar Area, etc.
- **Defaults:** Animations are enabled by default; a sound configuration exists for immediate production use.
- **Integrations:** Includes built-in TypeScript typings and supports ES modules.
- **Performance:** Uses canvas rendering and supports data decimation and tree-shaking.
- **Developer Experience:** Comprehensive API reference, documentation, and community support.

# Getting Started & Code Example

## HTML & Script Setup
```html
<div>
  <canvas id="myChart"></canvas>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
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
        y: {
          beginAtZero: true
        }
      }
    }
  });
</script>
```

This example demonstrates creating a bar chart with a given set of labels and dataset, configuring the y-axis to start at zero.

# API Specifications & Type Definitions

## Animation and Scriptable Options

- **AnimationSpec**
  - **Type:** `AnimationSpec<TType>`
  - **Properties:**
    - `delay?: Scriptable<number, ScriptableContext<TType>>` (Default: 0)
    - `duration?: Scriptable<number, ScriptableContext<TType>>` (Default: 1000)
    - `easing?: Scriptable<EasingFunction, ScriptableContext<TType>>` (Default: 'easeOutQuart')
    - `loop?: Scriptable<boolean, ScriptableContext<TType>>` (Default: false)

- **AnimationsSpec**
  - **Type:** `AnimationsSpec<TType>` 
  - **Structure:** Index signature: `[name: string]: false | (AnimationSpec<TType> & { fn: <T>(from: T, to: T, factor: number) => T; from: Scriptable<Color | number | boolean, ScriptableContext<TType>>; properties: string[]; to: Scriptable<Color | number | boolean, ScriptableContext<TType>>; type: "color" | "number" | "boolean" })`

## Chart Creation & Configuration

- **Chart Constructor Signature:**
  ```typescript
  new Chart(
    item: string | CanvasRenderingContext2D | HTMLCanvasElement | { canvas: HTMLCanvasElement },
    config: {
      type: ChartType,
      data: ChartData,
      options?: ChartOptions
    }
  );
  ```

- **Scales Configuration:**
  - Example for linear scale:
  ```javascript
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
  ```

## Migration Specifics

### 4.x Migration Guide
- **Breaking Changes:**
  - Default tooltip callbacks are no longer overridden by individual charts.
  - Scale configuration: e.g., `scales[id].grid.drawBorder` is now `scales[id].border.display`.
  - File renaming for bundles:
    - `dist/chart.min.js` renamed to `dist/chart.umd.js`
    - `dist/chart.esm.js` renamed to `dist/chart.js`
- **ES Module Requirement:**
  - `package.json` must include `{ "type": "module" }`.

### 3.x Migration Guide
- **Breaking Changes:**
  - Removal of horizontal bar `chart type`; now use `indexAxis` in configuration.
  - Refactored scales: xAxes/yAxes arrays removed. Use direct scale keys in `options.scales`.
  - Updates on default values e.g., tooltip mode changes from "index" to "nearest".
  - Example registration for tree shaking:
  ```javascript
  import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
  ```

# Attribution & Data Size
- **Original Data Size:** 4892957 bytes
- **Links Found:** 50337
- **No Errors During Crawling**


## Attribution
- Source: Chart.js Documentation
- URL: https://www.chartjs.org/docs/latest/
- License: MIT
- Crawl Date: 2025-04-21T13:48:44.967Z
- Data Size: 4892957 bytes
- Links Found: 50337

## Retrieved
2025-04-21
