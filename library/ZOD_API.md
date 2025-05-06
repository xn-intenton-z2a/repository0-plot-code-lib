# ZOD_API

## Crawl Summary
Zod provides TypeScript-first schema definitions for runtime validation. Core schemas include string(), number(), boolean(), object(). Parsing methods parse() throws on failure; safeParse() returns success flag and data or error. Transformations via refine() and transform(). Asynchronous checks supported. Global errorMap override via setErrorMap(). Object schemas accept strict flag. Coercion enabled on numeric, boolean, date schemas via coerce option.

## Normalised Extract
Table of Contents:
1. Schema Creation
2. Parsing Methods
3. Refinement & Transformation
4. Asynchronous Validation
5. Error Mapping
6. Configuration Options

1. Schema Creation
- z.string(): ZodString
- z.number(): ZodNumber
- z.boolean(): ZodBoolean
- z.object<T>(shape, { strict? }): ZodObject<T> (strict defaults to false)

2. Parsing Methods
- parse<T>(input: unknown): T throws ZodError
- safeParse<T>(input: unknown): { success: true; data: T } | { success: false; error: ZodError }

3. Refinement & Transformation
- .refine(check: (data: T) => boolean, message?): this
- .transform<U>(transformer: (data: T) => U): ZodEffects<T, U>

4. Asynchronous Validation
- .refine(asyncCheck: (data: T) => Promise<boolean>, message?): ZodEffects<T, T>

5. Error Mapping
- setErrorMap(mapper: ZodErrorMap): void

6. Configuration Options
- strict: boolean (object unknown key handling)
- coerce: boolean (enable input coercion)


## Supplementary Details
Installation: npm install zod@3.21.4 or yarn add zod@3.21.4
Import: import { z, ZodError, ZodEffects, ZodErrorMap } from 'zod';
Default error messages: min, max, invalid_type
Coercion options: z.coerce.number(), z.coerce.boolean(), z.coerce.date()
Strict object: z.object(shape, { strict: true }) rejects extra keys
Global errorMap example: setErrorMap((issue, ctx) => ({ message: `Error at ${ctx.path.join('.')}: ${issue.code}` }));

## Reference Details
API Signatures:
function string(): ZodString
interface ZodString {
  min(min: number, message?: string): ZodString;
  max(max: number, message?: string): ZodString;
  email(message?: string): ZodString;
  url(message?: string): ZodString;
  uuid(message?: string): ZodString;
  regex(pattern: RegExp, message?: string): ZodString;
  refine(check: (val: string) => boolean, message?: string): ZodEffects<string, string>;
}

function number(): ZodNumber
interface ZodNumber {
  min(min: number, message?: string): ZodNumber;
  max(max: number, message?: string): ZodNumber;
  int(message?: string): ZodNumber;
  positive(message?: string): ZodNumber;
  nonnegative(message?: string): ZodNumber;
  refine(check: (val: number) => boolean, message?: string): ZodEffects<number, number>;
}

function boolean(): ZodBoolean
interface ZodBoolean {}

function object<T extends ZodRawShape>(shape: T, params?: { strict?: boolean; catchall?: ZodTypeAny }): ZodObject<T>
interface ZodObject<T> {
  partial(): ZodObject<Partial<T>>;
  strict(): ZodObject<T>;
  extend<Ext extends ZodRawShape>(extension: Ext): ZodObject<T & Ext>;
  refine(check: (obj: z.infer<ZodObject<T>>) => boolean, message?: string): ZodEffects<any, z.infer<ZodObject<T>>>;
}

Parsing:
- const result = schema.parse(input);
Throws ZodError
- const safe = schema.safeParse(input);
Returns { success: boolean; data?: T; error?: ZodError }

ErrorMap:
function setErrorMap(mapper: ZodErrorMap): void

Examples:
const userSchema = z.object({
  id: z.string().uuid(),
  age: z.number().int().nonnegative()
}, { strict: true });

try {
  const user = userSchema.parse(input);
} catch (e) {
  if (e instanceof ZodError) console.log(e.errors);
}

Best Practices:
- Use safeParse for user input to avoid exceptions
- Enable strict mode on object schemas to strip or reject unknown properties
- Apply .transform for derived values after validation
- Leverage .refine for custom synchronous or asynchronous checks

