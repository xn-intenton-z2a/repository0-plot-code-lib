library/COMMANDER_JS.md
# library/COMMANDER_JS.md
# COMMANDER_JS

## Crawl Summary
- Installation: npm install commander
- Global and local Command creation: require('commander') or import { Command }
- Options: .option(flags, description, [default], [parser]) and .requiredOption
- Advanced options via Option class: default, choices, env, preset, parser, hideHelp, conflicts, implies
- Accessors: .opts(), .optsWithGlobals(), .getOptionValue(), .setOptionValue(), .getOptionValueSource(), .setOptionValueWithSource()
- Commands: .command(name[, desc][, config]), .addCommand, .alias, .copyInheritedSettings
- Arguments: .argument(name[, desc][, default]), .addArgument
- Parsing: .parse([argv], { from }), .parseAsync
- Parsing config: .enablePositionalOptions, .passThroughOptions, .allowUnknownOption, .allowExcessArguments
- Help and output: .help, .outputHelp, .helpInformation, .showHelpAfterError, .showSuggestionAfterError, .helpOption, .helpCommand, .addHelpText, .configureHelp, .createHelp
- Hooks: preAction, postAction, preSubcommand via .hook
- Errors and exit control: .error, .exitOverride, .configureOutput

## Normalised Extract
Table of Contents
1 Installation
2 Program Initialization
3 Option Configuration
4 Command Setup
5 Argument Setup
6 Parsing Control
7 Help Customization
8 Lifecycle Hooks
9 Error Handling
10 Output Configuration

1 Installation
npm install commander

2 Program Initialization
CommonJS global object program from require('commander')
Local Command instance via new Command()
ESM import as import { Command } from 'commander'

