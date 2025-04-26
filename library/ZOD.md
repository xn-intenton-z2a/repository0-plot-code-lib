# ZOD

## Crawl Summary
TypeScript-first schema validation library. Install via npm/yarn/pnpm. Core APIs: z.<type> for primitives, z.literal, z.coerce for type coercion. Schema methods: .parse, .safeParse, .refine, .transform, .optional, .nullable, .array, .object, .union, .promise, .function, .lazy, .instanceof. Object utilities: .extend, .merge, .pick, .omit, .partial, .strict, .passthrough, .catchall. Array utilities: .nonempty, .min, .max, .length. String validations: .min, .max, .email, .url, .regex, .datetime({offset,precision,local}), .ip({version}), .cidr. Number validations: .gt, .gte, .lt, .lte, .int, .positive, .negative, .multipleOf. BigInt validations. Enums: z.enum, z.nativeEnum, .options, .exclude, .extract. Records, Maps, Sets. Recursive types via z.lazy. Error handling: ZodError with .issues. Full type inference via z.infer. Supports async via .parseAsync and .safeParseAsync.

## Normalised Extract
Table of Contents:
1 Installation
2 Core Schemas
3 Chainable Methods
4 Object Manipulation
5 Array and Tuple Utilities
6 Unions and Discriminated Unions
7 Record, Map, Set
8 Recursive and Lazy
9 Function Validation
10 Error Handling

1 Installation
Requirements: TypeScript >=4.5, strict mode.
npm install zod

2 Core Schemas
z.string() z.number() z.bigint() z.boolean() z.date() z.symbol() z.undefined() z.null() z.void() z.any() z.unknown() z.never()
z.literal(val) z.coerce.string() z.coerce.number() z.coerce.boolean() z.coerce.bigint() z.coerce.date()

3 Chainable Methods
.parse(data): T
.parseAsync(data): Promise<T>
.safeParse(data): { success,true,data } | { success,false,error }
.safeParseAsync(data)
.refine(fn, {message?,path?})
superRefine(fn)
.transform(fn)
.optional() .nullable() .nullish() .default(val) .describe(desc) .brand(str) .readonly() .pipe(schema)

4 Object Manipulation
const A=z.object({k1:z.string(),k2:z.number()})
A.shape.k1 A.keyof() A.extend({k3:z.boolean()}) A.merge(B) A.pick({k1:true}) A.omit({k2:true}) A.partial({k1:true}) A.required({k2:true}) A.deepPartial() A.passthrough() A.strip() A.strict() A.catchall(z.any())

5 Array and Tuple Utilities
z.array(type) or type.array()
A.element A.nonempty({message?}) A.min(n,{message?}) A.max(n) A.length(n)
z.tuple([schemas],).rest(type)

6 Unions and Discriminated Unions
z.union([s1,s2]) s1.or(s2)
z.discriminatedUnion("key",[obj1,obj2]) .options

7 Record, Map, Set
z.record(keyType,valueType)
z.map(keyType,valueType)
z.set(type).nonempty().min(n).max(n).size(n)

8 Recursive and Lazy
z.lazy(() => schema)

9 Function Validation
const F=z.function().args(z.string(),z.number()).returns(z.boolean()).implement((a,b)=>true)
F.parameters() F.returnType()

10 Error Handling
Parsing Errors: ZodError with .issues array
safeParse returns data or error
RefinementCtx.createIssue({code,msg,path})

## Supplementary Details
Installation steps: Add zod to dependencies. Ensure tsconfig.json contains {"compilerOptions":{"strict":true}}. Import using import { z } from "zod".

Coercion: z.coerce applies built-in constructors. Boolean coercion treats truthy/falsy values accordingly.

Custom refine: return boolean; for errors, provide message in options.

Lazy Recursion: Use z.ZodType<T> annotation for recursive types.

Performance: Use discriminatedUnion for large unions.

Generic inference: Use z.infer<typeof schema> for TypeScript type extraction.

