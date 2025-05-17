# D3_API

## Crawl Summary
Selection API: select, selectAll, append. Scale API: scaleLinear (domain, range, clamp, interpolate, ticks, tickFormat), scaleTime. Axis API: axisBottom, axisLeft with ticks, tickSize, tickPadding, tickFormat. Shape Generators: line (x, y, curve, defined, context), arc (innerRadius, outerRadius, startAngle, endAngle, padAngle). Fetch: csv parsing with Promise. Transitions: duration, delay, ease, attr, style.

## Normalised Extract
Table of Contents:
1. Selection API
2. Scale API
3. Axis API
4. Shape Generators
5. Data Loading
6. Transitions

1. Selection API
  • d3.select(selector: string):Selection — Single-element selection
  • d3.selectAll(selector: string):Selection — Multi-element selection
  • selection.append(name: string):Selection — Append child element

2. Scale API
  • d3.scaleLinear():ScaleLinear — linear mapping domain→range; default domain [0,1], range [0,1]
       Methods:
         domain([number…]):ScaleLinear
         range([number…]):ScaleLinear
         clamp(boolean):ScaleLinear
         interpolate(function):ScaleLinear
         ticks(count:number):number[]
         tickFormat(count:number, specifier?:string):(d:number)=>string
  • d3.scaleTime():ScaleTime — domain & range accept Date; inherits all ScaleLinear methods

3. Axis API
  • d3.axisBottom(scale:Scale):Axis — orientation bottom
  • d3.axisLeft(scale:Scale):Axis — orientation left
       Axis Methods:
         ticks(count:number, specifier?:string):Axis
         tickSize(size:number):Axis
         tickPadding(padding:number):Axis
         tickFormat(format:function|string):Axis

4. Shape Generators
  • d3.line():LineGenerator — create path from points
       Methods:
         x(fn:(d,D,i)=>number):LineGenerator
         y(fn:(d,D,i)=>number):LineGenerator
         curve(curveFactory):LineGenerator
         defined(fn:(d,D,i)=>boolean):LineGenerator
         context(ctx:CanvasRenderingContext2D):LineGenerator
  • d3.arc():ArcGenerator — create arc path
       Methods:
         innerRadius(number|function):ArcGenerator
         outerRadius(number|function):ArcGenerator
         startAngle(number|function):ArcGenerator
         endAngle(number|function):ArcGenerator
         padAngle(number|function):ArcGenerator

5. Data Loading
  • d3.csv(url:string, row?:function, callback?:function):Promise<object[]> — fetch CSV, parse rows, optional conversion, callback support

6. Transitions
  • selection.transition(name?:string):Transition — schedule tweening
       Methods:
         duration(ms:number):Transition
         delay(ms:number):Transition
         ease(name:string):Transition
         attr(name:string, value:any|function):Transition
         style(name:string, value:any|function):Transition


## Supplementary Details
Scale Default Values: domain=[0,1], range=[0,1], clamp=false, interpolate=d3.interpolate. Axis Default Values: tickSize=6, tickPadding=3, tickFormat=scale.tickFormat(10). Fetch Options: row conversion receives (row:Object,i:number)=>Object. Transitions: default duration=250ms, default ease="cubic-in-out".

Implementation Steps:
1. Include <script src="https://d3js.org/d3.v7.min.js"></script>
2. Create SVG: const svg = d3.select('body').append('svg').attr('width',800).attr('height',600);
3. Define scale: const x = d3.scaleLinear().domain([0,100]).range([0,800]);
4. Generate axis: const axis = d3.axisBottom(x).ticks(5);
5. Append axis: svg.append('g').attr('transform','translate(0,550)').call(axis);
6. Load data: d3.csv('data.csv', d=>({x:+d.x,y:+d.y})).then(data=>{ /* use data */ });
7. Draw line: const line = d3.line().x(d=>x(d.x)).y(d=>y(d.y)); svg.append('path').datum(data).attr('d',line).attr('fill','none').attr('stroke','#333');
8. Add transition: svg.selectAll('circle').data(data).enter().append('circle').attr('r',0).transition().duration(500).attr('r',4);


## Reference Details
API Signatures:

// Selection
select(selector: string):Selection<SVGElement, any, HTMLElement, any>
selectAll(selector: string):Selection<SVGElement, any, HTMLElement, any>
Selection.append(name: string):Selection<SVGElement, any, SVGElement, any>

// Scales
scaleLinear():ScaleLinear<number,number>
ScaleLinear.domain(domain: [number,number] | number[]):this
ScaleLinear.range(range: [number,number] | number[]):this
ScaleLinear.clamp(clamp: boolean):this
ScaleLinear.interpolate(interpolate: (a:any,b:any)=>any):this
ScaleLinear.ticks(count?: number): number[]
ScaleLinear.tickFormat(count?:number, specifier?:string): (d:number)=>string

