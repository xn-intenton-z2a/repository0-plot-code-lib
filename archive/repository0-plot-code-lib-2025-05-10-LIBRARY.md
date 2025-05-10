library/PERF_HOOKS.md
# library/PERF_HOOKS.md
# PERF_HOOKS

## Crawl Summary
perf_hooks.performance object methods: clearMarks(name?), clearMeasures(name?), clearResourceTimings(name?), eventLoopUtilization(prev?,base?) returns {idle,active,utilization}, getEntries(), getEntriesByName(name,type?), getEntriesByType(type), mark(name,options?), markResourceTiming(timingInfo,requestedUrl,initiatorType,globalObj,cacheMode,bodyInfo,responseStatus,deliveryType?), measure(name,startOrOptions?,endMark?), nodeTiming property, now() returns high-res timestamp, setResourceTimingBufferSize(maxSize default=250), timeOrigin property, timerify(fn,options?), toJSON(). Event: 'resourcetimingbufferfull'. Classes: PerformanceEntry, PerformanceMark(detail), PerformanceMeasure(detail), PerformanceNodeEntry(detail flags kind), PerformanceNodeTiming(properties bootstrapComplete,environment,idleTime,loopStart,loopExit,nodeStart,uvMetricsInfo, v8Start), PerformanceResourceTiming(network timing properties), PerformanceObserver(supportedEntryTypes,constructor, observe,disconnect,takeRecords), PerformanceObserverEntryList(getEntries,getEntriesByName,getEntriesByType), Histogram(count,countBigInt,exceeds,exceedsBigInt,max,maxBigInt,mean,min,minBigInt,stddev,percentile,percentileBigInt,percentiles,percentilesBigInt,reset), IntervalHistogram(enable,disable,clone), RecordableHistogram(add,record,recordDelta).

## Normalised Extract
Table of Contents
1. Performance Object Methods
2. PerformanceEntry and Subclasses
3. PerformanceNodeTiming Properties
4. PerformanceResourceTiming Properties
5. PerformanceObserver Patterns
6. Histograms

1. Performance Object Methods
performance.clearMarks(name?: string) : void
performance.clearMeasures(name?: string) : void
performance.clearResourceTimings(name?: string) : void
performance.eventLoopUtilization(prev?: Object, base?: Object) : {idle: number, active: number, utilization: number}
performance.getEntries() : PerformanceEntry[]
performance.getEntriesByName(name: string, type?: string) : PerformanceEntry[]
performance.getEntriesByType(type: string) : PerformanceEntry[]
performance.mark(name: string, options?: {detail?: any, startTime?: number}) : void
performance.markResourceTiming(timingInfo: Object, requestedUrl: string, initiatorType: string, global: Object, cacheMode: string, bodyInfo: Object, responseStatus: number, deliveryType?: string) : void
performance.measure(name: string, startOrOptions?: string|{start?: number|string,end?: number|string,detail?: any,duration?: number}, endMark?: string) : void
performance.nodeTiming : PerformanceNodeTiming
performance.now() : number
performance.setResourceTimingBufferSize(maxSize: number) : void
performance.timeOrigin : number
performance.timerify(fn: Function, options?: {histogram: RecordableHistogram}) : Function
performance.toJSON() : Object
Event: 'resourcetimingbufferfull'

2. PerformanceEntry and Subclasses
PerformanceEntry properties: name: string, entryType: string, startTime: number, duration: number
PerformanceMark extends PerformanceEntry: detail: any
PerformanceMeasure extends PerformanceEntry: detail: any
PerformanceNodeEntry extends PerformanceEntry: detail: any

3. PerformanceNodeTiming Properties
bootstrapComplete: number
environment: number
idleTime: number
loopStart: number
loopExit: number
nodeStart: number
uvMetricsInfo: {loopCount:number, events:number, eventsWaiting:number}
v8Start: number

