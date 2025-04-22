# ZOD_LIBRARY

## Crawl Summary
Installation: npm install zod; TypeScript strict mode required. Basic usage includes creating string and object schemas (z.string(), z.object({})). Primitives, coercion (z.coerce.string(), Number, Boolean conversions), and literal schemas (z.literal(value)) are defined. String validations include max, min, email, url, regex, and transforms like trim, toLowerCase. Datetime validations support ISO8601 with options offset, local, precision. IP and CIDR validations support version filtering. Number and bigint schemas support gt, gte, lt, lte, multipleOf. Object methods include .shape, .keyof, .extend, .merge, .pick, .omit, .partial, .deepPartial, .required, .passthrough, .strict, .strip, .catchall. Array methods include nonempty, min, max, length, and tuple support with .rest for variadic elements. Advanced types include unions, discriminated unions, recursive types using z.lazy, intersections, ZodEffects with refine and transform, custom schemas via z.custom, and function schema definitions with .args, .returns, .implement. Schema methods include parse, parseAsync, safeParse, safeParseAsync, refine for custom validations.

## Normalised Extract
TABLE OF CONTENTS:
  1. Installation
  2. Basic Usage
  3. Primitives and Coercion
  4. Literal and String Schemas
  5. Datetime, Date, and Time Validations
  6. IP and CIDR Validations
  7. Number, BigInt, Boolean, and NaN Schemas
  8. Object Schemas and Methods
     - .shape, .keyof, .extend, .merge, .pick, .omit, .partial, .deepPartial, .required, .passthrough, .strict, .strip, .catchall
  9. Array and Tuple Methods
     - .array, .element, .nonempty, .min, .max, .length, .rest
  10. Unions and Discriminated Unions
  11. Records, Maps, and Sets
  12. Intersections and Recursive Types
  13. ZodEffects and Preprocessing
  14. Custom Schemas
  15. Function Schemas and Schema Methods

DETAILS:
Installation: Use npm, yarn, bun, pnpm, or deno commands. TS config must have strict mode.
Basic Usage: Create schemas using z.string(), z.object({ key: z.string() }). Use .parse and .safeParse.
Primitives: z.string(), z.number(), etc.
Coercion: z.coerce.string() uses String(input). Similar for number, boolean, bigint, date.
Literals: z.literal("tuna"), returns value property.
Strings: Validations such as max, min, email, url, regex; transforms include trim, lower, upper. Custom error messages can be passed as second argument.
Datetime: z.string().datetime({ offset: [true/false], local: [true/false], precision: number }).
Date: z.string().date() validates YYYY-MM-DD.
Time: z.string().time({ precision: number }).
IP: z.string().ip({ version: "v4" or "v6" }).
CIDR: z.string().cidr({ version: "v4" or "v6" }).
Numbers: z.number().gt(n), .gte(n), .lt(n), .lte(n), .int(), multipleOf, finite, safe.
BigInts: z.bigint().gt(n), etc.
Objects: Use z.object({...}). Methods: .extend adds fields, .merge merges schemas, .pick/.omit to include/exclude keys, .partial and .deepPartial to relax requirements, .required makes properties mandatory, .passthrough to avoid stripping, .strict for error on unknown keys, .catchall to validate extra keys.
Arrays: z.array(schema) or schema.array(). Use .nonempty for minimum one element.
Tuples: z.tuple([schema1, schema2, ...]) with .rest for variadic elements.
Unions: z.union([schema1, schema2]) or .or method. Discriminated unions use z.discriminatedUnion(discriminator, [schema options]).
Records: z.record(keySchema, valueSchema). Maps: z.map(keySchema, valueSchema). Sets: z.set(schema) with nonempty, min, max, size options.
Intersections: z.intersection(schemaA, schemaB) or schemaA.and(schemaB).
Recursive Types: Use z.lazy(() => schema) combined with object extensions.
ZodEffects: z.preprocess for pre-parsing transformations; z.refine for custom validations.
Custom Schemas: z.custom<Type>(validationFunction, optionalErrorMessage).
Function Schemas: Defined with z.function().args(...).returns(returnSchema). Implement with .implement(callback). Extract with .parameters() and .returnType().
Schema Methods: .parse, .parseAsync, .safeParse, .safeParseAsync, .refine.


## Supplementary Details
Configuration Options:
- TSConfig: Enable "strict": true.
- Installation via npm/yarn deno, etc. Example: npm install zod or npm install zod@canary.

Coercion: Uses built-in constructors: String(input), Number(input), Boolean(input), BigInt(input), new Date(input).

Validation Options:
- For string().datetime(): options: offset (default false), local (default false), precision (default arbitrary).
- For string().ip() and string().cidr(): options: version with values "v4" or "v6".
- For number() and bigint(): methods such as .gt, .gte, .lt, .lte, .multipleOf; error messages can be customized by passing an object { message: "..." }.