Troubleshooting:
Command: node -e "console.log(require('zod').z.string().parse(123))"
Expected Output: Throws ZodError with code invalid_type
Fix: Use z.coerce.string() to coerce non-string inputs


## Information Dense Extract
z.string(): ZodString; methods: min(n,msg), max(n,msg), email(msg), url(msg), uuid(msg), regex(rx,msg), refine(fn,msg) -> ZodEffects
z.number(): ZodNumber; methods: min, max, int, positive, nonnegative, refine
z.boolean(): ZodBoolean
z.object(shape, { strict?, catchall? }): ZodObject; methods: partial, strict, extend, refine
parse(input): T throws ZodError
safeParse(input): { success:boolean; data?:T; error?:ZodError }
refine(fn,msg), transform(fn) -> ZodEffects
async refine supported
setErrorMap(mapper) overrides default messages
enable strict to reject unknown keys
use z.coerce.* for input coercion


## Sanitised Extract
Table of Contents:
1. Schema Creation
2. Parsing Methods
3. Refinement & Transformation
4. Asynchronous Validation
5. Error Mapping
6. Configuration Options

1. Schema Creation
- z.string(): ZodString
- z.number(): ZodNumber
- z.boolean(): ZodBoolean
- z.object<T>(shape, { strict? }): ZodObject<T> (strict defaults to false)

2. Parsing Methods
- parse<T>(input: unknown): T throws ZodError
- safeParse<T>(input: unknown): { success: true; data: T } | { success: false; error: ZodError }

3. Refinement & Transformation
- .refine(check: (data: T) => boolean, message?): this
- .transform<U>(transformer: (data: T) => U): ZodEffects<T, U>

4. Asynchronous Validation
- .refine(asyncCheck: (data: T) => Promise<boolean>, message?): ZodEffects<T, T>

5. Error Mapping
- setErrorMap(mapper: ZodErrorMap): void

6. Configuration Options
- strict: boolean (object unknown key handling)
- coerce: boolean (enable input coercion)

## Original Source
Zod Official Documentation
https://zod.dev

## Digest of ZOD_API

# Zod API Specifications
Content retrieved on: 2024-06-25

# Schema Creation

### z.string(): ZodString
TypeScript signature: function string(): ZodString;
Definition: ZodType<string, ZodStringDef, string>

### z.number(): ZodNumber
TypeScript signature: function number(): ZodNumber;
Definition: ZodType<number, ZodNumberDef, number>

### z.boolean(): ZodBoolean
TypeScript signature: function boolean(): ZodBoolean;
Definition: ZodType<boolean, ZodBooleanDef, boolean>

### z.object<T extends ZodRawShape>(shape: T, params?: { strict?: boolean }): ZodObject<T>
TypeScript signature: function object<T extends ZodRawShape>(shape: T, params?: { strict?: boolean }): ZodObject<T>;
Default: strict = false

# Parsing and Validation

## parse<T>(input: unknown): T
Throws ZodError if validation fails.

## safeParse<T>(input: unknown): SafeParseReturn<T>
Returns { success: boolean; data: T } or { success: boolean; error: ZodError }

# Refinement and Transformation

### .refine(check: (data: T) => boolean, message?: string | { message: string }): this
Runs custom synchronous check

### .transform<U>(transformer: (data: T) => U): ZodEffects<T, U>
Applies transformation after validation

# Asynchronous Schemas

### z.string().refine(asyncCheck: (data: string) => Promise<boolean>, message?: string): ZodEffects<string, string>

# Error Mapping

### setErrorMap(mapper: ZodErrorMap): void
Global override for default error messages

# Configuration Options

- strictObjects (boolean): when true, object schemas reject unknown keys
- coerce: enable input coercion for number, date, boolean

# Code Examples

See reference details section for full examples.

# Attribution
Source: Zod Official Documentation (https://zod.dev)
Data Size: 0 bytes
Links Found: 0

## Attribution
- Source: Zod Official Documentation
- URL: https://zod.dev
- License: License: MIT
- Crawl Date: 2025-05-06T00:28:23.964Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-06