scaleTime():ScaleTime<Date,number>
ScaleTime.domain(domain: [Date,Date]):this
ScaleTime.range(range: [number,number] | number[]):this

// Axes
axisBottom(scale: Scale): Axis<Domain>
axisLeft(scale: Scale): Axis<Domain>
Axis.ticks(count?:number, specifier?:string):this
Axis.tickSize(size: number):this
Axis.tickPadding(padding: number):this
Axis.tickFormat(format: string | ((d:any,i:number)=>string)):this

// Line Generator
line(): Line<[number,number]>
Line.x(accessor: (d:any,i:number)=>number):this
Line.y(accessor: (d:any,i:number)=>number):this
Line.curve(curveFactory: CurveFactory):this
Line.defined(accessor: (d:any,i:number)=>boolean):this
Line.context(context: CanvasRenderingContext2D):this

// Arc Generator
arc(): Arc<any>
Arc.innerRadius(radius: number|function):this
Arc.outerRadius(radius: number|function):this
Arc.startAngle(angle: number|function):this
Arc.endAngle(angle: number|function):this
Arc.padAngle(angle: number|function):this

// CSV
csv(url: string, row?: (row:Object,i:number)=>any, callback?: (error:any,data:any)=>void): Promise<any[]>

// Transitions
transition(name?: string): Transition
Transition.duration(duration: number):this
Transition.delay(delay: number):this
Transition.ease(ease: string | (t:number)=>number):this
Transition.attr(name: string, value: any | ((d:any,i:number)=>any)):this
Transition.style(name: string, value: any | ((d:any,i:number)=>any), priority?: string):this

Code Examples:
1. Linear Scale & Axis
const x = d3.scaleLinear().domain([0,100]).range([0,400]).clamp(true);
const xAxis = d3.axisBottom(x).ticks(5).tickSize(10).tickPadding(5).tickFormat(d3.format(",.0f"));
svg.append('g').attr('transform','translate(50,300)').call(xAxis);

2. Line Chart
const line = d3.line().x(d=>x(d.x)).y(d=>y(d.y)).curve(d3.curveMonotoneX);
svg.append('path').datum(data).attr('d',line).attr('stroke','steelblue').attr('fill','none');

3. CSV Loading
console.log('Loading data');
d3.csv('data.csv', d=>({x:+d.x,y:+d.y})).then(data=>console.log(data));

4. Transition Example
svg.selectAll('rect').data(data).enter().append('rect')
   .attr('height',0).transition('grow').duration(800).ease('bounce')
   .attr('height',d=>y(d.value));

Configuration Options:
- scaleLinear.domain: default [0,1]
- scaleLinear.range: default [0,1]
- scaleLinear.clamp: default false
- axis.tickSize: default 6
- axis.tickPadding: default 3
- transition.duration: default 250
- transition.ease: default cubic-in-out

Best Practices:
• Always set explicit domain and range on scales.
• Use .nice() on scales after domain for rounded ticks: scale.nice(5).
• Use curve factories for smooth lines: d3.curveBasis, d3.curveMonotoneX.
• Reuse scales and axes for performance.

Troubleshooting:
1. Verify d3 version: console.log(d3.version) // expect "7.x"
2. Check selection length: console.log(selection.size()) // >0
3. Ensure SVG namespace: document.createElementNS('http://www.w3.org/2000/svg','svg')
4. Use browser devtools to inspect path 'd' attribute for syntax errors.
5. If CSV fails, check CORS and network: curl -I https://example.com/data.csv
Expected 200 OK.


## Information Dense Extract
select(selector):Selection; selectAll(selector):Selection; append(name):Selection. scaleLinear():domain([0,1])->range([0,1])->clamp(false)->interpolate(d3.interpolate)->ticks(10)->tickFormat(count,fmt). scaleTime():Date domain. axisBottom(scale)->ticks( count,fmt )->tickSize(6)->tickPadding(3)->tickFormat(fmt). line():x(fn)->y(fn)->curve(factory)->defined(fn)->context(ctx). arc():innerRadius(r)->outerRadius(r)->startAngle(a)->endAngle(a)->padAngle(a). csv(url,row)->Promise<Object[]>. transition(name)->duration(ms)->delay(ms)->ease(name)->attr(name,val)->style(name,val). defaults: scale.domain[0,1],range[0,1],clamp false,nice optional; axis.tickSize6,tickPadding3; transition.duration250,ease cubic-in-out. code: const svg=d3.select('body').append('svg').attr('width',W).attr('height',H); const x=d3.scaleLinear().domain([0,max]).range([0,W]); svg.append('g').attr('transform',t).call(d3.axisBottom(x)); d3.csv(url,d).then(data=>{/*draw*/});

## Sanitised Extract
Table of Contents:
1. Selection API
2. Scale API
3. Axis API
4. Shape Generators
5. Data Loading
6. Transitions

1. Selection API
   d3.select(selector: string):Selection  Single-element selection
   d3.selectAll(selector: string):Selection  Multi-element selection
   selection.append(name: string):Selection  Append child element

