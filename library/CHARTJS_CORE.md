# CHARTJS_CORE

## Crawl Summary
Chart.js core APIs: Chart constructor signature with parameters and return type. ChartData and ChartConfiguration interfaces. Key ChartOptions fields: animation specs, responsive flags, aspect ratio, plugins.legend/title, scales mapping. LinearScaleOptions with ticks and range control. TooltipOptions structure. Plugin registration methods. Decimation plugin config. Performance flags: parsing, decimation. Default registerables list.

## Normalised Extract
Table of Contents
1. Chart Initialization
2. Data Structures
3. Configuration Options
4. Scale Types
5. Tooltip & Interaction
6. Plugins
7. Performance Settings

1. Chart Initialization
Constructor: new Chart(item, config)
item: Canvas or 2D context or DOM selector
config: {
  type: string (e.g., 'line', 'bar'),
  data: { labels: [], datasets: [] },
  options?: object,
  plugins?: array
}
Returns: Chart instance

2. Data Structures
ChartData:
- labels: array of labels
- datasets: array of { label: string, data: number[] | object[], backgroundColor, borderColor, borderWidth }

3. Configuration Options
options:
- responsive: boolean (true)
- maintainAspectRatio: boolean (true)
- aspectRatio: number (2)
- animation: false | { delay, duration, easing, loop, onComplete, onProgress }
- animations: { [property]: { type, properties, from, to, fn } }
- plugins:
  - legend: { display: boolean, position: 'top'|'bottom'|
    labels: { color: string, font: { size } } }
  - title: { display: boolean, text: string }
- scales: {
  [id]: { type, display, position, title: { display, text }, ticks: { beginAtZero, stepSize, max, min } }
}

4. Scale Types
Linear Scale:
- beginAtZero: boolean
- ticks: { stepSize: number, precision: number }
Category Scale:
- labels: string[]
Logarithmic Scale:
- ticks: { format: Intl.NumberFormatOptions }
Time Scale:
- time: { unit, parser, displayFormats, tooltipFormat }

5. Tooltip & Interaction
tooltip:
- enabled, mode: 'nearest'|'index', intersect: boolean, position: 'average'|'nearest'
- callbacks: beforeTitle, title, afterTitle, label, afterLabel
interaction:
- mode: 'nearest'|'index'|'point'|'x'|'y', intersect: boolean

6. Plugins
Registration:
Chart.register(components...)
Chart.unregister(components...)
Decimation:
- options.plugins.decimation: { enabled: boolean, algorithm: 'lttb'|'min-max', samples: number }
Zoom (external):
- options.plugins.zoom: { pan: { enabled, mode }, zoom: { wheel, pinch } }

7. Performance Settings
parsing: false disables data parsing
animations: set duration 0 disables all animations
data decimation via plugin
import only needed modules for tree-shaking


## Supplementary Details
Chart.register(name: string, component: ChartComponentLike)
Chart.unregister(name: string)

Implementation steps:
1. Import needed modules: import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
2. Register: Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend);
3. Create canvas in HTML: <canvas id="chart"></canvas>
4. JS:
   const ctx = document.getElementById('chart').getContext('2d');
   const chart = new Chart(ctx, { type: 'line', data: { labels:[...], datasets:[{...}] }, options:{...} });

Core plugin options:
- decimation:
  enabled: true
  algorithm: 'lttb'
  samples: 1000

- tooltip.external(context): custom render

Default parsing:
parsing: true (per dataset)

Decimation constants:
LttbDecimation: algorithm name 'lttb'
MinMaxDecimation: 'min-max'


## Reference Details
API: Chart constructor
Signature: function Chart(item: ChartItem, config: ChartConfiguration): Chart
Parameters:
- item: Canvas|Context|selector
- config: { type: ChartType; data: ChartData; options?: ChartOptions; plugins?: Plugin[] }
Return: Chart instance

Methods:
chart.update(mode?: UpdateMode): void
chart.render(): void
chart.reset(): void
chart.destroy(): void

Chart.update modes: 'resize'|'none'|'active'

Configuration:
ChartData:
labels?: (string|number|Date)[]
datasets: {
  label?: string;
  data: number[]|object[];
  backgroundColor?: string|string[];
  borderColor?: string|string[];
  borderWidth?: number;
  parsing?: boolean|object;
  order?: number;
}[]

