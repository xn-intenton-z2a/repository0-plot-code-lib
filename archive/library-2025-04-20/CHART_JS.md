# CHART_JS

## Crawl Summary
Chart.js documentation provides a comprehensive API with features including built-in chart types, default animations, extensive customization options, and multiple integration methods with popular frameworks. It details installation via npm or CDN, constructing charts using the Chart constructor, and migration guides for 4.x and 3.x versions which include specific configuration changes such as renaming of options, updated scale configuration, and ESM-only support. Detailed type definitions for configuration options, animation settings, and scales are provided along with step-by-step troubleshooting procedures.

## Normalised Extract
## Table of Contents
1. Features & Overview
2. Getting Started Example
3. Migration Guides (4.x & 3.x)
4. API Specifications & Type Definitions
5. Troubleshooting Procedures

---

### 1. Features & Overview
- Open-source under MIT License
- Built-in chart types: bar, line, pie, doughnut, radar, polar area
- Customizable via plugins and scriptable options
- Responsive default configuration with animations enabled
- Canvas rendering for optimal performance

### 2. Getting Started Example
**HTML and JavaScript Code:**
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
        y: { beginAtZero: true }
      }
    }
  });
</script>
```

### 3. Migration Guides
#### 4.x Migration Guide
- **Configuration Changes:**
  - Renamed grid options to border options (e.g., `drawBorder` → `border.display`).
  - Animation configurations redefined with clear defaults.
  - ESM-only package requirement; set "type": "module" in package.json.

#### 3.x Migration Guide
- **Breaking Changes:**
  - Horizontal bar charts removed; use `indexAxis` instead.
  - Scales defined directly under options.scales with unique keys.
  - Renamed tooltip and legend configuration options.
- **Component Registration Example:**
```js
import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
```

### 4. API Specifications & Type Definitions
**Chart Constructor:**
```ts
new Chart(
  context: string | CanvasRenderingContext2D | HTMLCanvasElement | { canvas: HTMLCanvasElement } | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
  config: ChartConfiguration
): Chart;
```

**Example ChartConfiguration Interface:**
```ts
interface ChartConfiguration {
  type: ChartType;
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[] | Array<number | [number, number]>;
      borderWidth?: number;
    }>;
  };
  options?: {
    scales?: { [key: string]: { beginAtZero?: boolean; title?: { display: boolean; text: string }; ticks?: { callback?: (value: any, index: number, values: any[]) => string; stepSize?: number; }; } };
    plugins?: { title?: { display: boolean; text: string }; tooltip?: { mode?: string; callbacks?: { [key: string]: Function }; } };
    animation?: {
      delay?: number;
      duration?: number;
      easing?: string;
      loop?: boolean;
    };
  };
}
```

**Type Definitions Example:**
```ts
interface LinearScaleOptions {
  beginAtZero: boolean;
  grace?: string | number;
  suggestedMax?: number;
  suggestedMin?: number;
  ticks: { count: number; format: Intl.NumberFormatOptions; precision: number; stepSize: number };
}

