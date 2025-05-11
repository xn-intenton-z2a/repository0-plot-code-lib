# CHART_INITIALIZATION

## Crawl Summary
Install via npm or CDN. Chart constructor accepts element or context and a configuration object. Configuration requires chart type, data with labels and datasets, optional options and plugins. Core options include responsive, scales, plugins.legend, plugins.title, plugins.tooltip. Data parsing bypass and decimation reduce rendering overhead. Must register desired controllers and plugins in ESM builds. Default responsive true, maintainAspectRatio true. Time scales require adapter. Decimation supports lttb and min-max algorithms.

## Normalised Extract
Table of Contents
1. Installation
2. Chart Constructor Signature
3. Configuration Object
4. Data Structure
5. Core Options
6. Performance Plugins
7. Best Practices
8. Troubleshooting

1 Installation
• npm install chart.js installs package
• CDN URL https://cdn.jsdelivr.net/npm/chart.js

2 Chart Constructor Signature
Parameters
 item: string server selector | HTMLCanvasElement reference | CanvasRenderingContext2D context
 config: ChartConfiguration<TType,TData,TLabel>
Returns
 Chart instance

3 Configuration Object
Properties
 type: ChartType enum (e.g. "bar","line","pie") required
 data: ChartData<TType,TData,TLabel> required
 options: ChartOptions<TType> optional
 plugins: Plugin<TType>[] optional

4 Data Structure
 ChartData
  labels?: array of labels matching dataset length
  datasets: array of ChartDataset objects
 ChartDataset fields
  label: string
  data: array of numbers | objects
  borderWidth: number default 3
  backgroundColor: Color | array default rgba(0,0,0,0.1)

5 Core Options
 ChartOptions
  responsive: boolean default true
  maintainAspectRatio: boolean default true
  animation: false | {
    delay?: number default 0
    duration?: number default 1000
    easing?: EasingFunction default easeOutQuart
  }
  scales: map scaleId to ScaleOptions
  plugins.legend.display: boolean default true
  plugins.title.text: string
  plugins.tooltip.mode: string default nearest

6 Performance Plugins
Decimation
  enabled: boolean
  algorithm: "lttb" | "min-max"
  samples: number default 100
Data parsing bypass internal format when data array of primitives

7 Best Practices
• Use ESM imports and register controllers:
  import {Chart,LineController,LineElement,PointElement,LinearScale,Title} from chart.js
  Chart.register(LineController,LineElement,PointElement,LinearScale,Title)
• Enable decimation for large datasets in options.plugins.decimation

8 Troubleshooting
Error Canvas already in use
  Ensure new canvas element per Chart
Missing time scale adapter
  npm install chartjs-adapter-date-fns
  import and register adapter prior to chart creation

## Supplementary Details
Installation Steps
1 npm install chart.js --save
2 Import in codebase
  import {Chart,registerables} from chart.js
  Chart.register(...registerables)
3 Optional adapters installation
  npm install chartjs-adapter-date-fns --save
  import 'chartjs-adapter-date-fns'

Configuration Steps
1 Create HTML container:
  <div style width100% height400px>
    <canvas id salesChart></canvas>
  </div>
2 Acquire context
  const ctx=document getElementById salesChart getContext2D()
3 Define data and options objects
4 Instantiate chart
  new Chart(ctx,config)

Key Configuration Options
responsive true enables resizing on window resize
maintainAspectRatio true constrains canvas aspect ratio
animation.delay number ms before animation start default 0
animation.duration number ms for all property transitions default 1000
scales.id.beginAtZero boolean default false
plugins.legend.position top | left | right | bottom default top
plugins.title.display boolean default false
plugins.title.text string
plugins.tooltip.enabled boolean default true
plugins.decimation.enabled boolean default false
plugins.decimation.algorithm "lttb" | "min-max" default lttb
plugins.decimation.samples number default 100