Versioning: use zod@canary for latest features. Pin specific version via npm install zod@4.0.0-beta.

Error formatting: Extract error format via error.errors or error.format().

## Reference Details
API Specifications:

function z.string(params?: { required_error?: string; invalid_type_error?: string;}): ZodString

ZodString Methods:
.min(limit: number, params?: {message?: string}): ZodString
.max(limit: number, params?: {message?: string}): ZodString
.length(len: number, params?: {message?: string}): ZodString
.email(params?: {message?: string}): ZodString
.url(params?: {message?: string}): ZodString
.regex(regex: RegExp, params?: {message?: string}): ZodString
.includes(substr: string, params?: {message?: string}): ZodString
.startsWith(prefix: string, params?: {message?: string}): ZodString
.endsWith(suffix: string, params?: {message?: string}): ZodString
.trim(): ZodString
.toLowerCase(): ZodString
.toUpperCase(): ZodString
.datetime(options?: {offset?: boolean; precision?: number; local?: boolean}): ZodString
.date(): ZodString
.time(options?: {precision?: number}): ZodString
.ip(options?: {version?:"v4"|"v6"}): ZodString
.cidr(options?: {version?:"v4"|"v6"}): ZodString

function z.number(params?:{required_error?:string;invalid_type_error?:string;}): ZodNumber

ZodNumber Methods:
.gt(min: number, params?:{message?:string}): ZodNumber
.gte(min: number, params?:{message?:string}): ZodNumber
.lt(max: number, params?:{message?:string}): ZodNumber
.lte(max: number, params?:{message?:string}): ZodNumber
.int(params?:{message?:string}): ZodNumber
.positive(params?:{message?:string}): ZodNumber
.nonnegative(params?:{message?:string}): ZodNumber
.negative(params?:{message?:string}): ZodNumber
.nonpositive(params?:{message?:string}): ZodNumber
.multipleOf(step: number, params?:{message?:string}): ZodNumber
.finite(params?:{message?:string}): ZodNumber
.safe(params?:{message?:string}): ZodNumber

function z.bigint(params?:{}): ZodBigInt

ZodBigInt Methods similar to ZodNumber but with bigint parameters.

function z.enum<T extends readonly [string, ...string[]]>(values: T): ZodEnum<T>

ZodEnum Properties:
.options: T
.enum: {[K in T[number]]: K}
.exclude(values: T[number][]): ZodEnum<...>
.extract(values: T[number][]): ZodEnum<...>

function z.nativeEnum<E extends object>(e: E): ZodNativeEnum<E>

ZodNativeEnum.parse(val: unknown): E[keyof E]

function z.array<T extends ZodType>(schema: T): ZodArray<T>
ZodArray Methods: .element, .nonempty, .min, .max, .length

Object Methods and signatures:
function z.object<Shape extends ZodRawShape>(shape: Shape): ZodObject<Shape, "strip", ZodTypeAny, {[K in keyof Shape]: z.infer<Shape[K]>}>

ZodObject Methods:
.shape: Shape
.keyof(): ZodEnum<keyof Shape>
.extend<NE extends ZodRawShape>(shape: NE): ZodObject<Merge<Shape, NE>,...>
.merge<Other extends AnyZodObject>(other: Other): ZodObject<Merge<Shape, Other["shape"]>>
.pick<Keys extends keyof Shape>(keys: Record<Keys, true>): ZodObject<Pick<Shape, Keys>>
.omit<Keys extends keyof Shape>(keys: Record<Keys, true>): ZodObject<Omit<Shape, Keys>>
.partial<Keys extends keyof Shape = never>(keys?: Record<Keys, true>): ZodObject<Partial<Shape> & Omit<Shape, Keys>>
.required<Keys extends keyof Shape = never>(keys?: Record<Keys, true>): ZodObject<Record<Keys, Shape[Keys]> & Partial<Omit<Shape, Keys>>> 
.passthrough(): ZodObject<Shape, "passthrough"> 
.strip(): ZodObject<Shape, "strip"> 
.strict(): ZodObject<Shape, "strict"> 
.catchall<Extra extends ZodTypeAny>(schema: Extra): ZodObject<Shape, "strip", Extra>

