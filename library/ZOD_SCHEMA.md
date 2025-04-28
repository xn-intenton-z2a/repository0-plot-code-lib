# ZOD_SCHEMA

## Crawl Summary
Zod Schema documentation extracted from the Zod site includes API methods for schema creation, type inference, validation (parse, safeParse, parseAsync), error handling, and configuration options such as strict mode and custom error messages. Key methods include z.object, z.string, z.number, and their associated chainable validators like .min(), .max(), with complete method signatures and return types that enable immediate implementation.

## Normalised Extract
Table of Contents:
1. Schema Creation
   - Use z.object to define object schemas with precise key definitions; for strings, use z.string() with chainable methods like .min(minimum: number, message?: string) and .max(maximum: number, message?: string).
2. Type Inference
   - TypeScript types are inferred using z.infer<typeof schema> providing exact type definitions.
3. Validation Methods
   - Schema.validate via parse(input: unknown) that returns validated type or throws ZodError; safeParse(input: unknown) returns an object with success flag and error details; parseAsync(input: unknown) returns a Promise for async operations.
4. Error Handling
   - ZodError is structured with an errors array containing path (e.g., ['age']) and message detailing the validation failure. Use safeParse to capture validation errors without exception throwing.
5. Configuration Options
   - Methods like schema.strict() enforce schema constraints by disallowing unknown keys; custom error messages can be passed to chainable validators.

Detailed Information:
Schema Creation: Define schemas with explicit type validations. Example: Create a user schema with z.object({ name: z.string(), age: z.number().min(18, 'Must be 18 or older') }).
Type Inference: Extract types with z.infer to ensure type safety throughout the code base.
Validation: Use parse for direct validation or safeParse for error-handling workflows. Async validation is available via parseAsync.
Error Handling: Inspect ZodError for detailed error arrays; recommended to use safeParse in production.
Configuration: Use strict mode for exact matches and apply custom messages for more user-friendly errors.

## Supplementary Details
Technical Specifications:
- z.object(input: object): Returns ZodObject with methods to define and validate an object schema. Properties are strictly enforced when using .strict().
- z.string(): Returns ZodString, supports validators .min(min: number, message?: string) and .max(max: number, message?: string).
- z.number(): Returns ZodNumber, supports .min(min: number, message?: string) and .max(max: number, message?: string).
- Validation Methods:
  * parse(input: unknown): InferredType. Throws ZodError if validation fails.
  * safeParse(input: unknown): { success: boolean, data?: InferredType, error?: ZodError }.
  * parseAsync(input: unknown): Promise<InferredType>.
- Error Object (ZodError): Contains errors array with objects { path: Array<any>, message: string, code: string }.
- Configuration Options:
  * schema.strict(): Enforces that no additional keys are present beyond the defined schema; default behavior is non-strict.
Implementation Steps:
1. Define your data schema using z.object and corresponding methods for each field.
2. Validate input using parse or safeParse.
3. Handle errors by inspecting the errors array from ZodError.
4. For asynchronous data, use parseAsync and await the promised result.


## Reference Details
API Specifications:
- z.object(shape: object): ZodObject; where shape keys are mapped to Zod schema types.
- z.string(): ZodString; Methods:
   * min(minimum: number, message?: string): ZodString
   * max(maximum: number, message?: string): ZodString
   * regex(regex: RegExp, message?: string): ZodString
- z.number(): ZodNumber; Methods:
   * min(minimum: number, message?: string): ZodNumber
   * max(maximum: number, message?: string): ZodNumber
- z.boolean(): ZodBoolean
- z.array(itemSchema: ZodTypeAny): ZodArray; Methods:
   * nonempty(message?: string): ZodArray
- Validation Methods:
   * schema.parse(input: unknown): InferredType; throws ZodError on failure
   * schema.safeParse(input: unknown): { success: boolean, data?: InferredType, error?: ZodError }
   * schema.parseAsync(input: unknown): Promise<InferredType>
- Error Handling:
   * ZodError: { errors: Array<{ path: Array<string|number>, message: string, code: string }> }
- Implementation Pattern Example:
   Define schema: let userSchema = z.object({ name: z.string(), age: z.number().min(18, 'Must be 18 or older') });
   Validate data: const result = userSchema.safeParse(inputData);
   If result.success is false, inspect result.error.errors for error details.
- Configuration Options:
   * schema.strict(): Returns a schema that only accepts keys defined in the object; additional keys result in error.
- Best Practices:
   1. Use safeParse in production to avoid exception-based control flow.
   2. Leverage z.infer for consistent type definitions throughout TypeScript projects.
   3. Utilize custom error messages to provide clear validation feedback.
- Troubleshooting Procedures:
   * On encountering ZodError, run: console.log(result.error.format());
   * Check each error object's path and message for pinpointing issues.
   * In asynchronous contexts, use try-catch with await schema.parseAsync(inputData) and log errors accordingly.