Implementation Steps:
1. Import: import { z } from "zod";
2. Define schema: const schema = z.object({ key: z.string().min(5, { message: "Minimum 5 chars" }) });
3. Parse input: schema.parse(input) or use safeParse.
4. Use .coerce for converting types.
5. For recursive types, define base schema and extend with z.lazy(() => schema.array()).

Best Practices:
- Define schema once and derive static types with z.infer<typeof schema>.
- Use .strict() for banning extra properties.
- Use .preprocess() for pre-validation casting.

Troubleshooting Procedures:
- If parse() fails unexpectedly, use safeParse() to inspect error object for validation issues.
- Check TS config for strict mode errors.
- For recursive or cyclical data, ensure use of z.lazy to avoid infinite loops.
- For coercion issues, verify usage of z.coerce.<type> and built-in constructors.
- Use console.log(schema.safeParse(input)) to display error details.


## Reference Details
API SPECIFICATIONS:

z.string(): Schema<string>
  Methods: .min(limit: number, opts?: { message?: string }), .max(limit: number, opts?: { message?: string }), .length(len: number, opts?: { message?: string }), .email(opts?: { message?: string }), .url(opts?: { message?: string }), .emoji(opts?: { message?: string }), .uuid(opts?: { message?: string }), .regex(pattern: RegExp, opts?: { message?: string })

z.number(): Schema<number>
  Methods: .gt(n: number), .gte(n: number), .lt(n: number), .lte(n: number), .int(), .multipleOf(n: number, opts?: { message?: string }), .finite(), .safe()

z.coerce.string(): Coerces any input using String(input) and returns ZodString instance, supporting additional string methods.

Object Schema:
  z.object({ key: SchemaType, ... }) returns ZodObject
    - .shape, .keyof(), .extend({ additionalKey: Schema }), .merge(otherSchema), .pick({ key: true }), .omit({ key: true }), .partial(), .deepPartial(), .required(), .passthrough(), .strict(), .strip(), .catchall(schema)

Arrays:
  z.array(schema) or schema.array() returns ZodArray with methods: .nonempty(opts?: { message?: string }), .min(n: number), .max(n: number), .length(n: number)

Tuples:
  z.tuple([schema1, schema2, ...]) returns ZodTuple; .rest(optionalSchema) appends variadic element type.

Unions:
  z.union([schema1, schema2,...]) or schema1.or(schema2)

Discriminated Unions:
  z.discriminatedUnion(discriminator: string, options: Array<ZodObject>)

Recursive Types:
  Use z.lazy(() => schema) to defer evaluation.

Function Schemas:
  z.function()
    - .args(...schemas: ZodType<any>[])
    - .returns(schema: ZodType<any>)
    - .implement(fn: (...args) => ReturnType) returns a validated function.