4. PerformanceResourceTiming Properties
workerStart, redirectStart, redirectEnd, fetchStart, domainLookupStart, domainLookupEnd, connectStart, connectEnd, secureConnectionStart, requestStart, responseEnd: number
transferSize: number, encodedBodySize: number, decodedBodySize: number
method toJSON() : Object

5. PerformanceObserver Patterns
supportedEntryTypes: string[]
new PerformanceObserver(callback(list: PerformanceObserverEntryList, observer: PerformanceObserver))
.observe({entryTypes?:string[], type?:string, buffered?:boolean}) : void
.disconnect() : void
.takeRecords() : PerformanceEntry[]

PerformanceObserverEntryList methods
.getEntries() : PerformanceEntry[]
.getEntriesByName(name: string, type?: string) : PerformanceEntry[]
.getEntriesByType(type: string) : PerformanceEntry[]

6. Histograms
perf_hooks.createHistogram(options?:{maxTrackableValue?: number, significantDigits?: number}) : Histogram
perf_hooks.monitorEventLoopDelay(options?:{resolution?: number}) : Histogram
Histogram APIs: count(): number, countBigInt(): bigint, exceeds(threshold: number): number, exceedsBigInt(threshold: bigint): bigint, max(): number, maxBigInt(): bigint, mean(): number, min(): number, minBigInt(): bigint, stddev(): number, percentile(p: number): number, percentileBigInt(p: bigint): bigint, percentiles: Record<string, number>, percentilesBigInt: Record<string, bigint>, reset(): void
IntervalHistogram: enable(): void, disable(): void, clone(): IntervalHistogram
RecordableHistogram: add(other: Histogram): void, record(value: number): void, recordDelta(): void

## Supplementary Details
Parameters and Defaults
- clearMarks, clearMeasures, clearResourceTimings: name default undefined => clears all
- eventLoopUtilization: no args => returns cumulative; one arg => delta from prev; two args => delta between both
- mark options.startTime default performance.now(); options.detail default undefined
- markResourceTiming cacheMode must be '' or 'local'; deliveryType default ''
- setResourceTimingBufferSize: maxSize default 250
- timerify options.histogram: RecordableHistogram instance or omitted

Usage Steps
1. import {performance, PerformanceObserver} from 'node:perf_hooks'
2. Create observer: const obs=new PerformanceObserver((list,obs)=>{ /* handle */ });
3. obs.observe({entryTypes:['measure'], buffered:true});
4. performance.mark('start'); // optional detail: performance.mark('start',{detail:{user:'A'}})
5. // code to measure
6. performance.measure('start-to-end','start');
7. obs.disconnect(); performance.clearMarks(); performance.clearMeasures();

Histogram Monitoring
1. const h=perf_hooks.monitorEventLoopDelay({resolution:10});
2. h.enable();
3. // workload
4. h.disable(); console.log(h.percentile(50), h.mean());


## Reference Details
// ESM Example
import { performance, PerformanceObserver } from 'node:perf_hooks';

// Observe measures
const obs = new PerformanceObserver((list,observer) => {
  list.getEntries().forEach(entry => {
    console.log(`[Measure] ${entry.name}: ${entry.duration.toFixed(2)} ms`);
  });
  observer.disconnect();
});
obs.observe({ entryTypes: ['measure'], buffered: true });

// Mark and measure
performance.mark('A');
setTimeout(() => {
  performance.mark('B', { detail: { phase: 'afterTimeout' } });
  performance.measure('A-to-B', 'A', 'B');
}, 100);

// CommonJS example
const { performance, PerformanceObserver } = require('node:perf_hooks');

// eventLoopUtilization pattern
const elu1 = performance.eventLoopUtilization();
setImmediate(() => {
  const { utilization } = performance.eventLoopUtilization(elu1);
  console.log('ELU delta:', utilization);
});