## Reference Details
Chart Constructor Method Signature
new Chart(item:string|HTMLCanvasElement|CanvasRenderingContext2D,config:ChartConfiguration<TType,TData,TLabel>) : Chart<TType,TData,TLabel>

Complete ChartConfiguration Interface
interface ChartConfiguration<TType extends ChartType=ChartType,TData=DefaultDataPoint<TType>,TLabel=unknown> {
  type:TType
  data:ChartData<TType,TData,TLabel>
  options?:ChartOptions<TType>
  plugins?:Plugin<TType>[]
  pluginsData?:AnyObject
}

Full ChartOptions Signature
interface ChartOptions<TType extends ChartType=ChartType> {
  responsive?:boolean
  maintainAspectRatio?:boolean
  locale?:string
  animation?:false|AnimationSpec<TType>&{onComplete?(this:Chart,event:AnimationEvent):void;onProgress?(this:Chart,event:AnimationEvent):void}
  animations?:AnimationsSpec<TType>
  devicesPixelRatio?:number
  scales?:{
    [scaleId:string]:ScaleOptionsByType<ChartTypeRegistry[TType]['scales']>
  }
  plugins?:{
    legend?:LegendOptions
    title?:TitleOptions
    tooltip?:TooltipOptions<TType>
    decimation?:{
      enabled:boolean
      algorithm:"lttb"|"min-max"
      samples:number
    }
  }
  onHover?(event:ChartEvent,active:ActiveElement[],chart:Chart):void
  onClick?(event:ChartEvent,active:ActiveElement[],chart:Chart):void
  maintainAspectRatio?:boolean
  aspectRatio?:number
}

Code Example with Comments
const ctx=document.getElementById 'myChart' getContext '2d'
const config={
  type:'line',
  data:{
    labels:['Jan','Feb','Mar'],
    datasets:[{
      label:'Sales',
      data:[65,59,80],
      borderColor:'#42A5F5',
      backgroundColor:'rgba(66,165,245,0.4)',
      borderWidth:2
    }]
  },
  options:{
    responsive:true,
    plugins:{
      title:{display:true,text:'Monthly Sales'},
      tooltip:{mode:'index',intersect:false},
      decimation:{enabled:true,algorithm:'lttb',samples:50}
    },
    scales:{
      x:{type:'category',title:{display:true,text:'Month'}},
      y:{beginAtZero:true,title:{display:true,text:'Value'}}
    }
  }
}
new Chart(ctx,config)

Best Practices
Register minimised set of components to reduce bundle size
import {Chart,LineController,LineElement,PointElement,LinearScale,Title,Tooltip,Legend} from 'chart.js'
Chart.register(LineController,LineElement,PointElement,LinearScale,Title,Tooltip,Legend)

Troubleshooting Procedures
Command npm ls chart.js shows installed version
If chart fails to render check browser console for errors
Expected output new Chart instance logged
If time scale unlabeled install and register adapter
npm install chartjs-adapter-date-fns
import 'chartjs-adapter-date-fns'

## Information Dense Extract
install chart.js via npm or CDN; import Chart and register components; new Chart(element,config) requires type,label,data,datasets; ChartOptions: responsive true,maintainAspectRatio true,scales{id:options},plugins{legend,title,tooltip,decimation}; enable decimation: enabled true,algorithm lttb|min-max,samples N; time scales require adapter; use ESM imports for tree-shaking; data: labels array,datasets array with label,data,borderColor,backgroundColor,borderWidth; debug by checking console errors and version via npm ls chart.js

## Sanitised Extract
Table of Contents
1. Installation
2. Chart Constructor Signature
3. Configuration Object
4. Data Structure
5. Core Options
6. Performance Plugins
7. Best Practices
8. Troubleshooting

1 Installation
 npm install chart.js installs package
 CDN URL https://cdn.jsdelivr.net/npm/chart.js

2 Chart Constructor Signature
Parameters
 item: string server selector | HTMLCanvasElement reference | CanvasRenderingContext2D context
 config: ChartConfiguration<TType,TData,TLabel>