interface TimeScaleOptions {
  adapters: { date: any };
  bounds: 'ticks' | 'data';
  max: string | number;
  min: string | number;
  offsetAfterAutoskip: boolean;
  suggestedMax: string | number;
  suggestedMin: string | number;
  ticks: TimeScaleTickOptions;
  time: TimeScaleTimeOptions;
}
```

### 5. Troubleshooting Procedures
1. **Canvas Already in Use:**
   - Verify unique canvas element; ensure correct DOM query using `document.getElementById('myChart')`.
2. **ESM Import Issues:**
   - Ensure package.json contains `{ "type": "module" }`.
3. **Missing Time Adapter:**
   - Install and import a date adapter (e.g., `chartjs-adapter-date-fns`).
   - Example: `import 'chartjs-adapter-date-fns';`


## Supplementary Details
## Supplementary Technical Specifications

### Chart Instantiation
- **Constructor:** `new Chart(ctx, config)`
  - **Parameters:**
    - `ctx`: String, CanvasRenderingContext2D, HTMLCanvasElement, or object with canvas property.
    - `config`: Object conforming to `ChartConfiguration`.

### Configuration Options
- **Type:** string (e.g., 'bar', 'line', etc.)
- **Data:**
  - `labels`: Array of strings.
  - `datasets`: Array of objects with properties:
    - `label`: string
    - `data`: Array of numbers or paired values
    - `borderWidth`: number (default: 1)

- **Options:**
  - `scales`: Object with keys representing scale IDs. Each scale supports:
    - `beginAtZero`: boolean
    - `title`: Object { display: boolean, text: string }
    - `ticks`: Object { callback?: function, stepSize?: number }
  - `plugins`: Object where plugin configuration is stored (e.g., `title`, `tooltip`)
  - `animation`: Object with properties:
    - `delay`: number (default 0)
    - `duration`: number (default 1000)
    - `easing`: string (default 'easeOutQuart')
    - `loop`: boolean (default false)

### Implementation Steps
1. Add a canvas element in your HTML.
2. Include Chart.js via CDN or npm package.
3. Acquire the canvas context:
   ```js
   const ctx = document.getElementById('myChart');
   ```
4. Instantiate a chart with desired configuration.

### Configuration Options (Defaults & Effects)
- **scales.y.beginAtZero:** Ensures the y-axis starts at zero.
- **animation.duration:** Sets the time (in ms) for animation transitions.
- **plugins.title.text:** Specifies the chart title.

### Best Practices
- **Responsive Design:** Place charts within responsive containers.
- **Tree Shaking in ESM:** Import only required components and register them.
- **Time Scale Usage:** Always include a compatible date adapter if using time scales.

### Troubleshooting Commands
- **Check Canvas Reference:**
   - Command: `console.log(ctx)`
   - Expected Output: Valid DOM element or context object.
- **Verify Module Type:**
   - Command: `cat package.json | grep "type"`
   - Expected Output: "type": "module"
- **Adapter Import Verification:**
   - Command: Inspect network requests to ensure date adapter is loaded.


## Reference Details
## Complete API Specifications and Code Examples

### Chart Constructor API
```ts
/**
 * Creates a new chart instance
 * @param context - DOM element, canvas context, or object with canvas property
 * @param config - Chart configuration object
 * @returns Chart instance
 */
function Chart(
  context: string | CanvasRenderingContext2D | HTMLCanvasElement | { canvas: HTMLCanvasElement } | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
  config: ChartConfiguration
): Chart;
```

### ChartConfiguration Interface
```ts
interface ChartConfiguration {
  type: ChartType; // e.g., 'bar', 'line', 'pie', etc.
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[] | Array<number | [number, number]>;
      borderWidth?: number; // Default is 1
    }>;
  };
  options?: {
    scales?: {
      [scaleId: string]: {
        beginAtZero?: boolean;
        title?: {
          display: boolean;
          text: string;
        };
        ticks?: {
          callback?: (value: any, index: number, values: any[]) => string;
          stepSize?: number;
        };
      };
    };
    plugins?: {
      title?: {
        display: boolean;
        text: string;
      };
      tooltip?: {
        mode?: string;
        callbacks?: { [key: string]: Function };
      };
    };
    animation?: {
      delay?: number;        // Default: 0
      duration?: number;     // Default: 1000
      easing?: string;       // Default: 'easeOutQuart'
      loop?: boolean;        // Default: false
    };
  };
}
```

### Example Usage
```js
// HTML structure
// <div>
//   <canvas id="myChart"></canvas>
// </div>

// Include Chart.js via CDN
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