// Histogram example
const { createHistogram } = require('perf_hooks');
const hist = createHistogram({ maxTrackableValue: 10000000, significantDigits: 3 });
hist.record(5);
hist.record(15);
console.log(hist.mean(), hist.percentile(90));

// ResourceTiming buffer full handling
performance.setResourceTimingBufferSize(1000);
performance.on('resourcetimingbufferfull', () => {
  console.warn('Buffer full, clearing.');
  performance.clearResourceTimings();
});

// Troubleshooting
// If no entries appear, ensure observer.observe called before marks/measures.
// Use performance.toJSON() to inspect all timings: console.log(JSON.stringify(performance.toJSON()))


## Information Dense Extract
performance.clearMarks(name?):void; clearMeasures(name?):void; clearResourceTimings(name?):void; eventLoopUtilization(prev?,base?):{idle,active,utilization}; getEntries():PerformanceEntry[]; getEntriesByName(name,type?):PerformanceEntry[]; getEntriesByType(type):PerformanceEntry[]; mark(name,options{detail?,startTime?}):void; markResourceTiming(timingInfo,requestedUrl,initiatorType,globalObj,cacheMode,bodyInfo,responseStatus,deliveryType?):void; measure(name,startOrOptions{start?,end?,detail?,duration?},endMark?):void; nodeTiming:PerformanceNodeTiming; now():number; setResourceTimingBufferSize(maxSize=250):void; timeOrigin:number; timerify(fn,options{histogram?}):Function; toJSON():Object; Event 'resourcetimingbufferfull'; Classes: PerformanceEntry(name,entryType,startTime,duration); PerformanceMark(detail); PerformanceMeasure(detail); PerformanceNodeEntry(detail); PerformanceNodeTiming(bootstrapComplete,environment,loopStart,loopExit,idleTime,nodeStart,uvMetricsInfo{loopCount,events,eventsWaiting},v8Start); PerformanceResourceTiming(workerStart,redirectStart,redirectEnd,fetchStart,domainLookupStart,domainLookupEnd,connectStart,connectEnd,secureConnectionStart,requestStart,responseEnd,transferSize,encodedBodySize,decodedBodySize,toJSON()); PerformanceObserver.supportedEntryTypes:string[]; new PerformanceObserver(callback); observe(options{entryTypes?,type?,buffered?}); disconnect():void; takeRecords():PerformanceEntry[]; EntryList.getEntries(); getEntriesByName(name,type?); getEntriesByType(type); Histograms: count(),countBigInt(),exceeds(),exceedsBigInt(),max(),maxBigInt(),mean(),min(),minBigInt(),stddev(),percentile(p),percentileBigInt(p),percentiles,percentilesBigInt,reset(); IntervalHistogram.enable(),disable(),clone(); RecordableHistogram.add(),record(),recordDelta();

## Sanitised Extract
Table of Contents
1. Performance Object Methods
2. PerformanceEntry and Subclasses
3. PerformanceNodeTiming Properties
4. PerformanceResourceTiming Properties
5. PerformanceObserver Patterns
6. Histograms

1. Performance Object Methods
performance.clearMarks(name?: string) : void
performance.clearMeasures(name?: string) : void
performance.clearResourceTimings(name?: string) : void
performance.eventLoopUtilization(prev?: Object, base?: Object) : {idle: number, active: number, utilization: number}
performance.getEntries() : PerformanceEntry[]
performance.getEntriesByName(name: string, type?: string) : PerformanceEntry[]
performance.getEntriesByType(type: string) : PerformanceEntry[]
performance.mark(name: string, options?: {detail?: any, startTime?: number}) : void
performance.markResourceTiming(timingInfo: Object, requestedUrl: string, initiatorType: string, global: Object, cacheMode: string, bodyInfo: Object, responseStatus: number, deliveryType?: string) : void
performance.measure(name: string, startOrOptions?: string|{start?: number|string,end?: number|string,detail?: any,duration?: number}, endMark?: string) : void
performance.nodeTiming : PerformanceNodeTiming
performance.now() : number
performance.setResourceTimingBufferSize(maxSize: number) : void
performance.timeOrigin : number
performance.timerify(fn: Function, options?: {histogram: RecordableHistogram}) : Function
performance.toJSON() : Object
Event: 'resourcetimingbufferfull'