3 Option Configuration
.option(flags: string, description?: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
OPTION CLASS usage:
 new Option(flags, description)
   .default(value, name)
   .choices(array)
   .env(var)
   .preset(value)
   .argParser(fn)
   .hideHelp()
   .conflicts(other)
   .implies(mapping)
Access values:
 opts = program.opts()
 globals = program.optsWithGlobals()
 single = program.getOptionValue(key)
 program.setOptionValue(key, value)
 program.getOptionValueSource(key)
 program.setOptionValueWithSource(key, value, source)

4 Command Setup
.command(nameAndArgs, description?, { executableFile?, isDefault?, hidden? })
.addCommand(commandInstance, { isDefault?, hidden? })
.alias(aliasName)
.copyInheritedSettings(commandInstance)

5 Argument Setup
.argument(name, description?, defaultValue?)
.addArgument(new Argument(name, description).choices(array).default(value, name).argParser(fn))

6 Parsing Control
.parse(argvArray?, { from: 'node'|'electron'|'user' })
.parseAsync(argvArray?, { from: 'node'|'electron'|'user' })
.enablePositionalOptions(deactivate?)
.passThroughOptions()
.allowUnknownOption(allow?)
.allowExcessArguments(allow?)

7 Help Customization
.help()
.outputHelp({ error? })
.helpInformation()
.showHelpAfterError(trueOrMessage)
.showSuggestionAfterError(enable)
.helpOption(flagsOrFalse, description?)
.helpCommand(nameAndArgsOrFalse, description?)
.addHelpText(position, textOrFn)
.configureHelp({ sortSubcommands?, sortOptions?, showGlobalOptions?, ... })
.createHelp(customHelpClass?)

8 Lifecycle Hooks
.hook('preAction'|'postAction'|'preSubcommand', (thisCmd, actionCmd) => { ... })

9 Error Handling
.error(message, { exitCode?, code? })
.exitOverride(callback)

10 Output Configuration
.configureOutput({ writeOut, writeErr, outputError })

## Supplementary Details
1  npm install commander  
2  Require or import  
   - CommonJS global  const { program } = require('commander')  
   - Local Command  const { Command } = require('commander'); const program = new Command()  
   - ESM  import { Command } from 'commander'; const program = new Command()  
3  Define metadata  
   program.name('app')  
   program.description('desc')  
   program.version('1.0.0')  
4  Add options and arguments  
   program.option('-p, --port <number>', 'port number', 8080)  
   program.requiredOption('-c, --cheese <type>', 'must have cheese')  
   program.argument('<input>', 'input file')  
5  Add commands  
   const build = program.command('build').description('build project')  
   build.option('-d, --debug', 'enable debug')  
6  Custom processing  
   program.option('-i, --int <n>', 'integer', myParseInt, 0)  
7  Help and error behavior  
   program.showHelpAfterError()  
   program.showSuggestionAfterError(false)  
8  Parse and run  
   program.parse(process.argv)  
   or await program.parseAsync(process.argv)

## Reference Details
API Signatures
program.option(flags: string, description?: string, defaultValue?: any, parser?: (value: string, prev: any) => any): Command
program.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, prev: any) => any): Command
program.addOption(option: Option): Command
Option(flags: string, description?: string)
Option.default(value: any, name?: string): this
Option.choices(values: any[]): this
Option.env(envVar: string): this
Option.preset(value: any): this
Option.argParser(fn: (value: string, prev: any) => any): this
Option.hideHelp(): this
Option.conflicts(name: string): this
Option.implies(mapping: Record<string, any>): this
program.command(cmd: string, description?: string, config?: { executableFile?: string; isDefault?: boolean; hidden?: boolean }): Command | this
program.addCommand(cmd: Command, config?: { isDefault?: boolean; hidden?: boolean }): this
program.alias(alias: string): Command
program.copyInheritedSettings(cmd: Command): Command
program.argument(name: string, description?: string, defaultValue?: any): Command
program.addArgument(arg: Argument): Command
Argument(name: string, description?: string)
Argument.choices(values: any[]): this
Argument.default(value: any, name?: string): this
Argument.argParser(fn: (value: string, prev: any) => any): this
program.parse(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Command
program.parseAsync(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Promise<Command>
program.enablePositionalOptions(value?: boolean): Command
program.passThroughOptions(): Command
program.allowUnknownOption(allow?: boolean): Command
program.allowExcessArguments(allow?: boolean): Command
program.hook(event: 'preAction'|'postAction'|'preSubcommand', listener: (cmd: Command, sub?: Command) => void | Promise<void>): Command
program.help(): void
program.outputHelp(options?: { error?: boolean }): void
program.helpInformation(): string
program.showHelpAfterError(arg?: boolean | string): Command
program.showSuggestionAfterError(enable?: boolean): Command
program.helpOption(flags: string|false, description?: string): Command
program.helpCommand(nameAndArgs?: string|false, description?: string): Command
program.addHelpText(pos: 'beforeAll'|'before'|'after'|'afterAll', textOrFn: string | (() => string)): Command
program.configureHelp(opts: { sortSubcommands?: boolean; sortOptions?: boolean; showGlobalOptions?: boolean; styleOptions?: any }): Command
program.createHelp(helpClass?: typeof Help): Help
program.error(message: string, options?: { exitCode?: number; code?: string }): never
program.exitOverride(callback?: (err: CommanderError) => any): Command
program.configureOutput(opts: { writeOut?: (str: string) => void; writeErr?: (str: string) => void; outputError?: (str: string, write: (s: string) => void) => void }): Command

Code Examples
Split command:
const { program } = require('commander');
program.option('--first');
program.option('-s, --separator <char>');
program.argument('<string>');
program.parse();
const opts = program.opts();
const limit = opts.first ? 1 : undefined;
console.log(program.args[0].split(opts.separator, limit));

Subcommand pattern:
const { Command } = require('commander');
const program = new Command();
program.name('string-util').version('0.8.0');
program.command('split')
  .argument('<string>', 'string to split')
  .option('--first', 'first only')
  .option('-s, --separator <char>', 'separator', ',')
  .action((str, opts) => console.log(str.split(opts.separator, opts.first?1:undefined)));
program.parse();

Troubleshooting
Execute with missing argument:
$ pizza-options -p
error: option '-p, --pizza-type <type>' argument missing

Unknown option suggestion disabled:
program.showSuggestionAfterError(false)
$ pizza --hepl
error: unknown option '--hepl'

Excess arguments error:
program.allowExcessArguments(false)
$ cmd a b c
error: too many arguments


## Information Dense Extract
.option(flags:string,desc?:string,default?:any,parser?:(v:string,p:any)=>any):Command;.requiredOption(flags:string,desc:string,default?:any,parser?:(v:string,p:any)=>any):Command;.addOption(opt:Option):Command;Option(flags:string,desc?:string).default(val:any,name?:string).choices(arr:any[]).env(var:string).preset(val:any).argParser(fn).hideHelp().conflicts(key:string).implies(map:Record<string,any>);.command(str:string,desc?:string,config?:{executableFile?:string,isDefault?:boolean,hidden?:boolean}):Command|this;.addCommand(cmd:Command,config?:{isDefault?:boolean,hidden?:boolean}):this;.argument(name:string,desc?:string,default?:any):Command;.addArgument(arg:Argument):Command;.parse(argv?:string[],{from?:'node'|'electron'|'user'}?):Command;.parseAsync(argv?:string[],{from?:'node'|'electron'|'user'}?):Promise<Command>;.enablePositionalOptions(b?:boolean):Command;.passThroughOptions():Command;.allowUnknownOption(b?:boolean):Command;.allowExcessArguments(b?:boolean):Command;.help():void;.outputHelp({error?:boolean}?):void;.helpInformation():string;.showHelpAfterError(arg?:boolean|string):Command;.showSuggestionAfterError(b?:boolean):Command;.helpOption(flags:string|false,desc?:string):Command;.helpCommand(name?:string|false,desc?:string):Command;.addHelpText(pos:'beforeAll'|'before'|'after'|'afterAll',txt:string|()=>string):Command;.configureHelp(opts:Record<string,any>):Command;.hook('preAction'|'postAction'|'preSubcommand',(cmd,sub?)=>void|Promise<void>):Command;.error(msg:string,{exitCode?:number,code?:string}?):never;.exitOverride(cb?:(err:CommanderError)=>any):Command;.configureOutput({writeOut?:(s:string)=>void,writeErr?:(s:string)=>void,outputError?:(s:string,write:(s:string)=>void)=>void}):Command

## Sanitised Extract
Table of Contents
1 Installation
2 Program Initialization
3 Option Configuration
4 Command Setup
5 Argument Setup
6 Parsing Control
7 Help Customization
8 Lifecycle Hooks
9 Error Handling
10 Output Configuration

1 Installation
npm install commander

2 Program Initialization
CommonJS global object program from require('commander')
Local Command instance via new Command()
ESM import as import { Command } from 'commander'

3 Option Configuration
.option(flags: string, description?: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any)
OPTION CLASS usage:
 new Option(flags, description)
   .default(value, name)
   .choices(array)
   .env(var)
   .preset(value)
   .argParser(fn)
   .hideHelp()
   .conflicts(other)
   .implies(mapping)
Access values:
 opts = program.opts()
 globals = program.optsWithGlobals()
 single = program.getOptionValue(key)
 program.setOptionValue(key, value)
 program.getOptionValueSource(key)
 program.setOptionValueWithSource(key, value, source)

4 Command Setup
.command(nameAndArgs, description?, { executableFile?, isDefault?, hidden? })
.addCommand(commandInstance, { isDefault?, hidden? })
.alias(aliasName)
.copyInheritedSettings(commandInstance)

5 Argument Setup
.argument(name, description?, defaultValue?)
.addArgument(new Argument(name, description).choices(array).default(value, name).argParser(fn))

6 Parsing Control
.parse(argvArray?, { from: 'node'|'electron'|'user' })
.parseAsync(argvArray?, { from: 'node'|'electron'|'user' })
.enablePositionalOptions(deactivate?)
.passThroughOptions()
.allowUnknownOption(allow?)
.allowExcessArguments(allow?)

7 Help Customization
.help()
.outputHelp({ error? })
.helpInformation()
.showHelpAfterError(trueOrMessage)
.showSuggestionAfterError(enable)
.helpOption(flagsOrFalse, description?)
.helpCommand(nameAndArgsOrFalse, description?)
.addHelpText(position, textOrFn)
.configureHelp({ sortSubcommands?, sortOptions?, showGlobalOptions?, ... })
.createHelp(customHelpClass?)

8 Lifecycle Hooks
.hook('preAction'|'postAction'|'preSubcommand', (thisCmd, actionCmd) => { ... })

9 Error Handling
.error(message, { exitCode?, code? })
.exitOverride(callback)

10 Output Configuration
.configureOutput({ writeOut, writeErr, outputError })

## Original Source
commander.js CLI Framework
https://github.com/tj/commander.js

## Digest of COMMANDER_JS

# Installation

npm install commander

# Program Variable

CommonJS global import
const { program } = require('commander')

Local Command instance
const { Command } = require('commander')
const program = new Command()

ESM import
import { Command } from 'commander'
const program = new Command()

# Option Definitions

.option(flags: string, description?: string, defaultValue?: any, parser?: (value: string, previous: any) => any): Command
.requiredOption(flags: string, description: string, defaultValue?: any, parser?: (value: string, previous: any) => any): Command
.addOption(option: Option): Command

Option chains
Option.default(value: any, name?: string): this
Option.choices(values: any[]): this
Option.env(envVar: string): this
Option.preset(value: any): this
Option.argParser(fn: (value: string, previous: any) => any): this
Option.hideHelp(): this
Option.conflicts(optionName: string): this
Option.implies(mapping: Record<string, any>): this

# Command Definitions

.command(command: string, description?: string, config?: { executableFile?: string, isDefault?: boolean, hidden?: boolean }): Command | this
.addCommand(cmd: Command, config?: { isDefault?: boolean, hidden?: boolean }): this
.alias(alias: string): Command
.copyInheritedSettings(cmd: Command): Command

# Argument Definitions

.argument(name: string, description?: string, defaultValue?: any): Command
.addArgument(argument: Argument): Command

# Parsing

.parse(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Command
.parseAsync(argv?: string[], options?: { from?: 'node'|'electron'|'user' }): Promise<Command>

# Parsing Configuration

.enablePositionalOptions(deactivate?: boolean): Command
.passThroughOptions(): Command
.allowUnknownOption(allow?: boolean): Command
.allowExcessArguments(allow?: boolean): Command

# Help and Output

.help(): void
.outputHelp(options?: { error?: boolean }): void
.helpInformation(): string
.showHelpAfterError(messageOrEnable?: boolean|string): Command
.showSuggestionAfterError(enable?: boolean): Command
.helpOption(flags: string|false, description?: string): Command
.helpCommand(nameAndArgs?: string|false, description?: string): Command
.addHelpText(position: 'beforeAll'|'before'|'after'|'afterAll', text: string|(() => string)): Command
.configureHelp(options: Record<string, any>): Command
.createHelp(customHelpClass?: typeof Help): Help

# Hooks

.hook(event: 'preAction'|'postAction'|'preSubcommand', listener: (thisCommand: Command, actionCommand?: Command) => void|Promise<void>): Command

# Errors and Exit

.error(message: string, options?: { exitCode?: number, code?: string }): never
.exitOverride(callback?: (err: CommanderError) => any): Command
.configureOutput(options: { writeOut?: (str: string) => void, writeErr?: (str: string) => void, outputError?: (str: string, write: (str: string) => void) => void }): Command

# Metadata

Retrieved: 2024-06-14
Data Size: 713498 bytes

## Attribution
- Source: commander.js CLI Framework
- URL: https://github.com/tj/commander.js
- License: MIT
- Crawl Date: 2025-05-10T20:02:25.863Z
- Data Size: 713498 bytes
- Links Found: 5200

## Retrieved
2025-05-10
library/ZOD_REFERENCE.md
# library/ZOD_REFERENCE.md
# ZOD_REFERENCE

## Crawl Summary
Installation: TypeScript>=4.5 strict; npm install zod. Basic Usage: import z; z.string(), z.object(); Type inference via z.infer; parsing methods: parse, parseAsync, safeParse, safeParseAsync. Primitive schemas: string, number, boolean, date, any, undefined, null. Coercion: z.coerce.string/number/boolean/date. Object schema modifiers: shape, extend, merge, pick, omit, partial, required, deepPartial, passthrough, strip, strict, catchall. Composition: union, discriminatedUnion, intersection, array, tuple, record, map, set. Custom validation: refine, superRefine, preprocess, transform, custom. Schema modifiers: default, describe, catch, nullable, optional, brand, readonly, promise, pipe. Best practices: single schema declaration, strict TS, safeParse, discriminatedUnion, z.coerce. Troubleshooting: inspect ZodError.issues, error formatting, catchall/strict, cyclic detection.

## Normalised Extract
Table of Contents
1 Installation
2 Basic Usage
3 Parsing Methods
4 Primitives & Coercion
5 Object Schema Methods
6 Composition & Utility Types
7 Custom Validation
8 Schema Modifiers
9 Best Practices
10 Troubleshooting

1 Installation
TypeScript 4.5+ with strict mode in tsconfig.json. Npm: npm install zod; Yarn: yarn add zod; pnpm: pnpm add zod.

2 Basic Usage
import { z } from 'zod';
const s = z.string(); s.parse('x'); s.safeParse(1);
const U = z.object({name:z.string()}); type U = z.infer<typeof U>; U.parse({name:'a'});

3 Parsing Methods
.parse(data:unknown):T throws ZodError
.parseAsync(data:unknown):Promise<T>
.safeParse(data:unknown):{success:boolean;data?:T;error?:ZodError}
.safeParseAsync(data:unknown):Promise<SafeResult>

4 Primitives & Coercion
z.string(), z.number(), z.boolean(), z.date(), z.undefined(), z.null(), z.any();
z.coerce.string() applies String(input)
z.coerce.number() applies Number(input)
z.coerce.boolean() applies Boolean(input)
z.coerce.date() applies new Date(input)

5 Object Schema Methods
z.object({k:Schema})
.shape access property schemas
.extend({k:Schema}) adds/overwrites keys
.merge(Other) combines schemas
.pick({k:true})/.omit({k:true})
.partial(opts?) makes keys optional
deepPartial() deep optional
.required(opts?) makes keys required
.passthrough() keep unknown keys
.strip() remove unknown keys
.strict() error on unknown keys
.catchall(Schema) validate unknown keys

6 Composition & Utility Types
z.union([A,B]) or A.or(B)
z.discriminatedUnion(key,opts)
z.intersection(A,B)
z.array(Item).min(n)/max(n)/length(n)/nonempty()
z.tuple([T1,T2]).rest(Tn)
z.record(KeySchema,ValueSchema)
z.map(Key,Value)
z.set(Item).min(n)/nonempty()/size(n)

7 Custom Validation
.refine(fn:(v)=>boolean,{message, path})
.superRefine((v,ctx)=>ctx.addIssue({code,message,path}))
.preprocess((v)=>any,Schema)
.transform(v=>any)
z.custom<T>(v=>boolean,opts?)

8 Schema Modifiers
.default(val)
.describe(text)
.catch(fn)
.nullable()/nullish()
.optional()
.brand<Brand>()
.promise()
.readonly()
.pipe(Schema)

9 Best Practices
Declare schemas once; use z.infer for TS types. Enable strict TS mode. Use safeParse for inputs. Prefer discriminatedUnion for object unions. Use z.coerce for form inputs.

10 Troubleshooting
Inspect ZodError.issues path and message. Use .format to customize errors. Toggle .strict/.passthrough/.catchall to diagnose unknown keys. Guard against cycles with pre-validation.

## Supplementary Details
1. Typescript config: {"compilerOptions":{"strict":true}}. 2. Browser/Node support: modern browsers + Node.js. 3. Zero dependencies; 8kb minified+gzipped. 4. Immutable schemas: methods return new instances. 5. Install canary: npm install zod@canary. 6. Default unknown-key behavior: strip. 7. Error customization: pass {message:string} to validators. 8. Asynchronous refinements require parseAsync. 9. SafeParse alias spa for safeParseAsync. 10. Method chaining order affects inference: e.g. z.string().optional().array() vs z.string().array().optional().

## Reference Details
API Factory
function z.string(): ZodString
function z.number(): ZodNumber
function z.boolean(): ZodBoolean
function z.date(): ZodDate
function z.any(): ZodAny
function z.unknown(): ZodUnknown
function z.coerce.string(): ZodString applies String(input)
function z.coerce.number(): ZodNumber applies Number(input)
function z.coerce.boolean(): ZodBoolean applies Boolean(input)
function z.coerce.date(): ZodDate applies new Date(input)
function z.object<Shape>(shape:Shape): ZodObject<Shape>
function z.array<T>(schema:ZodType<T>): ZodArray<T>
function z.tuple<T extends any[]>(schemas:T): ZodTuple<T>
function z.union<T extends ZodTypeAny[]>(schemas:T): ZodUnion<T>
function z.discriminatedUnion<Tag extends string, Options extends ZodObject<any>[]>(tag:Tag, options:Options): ZodDiscriminatedUnion<Tag,Options>
function z.intersection<A extends ZodTypeAny,B extends ZodTypeAny>(a:A,b:B): ZodIntersection<A,B>
function z.record<K extends ZodTypeAny,V extends ZodTypeAny>(key:K,value:V): ZodRecord<K,V>
function z.map<K extends ZodTypeAny,V extends ZodTypeAny>(key:K,value:V): ZodMap<K,V>
function z.set<T extends ZodTypeAny>(schema:T): ZodSet<T>
function z.promise<T>(schema:ZodType<T>): ZodPromise<T>
function z.instanceof<T>(cls:new(...args:any[])=>T): ZodInstanceof<T>
function z.function(): ZodFunction

Parse Methods on ZodType<T>
.parse(data:unknown): T throws ZodError
.parseAsync(data:unknown): Promise<T>
.safeParse(data:unknown): SafeParseReturn<T>
.safeParseAsync(data:unknown): Promise<SafeParseReturn<T>> alias .spa

Schema Methods on ZodType<Input,Def,Output>
.optional(): ZodOptional<this>
.nullable(): ZodNullable<this>
.nullish(): ZodNullable<ZodOptional<this>>
.default(value:Output): ZodDefault<this>
.describe(text:string): ZodType<Input,Def,Output>
.catch(onError:(error: ZodError)=>Output): ZodEffects<any,Output,Input>
.transform<NewOut>(fn:(value:Output)=>NewOut): ZodEffects<any,NewOut,Input>
.refine(fn:(value:Output)=>boolean|Promise<boolean>, params?:{message?:string;path?:(string|number)[];}): ZodEffects<any,Output,Input>
.superRefine(fn:(value:Output,ctx:RefinementCtx)=>void): ZodEffects<any,Output,Input>
.preprocess(fn:(value:any)=>any,schema:ZodType<any>): ZodEffects<any,any,any>
.brand<BrandName extends string>(): ZodBranded<this,BrandName>
.passthrough(): ZodObject<any>
.strip(): ZodObject<any>
.strict(): ZodObject<any>
.catchall(schema:ZodType<any>): ZodObject<any>
.merge(other:ZodObject<any>): ZodObject<any>
.extend(shape:any): ZodObject<any>
.pick(keys:Record<string,boolean>): ZodObject<any>
.omit(keys:Record<string,boolean>): ZodObject<any>
.partial(keys?:Record<string,boolean>): ZodObject<any>
.deepPartial(): ZodObject<any>
.required(keys?:Record<string,boolean>): ZodObject<any>
.and(other:ZodTypeAny): ZodIntersection<any,any>
.or(other:ZodTypeAny): ZodUnion<[this,typeof other]>
.pipe(other:ZodTypeAny): ZodPipeline<this,typeof other>

Code Examples:
const nonEmptyStrings = z.string().array().nonempty({message:"Empty"});
interface Category{ name:string; subcategories:Category[] }
const categorySchema: ZodType<Category> = z.object({ name:z.string(), subcategories:z.lazy(()=>categorySchema.array()) });

Troubleshooting:
Inspect ZodError.issues array: for each issue {path:[], message:string, code:string}. Use CLI: npx ts-node file.ts to debug. Check schema chaining order when types differ. Use safeParseAsync for async validators.

## Information Dense Extract
TS>=4.5 strict; npm install zod. import {z} from 'zod'; zotypes: z.string(),z.number(),z.boolean(),z.date(),z.any(); z.coerce.string|number|boolean|date; parse: .parse(data):T throws; .safeParse(data):{success,data?,error?}; .parseAsync/.safeParseAsync; object: z.object(shape).shape/.extend/.merge/.pick/.omit/.partial/.required/.deepPartial/.passthrough/.strip/.strict/.catchall; composition: z.union,discriminatedUnion,intersection,array.min/max/length/nonempty,tuple.rest,record,map,set; custom: .refine(.predicate,{message,path}),.superRefine, .preprocess, .transform, z.custom<T>,.brand,.default,.describe,.catch;.pipe; inference via z.infer; best: single schema, safeParse for UX, discriminatedUnion; troubleshoot ZodError.issues

## Sanitised Extract
Table of Contents
1 Installation
2 Basic Usage
3 Parsing Methods
4 Primitives & Coercion
5 Object Schema Methods
6 Composition & Utility Types
7 Custom Validation
8 Schema Modifiers
9 Best Practices
10 Troubleshooting

1 Installation
TypeScript 4.5+ with strict mode in tsconfig.json. Npm: npm install zod; Yarn: yarn add zod; pnpm: pnpm add zod.

2 Basic Usage
import { z } from 'zod';
const s = z.string(); s.parse('x'); s.safeParse(1);
const U = z.object({name:z.string()}); type U = z.infer<typeof U>; U.parse({name:'a'});

3 Parsing Methods
.parse(data:unknown):T throws ZodError
.parseAsync(data:unknown):Promise<T>
.safeParse(data:unknown):{success:boolean;data?:T;error?:ZodError}
.safeParseAsync(data:unknown):Promise<SafeResult>

4 Primitives & Coercion
z.string(), z.number(), z.boolean(), z.date(), z.undefined(), z.null(), z.any();
z.coerce.string() applies String(input)
z.coerce.number() applies Number(input)
z.coerce.boolean() applies Boolean(input)
z.coerce.date() applies new Date(input)

5 Object Schema Methods
z.object({k:Schema})
.shape access property schemas
.extend({k:Schema}) adds/overwrites keys
.merge(Other) combines schemas
.pick({k:true})/.omit({k:true})
.partial(opts?) makes keys optional
deepPartial() deep optional
.required(opts?) makes keys required
.passthrough() keep unknown keys
.strip() remove unknown keys
.strict() error on unknown keys
.catchall(Schema) validate unknown keys

6 Composition & Utility Types
z.union([A,B]) or A.or(B)
z.discriminatedUnion(key,opts)
z.intersection(A,B)
z.array(Item).min(n)/max(n)/length(n)/nonempty()
z.tuple([T1,T2]).rest(Tn)
z.record(KeySchema,ValueSchema)
z.map(Key,Value)
z.set(Item).min(n)/nonempty()/size(n)

7 Custom Validation
.refine(fn:(v)=>boolean,{message, path})
.superRefine((v,ctx)=>ctx.addIssue({code,message,path}))
.preprocess((v)=>any,Schema)
.transform(v=>any)
z.custom<T>(v=>boolean,opts?)

8 Schema Modifiers
.default(val)
.describe(text)
.catch(fn)
.nullable()/nullish()
.optional()
.brand<Brand>()
.promise()
.readonly()
.pipe(Schema)

9 Best Practices
Declare schemas once; use z.infer for TS types. Enable strict TS mode. Use safeParse for inputs. Prefer discriminatedUnion for object unions. Use z.coerce for form inputs.

10 Troubleshooting
Inspect ZodError.issues path and message. Use .format to customize errors. Toggle .strict/.passthrough/.catchall to diagnose unknown keys. Guard against cycles with pre-validation.

## Original Source
Zod Schema Validation
https://github.com/colinhacks/zod

## Digest of ZOD_REFERENCE

# Zod Schema Validation Reference
Date Retrieved: 2024-07-27
Data Size: 893007 bytes
Source: https://github.com/colinhacks/zod

## Installation

### Requirements
TypeScript >=4.5 with strict mode enabled in tsconfig.json:
{
  "compilerOptions": {
    "strict": true
  }
}

### From npm

npm install zod

// yarn add zod
// pnpm add zod


## Basic Usage

import { z } from "zod";

// String schema
const myString = z.string();
myString.parse("hello");           // returns "hello"
myString.safeParse(123);            // { success: false; error: ZodError }

// Object schema with inference
const User = z.object({ username: z.string() });
type UserType = z.infer<typeof User>; // { username: string }
User.parse({ username: "alice" });  // returns { username: "alice" }

## Parsing Methods

.parse(data: unknown): T  – synchronous, throws ZodError on failure
.parseAsync(data: unknown): Promise<T> – for async refinements/transforms
.safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }
.safeParseAsync(data: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>

## Primitive Schemas & Coercion

z.string();
z.number();
z.boolean();
z.date();
z.undefined(); z.null(); z.any();
z.coerce.string()    – applies String(input) before parsing
z.coerce.number()    – applies Number(input)
z.coerce.boolean()   – applies Boolean(input) (truthy/falsy)
z.coerce.date()      – applies new Date(input)

## Object Schema Methods

z.object({ ... }) – defines required properties
.shape          – access property schemas
.extend(props)  – add/override keys
.merge(schema)  – combine two objects
.pick(keys)/.omit(keys) – include/exclude keys
.partial(opts?) – make all or selected keys optional
.required(opts?)– make keys required
.deepPartial()  – deep optional
.passthrough()/.strip()/.strict() – unknown-key behavior
.catchall(schema) – validate unknown keys

## Composition & Utility Types

z.union([A, B]) or A.or(B) – OR types
z.discriminatedUnion(key, [schema1, schema2])
z.intersection(A, B) or A.and(B) – AND types
z.array(itemSchema).min(n)/.max(n)/.length(n)/.nonempty()
z.tuple([types]).rest(type)
z.record(keySchema, valueSchema)
z.map(keySchema, valueSchema)
z.set(itemSchema).min(n)/.nonempty()/.size(n)

## Custom Validation

.refine(predicate: (value)=>boolean, { message?, path? })
.superRefine((value, ctx)=>{ ctx.addIssue({ code, message, path }) })
.preprocess(fn, schema)   – transform input before validation
.transform(fn)           – transform output after parsing
.custom<T>(validatorFn?, opts?) – arbitrary TypeScript types

## Schema Modifiers

.default(value)
.describe(text)
.catch(handler)
.nullable()/.nullish()
.optional()
.brand<BrandName>()
.passthrough()
.promise()
.readonly()
.pipe(schema)

## Best Practices

• Declare validators once; use z.infer<>
• Enable strict mode in TypeScript
• Use .safeParse for user input handling
• Prefer discriminatedUnion for object unions
• Use z.coerce for form input coercion

## Troubleshooting

• Inspect ZodError.issues for path and message
• Use .format to customize error output
• Use .catchall or .strict to diagnose unknown keys
• For cyclic data, guard with z.checkCyclic(data)


## Attribution
- Source: Zod Schema Validation
- URL: https://github.com/colinhacks/zod
- License: MIT
- Crawl Date: 2025-05-10T21:02:35.792Z
- Data Size: 893007 bytes
- Links Found: 6095

## Retrieved
2025-05-10
library/EXPRESS_CORE.md
# library/EXPRESS_CORE.md
# EXPRESS_CORE

## Crawl Summary
Node requirements: Express 4.x requires Node>=0.10; 5.x requires Node>=18. Install: npm install express --save (--no-save). Application creation: express() returns app instance. Listen: app.listen(port, callback). Routing: app.METHOD(path, handler), METHODS=get,post,put,delete,all; multiple handlers supported. Static files: express.static(root,[options]); app.use(express.static('public')); mount with prefix and multiple directories. Error handling: 404 middleware uses signature (req,res,next); error middleware uses (err,req,res,next). Router: express.Router({mergeParams:boolean}); define router.use, router.METHOD; mount with app.use('/path',router). Response methods include res.send,res.json,res.jsonp,res.redirect,res.render,res.sendFile,res.download,res.end,res.sendStatus.

## Normalised Extract
Table of Contents
1 Installation Requirements
2 Hello World Setup
3 Routing Methods
4 Static File Serving
5 Error Handling
6 Router Module

1 Installation Requirements
- Express v4 requires Node>=0.10
- Express v5 requires Node>=18
- Commands:
  mkdir myapp; cd myapp
  npm init (entry point: app.js)
  npm install express --save  (--no-save for temp)

2 Hello World Setup
In app.js:
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => { res.send('Hello World!') })
app.listen(port, () => { console.log('Example app listening on port', port) })

Run server:
node app.js

3 Routing Methods
Signature: app.METHOD(path, ...handlers)
Supported METHODS: get, post, put, delete, all
Multiple handlers: app.get(path, fn1, fn2)

4 Static File Serving
Signature: express.static(root, [options])
Serve 'public' directory:
app.use(express.static('public'))
Multiple dirs order:
app.use(express.static('public'))
app.use(express.static('files'))
Virtual prefix:
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

5 Error Handling
404 handler (no err param):
app.use((req, res) => { res.status(404).send('Not Found') })
Error middleware (4 params):
app.use((err, req, res, next) => { res.status(500).send('Error') })

6 Router Module
Create router:
const router = express.Router({ mergeParams: true })
Load middleware: router.use(fn)
Define routes: router.get('/', handler)
Mount: app.use('/prefix', router)

## Supplementary Details
Project setup:
1 mkdir myapp; cd myapp
2 npm init (set entry point to app.js)
3 npm install express --save

Express Generator (Node>=8.2):
npx express-generator [options]
Options:
  -h --help        show help
  --version        show version
  -e --ejs         add ejs engine
  --hbs            add handlebars
  --pug            add pug
  -v --view <eng>  view engine (ejs|hbs|hjs|jade|pug|twig|vash)
  -c --css <eng>   css engine (less|stylus|compass|sass)
  --git            add .gitignore
  -f --force       force on non-empty dir
  --no-view        skip view engine
Example: npx express-generator --view=pug myapp
cd myapp; npm install
Start app:
Mac/Linux: DEBUG=myapp:* npm start
Windows CMD: set DEBUG=myapp:* & npm start
PowerShell: $env:DEBUG='myapp:*'; npm start

Static serving: use absolute paths with path.join(__dirname,'public')
Performance: use reverse proxy cache

## Reference Details
API Specifications

express(): Application instance

express.static(root: string, options?: { dotfiles?: string, etag?: boolean, extensions?: string[], index?: boolean|string|string[], lastModified?: boolean, maxAge?: number|string, redirect?: boolean, setHeaders?: (res, path, stat) => void }): HandlerFunction

express.Router(options?: { mergeParams?: boolean }): Router

app.get(path: string|RegExp, ...handlers: RequestHandler[]): Application
app.post(path: string|RegExp, ...handlers: RequestHandler[]): Application
app.put(path: string|RegExp, ...handlers: RequestHandler[]): Application
app.delete(path: string|RegExp, ...handlers: RequestHandler[]): Application
app.all(path: string|RegExp, ...handlers: RequestHandler[]): Application
app.use(path?: string|Router|RequestHandler, ...handlers: RequestHandler[]): Application
app.listen(port: number|string, hostname?: string, backlog?: number, callback?: () => void): Server

Response methods:
res.send(body: string|object|Buffer): void
res.json(body: any): void
res.jsonp(body: any): void
res.redirect(status: number, path: string): void
res.redirect(path: string): void
res.render(view: string, locals?: object, callback?: (err: Error, html: string) => void): void
res.sendFile(path: string, options?: object, callback?: (err: Error) => void): void
res.download(path: string, filename?: string, options?: object, callback?: (err: Error) => void): void
res.end(data?: any, encoding?: string): void
res.sendStatus(statusCode: number): void

Code Examples included above

Best Practices
- Use absolute paths for static dirs
- Order middleware declarations explicitly
- Place 404 handler after all routes
- Use error-handling middleware with 4 args

Troubleshooting
- Node version mismatch: node -v (should be>=18 for Express5)
- Port in use: lsof -i :3000; kill <pid>
- Reset deps: rm -rf node_modules package-lock.json; npm install
- Syntax check: node --check app.js

## Information Dense Extract
Node>=0.10 (Express4), Node>=18 (Express5); npm install express --save; express(): Application; app.METHOD(path,...handlers): get,post,put,delete,all; app.all, app.use; express.static(root,[options]) returns Handler; options={dotfiles,etag,extensions,index,lastModified,maxAge,redirect,setHeaders}; Router({mergeParams}) returns Router; response methods: send, json, jsonp, redirect, render, sendFile, download, end, sendStatus; HelloWorld, routing, static, error, router patterns; express-generator CLI options; start via DEBUG=name:* npm start; troubleshooting commands node -v, lsof, kill, reinstall modules

## Sanitised Extract
Table of Contents
1 Installation Requirements
2 Hello World Setup
3 Routing Methods
4 Static File Serving
5 Error Handling
6 Router Module

1 Installation Requirements
- Express v4 requires Node>=0.10
- Express v5 requires Node>=18
- Commands:
  mkdir myapp; cd myapp
  npm init (entry point: app.js)
  npm install express --save  (--no-save for temp)

2 Hello World Setup
In app.js:
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => { res.send('Hello World!') })
app.listen(port, () => { console.log('Example app listening on port', port) })

Run server:
node app.js

3 Routing Methods
Signature: app.METHOD(path, ...handlers)
Supported METHODS: get, post, put, delete, all
Multiple handlers: app.get(path, fn1, fn2)

4 Static File Serving
Signature: express.static(root, [options])
Serve 'public' directory:
app.use(express.static('public'))
Multiple dirs order:
app.use(express.static('public'))
app.use(express.static('files'))
Virtual prefix:
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

5 Error Handling
404 handler (no err param):
app.use((req, res) => { res.status(404).send('Not Found') })
Error middleware (4 params):
app.use((err, req, res, next) => { res.status(500).send('Error') })

6 Router Module
Create router:
const router = express.Router({ mergeParams: true })
Load middleware: router.use(fn)
Define routes: router.get('/', handler)
Mount: app.use('/prefix', router)

## Original Source
Express Official Documentation
https://expressjs.com/

## Digest of EXPRESS_CORE

# Installation
Express 4.x requires Node.js 0.10 or higher
Express 5.x requires Node.js 18 or higher

Install Express and save in dependencies:
$ npm install express --save
Temporary install (no save):
$ npm install express --no-save

# Hello World Example
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log('Example app listening on port', port)
})

