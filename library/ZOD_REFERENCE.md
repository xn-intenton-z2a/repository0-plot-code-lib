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
