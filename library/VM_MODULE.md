# VM_MODULE

## Crawl Summary
node:vm allows compiling and executing JS in isolated V8 contexts. Use vm.createContext(obj, options) to contextify an object; vm.Script(code, options) to compile code; script.runInContext/useNewContext/useThisContext with options: displayErrors, timeout, breakOnSigint, microtaskMode; vm.compileFunction(code, params, options) to compile into callable Function; vm.constants for loader flags; vm.measureMemory(options) returns Promise of memory stats; experimental modules: vm.SourceTextModule and vm.SyntheticModule with link(), evaluate(), setExport().

## Normalised Extract
Table of Contents
1 Context Creation
2 Script Compilation
3 Script Execution Methods
4 Function Compilation
5 Memory Measurement

1 Context Creation
Signature: vm.createContext(contextObject[, options]) → contextified Object
Parameters:
  contextObject: Object | vm.constants.DONT_CONTEXTIFY | undefined
  options:
    name: string (default 'VM Context i')
    origin: string (default '')
    codeGeneration:
      strings: boolean (default true)
      wasm: boolean (default true)
    microtaskMode: 'afterEvaluate'
    importModuleDynamically: Function | vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER
Returns:
  The contextified global object for vm.runInContext and modules.

2 Script Compilation
Signature: new vm.Script(code[, options]) → vm.Script
Parameters:
  code: string source
  options:
    filename: string (default 'evalmachine.<anonymous>')
    lineOffset: number (default 0)
    columnOffset: number (default 0)
    cachedData: Buffer|TypedArray|DataView
    produceCachedData: boolean (default false, deprecated)
    importModuleDynamically: Function|vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER
Methods:
  script.createCachedData() → Buffer
  script.cachedDataRejected: boolean|undefined
  script.sourceMapURL: string|undefined

3 Script Execution Methods
3.1 runInContext
Signature: script.runInContext(contextifiedObject[, options]) → any
Options:
  displayErrors: boolean (default true)
  timeout: positive integer (ms)
  breakOnSigint: boolean (default false)
3.2 runInNewContext
Signature: script.runInNewContext([contextObject[, options]]) → any
ContextObject: Object|vm.constants.DONT_CONTEXTIFY|undefined
Options:
  displayErrors, timeout, breakOnSigint, contextName: string, contextOrigin: string, contextCodeGeneration:{strings:boolean,wasm:boolean}, microtaskMode:'afterEvaluate'
3.3 runInThisContext
Signature: script.runInThisContext([options]) → any
Options: displayErrors, timeout, breakOnSigint

4 Function Compilation
Signature: vm.compileFunction(code[, params[, options]]) → Function
Parameters:
  code: string body
  params: string[] parameter names
  options:
    filename: string (default '')
    lineOffset: number (default 0)
    columnOffset: number (default 0)
    cachedData: Buffer|TypedArray|DataView
    produceCachedData: boolean (default false)
    parsingContext: Object
    contextExtensions: Object[]
    importModuleDynamically: Function|vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER

5 Memory Measurement
Signature: vm.measureMemory([options]) → Promise<{…}>
Options:
  mode: 'summary'|'detailed' (default 'summary')
  execution: 'default'|'eager' (default 'default')
Returns:
  Promise resolving to { total: { jsMemoryEstimate: number, jsMemoryRange: [number, number] }, current?, other? }


## Supplementary Details
vm.constants:
  DONT_CONTEXTIFY: special token for createContext and runInNewContext to skip context quirks.
  USE_MAIN_CONTEXT_DEFAULT_LOADER: use main ESM loader for dynamic import in createContext, Script, compileFunction.

Default Option Values:
  vm.Script: filename='evalmachine.<anonymous>', lineOffset=0, columnOffset=0, produceCachedData=false, displayErrors=true
  runInContext: displayErrors=true, timeout=undefined, breakOnSigint=false
  runInNewContext: contextName='VM Context i', contextOrigin='', contextCodeGeneration.{strings:true,wasm:true}, microtaskMode undefined
  vm.compileFunction: filename='', lineOffset=0, columnOffset=0, produceCachedData=false, contextExtensions=[]
  vm.createContext: name='VM Context i', origin='', codeGeneration.{strings:true,wasm:true}, microtaskMode undefined

