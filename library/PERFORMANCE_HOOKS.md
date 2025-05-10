# PERFORMANCE_HOOKS

## Crawl Summary
Exports performance and PerformanceObserver from 'node:perf_hooks'; provides Web Performance API subset plus Node.js extensions. performance methods: clearMarks(name), clearMeasures(name), clearResourceTimings(name), eventLoopUtilization(prev1,prev2):{idle,active,utilization}, getEntries(), getEntriesByName(name,type), getEntriesByType(type), mark(name,options), markResourceTiming(fetchTimingInfo,requestedUrl,initiatorType,global,cacheMode,bodyInfo,responseStatus,deliveryType), measure(name,startMarkOrOptions,endMark), nodeTiming, now(), setResourceTimingBufferSize(maxSize), timeOrigin, timerify(fn,options), toJSON(), event 'resourcetimingbufferfull'. Classes: PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceNodeEntry, PerformanceNodeTiming, PerformanceResourceTiming, PerformanceObserver, PerformanceObserverEntryList. Histograms: createHistogram(options), monitorEventLoopDelay(options), Histogram, IntervalHistogram, RecordableHistogram.

## Normalised Extract
Table of Contents
1 Module Import
2 Core API Methods
3 Entry Objects
4 Observer API
5 Histograms

1 Module Import
import { performance, PerformanceObserver } from 'node:perf_hooks';
const { performance, PerformanceObserver } = require('node:perf_hooks');

2 Core API Methods
performance.clearMarks(name:string) : void  
performance.clearMeasures(name:string) : void  
performance.clearResourceTimings(name:string) : void  
performance.eventLoopUtilization(prevUtil?:Object, prevPrevUtil?:Object) : { idle:number, active:number, utilization:number }  
performance.getEntries() : PerformanceEntry[]  
performance.getEntriesByName(name:string, type?:string) : PerformanceEntry[]  
performance.getEntriesByType(type:string) : PerformanceEntry[]  
performance.mark(name:string, options?:{ detail:any, startTime:number }) : void  
performance.markResourceTiming(timingInfo:Object, requestedUrl:string, initiatorType:string, global:Object, cacheMode:string, bodyInfo:Object, responseStatus:number, deliveryType?:string) : void  
performance.measure(name:string, startMarkOrOptions?:string|{ detail:any, duration:number, start:number|string, end:number|string }, endMark?:string) : void  
performance.nodeTiming : PerformanceNodeTiming  
performance.now() : number  
performance.setResourceTimingBufferSize(maxSize:number) : void  
performance.timeOrigin : number  
performance.timerify(fn:Function, options?:{ histogram:RecordableHistogram }) : Function  
performance.toJSON() : Object  

3 Entry Objects
PerformanceEntry { duration:number; entryType:string; name:string; startTime:number }  
PerformanceMark extends PerformanceEntry { detail:any }  
PerformanceMeasure extends PerformanceEntry { detail:any }  
PerformanceNodeEntry extends PerformanceEntry { detail:any; flags:number; kind:number }  
PerformanceNodeTiming { bootstrapComplete:number; environment:number; idleTime:number; loopExit:number; loopStart:number; nodeStart:number; uvMetricsInfo:{ loopCount:number; events:number; eventsWaiting:number }; v8Start:number }  
PerformanceResourceTiming extends PerformanceEntry { workerStart:number; redirectStart:number; redirectEnd:number; fetchStart:number; domainLookupStart:number; domainLookupEnd:number; connectStart:number; connectEnd:number; secureConnectionStart:number; requestStart:number; responseEnd:number; transferSize:number; encodedBodySize:number; decodedBodySize:number; toJSON():Object }  

4 Observer API
PerformanceObserver.supportedEntryTypes : string[]  
new PerformanceObserver(callback:(list:PerformanceObserverEntryList,observer:PerformanceObserver)=>void)  
observer.observe({ entryTypes:string[], buffered?:boolean }) : void  
observer.disconnect() : void  
observer.takeRecords() : PerformanceEntry[]  
PerformanceObserverEntryList.getEntries() : PerformanceEntry[]  
PerformanceObserverEntryList.getEntriesByName(name:string, type?:string) : PerformanceEntry[]  
PerformanceObserverEntryList.getEntriesByType(type:string) : PerformanceEntry[]  