2. PerformanceEntry and Subclasses
PerformanceEntry properties: name: string, entryType: string, startTime: number, duration: number
PerformanceMark extends PerformanceEntry: detail: any
PerformanceMeasure extends PerformanceEntry: detail: any
PerformanceNodeEntry extends PerformanceEntry: detail: any

3. PerformanceNodeTiming Properties
bootstrapComplete: number
environment: number
idleTime: number
loopStart: number
loopExit: number
nodeStart: number
uvMetricsInfo: {loopCount:number, events:number, eventsWaiting:number}
v8Start: number

4. PerformanceResourceTiming Properties
workerStart, redirectStart, redirectEnd, fetchStart, domainLookupStart, domainLookupEnd, connectStart, connectEnd, secureConnectionStart, requestStart, responseEnd: number
transferSize: number, encodedBodySize: number, decodedBodySize: number
method toJSON() : Object

5. PerformanceObserver Patterns
supportedEntryTypes: string[]
new PerformanceObserver(callback(list: PerformanceObserverEntryList, observer: PerformanceObserver))
.observe({entryTypes?:string[], type?:string, buffered?:boolean}) : void
.disconnect() : void
.takeRecords() : PerformanceEntry[]

PerformanceObserverEntryList methods
.getEntries() : PerformanceEntry[]
.getEntriesByName(name: string, type?: string) : PerformanceEntry[]
.getEntriesByType(type: string) : PerformanceEntry[]

6. Histograms
perf_hooks.createHistogram(options?:{maxTrackableValue?: number, significantDigits?: number}) : Histogram
perf_hooks.monitorEventLoopDelay(options?:{resolution?: number}) : Histogram
Histogram APIs: count(): number, countBigInt(): bigint, exceeds(threshold: number): number, exceedsBigInt(threshold: bigint): bigint, max(): number, maxBigInt(): bigint, mean(): number, min(): number, minBigInt(): bigint, stddev(): number, percentile(p: number): number, percentileBigInt(p: bigint): bigint, percentiles: Record<string, number>, percentilesBigInt: Record<string, bigint>, reset(): void
IntervalHistogram: enable(): void, disable(): void, clone(): IntervalHistogram
RecordableHistogram: add(other: Histogram): void, record(value: number): void, recordDelta(): void

## Original Source
Node.js Core I/O, Streams, Stream Promises, and Performance Hooks Documentation
https://nodejs.org/api/perf_hooks.html

## Digest of PERF_HOOKS

# perf_hooks.performance

An object to collect performance metrics from the current Node.js instance. Similar to window.performance.

## Methods

### performance.clearMarks([name])
Signature: performance.clearMarks(name?: string): void
- name: string (optional). If omitted removes all PerformanceMark entries; if provided removes only that mark.
- Requires: Receiver is performance.
- Added: v8.5.0; must use correct receiver as of v19.0.0.

### performance.clearMeasures([name])
Signature: performance.clearMeasures(name?: string): void
- name: string (optional). Clears all measures or named measure.
- Added: v16.7.0; receiver enforced in v19.0.0.

### performance.clearResourceTimings([name])
Signature: performance.clearResourceTimings(name?: string): void
- name: string (optional). Clears all or named resource timings.
- Added: v18.2.0, v16.17.0; enforced receiver v19.0.0.

### performance.eventLoopUtilization([prevUtil[, prevPrevUtil]])
Signature: performance.eventLoopUtilization(prev?: Object, base?: Object): { idle: number; active: number; utilization: number }
- Returns cumulative idle and active event loop durations in high-res ms, plus utilization ratio.
- Arguments: two optional results from prior calls to compute deltas.
- Added: v14.10.0, v12.19.0.

