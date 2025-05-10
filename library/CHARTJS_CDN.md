# CHARTJS_CDN

## Crawl Summary
CDNJS URL: https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.9/chart.umd.min.js (include integrity and crossorigin). jsDelivr URL: https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js. GitHub build: clone repo, npm install, npm run build, use dist/chart.umd.js. Global constructor: new Chart(ctx, config). Canvas must exist before instantiation.

## Normalised Extract
Table of Contents:
1. CDN URLs and Script Tags
2. Building from Source
3. Canvas Setup
4. Chart Instantiation

1. CDN URLs and Script Tags
• CDNJS: <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.9/chart.umd.min.js" integrity="sha512-<SHA384_HASH>" crossorigin="anonymous"></script>
• jsDelivr: <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js" integrity="sha384-<SHA384_HASH>" crossorigin="anonymous"></script>

2. Building from Source
• Clone: git clone https://github.com/chartjs/Chart.js.git
• Install: npm install
• Build: npm run build
• Use: dist/chart.umd.js

3. Canvas Setup
• HTML: <canvas id="myChart"></canvas>
• Container width controls chart size.

4. Chart Instantiation
• Global constructor signature: new Chart(item, config)
  – item: HTMLCanvasElement | CanvasRenderingContext2D | string selector
  – config: { type: ChartType, data: { labels: string[], datasets: Dataset[] }, options?: ChartOptions }
• Example: type='bar', labels=['Red',…], data points=[12,19,…], options scales.y.beginAtZero=true

## Supplementary Details
Script Tag Attributes:
- integrity: SHA384 hash of the file
- crossorigin: anonymous or use credentials
- async/defer: optional but ensure script loads before usage

Implementation Steps:
1. Add <canvas> with id
2. Insert <script> tag before instantiating code
3. Wrap instantiation in DOMContentLoaded or place script after canvas
4. Use new Chart(ctx, config)

Configuration Options:
- type: 'bar' | 'line' | 'pie' | …
- data.labels: string[]
- data.datasets: [{ label: string, data: number[] | {x:,y:,r:}[], borderWidth?: number }]
- options.scales.<axis>.beginAtZero: boolean (default false)
- options.aspectRatio: number (default 2 for Cartesian)

Best Practices:
- Pin the version in the URL
- Use integrity and crossorigin for security
- Control chart responsiveness via container width
- Disable animation for large datasets

Troubleshooting:
- Error "Chart is not defined": ensure script URL correct and loaded before use
- CORS errors: check file host supports anonymous access
- Integrity mismatch: update SHA384 when upgrading version
- Unexpected chart size: verify container width and options.aspectRatio
Commands:
$ curl -I https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js
$ openssl dgst -sha384 -binary chart.umd.min.js | openssl base64 -A

## Reference Details
API: Chart(element, config)

Signature:
  constructor Chart(item: HTMLCanvasElement | CanvasRenderingContext2D | string | {canvas:HTMLCanvasElement}, config: ChartConfiguration<ChartType, unknown, unknown>)

Parameters:
- item: reference to canvas or context
- config: object {
    type: ChartType;
    data: ChartData<ChartType>;
    options?: ChartOptions<ChartType>;
  }

ChartType: 'bar' | 'line' | 'pie' | 'doughnut' | 'bubble' | 'scatter' | 'polarArea' | 'radar'

ChartData:
- labels: string[]
- datasets: ChartDataset<ChartType, DefaultDataPoint<ChartType>>[]

Dataset properties:
- label: string
- data: number[] | {x:number,y:number,r:number}[]
- borderWidth?: number
- backgroundColor?: string | string[]

Options:
- scales: { [axis:string]: { beginAtZero?: boolean; min?: number; max?: number } }
- aspectRatio: number
- plugins: { legend?: { display: boolean }; tooltip?: { enabled: boolean } }

Code Example:
(function(){
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: { labels:['A','B'], datasets:[{label:'Test',data:[1,2],borderWidth:1}] },
    options: { scales:{y:{beginAtZero:true}} }
  });
})();