# Basic Routing
Route definition: app.METHOD(PATH, HANDLER)
Supported METHODS: get, post, put, delete, all

Examples:
app.get('/', (req, res) => { res.send('Hello World!') })
app.post('/', (req, res) => { res.send('Got a POST request') })
app.put('/user', (req, res) => { res.send('Got a PUT request at /user') })
app.delete('/user', (req, res) => { res.send('Got a DELETE request at /user') })
app.all('/secret', (req, res, next) => { next() })

# Serving Static Files
Function signature: express.static(root, [options])
  root: directory path to serve static assets

Basic usage:
app.use(express.static('public'))

Multiple directories:
app.use(express.static('public'))
app.use(express.static('files'))

Virtual path prefix:
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

# Error Handling
404 response handler (no error object):
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})

Error-handling middleware signature (with four args):
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

# Router Module
Create router with optional mergeParams:
const express = require('express')
const router = express.Router({ mergeParams: true })

Load router-specific middleware:
router.use((req, res, next) => { /* ... */ next() })

Define routes:
router.get('/', (req, res) => { res.send('Home') })
router.get('/about', (req, res) => { res.send('About') })

Mount router in main app:
const birds = require('./birds')
app.use('/birds', birds)

## Attribution
- Source: Express Official Documentation
- URL: https://expressjs.com/
- License: License: MIT
- Crawl Date: 2025-05-10T11:03:05.682Z
- Data Size: 6952885 bytes
- Links Found: 16342

## Retrieved
2025-05-10
library/OPENAI_NODEJS.md
# library/OPENAI_NODEJS.md
# OPENAI_NODEJS

## Crawl Summary
Instantiate client with apiKey, baseURL, timeout. Supported methods: createCompletion, createChatCompletion, createEmbedding with Promise returns. Enable streaming via stream: true and process async iterator. Errors thrown as OpenAIError with status and code. TypeScript types defined for request and response objects.

## Normalised Extract
Table of Contents
1 Initialization
2 Authentication
3 Configuration
4 API Methods
5 Streaming Responses
6 Error Handling
7 TypeScript Types

1 Initialization
Import and create instance
    import OpenAI from "openai"
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.openai.com/v1", timeout: 30000 })

2 Authentication
Pass apiKey or set env var OPENAI_API_KEY. Optionally set organization.

3 Configuration
Options: apiKey (required), baseURL (default https://api.openai.com/v1), timeout (ms)

4 API Methods
createCompletion(options, signal?) => Promise<CreateCompletionResponse>
createChatCompletion(options, signal?) => Promise<CreateChatCompletionResponse>
createEmbedding(options, signal?) => Promise<CreateEmbeddingResponse>

5 Streaming Responses
Set options.stream=true. Use for await on response.body async iterator. Parse each chunk.

6 Error Handling
Library throws OpenAIError with name, message, status, code. Use try/catch to inspect error.status and error.code.

7 TypeScript Types
CreateCompletionRequest { model: string ; prompt?: string|string[]; max_tokens?: number; temperature?: number; ... }
CreateCompletionResponse { id: string; object: string; created: number; model: string; choices: [{ text; index; logprobs; finish_reason }]; usage: { prompt_tokens; completion_tokens; total_tokens } }

## Supplementary Details
Environment Variables
OPENAI_API_KEY=your_api_key_here
OPENAI_ORGANIZATION=your_org_id

Client Configuration
baseURL: default "https://api.openai.com/v1"
timeout: default 30000 ms

Axios Internals
Client uses axios with the following defaults:
  headers: { "Authorization": "Bearer <apiKey>", "Content-Type": "application/json" }
  responseType: "stream" when stream=true else "json"

AbortSignal Support
Pass an AbortSignal as second argument to methods to cancel requests:
    const controller = new AbortController()
    openai.createCompletion(req, controller.signal)
    controller.abort()

## Reference Details
Constructor Signature
new OpenAI(options: {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  organization?: string;
}): OpenAI

createCompletion(options: {
  model: string;
  prompt?: string|string[];
  suffix?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  echo?: boolean;
  stop?: string|string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  user?: string;
}, signal?: AbortSignal): Promise<{
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{ text: string; index: number; logprobs: any; finish_reason: string }>;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}>

createChatCompletion(options: {
  model: string;
  messages: Array<{ role: "system"|"user"|"assistant"; content: string }>;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string|string[];
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  user?: string;
}, signal?: AbortSignal): Promise<{
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{ index: number; finish_reason: string; message: { role: string; content: string } }>;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}>

createEmbedding(options: {
  model: string;
  input: string|string[];
  user?: string;
}, signal?: AbortSignal): Promise<{
  data: Array<{ embedding: number[]; index: number }>
  usage: { prompt_tokens: number; total_tokens: number }
}>

Code Example
    import OpenAI from "openai"
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    async function run() {
      try {
        const resp = await openai.createChatCompletion({
          model: "gpt-4",
          messages: [ { role: "user", content: "Hello!" } ],
          stream: true
        })
        for await (const part of resp.body) {
          process.stdout.write(part.choices[0].delta.content)
        }
      } catch (e) {
        console.error(e.status, e.code, e.message)
      }
    }

Best Practices
Implement exponential backoff on 429 and 500 errors:
    let retry=0
    while (retry<5) {
      try { await call() ; break } catch (e) {
        if ([429,502,503,504].includes(e.status)) {
          await new Promise(r=>setTimeout(r,2**retry*100))
          retry++
        } else throw e
      }
    }

Troubleshooting
Command: curl -X GET https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"
Expected: 200 OK with list of models
On 401 check API key
On 429 check rate limits and backoff

## Information Dense Extract
import OpenAI; new OpenAI({apiKey,baseURL,timeout,organization}); methods: createCompletion(req,signal)->Promise completion, createChatCompletion(req,signal)->Promise chatCompletion, createEmbedding(req,signal)->Promise embedding; req types: specify model,string inputs, optional parameters; for streaming set stream=true and for await response.body; errors: throws OpenAIError{name,message,status,code}; default baseURL=https://api.openai.com/v1 timeout=30000; retries on 429/5xx with exponential backoff; use AbortController to cancel; example code above.

## Sanitised Extract
Table of Contents
1 Initialization
2 Authentication
3 Configuration
4 API Methods
5 Streaming Responses
6 Error Handling
7 TypeScript Types

1 Initialization
Import and create instance
    import OpenAI from 'openai'
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: 'https://api.openai.com/v1', timeout: 30000 })

