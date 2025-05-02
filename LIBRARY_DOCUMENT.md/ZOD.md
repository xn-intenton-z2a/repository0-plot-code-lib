# ZOD

## Crawl Summary
Zod documentation provides TypeScript-first schema definitions using methods like z.string(), z.number(), and their coercion variants. Core functionalities include object schema creation with extend, merge, pick, omit, partial, array validations (.nonempty, .min, .max), tuples, unions, discriminated unions, recursive types (using z.lazy), function schemas with args and returns, and robust parsing methods (.parse, .safeParse, .parseAsync, .spa). Advanced validations include custom refinements, preprocessor logic, and validators for IP, CIDR, dates, and enums.

## Normalised Extract
Table of Contents:
1. Primitives and Coercion
   - z.string(options), z.number(options), z.boolean(), z.date(), z.bigint(), z.undefined(), z.null(), z.any(), z.unknown(), z.never()
   - Coercion via z.coerce.string(), z.coerce.number(), z.coerce.boolean(), z.coerce.bigint(), z.coerce.date() using built-in converters.
2. Custom Validations and Literals
   - z.literal(value) for fixed values; custom error messages via options; regex and string validations (.min, .max, .email, .regex, etc.)
3. Object Schemas and Extensions
   - z.object({ key: schema }) with methods: .extend(), .merge(), .pick(), .omit(), .partial(), .deepPartial(), .required(), .passthrough(), .strict(), .strip(), .catchall()
4. Arrays, Tuples, and Unions
   - Arrays: z.array(schema) and methods .nonempty(), .min(), .max(), .length()
   - Tuples: z.tuple([...]) with .rest() for variadic arguments
   - Unions using z.union([]) or .or(), discriminatedUnion with a specific key
5. Advanced Schema Features
   - Recursive types using z.lazy(() => schema), ZodEffects (.refine, .superRefine, .transform, .preprocess)
6. Function Schemas
   - z.function() with .args(schema1, schema2, ...), .returns(schema), .implement(fn) and retrieval via .parameters(), .returnType()
7. Parsing Methods
   - Synchronous .parse(), asynchronous .parseAsync(); safe parsing with .safeParse() and .safeParseAsync()
8. Additional Validators
   - Date/time validations: datetime, date, time with options (offset, precision, local)
   - Validators for IP addresses and CIDR notations
   - Promise validation using z.promise(schema)
Detailed technical information includes method signatures, chaining orders, and configuration options directly applicable for developers.

## Supplementary Details
Implementation Specifications:
- Coercion: Using z.coerce.* methods to convert input data. Example: z.coerce.string().email().min(5) applies String() conversion then chain validations.
- Object Schema: Create with z.object({ key: schema }), then modify with .extend({ additionalKey: z.string() }), merge with other objects using .merge(), and selectively pick/omit keys using .pick({ key: true }) or .omit({ key: true }).
- Parsing: Use .parse(data) to retrieve cloned validated output. For error handling, use .safeParse(data) to return { success: false, error: ZodError } if validation fails.
- Function Schema: Define using z.function().args(z.string(), z.number()).returns(z.boolean()) and implement using .implement(fn). Retrieve schema parameters with .parameters() and output with .returnType().
- Recursive Schemas: Use z.lazy(() => schema) for definitions like nested categories.
- Custom Validations: Apply .refine(validator, { message: 'Error message' }) to enforce constraints. Use .superRefine for multiple conditional issues.
- Date Validators: z.string().datetime({ offset: true, precision: 3, local: true }) for ISO 8601 verification.
- Network Validators: z.string().ip({ version: 'v4' }) and z.string().cidr({ version: 'v6' }) for IP and CIDR checks.
- Promise and Instance Checks: Use z.promise(z.number()) for promises and z.instanceof(Class) for class-type validations.

## Reference Details
API Specifications and Code Patterns:
1. z.string(options?: { required_error?: string, invalid_type_error?: string }) -> ZodString
   - Methods:
     .min(n: number, opts?: { message: string }): ZodString
     .max(n: number, opts?: { message: string }): ZodString
     .email(opts?: { message: string }): ZodString
     .regex(re: RegExp, opts?: { message: string }): ZodString
     .trim(), .toLowerCase(), .toUpperCase()
   - Example: z.string({ required_error: "Name required" }).min(5, { message: "Must be at least 5 characters" })

2. z.number(options?: { required_error?: string, invalid_type_error?: string }) -> ZodNumber
   - Methods:
     .gt(value: number), .gte(value: number), .lt(value: number), .lte(value: number, { message: string }), .int(), .positive(), .nonnegative(), .negative(), .nonpositive(), .multipleOf(divisor: number), .finite(), .safe()
   - Example: z.number().gt(0)

