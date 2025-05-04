# ZOD

## Crawl Summary
Exact Zod core schema constructors and their methods. String, number, boolean, object, array. Parsing and validation functions with signatures. Error object structure. Type inference utilities.

## Normalised Extract
Contents
 1 Schema Definitions
 2 Parsing and Validation
 3 Error Handling
 4 Type Inference

1 Schema Definitions
 z.string() returns ZodString. Methods min length, max length, email, url, uuid, regex
 z.number() returns ZodNumber. Methods min, max, int, positive, negative, nonnegative, nonpositive
 z.boolean() returns ZodBoolean
 z.object(shape) returns ZodObject. Methods strict, passtrough, partial, deepPartial, required, extend
 z.array(itemSchema) returns ZodArray. Methods min, max
 z.union([schemas]) returns ZodUnion
 z.intersection(schemaA, schemaB) returns ZodIntersection
 z.literal(value) returns ZodLiteral
 z.enum([values]) returns ZodEnum
 z.record(keySchema,valueSchema) returns ZodRecord
 z.tuple([schemas]) returns ZodTuple
 z.map(keySchema,valueSchema) returns ZodMap
 z.set(itemSchema) returns ZodSet
 z.promise(schema) returns ZodPromise
 z.lazy(fn) returns ZodLazy
 z.unknown() returns ZodUnknown
 z.any() returns ZodAny
 z.never() returns ZodNever
 z.null() returns ZodNull
 z.undefined() returns ZodUndefined
 z.optional(schema) wraps schema in ZodOptional
 z.nullable(schema) wraps schema in ZodNullable
 z.default(defaultValue) wraps schema in ZodDefault

2 Parsing and Validation
 parse(data) throws ZodError or returns parsed value
 safeParse(data) returns object shape { success: Boolean, data?, error? }
 parseAsync(data) async parse
 safeParseAsync(data) async safe parse
 refine(fn, { message }) add custom check
 transform(fn) apply mapping
 superRefine(fn) push issues manually
 catch(mapper) transform errors

o Effects mode
  strict mode drops unknown keys when object.strict()
 passtrough keeps unknown keys
 partial and deepPartial make all properties optional recursively

3 Error Handling
 ZodError.errors Array of issues with path and message and code
 setErrorMap(customMap) override global messages
 format() normalize into nested object of messages

4 Type Inference
 z.infer<typeof schema> extracts output type
 z.input<typeof schema> extracts input type

## Supplementary Details
Default parse options no config
 Safe parsing does type conversion by default only when using z.coerce variants
 Strict object strips unknown keys only after strict()
 Default error messages per code
 setErrorMap to override codes parsing to HTTP status mapping
 Use transform on z.preprocess for input coercion
 Support async refinements via refine returning Promise<boolean>
 ZodType<any,any,any> base generic with params Output, Def, Input
 ZodOptional Omit undefined in output, ZodNullable adds null to output type
 ZodDefault takes defaultValue and marks output type nonoptional

Common Patterns
 Validate request body express middleware
  const bodySchema = z.object({ name z.string(), age z.number().optional() })
  type BodyInput = z.infer<typeof bodySchema>
  app.post('/', (req,res) => { const result = bodySchema.safeParse(req.body) if(!result.success) return res.status(400).json(result.error.format()) else handle(result.data) })

Use zodResolver for react-hook-form integration