## Information Dense Extract
Zod Schema: Use z.object, z.string, z.number, z.boolean, z.array; method signatures include z.object({}), z.string().min(num, msg), z.number().max(num, msg); validation via parse(input): returns type or throws ZodError; safeParse(input): { success, data, error }; parseAsync(input): Promise<type>; ZodError contains errors array with path and message; configuration via schema.strict() for key enforcement; best practice: use safeParse for error handling; API examples provided; troubleshooting: log error.format(); Type inference via z.infer.

## Sanitised Extract
Table of Contents:
1. Schema Creation
   - Use z.object to define object schemas with precise key definitions; for strings, use z.string() with chainable methods like .min(minimum: number, message?: string) and .max(maximum: number, message?: string).
2. Type Inference
   - TypeScript types are inferred using z.infer<typeof schema> providing exact type definitions.
3. Validation Methods
   - Schema.validate via parse(input: unknown) that returns validated type or throws ZodError; safeParse(input: unknown) returns an object with success flag and error details; parseAsync(input: unknown) returns a Promise for async operations.
4. Error Handling
   - ZodError is structured with an errors array containing path (e.g., ['age']) and message detailing the validation failure. Use safeParse to capture validation errors without exception throwing.
5. Configuration Options
   - Methods like schema.strict() enforce schema constraints by disallowing unknown keys; custom error messages can be passed to chainable validators.

Detailed Information:
Schema Creation: Define schemas with explicit type validations. Example: Create a user schema with z.object({ name: z.string(), age: z.number().min(18, 'Must be 18 or older') }).
Type Inference: Extract types with z.infer to ensure type safety throughout the code base.
Validation: Use parse for direct validation or safeParse for error-handling workflows. Async validation is available via parseAsync.
Error Handling: Inspect ZodError for detailed error arrays; recommended to use safeParse in production.
Configuration: Use strict mode for exact matches and apply custom messages for more user-friendly errors.

## Original Source
Zod Schema Validation Docs
https://zod.dev/

## Digest of ZOD_SCHEMA

# ZOD SCHEMA DOCUMENTATION

Retrieved on: 2023-10-06

This document provides the complete technical details for Zod Schema Validation as extracted from the Zod documentation. It covers schema creation, type inference, validation methods, error handling, and configuration options with detailed API specifications, method signatures, configuration parameters, and troubleshooting steps.

## Schema Creation

Define schemas using z.object, z.string, z.number, z.boolean, z.enum, z.array, and more. Example:

  let userSchema = z.object({
    name: z.string(),
    age: z.number().min(18, 'Must be 18 or older')
  });

Method Signatures:
  - z.object(input: object): ZodObject
  - z.string(): ZodString
  - z.number(): ZodNumber
  - z.boolean(): ZodBoolean
  - z.array(itemSchema: ZodTypeAny): ZodArray

## Type Inference

Zod automatically infers TypeScript types from schemas using the inferred method:

  type UserType = z.infer<typeof userSchema>

## Validation Methods

Validation can be performed using:

  - parse(data: unknown): returns parsed data if valid or throws ZodError on failure
  - safeParse(data: unknown): returns { success: boolean, data?: any, error?: ZodError }
  - parseAsync(data: unknown): returns a Promise that resolves with valid data or rejects with ZodError

Method Signatures:
  - schema.parse(input: unknown): InferredType
  - schema.safeParse(input: unknown): { success: boolean, data?: InferredType, error?: ZodError }
  - schema.parseAsync(input: unknown): Promise<InferredType>

## Error Handling

ZodError objects are thrown on validation errors. They contain an errors array with details:

  - path: Array indicating the location of the error (e.g. ['age'])
  - message: The error message string

For safe parsing, use safeParse to obtain error details without throwing exceptions.

## Configuration Options

Schemas can be configured to enforce strict checking:

  - schema.strict(): converts a schema to only allow defined keys

Custom error messages and refinements can be applied on any type, e.g.,

  - z.string().min(length: number, message?: string)
  - z.number().max(limit: number, message?: string)

## Troubleshooting Procedures

1. When encountering ZodError, inspect the error.errors array for detailed messages and paths.
2. Use schema.safeParse(data) to handle errors gracefully without exceptions.
3. Verify that input data conforms exactly to the schema structure; consider using schema.strict() to enforce no unknown keys.
4. For asynchronous validation issues, ensure use of parseAsync and proper handling of promises.

Attribution: Extracted from Zod Schema Validation Docs with source content originally at https://zod.dev/. Data Size: 0 bytes as per crawl.

## Attribution
- Source: Zod Schema Validation Docs
- URL: https://zod.dev/
- License: MIT License
- Crawl Date: 2025-04-28T11:49:49.946Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-28