5 Histograms
perf_hooks.createHistogram(options?:{ maxDigits?:number; percentiles?:number[] }) : RecordableHistogram  
perf_hooks.monitorEventLoopDelay(options?:{ resolution?:number }) : Histogram  
Histogram methods: count():number; countBigInt():BigInt; exceeds(percentile:number):number; exceedsBigInt(percentile:number):BigInt; max():number; maxBigInt():BigInt; mean():number; min():number; minBigInt():BigInt; percentile(p:number):number; percentileBigInt(p:number):BigInt; percentiles():{ [p:number]:number }; percentilesBigInt():{ [p:number]:BigInt }; reset():void; stddev():number  
IntervalHistogram adds enable():void; disable():void; clone():IntervalHistogram  
RecordableHistogram adds add(other:Histogram):void; record(value:number):void; recordDelta():void


## Supplementary Details
Default buffer size for performance resource timing: 250 entries.  
Event 'resourcetimingbufferfull' fires when the global Resource Timeline buffer is full. Adjust via performance.setResourceTimingBufferSize(maxSize) or performance.clearResourceTimings().  
performance.eventLoopUtilization() returns cumulative metrics; use delta by passing previous sample object.  
In timerify(fn,{ histogram }) pass RecordableHistogram to collect nanosecond durations.  
For PerformanceObserver.observe options: entryTypes is required; buffered defaults to false.  
performance.timeOrigin is static timestamp marking process start.  
performance.nodeTiming.uvMetricsInfo returns { loopCount, events, eventsWaiting } reflecting libuv metrics; use inside setImmediate to avoid zeroed values.  
Set resolution in monitorEventLoopDelay to control sampling frequency; default 10ms.  
Histogram.percentiles accepts array of percentiles [50,75,90,99] to compute multiple percentiles in one call.


## Reference Details
// Module import
import { performance, PerformanceObserver, constants, createHistogram, monitorEventLoopDelay } from 'node:perf_hooks';

// Measuring async operation duration
const obs = new PerformanceObserver((list, obs) => {  
  const entry = list.getEntries()[0];  
  console.log('Duration:', entry.duration, 'ms');  
  performance.clearMarks();  
  performance.clearMeasures();  
  obs.disconnect();  
});  
obs.observe({ entryTypes:['measure'], buffered:true });  
performance.mark('start');  
await longTask();  
performance.mark('end');  
performance.measure('task-duration','start','end');

// Monitoring event loop delay
const h = monitorEventLoopDelay({ resolution:5 });  
h.enable();  
setInterval(() => {  
  console.log('Min:', h.min(), 'Max:', h.max(), 'Mean:', h.mean());  
  h.reset();  
},1000);

// Creating histogram for custom timing
const hist = createHistogram({ maxDigits:5, percentiles:[50,90,99] });  
function timedTask() {  
  const start = performance.now();  
  doWork();  
  hist.record(performance.now()-start);  
}  
// timerify with histogram
const wrapped = performance.timerify(timedTask,{ histogram:hist });
wrapped();

// Adjust resource timing buffer
performance.setResourceTimingBufferSize(500);
performance.on('resourcetimingbufferfull', () => { performance.clearResourceTimings(); });

// Troubleshooting
// If no entries appear, ensure:  
// - Observer.observe is called before marks/measures.  
// - buffered:true for existing entries.  
// - performance.clear* invoked after processing to avoid buffer exhaustion.  
// Example command
// $ node --trace-sync-io script.js  # traces synchronous operations


