# ZOD_TECH

## Crawl Summary
Installation commands, basic schema creation for strings and objects, detailed validations for primitives, coercion methods, literal and string transformations, date/time formatting with ISO standards, IP/CIDR validations, numeric and bigint constraints, enum and optional/nullable handling, object schema manipulation (extend, merge, pick, omit, partial), array and tuple definitions, unions including discriminated unions, and specific methods for promises, functions, and custom validations. Complete API methods (.parse, .safeParse, .refine, .transform, .preprocess) are provided with their signatures and usage examples.

## Normalised Extract
Table of Contents:
1. Installation and Setup
   - Requirements: TypeScript 4.5+, tsconfig strict mode
   - npm/yarn/pnpm commands including canary install
2. Basic Schemas
   - String, Number, Object, Boolean, Date
   - Example: const schema = z.string(); schema.parse('example');
3. Coercion Techniques
   - Use of z.coerce.string(), z.coerce.number(), etc. with built-in JS constructors
4. Literals and Enums
   - z.literal(value), z.enum([...]), z.nativeEnum(ENUM)
5. String Validations
   - Methods: max, min, length, email, url, regex, includes, startsWith, endsWith, transforms (.trim, .toLowerCase)
6. Date and Time Validations
   - Schemas: z.string().datetime({ offset: true, precision: 3 }), z.string().date(), z.string().time({ precision: 3 })
7. Numeric and BigInt Validations
   - Methods: gt, gte, lt, lte, int, positive, nonnegative, multipleOf, finite, safe
8. Object Schemas and Manipulation
   - Methods: shape, keyof, extend, merge, pick, omit, partial, deepPartial, required, passthrough, strict, strip, catchall
9. Array and Tuple Schemas
   - Definition: z.array(z.string()), .nonempty, .min, .max, .length, tuple with optional .rest
10. Unions and Discriminated Unions
    - z.union and .or; discriminatedUnion using a common key
11. Records, Maps, Sets
    - z.record(key, value), z.map(key, value), z.set(element) with size constraints
12. Intersections and Recursive Types
    - z.intersection or .merge; recursive schemas via z.lazy
13. Effects and Custom Schemas
    - Refinements: .refine, .superRefine, .transform, .preprocess, custom validations with z.custom
14. Promises and Instanceof
    - z.promise(schema) and z.instanceof(Class)
15. Function Schemas and Implementation
    - Creating function validations: .function().args(...).returns(...).implement(fn)
16. Schema Methods Overview
    - .parse(data: unknown): T, .parseAsync(data: unknown): Promise<T>, .safeParse(data: unknown), .safeParseAsync(data: unknown)

Each section includes definitions, available configuration options, and exact method signatures such as:
.parse(data: unknown): T
.parseAsync(data: unknown): Promise<T>
.safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }
.refine(validator: (data: T) => any, params?: { message?: string; path?: (string | number)[] }): ZodType<T>

Implementation patterns include coerce examples, function schema implementations with .implement, and usage of lazy for recursive definitions. Developers can copy these exact patterns for immediate use.

## Supplementary Details
Installation Options:
- npm install zod
- yarn add zod
- pnpm add zod

Configuration:
- tsconfig.json must have "strict": true

Key Schemas:
1. String Schema:
   - z.string()
   - Transformations: .trim(), .toLowerCase(), .toUpperCase()
   - Validations: .min(length, { message: 'error' }), .max(length), .email(), .url(), .regex(pattern)
2. Coercion:
   - z.coerce.string(), z.coerce.number(), z.coerce.boolean(), z.coerce.date()
   - Works by calling String(input), Number(input), Boolean(input), new Date(input)
3. Object Schema:
   - z.object({ key: schema, ... })
   - Methods: .extend({}), .merge(otherObject), .pick({ key: true }), .omit({ key: true }), .partial(), .deepPartial(), .required()
4. Union Schemas:
   - z.union([schema1, schema2]) or schema1.or(schema2)
5. Function Schema Example:
   - const f = z.function().args(z.string(), z.number()).returns(z.boolean()).implement((s, n) => { ... });

Advanced Options:
- Discriminated unions via z.discriminatedUnion('status', [ ... ])
- Recursive types using z.lazy(() => schema)
- Custom validations using .refine and .superRefine

Troubleshooting:
- Use .safeParse to capture detailed errors
- For async validations, use .parseAsync or .safeParseAsync
- Validate input types prior to coercion if unexpected behavior occurs