ChartOptions:
responsive?: boolean;
maintainAspectRatio?: boolean;
aspectRatio?: number;
plugins?: {
  legend?: {
    display?: boolean;
    position?: 'top'|'left'|...;
    labels?: { color?: string; font: { size?: number } };
  };
  title?: {
    display?: boolean;
    text?: string;
    color?: string;
    font: { family?: string; size?: number; style?: string; lineHeight?: number };
  };
  tooltip?: TooltipOptions;
  decimation?: { enabled: boolean; algorithm: 'lttb'|'min-max'; samples?: number };
};
scales?: {
  [scaleId: string]: {
    type: 'linear'|'category'|'time'|...;
    display?: boolean;
    position?: 'left'|'right'|'top'|'bottom';
    title?: { display: boolean; text: string };
    ticks?: { beginAtZero?: boolean; stepSize?: number; maxTicksLimit?: number; precision?: number; callback?: (value, index, ticks)=>string };
    stacked?: boolean;
    min?: number;
    max?: number;
    grid?: { color?: string; borderColor?: string; borderDash?: number[]; drawBorder?: boolean; drawTicks?: boolean };
  };
};

TooltipOptions:
enabled?: boolean;
mode?: InteractionMode;
intersect?: boolean;
position?: TooltipPositioner;
crossAlign?: 'near'|'center'|'far';

Code example:
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);
const ctx=document.getElementById('c').getContext('2d');
const chart=new Chart(ctx,{ type:'line', data:{ labels:['Jan','Feb'], datasets:[{ label:'Sales', data:[10,20], borderColor:'#3366cc', backgroundColor:'#99ccff', borderWidth:2 }] }, options:{ responsive:true, maintainAspectRatio:false, scales:{ y:{ beginAtZero:true, ticks:{ stepSize:5 } } }, plugins:{ title:{ display:true, text:'Monthly Sales' }, decimation:{ enabled:true, algorithm:'lttb', samples:500 } } } });

Troubleshooting:
Command: npm ls chart.js
Expected: chart.js@4.x.x
If missing, run: npm install chart.js@latest

Error: "Canvas is already in use"
Solution: Provide unique canvas element or call chart.destroy() before instantiating new Chart.

Error: "Parsing is disabled"
Solution: Set dataset.parsing to false or configure parsing object per dataset.

Memory leak on destroy:
Always call chart.destroy() when disposing charts in SPA.


## Information Dense Extract
Chart(item:ChartItem,config:ChartConfiguration)->Chart; item:Canvas|Context|selector; config:{type:ChartType;data:{labels?:any[];datasets:ChartDataset[]};options?:ChartOptions;plugins?:Plugin[]}; ChartData:labels?:TLabel[];datasets:ChartDataset<TType,TData>[]; ChartOptions:{responsive?:boolean;maintainAspectRatio?:boolean;aspectRatio?:number;animation?:false|AnimationSpec;animations?:AnimationsSpec;plugins?:{legend?:LegendOptions;title?:TitleOptions;tooltip?:TooltipOptions;decimation?:DecimationOptions};scales?:{[id:string]:ScaleOptions}}; ScaleOptions:LinearScaleOptions|CategoryScaleOptions|LogarithmicScaleOptions|TimeScaleOptions; LinearScaleOptions:{beginAtZero:boolean;grace?:number|string;suggestedMin?:number;suggestedMax?:number;ticks:{stepSize:number;precision:number;count:number;format:Intl.NumberFormatOptions}}; TooltipOptions:{enabled:boolean;mode:InteractionMode;intersect?:boolean;position:TooltipPositioner;callbacks:TooltipCallbacks}; Plugin registration:Chart.register(...components); Chart.unregister(...); Built-in plugin Decimation:{enabled:boolean;algorithm:'lttb'|'min-max';samples?:number}. Methods:update(mode?:UpdateMode):void;render():void;reset():void;destroy():void. Best practice: import only needed controllers,elements,scales for tree-shaking; call chart.destroy() on disposal; disable animations for performance; configure decimation for large datasets.

## Sanitised Extract
Table of Contents
1. Chart Initialization
2. Data Structures
3. Configuration Options
4. Scale Types
5. Tooltip & Interaction
6. Plugins
7. Performance Settings

1. Chart Initialization
Constructor: new Chart(item, config)
item: Canvas or 2D context or DOM selector
config: {
  type: string (e.g., 'line', 'bar'),
  data: { labels: [], datasets: [] },
  options?: object,
  plugins?: array
}
Returns: Chart instance

2. Data Structures
ChartData:
- labels: array of labels
- datasets: array of { label: string, data: number[] | object[], backgroundColor, borderColor, borderWidth }

3. Configuration Options
options:
- responsive: boolean (true)
- maintainAspectRatio: boolean (true)
- aspectRatio: number (2)
- animation: false | { delay, duration, easing, loop, onComplete, onProgress }
- animations: { [property]: { type, properties, from, to, fn } }
- plugins:
  - legend: { display: boolean, position: 'top'|'bottom'|
    labels: { color: string, font: { size } } }
  - title: { display: boolean, text: string }