2 Authentication
Pass apiKey or set env var OPENAI_API_KEY. Optionally set organization.

3 Configuration
Options: apiKey (required), baseURL (default https://api.openai.com/v1), timeout (ms)

4 API Methods
createCompletion(options, signal?) => Promise<CreateCompletionResponse>
createChatCompletion(options, signal?) => Promise<CreateChatCompletionResponse>
createEmbedding(options, signal?) => Promise<CreateEmbeddingResponse>

5 Streaming Responses
Set options.stream=true. Use for await on response.body async iterator. Parse each chunk.

6 Error Handling
Library throws OpenAIError with name, message, status, code. Use try/catch to inspect error.status and error.code.

7 TypeScript Types
CreateCompletionRequest { model: string ; prompt?: string|string[]; max_tokens?: number; temperature?: number; ... }
CreateCompletionResponse { id: string; object: string; created: number; model: string; choices: [{ text; index; logprobs; finish_reason }]; usage: { prompt_tokens; completion_tokens; total_tokens } }

## Original Source
OpenAI Node.js Library Documentation
https://platform.openai.com/docs/libraries/node-js-overview

## Digest of OPENAI_NODEJS

# Initialization

Import module and instantiate client:

    import OpenAI from "openai"
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.openai.com/v1",
      timeout: 30000
    })

# Authentication

Clients read API key from the "apiKey" constructor option or the environment variable OPENAI_API_KEY. An optional "organization" field can be passed for enterprise accounts.

# API Methods

createCompletion(options: CreateCompletionRequest, signal?: AbortSignal): Promise<CreateCompletionResponse>
createChatCompletion(options: CreateChatCompletionRequest, signal?: AbortSignal): Promise<CreateChatCompletionResponse>
createEmbedding(options: CreateEmbeddingRequest, signal?: AbortSignal): Promise<CreateEmbeddingResponse>

# Streaming

To receive partial responses, set stream: true in request options. Handle response.body as an async iterator:

    for await (const chunk of response.body) {
      const payload = JSON.parse(chunk.toString())
      // process payload.choices[0]
    }

# Error Handling

The library throws OpenAIError with properties:

    name: "OpenAIError"
    message: string
    status: number
    code?: string

Catch errors using try/catch and inspect status and code.

# TypeScript Types

CreateCompletionRequest:
  model: string
  prompt?: string|string[]
  suffix?: string
  max_tokens?: number
  temperature?: number
  top_p?: number
  n?: number
  stream?: boolean
  logprobs?: number
  echo?: boolean
  stop?: string|string[]
  presence_penalty?: number
  frequency_penalty?: number
  best_of?: number
  user?: string

CreateCompletionResponse:
  id: string
  object: string
  created: number
  model: string
  choices: Array<{ text: string; index: number; logprobs: any; finish_reason: string }>
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number }


## Attribution
- Source: OpenAI Node.js Library Documentation
- URL: https://platform.openai.com/docs/libraries/node-js-overview
- License: License: OpenAI Terms of Use
- Crawl Date: 2025-05-10T13:08:28.142Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
library/ASCIICHART.md
# library/ASCIICHART.md
# ASCIICHART

## Crawl Summary
asciichart.plot(series,config) produces console ASCII line charts. series: number[] or number[][]. config options: offset (number,min2,default3), padding (string,default7-space), height (number or auto), format (function(x,i):string), colors (ANSI codes array). Returns string containing chart. Supports NodeJS (require) and browsers (<script>). Multiple series overlaid with per-series colors. Auto-range computes min/max. Scale to height rescales to ±height/2. Color constants: asciichart.blue, green, default, red, yellow, magenta, cyan. Troubleshoot by checking ANSI support and adjusting offset/padding.

## Normalised Extract
Table of Contents

1 Installation
2 API Method Signature
3 Configuration Options
4 Usage Examples
5 Color Constants
6 Troubleshooting

1 Installation
Install via npm: npm install asciichart
Include in browser: <script src="asciichart.js"></script>

2 API Method Signature
Function plot(series, config) => string
Arguments:
  series: array of numbers or array of number arrays
  config: object{
    offset: number (min 2)
    padding: string
    height: number
    format: function(x,i) returns string
    colors: array of ANSI code strings
  }

3 Configuration Options
offset: axis left margin, default 3
padding: label padding, default seven spaces
height: chart height in lines, default auto range
format: label formatter, default right-pad to padding length
colors: per-series ANSI color array, default single series default color

4 Usage Examples
Basic:
  plot([15*sin series])
Scale Height:
  plot(series,{height:6})
Auto-range:
  plot(seriesWithoutConfig)
Multi-series:
  plot([seriesA,seriesB],config)
Colored series:
  config.colors=[blue,green,default]

5 Color Constants
blue '\u001b[34m'
green '\u001b[32m'
default '\u001b[39m'
red, yellow, magenta, cyan exist

6 Troubleshooting
- No colors: verify ANSI in terminal
- Labels misaligned: increase offset >=2 or padding length

## Supplementary Details
Default config values:
  offset=3; padding='       ' (7 spaces); height=auto; format(x,i) => (padding + x.toFixed(2)).slice(-padding.length); colors=[default ANSI code]

Browser include path: 'node_modules/asciichart/dist/asciichart.js' or CDN link

Node import: const asciichart = require('asciichart')

Implementation steps:
1 npm install
2 require or include script
3 prepare data array(s) of numbers
4 call plot with optional config
5 output string via console.log

Environment: NodeJS >=6 or any browser supporting ES5

Limitations: series length defines width; Unicode fixed-width font required

## Reference Details
API Specification
---------------
Function plot(series:number[]|number[][], config?:{
  offset?:number; // axis offset from left margin; minimum 2; default 3
  padding?:string; // label formatting pad; default '       ' (7 spaces)
  height?:number; // chart height in terminal lines; default auto-range
  format?:function(x:number,i:number):string; // label formatter; default: right-align to padding length
  colors?:string[]; // ANSI codes per series; default [asciichart.default]
}):string

Color Constants:
  asciichart.blue    = '\u001b[34m'
  asciichart.green   = '\u001b[32m'
  asciichart.red     = '\u001b[31m'
  asciichart.yellow  = '\u001b[33m'
  asciichart.magenta = '\u001b[35m'
  asciichart.cyan    = '\u001b[36m'
  asciichart.default = '\u001b[39m'

Examples:
-----------
// Basic single series
var data = Array(120).fill(0).map((_,i)=>Math.sin(i/10));
console.log(asciichart.plot(data));

// With height and offset
var cfg={height:8,offset:4,padding:'    '};
console.log(asciichart.plot(data,cfg));

// Multi-series with colors
var a=data; var b=data.map(v=>v*0.5);
var cfg2={colors:[asciichart.blue,asciichart.red]};
console.log(asciichart.plot([a,b],cfg2));

Best Practices:
 - Use offset>=2 to prevent labels truncation
 - Override format to customize numeric precision: format:(x,i)=>(' '+x.toFixed(1)).slice(-4)
 - For dynamic data, call plot on full series array to ensure accurate scaling

Troubleshooting:
- No ANSI colors: run in bash or supported terminal; test with console.log(asciichart.blue+'text'+asciichart.default)
- Inconsistent scaling: ensure data array contains no NaN or non-numeric values; validate before plotting

CLI Commands:
# Install
npm install asciichart
# Test chart output
node -e "console.log(require('asciichart').plot([0,1,2,3,2,1,0]));"

Expected output:
0.00─╮      
     │  . . 
     │ .   .
 1.00╭     .


## Information Dense Extract
plot(series:number[]|number[][],config?){offset=3,min2;pading='       ';height=auto;format=(x,i)=>pad+x.toFixed(2).slice(-pad.length);colors=[default];return string}
Color constants: blue:'\u001b[34m',green:'\u001b[32m',red,yellow,magenta,cyan,default:'\u001b[39m'
Usage: require('asciichart').plot(data[,config]) or include asciichart.js
Examples: plot(data); plot(data,{height:6}); plot([a,b],{colors:[blue,green]})
Best practices: offset>=2, override format for precision
Troubleshoot: ensure ANSI support, validate numeric arrays

## Sanitised Extract
Table of Contents

1 Installation
2 API Method Signature
3 Configuration Options
4 Usage Examples
5 Color Constants
6 Troubleshooting

1 Installation
Install via npm: npm install asciichart
Include in browser: <script src='asciichart.js'></script>

2 API Method Signature
Function plot(series, config) => string
Arguments:
  series: array of numbers or array of number arrays
  config: object{
    offset: number (min 2)
    padding: string
    height: number
    format: function(x,i) returns string
    colors: array of ANSI code strings
  }

3 Configuration Options
offset: axis left margin, default 3
padding: label padding, default seven spaces
height: chart height in lines, default auto range
format: label formatter, default right-pad to padding length
colors: per-series ANSI color array, default single series default color

4 Usage Examples
Basic:
  plot([15*sin series])
Scale Height:
  plot(series,{height:6})
Auto-range:
  plot(seriesWithoutConfig)
Multi-series:
  plot([seriesA,seriesB],config)
Colored series:
  config.colors=[blue,green,default]