## Reference Details
API Specifications:
1. Schema Parsing Methods:
   - parse(data: unknown): T
     Throws ZodError if validation fails; returns a deep clone of input if valid.
   - parseAsync(data: unknown): Promise<T>
     Returns a Promise that resolves with parsed data.
   - safeParse(data: unknown): { success: true, data: T } | { success: false, error: ZodError }
   - safeParseAsync(data: unknown): Promise<{ success: boolean, data?: T, error?: ZodError }>
2. Refinement and Transform Methods:
   - refine(validator: (data: T) => any, params?: { message?: string, path?: (string|number)[] }): ZodType<T>
   - superRefine(callback: (data: T, context: { addIssue: (issue: { message: string, path?: (string|number)[] }) => void }) => void): void
   - transform(transformer: (data: T) => U): ZodType<U>
3. Coercion:
   - z.coerce.string(): ZodString instance that coerces using String(input)
   - z.coerce.number(): uses Number(input)
   - z.coerce.boolean(): uses Boolean(input)
   - z.coerce.date(): uses new Date(input)
4. Function Schema:
   - z.function(): creates a function schema
     .args(...schemas: ZodType<any>[]): ZodTuple<[...schemas]>
     .returns(schema: ZodType<any>): ZodFunction
     .implement(fn: Function): Function with automatic input/output validation
     - Example:
         const myFunc = z.function()
           .args(z.string(), z.number())
           .returns(z.boolean())
           .implement((s, n) => s.length > n);
5. Object Schema Methods:
   - extend(extensions: { [k: string]: ZodType<any> }): returns a new schema with added keys
   - merge(anotherSchema: ZodObject): merges two object schemas; overlapping keys are overwritten by the second
   - pick(keys: { [k in keyof T]?: true }): returns a schema with a subset of keys
   - omit(keys: { [k in keyof T]?: true }): returns a schema excluding specified keys
   - partial(): marks all properties as optional; deepPartial() for nested objects
   - required(options?: { [k in keyof T]?: true }): marks specified or all properties as required
   - passthrough(): allows additional unknown keys; strict(): disallows them
6. Array and Tuple:
   - z.array(elementSchema: ZodType<any>): returns ZodArray with method .nonempty(), .min(n), .max(n), .length(n)
   - z.tuple([schema, ...]): returns fixed tuple; .rest(optionalSchema): variadic remainder
7. Recursive Types:
   - Example: const categorySchema: ZodType<Category> = baseSchema.extend({ subcategories: z.lazy(() => categorySchema.array()) });

Best Practices:
- Always use .safeParse for error logging in production.
- Use z.coerce to normalize input types when receiving data from untyped sources.
- Enable strict mode in TypeScript for best type inference.
- Use discriminated unions for performance in union validations.
- Utilize .preprocess for input transformations prior to validation.

Troubleshooting Commands:
- To diagnose errors, wrap schema.parse in try/catch and log result.error. Example:
     try { schema.parse(input); } catch (e) { console.error(e.errors); }
- For async validations, use await schema.parseAsync(data).catch(e => console.error(e));


## Information Dense Extract
Installation: npm/yarn/pnpm add zod; tsconfig strict true. Schemas: z.string(), z.number(), z.object({key: schema}), z.array(schema), z.tuple([...]), z.union([schema1, schema2]), z.enum([...]), z.nativeEnum(ENUM). Coercion: z.coerce.string()/number()/boolean()/date() use JS built-ins. Methods: .parse(data: unknown): T, .parseAsync(data): Promise<T>, .safeParse(data): { success, data/error }, .refine(validator, { message, path }), .superRefine(callback), .transform(fn), .preprocess(fn, schema). Object manipulations: .extend, .merge, .pick, .omit, .partial, .deepPartial, .required, .passthrough, .strict, .strip, .catchall. Function schemas: z.function().args(...).returns(schema).implement(fn); .parameters(), .returnType(). Recursive types via z.lazy(() => schema); discriminated unions via z.discriminatedUnion(key, [schemas]). For Promises: z.promise(schema). Detailed API signatures provided above.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
   - Requirements: TypeScript 4.5+, tsconfig strict mode
   - npm/yarn/pnpm commands including canary install
2. Basic Schemas
   - String, Number, Object, Boolean, Date
   - Example: const schema = z.string(); schema.parse('example');
3. Coercion Techniques
   - Use of z.coerce.string(), z.coerce.number(), etc. with built-in JS constructors