Implementation Steps:
1. const ctx = vm.createContext({});
2. const script = new vm.Script(code, options);
3. let result = script.runInContext(ctx, { timeout:1000 });
4. const fn = vm.compileFunction('return a+b;', ['a','b'], { filename:'add.js' });
5. fn(1,2);
6. vm.measureMemory({ mode:'detailed', execution:'eager' }).then(stats => ...);

Module Steps (with --experimental-vm-modules):
1. const m = new vm.SourceTextModule(code, { context: ctx, initializeImportMeta, importModuleDynamically });
2. await m.link(linker);
3. await m.evaluate({ timeout, breakOnSigint });
4. m.namespace to access exports.
5. For synthetic: const sm = new vm.SyntheticModule(['x'], ()=> sm.setExport('x',value), { context:ctx }); await sm.link(()=>sm); await sm.evaluate();


## Reference Details
vm.createContext(contextObject, options)
  contextObject: Object|DONT_CONTEXTIFY|undefined  
  options: { name:string, origin:string, codeGeneration:{ strings:boolean, wasm:boolean }, microtaskMode:string, importModuleDynamically:Function|USE_MAIN_CONTEXT_DEFAULT_LOADER }
  Returns contextified Object.

vm.isContext(object) → boolean

new vm.Script(code, options)
  code: string  
  options: { filename?:string, lineOffset?:number, columnOffset?:number, cachedData?:Buffer|TypedArray|DataView, produceCachedData?:boolean, importModuleDynamically?:Function|USE_MAIN_CONTEXT_DEFAULT_LOADER }
  Returns vm.Script

script.createCachedData() → Buffer
script.cachedDataRejected: boolean|undefined
script.sourceMapURL: string|undefined

script.runInContext(contextifiedObject, options) → any
script.runInNewContext(contextObject, options) → any
script.runInThisContext(options) → any
  options: { displayErrors?:boolean, timeout?:integer, breakOnSigint?:boolean, contextName?:string, contextOrigin?:string, contextCodeGeneration?:{strings:boolean, wasm:boolean}, microtaskMode?:string, importModuleDynamically?:Function|USE_MAIN_CONTEXT_DEFAULT_LOADER, filename?:string, lineOffset?:number, columnOffset?:number }

vm.compileFunction(code, params, options) → Function
  code: string, params: string[], options: { filename?:string, lineOffset?:number, columnOffset?:number, cachedData?:Buffer|TypedArray|DataView, produceCachedData?:boolean, parsingContext?:Object, contextExtensions?:Object[], importModuleDynamically?:Function|USE_MAIN_CONTEXT_DEFAULT_LOADER }

vm.constants: { USE_MAIN_CONTEXT_DEFAULT_LOADER, DONT_CONTEXTIFY }

vm.measureMemory(options) → Promise<Object>
  options: { mode?:'summary'|'detailed', execution?:'default'|'eager' }
  Resolves to memory stats object.

// Example: Running HTTP server in VM
const vm = require('node:vm');
const http = require('http');
const ctx = { require, console };
vm.createContext(ctx, { name:'server', origin:'http://localhost' });
const script = new vm.Script(`
  const server = require('http').createServer((req,res)=>res.end('ok'));
  server.listen(0, ()=> console.log('listening'));
`);
script.runInContext(ctx);

// Troubleshooting:
// If script hangs, set timeout: script.runInContext(ctx, { timeout:100 });
// On SIGINT break: script.runInContext(ctx, { breakOnSigint:true });

// Best Practices:
// Reuse vm.Script instances to avoid recompilation.
// Use cachedData for large scripts to speed up startup.
// For secure globals, use DONT_CONTEXTIFY and freeze objects in host code.


