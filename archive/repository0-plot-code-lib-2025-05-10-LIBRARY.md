library/PERFORMANCE_HOOKS.md
# library/PERFORMANCE_HOOKS.md
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
library/STATIC_FILES.md
# library/STATIC_FILES.md
# STATIC_FILES

## Crawl Summary
express.static middleware signature, parameters: root, options; usage patterns: single directory, multiple directories resolution order; virtual path mounting; absolute path resolution; reverse proxy recommendation for performance

## Normalised Extract
Table of Contents
1. express.static Signature and Parameters
2. Single Directory Serving
3. Multiple Directory Serving and Precedence
4. Virtual Path Prefix Mounting
5. Absolute Path Resolution
6. Performance Best Practice

1. express.static Signature and Parameters
   express.static(root, [options])
   root: path to directory serving assets
   options: serve-static configuration object

2. Single Directory Serving
   Use express.static with app.use to serve files from a single folder
   Example:
   app.use(express.static('public'))
   URLs map directly to public/<file>

3. Multiple Directory Serving and Precedence
   Call express.static multiple times
   app.use(express.static('public'))
   app.use(express.static('files'))
   Resolution order: public first, then files

4. Virtual Path Prefix Mounting
   Prefix URLs without altering directory structure
   app.use('/static', express.static('public'))
   URLs: /static/<file> maps to public/<file>

5. Absolute Path Resolution
   Prevent relative path issues when running from different cwd
   Example:
   const path = require('path')
   app.use('/static', express.static(path.join(__dirname, 'public')))

6. Performance Best Practice
   Deploy reverse proxy cache (nginx, Varnish) in front of Express to cache and serve static assets

## Supplementary Details
serve-static options object properties:
- dotfiles: 'allow' | 'deny' | 'ignore'. Default: 'ignore'.
- etag: boolean. Enable ETag header. Default: true.
- extensions: string array. Fallback file extensions. Default: undefined.
- index: boolean or string or string array. Default: 'index.html'.
- lastModified: boolean. Enable Last-Modified header. Default: true.
- maxAge: number or string. Sets Cache-Control max-age in ms. Default: 0.
- redirect: boolean. Redirect to trailing slash. Default: true.
- setHeaders: function(res, path, stat). Custom headers per file.

Implementation Steps:
1. require express and path modules.
2. Create app instance.
3. Configure static middleware using absolute paths.
4. Chain calls for multiple folders.
5. Mount on virtual path if needed.
6. Configure serve-static options for caching.
7. Deploy behind reverse proxy.


## Reference Details
// express.static API specification
express.static(root: string, options?: {
  dotfiles?: 'allow' | 'deny' | 'ignore',
  etag?: boolean,
  extensions?: string[],
  index?: boolean | string | string[],
  lastModified?: boolean,
  maxAge?: number | string,
  redirect?: boolean,
  setHeaders?: (res: import('express').Response, filePath: string, stat: import('fs').Stats) => void
}): import('express').RequestHandler

// Example code
const express = require('express')
const path = require('path')
const app = express()

// Serve public with caching
app.use(
  express.static(
    path.join(__dirname, 'public'),
    {
      dotfiles: 'ignore',
      etag: true,
      lastModified: true,
      maxAge: '1d',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'public, max-age=0')
        }
      }
    }
  )
)

// Multiple dirs
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'files')))

// Virtual prefix
app.use('/static', express.static(path.join(__dirname, 'public')))

// Start server
app.listen(3000, () => console.log('Server on port 3000'))

// Troubleshooting Procedures
// 1. 404 errors: verify file exists under root and URL path matches
//    $ curl -I http://localhost:3000/js/app.js
//    Expected: HTTP/1.1 200 OK; Content-Type: application/javascript
// 2. Check headers for caching
//    $ curl -I http://localhost:3000/css/style.css
//    Expect: Cache-Control, ETag, Last-Modified
// 3. Debug logging
//    $ DEBUG=express:static node app.js
//    Observe static middleware logs