Function Signatures and Implementation:
function z.function(): ZodFunction<[...any], any>
ZodFunction Methods:
.args<Args extends ZodType[]>(...schemas: Args): ZodFunction<Args, Return>
.returns<Return extends ZodType>(schema: Return): ZodFunction<Args, Return>
.implement(fn: (...args: inferInput<Args>) => inferOutput<Return>): (...args: inferInput<Args>) => inferOutput<Return>
.parameters(): ZodTuple<Args>
.returnType(): Return

Detailed Troubleshooting:
Command to trace schema performance:
 console.time("parse"); schema.parse(data); console.timeEnd("parse");

Inspect error paths:
 try { schema.parse(badData)} catch(e){ console.log(e.errors) }

Use .strict() to catch extra keys:
 z.object({k:z.string()}).strict().parse({k:1}) // ZodError: invalid_type_error

Concrete Best Practice Example:
const ConfigSchema = z.object({
  host: z.string().url(),
  port: z.number().int().gte(1).lte(65535),
  timeout: z.coerce.number().default(5000),
}).passthrough();

try {
  const config = ConfigSchema.parse(process.env);
} catch(err) {
  console.error("Config error", err.errors);
  process.exit(1);
}


## Information Dense Extract
z.<primitive>()
z.literal(val)
z.coerce.<primitive>()
.parse(x): T
.parseAsync(x): Promise<T>
.safeParse(x)/.safeParseAsync(x)
.refine(fn,{message,path})
.superRefine(fn)
.transform(fn)
.optional()/nullable()/nullish()/default(val)/describe(val)
.array()/tuple()/map()/set()/record()
.union()/discriminatedUnion(key,opts)
.intersection(a,b)/and()
.object(shape).shape/.keyof().extend().merge().pick().omit().partial().required().deepPartial().passthrough().strip().strict().catchall()
.function().args().returns().implement().parameters().returnType()
.lazy(()=>schema)
.instanceof(cls)
.coerce.<primitive>() applies JS constructors
.string():.min/.max/.length/.email/.url/.regex/.includes/.startsWith/.endsWith/.datetime({offset,precision,local})/.date()/.time({precision})/.ip({version})/.cidr({version})
.number():.gt/.gte/.lt/.lte/.int/.positive/.nonnegative/.negative/.nonpositive/.multipleOf/.finite/.safe
.bigint():same as number with bigint
.enum(vals).options/.enum/.exclude/.extract
.nativeEnum(enumObj)

Type inference: z.infer<>
Async: .parseAsync/.safeParseAsync
Error: ZodError with .errors[]


## Sanitised Extract
Table of Contents:
1 Installation
2 Core Schemas
3 Chainable Methods
4 Object Manipulation
5 Array and Tuple Utilities
6 Unions and Discriminated Unions
7 Record, Map, Set
8 Recursive and Lazy
9 Function Validation
10 Error Handling

1 Installation
Requirements: TypeScript >=4.5, strict mode.
npm install zod

2 Core Schemas
z.string() z.number() z.bigint() z.boolean() z.date() z.symbol() z.undefined() z.null() z.void() z.any() z.unknown() z.never()
z.literal(val) z.coerce.string() z.coerce.number() z.coerce.boolean() z.coerce.bigint() z.coerce.date()

3 Chainable Methods
.parse(data): T
.parseAsync(data): Promise<T>
.safeParse(data): { success,true,data } | { success,false,error }
.safeParseAsync(data)
.refine(fn, {message?,path?})
superRefine(fn)
.transform(fn)
.optional() .nullable() .nullish() .default(val) .describe(desc) .brand(str) .readonly() .pipe(schema)