## Reference Details
API Constructors
 z.string() -> ZodString
 z.number() -> ZodNumber
 z.boolean() -> ZodBoolean
 z.object<Shape>(shape: Shape) -> ZodObject<Shape>
 z.array<T>(schema: ZodType<T>) -> ZodArray<ZodType<T>>
 z.union<T extends [ZodTypeAny, ...ZodTypeAny[]]>(types: T) -> ZodUnion<T>
 z.intersection<A extends ZodTypeAny,B extends ZodTypeAny>(a A, b B) -> ZodIntersection<A,B>
 z.literal<T extends string|number|boolean>(value: T) -> ZodLiteral<T>
 z.enum<T extends [string,...string[]]>(values: readonly T) -> ZodEnum<T>
 z.record<K extends ZodTypeAny,V extends ZodTypeAny>(key K, value V) -> ZodRecord<K,V>
 z.tuple<T extends [ZodTypeAny,...ZodTypeAny[]]>(schemas T) -> ZodTuple<T>
 z.map<K extends ZodTypeAny,V extends ZodTypeAny>(key K, value V) -> ZodMap<K,V>
 z.set<T extends ZodTypeAny>(schema T) -> ZodSet<T>
 z.promise<T>(schema ZodType<T>) -> ZodPromise<ZodType<T>>
 z.lazy<T>(getter: () -> ZodType<T>) -> ZodLazy<T>
 z.any() -> ZodAny
 z.unknown() -> ZodUnknown
 z.never() -> ZodNever
 z.null() -> ZodNull
 z.undefined() -> ZodUndefined
 z.optional<T>(schema ZodType<T>) -> ZodOptional<ZodType<T>>
 z.nullable<T>(schema ZodType<T>) -> ZodNullable<ZodType<T>>
 z.default<T>(schema ZodType<T>, defaultValue T) -> ZodDefault<ZodType<T>>

Instance Methods
 .min(n Number, message String?) returns this
 .max(n Number, message String?) returns this
 .int(message String?) returns this
 .positive(message String?) returns this
 .email(message String?) returns this
 .strict() returns extended object schema
 .passthrough() returns extended object schema
 .partial() returns extended object schema
 .deepPartial() returns extended object schema
 .refine(check: Value->Boolean|Promise<Boolean>, options {message String, path Array<String>}) returns this
 .transform(transformer: Value->Any|Promise<Any>) returns ZodType<Any>
 .superRefine((val,ctx)->void) returns this
 .nullable() returns ZodNullable
 .optional() returns ZodOptional
 .default(def) returns ZodDefault
 .catch(mapper: (err ZodError)->Any) returns ZodType

Parsing Methods
 parse(data Any) throws ZodError
 safeParse(data Any) -> { success Boolean, data Any, error ZodError }
 parseAsync(data Any) -> Promise<Type>
 safeParseAsync(data Any) -> Promise<{ success Boolean, data Any, error ZodError }>

Error Type
 ZodError extends Error
  properties:
   issues Array<{ path Array<string|number>, message string, code string, fatal boolean }>
  methods:
   format() -> Record<string,any>
   toString() -> string

Code Examples
 const userSchema = z.object({ id z.string().uuid(), name z.string().min(1), age z.number().int().nonnegative(), email z.string().email() })
 type User = z.infer<typeof userSchema>
 const parsed = await userSchema.parseAsync(input)

Best Practices
 Use safeParse in HTTP endpoints to avoid exceptions
 Use z.coerce.number() for string input that needs conversion
 Chain .refine for business logic checks
 Preprocess inputs with z.preprocess(castFn, schema)

Troubleshooting
 If parse throws unknown error inspect error.issues
 Format errors for clients with error.format()
 For missing properties ensure .strict() or .passthrough() called correctly
 For async refinements await parseAsync


## Information Dense Extract
z.string, z.number, z.boolean, z.object(shape), z.array(item), z.union, z.intersection, z.literal, z.enum, z.record, z.tuple, z.map, z.set, z.promise, z.lazy. Methods: min, max, email, url, uuid, regex, int, positive, negative, nonnegative, nonpositive, strict, passtrough, partial, deepPartial, required, extend, refine(check,options), transform(fn), superRefine, nullable, optional, default, catch. Parsing: parse, safeParse, parseAsync, safeParseAsync. Error: ZodError.issues array. Type inference via z.infer. Common patterns: Express middleware, react-hook-form resolver. Defaults: strict drops unknown, passtrough keeps, safeParse returns success flag. Coercion via z.coerce variants or preprocess. Set global errorMap via setErrorMap.

## Sanitised Extract
Contents
 1 Schema Definitions
 2 Parsing and Validation
 3 Error Handling
 4 Type Inference