## Information Dense Extract
import{performance,PerformanceObserver,createHistogram,monitorEventLoopDelay}from'node:perf_hooks'; performance.clearMarks(name:string); performance.clearMeasures(name:string); performance.clearResourceTimings(name:string); performance.eventLoopUtilization(prev?:Obj,prev2?:Obj):{idle,active,utilization}; performance.getEntries():PerformanceEntry[]; performance.getEntriesByName(n:string,t?:string):PerformanceEntry[]; performance.getEntriesByType(t:string):PerformanceEntry[]; performance.mark(n:string,opt?:{detail:any,startTime:number}); performance.markResourceTiming(timingInfo:Obj, url:string, initiator:string, global:Obj, cache:string, bodyInfo:Obj, status:number, delivery?:string); performance.measure(n:string, startMarkOrOpt?:string|{detail:any,duration:number,start:number|string,end:number|string}, endMark?:string); performance.nodeTiming:PerformanceNodeTiming; performance.now():number; performance.setResourceTimingBufferSize(maxSize:number); performance.timeOrigin:number; performance.timerify(fn:Function,opt?:{histogram:RecordableHistogram}):Function; performance.toJSON():Object; PerformanceEntry{duration:number,entryType:string,name:string,startTime:number}; PerformanceMark.detail:any; PerformanceMeasure.detail:any; PerformanceNodeEntry{detail:any,flags:number,kind:number}; PerformanceNodeTiming{bootstrapComplete,environment,idleTime,loopExit,loopStart,nodeStart,uvMetricsInfo{loopCount,events,eventsWaiting},v8Start}; PerformanceResourceTiming{workerStart,redirectStart,redirectEnd,fetchStart,domainLookupStart,domainLookupEnd,connectStart,connectEnd,secureConnectionStart,requestStart,responseEnd,transferSize,encodedBodySize,decodedBodySize,toJSON()}; PerformanceObserver.supportedEntryTypes:string[]; new PerformanceObserver(cb:(list,obs)=>void); observe({entryTypes:string[],buffered?:boolean}); disconnect(); takeRecords():PerformanceEntry[]; PerformanceObserverEntryList.getEntries(),getEntriesByName(n:string,t?:string),getEntriesByType(t:string); createHistogram(opt?:{maxDigits?:number,percentiles?:number[]}):RecordableHistogram; monitorEventLoopDelay(opt?:{resolution?:number}):Histogram; Histogram.count(),countBigInt(),exceeds(p),exceedsBigInt(p),max(),maxBigInt(),mean(),min(),minBigInt(),percentile(p),percentileBigInt(p),percentiles(),percentilesBigInt(),reset(),stddev(); IntervalHistogram.enable(),disable(),clone(); RecordableHistogram.add(h),record(val),recordDelta()

## Sanitised Extract
Table of Contents
1 Module Import
2 Core API Methods
3 Entry Objects
4 Observer API
5 Histograms

1 Module Import
import { performance, PerformanceObserver } from 'node:perf_hooks';
const { performance, PerformanceObserver } = require('node:perf_hooks');

2 Core API Methods
performance.clearMarks(name:string) : void  
performance.clearMeasures(name:string) : void  
performance.clearResourceTimings(name:string) : void  
performance.eventLoopUtilization(prevUtil?:Object, prevPrevUtil?:Object) : { idle:number, active:number, utilization:number }  
performance.getEntries() : PerformanceEntry[]  
performance.getEntriesByName(name:string, type?:string) : PerformanceEntry[]  
performance.getEntriesByType(type:string) : PerformanceEntry[]  
performance.mark(name:string, options?:{ detail:any, startTime:number }) : void  
performance.markResourceTiming(timingInfo:Object, requestedUrl:string, initiatorType:string, global:Object, cacheMode:string, bodyInfo:Object, responseStatus:number, deliveryType?:string) : void  
performance.measure(name:string, startMarkOrOptions?:string|{ detail:any, duration:number, start:number|string, end:number|string }, endMark?:string) : void  
performance.nodeTiming : PerformanceNodeTiming  
performance.now() : number  
performance.setResourceTimingBufferSize(maxSize:number) : void  
performance.timeOrigin : number  
performance.timerify(fn:Function, options?:{ histogram:RecordableHistogram }) : Function  
performance.toJSON() : Object  