### performance.getEntries(): PerformanceEntry[]
Chronological list of all entries.
- Added: v16.7.0; enforced receiver v19.0.0.

### performance.getEntriesByName(name: string[, type: string]): PerformanceEntry[]
### performance.getEntriesByType(type: string): PerformanceEntry[]

### performance.mark(name: string[, options])
Signature: performance.mark(name: string, options?: { detail?: any; startTime?: number }): void
- Creates a PerformanceMark (entryType 'mark', duration 0). Options.detail attaches data.
- Added: v8.5.0; name required v19.0.0.

### performance.markResourceTiming(timingInfo: object, requestedUrl: string, initiatorType: string, global: object, cacheMode: string, bodyInfo: object, responseStatus: number[, deliveryType: string]): void
- Creates a PerformanceResourceTiming entry in Resource Timeline.
- cacheMode: '' or 'local'; deliveryType defaults to ''.
- Added: v18.2.0, v16.17.0.

### performance.measure(name: string[, startOrOptions[, endMark]]): void
- Creates a PerformanceMeasure (entryType 'measure', duration = end - start).
- startOrOptions: string or { start?: number|string; end?: number|string; detail?: any; duration?: number }.
- Throws if named start or end mark not found.
- Added: v8.5.0; optional parameters since v13.13.0.

### performance.nodeTiming: PerformanceNodeTiming
- Provides Node.js operational milestones timing.
- Added: v8.5.0.

### performance.now(): number
- High resolution millisecond timestamp since process start.
- Added: v8.5.0; enforced receiver v19.0.0.

### performance.setResourceTimingBufferSize(maxSize: number): void
- Set global resource timing buffer size (default 250).
- Added: v18.8.0; enforced receiver v19.0.0.

### performance.timeOrigin: number
- High-res ms timestamp when current node process began (Unix time).
- Added: v8.5.0.

### performance.timerify(fn: Function[, options]): Function
- Wraps fn to measure its execution time. Options.histogram: RecordableHistogram to record durations.
- Requires PerformanceObserver subscribed to 'function'.
- Added: v8.5.0; async support v16.0.0.

### performance.toJSON(): object
- JSON representation of performance object.
- Added: v16.1.0; enforced receiver v19.0.0.

### Event: 'resourcetimingbufferfull'
- Emitted when resource timing buffer full. Use performance.setResourceTimingBufferSize() or clearResourceTimings().
- Added: v18.8.0.

# Classes

## PerformanceEntry
Properties:
- duration: number
- entryType: string
- name: string
- startTime: number

## PerformanceMark extends PerformanceEntry
- detail: any

## PerformanceMeasure extends PerformanceEntry
- detail: any

## PerformanceNodeEntry extends PerformanceEntry
- detail: any
- flags, kind (deprecated; use detail)
- detail structure varies by entryType ('gc','http','http2','function','net','dns')

## PerformanceNodeTiming
Properties:
- bootstrapComplete, environment, idleTime, loopExit, loopStart, nodeStart, uvMetricsInfo: object (loopCount, events, eventsWaiting), v8Start: number

## PerformanceResourceTiming extends PerformanceEntry
Properties: workerStart, redirectStart, redirectEnd, fetchStart, domainLookupStart, domainLookupEnd, connectStart, connectEnd, secureConnectionStart, requestStart, responseEnd, transferSize, encodedBodySize, decodedBodySize; toJSON(): object

## PerformanceObserver
Static: supportedEntryTypes: string[]
Constructor: new PerformanceObserver(callback:(list: PerformanceObserverEntryList, observer: PerformanceObserver) => void)
Methods: observe(options:{entryTypes?: string[]; type?: string; buffered?: boolean}), disconnect(): void, takeRecords(): PerformanceEntry[]