5 Color Constants
blue ''u001b[34m'
green ''u001b[32m'
default ''u001b[39m'
red, yellow, magenta, cyan exist

6 Troubleshooting
- No colors: verify ANSI in terminal
- Labels misaligned: increase offset >=2 or padding length

## Original Source
asciichart: ASCII Charts in JavaScript
https://github.com/kroitor/asciichart

## Digest of ASCIICHART

# asciichart
Date retrieved: 2024-06-20

# Installation

**NodeJS**
```bash
npm install asciichart
```  
**Browser**  
Download or reference `asciichart.js` from npm or GitHub CDN.

# Usage in NodeJS

```javascript
var asciichart = require('asciichart')
var s0 = new Array(120)
for (var i = 0; i < 120; i++)
    s0[i] = 15 * Math.sin(i * ((Math.PI * 4) / 120))
console.log(asciichart.plot(s0))
```

# Usage in Browsers

```html
<script src="asciichart.js"></script>
<script>
 var s0 = Array(120).fill(0).map((_,i)=>15*Math.sin(i*((Math.PI*4)/120)));  
 console.log(asciichart.plot(s0));
</script>
```

# plot Function Signature

> `plot(series, config)`  
- `series`: number[] or number[][]  
- `config` (optional): object with keys `offset`, `padding`, `height`, `format`, `colors`
- Returns: string (ASCII chart)

# Config Options

| Option   | Type                  | Default         | Description                                |
|----------|-----------------------|-----------------|--------------------------------------------|
| offset   | number                | 3               | axis offset from left (min 2)              |
| padding  | string                | '       ' (7)   | label formatting padding string            |
| height   | number                | automatically   | chart height in lines                      |
| format   | function(x,i):string  | default format  | label formatter: returns padded string     |
| colors   | array of ANSI strings | [default]       | per-series ANSI color codes                |

# Examples

## Scale To Desired Height
```javascript
var data = Array(120).fill(0).map((_,i)=>15*Math.cos(i*((Math.PI*8)/120)));  
console.log(asciichart.plot(data,{height:6}));
```

## Auto-range
```javascript
var r = Array(120); r[0]=Math.round(Math.random()*15);
for(var i=1;i<120;i++) r[i]=r[i-1]+Math.round(Math.random()*(Math.random()>0.5?2:-2));
console.log(asciichart.plot(r));
```

## Multiple Series
```javascript
var a=..., b=...; console.log(asciichart.plot([a,b]));
```

## Colors
```javascript
var cfg={colors:[asciichart.blue,asciichart.green,asciichart.default,undefined]};
console.log(asciichart.plot([a,b,c,d],cfg));
```

# Color Constants

- asciichart.blue    : '\u001b[34m'
- asciichart.green   : '\u001b[32m'
- asciichart.default : '\u001b[39m'
- asciichart.red, .yellow, .magenta, .cyan similarly defined

# Troubleshooting

- Ensure terminal supports ANSI: test with `console.log(asciichart.blue + '*' + asciichart.default)`
- If labels overlap, increase `offset` >= 2 or adjust `padding`

----

Attribution: kroitor/asciichart (MIT)
Data Size: 733117 bytes

## Attribution
- Source: asciichart: ASCII Charts in JavaScript
- URL: https://github.com/kroitor/asciichart
- License: MIT
- Crawl Date: 2025-05-10T18:03:01.954Z
- Data Size: 733117 bytes
- Links Found: 5678

## Retrieved
2025-05-10
library/VM_MODULE.md
# library/VM_MODULE.md
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
library/JS_YAML.md
# library/JS_YAML.md
# JS_YAML

## Crawl Summary
load: parses single-doc YAML, options filename:null, onWarning:null, schema:DEFAULT_SCHEMA, json:false. loadAll: parses multi-doc, returns array or applies iterator, same options. dump: serializes JS to YAML string, options indent:2, noArrayIndent:false, skipInvalid:false, flowLevel:-1, styles:{}, schema:DEFAULT_SCHEMA, sortKeys:false, lineWidth:80, noRefs:false, noCompatMode:false, condenseFlow:false, quotingType:'', forceQuotes:false, replacer:null. CLI: js-yaml [-h|-v|-c|-t] file. Supports YAML 1.2 spec, primary tags null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map. Caveats: object keys stringified, no implicit block mapping property read.

## Normalised Extract
Table of Contents:
1. Methods
2. CLI Usage
3. Options Details
4. Styles Map
5. Supported Types
6. Caveats

1. Methods
 load
  Signature: load(string, options)
  Returns: object|string|number|null|undefined
  Throws: YAMLException
  Options:
   filename: string|null (default null)
   onWarning: function(YAMLException)|null (default null)
   schema: FAILSAFE_SCHEMA|JSON_SCHEMA|CORE_SCHEMA|DEFAULT_SCHEMA (default DEFAULT_SCHEMA)
   json: boolean (default false)

 loadAll
  Signature: loadAll(string, iterator, options)
  Returns: array of documents or void when iterator used
  Throws: YAMLException
  Options: same as load

 dump
  Signature: dump(object, options)
  Returns: string
  Throws: YAMLException (unless skipInvalid=true)
  Options:
   indent: number (default 2)
   noArrayIndent: boolean (default false)
   skipInvalid: boolean (default false)
   flowLevel: number (default -1)
   styles: map<tag:string,style:string> (default {})
   schema: DEFAULT_SCHEMA (default)
   sortKeys: boolean|function (default false)
   lineWidth: number (default 80)
   noRefs: boolean (default false)
   noCompatMode: boolean (default false)
   condenseFlow: boolean (default false)
   quotingType: ' or " (default ')
   forceQuotes: boolean (default false)
   replacer: function or null (default null)

2. CLI Usage
 Command: js-yaml [options] file
 Options:
  -h, --help  
  -v, --version
  -c, --compact
  -t, --trace

3. Options Details
 filename: used in messages; onWarning: warning callback; json: JSON.parse-like duplicate key handling

4. Styles Map
 !!null: canonical,lowercase,uppercase,camelcase,empty
 !!int: binary,octal,decimal,hexadecimal
 !!bool: lowercase,uppercase,camelcase
 !!float: lowercase,uppercase,camelcase

5. Supported Types
 null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map

6. Caveats
 object/array keys stringified
 no property read on implicit block mapping keys

## Supplementary Details
Installation and Setup:
- npm install js-yaml
- npm install -g js-yaml for CLI
- require: const yaml = require('js-yaml'); const fs = require('fs');
- Read file: fs.readFileSync(path, 'utf8')

Schemas:
- FAILSAFE_SCHEMA: strings, arrays, objects only
- JSON_SCHEMA: JSON types (null, boolean, number, string, array, object)
- CORE_SCHEMA: alias of JSON_SCHEMA
- DEFAULT_SCHEMA: includes YAML 1.2 types (null,bool,int,float,binary,timestamp,omap,pairs,set)

Implementation Steps:
1. Read YAML source
2. Call yaml.load or yaml.loadAll
3. Handle YAMLException in try/catch
4. Process returned JS object(s)
5. To serialize, call yaml.dump
6. Pass dump options to adjust formatting (indent,lineWidth,styles)

Default Option Values:
indent=2; noArrayIndent=false; skipInvalid=false; flowLevel=-1; schema=DEFAULT_SCHEMA; sortKeys=false; lineWidth=80; noRefs=false; noCompatMode=false; condenseFlow=false; quotingType="'"; forceQuotes=false; replacer=null


## Reference Details
API Specifications:

Function: load(string, options)
Parameters:
 string: YAML source text
 options: {
  filename?: string|null,
  onWarning?: (warn: YAMLException)=>void,
  schema?: Schema,
  json?: boolean
 }
Returns: any (object|string|number|null|undefined)
Throws: YAMLException

Function: loadAll(string, iterator?, options?)
Parameters:
 string: YAML source text
 iterator?: (doc:any)=>void
 options?: same as load
Returns: any[] when iterator omitted; void when iterator provided
Throws: YAMLException

Function: dump(object, options)
Parameters:
 object: JS object to serialize
 options: {
  indent?: number,
  noArrayIndent?: boolean,
  skipInvalid?: boolean,
  flowLevel?: number,
  styles?: { [tag:string]:string },
  schema?: Schema,
  sortKeys?: boolean|((a:string,b:string)=>number),
  lineWidth?: number,
  noRefs?: boolean,
  noCompatMode?: boolean,
  condenseFlow?: boolean,
  quotingType?: '"'|"\'",
  forceQuotes?: boolean,
  replacer?: (key:string,value:any)=>any
 }
Returns: string
Throws: YAMLException

CLI Invocation:
$ js-yaml [options] file
Options and Effects:
 -h, --help       display help
 -v, --version    display version
 -c, --compact    error messages in compact mode
 -t, --trace      include stack trace on error
Exit Codes: 0 on success; 1 on parse error

Code Examples:

// Load example.yml as JS object
const yaml = require('js-yaml');
const fs   = require('fs');
try {
  const input = fs.readFileSync('/path/example.yml','utf8');
  const doc = yaml.load(input, { filename:'/path/example.yml', onWarning:w=>console.warn(w), json:true });
  console.log(doc);
} catch (e) {
  console.error('YAML error:', e.message);
}

// Dump JS object with custom options
const obj = { foo:null, bar:[1,2,3], nested:{a:1,b:2} };
const yamlStr = yaml.dump(obj, { indent:4, sortKeys:true, lineWidth:120, styles:{'!!null':'empty'} });
console.log(yamlStr);

Best Practices:
- Use json:true to handle duplicate keys gracefully
- Enable skipInvalid:true to omit unsupported types during dump
- Use custom styles map to control tag serialization
- Sort keys for predictable output in CI/CD

Troubleshooting:
# Display help
$ js-yaml --help
# Check version
$ js-yaml --version
# Parse with trace on error
$ js-yaml -t bad.yml
Expected output:
Error: unacceptable indentation at line 3, column 5
    at generateError (lib/loader.js:xxx:xx)
    at fail (lib/loader.js:xxx:xx)
# Compact errors
$ js-yaml -c bad.yml
unacceptable indentation at line 3, column 5


## Information Dense Extract
load(string,options): returns JS value or throws YAMLException; options: filename=null,onWarning=null,schema=DEFAULT_SCHEMA,json=false; loadAll(string,iterator,options): same options, returns array if no iterator, else void; dump(object,options): returns YAML string; options: indent=2,noArrayIndent=false,skipInvalid=false,flowLevel=-1,styles={},schema=DEFAULT_SCHEMA,sortKeys=false,lineWidth=80,noRefs=false,noCompatMode=false,condenseFlow=false,quotingType="'",forceQuotes=false,replacer=null; CLI: js-yaml [-h|--help] [-v|--version] [-c|--compact] [-t|--trace] file; Styles: !!null[canonical,lowercase,uppercase,camelcase,empty];!!int[binary,octal,decimal,hexadecimal];!!bool[lowercase,uppercase,camelcase];!!float[lowercase,uppercase,camelcase]; Supported types: null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map; Caveats: object/array keys stringified, implicit block mapping property read unsupported.

## Sanitised Extract
Table of Contents:
1. Methods
2. CLI Usage
3. Options Details
4. Styles Map
5. Supported Types
6. Caveats

1. Methods
 load
  Signature: load(string, options)
  Returns: object|string|number|null|undefined
  Throws: YAMLException
  Options:
   filename: string|null (default null)
   onWarning: function(YAMLException)|null (default null)
   schema: FAILSAFE_SCHEMA|JSON_SCHEMA|CORE_SCHEMA|DEFAULT_SCHEMA (default DEFAULT_SCHEMA)
   json: boolean (default false)

 loadAll
  Signature: loadAll(string, iterator, options)
  Returns: array of documents or void when iterator used
  Throws: YAMLException
  Options: same as load

 dump
  Signature: dump(object, options)
  Returns: string
  Throws: YAMLException (unless skipInvalid=true)
  Options:
   indent: number (default 2)
   noArrayIndent: boolean (default false)
   skipInvalid: boolean (default false)
   flowLevel: number (default -1)
   styles: map<tag:string,style:string> (default {})
   schema: DEFAULT_SCHEMA (default)
   sortKeys: boolean|function (default false)
   lineWidth: number (default 80)
   noRefs: boolean (default false)
   noCompatMode: boolean (default false)
   condenseFlow: boolean (default false)
   quotingType: ' or ' (default ')
   forceQuotes: boolean (default false)
   replacer: function or null (default null)

2. CLI Usage
 Command: js-yaml [options] file
 Options:
  -h, --help  
  -v, --version
  -c, --compact
  -t, --trace

3. Options Details
 filename: used in messages; onWarning: warning callback; json: JSON.parse-like duplicate key handling

4. Styles Map
 !!null: canonical,lowercase,uppercase,camelcase,empty
 !!int: binary,octal,decimal,hexadecimal
 !!bool: lowercase,uppercase,camelcase
 !!float: lowercase,uppercase,camelcase

5. Supported Types
 null,bool,int,float,binary,timestamp,omap,pairs,set,str,seq,map

6. Caveats
 object/array keys stringified
 no property read on implicit block mapping keys

## Original Source
js-yaml Usage Guide
https://github.com/nodeca/js-yaml#readme

## Digest of JS_YAML

# js-yaml API (Retrieved: 2024-06-15)

# load (string [, options])
Parses a YAML string as a single document. Returns a JavaScript value or throws YAMLException on error.

Signature:
```js
load(string, options)
```
Returns: object | string | number | null | undefined
Throws: YAMLException

Options:
- filename (string|null, default: null): file path for error/warning messages
- onWarning (function(YAMLException)|null, default: null): invoked on each warning
- schema (Schema, default: DEFAULT_SCHEMA): YAML schema to apply
  - FAILSAFE_SCHEMA: only strings, arrays, plain objects
  - JSON_SCHEMA: JSON types support
  - CORE_SCHEMA: alias of JSON_SCHEMA
  - DEFAULT_SCHEMA: all YAML 1.2 types
- json (boolean, default: false): duplicate keys override values instead of error

# loadAll (string [, iterator] [, options])
Parses multi-document YAML source. If iterator provided, invokes iterator(doc) per document; otherwise returns an array of documents.

Signature:
```js
loadAll(string, iterator, options)
```
Returns: void | Array<any>
Throws: YAMLException

Options: same as load

# dump (object [, options])
Serializes a JavaScript object into a YAML document string.

Signature:
```js
dump(object, options)
```
Returns: string
Throws: YAMLException if invalid types encountered unless skipInvalid=true

Options:
- indent (number, default: 2): indentation width in spaces
- noArrayIndent (boolean, default: false): no extra indent on array elements
- skipInvalid (boolean, default: false): skip invalid types instead of throwing
- flowLevel (number, default: -1): nesting level to switch to flow style (-1 = block always)
- styles (object[tag:string]=>style:string, default: {}): per-tag style overrides
- schema (Schema, default: DEFAULT_SCHEMA)
- sortKeys (boolean|function, default: false): sort mapping keys or custom sort function
- lineWidth (number, default: 80): maximum line width (-1 = unlimited)
- noRefs (boolean, default: false): disable object reference anchors
- noCompatMode (boolean, default: false): disable legacy YAML 1.1 compatibility (no quoting of yes/no)
- condenseFlow (boolean, default: false): condense flow sequences and mappings
- quotingType ("'"|"\"", default: "'"): style for quoting strings
- forceQuotes (boolean, default: false): quote all non-key strings
- replacer (function(key:string, value:any), default: null): JSON.stringify-style replacer

# CLI Executable
Usage: js-yaml [options] file
Options:
- -h, --help: show help and exit
- -v, --version: show version and exit
- -c, --compact: compact error output
- -t, --trace: include stack trace on error

# Styles Table
Lists available output styles per YAML tag:

!!null: canonical("~"), lowercase("null"), uppercase("NULL"), camelcase("Null"), empty("")
!!int: binary(0b...), octal(0o...), decimal(1,42,...), hexadecimal(0x...)
!!bool: lowercase(true,false), uppercase(TRUE,FALSE), camelcase(True,False)
!!float: lowercase(.nan,.inf), uppercase(.NAN,.INF), camelcase(.NaN,.Inf)

# Supported YAML Types
Tag => JS type
!!null => null
!!bool => boolean
!!int => number
!!float => number
!!binary => Buffer
!!timestamp => Date
!!omap => Array<[key,value]>
!!pairs => Array<[key,value]>
!!set => Array of {key:null}
!!str => string
!!seq => Array
!!map => Object

# Caveats
- Arrays or objects used as mapping keys are stringified via toString().
- Implicit block mapping keys do not support property reading.
- Duplicate anchor keys in block mapping are not currently supported.

## Attribution
- Source: js-yaml Usage Guide
- URL: https://github.com/nodeca/js-yaml#readme
- License: MIT
- Crawl Date: 2025-05-10T23:01:39.778Z
- Data Size: 656176 bytes
- Links Found: 4983

## Retrieved
2025-05-10
library/EXPRESS_ROUTING.md
# library/EXPRESS_ROUTING.md
# EXPRESS_ROUTING

## Crawl Summary
Application methods app.METHOD(path, ...handlers) signature returns Application. Supported methods: get, post, put, delete, patch, options, head, all, use. Route path can be string, array, RegExp, array. Named parameters :name with optional (regex). Handler signature (req, res, next). express.Router(options) options: caseSensitive false, mergeParams false, strict false. app.route(path) chainable methods. Response methods and signatures as listed.

## Normalised Extract
Table of Contents
1 Route Definition
2 Route Methods
3 Route Paths
4 Route Parameters
5 Route Handlers
6 Response Methods
7 app.route
8 express.Router

1 Route Definition
app.METHOD(path, ...handlers)    METHOD from get, post, put, delete, patch, options, head, all, use    returns Application instance

2 Route Methods
Signature
Application.METHOD(path: string|string[]|RegExp|RegExp[], ...handlers: RequestHandler[]): Application

3 Route Paths
Types
string exact match
string pattern (?, +, *, parentheses)
RegExp literal
Examples
app.get('/about', handler)
app.get('/ab?cd', handler)
app.get(/.*fly$/, handler)

4 Route Parameters
Syntax
:/paramName
With regex constraint
:(\w+)(regex)
Example
app.get('/users/:userId(\d+)', (req, res) => res.send(req.params))
Access req.params.userId

5 Route Handlers
Signature
RequestHandler = (req: Request, res: Response, next: NextFunction) => void
Forms
single function
array of functions
combination of functions and arrays
Examples
app.get('/example/a', handlerA)
app.get('/example/b', preflight, handlerB)
app.get('/example/c', [cb0, cb1, cb2])

6 Response Methods
res.download(path[, filename][, options][, fn])
res.end([data][, encoding])
res.json(body)
res.jsonp(body)
res.redirect([status,] path)
res.render(view[, locals][, callback])
res.send(body)
res.sendFile(path[, options][, fn])
res.sendStatus(statusCode)

7 app.route
Chainable handlers on a single path
app.route('/book')
  .get(getHandler)
  .post(postHandler)
  .put(putHandler)

8 express.Router
Signature
express.Router([options]) -> Router
Options
type RouterOptions = {
  caseSensitive?: boolean  default false
  mergeParams?: boolean    default false
  strict?: boolean         default false
}
Example
const router = express.Router({ mergeParams: true })
router.use(timeLog)
router.get('/', homeHandler)
router.get('/about', aboutHandler)
module.exports = router
app.use('/birds', router)

## Supplementary Details
RouterOptions default values: caseSensitive false, mergeParams false, strict false. When nesting routers under paths with parameters, set mergeParams true to preserve req.params from parent. Mounting order: app.use(middleware) before routes. Multiple static directories: app.use(express.static('public')); app.use(express.static('files')). Virtual path prefix: app.use('/static', express.static(path.join(__dirname, 'public'))).
Use reverse proxy cache for static assets performance.
Error-handling middleware signature: (err, req, res, next) with four arguments.
404 handler placement: app.use((req, res) => res.status(404).send("Not found")) at bottom.


## Reference Details
Application Methods
app.get(path, ...handlers)
app.post(path, ...handlers)
app.put(path, ...handlers)
app.delete(path, ...handlers)
app.patch(path, ...handlers)
app.options(path, ...handlers)
app.head(path, ...handlers)
app.all(path, ...handlers)
app.use([path], ...handlers)
Signature
(path: string|string[]|RegExp|RegExp[], ...handlers: RequestHandler[]) => Application

RequestHandler and NextFunction
type RequestHandler = (req: Request, res: Response, next: NextFunction) => void
type NextFunction = (err?: any) => void

Response methods
res.download(path: string, filename?: string, options?: object, callback?: (err: any) => void): void
res.end(data?: any, encoding?: string): void
res.json(body: any): void
res.jsonp(body: any): void
res.redirect(statusOrPath: number|string, path?: string): void
res.render(view: string, locals?: object, callback?: (err: any, html: string) => void): void
res.send(body: any): void
res.sendFile(path: string, options?: { root?: string; headers?: object; dotfiles?: string; maxAge?: number|string }, callback?: (err: any) => void): void
res.sendStatus(statusCode: number): void

express.Router
Signature
express.Router(options?: { caseSensitive?: boolean; mergeParams?: boolean; strict?: boolean }): Router
Router.METHOD same as app.METHOD on Router instance

Example Implementation Pattern
1 mkdir myapp && cd myapp
2 npm init -y
3 npm install express
4 Create app.js with:
   const express = require('express')
   const app = express()
   app.use(express.json())
   const birdsRouter = require('./birds')
   app.use('/birds', birdsRouter)
   app.listen(3000)
5 Create birds.js:
   const express = require('express')
   const router = express.Router({ mergeParams: true })
   router.use((req, res, next) => { console.log(Date.now()); next() })
   router.get('/', (req, res) => res.send('Home'))
   router.get('/:id', (req, res) => res.json({ id: req.params.id }))
   module.exports = router

Best Practices
Place error-handling middleware after all routes. Use caseSensitive and strict routing when exact matching required. Use express.json() before routes for JSON parsing. Use next('route') to skip to next matching route.

Troubleshooting
Problem: Route not matched
Command: curl -i http://localhost:3000/unknown
Expected: HTTP/1.1 404 Not Found
Actual: hangs
Check: 404 handler placement, missing next()

Problem: req.params empty
Check mergeParams option if nested router under params path.


## Information Dense Extract
app.METHOD(path: string|string[]|RegExp|RegExp[], ...handlers: RequestHandler[]) => Application Supported METHODS get post put delete patch options head all use. RequestHandler(req: Request,res: Response,next: NextFunction). Route path types string exact, string pattern (?,+,*,()), RegExp. Params :name or :name(regex). Access req.params.name. express.Router(options:{caseSensitive?:boolean,mergeParams?:boolean,strict?:boolean}) returns Router. Response methods download(path,filename?,options?,cb?),end(data?,enc?),json(body),jsonp(body),redirect(statusOrPath,path?),render(view,locals?,cb?),send(body),sendFile(path,options?,cb?),sendStatus(statusCode). app.route(path).get(...).post(...).put(...). Error handler signature(err,req,res,next). 404 handler: placement at bottom. Best practices: mergeParams for nested, express.json() before routes, next('route') skip handlers. Troubleshooting: verify handler order and path matching.

## Sanitised Extract
Table of Contents
1 Route Definition
2 Route Methods
3 Route Paths
4 Route Parameters
5 Route Handlers
6 Response Methods
7 app.route
8 express.Router

1 Route Definition
app.METHOD(path, ...handlers)    METHOD from get, post, put, delete, patch, options, head, all, use    returns Application instance

2 Route Methods
Signature
Application.METHOD(path: string|string[]|RegExp|RegExp[], ...handlers: RequestHandler[]): Application

3 Route Paths
Types
string exact match
string pattern (?, +, *, parentheses)
RegExp literal
Examples
app.get('/about', handler)
app.get('/ab?cd', handler)
app.get(/.*fly$/, handler)

4 Route Parameters
Syntax
:/paramName
With regex constraint
:('w+)(regex)
Example
app.get('/users/:userId('d+)', (req, res) => res.send(req.params))
Access req.params.userId

5 Route Handlers
Signature
RequestHandler = (req: Request, res: Response, next: NextFunction) => void
Forms
single function
array of functions
combination of functions and arrays
Examples
app.get('/example/a', handlerA)
app.get('/example/b', preflight, handlerB)
app.get('/example/c', [cb0, cb1, cb2])

6 Response Methods
res.download(path[, filename][, options][, fn])
res.end([data][, encoding])
res.json(body)
res.jsonp(body)
res.redirect([status,] path)
res.render(view[, locals][, callback])
res.send(body)
res.sendFile(path[, options][, fn])
res.sendStatus(statusCode)

7 app.route
Chainable handlers on a single path
app.route('/book')
  .get(getHandler)
  .post(postHandler)
  .put(putHandler)

8 express.Router
Signature
express.Router([options]) -> Router
Options
type RouterOptions = {
  caseSensitive?: boolean  default false
  mergeParams?: boolean    default false
  strict?: boolean         default false
}
Example
const router = express.Router({ mergeParams: true })
router.use(timeLog)
router.get('/', homeHandler)
router.get('/about', aboutHandler)
module.exports = router
app.use('/birds', router)

## Original Source
Express Official Documentation
https://expressjs.com/

## Digest of EXPRESS_ROUTING

# Routing
Content retrieved on 2024-06-20
Source: https://expressjs.com/
Data Size: 7337000 bytes, Links Found: 17570

Define application endpoints and HTTP methods with express Application methods.

## Route Methods

Signature:

Application.METHOD(path, ...handlers) -> Application

Supported METHODS: get, post, put, delete, patch, options, head, all, use

## Route Paths

Accepts string, array of strings, RegExp, array of RegExp.

Examples:

app.get('/about', handler)
app.get('/ab?cd', handler)
app.get(/.*fly$/, handler)

## Route Parameters

Syntax: named segments :paramName, optional regex constraint in parentheses.

Example:

app.get('/users/:userId(\d+)', handler)
Values accessed via req.params.userId

## Route Handlers

Signature of each handler:

(req: Request, res: Response, next: NextFunction) => void

Accepts single function, array of functions, or combination.

## Response Methods

res.download(path[, filename][, options][, callback])
res.end([data][, encoding])
res.json(body)
res.jsonp(body)
res.redirect([status,] path)
res.render(view[, locals][, callback])
res.send(body)
res.sendFile(path[, options][, callback])
res.sendStatus(statusCode)

## app.route()

Chainable route handlers for a single path:

app.route('/book')
  .get(getHandler)
  .post(postHandler)
  .put(putHandler)

## express.Router

Signature:

express.Router([options]) -> Router instance

Options:
  caseSensitive: boolean (default false)
  mergeParams: boolean (default false)
  strict: boolean (default false)

Usage:

const router = express.Router({ mergeParams: true })
router.use(middleware)
router.get('/', handler)
module.exports = router

app.use('/path', router)


## Attribution
- Source: Express Official Documentation
- URL: https://expressjs.com/
- License: License: MIT
- Crawl Date: 2025-05-10T12:01:30.750Z
- Data Size: 7337000 bytes
- Links Found: 17570

## Retrieved
2025-05-10
library/SUPERTEST.md
# library/SUPERTEST.md
# SUPERTEST

## Crawl Summary
Installation via npm. Initialize request(appOrUrl,options) or agent(appOrUrl,options). Chain HTTP verb methods: .get/.post/.put/.delete/.patch/.head/.options. Chain modifiers: .send, .set, .auth, .field, .attach, .query, .timeout. Use .expect overloads: status, body, header, custom fn. Finalize with .end(callback). Promise, async/await support. HTTP/2 via {http2:true}. Agent persists cookies. Response mutation via custom .expect(fn).

## Normalised Extract
Table of Contents
1 Installation
2 Initialization
3 HTTP Methods
4 Request Modifiers
5 Expectations
6 Completion
7 Promise / Async Support
8 Custom Assertions
9 Cookie Persistence

1 Installation
Install SuperTest as dev dependency: npm install supertest --save-dev

2 Initialization
const request= require('supertest');
const requestH2= request(app,{http2:true});
const agent= request.agent(app);
const agentH2= request.agent(app,{http2:true});

3 HTTP Methods
.get(path)  .post(path)  .put(path)  .delete(path)  .patch(path)  .head(path)  .options(path)
Returns Test object.

4 Request Modifiers
.send(body)      // JSON, form
.set(name,value) // headers
.auth(user,pass,options) // basic, bearer
.field(name,value,opts) // multipart field
.attach(name,fileOrBuffer,opts) // file upload
.query(params)   // URL query
.timeout(value)  // ms or {response,deadline}

5 Expectations
.expect(status[,callback])
.expect(status,body[,callback])
.expect(body[,callback])     // string, regex, object
.expect(field,value[,callback])
.expect(fn)                 // custom transform/assert
Returns Test.

6 Completion
.end(callback(err,res))  // invoke request

7 Promise / Async Support
Any Test supports then(callback) returning Promise.

8 Custom Assertions
Use .expect(fn) to mutate res before other expects.

9 Cookie Persistence
Use agent = request.agent(app) to persist cookies between calls.

## Supplementary Details
Initialization options:
- http2: boolean (default false). Enables HTTP/2 for request or agent.
- agent: persistent cookie jar and header storage.

.send(body)
- Accepts JS Object: sets Content-Type: application/json and JSON stringify.
- Accepts string: sends raw body.

.auth(username,password,options)
- options.type: 'basic' | 'bearer' (default basic).

.multi-part uploads:
.field(name,value,{contentType}) // default text/plain
.attach(field,pathOrBuffer,{filename,contentType})

.timeout(msOrObject)
- number: socket and response timeout.
- object: {response: ms, deadline: ms}


## Reference Details
API Signatures and Return Types

function request(appOrUrl: http.Server|Function|string, options?:{http2?:boolean}): Test
function agent(appOrUrl: http.Server|Function|string, options?:{http2?:boolean}): Agent

Class Test extends superagent.Request:

.get(path: string): Test
.post(path: string): Test
.put(path: string): Test
.delete(path: string): Test
.patch(path: string): Test
.head(path: string): Test
.options(path: string): Test
.send(body: Object|string): Test
.set(field: string, value: string): Test
.query(params: Object|string): Test
.auth(username: string, password: string, options?:{type?:string}): Test
.field(name: string, value: string, options?:{contentType?:string}): Test
.attach(field: string, pathOrBuffer: string|Buffer, options?:{filename?:string, contentType?:string}): Test
.timeout(timeout: number|{response?:number, deadline?:number}): Test
.expect(status: number, fn?: (res: Response)=>void): Test
.expect(status: number, body: any, fn?: (res: Response)=>void): Test
.expect(body: string|RegExp|Object, fn?: (res: Response)=>void): Test
.expect(field: string, value: string|RegExp, fn?: (res: Response)=>void): Test
.expect(fn: (res: Response)=>void): Test
.end(fn: (err: Error|null, res: Response)=>void): void
.then(onFulfilled: (res: Response)=>any, onRejected?: (err:any)=>any): Promise<any>
.catch(onRejected: (err:any)=>any): Promise<any>

Configuration Options and Effects
- {http2:true}: uses HTTP/2 API of superagent.
- agent(): persists cookies and header state per Domain/Path.

Implementation Patterns
1 Standard GET
request(app)
  .get('/user')
  .set('Accept','application/json')
  .expect('Content-Type',/json/)
  .expect(200)
  .end(cb);

2 POST with JSON
request(app)
  .post('/users')
  .send({name:'john'})
  .set('Accept','application/json')
  .expect(200)
  .end((err,res)=>{ if(err) return done(err); done(); });

3 Using promises
return request(app)
  .get('/users')
  .expect(200)
  .then(res=>{ expect(res.body.id).toBeDefined(); });

4 Async/Await
const res = await request(app).get('/users');
expect(res.status).toBe(200);

Best Practices
- Always include status in .expect to catch errors correctly.
- Use agent() for multi-request workflows requiring session/cookies.
- Chain .expect(fn) before status/body assertions for response mutation.

Troubleshooting
Error: AssertionError
- Occurs when .expect fails and .end is used without rethrow.
- Fix: in .end, if(err) return done(err).

Error: socket hang up
- Occurs when server does not respond within default timeout.
- Fix: set .timeout({response:5000,deadline:10000}).

Expected content-type 'application/json' but got 'text/html'
- Ensure .set('Accept','application/json').


## Information Dense Extract
install supertest via npm. const request=require('supertest'); request(app[,{http2:true}]); agent(app[,{http2:true}]). Test methods: .get/.post/.put/.delete/.patch/.head/.options(path):Test. Modifiers: .send(body:Object|String)->JSON, .set(header,value), .auth(user,pass,{type:'basic'|'bearer'}), .field/attach for multipart, .query(params), .timeout(ms|{response,deadline}). Expectations overloads: .expect(status[,fn]), .expect(status,body[,fn]), .expect(body[,fn]), .expect(field,value[,fn]), .expect(fn). Finalize: .end(callback(err,res)). Promises: .then/.catch. Async/await. Options: http2 enables HTTP/2. Agent persists cookies. Custom assert via .expect(fn). Common patterns: GET, POST JSON, file upload, cookie tests. Troubleshooting: use .timeout(), include status in .expect, handle errors in .end callback.

## Sanitised Extract
Table of Contents
1 Installation
2 Initialization
3 HTTP Methods
4 Request Modifiers
5 Expectations
6 Completion
7 Promise / Async Support
8 Custom Assertions
9 Cookie Persistence

1 Installation
Install SuperTest as dev dependency: npm install supertest --save-dev

2 Initialization
const request= require('supertest');
const requestH2= request(app,{http2:true});
const agent= request.agent(app);
const agentH2= request.agent(app,{http2:true});

3 HTTP Methods
.get(path)  .post(path)  .put(path)  .delete(path)  .patch(path)  .head(path)  .options(path)
Returns Test object.

4 Request Modifiers
.send(body)      // JSON, form
.set(name,value) // headers
.auth(user,pass,options) // basic, bearer
.field(name,value,opts) // multipart field
.attach(name,fileOrBuffer,opts) // file upload
.query(params)   // URL query
.timeout(value)  // ms or {response,deadline}

5 Expectations
.expect(status[,callback])
.expect(status,body[,callback])
.expect(body[,callback])     // string, regex, object
.expect(field,value[,callback])
.expect(fn)                 // custom transform/assert
Returns Test.

6 Completion
.end(callback(err,res))  // invoke request

7 Promise / Async Support
Any Test supports then(callback) returning Promise.

8 Custom Assertions
Use .expect(fn) to mutate res before other expects.

9 Cookie Persistence
Use agent = request.agent(app) to persist cookies between calls.

## Original Source
SuperTest HTTP Assertions
https://github.com/visionmedia/supertest

## Digest of SUPERTEST

# SuperTest HTTP Assertions
Date Retrieved: 2024-06-22
Data Size: 661757 bytes

## Installation

Install via npm as a development dependency:

```
npm install supertest --save-dev
```

## Initialization

Require and initialize SuperTest with an HTTP server instance, Express app, or URL string. Optionally enable HTTP/2:

```js
const request = require('supertest');              // default HTTP/1.x
const requestH2 = require('supertest')(app, {http2:true});
const agent = require('supertest').agent(app);      // persistent cookies
const agentH2 = require('supertest').agent(app, {http2:true});
``` 

## Core Test Methods and Signatures

### request(appOrUrl: Server|Function|string, options?: {http2?: boolean}): Test
Binds server to an ephemeral port if not already listening.

### agent(appOrUrl: Server|Function|string, options?: {http2?: boolean}): Agent
Persists cookies and headers across multiple requests.

### HTTP verb methods inherited from superagent
```
.get(path: string): Test
.post(path: string): Test
.put(path: string): Test
.delete(path: string): Test
.patch(path: string): Test
.head(path: string): Test
.options(path: string): Test
``` 

### Chainable request modifiers
```
.send(body: Object|string): Test            // JSON or form data
.set(field: string, value: string): Test      // request headers
.auth(username: string, password: string, options?: {type?:string}): Test
.field(name: string, value: string, options?:{contentType?:string}): Test  // multipart
.attach(field: string, pathOrBuffer: string|Buffer, options?:{filename?:string, contentType?:string}): Test
.query(params: Object|string): Test
.timeout(ms: number|Object): Test
``` 

### Expectations
```
.expect(status: number, fn?: (res: Response)=>void): Test
.expect(status: number, body: any, fn?: (res: Response)=>void): Test
.expect(body: string|RegExp|Object, fn?: (res: Response)=>void): Test
.expect(field: string, value: string|RegExp, fn?: (res: Response)=>void): Test
.expect(fn: (res: Response)=>void): Test
``` 

### Finalizing request
```
.end(fn: (err: Error|null, res: Response)=>void): void  // callback style
``` 

## Promises and Async/Await

Promise support:
```js
return request(app)
  .get('/users')
  .expect(200)
  .then(response => {
    expect(response.body).toMatchObject({email:'foo@bar.com'});
  });
```

Async/await support:
```js
const response = await request(app)
  .get('/users')
  .set('Accept','application/json');
expect(response.status).toBe(200);
expect(response.body.email).toBe('foo@bar.com');
```

## Custom Assertions and Response Mutations

Use function assertion to transform response before comparing:
```js
.expect(res=>{
  res.body.id = 'fixed';
  res.body.name = res.body.name.toLowerCase();
})
.expect(200, {id:'fixed',name:'john'}, done);
```

## Cookie Persistence with Agent
```js
const agent = request.agent(app);
agent.get('/')
  .expect('set-cookie','session=abc; Path=/')
  .end(err=>{});
agent.get('/profile')
  .expect(200, done);
```


## Attribution
- Source: SuperTest HTTP Assertions
- URL: https://github.com/visionmedia/supertest
- License: MIT
- Crawl Date: 2025-05-11T00:01:01.169Z
- Data Size: 661757 bytes
- Links Found: 5354

## Retrieved
2025-05-11
library/OPENAPI_3_1.md
# library/OPENAPI_3_1.md
# OPENAPI_3_1

## Crawl Summary
Versioning: openapi field (string) MUST use major.minor.patch. Root Object: required fields openapi, info, paths; optional servers, components, security, tags, externalDocs. Info: title and version required. Server: url with template variables, description, variables (enum, default, description). Path templating: use {param}, match to path parameters, no unescaped reserved chars. Parameter Object: name,in,style,explode,required,deprecated,allowEmptyValue,allowReserved,schema or content, examples. RequestBody: description, content (one media-type), required. Responses: map status codes to Response Objects. Response: description, headers, content, links. SecuritySchemes: types apiKey, http, oauth2, openIdConnect with required fields. OAuthFlows: implicit,authorizationCode,password,clientCredentials with flow objects. Schema: JSON Schema Draft 2020-12 superset, properties for composition, inheritance, XML modeling, dialects, deprecated.

## Normalised Extract
Table of Contents
1. Versioning
2. Root Object
3. Info
4. Servers
5. Path Templating
6. Parameters
7. Request Bodies
8. Responses
9. Security Schemes
10. Schema Objects

1. Versioning
openapi: string, format major.minor.patch, required at root, tooling ignores patch

2. Root Object
Fields:
  openapi: string (REQUIRED)
  info: Info Object (REQUIRED)
  servers: [Server Object] (default [{url:'/'}])
  paths: <string, Path Item | Reference> (REQUIRED)
  components: Components Object
  security: [SecurityRequirement]
  tags: [Tag]
  externalDocs: ExternalDoc

3. Info
Fields:
  title: string (REQUIRED)
  version: string (REQUIRED)
  description: string
  termsOfService: URL
  contact: Contact Object
  license: License Object

4. Servers
Fields:
  url: string with {variable} templates (REQUIRED)
  description: string
  variables: map<name, ServerVariable>

5. Path Templating
Rules:
  template syntax: /path/{param}
  each {param} must map to path parameter definition
  characters '/', '?', '#' must be percent-encoded

6. Parameters
Fields:
  name, in (path/query/header/cookie), required, style, explode, deprecated, allowEmptyValue, allowReserved , schema or content
Serialization:
  style values: matrix, label, form, simple, spaceDelimited, pipeDelimited, deepObject
  explode controls delimiter behavior

7. Request Bodies
Fields:
  description, content map<mediaType, MediaTypeObj>, required

8. Responses
Map<statusCode|'default', Response Obj>
Response:
  description (REQUIRED), headers, content, links

9. Security Schemes
Types:
  apiKey: in, name
  http: scheme, bearerFormat
  oauth2: flows
  openIdConnect: openIdConnectUrl

10. Schema
Conforms to JSON Schema 2020-12, adds:
  discriminator, xml, externalDocs, deprecated
Supports composition: allOf, oneOf, anyOf, not; formats: int32,int64,float,double,byte,binary,date,dateTime,password


## Supplementary Details
OpenAPI CLI Validation:
- Install: npm install -g @openapitools/openapi-generator-cli
- Validate: openapi validate -i openapi.yaml
- Output: OK or error messages pointing to line numbers

Tooling Best Practices:
- Name root document openapi.json or openapi.yaml
- Use YAML 1.2 Failsafe profile: keys are strings, tags limited to JSON Schema
- Always specify server variables enum and default
- For path parameters, always set required: true
- Prefer form+explode=true for query arrays

Reference Resolution:
- Relative URIs resolved per RFC3986, base document URI
- $ref resolution: JSON Pointer per RFC6901

Version Compatibility:
- Tools supporting 3.1 must accept all 3.1.*; ignore patch
- Minor non-backwards changes may occur; test critical flows when upgrading


## Reference Details
# Object Schemas

## OpenAPI Object
```json
{
  "type": "object",
  "required": ["openapi","info","paths"],
  "properties": {
    "openapi": {"type":"string","pattern":"^[0-9]+\\.[0-9]+\\.[0-9]+$"},
    "info": {"$ref":"#/components/schemas/InfoObject"},
    "servers": {"type":"array","items":{"$ref":"#/components/schemas/ServerObject"}},
    "paths": {"$ref":"#/components/schemas/PathsObject"},
    "components": {"$ref":"#/components/schemas/ComponentsObject"},
    "security": {"type":"array","items":{"$ref":"#/components/schemas/SecurityRequirementObject"}},
    "tags": {"type":"array","items":{"$ref":"#/components/schemas/TagObject"}},
    "externalDocs": {"$ref":"#/components/schemas/ExternalDocumentationObject"}
  }
}
```

## Info Object
```json
{
  "type": "object",
  "required": ["title","version"],
  "properties": {
    "title": {"type":"string"},
    "version": {"type":"string"},
    "description": {"type":"string"},
    "termsOfService": {"type":"string","format":"uri"},
    "contact": {"$ref":"#/components/schemas/ContactObject"},
    "license": {"$ref":"#/components/schemas/LicenseObject"}
  }
}
```

## Parameter Object
```json
{
  "type": "object",
  "required": ["name","in"],
  "properties": {
    "name": {"type":"string"},
    "in": {"type":"string","enum":["query","header","path","cookie"]},
    "required": {"type":"boolean","default":false},
    "deprecated": {"type":"boolean","default":false},
    "allowEmptyValue": {"type":"boolean","default":false},
    "style": {"type":"string"},
    "explode": {"type":"boolean"},
    "allowReserved": {"type":"boolean"},
    "schema": {"$ref":"#/components/schemas/SchemaObject"},
    "content": {"type":"object"},
    "example": {},
    "examples": {"type":"object"}
  }
}
```

## RequestBody Object
```json
{
  "type": "object",
  "properties": {
    "description": {"type":"string"},
    "content": {"type":"object","minProperties":1},
    "required": {"type":"boolean","default":false}
  }
}
```

## Response Object
```json
{
  "type": "object",
  "required": ["description"],
  "properties": {
    "description": {"type":"string"},
    "headers": {"type":"object"},
    "content": {"type":"object"},
    "links": {"type":"object"}
  }
}
```

## SecurityScheme Object
```json
{
  "type": "object",
  "required": ["type"],
  "properties": {
    "type": {"type":"string","enum":["apiKey","http","oauth2","openIdConnect"]},
    "name": {"type":"string"},
    "in": {"type":"string","enum":["query","header","cookie"]},
    "scheme": {"type":"string"},
    "bearerFormat": {"type":"string"},
    "flows": {"$ref":"#/components/schemas/OAuthFlowsObject"},
    "openIdConnectUrl": {"type":"string","format":"uri"}
  }
}
```

# Code Examples

### Minimal OpenAPI 3.1 YAML
```yaml
openapi: "3.1.0"
info:
  title: "Sample API"
  version: "1.0.0"
paths:
  /pets/{petId}:
    get:
      operationId: getPetById
      parameters:
        - name: petId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
components:
  schemas:
    Pet:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
```

# Troubleshooting

1. Invalid path parameter:
   Command: openapi validate -i api.yaml
   Error: "Missing required path parameter 'petId' in path '/pets/{petId}'"
2. YAML parse error:
   Expected: proper indentation
   Fix: ensure two-space indent for nested levels
3. $ref resolution:
   Error: "Unresolved reference '#/components/schemas/Unknown'"
   Fix: define schema under components/schemas


## Information Dense Extract
openapi: string(major.minor.patch) required; info.title(string) required; info.version(string) required; servers: [{url:string,variables:{name:{enum:[string],default:string,description:string}}]; paths:{'<path>':PathItem|Ref}; components:{schemas,responses,parameters,examples,headers,requestBodies,callbacks,links,securitySchemes,headers,pathItems}; security:[{<scheme>:[]}]; tags:[{name:string,description:string}]; externalDocs:{description:string,url:string}. PathItem:get,put,post,delete,options,head,patch,trace,parameters:[Parameter|Ref],servers:[Server]. Parameter:name:string,in:enum;required:boolean;style:string;explode:boolean;schema:Schema|content:{<mediaType>:MediaType}. MediaType:schema:Schema,examples,encoding. RequestBody:content:{mediaType:MediaType},required:boolean. Responses:{statusCode:{description:string,headers:{},content:{mediaType:MediaType},links:{}}}. Schema:JSONSchema2020-12 superset;properties,type,required,format,allOf,oneOf,anyOf,not,$ref,discriminator,xml,deprecated. SecurityScheme:type:enum;apiKey(name,in),http(scheme,bearerFormat),oauth2(flows:{implicit,authorizationCode,password,clientCredentials}),openIdConnect(openIdConnectUrl). OAuthFlow:{authorizationUrl,tokenUrl,refreshUrl,scopes:{key:value}}. Validation: openapi validate -i file. Best practices: yaml failsafe, default server '/', percent-encode reserved chars in path values, set required:true for path params, prefer form+explode for arrays.

## Sanitised Extract
Table of Contents
1. Versioning
2. Root Object
3. Info
4. Servers
5. Path Templating
6. Parameters
7. Request Bodies
8. Responses
9. Security Schemes
10. Schema Objects

1. Versioning
openapi: string, format major.minor.patch, required at root, tooling ignores patch

2. Root Object
Fields:
  openapi: string (REQUIRED)
  info: Info Object (REQUIRED)
  servers: [Server Object] (default [{url:'/'}])
  paths: <string, Path Item | Reference> (REQUIRED)
  components: Components Object
  security: [SecurityRequirement]
  tags: [Tag]
  externalDocs: ExternalDoc

3. Info
Fields:
  title: string (REQUIRED)
  version: string (REQUIRED)
  description: string
  termsOfService: URL
  contact: Contact Object
  license: License Object

4. Servers
Fields:
  url: string with {variable} templates (REQUIRED)
  description: string
  variables: map<name, ServerVariable>

5. Path Templating
Rules:
  template syntax: /path/{param}
  each {param} must map to path parameter definition
  characters '/', '?', '#' must be percent-encoded

6. Parameters
Fields:
  name, in (path/query/header/cookie), required, style, explode, deprecated, allowEmptyValue, allowReserved , schema or content
Serialization:
  style values: matrix, label, form, simple, spaceDelimited, pipeDelimited, deepObject
  explode controls delimiter behavior

7. Request Bodies
Fields:
  description, content map<mediaType, MediaTypeObj>, required

8. Responses
Map<statusCode|'default', Response Obj>
Response:
  description (REQUIRED), headers, content, links

9. Security Schemes
Types:
  apiKey: in, name
  http: scheme, bearerFormat
  oauth2: flows
  openIdConnect: openIdConnectUrl

10. Schema
Conforms to JSON Schema 2020-12, adds:
  discriminator, xml, externalDocs, deprecated
Supports composition: allOf, oneOf, anyOf, not; formats: int32,int64,float,double,byte,binary,date,dateTime,password

## Original Source
OpenAPI 3.1 Specification
https://spec.openapis.org/oas/v3.1.0.html

## Digest of OPENAPI_3_1

# OpenAPI Specification v3.1.0

Retrieved: 2024-06-18

## 1. Versioning Scheme
- Field: openapi (string, REQUIRED)
- Format: "major.minor.patch" (e.g., "3.1.0"); tooling must treat major.minor as feature set, ignore patch.

## 2. OpenAPI Root Object
```yaml
openapi: string (REQUIRED)
info: Info Object (REQUIRED)
servers: [ Server Object ] (default: [{ url: "/" }])
paths: { <path>: Path Item Object | Reference Object } (REQUIRED)
components: Components Object
security: [ Security Requirement Object ]
tags: [ Tag Object ]
externalDocs: External Documentation Object
``` 

## 3. Info Object
```yaml
title: string (REQUIRED)
version: string (REQUIRED)
description: string
termsOfService: URL
toS: string
contact: Contact Object
license: License Object
``` 

## 4. Server Object
```yaml
url: string (REQUIRED, supports {variable})
description: string
templates: { <name>: Server Variable Object }
``` 

## 5. Server Variable Object
```yaml
enum: [string]
default: string (REQUIRED, must be in enum if enum present)
description: string
``` 

## 6. Path Templating
- Syntax: /resource/{param}/sub
- Each {param} must correspond to a path parameter definition.
- Values must not contain unescaped "/", "?", or "#".

## 7. Parameter Object
```yaml
name: string (REQUIRED)
in: ["path","query","header","cookie"] (REQUIRED)
required: boolean (true if in=path)
deprecated: boolean (default false)
allowEmptyValue: boolean (query only)
style: string (default per in: path=simple, query=form, header=simple, cookie=form)
explode: boolean (default per style)
allowReserved: boolean (query only)
schema: Schema Object
content: { <media-type>: Media Type Object }
example: any
examples: { <name>: Example Object | Reference Object }
``` 

## 8. Request Body Object
```yaml
description: string
content: { <media-type>: Media Type Object } (REQUIRED, one entry)
required: boolean (default false)
``` 

## 9. Responses Object
```yaml
<statusCode or "default">: Response Object | Reference Object (REQUIRED)
``` 

## 10. Response Object
```yaml
description: string (REQUIRED)
headers: { <name>: Header Object | Reference Object }
content: { <media-type>: Media Type Object }
links: { <name>: Link Object | Reference Object }
``` 

## 11. Security Scheme Object
```yaml
type: ["apiKey","http","oauth2","openIdConnect"] (REQUIRED)
scheme: string (http only, e.g., "basic", "bearer")
bearerFormat: string (bearer only)
name: string (apiKey only)
in: ["query","header","cookie"] (apiKey only)
flows: OAuth Flows Object (oauth2 only)
openIdConnectUrl: URL (openIdConnect only)
``` 

## 12. OAuth Flows Object
```yaml
implicit: OAuth Flow Object
authorizationCode: OAuth Flow Object
password: OAuth Flow Object
clientCredentials: OAuth Flow Object
``` 

## 13. Schema Object
- Conforms to JSON Schema Draft 2020-12
- Supports properties, required, type, format, allOf, anyOf, oneOf, not, $ref, discriminator, xml, example, deprecated, etc.


## Attribution
- Source: OpenAPI 3.1 Specification
- URL: https://spec.openapis.org/oas/v3.1.0.html
- License: License: OpenAPI Specification License
- Crawl Date: 2025-05-10T15:01:18.933Z
- Data Size: 15989114 bytes
- Links Found: 57019

## Retrieved
2025-05-10
library/VITEST_GUIDE.md
# library/VITEST_GUIDE.md
# VITEST_GUIDE

## Crawl Summary
Installation: npm|yarn|pnpm|bun add -D vitest; requires Vite>=v5.0.0, Node>=v18.0.0. Writing Tests: sum.js exports sum(a:number,b:number):number; sum.test.js uses import {test,expect} from vitest; test name contains .test. or .spec.; add "test":"vitest" script. Configuration: priorities—vitest.config.ts > --config > env.VITEST/mode; supported ext js,mjs,cjs,ts,cts,mts; standalone defineConfig and Vite-integrated defineConfig with triple-slash; mergeConfig(viteConfig,defineConfig). Workspaces: test.workspace array of glob patterns or objects with test:{name,root,environment,setupFiles}. CLI: scripts test,coverage; vitest run [--coverage][--port <n>][--https]; npx vitest --help. Env Vars: VITEST_SKIP_INSTALL_CHECKS=1. Unreleased commits: npm i https://pkg.pr.new/vitest@{commit}; local build/link steps.

## Normalised Extract
Table of Contents:
1. Installation requirements and commands
2. Test Writing example and naming conventions
3. Configuration file hierarchy and supported extensions
4. defineConfig and mergeConfig usage patterns
5. Workspaces configuration structure
6. CLI commands and options
7. Environment variable controls
8. Using unreleased commits and local linking

1. Installation requirements and commands
   - Vite >= v5.0.0
   - Node >= v18.0.0
   - npm install -D vitest
   - yarn add -D vitest
   - pnpm add -D vitest
   - bun add -D vitest

2. Test Writing example and naming conventions
   - sum.js: export function sum(a: number, b: number): number { return a + b }
   - sum.test.js: import { expect, test } from 'vitest'; import { sum } from './sum.js'; test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3) })
   - File name must include .test. or .spec.
   - Add script to package.json: "test": "vitest"

3. Configuration file hierarchy and supported extensions
   - Priority: vitest.config.ts > --config <path> > process.env.VITEST or defineConfig mode
   - Supported extensions: js, mjs, cjs, ts, cts, mts

4. defineConfig and mergeConfig usage patterns
   - defineConfig signature: defineConfig({ test: { /*options*/ } })
   - Vite integration: add triple-slash reference types="vitest/config"
   - mergeConfig usage: mergeConfig(viteConfig, defineConfig({ test: { /*options*/ } }))

5. Workspaces configuration structure
   - workspace: array of strings or objects
   - object shape: test:{ name:string, root:string, environment:string, setupFiles:string[] }

6. CLI commands and options
   - Scripts in package.json: "test": "vitest", "coverage": "vitest run --coverage"
   - vitest run [--coverage] [--port <number>] [--https]
   - Full list: npx vitest --help

7. Environment variable controls
   - VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency installation prompts

8. Using unreleased commits and local linking
   - Install specific commit: npm i https://pkg.pr.new/vitest@{commit}
   - Local build & link steps: git clone, pnpm install, pnpm run build, pnpm link --global

## Supplementary Details
- Minimum requirements: Vite>=5.0.0, Node>=18.0.0
- Test file naming pattern: *.test.* or *.spec.*
- Config file order: vitest.config.ts, CLI --config, environment
- Supported config file extensions: .js, .mjs, .cjs, .ts, .cts, .mts
- defineConfig imported from 'vitest/config'; returns provided config object
- mergeConfig imported from 'vitest/config'; inputs base config and override config, outputs merged config
- Workspace config keys: name (string), root (string), environment (‘node’|’happy-dom’|others), setupFiles (string[])
- CLI default scripts: ‘test’ invokes vitest, ‘coverage’ invokes vitest run --coverage
- CLI flags: --coverage (boolean), --port <number>, --https (boolean)
- Env var VITEST_SKIP_INSTALL_CHECKS default='0', set to '1' to disable prompts
- Warning: Bun users must use ‘bun run test’ to invoke Vitest
- Unreleased commit installation URL pattern: https://pkg.pr.new/vitest@{commit}
- Local linking steps sequence: clone, pnpm install, build, pnpm link, project pnpm link

## Reference Details
// Core API
Function test(name: string, fn: () => unknown): void
Interface Matchers<T> { toBe(expected: T): void; toEqual(expected: any): void; }
Function expect<T>(value: T): Matchers<T>

// Config utilities
Function defineConfig<C>(config: C): C
Function mergeConfig<A,B>(base: A, override: B): A & B

// CLI usage
Binary: vitest [command] [options]
Commands:
• vitest run             Runs tests once (no watch)
• vitest                 Starts in watch mode
Options:
• --config <path>        string   Path to config file (default: vite.config.ts or vitest.config.ts)
• --coverage             boolean  Generate coverage report (default: false)
• --port <number>        number   Dev server port (default: 51272)
• --https                boolean  Enable HTTPS (default: false)
• --help                 boolean  Show help

// Vite/Vitest config test options (partial)
interface VitestConfig {
  workspace?: Array<string | { test: { name: string; root: string; environment: string; setupFiles: string[] } }>;
  root?: string;
  environment?: string;
  setupFiles?: string[];
  globals?: boolean;
  threads?: boolean;
  timeout?: number;
  include?: string[];
  exclude?: string[];
}

// package.json scripts
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}

// Best practices
- Use single config file for Vite and Vitest
- Name test files with .test. or .spec.
- Disable dependency prompts in CI: set VITEST_SKIP_INSTALL_CHECKS=1

// Troubleshooting
1. Bun test runner conflict: use `bun run test`
2. Missing dependencies prompts: set VITEST_SKIP_INSTALL_CHECKS=1
3. Merge Vite and Vitest configs: use mergeConfig to avoid override issues
4. Unreleased local version:
   $ git clone https://github.com/vitest-dev/vitest.git
   $ pnpm install
   $ pnpm run build
   $ pnpm link --global
   $ pnpm link --global vitest

// Example test output
$ npm run test
✓ sum.test.js (1)
  ✓ adds 1 + 2 to equal 3

Test Files 1 passed (1)
Tests 1 passed (1)
Start at 02:15:44
Duration 311ms

## Information Dense Extract
Install: npm|yarn|pnpm|bun add -D vitest; requires Vite>=5.0.0, Node>=18.0.0. Test API: test(name:string,fn():void), expect<T>(val).toBe(exp). Config: vitest.config.ts>--config>env.VITEST; ext js,mjs,cjs,ts,cts,mts. defineConfig({test:{…}}), mergeConfig(viteConfig,defineConfig({test:{…}})). Workspace: string|{test:{name,root,environment,setupFiles[]}}[]. CLI: vitest run [--coverage][--port <n>][--https]; scripts test, coverage. Env var: VITEST_SKIP_INSTALL_CHECKS=1. Bun: use bun run test. Unreleased: npm i https://pkg.pr.new/vitest@{commit}; clone,pnpm install,build,link.

## Sanitised Extract
Table of Contents:
1. Installation requirements and commands
2. Test Writing example and naming conventions
3. Configuration file hierarchy and supported extensions
4. defineConfig and mergeConfig usage patterns
5. Workspaces configuration structure
6. CLI commands and options
7. Environment variable controls
8. Using unreleased commits and local linking

1. Installation requirements and commands
   - Vite >= v5.0.0
   - Node >= v18.0.0
   - npm install -D vitest
   - yarn add -D vitest
   - pnpm add -D vitest
   - bun add -D vitest

2. Test Writing example and naming conventions
   - sum.js: export function sum(a: number, b: number): number { return a + b }
   - sum.test.js: import { expect, test } from 'vitest'; import { sum } from './sum.js'; test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3) })
   - File name must include .test. or .spec.
   - Add script to package.json: 'test': 'vitest'