3 Entry Objects
PerformanceEntry { duration:number; entryType:string; name:string; startTime:number }  
PerformanceMark extends PerformanceEntry { detail:any }  
PerformanceMeasure extends PerformanceEntry { detail:any }  
PerformanceNodeEntry extends PerformanceEntry { detail:any; flags:number; kind:number }  
PerformanceNodeTiming { bootstrapComplete:number; environment:number; idleTime:number; loopExit:number; loopStart:number; nodeStart:number; uvMetricsInfo:{ loopCount:number; events:number; eventsWaiting:number }; v8Start:number }  
PerformanceResourceTiming extends PerformanceEntry { workerStart:number; redirectStart:number; redirectEnd:number; fetchStart:number; domainLookupStart:number; domainLookupEnd:number; connectStart:number; connectEnd:number; secureConnectionStart:number; requestStart:number; responseEnd:number; transferSize:number; encodedBodySize:number; decodedBodySize:number; toJSON():Object }  

4 Observer API
PerformanceObserver.supportedEntryTypes : string[]  
new PerformanceObserver(callback:(list:PerformanceObserverEntryList,observer:PerformanceObserver)=>void)  
observer.observe({ entryTypes:string[], buffered?:boolean }) : void  
observer.disconnect() : void  
observer.takeRecords() : PerformanceEntry[]  
PerformanceObserverEntryList.getEntries() : PerformanceEntry[]  
PerformanceObserverEntryList.getEntriesByName(name:string, type?:string) : PerformanceEntry[]  
PerformanceObserverEntryList.getEntriesByType(type:string) : PerformanceEntry[]  

5 Histograms
perf_hooks.createHistogram(options?:{ maxDigits?:number; percentiles?:number[] }) : RecordableHistogram  
perf_hooks.monitorEventLoopDelay(options?:{ resolution?:number }) : Histogram  
Histogram methods: count():number; countBigInt():BigInt; exceeds(percentile:number):number; exceedsBigInt(percentile:number):BigInt; max():number; maxBigInt():BigInt; mean():number; min():number; minBigInt():BigInt; percentile(p:number):number; percentileBigInt(p:number):BigInt; percentiles():{ [p:number]:number }; percentilesBigInt():{ [p:number]:BigInt }; reset():void; stddev():number  
IntervalHistogram adds enable():void; disable():void; clone():IntervalHistogram  
RecordableHistogram adds add(other:Histogram):void; record(value:number):void; recordDelta():void

## Original Source
Node.js Core APIs, Streams, and Concurrency
https://nodejs.org/api/perf_hooks.html

## Digest of PERFORMANCE_HOOKS

# perf_hooks Module (retrieved 2024-07-23)

## perf_hooks.performance API Methods

### performance.clearMarks([name])
Parameters
  name <string>  optional  name of the mark to remove; if omitted, clears all marks.
Behavior
  Removes named PerformanceMark entries from the global Performance Timeline.

### performance.clearMeasures([name])
Parameters
  name <string>  optional  name of the measure to remove; if omitted, clears all measures.
Behavior
  Removes named PerformanceMeasure entries from the global Performance Timeline.

### performance.clearResourceTimings([name])
Parameters
  name <string>  optional  name of the resource timing entry; if omitted, clears all resource timings.
Behavior
  Removes named PerformanceResourceTiming entries from the global Resource Timeline.

### performance.eventLoopUtilization([prevUtil[, prevPrevUtil]]) => Object
Parameters
  prevUtil  <Object>  optional  previous ELU sample.
  prevPrevUtil  <Object>  optional  sample preceding prevUtil.
Returns
  idle <number>  cumulative idle time in milliseconds.
  active <number>  cumulative active time in milliseconds.
  utilization <number>  ratio active/(active+idle).

### performance.getEntries() => PerformanceEntry[]
Returns an array of all PerformanceEntry objects in chronological order.

### performance.getEntriesByName(name[, type]) => PerformanceEntry[]
Parameters
  name <string>
  type <string>  optional
Returns entries matching name and optional type.

### performance.getEntriesByType(type) => PerformanceEntry[]
Parameters
  type <string>
Returns entries matching type.

### performance.mark(name[, options])
Parameters
  name <string>  required
  options <Object>  optional
    detail <any>  default null
    startTime <number> default performance.now()
Behavior
  Creates a new PerformanceMark entry in the Performance Timeline.