## Information Dense Extract
express.static(root:string,options?):RequestHandler; options:dotfiles('allow'|'deny'|'ignore'),etag(bool),lastModified(bool),maxAge(ms|string),index(bool|string|string[]),extensions(string[]),redirect(bool),setHeaders(fn). Usage: app.use(express.static('public')); multi-dir precedence: order of app.use calls; virtual mount: app.use('/static',express.static(...)); use path.join(__dirname,'dir') for absolute; serve-static headers: Cache-Control:max-age, ETag, Last-Modified; best practice: reverse proxy cache; troubleshooting: curl -I for 200, headers; DEBUG=express:static for logs.

## Sanitised Extract
Table of Contents
1. express.static Signature and Parameters
2. Single Directory Serving
3. Multiple Directory Serving and Precedence
4. Virtual Path Prefix Mounting
5. Absolute Path Resolution
6. Performance Best Practice

1. express.static Signature and Parameters
   express.static(root, [options])
   root: path to directory serving assets
   options: serve-static configuration object

2. Single Directory Serving
   Use express.static with app.use to serve files from a single folder
   Example:
   app.use(express.static('public'))
   URLs map directly to public/<file>

3. Multiple Directory Serving and Precedence
   Call express.static multiple times
   app.use(express.static('public'))
   app.use(express.static('files'))
   Resolution order: public first, then files

4. Virtual Path Prefix Mounting
   Prefix URLs without altering directory structure
   app.use('/static', express.static('public'))
   URLs: /static/<file> maps to public/<file>

5. Absolute Path Resolution
   Prevent relative path issues when running from different cwd
   Example:
   const path = require('path')
   app.use('/static', express.static(path.join(__dirname, 'public')))

6. Performance Best Practice
   Deploy reverse proxy cache (nginx, Varnish) in front of Express to cache and serve static assets

## Original Source
Express Official Documentation
https://expressjs.com/

## Digest of STATIC_FILES

# Serving Static Files in Express

Express built-in middleware express.static serves static assets.

## Signature

```javascript
express.static(root, [options])
```
- root: string. Root directory for static files.
- options: object. Configuration for serve-static.

## Basic Usage

```javascript
const express = require('express')
const app = express()

// Serve from public directory
app.use(express.static('public'))

// Serve multiple directories in order
two
app.use(express.static('public'))
app.use(express.static('files'))
```

## Virtual Path Prefix

```javascript
app.use('/static', express.static('public'))
```
Access assets under /static path.

## Absolute Path Resolution