3. Object Schemas: z.object({ key: schema }) -> ZodObject
   - Methods:
     .extend({ additionalKey: schema })
     .merge(otherSchema: ZodObject) // B overrides duplicates
     .pick({ key: true }), .omit({ key: true })
     .partial(), .deepPartial(), .required()
     .passthrough(), .strict(), .strip(), .catchall(catchSchema: ZodType)
   - Example: const Dog = z.object({ name: z.string(), age: z.number() }); const DogWithBreed = Dog.extend({ breed: z.string() });

4. Arrays and Tuples:
   - z.array(schema) -> ZodArray
     .nonempty({ message?: string }), .min(n: number), .max(n: number), .length(n: number)
   - Tuples: z.tuple([schema1, schema2, ...]) with .rest(schema)
   - Example: const tuple = z.tuple([z.string(), z.number()]).rest(z.boolean());

5. Unions and Discriminated Unions:
   - Unions: z.union([z.string(), z.number()]) or z.string().or(z.number())
   - Discriminated: z.discriminatedUnion('status', [z.object({ status: z.literal('success'), data: z.string() }), z.object({ status: z.literal('failed'), error: z.instanceof(Error) })])

6. Function Schemas: z.function()
   - Define using .args(...schemas) and .returns(schema)
   - Implement with .implement(fn: Function)
   - Retrieval: .parameters() -> ZodTuple, .returnType() -> ZodType
   - Example: const myFunction = z.function().args(z.string(), z.number()).returns(z.boolean()).implement((s, n) => s.length > n);

7. Parsing Methods:
   - .parse(data: unknown): T (throws ZodError on failure)
   - .parseAsync(data: unknown): Promise<T>
   - .safeParse(data: unknown): { success: boolean, data?: T, error?: ZodError }
   - .safeParseAsync(data: unknown): Promise<{ success: boolean, data?: T, error?: ZodError }> (alias: .spa)

8. Preprocessing and Effects:
   - z.preprocess(preprocessor: (data: unknown) => any, schema: ZodType) returns a ZodEffects instance
   - Example: z.preprocess(val => String(val), z.string())

Best Practices:
- Enable strict mode in tsconfig.json
- Use z.coerce for safe conversion
- Leverage .safeParse for detailed error handling
- For recursive structures, always use z.lazy

Troubleshooting Procedures:
- If .parse throws, run .safeParse to inspect detailed error object
- For async validations, check Promise rejections from .parseAsync
- Validate schema chaining order when using .optional().array() vs z.string().array().optional()
- Use .refine with custom messages to isolate validation issues

All methods return new instances (immutable) allowing method chainability and safe recomposition of schemas.

## Information Dense Extract
z.string({required_error, invalid_type_error}); z.string().min(n, {message}); z.number().gt(v); z.number().lte(v, {message}); z.coerce.string() -> String(input); z.object({key: schema}).extend({}); .merge(), .pick(), .omit(), .partial(), .deepPartial(); z.array(schema).nonempty({message}); z.tuple([schemas]).rest(schema); z.union([z.string(), z.number()]); z.discriminatedUnion('key', [schemas]); z.function().args(schemas).returns(schema).implement(fn); .parse(data); .safeParse(data); .parseAsync(data); .safeParseAsync(data); z.preprocess(fn, schema); z.lazy(()=>schema); Options: { offset, precision, local } for datetime; IP: { version: 'v4'|'v6' }; API follows immutable chaining and returns deep clones.

## Sanitised Extract
Table of Contents:
1. Primitives and Coercion
   - z.string(options), z.number(options), z.boolean(), z.date(), z.bigint(), z.undefined(), z.null(), z.any(), z.unknown(), z.never()
   - Coercion via z.coerce.string(), z.coerce.number(), z.coerce.boolean(), z.coerce.bigint(), z.coerce.date() using built-in converters.
2. Custom Validations and Literals
   - z.literal(value) for fixed values; custom error messages via options; regex and string validations (.min, .max, .email, .regex, etc.)
3. Object Schemas and Extensions
   - z.object({ key: schema }) with methods: .extend(), .merge(), .pick(), .omit(), .partial(), .deepPartial(), .required(), .passthrough(), .strict(), .strip(), .catchall()
4. Arrays, Tuples, and Unions
   - Arrays: z.array(schema) and methods .nonempty(), .min(), .max(), .length()
   - Tuples: z.tuple([...]) with .rest() for variadic arguments
   - Unions using z.union([]) or .or(), discriminatedUnion with a specific key
5. Advanced Schema Features
   - Recursive types using z.lazy(() => schema), ZodEffects (.refine, .superRefine, .transform, .preprocess)
6. Function Schemas
   - z.function() with .args(schema1, schema2, ...), .returns(schema), .implement(fn) and retrieval via .parameters(), .returnType()