### performance.markResourceTiming(timingInfo, requestedUrl, initiatorType, global, cacheMode, bodyInfo, responseStatus[, deliveryType])
Parameters
  timingInfo <Object>  fetch timing info
  requestedUrl <string>
  initiatorType <string>
  global <Object>
  cacheMode <string>  '' or 'local'
  bodyInfo <Object>
  responseStatus <number>
  deliveryType <string>  optional  default ''
Behavior
  Creates a new PerformanceResourceTiming entry in the global Resource Timeline.

### performance.measure(name[, startMarkOrOptions[, endMark]])
Parameters
  name <string>  required
  startMarkOrOptions <string|Object>  optional
    if Object:
      detail <any>
      duration <number>
      start <number|string>
      end <number|string>
  endMark <string>  optional
Behavior
  Creates a new PerformanceMeasure entry; duration = endTime - startTime.

### performance.nodeTiming => PerformanceNodeTiming
Node-specific timing metrics for process bootstrap, environment init, loop start/exit, V8 start, idleTime, uvMetricsInfo.

### performance.now() => number
Returns high-resolution timestamp in milliseconds since timeOrigin.

### performance.setResourceTimingBufferSize(maxSize)
Parameters
  maxSize <number>
Behavior
  Sets resource timing buffer capacity; default 250 entries.

### performance.timeOrigin => number
Millisecond timestamp (Unix) when Node.js process began.

### performance.timerify(fn[, options]) => Function
Parameters
  fn <Function>
  options <Object>  optional
    histogram <RecordableHistogram>
Behavior
  Returns wrapped function that emits 'function' PerformanceEntry when invoked.

### performance.toJSON() => Object
Returns JSON representation of the performance object.

## PerformanceEntry and Subclasses
- PerformanceEntry
  duration <number>
  entryType <string>
  name <string>
  startTime <number>
- PerformanceMark extends PerformanceEntry
  detail <any>
- PerformanceMeasure extends PerformanceEntry
  detail <any>
- PerformanceNodeEntry extends PerformanceEntry
  detail <any>
  flags <number>
  kind <number>
- PerformanceNodeTiming
  bootstrapComplete <number>
  environment <number>
  idleTime <number>
  loopExit <number>
  loopStart <number>
  nodeStart <number>
  uvMetricsInfo <Object>
  v8Start <number>
- PerformanceResourceTiming extends PerformanceEntry
  workerStart, redirectStart, redirectEnd, fetchStart, domainLookupStart,
  domainLookupEnd, connectStart, connectEnd, secureConnectionStart,
  requestStart, responseEnd, transferSize, encodedBodySize, decodedBodySize,
  toJSON()

## PerformanceObserver
- supportedEntryTypes <string[]>
- constructor(callback)
- observe(options)
  options.entryTypes <string[]>  required
  options.buffered <boolean>  default false
- disconnect()
- takeRecords() => PerformanceEntry[]

## PerformanceObserverEntryList
- getEntries() => PerformanceEntry[]
- getEntriesByName(name[, type]) => PerformanceEntry[]
- getEntriesByType(type) => PerformanceEntry[]

## Histograms
### perf_hooks.createHistogram([options]) => RecordableHistogram
  options <Object>
    maxDigits <number>
    percentiles <number[]>  default empty
### perf_hooks.monitorEventLoopDelay([options]) => Histogram
  options <Object>
    resolution <number> default 10ms
### Histogram methods
  count(), countBigInt(), exceeds(percentile), exceedsBigInt(percentile), max(), maxBigInt(), mean(), min(), minBigInt(), percentile(p), percentileBigInt(p), percentiles(), percentilesBigInt(), reset(), stddev()
### IntervalHistogram extends Histogram
  enable(), disable(), clone()
### RecordableHistogram extends Histogram
  add(otherHistogram), record(value), recordDelta()


## Attribution
- Source: Node.js Core APIs, Streams, and Concurrency
- URL: https://nodejs.org/api/perf_hooks.html
- License: License: Node.js (MIT-like terms)
- Crawl Date: 2025-05-10T09:03:20.268Z
- Data Size: 3375546 bytes
- Links Found: 325

## Retrieved
2025-05-10