4. Literals and Enums
   - z.literal(value), z.enum([...]), z.nativeEnum(ENUM)
5. String Validations
   - Methods: max, min, length, email, url, regex, includes, startsWith, endsWith, transforms (.trim, .toLowerCase)
6. Date and Time Validations
   - Schemas: z.string().datetime({ offset: true, precision: 3 }), z.string().date(), z.string().time({ precision: 3 })
7. Numeric and BigInt Validations
   - Methods: gt, gte, lt, lte, int, positive, nonnegative, multipleOf, finite, safe
8. Object Schemas and Manipulation
   - Methods: shape, keyof, extend, merge, pick, omit, partial, deepPartial, required, passthrough, strict, strip, catchall
9. Array and Tuple Schemas
   - Definition: z.array(z.string()), .nonempty, .min, .max, .length, tuple with optional .rest
10. Unions and Discriminated Unions
    - z.union and .or; discriminatedUnion using a common key
11. Records, Maps, Sets
    - z.record(key, value), z.map(key, value), z.set(element) with size constraints
12. Intersections and Recursive Types
    - z.intersection or .merge; recursive schemas via z.lazy
13. Effects and Custom Schemas
    - Refinements: .refine, .superRefine, .transform, .preprocess, custom validations with z.custom
14. Promises and Instanceof
    - z.promise(schema) and z.instanceof(Class)
15. Function Schemas and Implementation
    - Creating function validations: .function().args(...).returns(...).implement(fn)
16. Schema Methods Overview
    - .parse(data: unknown): T, .parseAsync(data: unknown): Promise<T>, .safeParse(data: unknown), .safeParseAsync(data: unknown)

Each section includes definitions, available configuration options, and exact method signatures such as:
.parse(data: unknown): T
.parseAsync(data: unknown): Promise<T>
.safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }
.refine(validator: (data: T) => any, params?: { message?: string; path?: (string | number)[] }): ZodType<T>

Implementation patterns include coerce examples, function schema implementations with .implement, and usage of lazy for recursive definitions. Developers can copy these exact patterns for immediate use.

## Original Source
Zod Documentation
https://github.com/colinhacks/zod

## Digest of ZOD_TECH

# ZOD DOCUMENTATION

Date Retrieved: 2023-10-27
Data Size: 885299 bytes

## Installation

Requirements: TypeScript 4.5+, tsconfig.json with "strict": true

Commands:
- npm install zod
- yarn add zod
- pnpm add zod

Canary versions available with tag @canary for npm, yarn, etc.

## Basic Usage

Importing:
  import { z } from "zod";

Example String Schema:
  const mySchema = z.string();
  mySchema.parse("tuna"); // returns "tuna"
  mySchema.safeParse(12); // returns { success: false, error: ZodError }

Example Object Schema:
  const User = z.object({ username: z.string() });
  User.parse({ username: "Ludwig" });
  type User = z.infer<typeof User>;

## Primitives and Coercion

Primitive Schemas:
  z.string(), z.number(), z.bigint(), z.boolean(), z.date(), z.symbol(), z.undefined(), z.null(), z.any(), z.unknown(), z.void(), z.never()

Coercion for primitives uses built-in constructors:
  z.coerce.string(); // coerces data using String(input)
  z.coerce.number(); // Number(input)
  z.coerce.boolean(); // Boolean(input)

## Literals

Literal Schemas:
  const tuna = z.literal("tuna");
  tuna.value // returns "tuna"

## Strings

Methods include validations and transforms:
  z.string().max(5), z.string().min(5), z.string().length(5), z.string().email(), url(), uuid(), regex(), includes(), startsWith(), endsWith(), datetime(), ip(), cidr()

Optional custom error messages can be passed as second argument:
  z.string().min(5, { message: "Must be 5 or more characters long" });

Transforms such as .trim(), .toLowerCase(), .toUpperCase() are available.

## Date and Time Validations

Datetime: z.string().datetime() validates ISO 8601 by default (Z timezone only). Options: { offset: true }, { local: true }, { precision: 3 } to limit decimal precision.

Date: z.string().date() enforces YYYY-MM-DD.

Time: z.string().time() validates HH:MM:SS with optional decimal precision using { precision: 3 }.

IP and CIDR:
  z.string().ip() validates IPv4 and IPv6 (or specify { version: "v4" } or { version: "v6" }).
  z.string().cidr() likewise for CIDR ranges.

## Numbers, BigInts, and NaN