3. Configuration file hierarchy and supported extensions
   - Priority: vitest.config.ts > --config <path> > process.env.VITEST or defineConfig mode
   - Supported extensions: js, mjs, cjs, ts, cts, mts

4. defineConfig and mergeConfig usage patterns
   - defineConfig signature: defineConfig({ test: { /*options*/ } })
   - Vite integration: add triple-slash reference types='vitest/config'
   - mergeConfig usage: mergeConfig(viteConfig, defineConfig({ test: { /*options*/ } }))

5. Workspaces configuration structure
   - workspace: array of strings or objects
   - object shape: test:{ name:string, root:string, environment:string, setupFiles:string[] }

6. CLI commands and options
   - Scripts in package.json: 'test': 'vitest', 'coverage': 'vitest run --coverage'
   - vitest run [--coverage] [--port <number>] [--https]
   - Full list: npx vitest --help

7. Environment variable controls
   - VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency installation prompts

8. Using unreleased commits and local linking
   - Install specific commit: npm i https://pkg.pr.new/vitest@{commit}
   - Local build & link steps: git clone, pnpm install, pnpm run build, pnpm link --global

## Original Source
Vitest Testing Guide
https://vitest.dev/guide/

## Digest of VITEST_GUIDE

# Installation

Requirements:
- Vite >= v5.0.0
- Node >= v18.0.0