## Information Dense Extract
vm.createContext(ctx[, {name,origin,codeGeneration:{strings,wasm},microtaskMode,importModuleDynamically}])→ctx; vm.isContext(obj); new vm.Script(code[,{filename,lineOffset,columnOffset,cachedData,produceCachedData,importModuleDynamically}])→script; script.factory: createCachedData()->Buffer; cachedDataRejected:boolean; sourceMapURL:string; script.runInContext(ctx[,{displayErrors,timeout,breakOnSigint,importModuleDynamically}])→any; script.runInNewContext([ctx][,options])→any; script.runInThisContext([options])→any; vm.compileFunction(code,params[,{filename,lineOffset,columnOffset,cachedData,produceCachedData,parsingContext,contextExtensions,importModuleDynamically}])→Function; vm.constants.{USE_MAIN_CONTEXT_DEFAULT_LOADER,DONT_CONTEXTIFY}; vm.measureMemory([{mode:'summary'|'detailed',execution:'default'|'eager'}])→Promise<{total, current?, other?}>; Experimental: SourceTextModule(code,[{identifier,cachedData,context,lineOffset,columnOffset,initializeImportMeta,importModuleDynamically}])→mod; mod.link(linker)->Promise; mod.evaluate([options])->Promise; dependencySpecifiers:string[]; error:any; status:string; namespace:Object; SyntheticModule(exportNames,evalCallback,[{identifier,context}])->syn; syn.setExport(name,value).

## Sanitised Extract
Table of Contents
1 Context Creation
2 Script Compilation
3 Script Execution Methods
4 Function Compilation
5 Memory Measurement

1 Context Creation
Signature: vm.createContext(contextObject[, options])  contextified Object
Parameters:
  contextObject: Object | vm.constants.DONT_CONTEXTIFY | undefined
  options:
    name: string (default 'VM Context i')
    origin: string (default '')
    codeGeneration:
      strings: boolean (default true)
      wasm: boolean (default true)
    microtaskMode: 'afterEvaluate'
    importModuleDynamically: Function | vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER
Returns:
  The contextified global object for vm.runInContext and modules.

2 Script Compilation
Signature: new vm.Script(code[, options])  vm.Script
Parameters:
  code: string source
  options:
    filename: string (default 'evalmachine.<anonymous>')
    lineOffset: number (default 0)
    columnOffset: number (default 0)
    cachedData: Buffer|TypedArray|DataView
    produceCachedData: boolean (default false, deprecated)
    importModuleDynamically: Function|vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER
Methods:
  script.createCachedData()  Buffer
  script.cachedDataRejected: boolean|undefined
  script.sourceMapURL: string|undefined

3 Script Execution Methods
3.1 runInContext
Signature: script.runInContext(contextifiedObject[, options])  any
Options:
  displayErrors: boolean (default true)
  timeout: positive integer (ms)
  breakOnSigint: boolean (default false)
3.2 runInNewContext
Signature: script.runInNewContext([contextObject[, options]])  any
ContextObject: Object|vm.constants.DONT_CONTEXTIFY|undefined
Options:
  displayErrors, timeout, breakOnSigint, contextName: string, contextOrigin: string, contextCodeGeneration:{strings:boolean,wasm:boolean}, microtaskMode:'afterEvaluate'
3.3 runInThisContext
Signature: script.runInThisContext([options])  any
Options: displayErrors, timeout, breakOnSigint

4 Function Compilation
Signature: vm.compileFunction(code[, params[, options]])  Function
Parameters:
  code: string body
  params: string[] parameter names
  options:
    filename: string (default '')
    lineOffset: number (default 0)
    columnOffset: number (default 0)
    cachedData: Buffer|TypedArray|DataView
    produceCachedData: boolean (default false)
    parsingContext: Object
    contextExtensions: Object[]
    importModuleDynamically: Function|vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER

5 Memory Measurement
Signature: vm.measureMemory([options])  Promise<{}>
Options:
  mode: 'summary'|'detailed' (default 'summary')
  execution: 'default'|'eager' (default 'default')
Returns:
  Promise resolving to { total: { jsMemoryEstimate: number, jsMemoryRange: [number, number] }, current?, other? }

## Original Source
Node.js VM Module
https://nodejs.org/api/vm.html

## Digest of VM_MODULE

# VM Module

Stability: 2 – Stable
Source: lib/vm.js
Retrieved: 2024-06-10
Data Size: 3 502 189 bytes