```javascript
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

## Best Practice

- Use a reverse proxy cache (e.g., nginx) for improved performance of static assets.

## Retrieved

Date: 2024-07-07
Data Size: 1250266 bytes
Links Found: 8230

## Attribution
- Source: Express Official Documentation
- URL: https://expressjs.com/
- License: License: MIT
- Crawl Date: 2025-05-10T06:02:24.460Z
- Data Size: 1250266 bytes
- Links Found: 8230

## Retrieved
2025-05-10
library/NPM_PUBLISH.md
# library/NPM_PUBLISH.md
# NPM_PUBLISH

## Crawl Summary
Usage: npm publish [<pkg-spec>] [--tag <tag>=latest] [--access <public|restricted>=public] [--dry-run=false] [--otp <code>] [--workspace <pattern>] [--workspaces] [--include-workspace-root=false] [--provenance=false] [--provenance-file <path>]
Publishes folder|tarball|url|name@version|name@tag|git-url. Fails if version exists. Sends sha1 and sha512 sums. Defaults: access=public (scoped=restricted), tag=latest.  dry-run reports only. Ignored files: .npmignore/.gitignore, never-include patterns, symlinks. Workspaces options filter projects.  provenance links CI/CD. provenance-file uses existing bundle. OTP required for 2FA registries.

## Normalised Extract
Table of Contents:
 1. Command Usage
 2. Publish Targets
 3. Integrity Submission
 4. File Inclusion Rules
 5. Configuration Options
 6. Workspace Behavior
 7. Provenance Controls
 8. Error Codes & Remedies

1. Command Usage
 npm publish [<folder>|<.tgz>|<url>|<name>@<version>|<name>@<tag>|<git-url>] [--tag <tag>] [--access <public|restricted>] [--dry-run] [--otp <code>] [--workspace <pattern>] [--workspaces] [--include-workspace-root] [--provenance] [--provenance-file <path>]

2. Publish Targets
 - Folder: must contain package.json
 - Tarball: gzipped .tgz
 - URL: points to tarball
 - name@version: exact published version
 - name@tag: resolves tag to version
 - git-url: clone and publish

3. Integrity Submission
 - sha1sum and integrity (sha512) fields sent in HTTP PUT
 - Registry expects both; install uses highest algorithm

4. File Inclusion Rules
 - Default include all except ignored by .npmignore
 - Files list in package.json overrides default
 - .npmignore > .gitignore
 - Never-include patterns: *.log, .*rc, test/, coverage/, .travis.yml
 - Symlinks excluded

5. Configuration Options
 tag: String=latest
 access: public|restricted|null=public
 dry-run: Boolean=false
 otp: String|null
 workspace: String[]
 workspaces: Boolean|null
 include-workspace-root: Boolean=false
 provenance: Boolean=false
 provenance-file: Path|null

6. Workspace Behavior
 - --workspace=NAME filters to matching workspaces
 - --workspaces=true runs on all configured workspaces
 - include-workspace-root adds root to workspace commands
 - none of these export env to child processes

7. Provenance Controls
 - --provenance attaches CI build link
 - --provenance-file uploads existing SBOM bundle
 - cannot combine --provenance and --provenance-file

8. Error Codes & Remedies
 EPUTALREADYEXISTS: version exists; bump version
 E403 OTP_REQUIRED: supply --otp <code>
 EISDIR: invalid target, supply tarball or folder
 EPERM ignored file: review .npmignore


## Supplementary Details
Implementation Steps:
1. Bump version in package.json
2. Run npm pack --dry-run to verify included files
3. Verify .npmignore or files list for exclusions
4. Run npm publish --tag beta --access restricted --otp=123456
5. Verify remote dist-tag with npm dist-tag ls

Checksum Fields:
- sha1: Content-SHA1 header
- integrity: sha512 in request body metadata

Mutual Exclusion:
--provenance vs --provenance-file: tool validates arguments before tarball upload

Workspace Sequence:
- npm config set workspace=name OR --workspace=name
- npx lerna publish (optional) to manage multi-package releases


## Reference Details
Full Command Signature:
 npm publish [<target>] [--tag <string>] [--access <string>] [--dry-run] [--otp <string>] [--workspace <string>] [--workspaces] [--include-workspace-root] [--provenance] [--provenance-file <path>]

Parameters:
 <target>: String|URL|Path|Specifier
 --tag: String; defaults to 'latest'
 --access: 'public'|'restricted'|null
 --dry-run: Boolean
 --otp: 6-digit TOTP string
 --workspace: workspace name or path; can repeat
 --workspaces: Boolean
 --include-workspace-root: Boolean
 --provenance: Boolean
 --provenance-file: filesystem path

Returns:
 HTTP 201 Created on success; prints uploaded package URL and tag details
 Exits with code !=0 on error

Examples:
```
# Publish with custom tag
npm publish --tag next

# Dry run to preview
npm publish --dry-run

# Publish scoped package privately
npm publish --access restricted

# Publish specific folder
npm publish ./dist/my-lib