// JavaScript Example
const ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
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
    },
    plugins: {
      title: {
        display: true,
        text: 'Chart Title'
      }
    },
    animation: {
      delay: 0,
      duration: 1000,
      easing: 'easeOutQuart',
      loop: false
    }
  }
});
```

### Detailed Migration Steps (for 3.x to 4.x)
1. **Change Scale Options**: Update scale configuration from xAxes/yAxes arrays to object keyed by scale id.
2. **Rename Configuration Options**: 
   - `grid.drawBorder` → `border.display`
   - `grid.borderWidth` → `border.width`
   - `grid.borderColor` → `border.color`
   - etc.
3. **ESM Setup**: Ensure your package.json contains:
```json
{
  "type": "module"
}
```
4. **Register Components (for tree shaking)**:
```js
import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
```

### Best Practices & Troubleshooting
- **Best Practice:** Keep chart configurations minimal by importing only required components.
- **Troubleshooting:**
   - If encountering "Canvas is already in use", ensure you are not reusing the same canvas without cleanup.
   - For module errors, verify ESM configuration and correct import of Chart.js components.
   - Use browser console logs to debug configuration objects if charts fail to render.

---

These API specifications, code examples, and configuration details provide a developer-ready reference for implementing and troubleshooting Chart.js charts without additional external documentation lookup.


## Original Source
Chart.js Documentation
https://www.chartjs.org/docs/latest/

## Digest of CHART_JS

# Chart.js Documentation Digest

**Last Updated:** 4/15/2025, 1:19:05 PM

## Overview
Chart.js is an open-source, MIT-licensed JavaScript charting library offering a wide variety of built-in chart types and extensive customization options. It renders charts on an HTML5 canvas and supports integration with TypeScript and frameworks such as React, Vue, Svelte, and Angular.

## Key Sections

### Features
- **Built-in Chart Types:** Bar, Line, Pie, Doughnut, Radar, Polar Area, etc.
- **Plugins & Customization:** Custom plugins for annotations, zoom, drag-and-drop.
- **Animation:** Animations turned on by default; configurable duration, easing, delay, and looping.
- **Canvas Rendering:** Utilizes HTML5 canvas for high performance with large datasets.
- **Performance:** Data decimation, tree-shaking support to reduce bundle size.

### Getting Started Example

#### HTML & JavaScript Code Sample
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

### Migration Guides

#### 4.x Migration Guide
- **Breaking Changes:** 
  - Default scale options no longer merge when scale id begins with x/y.
  - Renamed options: e.g., `scales[id].grid.drawBorder` → `scales[id].border.display`, `borderWidth` → `border.width`.
  - Animation reworked: Each property animates separately with new options:
    - `delay`: default 0 ms
    - `duration`: default 1000 ms
    - `easing`: default 'easeOutQuart'
    - `loop`: default false
- **ESM-only:** Chart.js is ESM-only. Ensure "type": "module" in package.json.

#### 3.x Migration Guide
- **Breaking Changes:** 
  - Removed horizontalBar chart type; use `indexAxis` option instead.
  - Configuration changes for scales: Transition from xAxes/yAxes arrays to individual scales keyed by ID.
  - Options renaming: e.g., `ticks.beginAtZero` is now specified on the scale object, tooltip namespace now `tooltip`.
- **Component Registration:** To enable tree shaking in an ESM environment:
```js
import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
```

### API Specifications & Types

#### Constructor Signature
```ts
new Chart(
  context: string | CanvasRenderingContext2D | HTMLCanvasElement | { canvas: HTMLCanvasElement } | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
  config: ChartConfiguration
): Chart;
```

#### Example ChartConfiguration
```ts
interface ChartConfiguration {
  type: ChartType; // e.g., 'bar', 'line', etc.
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[] | Array<number | [number, number]>;
      borderWidth?: number;
    }>
  };
  options?: {
    scales?: {
      [key: string]: {
        beginAtZero?: boolean;
        title?: { display: boolean; text: string };
        ticks?: {
          callback?: (value: any, index: number, values: any[]) => string;
          stepSize?: number;
        };
      };
    };
    plugins?: {
      title?: { display: boolean; text: string };
      tooltip?: {
        mode?: string;
        callbacks?: { [key: string]: Function };
      };
    };
    animation?: {
      delay?: number;
      duration?: number;
      easing?: string;
      loop?: boolean;
    };
  };
}
```

### Detailed Type Definitions (Extracts)

- **AnimationSpec<TType>**
  - delay?: Scriptable<number>
  - duration?: Scriptable<number>
  - easing?: Scriptable<string>
  - loop?: Scriptable<boolean>

- **LinearScaleOptions**
```ts
interface LinearScaleOptions {
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

- **TimeScaleOptions**
```ts
interface TimeScaleOptions {
  adapters: { date: any };
  bounds: 'ticks' | 'data';
  max: string | number;
  min: string | number;
  offsetAfterAutoskip: boolean;
  suggestedMax: string | number;
  suggestedMin: string | number;
  ticks: TimeScaleTickOptions;
  time: TimeScaleTimeOptions;
}
```

### Troubleshooting Procedures
1. **Canvas Already in Use Error:**
   - **Command:** Check that you are passing a unique canvas element.
   - **Expected Output:** No error thrown; chart renders on the canvas.
2. **ESM Import Issues:**
   - **Command:** Ensure package.json includes "type": "module".
   - **Expected Output:** Modules imported correctly with no runtime errors.
3. **Missing Adapter for Time Scales:**
   - **Command:** Install a date adapter such as `chartjs-adapter-date-fns` and import it before instantiating a chart.
   - **Expected Output:** Time scales render with correct date parsing.

---

**Attribution:** Data crawled from https://www.chartjs.org/docs/latest/ | Data Size: 433870 bytes

## Attribution
- Source: Chart.js Documentation
- URL: https://www.chartjs.org/docs/latest/
- License: MIT
- Crawl Date: 2025-04-17T19:23:15.153Z
- Data Size: 433870 bytes
- Links Found: 12764

## Retrieved
2025-04-17