The node:vm module enables compiling and running JavaScript within V8 contexts. It is not a security sandbox.

# 1. Creating and Inspecting Contexts

vm.createContext(contextObject[, options]) → Object
• contextObject: Object | vm.constants.DONT_CONTEXTIFY | undefined  
• options: { name: string, origin: string, codeGeneration: { strings: boolean, wasm: boolean }, microtaskMode: 'afterEvaluate', importModuleDynamically: Function|vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER }  
• Returns a contextified global object.  
• Defaults: name='VM Context i', origin='', codeGeneration.strings=true, codeGeneration.wasm=true.  

vm.isContext(object) → boolean
vm.constants.DONT_CONTEXTIFY  
vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER

# 2. Compiling Code: vm.Script

new vm.Script(code[, options]) → vm.Script instance
• code: string  
• options: { filename: string, lineOffset: number, columnOffset: number, cachedData: Buffer|TypedArray|DataView, produceCachedData: boolean (deprecated), importModuleDynamically: Function|vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER }  
• Defaults: filename='evalmachine.<anonymous>', lineOffset=0, columnOffset=0, produceCachedData=false.  

Properties and Methods:
• script.cachedDataRejected: boolean|undefined  
• script.createCachedData() → Buffer  
• script.sourceMapURL: string|undefined

# 3. Running Compiled Code

script.runInContext(contextifiedObject[, options]) → any
script.runInNewContext([contextObject[, options]]) → any
script.runInThisContext([options]) → any

Options for each:
• displayErrors: boolean (default: true)  
• timeout: positive integer ms  
• breakOnSigint: boolean (default: false)  
• contextName, contextOrigin, contextCodeGeneration, microtaskMode (runInNewContext only)

# 4. Compiling Functions

vm.compileFunction(code[, params[, options]]) → Function
• code: string  
• params: string[]  
• options: { filename: string, lineOffset: number, columnOffset: number, cachedData: Buffer|TypedArray|DataView, produceCachedData: boolean, parsingContext: Object, contextExtensions: Object[], importModuleDynamically: Function|vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER }

# 5. Measuring Memory

vm.measureMemory([options]) → Promise<Object>
• options: { mode: 'summary'|'detailed', execution: 'default'|'eager' }  
• Default: { mode:'summary', execution:'default' }  
• Resolves with engine-specific memory usage object.

# 6. Modules (Experimental)

## vm.SourceTextModule
new vm.SourceTextModule(code[, options]) → vm.SourceTextModule
options: { identifier: string, cachedData: Buffer|TypedArray|DataView, context: Object, lineOffset: number, columnOffset: number, initializeImportMeta: Function, importModuleDynamically: Function }

Methods:  
• module.link(linker) → Promise<vm.Module>  
• module.evaluate([options]) → Promise<void>  
• module.dependencySpecifiers: string[]  
• module.error: any  
• module.namespace: Object  
• module.status: 'unlinked'|'linking'|'linked'|'evaluating'|'evaluated'|'errored'

## vm.SyntheticModule
new vm.SyntheticModule(exportNames, evaluateCallback[, options]) → vm.SyntheticModule
• exportNames: string[]  
• evaluateCallback: Function  
• options: { identifier: string, context: Object }

Methods:
• syntheticModule.setExport(name: string, value: any)

# Examples

Contextify and run:
const vm = require('node:vm');
const ctx = { x: 2 };
vm.createContext(ctx);
const script = new vm.Script('x += 40; var y = 17;');
script.runInContext(ctx, { timeout: 100 });
// ctx.x===42, ctx.y===17

Compile function:
const fn = vm.compileFunction('return a + b;', ['a','b'], { filename:'adder.js' });
fn(1,2) // 3

Measure memory:
vm.measureMemory({ mode:'detailed', execution:'eager' }).then(console.log);

Module example omitted for brevity.

## Attribution
- Source: Node.js VM Module
- URL: https://nodejs.org/api/vm.html
- License: License: Node.js (MIT-like terms)
- Crawl Date: 2025-05-10T14:01:28.819Z
- Data Size: 3502189 bytes
- Links Found: 1388

## Retrieved
2025-05-10