4 Object Manipulation
const A=z.object({k1:z.string(),k2:z.number()})
A.shape.k1 A.keyof() A.extend({k3:z.boolean()}) A.merge(B) A.pick({k1:true}) A.omit({k2:true}) A.partial({k1:true}) A.required({k2:true}) A.deepPartial() A.passthrough() A.strip() A.strict() A.catchall(z.any())

5 Array and Tuple Utilities
z.array(type) or type.array()
A.element A.nonempty({message?}) A.min(n,{message?}) A.max(n) A.length(n)
z.tuple([schemas],).rest(type)

6 Unions and Discriminated Unions
z.union([s1,s2]) s1.or(s2)
z.discriminatedUnion('key',[obj1,obj2]) .options

7 Record, Map, Set
z.record(keyType,valueType)
z.map(keyType,valueType)
z.set(type).nonempty().min(n).max(n).size(n)

8 Recursive and Lazy
z.lazy(() => schema)

9 Function Validation
const F=z.function().args(z.string(),z.number()).returns(z.boolean()).implement((a,b)=>true)
F.parameters() F.returnType()

10 Error Handling
Parsing Errors: ZodError with .issues array
safeParse returns data or error
RefinementCtx.createIssue({code,msg,path})

## Original Source
Zod (Type-Safe Validation for JavaScript and TypeScript)
https://github.com/colinhacks/zod#readme

## Digest of ZOD

# ZOD Technical Documentation

# Installation

## Requirements
TypeScript >= 4.5 with "strict": true in tsconfig.json.

## Install via package manager

npm install zod       # npm
yarn add zod          # yarn
pnpm add zod          # pnpm
bun add zod           # bun

npm install zod@canary       # canary

# Import

import { z } from "zod";

# Core Schema Types and Methods

## Primitive Schemas

z.string(): ZodString
z.number(): ZodNumber
z.bigint(): ZodBigInt
z.boolean(): ZodBoolean
z.date(): ZodDate
z.symbol(): ZodSymbol
z.undefined(): ZodUndefined
z.null(): ZodNull
z.void(): ZodVoid
z.any(): ZodAny
z.unknown(): ZodUnknown
z.never(): ZodNever

## Literal Schemas

z.literal(value: string | number | bigint | boolean | symbol): ZodLiteral

## Coercion Schemas

z.coerce.string(): ZodString (input coerced via String(input))
z.coerce.number(): ZodNumber (Number(input))
z.coerce.boolean(): ZodBoolean (Boolean(input))
z.coerce.bigint(): ZodBigInt (BigInt(input))
z.coerce.date(): ZodDate (new Date(input))

## Refinements and Transformations

.preprocess(transform: (input: unknown)=>unknown, schema: ZodType): ZodEffects
.refine(check: (val:T)=>boolean, params?: { message?: string; path?: (string | number)[] }): ZodType
.superRefine((val:T, ctx: RefinementCtx)=>void): ZodEffects
.transform(transform: (val:T)=>U): ZodEffects

## Schema Methods (Chainable)
.parse(data: unknown): T
.parseAsync(data: unknown): Promise<T>
.safeParse(data: unknown): { success: true; data: T } | { success: false; error: ZodError }
.safeParseAsync(data: unknown): Promise<...>
.refine(...)
.optional(): ZodOptional<T>
.nullable(): ZodNullable<T>
.nullish(): ZodNullable<ZodOptional<T>>
.catch(messageOrSchema)
.default(defaultValue: T): ZodEffects
.describe(description: string): ZodType
.catch(defaultValue: T): ZodEffects
.array(): ZodArray<T>
.promise(): ZodPromise<T>
.or(schema: ZodType): ZodUnion
.and(schema: ZodType): ZodIntersection
.brand(brand: string): ZodEffects
.readonly(): ZodEffects
.pipe(schema: ZodType): ZodPipeline

# Buffer and Exported Types

type InterfaceToInfer<T extends ZodType> = z.infer<T>;
type InputType<T extends ZodType> = z.input<T>;
type OutputType<T extends ZodType> = z.output<T>;

# DateTime, Date, Time
z.string().datetime({ offset?: boolean; precision?: number; local?: boolean }): ZodString
datetime.iso8601 (ISO-8601)