Number schema methods:
  .gt(), .gte(), .lt(), .lte(), .int(), .positive(), .nonnegative(), .negative(), .nonpositive(), .multipleOf(), .finite(), .safe()

BigInt similarly supports: .gt(5n), .gte(5n), etc.

NaN: Use z.nan() with custom error messages.

## Booleans and Dates

Boolean schema: z.boolean() with custom error messages.

Date instance validation: z.date().min(new Date("1900-01-01"), { message: "Too old" }).max(new Date(), { message: "Too young!" })

Coercion to Date: Use z.coerce.date() which calls new Date(input)

## Enums and Optionals

Zod enums:
  const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
  Access options via FishEnum.options and autocompletion via FishEnum.enum

Native enums: Use z.nativeEnum(Fruits) for numeric, string and as const enums.

Optional: z.optional(schema) or schema.optional() marks a value as optional. Unwrapping via .unwrap().

Nullable: z.nullable(schema) or schema.nullable(); .unwrap() retrieves inner schema.

## Objects and Advanced Object Operations

Creating objects:
  const Dog = z.object({ name: z.string(), age: z.number() });

Methods:
  .shape (access individual property schemas)
  .keyof (create enum from object keys)
  .extend (add fields or overwrite)
  .merge (combine two objects, B overwrites A if keys overlap)
  .pick and .omit (select or remove properties)
  .partial and .deepPartial (make properties optional, shallow or deep)
  .required (make properties required)
  .passthrough (allow unknown keys)
  .strict (disallow unknown keys)
  .strip (reset to default stripping behavior)
  .catchall (apply schema to all unknown keys)

## Arrays and Tuples

Arrays: z.array(elementSchema) or elementSchema.array()
  Methods: .nonempty(), .min(), .max(), .length(), .element

Tuples: Use z.tuple([schema1, schema2, ...]) with optional .rest(schema) for variadic elements

## Unions and Discriminated Unions

Unions: z.union([schema1, schema2]) or using .or method

Discriminated unions: z.discriminatedUnion("key", [schemaWithLiteral, ...]) provides faster evaluation based on discriminator key

## Records, Maps, and Sets

Records: z.record(keySchema, valueSchema) typically for Record<string, T>
Maps: z.map(keySchema, valueSchema)
Sets: z.set(elementSchema) with extras like .nonempty(), .min(), .max(), .size()

## Intersections and Recursive Types

Intersections: z.intersection(schemaA, schemaB) or A.and(B). Often, .merge() is preferred for objects.

Recursive types: Use z.lazy(() => schema) for recursive definitions.

## Zod Effects and Custom Transformations

ZodType with ZodEffects is used for refining, transforming, and preprocessing:
  .refine(validator, { message: "..." })
  .superRefine((data, ctx) => { /* add issues */ })
  .transform(transformFunction)
  .preprocess(preprocessFunction, schema)

Example of preprocess for coercion:
  const castToString = z.preprocess((val) => String(val), z.string());

## Promises and Instanceof

Promise schemas: z.promise(schema) validates that input is a Promise and applies the schema to the resolved value.

Instanceof validation: z.instanceof(ClassName) ensures instance is a given class.

## Functions

Function schemas allow validation of inputs and outputs:
  const func = z.function()
    .args(z.string(), z.number())
    .returns(z.boolean());

Implementing functions with validation:
  const trimmedLength = z.function()
    .args(z.string())
    .returns(z.number())
    .implement((x) => x.trim().length);

Access parameters and return type:
  func.parameters(); // returns ZodTuple
  func.returnType(); // returns Zod schema for output

## Schema Methods

All schemas support:
  .parse(data: unknown): T
  .parseAsync(data: unknown): Promise<T>
  .safeParse(data: unknown): { success: boolean, data?: T, error?: ZodError }
  .safeParseAsync(data: unknown): Promise<{ success: boolean, data?: T, error?: ZodError }>
  .refine(validator, params?)

## Troubleshooting

- Ensure strict mode is enabled in tsconfig.json.
- For coercion issues, verify use of built-in constructors via z.coerce.xxx().
- Use .safeParse to diagnose validation errors without exceptions.

Attribution: Data crawled from https://github.com/colinhacks/zod


## Attribution
- Source: Zod Documentation
- URL: https://github.com/colinhacks/zod
- License: MIT
- Crawl Date: 2025-05-01T18:50:21.196Z
- Data Size: 885299 bytes
- Links Found: 6134

## Retrieved
2025-05-01