Install Vitest:
- npm install -D vitest
- yarn add -D vitest
- pnpm add -D vitest
- bun add -D vitest

# Writing Tests

sum.js
```js
export function sum(a: number, b: number): number {
  return a + b
}
```

sum.test.js
```js
import { expect, test } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

File Naming:
- Must include .test. or .spec. in filename

Add script to package.json:
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Run tests:
```bash
npm run test
# or yarn test
# or pnpm test
```  

Expected Output:
```
✓ sum.test.js (1)
  ✓ adds 1 + 2 to equal 3

Test Files  1 passed (1)
     Tests  1 passed (1)
  Start at  02:15:44
  Duration  311ms
```

Warning (Bun):
- Use `bun run test` instead of `bun test` to avoid Bun's own runner.

# Configuration

Config file priority:
1. vitest.config.ts (highest)
2. CLI option `--config <path>`
3. process.env.VITEST or mode in defineConfig (defaults to test)

Supported config extensions:
- .js, .mjs, .cjs, .ts, .cts, .mts (no .json)

Vitest config (standalone):
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    /* options */
  }
})
```

Vite-integrated config:
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    /* options */
  }
})
```

Merge Vite and Vitest configs:
```js
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      /* options */
    }
  })
)
```

# Workspaces Support

Define multiple configs/test sets in vitest.config.ts:
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    workspace: [
      'packages/*',
      'tests/*/vitest.config.{e2e,unit}.ts',
      {
        test: {
          name: 'happy-dom',
          root: './shared_tests',
          environment: 'happy-dom',
          setupFiles: ['./setup.happy-dom.ts'],
        }
      },
      {
        test: {
          name: 'node',
          root: './shared_tests',
          environment: 'node',
          setupFiles: ['./setup.node.ts'],
        }
      }
    ]
  }
})
```

# Command Line Interface

Default npm scripts:
```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

Run once (no watch):
```bash
vitest run [--coverage] [--port <number>] [--https]
```  
Full list: `npx vitest --help`

# Automatic Dependency Installation

Disable prompts:
```bash
export VITEST_SKIP_INSTALL_CHECKS=1
```

# Unreleased Commits

Install a specific commit from main:
```bash
npm i https://pkg.pr.new/vitest@{commit}
```

Local build & link:
```bash
git clone https://github.com/vitest-dev/vitest.git
cd vitest
pnpm install
cd packages/vitest
pnpm run build
pnpm link --global
# In your project:
pnpm link --global vitest
```

Data Size: 19056011 bytes
Links Found: 18051
Retrieved: 2024-06-17

## Attribution
- Source: Vitest Testing Guide
- URL: https://vitest.dev/guide/
- License: MIT
- Crawl Date: 2025-05-10T17:02:46.427Z
- Data Size: 19056011 bytes
- Links Found: 18051

## Retrieved
2025-05-10
library/CHARTJS_CDN.md
# library/CHARTJS_CDN.md
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