z.string().date(): ZodString  (YYYY-MM-DD)
z.string().time({ precision?: number }): ZodString (HH:mm:ss[.SSSSSS])

# IP and CIDR
z.string().ip({ version?: "v4" | "v6" }): ZodString
z.string().cidr({ version?: "v4" | "v6" }): ZodString

# Number Validations
z.number().gt(min: number)
z.number().gte(min: number) alias .min(min)
z.number().lt(max: number)
z.number().lte(max: number) alias .max(max)
z.number().int()
z.number().positive()
z.number().nonnegative()
z.number().negative()
z.number().nonpositive()
z.number().multipleOf(step: number)
z.number().finite()
z.number().safe()

# BigInt Validations
z.bigint().gt(min: bigint)
z.bigint().gte(min: bigint)
z.bigint().lt(max: bigint)
z.bigint().lte(max: bigint)
z.bigint().positive()
z.bigint().nonnegative()
z.bigint().negative()
z.bigint().nonpositive()
z.bigint().multipleOf(step: bigint)

# Enum Schemas
z.enum(values: readonly [string, ...string[]]): ZodEnum
.enum: RecordLiteral
.options: string[]
.exclude([...])
.extract([...])
z.nativeEnum(enumObj): ZodNativeEnum

# Object Schemas
z.object(shape: Record<string, ZodType>): ZodObject
.object.shape: Get shape
.keyof(): ZodEnum of keys
.extend(shape)
.merge(other: ZodObject)
.pick({ key: boolean })
.omit({ key: boolean })
.partial(keys?: Record<string, boolean>)
.required(keys?: Record<string, boolean>)
.deepPartial()
.passthrough()
.strip()
.strict()
.catchall(schema: ZodType)

# Array Schemas
z.array(type: ZodType) | z.string().array(): ZodArray
.array.element: element schema
.nonempty({ message?: string }): ZodArray<T, [T, ...T[]]>
.min(length: number, { message?: string })
.max(length: number, { message?: string })
.length(length: number, { message?: string })

# Tuples
z.tuple([schemas...], [restSchema?]): ZodTuple
.rest(type: ZodType)

# Union and DiscriminatedUnion
z.union([schemas...]): ZodUnion
.or(schema)
z.discriminatedUnion(discriminator: string, schemas: ZodObject[]): ZodDiscriminatedUnion[schema]
.options: ZodObject[]

# Record
z.record(keyType: ZodType, valueType: ZodType): ZodRecord

# Map and Set
z.map(keyType: ZodType, valueType: ZodType): ZodMap
z.set(type: ZodType): ZodSet
.nonempty() / .min(n) / .max(n) / .size(n)

# Intersection
z.intersection(a: ZodType, b: ZodType) | a.and(b): ZodIntersection

# Recursive and Lazy
z.lazy(() => schema): ZodLazy<T>

# Promise
z.promise(type: ZodType): ZodPromise<T>

# InstanceOf
z.instanceof(classConstructor: new (...args:any) => any): ZodInstanceof

# Function
z.function(): ZodFunction
.function.args(...schemas): ZodFunction
.returns(schema): ZodFunction
.implement(fn: (...args) => Output): Fn with validation wrapper
.parameters(): ZodTuple
.returnType(): ZodType

# JSON Schema
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonSchema: ZodType<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]));

# Error Handling
safeParse / safeParseAsync returns { success, data | error }
RefinementCtx.createIssue({ code: string; message: string; path?: (string|number)[] })

# Custom
z.custom<T>(check?: (val:unknown)=>val is T, params?: { message?: string }): ZodCustom


## Attribution
- Source: Zod (Type-Safe Validation for JavaScript and TypeScript)
- URL: https://github.com/colinhacks/zod#readme
- License: License
- Crawl Date: 2025-04-26T02:16:41.292Z
- Data Size: 1051134 bytes
- Links Found: 6789

## Retrieved
2025-04-26