Returns
 Chart instance

3 Configuration Object
Properties
 type: ChartType enum (e.g. 'bar','line','pie') required
 data: ChartData<TType,TData,TLabel> required
 options: ChartOptions<TType> optional
 plugins: Plugin<TType>[] optional

4 Data Structure
 ChartData
  labels?: array of labels matching dataset length
  datasets: array of ChartDataset objects
 ChartDataset fields
  label: string
  data: array of numbers | objects
  borderWidth: number default 3
  backgroundColor: Color | array default rgba(0,0,0,0.1)

5 Core Options
 ChartOptions
  responsive: boolean default true
  maintainAspectRatio: boolean default true
  animation: false | {
    delay?: number default 0
    duration?: number default 1000
    easing?: EasingFunction default easeOutQuart
  }
  scales: map scaleId to ScaleOptions
  plugins.legend.display: boolean default true
  plugins.title.text: string
  plugins.tooltip.mode: string default nearest

6 Performance Plugins
Decimation
  enabled: boolean
  algorithm: 'lttb' | 'min-max'
  samples: number default 100
Data parsing bypass internal format when data array of primitives

7 Best Practices
 Use ESM imports and register controllers:
  import {Chart,LineController,LineElement,PointElement,LinearScale,Title} from chart.js
  Chart.register(LineController,LineElement,PointElement,LinearScale,Title)
 Enable decimation for large datasets in options.plugins.decimation

8 Troubleshooting
Error Canvas already in use
  Ensure new canvas element per Chart
Missing time scale adapter
  npm install chartjs-adapter-date-fns
  import and register adapter prior to chart creation

## Original Source
Chart.js Core Documentation
https://www.chartjs.org/docs/latest/

## Digest of CHART_INITIALIZATION

# Installation
Install from npm
```shell
npm install chart.js
```
Include via CDN
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

# Chart Constructor Signature
```ts
new Chart(item: string | HTMLCanvasElement | CanvasRenderingContext2D, config: ChartConfiguration<TType, TData, TLabel>)
```

# ChartConfiguration Interface
```ts
interface ChartConfiguration<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> {
  type: TType
  data: ChartData<TType, TData, TLabel>
  options?: ChartOptions<TType>
  plugins?: Plugin<TType>[]
  pluginsData?: AnyObject
}
```

# ChartData Structure
```ts
interface ChartData<TType extends ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> {
  labels?: TLabel[]
  datasets: ChartDataset<TType, TData>[]
}
```

# Core Options
```ts
interface ChartOptions<TType extends ChartType = ChartType> {
  responsive?: boolean         // default true
  maintainAspectRatio?: boolean // default true
  animation?: false | AnimationSpec<TType>
  scales?: {
    [scaleId: string]: ScaleOptionsByType<ChartTypeRegistry[TType]['scales']>
  }
  plugins?: {
    legend?: LegendOptions
    title?: TitleOptions
    tooltip?: TooltipOptions<TType>
  }
}
```

# Data Parsing & Decimation
- Decimation plugin enabled via options.plugins.decimation
- Algorithm: lttb or min-max
- Configure options.plugins.decimation.algorithm ("lttb" | "min-max") and samples

# Responsive Canvas Setup
Wrap canvas in container with width and height styling for responsiveness

# Best Practices
- Register only needed controllers, elements, scales, plugins with Chart.register
- Use tree-shaking imports in ESM builds
- Enable decimation for large datasets

# Troubleshooting
- Error if canvas/context reused across charts: supply new HTMLCanvasElement or context
- Missing adapter for time scales: install date-fns adapter and register


## Attribution
- Source: Chart.js Core Documentation
- URL: https://www.chartjs.org/docs/latest/
- License: MIT
- Crawl Date: 2025-05-11T03:36:25.092Z
- Data Size: 1547153 bytes
- Links Found: 27193

## Retrieved
2025-05-11