Implementation Pattern:
1. Load script via CDN
2. Ensure canvas exists
3. Call Chart constructor
4. Update chart data via chart.data and chart.update()

Best Practice Code:
const chart = new Chart(ctx, {...});
chart.options.plugins.tooltip.enabled = false;
chart.update();

Troubleshooting Procedures:
1. Inspect network tab for 404 on script URL
2. Verify integrity hash with openssl dgst -sha384
3. Validate canvas selector with document.getElementById returns non-null
4. Console errors: missing parameters or invalid type => check config syntax

## Information Dense Extract
CDNJS and jsDelivr URLs for Chart.js v4.4.9 via UMD build; include <script src=URL integrity=SHA384 crossorigin=anonymous>. Canvas setup: <canvas id=...> in container to control size. Chart constructor: new Chart(item, {type:ChartType,data:{labels:string[],datasets:[{label:string,data:number[]|{x,y,r}[],borderWidth?:number}]},options:{scales:{<axis>:{beginAtZero:boolean,min?:number,max?:number}},aspectRatio?:number,plugins:{legend?:{display:boolean},tooltip?:{enabled:boolean}}}}). Build from source: clone repo, npm install, npm run build, use dist/chart.umd.js. Best practices: pin version, use SRI, control responsiveness, disable animation for performance. Troubleshoot via network, integrity check, DOMContentLoaded placement, console errors.

## Sanitised Extract
Table of Contents:
1. CDN URLs and Script Tags
2. Building from Source
3. Canvas Setup
4. Chart Instantiation

1. CDN URLs and Script Tags
 CDNJS: <script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.9/chart.umd.min.js' integrity='sha512-<SHA384_HASH>' crossorigin='anonymous'></script>
 jsDelivr: <script src='https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js' integrity='sha384-<SHA384_HASH>' crossorigin='anonymous'></script>

2. Building from Source
 Clone: git clone https://github.com/chartjs/Chart.js.git
 Install: npm install
 Build: npm run build
 Use: dist/chart.umd.js

3. Canvas Setup
 HTML: <canvas id='myChart'></canvas>
 Container width controls chart size.

4. Chart Instantiation
 Global constructor signature: new Chart(item, config)
   item: HTMLCanvasElement | CanvasRenderingContext2D | string selector
   config: { type: ChartType, data: { labels: string[], datasets: Dataset[] }, options?: ChartOptions }
 Example: type='bar', labels=['Red',], data points=[12,19,], options scales.y.beginAtZero=true

## Original Source
Chart.js CDN Installation and Usage
https://www.chartjs.org/docs/latest/getting-started/installation.html#cdn

## Digest of CHARTJS_CDN

# CDN Installation

## CDNJS

Include Chart.js from CDNJS using the following script tag:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.9/chart.umd.min.js" integrity="sha512-<SHA384_HASH>" crossorigin="anonymous"></script>
```

## jsDelivr

Include Chart.js from jsDelivr using one of these URLs:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js" integrity="sha384-<SHA384_HASH>" crossorigin="anonymous"></script>
```

## GitHub

1. Clone or download the repository:
   ```bash
git clone https://github.com/chartjs/Chart.js.git
cd Chart.js
```
2. Install dependencies and build:
   ```bash
npm install
npm run build
```
3. Use the generated files from `dist/` or `dist/chart.umd.js` in your project.

Last Updated: 4/15/2025, 1:19:05 PM
Data Size: 3496747 bytes

# Instantiating a Chart via CDN

1. Add a `<canvas>` element to your HTML:
   ```html
<div><canvas id="myChart"></canvas></div>
```

2. Include Chart.js before your script:

   ```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js"></script>
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
      scales: { y: { beginAtZero: true } }
    }
  });
</script>
```

## Attribution
- Source: Chart.js CDN Installation and Usage
- URL: https://www.chartjs.org/docs/latest/getting-started/installation.html#cdn
- License: MIT
- Crawl Date: 2025-05-10T22:00:46.986Z
- Data Size: 3496747 bytes
- Links Found: 42897

## Retrieved
2025-05-10