7. Parsing Methods
   - Synchronous .parse(), asynchronous .parseAsync(); safe parsing with .safeParse() and .safeParseAsync()
8. Additional Validators
   - Date/time validations: datetime, date, time with options (offset, precision, local)
   - Validators for IP addresses and CIDR notations
   - Promise validation using z.promise(schema)
Detailed technical information includes method signatures, chaining orders, and configuration options directly applicable for developers.

## Original Source
Zod Documentation
https://github.com/colinhacks/zod

## Digest of ZOD

# ZOD DOCUMENTATION

Retrieved on: 2023-10-05

## Overview
Zod is a TypeScript-first schema validation library that provides runtime type inference and a comprehensive API for creating, composing, and refining schemas. This documentation includes detailed specification of API methods, method signatures, configuration options, and exactly how to implement type-safe validations across primitives, objects, arrays, functions, and more.

## Primitives and Coercion
- z.string(options?: { required_error?: string, invalid_type_error?: string }): ZodString
  * Methods: .min(n: number, opts?: { message: string }), .max(n: number, opts?: { message: string }), .email(opts?: { message: string }), .regex(re: RegExp, opts?: { message: string }), .trim(), .toLowerCase(), .toUpperCase()
- z.number(options?: { required_error?: string, invalid_type_error?: string }): ZodNumber
  * Methods: .gt(value: number), .gte(value: number), .lt(value: number), .lte(value: number, opts?: { message: string }), .int(), .positive(), .nonnegative(), .negative(), .nonpositive(), .multipleOf(divisor: number), .finite(), .safe()
- Coercion methods:
  * z.coerce.string() // Uses String(input)
  * z.coerce.number() // Uses Number(input)
  * z.coerce.boolean(), z.coerce.bigint(), z.coerce.date()

## Custom Validations and Literals
- z.literal(value) creates a schema for literal values (number, string, bigint, boolean, symbol).
- Custom error messages may be provided, e.g., z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" })
- Refinements: .refine(validator: (data: T) => any, opts?: { message: string }) for custom validation logic.

## Object Schemas and Extensions
- Creation: z.object({ key: schema, ... })
- Methods:
  * .extend({ newKey: z.string() }) to add or overwrite keys
  * .merge(otherSchema) to combine objects (B overrides duplicates)
  * .pick({ key: true }) and .omit({ key: true }) for selective schema inheritance
  * .partial() and .deepPartial() for optional fields
  * .required() to make fields mandatory
  * .passthrough(), .strict(), and .strip() to control unknown keys
  * .catchall(otherSchema) for validating additional properties

## Arrays, Tuples, and Unions
- Arrays: z.array(schema) or schema.array()
  * Methods: .nonempty(opts?: { message: string }), .min(count: number), .max(count: number), .length(n: number)
- Tuples: z.tuple([schema1, schema2, ...]) with .rest(schema) for variadic elements
- Unions: z.union([z.string(), z.number()]) and .or() for alternate types
- Discriminated unions using z.discriminatedUnion(discriminator: string, options: Array<ZodObject>)

## Advanced Schema Features
- Recursive schemas using z.lazy(() => schema) for tree structures
- ZodEffects: Chain refinements, transformations, and preprocessors (.preprocess(fn, schema))
- Custom schemas: z.custom<T>(validator: (val: any) => boolean, errorMessage?: string)

## Function Schemas
- Declaration: z.function()
  * Define input and output: .args(...schemas) and .returns(schema)
  * Implementation: .implement(fn: Function) for automatic input/output validation
  * Retrieve schemas: .parameters() and .returnType()

## Parsing and Async Parsing
- Synchronous: .parse(data: unknown) returns validated type or throws ZodError
- Asynchronous: .parseAsync(data: unknown): Promise<T>
- Safe parsing: .safeParse(data: unknown) returns { success: boolean, data?: T, error?: ZodError }
- Async safe parsing: .safeParseAsync(data: unknown) (alias .spa)

## Additional Validators
- Date and Time: z.string().datetime(opts?: { offset?: boolean, precision?: number, local?: boolean }), z.string().date(), z.string().time({ precision?: number })
- IP and CIDR: z.string().ip(opts?: { version: 'v4' | 'v6' }), z.string().cidr(opts?: { version: 'v4' | 'v6' })
- Promise schemas: z.promise(schema)
- Instanceof validation: z.instanceof(Constructor)

## Attribution
Data size obtained: 858571 bytes
Number of links found: 5862

## Attribution
- Source: Zod Documentation
- URL: https://github.com/colinhacks/zod
- License: License: MIT
- Crawl Date: 2025-05-02T20:30:25.821Z
- Data Size: 858571 bytes
- Links Found: 5862

## Retrieved
2025-05-02