## PerformanceObserverEntryList
Methods: getEntries(): PerformanceEntry[], getEntriesByName(name: string[, type: string]): PerformanceEntry[], getEntriesByType(type: string): PerformanceEntry[]

## Histogram
Methods: count(): number; countBigInt(): bigint; exceeds(threshold: number): number; exceedsBigInt(threshold: bigint): bigint; max(): number; maxBigInt(): bigint; mean(): number; min(): number; minBigInt(): bigint; stddev(): number; percentile(p: number): number; percentileBigInt(p: bigint): bigint; percentiles: { [p: string]: number }; percentilesBigInt: { [p: string]: bigint }; reset(): void

## IntervalHistogram extends Histogram
Methods: enable(): void; disable(): void; clone(): IntervalHistogram

## RecordableHistogram extends Histogram
Methods: add(other: Histogram): void; record(value: number): void; recordDelta(): void


## Attribution
- Source: Node.js Core I/O, Streams, Stream Promises, and Performance Hooks Documentation
- URL: https://nodejs.org/api/perf_hooks.html
- License: License: Node.js (MIT-like terms)
- Crawl Date: 2025-05-09T23:10:33.058Z
- Data Size: 4140902 bytes
- Links Found: 3241

## Retrieved
2025-05-09
library/ZOD.md
# library/ZOD.md
# ZOD

## Crawl Summary
z.string(), z.number(), z.boolean(), z.date(), z.array(), z.object(), z.tuple(), z.union(), z.intersection(), z.record(), z.lazy(), z.literal() produce typed schemas. Constraint methods: min, max, length, email, url, uuid, cuid, datetime, int, positive, negative. Composite builders: object().strict(), partial(), passthrough(), merge(); array().min(), max(), length(); tuple(), enum(), nativeEnum(). parse/parseAsync throw ZodError. safeParse/safeParseAsync return success flag and data or error. ZodError.issues contain path, code, message. setErrorMap customizes messages. zodResolver integrates with RHF.

## Normalised Extract
Table of Contents:
1 Schema Creation
2 Primitive Constraints
3 Composite Types
4 Refinement & Transformation
5 Parsing Methods
6 Error Handling
7 Type Inference
8 Custom Error Maps

1 Schema Creation
Use z.object, z.string, z.number, z.array, z.tuple, z.union to build schemas.
Example: const User = z.object({ id: z.number().int(), name: z.string().min(1) });

2 Primitive Constraints
z.string().min(5,'Min 5 chars').max(20)
z.number().min(0).max(100).int().positive()

3 Composite Types
z.array(z.string()).min(1)
z.tuple([z.string(), z.number()])
z.union([z.string(), z.number()])

4 Refinement & Transformation
z.string().refine(val=>val.startsWith('A'),{message:'Starts with A'})
z.number().transform(val=>val*100)

5 Parsing Methods
parse(data) throws ZodError or returns T
safeParse(data) returns {success, data?, error?}
parseAsync(data) returns Promise<T>
safeParseAsync(data) returns Promise<{success, data?, error?}>

6 Error Handling
Error.issues: array of {path, code, message, expected?, received?}
Use error.format() for nested structure

7 Type Inference
type UserType = z.infer<typeof User>

8 Custom Error Maps
z.setErrorMap((issue,ctx)=>({ message:ctx.defaultError.replace('Expected','Missing') }))

## Supplementary Details
Import & Setup
import { z, ZodError, setErrorMap } from 'zod'

Configuration Options
Default error messages per ZodIssueCode:
invalid_type: "Expected {expected}, received {received}"
custom: uses provided message
unrecognized_keys: "Unrecognized key(s) in object: {keys}"

setErrorMap Signature
(issue: ZodIssue, ctx: { defaultError: string }) => { message: string }
Example:
setErrorMap((issue,ctx)=>{
  if(issue.code==='invalid_type'&&issue.expected==='string'){
    return { message:'Must be text' }
  }
  return { message:ctx.defaultError }
})