Schema Methods:
  .parse(data: unknown): T
  .parseAsync(data: unknown): Promise<T>
  .safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }
  .safeParseAsync(data: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>
  .refine(validator: (data: T) => any, opts?: { message?: string; path?: (string | number)[] })

CODE EXAMPLE:
  // Function schema with implementation
  const trimmedLength = z.function()
    .args(z.string())
    .returns(z.number())
    .implement((x) => x.trim().length);

  // Using z.preprocess for coercion
  const castToString = z.preprocess(val => String(val), z.string());

TROUBLESHOOTING:
  - Command: console.log(schema.safeParse(input))
  - Expected output: { success: true, data: ... } or error object with detailed ZodError
  - For asynchronous schema: await schema.parseAsync(input)

Configuration Options:
  - For string().datetime(): { offset: boolean, local: boolean, precision: number }
  - For ip() and cidr(): { version: "v4" | "v6" }


## Information Dense Extract
Zod: TS-first schema validation library. Install: npm install zod. Requirements: TS 4.5+, strict mode. Schemas: z.string(), z.number(), z.boolean(), z.date(), z.bigint(), etc. Coercion: z.coerce.<type> using native constructors. Object schemas: z.object({...}), extend, merge, pick, omit, partial, deepPartial, required, passthrough, strict, strip, catchall. Arrays: z.array(schema), nonempty, min, max, length; Tuples: z.tuple([...]). Unions: z.union([...]) and .or; discriminated unions: z.discriminatedUnion(discriminator, options). Recursive types: z.lazy(() => schema). Functions: z.function().args(...).returns(...).implement(fn). Schema methods: parse, parseAsync, safeParse, safeParseAsync, refine. API details include method signatures with parameters and error message options. Code examples provided for string, object, function schemas, and preprocessing.

## Escaped Extract
TABLE OF CONTENTS:
  1. Installation
  2. Basic Usage
  3. Primitives and Coercion
  4. Literal and String Schemas
  5. Datetime, Date, and Time Validations
  6. IP and CIDR Validations
  7. Number, BigInt, Boolean, and NaN Schemas
  8. Object Schemas and Methods
     - .shape, .keyof, .extend, .merge, .pick, .omit, .partial, .deepPartial, .required, .passthrough, .strict, .strip, .catchall
  9. Array and Tuple Methods
     - .array, .element, .nonempty, .min, .max, .length, .rest
  10. Unions and Discriminated Unions
  11. Records, Maps, and Sets
  12. Intersections and Recursive Types
  13. ZodEffects and Preprocessing
  14. Custom Schemas
  15. Function Schemas and Schema Methods

DETAILS:
Installation: Use npm, yarn, bun, pnpm, or deno commands. TS config must have strict mode.
Basic Usage: Create schemas using z.string(), z.object({ key: z.string() }). Use .parse and .safeParse.
Primitives: z.string(), z.number(), etc.
Coercion: z.coerce.string() uses String(input). Similar for number, boolean, bigint, date.
Literals: z.literal('tuna'), returns value property.
Strings: Validations such as max, min, email, url, regex; transforms include trim, lower, upper. Custom error messages can be passed as second argument.
Datetime: z.string().datetime({ offset: [true/false], local: [true/false], precision: number }).
Date: z.string().date() validates YYYY-MM-DD.
Time: z.string().time({ precision: number }).
IP: z.string().ip({ version: 'v4' or 'v6' }).
CIDR: z.string().cidr({ version: 'v4' or 'v6' }).
Numbers: z.number().gt(n), .gte(n), .lt(n), .lte(n), .int(), multipleOf, finite, safe.
BigInts: z.bigint().gt(n), etc.
Objects: Use z.object({...}). Methods: .extend adds fields, .merge merges schemas, .pick/.omit to include/exclude keys, .partial and .deepPartial to relax requirements, .required makes properties mandatory, .passthrough to avoid stripping, .strict for error on unknown keys, .catchall to validate extra keys.
Arrays: z.array(schema) or schema.array(). Use .nonempty for minimum one element.
Tuples: z.tuple([schema1, schema2, ...]) with .rest for variadic elements.
Unions: z.union([schema1, schema2]) or .or method. Discriminated unions use z.discriminatedUnion(discriminator, [schema options]).
Records: z.record(keySchema, valueSchema). Maps: z.map(keySchema, valueSchema). Sets: z.set(schema) with nonempty, min, max, size options.
Intersections: z.intersection(schemaA, schemaB) or schemaA.and(schemaB).
Recursive Types: Use z.lazy(() => schema) combined with object extensions.
ZodEffects: z.preprocess for pre-parsing transformations; z.refine for custom validations.
Custom Schemas: z.custom<Type>(validationFunction, optionalErrorMessage).
Function Schemas: Defined with z.function().args(...).returns(returnSchema). Implement with .implement(callback). Extract with .parameters() and .returnType().
Schema Methods: .parse, .parseAsync, .safeParse, .safeParseAsync, .refine.

## Original Source
Zod Library Documentation
https://github.com/colinhacks/zod

## Digest of ZOD_LIBRARY

# ZOD LIBRARY DOCUMENTATION

Retrieved Date: 2023-10-XX

## Overview
Zod is a TypeScript-first schema declaration and validation library. It supports parsing, coercion, custom validation, recursive schemas and more. 

## Installation
- Requirements: TypeScript 4.5+ with "strict": true in tsconfig.json.
- Install commands:
  - npm: npm install zod
  - deno: deno add npm:zod
  - yarn: yarn add zod
  - bun: bun add zod
  - pnpm: pnpm add zod
- Canary installation available with zod@canary.

## Basic Usage

Creating a string schema:
  import { z } from "zod";
  const mySchema = z.string();
  mySchema.parse("tuna"); // returns "tuna"
  mySchema.parse(12); // throws ZodError

Safe parsing:
  mySchema.safeParse("tuna");
  mySchema.safeParse(12);

Creating an object schema:
  const User = z.object({ username: z.string() });
  User.parse({ username: "Ludwig" });
  type User = z.infer<typeof User>;

## Primitives

API calls:
  z.string(), z.number(), z.bigint(), z.boolean(), z.date(), z.symbol(), z.undefined(), z.null(), z.void(), z.any(), z.unknown(), z.never()

## Coercion

Coercion examples:
  const schema = z.coerce.string();
  // During parsing, String(), Number(), Boolean(), BigInt(), new Date() are used.
  z.coerce.string().email().min(5);

## Literals

Define literal schemas:
  const tuna = z.literal("tuna");
  tuna.value // returns "tuna"

## Strings Validation and Transforms

Validations:
  z.string().max(5), .min(5), .length(5), .email(), .url(), .emoji(), .uuid(), .nanoid(), .cuid(), .cuid2(), .ulid(), .regex(regex), .includes(string), .startsWith(string), .endsWith(string), .datetime(), .ip(), .cidr()

Transforms:
  z.string().trim(), .toLowerCase(), .toUpperCase(), .date(), .time(), .duration(), .base64()

Custom error messages can be provided as second parameter to validations.

## Datetime, Date, and Time

Datetime:
  const dt = z.string().datetime();
  // Options: { offset: true } to allow timezone; { local: true } for timezone-less; { precision: 3 } for millisecond precision

Date:
  z.string().date(); // Format: YYYY-MM-DD

Time:
  z.string().time(); // Format: HH:MM:SS[.s+], with option { precision: 3 }

## IP and CIDR

IP validations:
  z.string().ip();
  // Options: { version: "v4" } or { version: "v6" }
  z.string().cidr();
  // Similar version specification available.

## Numbers and BigInts

Numbers:
  z.number().gt(5), .gte(5), .lt(5), .lte(5), .int(), .positive(), .nonnegative(), .negative(), .nonpositive(), .multipleOf(5), .finite(), .safe()

BigInts:
  z.bigint().gt(5n), .gte(5n), .lt(5n), .lte(5n), .positive(), .nonnegative(), .negative(), .nonpositive(), .multipleOf(5n)

## Booleans, NaN, and Dates

Boolean example with custom errors:
  z.boolean({ required_error: "isActive is required", invalid_type_error: "isActive must be a boolean" })

NaN:
  z.nan({ required_error: "isNaN is required", invalid_type_error: "isNaN must be 'not a number'" })

Dates:
  z.date().min(new Date("1900-01-01"), { message: "Too old" })
  z.date().max(new Date(), { message: "Too young!" })
  Use coercion: z.coerce.date()

## Object Schemas and Methods

Object creation and extensions:
  const Dog = z.object({ name: z.string(), age: z.number() });
  Dog.shape.name, Dog.shape.age
  Dog.keyof() produces enum of keys
  Dog.extend({ breed: z.string() });
  Dog.merge(anotherSchema)
  .pick({ name: true }) and .omit({ id: true })
  .partial(), .deepPartial(), .required(), .passthrough(), .strict(), .strip(), .catchall(schema)

## Arrays and Tuples

Arrays:
  z.array(z.string()) is equivalent to z.string().array()
  .nonempty(), .min(n), .max(n), .length(n)
  .element returns element schema

Tuples:
  z.tuple([z.string(), z.number(), z.object({ pointsScored: z.number() })]) and .rest for variadic tuples

## Unions and Discriminated Unions

Unions:
  z.union([z.string(), z.number()]) or z.string().or(z.number())

Discriminated Unions:
  z.discriminatedUnion("status", [
    z.object({ status: z.literal("success"), data: z.string() }),
    z.object({ status: z.literal("failed"), error: z.instanceof(Error) })
  ])

## Records, Maps, and Sets

Records:
  z.record(z.string(), UserSchema)

Maps:
  z.map(z.string(), z.number())

Sets:
  z.set(z.number()).nonempty(), .min(n), .max(n), .size(n)

## Intersections and Recursive Types

Intersections:
  z.intersection(schemaA, schemaB) or schemaA.and(schemaB)

Recursive Types:
  Use z.lazy(() => schema) to support recursion.

## ZodEffects and Preprocessing

ZodEffects for .refine, .transform, .preprocess
  Example: const castToString = z.preprocess(val => String(val), z.string());

## Custom Schemas

Create custom schema:
  z.custom<`${number}px`>(val => typeof val === "string" ? /^\d+px$/.test(val) : false)

## Function Schemas

Define function schemas:
  const myFunction = z.function()
    .args(z.string(), z.number())
    .returns(z.boolean());

Implement functions:
  myFunction.implement((arg0, arg1) => { return arg0.length > arg1; });
  Use .parameters() and .returnType() to extract input and output schemas.

## Schema Methods

.parse(data: unknown): T
.parseAsync(data: unknown): Promise<T>
.safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError; }
.safeParseAsync(data: unknown): Promise<Result>
.refine(validator, params?)

Example with custom error:
  const myString = z.string().refine(val => val.length <= 255, { message: "String can't be more than 255 characters" });


## Attribution
- Source: Zod Library Documentation
- URL: https://github.com/colinhacks/zod
- License: License: MIT
- Crawl Date: 2025-04-22T02:32:03.523Z
- Data Size: 895067 bytes
- Links Found: 6165

## Retrieved
2025-04-22