- scales: {
  [id]: { type, display, position, title: { display, text }, ticks: { beginAtZero, stepSize, max, min } }
}

4. Scale Types
Linear Scale:
- beginAtZero: boolean
- ticks: { stepSize: number, precision: number }
Category Scale:
- labels: string[]
Logarithmic Scale:
- ticks: { format: Intl.NumberFormatOptions }
Time Scale:
- time: { unit, parser, displayFormats, tooltipFormat }

5. Tooltip & Interaction
tooltip:
- enabled, mode: 'nearest'|'index', intersect: boolean, position: 'average'|'nearest'
- callbacks: beforeTitle, title, afterTitle, label, afterLabel
interaction:
- mode: 'nearest'|'index'|'point'|'x'|'y', intersect: boolean

6. Plugins
Registration:
Chart.register(components...)
Chart.unregister(components...)
Decimation:
- options.plugins.decimation: { enabled: boolean, algorithm: 'lttb'|'min-max', samples: number }
Zoom (external):
- options.plugins.zoom: { pan: { enabled, mode }, zoom: { wheel, pinch } }

7. Performance Settings
parsing: false disables data parsing
animations: set duration 0 disables all animations
data decimation via plugin
import only needed modules for tree-shaking

## Original Source
Chart.js
https://www.chartjs.org/docs/latest/

## Digest of CHARTJS_CORE

# Chart.js Core Technical Reference

## 1. Chart Initialization
### Constructor
new Chart(item: ChartItem, config: ChartConfiguration<TType, TData, TLabel>): Chart<TType, TData, TLabel>
- Parameters:
  - item: HTMLCanvasElement | CanvasRenderingContext2D | string | { canvas: HTMLCanvasElement } | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>
  - config: {
      type: TType;
      data: ChartData<TType, TData, TLabel>;
      options?: ChartOptions<TType>;
      plugins?: Plugin<TType>[];
      plugins?: Plugin[];
    }
- Returns: Chart instance

## 2. ChartData Interface
interface ChartData<TType extends keyof ChartTypeRegistry, TData = ChartTypeRegistry[TType]['defaultDataPoint'], TLabel = unknown> {
  labels?: TLabel[];
  datasets: ChartDataset<TType, TData>[];
}

## 3. ChartConfiguration
interface ChartConfiguration<TType extends keyof ChartTypeRegistry, TData, TLabel> {
  type: TType;
  data: ChartData<TType, TData, TLabel>;
  options?: ChartOptions<TType>;
  plugins?: Plugin<TType>[];
  plugins?: Plugin[];
}

## 4. ChartOptions Highlights
- options.animation: false | AnimationSpec<TType> & { onComplete?, onProgress? }
- options.animations: AnimationsSpec<TType>
- options.responsive: boolean (default: true)
- options.maintainAspectRatio: boolean (default: true)
- options.aspectRatio: number (default: 2)
- options.plugins.legend.display: boolean
- options.plugins.title.display: boolean; text: string
- options.scales: { [scaleId: string]: ScaleOptionsByType<ChartTypeRegistry[TType]['scales']> }

## 5. Scale Configuration
### Linear Scale (type: 'linear')
interface LinearScaleOptions extends CartesianScaleOptions {
  beginAtZero: boolean;
  grace?: string | number;
  suggestedMin?: number;
  suggestedMax?: number;
  ticks: {
    stepSize: number;
    precision: number;
    count: number;
    format: Intl.NumberFormatOptions;
  };
}

## 6. Tooltip Configuration
interface TooltipOptions {
  enabled: boolean;
  mode: InteractionMode;
  position: TooltipPositioner;
  callbacks: TooltipCallbacks<TType>;
}

## 7. Plugin Registration
- Chart.register(...components: ChartComponentLike[])
- Chart.unregister(...components: ChartComponentLike[])

## 8. Decimation Plugin (built-in)
const Decimation: Plugin<'line' | 'bar' | ...>;
Config:
{
  plugin: 'decimation';
  options: {
    algorithm: 'lttb' | 'min-max';
    samples?: number;
  }
}

## 9. Performance Options
- data parsing: `options.parsing: false | object`
- max data points: `options.datasets[index].parsing: false`
- decimation: `options.plugins.decimation.enabled: boolean`
- tree-shaking: import only used controllers, elements, scales, plugins

## 10. Default Registrations
- `registry.getItems()` returns registered items
- `registerables`: [ArcElement, LineController, ...]


## Attribution
- Source: Chart.js
- URL: https://www.chartjs.org/docs/latest/
- License: License
- Crawl Date: 2025-05-22T03:36:01.650Z
- Data Size: 1308167 bytes
- Links Found: 24804

## Retrieved
2025-05-22