2. Scale API
   d3.scaleLinear():ScaleLinear  linear mapping domainrange; default domain [0,1], range [0,1]
       Methods:
         domain([number]):ScaleLinear
         range([number]):ScaleLinear
         clamp(boolean):ScaleLinear
         interpolate(function):ScaleLinear
         ticks(count:number):number[]
         tickFormat(count:number, specifier?:string):(d:number)=>string
   d3.scaleTime():ScaleTime  domain & range accept Date; inherits all ScaleLinear methods

3. Axis API
   d3.axisBottom(scale:Scale):Axis  orientation bottom
   d3.axisLeft(scale:Scale):Axis  orientation left
       Axis Methods:
         ticks(count:number, specifier?:string):Axis
         tickSize(size:number):Axis
         tickPadding(padding:number):Axis
         tickFormat(format:function|string):Axis

4. Shape Generators
   d3.line():LineGenerator  create path from points
       Methods:
         x(fn:(d,D,i)=>number):LineGenerator
         y(fn:(d,D,i)=>number):LineGenerator
         curve(curveFactory):LineGenerator
         defined(fn:(d,D,i)=>boolean):LineGenerator
         context(ctx:CanvasRenderingContext2D):LineGenerator
   d3.arc():ArcGenerator  create arc path
       Methods:
         innerRadius(number|function):ArcGenerator
         outerRadius(number|function):ArcGenerator
         startAngle(number|function):ArcGenerator
         endAngle(number|function):ArcGenerator
         padAngle(number|function):ArcGenerator

5. Data Loading
   d3.csv(url:string, row?:function, callback?:function):Promise<object[]>  fetch CSV, parse rows, optional conversion, callback support

6. Transitions
   selection.transition(name?:string):Transition  schedule tweening
       Methods:
         duration(ms:number):Transition
         delay(ms:number):Transition
         ease(name:string):Transition
         attr(name:string, value:any|function):Transition
         style(name:string, value:any|function):Transition

## Original Source
D3.js Data-Driven Documents
https://github.com/d3/d3/blob/main/API.md

## Digest of D3_API

# D3 API Reference — Retrieved 2024-06-26
Data Size: 882968 bytes

# Selection API
## d3.select(selector: string): Selection
Selects the first matching element in the document. Returns a single-element selection. Throws no error if selector not found.

## d3.selectAll(selector: string): Selection
Selects all matching elements. Returns multi-element selection.

## Selection.append(name: string): Selection
Creates a new element of the given name and appends it to each selected element. Returns updated selection.

# Scale API
## d3.scaleLinear(): ScaleLinear
Creates a linear scale with default domain [0,1] and range [0,1]. Methods:
  • scale.domain([number…]): ScaleLinear  (default [0,1])
  • scale.range([number…]): ScaleLinear   (default [0,1])
  • scale.clamp(boolean): ScaleLinear      (default false)
  • scale.interpolate(function): ScaleLinear (default d3.interpolate)
  • scale.ticks(count: number): number[]   (default count ~10)
  • scale.tickFormat(count: number, specifier?: string): (d: number)→string

## d3.scaleTime(): ScaleTime
Same as scaleLinear but accepts Date objects and domain(range) as [Date,Date].

# Axis API
## d3.axisBottom(scale: Scale): Axis
Creates a bottom-oriented axis generator for the given scale.
  • axis.ticks(count: number, specifier?: string)
  • axis.tickSize(size: number)
  • axis.tickPadding(padding: number)
  • axis.tickFormat(format: function or string)

## d3.axisLeft(scale: Scale): Axis
Creates a left-oriented axis.

# Shape Generators
## d3.line(): LineGenerator
Creates a line generator. Methods:
  • .x(function): LineGenerator
  • .y(function): LineGenerator
  • .curve(curveFactory)
  • .defined(function)
  • .context(context: CanvasRenderingContext2D)

## d3.arc(): ArcGenerator
Path data for arcs with methods:
  • .innerRadius(number|function)
  • .outerRadius(number|function)
  • .startAngle(number|function)
  • .endAngle(number|function)
  • .padAngle(number|function)

# Fetch API
## d3.csv(url: string, row?: function, callback?): Promise
Parses CSV from URL. Returns Promise of array of objects. Optional row conversion and callback.

# Transitions
## selection.transition(name?: string): Transition
Creates a transition on a selection. Methods:
  • .duration(milliseconds: number)
  • .delay(milliseconds: number)
  • .ease(name: string)
  • .attr(name: string, value: any|function)
  • .style(name: string, value: any|function)

    

## Attribution
- Source: D3.js Data-Driven Documents
- URL: https://github.com/d3/d3/blob/main/API.md
- License: BSD-3-Clause
- Crawl Date: 2025-05-17T18:31:15.104Z
- Data Size: 882968 bytes
- Links Found: 5681

## Retrieved
2025-05-17