Integration Patterns
React Hook Form: use zodResolver(schema)
Next.js API Routes: parse request body with await schema.parseAsync(req.body)

Async Refinements
z.string().refine(async val=>await checkRemote(val),{message:'Invalid'})
Requires parseAsync or safeParseAsync


## Reference Details
Schema Builders:
z.string(): ZodString
z.number(): ZodNumber
z.boolean(): ZodBoolean
z.date(): ZodDate
z.array<T extends ZodTypeAny>(schema: T): ZodArray<T>
z.object<Shape extends ZodRawShape>(shape: Shape, params?): ZodObject<Shape>
z.tuple<T extends [ZodTypeAny,...ZodTypeAny[]]>(schemas: T): ZodTuple<T>
z.union<T extends [ZodTypeAny,...ZodTypeAny[]]>(schemas: [...T]): ZodUnion<T>
z.intersection<A extends ZodTypeAny, B extends ZodTypeAny>(a: A, b: B): ZodIntersection<A,B>
z.record<Key extends ZodTypeAny,Val extends ZodTypeAny>(keySchema: Key, valueSchema: Val)
z.literal<T extends string|number|boolean>(value: T): ZodLiteral<T>
z.enum<Variants extends [string,...string[]]>(values: Variants): ZodEnum<Variants>
z.nativeEnum<E>(enumObj: E): ZodNativeEnum<E>
z.lazy<T extends ZodTypeAny>(getter: ()=>T): ZodLazy<T>

Constraint Methods:
ZodString.min(len: number, message?: string): ZodString
ZodString.max(len: number, message?: string): ZodString
... etc per documentation above

Parsing Methods:
parse<T>(data: unknown): T throws ZodError
safeParse<T>(data: unknown): { success: true; data: T } | { success: false; error: ZodError }
parseAsync<T>(data: unknown): Promise<T>
safeParseAsync<T>(data: unknown): Promise<{ success: true; data: T } | { success: false; error: ZodError }>

ZodError:
class ZodError<T> extends Error {
  issues: ZodIssue[]
  constructor(issues: ZodIssue[])
  format(): ZodFormattedError<T>
}

Example Code:
const UserSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  profile: z.object({
    displayName: z.string().min(3)
  }).partial()
}).strict()

type User = z.infer<typeof UserSchema>

async function validate(input: unknown): Promise<User> {
  const result = await UserSchema.safeParseAsync(input)
  if (!result.success) {
    console.error(result.error.format())
    throw result.error
  }
  return result.data
}

Configuration Options with Effects:
.strict(): strips no keys, throws on extra
.passthrough(): keeps extra keys
.strip(): removes extra keys (default)

Best Practices:
Always use safeParse in user-facing code to avoid uncaught exceptions
Use .strict() on API inputs to reject unexpected data
Define schemas at module scope for reuse and type inference

Troubleshooting:
Invalid type error shows expected and received in ZodError.issues
To debug nested errors, use error.format() or error.issues to log paths
For async refinements, ensure parseAsync is used or Promise rejection occurs


## Information Dense Extract
z.* schema builders for primitives and composites; constraint methods min,max,length,email,url,int,positive,etc; parse/safeParse(+Async) methods; ZodError.issues: path,code,message; setErrorMap customizes messages; type inference via z.infer; use .strict/.passthrough/.partial for object shapes; array.min/max; tuple,union,intersection,record,literal,enum,nativeEnum,lazy; best practice: safeParse + strict for APIs.

## Sanitised Extract
Table of Contents:
1 Schema Creation
2 Primitive Constraints
3 Composite Types
4 Refinement & Transformation
5 Parsing Methods
6 Error Handling
7 Type Inference
8 Custom Error Maps

1 Schema Creation
Use z.object, z.string, z.number, z.array, z.tuple, z.union to build schemas.
Example: const User = z.object({ id: z.number().int(), name: z.string().min(1) });