# Publish with 2FA code
npm publish --otp 123456
```

Best Practices:
- Use npm version [major|minor|patch] to bump version and tag commit
- Validate package contents with npm pack
- Automate publish in CI: npm ci && npm test && npm publish --access public --tag $CI_COMMIT_REF_SLUG

Troubleshooting:
# OTP challenge
> npm publish
npm ERR! code EOTP
npm ERR! Need to provide one-time password via --otp

# File missing
> npm publish
npm ERR! manifest has no field for 'main'; add 'main' to package.json


## Information Dense Extract
npm publish [target] options
Options: tag=latest(String), access=public|restricted|null, dry-run=false(Boolean), otp(String), workspace:Array<String>, workspaces(null|Boolean), include-workspace-root=false(Boolean), provenance=false(Boolean), provenance-file=Path|null
Targets: folder|.tgz|url|name@version|name@tag|git-url
Files: include all except .npmignore patterns, never-include defaults; override via package.json 'files'
Checksums: send sha1sum and sha512 integrity; registry verifies
Error codes: EPUTALREADYEXISTS, EOTP, EPERM
Examples: npm publish --tag beta --access restricted --otp=123456
CI Pattern: npm ci && npm test && npm publish --access public --tag $CI_BRANCH


## Sanitised Extract
Table of Contents:
 1. Command Usage
 2. Publish Targets
 3. Integrity Submission
 4. File Inclusion Rules
 5. Configuration Options
 6. Workspace Behavior
 7. Provenance Controls
 8. Error Codes & Remedies

1. Command Usage
 npm publish [<folder>|<.tgz>|<url>|<name>@<version>|<name>@<tag>|<git-url>] [--tag <tag>] [--access <public|restricted>] [--dry-run] [--otp <code>] [--workspace <pattern>] [--workspaces] [--include-workspace-root] [--provenance] [--provenance-file <path>]

2. Publish Targets
 - Folder: must contain package.json
 - Tarball: gzipped .tgz
 - URL: points to tarball
 - name@version: exact published version
 - name@tag: resolves tag to version
 - git-url: clone and publish

3. Integrity Submission
 - sha1sum and integrity (sha512) fields sent in HTTP PUT
 - Registry expects both; install uses highest algorithm

4. File Inclusion Rules
 - Default include all except ignored by .npmignore
 - Files list in package.json overrides default
 - .npmignore > .gitignore
 - Never-include patterns: *.log, .*rc, test/, coverage/, .travis.yml
 - Symlinks excluded

5. Configuration Options
 tag: String=latest
 access: public|restricted|null=public
 dry-run: Boolean=false
 otp: String|null
 workspace: String[]
 workspaces: Boolean|null
 include-workspace-root: Boolean=false
 provenance: Boolean=false
 provenance-file: Path|null

6. Workspace Behavior
 - --workspace=NAME filters to matching workspaces
 - --workspaces=true runs on all configured workspaces
 - include-workspace-root adds root to workspace commands
 - none of these export env to child processes

7. Provenance Controls
 - --provenance attaches CI build link
 - --provenance-file uploads existing SBOM bundle
 - cannot combine --provenance and --provenance-file

8. Error Codes & Remedies
 EPUTALREADYEXISTS: version exists; bump version
 E403 OTP_REQUIRED: supply --otp <code>
 EISDIR: invalid target, supply tarball or folder
 EPERM ignored file: review .npmignore

## Original Source
CI/CD and Release Automation Tools
https://docs.npmjs.com/cli/v10/commands/npm-publish

## Digest of NPM_PUBLISH

# npm publish

## Synopsis

```
npm publish [<package-spec>] [--tag <tag>] [--access <public|restricted>] [--dry-run] [--otp <one-time-password>] [--workspace <pattern>] [--workspaces] [--include-workspace-root] [--provenance] [--provenance-file <path>]
```

## Description

Publishes a package to the registry so it can be installed by name.  Accepts:

- Folder with package.json
- .tgz tarball
- URL to tarball
- name@version
- name@tag
- git remote URL

Fails if name@version exists or was previously published.  Submits sha1 and sha512 integrity checksums.

## Files included

Run `npm pack --dry-run` to list included files.  Defaults include all except:

- Ignored by .npmignore / .gitignore
- Files matching never-include patterns ( e.g. *.log, *.ts ) unless whitelisted
- Symbolic links are excluded

## Configuration options

| Option                | Default     | Type                      | Description                                           |
|-----------------------|-------------|---------------------------|-------------------------------------------------------|
| tag                   | latest      | String                    | Dist-tag to apply                                      |
| access                | public      | public, restricted, null  | Package visibility                                     |
| dry-run               | false       | Boolean                   | Show actions without publishing                        |
| otp                   | null        | String                    | Two-factor one-time password                           |
| workspace             | -           | String[]                  | Filter and run command in specified workspaces         |
| workspaces            | null        | Boolean                   | Run in all workspaces                                  |
| include-workspace-root| false       | Boolean                   | Include root project when using workspaces             |
| provenance            | false       | Boolean                   | Link published package to CI/CD provenance             |
| provenance-file       | null        | Path                      | Use existing provenance bundle                         |

## Defaults & Effects

- `--access=restricted` only valid for scoped packages
- `--dry-run` does not affect remote commands like `dist-tag`
- `--workspace` and `--workspaces` not exported to child processes
- `--provenance` and `--provenance-file` are mutually exclusive

## Integrity

On publish npm@>=5 sends both sha1sum and sha512 integrity to registry.  Installs verify downloads using strongest algorithm.

## Troubleshooting - Common Errors

- E403 whet OTP missing: `npm publish --otp=123456`
- EPUTALREADYEXISTS if name@version exists
- EPERM file ignored: check .npmignore patterns

_Retrieved: 2024-08-13_  
_Data Size: 197470 bytes_  
_Attribution: npm CLI documentation_

## Attribution
- Source: CI/CD and Release Automation Tools
- URL: https://docs.npmjs.com/cli/v10/commands/npm-publish
- License: License: MIT / CC0
- Crawl Date: 2025-05-10T07:02:17.617Z
- Data Size: 197470 bytes
- Links Found: 12375

## Retrieved
2025-05-10
library/CSV_FORMAT.md
# library/CSV_FORMAT.md
# CSV_FORMAT

## Crawl Summary
Each CSV record is a line delimited by CRLF; final record may omit CRLF. Optional header line with same field count controllable by header parameter. Fields separated by commas; spaces significant. Fields containing commas, CRLF, or quotes must be double-quoted; embedded quotes escaped by doubling. Uniform field count enforced. ABNF grammar defines file, header, record, field, escaped and non-escaped forms. MIME type text/csv with optional charset (IANA text sets) and header (present|absent); default charset US-ASCII; use CRLF. File extension .csv.

## Normalised Extract
Table of Contents
1. Record Delimitation
2. Final Record Handling
3. Header Line
4. Field Separation and Spacing
5. Quoted Fields
6. Embedded Quotes Escaping
7. ABNF Grammar
8. MIME Registration Parameters

1. Record Delimitation
   Uses CRLF (\x0D\x0A) as line terminator.

2. Final Record Handling
   Last line may lack CRLF.

3. Header Line
   Optional first line; same comma-separated format; field count equal to records; controlled by header parameter = present|absent.

4. Field Separation and Spacing
   Fields split on commas; spaces are part of field data; no trailing comma after last field.

5. Quoted Fields
   Enclose field in DQUOTE when containing CRLF, comma, or DQUOTE.
   Example: "a, b" + CRLF inside field.

6. Embedded Quotes Escaping
   Represent a literal quote inside a quoted field by doubling: "".

7. ABNF Grammar
   file = [header CRLF] record *(CRLF record) [CRLF]
   field = escaped / non-escaped
   escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
   non-escaped = *TEXTDATA
   COMMA=%x2C  CR=%x0D  LF=%x0A  DQUOTE=%x22  TEXTDATA=%x20-21/%x23-2B/%x2D-7E

8. MIME Registration Parameters
   text/csv; charset={US-ASCII|...}; header={present|absent}

## Supplementary Details
Parameter defaults and effects
- charset default: US-ASCII; any IANA-registered text charset allowed.
- header default: implementor decision if omitted; use header=present to declare header line.
- File extension: .csv recognized by OS and applications.

Implementation steps to generate valid CSV
1. Determine field count per record; pad or error if mismatch.
2. For each field:
   a. If field contains any of {CR, LF, COMMA, DQUOTE}, wrap in DQUOTE.
   b. Inside quoted field, replace each DQUOTE with two DQUOTEs.
3. Join fields with comma; append CRLF.
4. Optionally prepend header line with same process.

Interoperability
- Read conservatively: accept CRLF, LF, or CR as line break; trim no extra whitespace.
- Write strictly: always use CRLF per spec.

Security
- Avoid buffer overruns by validating line length and field count.
- Reject control characters outside CR/LF in non-escaped fields; sanitize input.

## Reference Details
1. MIME Type Registration Syntax
Content-Type: text/csv[; charset=<IANA-text-charset>][; header={present|absent}]

2. ABNF Grammar Full Definition (same as Detailed Digest section).

3. Example HTTP Response with CSV
HTTP/1.1 200 OK
Content-Type: text/csv; charset=UTF-8; header=present

name,age,city␍␊
"Doe, John",29,"New York, NY"␍␊

4. Node.js CSV Parser Function
Signature: parseCsv(data: string, delimiter: string = ',', quote: string = '"'): string[][]
Return: two-dimensional array of fields
Throws: Error("Unbalanced quotes at position X")
Implementation:
    function parseCsv(data, delimiter = ',', quote = '"') {
      const records = [];
      let field = '';
      let record = [];
      let inQuotes = false;
      for (let i = 0; i < data.length; i++) {
        const char = data[i];
        const next = data[i+1];
        if (char === quote) {
          if (inQuotes && next === quote) { field += quote; i++; }
          else { inQuotes = !inQuotes; }
        } else if (!inQuotes && char === delimiter) {
          record.push(field); field = '';
        } else if (!inQuotes && char === '\r' && next === '\n') {
          record.push(field); records.push(record); record = []; field = ''; i++;
        } else {
          field += char;
        }
      }
      if (inQuotes) throw new Error(`Unbalanced quotes at position ${data.lastIndexOf(quote)}`);
      if (field !== '' || record.length) record.push(field);
      if (record.length) records.push(record);
      return records;
    }

5. Best Practice Code Snippet (Python)
    import csv
    with open('data.csv', newline='', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"')
        for row in reader:
            process(row)

6. Troubleshooting
a. Unbalanced quotes error:
   Command: node -e "console.log(require('./parser').parseCsv(fs.readFileSync('bad.csv','utf8')));"
   Expected: Error: Unbalanced quotes at position 12
b. Field count mismatch:
   Detect if record.length !== headerLength; Command: grep -n ',' data.csv
c. CRLF vs LF issues:
   Verify line endings: dos2unix -ic data.csv

## Information Dense Extract
Records: lines delimited CRLF; final CRLF optional. Header: optional first line, header={present|absent}, field count consistency. Fields: comma separated, spaces kept. Quoting: enclose with DQUOTE if containing CR, LF, comma or DQUOTE; escape internal DQUOTE by doubling. ABNF: see grammar. MIME: text/csv; charset=<IANA-text>; header=<present|absent>. File extension .csv. Parser parseCsv(data:string,delimiter=',',quote='"'):string[][]. Throws on unbalanced quotes. Generation: escape DQUOTE, join by comma, append CRLF. HTTP example: Content-Type: text/csv; charset=UTF-8; header=present. Troubleshoot: dos2unix, record count validation, balanced-quote errors.

## Sanitised Extract
Table of Contents
1. Record Delimitation
2. Final Record Handling
3. Header Line
4. Field Separation and Spacing
5. Quoted Fields
6. Embedded Quotes Escaping
7. ABNF Grammar
8. MIME Registration Parameters

1. Record Delimitation
   Uses CRLF ('x0D'x0A) as line terminator.

2. Final Record Handling
   Last line may lack CRLF.

3. Header Line
   Optional first line; same comma-separated format; field count equal to records; controlled by header parameter = present|absent.

4. Field Separation and Spacing
   Fields split on commas; spaces are part of field data; no trailing comma after last field.

5. Quoted Fields
   Enclose field in DQUOTE when containing CRLF, comma, or DQUOTE.
   Example: 'a, b' + CRLF inside field.

6. Embedded Quotes Escaping
   Represent a literal quote inside a quoted field by doubling: ''.

7. ABNF Grammar
   file = [header CRLF] record *(CRLF record) [CRLF]
   field = escaped / non-escaped
   escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
   non-escaped = *TEXTDATA
   COMMA=%x2C  CR=%x0D  LF=%x0A  DQUOTE=%x22  TEXTDATA=%x20-21/%x23-2B/%x2D-7E

8. MIME Registration Parameters
   text/csv; charset={US-ASCII|...}; header={present|absent}

## Original Source
Data Serialization Formats (JSON, NDJSON, CSV)
https://datatracker.ietf.org/doc/html/rfc4180

## Digest of CSV_FORMAT

# Definition of the CSV Format

1. Each record is on a separate line terminated by CRLF (0x0D 0x0A).
   Example: `aaa,bbb,ccc␍␊`  
            `zzz,yyy,xxx␍␊`

2. Final record may lack terminating CRLF.
   Example: `zzz,yyy,xxx`

3. Optional header line with same comma-separated field count as data records. Use MIME parameter header=(present|absent).
   Example: `field1,field2,field3␍␊`

4. Fields are comma-separated; lines must contain uniform field counts; spaces are significant; no trailing comma on last field.
   Example: `aaa, bbb ,ccc`

5. Fields containing CRLF, commas, or DQUOTE must be enclosed in DQUOTE (0x22).
   Example: `"aaa","b ␍␊ bb","ccc"␍␊`

6. To embed a DQUOTE within a quoted field, double it: `"b""bb"`.

# ABNF Grammar (RFC2234)

```
file       = [ header CRLF ] record *( CRLF record ) [ CRLF ]
header     = name *( COMMA name )
record     = field *( COMMA field )
name       = field
field      = ( escaped / non-escaped )
escaped    = DQUOTE *( TEXTDATA / COMMA / CR / LF / 2DQUOTE ) DQUOTE
non-escaped= *TEXTDATA
COMMA      = %x2C
CR         = %x0D
LF         = %x0A
CRLF       = CR LF
DQUOTE     = %x22
2DQUOTE    = 2 DQUOTE
TEXTDATA   = %x20-21 / %x23-2B / %x2D-7E
``` 

# MIME Type Registration of text/csv

- Type name: text
- Subtype: csv
- Required parameters: none
- Optional parameters:
  • charset = IANA text character set (default US-ASCII)
  • header = present | absent (indicates header line presence)
- Encoding: use CRLF for line breaks (implementations may accept other eol)
- File extension: .csv
- No magic number

# IANA Considerations

IANA has registered text/csv per above parameters.

## Attribution
- Source: Data Serialization Formats (JSON, NDJSON, CSV)
- URL: https://datatracker.ietf.org/doc/html/rfc4180
- License: License: IETF (public domain) / CC0
- Crawl Date: 2025-05-10T08:02:02.188Z
- Data Size: 3997195 bytes
- Links Found: 8188

## Retrieved
2025-05-10