1 Schema Definitions
 z.string() returns ZodString. Methods min length, max length, email, url, uuid, regex
 z.number() returns ZodNumber. Methods min, max, int, positive, negative, nonnegative, nonpositive
 z.boolean() returns ZodBoolean
 z.object(shape) returns ZodObject. Methods strict, passtrough, partial, deepPartial, required, extend
 z.array(itemSchema) returns ZodArray. Methods min, max
 z.union([schemas]) returns ZodUnion
 z.intersection(schemaA, schemaB) returns ZodIntersection
 z.literal(value) returns ZodLiteral
 z.enum([values]) returns ZodEnum
 z.record(keySchema,valueSchema) returns ZodRecord
 z.tuple([schemas]) returns ZodTuple
 z.map(keySchema,valueSchema) returns ZodMap
 z.set(itemSchema) returns ZodSet
 z.promise(schema) returns ZodPromise
 z.lazy(fn) returns ZodLazy
 z.unknown() returns ZodUnknown
 z.any() returns ZodAny
 z.never() returns ZodNever
 z.null() returns ZodNull
 z.undefined() returns ZodUndefined
 z.optional(schema) wraps schema in ZodOptional
 z.nullable(schema) wraps schema in ZodNullable
 z.default(defaultValue) wraps schema in ZodDefault

2 Parsing and Validation
 parse(data) throws ZodError or returns parsed value
 safeParse(data) returns object shape { success: Boolean, data?, error? }
 parseAsync(data) async parse
 safeParseAsync(data) async safe parse
 refine(fn, { message }) add custom check
 transform(fn) apply mapping
 superRefine(fn) push issues manually
 catch(mapper) transform errors

o Effects mode
  strict mode drops unknown keys when object.strict()
 passtrough keeps unknown keys
 partial and deepPartial make all properties optional recursively

3 Error Handling
 ZodError.errors Array of issues with path and message and code
 setErrorMap(customMap) override global messages
 format() normalize into nested object of messages

4 Type Inference
 z.infer<typeof schema> extracts output type
 z.input<typeof schema> extracts input type

## Original Source
Zod Official Documentation
https://zod.dev

## Digest of ZOD

# Zod Core Schema API

## z.string()
  Signature  z.string() -> ZodString
  Description  String schema, supports min max length checks
  Methods
    min(minLength Number, message String?) -> ZodString
    max(maxLength Number, message String?) -> ZodString
    email(message String?) -> ZodString
    url(message String?) -> ZodString
    uuid(message String?) -> ZodString
    regex(pattern RegExp, message String?) -> ZodString

## z.number()
  Signature  z.number() -> ZodNumber
  Description  Number schema, supports int checks and bounds
  Methods
    min(minValue Number, message String?) -> ZodNumber
    max(maxValue Number, message String?) -> ZodNumber
    int(message String?) -> ZodNumber
    positive(message String?) -> ZodNumber
    negative(message String?) -> ZodNumber
    nonnegative(message String?) -> ZodNumber
    nonpositive(message String?) -> ZodNumber

## z.boolean()
  Signature  z.boolean() -> ZodBoolean

## z.object()
  Signature  z.object(shape Object<Schema>) -> ZodObject
  Methods
    strict() -> ZodObject
    passtrough() -> ZodObject
    partial() -> ZodObject
    deepPartial() -> ZodObject
    required() -> ZodObject
    extend(shape Object<Schema>) -> ZodObject

## z.array()
  Signature  z.array(item Schema) -> ZodArray
  Methods
    min(minLength Number, message String?) -> ZodArray
    max(maxLength Number, message String?) -> ZodArray

## Parsing and Validation
  parse(data Any) -> Type
  safeParse(data Any) -> { success Boolean, data Any, error ZodError }
  parseAsync(data Any) -> Promise<Type>
  safeParseAsync(data Any) -> Promise<{ success Boolean, data Any, error ZodError }>

## Error Handling
  ZodError
    .errors  Array< { path Array<String|Number>, message String, code String } >
    .format() -> Record<String,Any>

## Type Inference
  type Input = z.infer<typeof schema>
  type Output = z.infer<typeof schema>

Date Retrieved 2024-06-15
Attribution  Zod Official Documentation
Data Size 25kb

## Attribution
- Source: Zod Official Documentation
- URL: https://zod.dev
- License: License: MIT
- Crawl Date: 2025-05-04T04:49:19.872Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-04