2 Primitive Constraints
z.string().min(5,'Min 5 chars').max(20)
z.number().min(0).max(100).int().positive()

3 Composite Types
z.array(z.string()).min(1)
z.tuple([z.string(), z.number()])
z.union([z.string(), z.number()])

4 Refinement & Transformation
z.string().refine(val=>val.startsWith('A'),{message:'Starts with A'})
z.number().transform(val=>val*100)

5 Parsing Methods
parse(data) throws ZodError or returns T
safeParse(data) returns {success, data?, error?}
parseAsync(data) returns Promise<T>
safeParseAsync(data) returns Promise<{success, data?, error?}>

6 Error Handling
Error.issues: array of {path, code, message, expected?, received?}
Use error.format() for nested structure

7 Type Inference
type UserType = z.infer<typeof User>

8 Custom Error Maps
z.setErrorMap((issue,ctx)=>({ message:ctx.defaultError.replace('Expected','Missing') }))

## Original Source
Zod Official Documentation
https://zod.dev

## Digest of ZOD

# Zod Official Documentation (retrieved 2024-06-21)

# Schema Types

## ZodString
Signature: `new ZodString(def?: ZodTypeDef)`
Methods:
- `min(minLength: number, message?: string): ZodString`
- `max(maxLength: number, message?: string): ZodString`
- `length(exact: number, message?: string): ZodString`
- `email(message?: string): ZodString`
- `url(message?: string): ZodString`
- `uuid(message?: string): ZodString`
- `cuid(message?: string): ZodString`
- `datetime(options?: { offset?: boolean|number; message?: string }): ZodString`

## ZodNumber
Signature: `new ZodNumber(def?: ZodTypeDef)`
Methods:
- `min(value: number, message?: string): ZodNumber`
- `max(value: number, message?: string): ZodNumber`
- `int(message?: string): ZodNumber`
- `positive(message?: string): ZodNumber`
- `nonnegative(message?: string): ZodNumber`
- `negative(message?: string): ZodNumber`
- `nonpositive(message?: string): ZodNumber`

## ZodObject
Signature: `new ZodObject<Shape extends ZodRawShape, UnknownKeys extends UnknownKeysParam = 'strip', Catchall extends ZodTypeAny = ZodNever>(def?: ZodObjectDef<Shape,UnknownKeys,Catchall>)`
Methods:
- `merge<Other extends ZodRawShape>(other: ZodObject<Other,UnknownKeysParam,ZodTypeAny>): ZodObject<Shape&Other,UnknownKeysParam,ZodTypeAny>`
- `partial(): ZodObject<{ [K in keyof Shape]?: Shape[K] }, UnknownKeysParam, Catchall>`
- `strict(): ZodObject<Shape,'strict',Catchall>`
- `passthrough(): ZodObject<Shape,'passthrough',Catchall>`

## Parsing Methods
- `parse(data: unknown): Type` throws ZodError on failure
- `safeParse(data: unknown): { success: true; data: Type } | { success: false; error: ZodError }`
- `parseAsync(data: unknown): Promise<Type>`
- `safeParseAsync(data: unknown): Promise<{ success: true; data: Type } | { success: false; error: ZodError }>`

## Error Handling
ZodError extends Error
Properties:
- `issues: ZodIssue[]` where ZodIssue includes `path: (string|number)[]`, `code: ZodIssueCode`, `message: string`, `expected?: string`, `received?: string`
Methods:
- `format(): ZodFormattedError<T>`

## Customization
- `setErrorMap((issue: ZodIssue, ctx: { defaultError: string }) => { message: string })`
- `zodResolver(schema: ZodTypeAny) for React Hook Form`

---
Attribution: Zod Official Documentation
Data Size: 0 bytes


## Attribution
- Source: Zod Official Documentation
- URL: https://zod.dev
- License: License: MIT
- Crawl Date: 2025-05-10T00:03:01.764Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
