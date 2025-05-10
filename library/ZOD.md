# ZOD

## Crawl Summary
z.string(), z.number(), z.boolean(), z.date(), z.array(), z.object(), z.tuple(), z.union(), z.intersection(), z.record(), z.lazy(), z.literal() produce typed schemas. Constraint methods: min, max, length, email, url, uuid, cuid, datetime, int, positive, negative. Composite builders: object().strict(), partial(), passthrough(), merge(); array().min(), max(), length(); tuple(), enum(), nativeEnum(). parse/parseAsync throw ZodError. safeParse/safeParseAsync return success flag and data or error. ZodError.issues contain path, code, message. setErrorMap customizes messages. zodResolver integrates with RHF.

## Normalised Extract
Table of Contents:
1 Schema Creation
2 Primitive Constraints
3 Composite Types
4 Refinement & Transformation
5 Parsing Methods
6 Error Handling
7 Type Inference
8 Custom Error Maps

1 Schema Creation
Use z.object, z.string, z.number, z.array, z.tuple, z.union to build schemas.
Example: const User = z.object({ id: z.number().int(), name: z.string().min(1) });

2 Primitive Constraints
z.string().min(5,'Min 5 chars').max(20)
z.number().min(0).max(100).int().positive()

3 Composite Types
z.array(z.string()).min(1)
z.tuple([z.string(), z.number()])
z.union([z.string(), z.number()])

4 Refinement & Transformation
z.string().refine(val=>val.startsWith('A'),{message:'Starts with A'})
z.number().transform(val=>val*100)

5 Parsing Methods
parse(data) throws ZodError or returns T
safeParse(data) returns {success, data?, error?}
parseAsync(data) returns Promise<T>
safeParseAsync(data) returns Promise<{success, data?, error?}>

6 Error Handling
Error.issues: array of {path, code, message, expected?, received?}
Use error.format() for nested structure

7 Type Inference
type UserType = z.infer<typeof User>

8 Custom Error Maps
z.setErrorMap((issue,ctx)=>({ message:ctx.defaultError.replace('Expected','Missing') }))

## Supplementary Details
Import & Setup
import { z, ZodError, setErrorMap } from 'zod'

Configuration Options
Default error messages per ZodIssueCode:
invalid_type: "Expected {expected}, received {received}"
custom: uses provided message
unrecognized_keys: "Unrecognized key(s) in object: {keys}"

setErrorMap Signature
(issue: ZodIssue, ctx: { defaultError: string }) => { message: string }
Example:
setErrorMap((issue,ctx)=>{
  if(issue.code==='invalid_type'&&issue.expected==='string'){
    return { message:'Must be text' }
  }
  return { message:ctx.defaultError }
})

Integration Patterns
React Hook Form: use zodResolver(schema)
Next.js API Routes: parse request body with await schema.parseAsync(req.body)

Async Refinements
z.string().refine(async val=>await checkRemote(val),{message:'Invalid'})
Requires parseAsync or safeParseAsync


## Reference Details
Schema Builders:
z.string(): ZodString
z.number(): ZodNumber
z.boolean(): ZodBoolean
z.date(): ZodDate
z.array<T extends ZodTypeAny>(schema: T): ZodArray<T>
z.object<Shape extends ZodRawShape>(shape: Shape, params?): ZodObject<Shape>
z.tuple<T extends [ZodTypeAny,...ZodTypeAny[]]>(schemas: T): ZodTuple<T>
z.union<T extends [ZodTypeAny,...ZodTypeAny[]]>(schemas: [...T]): ZodUnion<T>
z.intersection<A extends ZodTypeAny, B extends ZodTypeAny>(a: A, b: B): ZodIntersection<A,B>
z.record<Key extends ZodTypeAny,Val extends ZodTypeAny>(keySchema: Key, valueSchema: Val)
z.literal<T extends string|number|boolean>(value: T): ZodLiteral<T>
z.enum<Variants extends [string,...string[]]>(values: Variants): ZodEnum<Variants>
z.nativeEnum<E>(enumObj: E): ZodNativeEnum<E>
z.lazy<T extends ZodTypeAny>(getter: ()=>T): ZodLazy<T>

Constraint Methods:
ZodString.min(len: number, message?: string): ZodString
ZodString.max(len: number, message?: string): ZodString
... etc per documentation above

Parsing Methods:
parse<T>(data: unknown): T throws ZodError
safeParse<T>(data: unknown): { success: true; data: T } | { success: false; error: ZodError }
parseAsync<T>(data: unknown): Promise<T>
safeParseAsync<T>(data: unknown): Promise<{ success: true; data: T } | { success: false; error: ZodError }>

ZodError:
class ZodError<T> extends Error {
  issues: ZodIssue[]
  constructor(issues: ZodIssue[])
  format(): ZodFormattedError<T>
}

Example Code:
const UserSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  profile: z.object({
    displayName: z.string().min(3)
  }).partial()
}).strict()

type User = z.infer<typeof UserSchema>

async function validate(input: unknown): Promise<User> {
  const result = await UserSchema.safeParseAsync(input)
  if (!result.success) {
    console.error(result.error.format())
    throw result.error
  }
  return result.data
}

Configuration Options with Effects:
.strict(): strips no keys, throws on extra
.passthrough(): keeps extra keys
.strip(): removes extra keys (default)

Best Practices:
Always use safeParse in user-facing code to avoid uncaught exceptions
Use .strict() on API inputs to reject unexpected data
Define schemas at module scope for reuse and type inference

Troubleshooting:
Invalid type error shows expected and received in ZodError.issues
To debug nested errors, use error.format() or error.issues to log paths
For async refinements, ensure parseAsync is used or Promise rejection occurs


## Information Dense Extract
z.* schema builders for primitives and composites; constraint methods min,max,length,email,url,int,positive,etc; parse/safeParse(+Async) methods; ZodError.issues: path,code,message; setErrorMap customizes messages; type inference via z.infer; use .strict/.passthrough/.partial for object shapes; array.min/max; tuple,union,intersection,record,literal,enum,nativeEnum,lazy; best practice: safeParse + strict for APIs.

## Sanitised Extract
Table of Contents:
1 Schema Creation
2 Primitive Constraints
3 Composite Types
4 Refinement & Transformation
5 Parsing Methods
6 Error Handling
7 Type Inference
8 Custom Error Maps

1 Schema Creation
Use z.object, z.string, z.number, z.array, z.tuple, z.union to build schemas.
Example: const User = z.object({ id: z.number().int(), name: z.string().min(1) });

2 Primitive Constraints
z.string().min(5,'Min 5 chars').max(20)
z.number().min(0).max(100).int().positive()

3 Composite Types
z.array(z.string()).min(1)
z.tuple([z.string(), z.number()])
z.union([z.string(), z.number()])

4 Refinement & Transformation
z.string().refine(val=>val.startsWith('A'),{message:'Starts with A'})
z.number().transform(val=>val*100)

5 Parsing Methods
parse(data) throws ZodError or returns T
safeParse(data) returns {success, data?, error?}
parseAsync(data) returns Promise<T>
safeParseAsync(data) returns Promise<{success, data?, error?}>

6 Error Handling
Error.issues: array of {path, code, message, expected?, received?}
Use error.format() for nested structure

7 Type Inference
type UserType = z.infer<typeof User>

8 Custom Error Maps
z.setErrorMap((issue,ctx)=>({ message:ctx.defaultError.replace('Expected','Missing') }))

## Original Source
Zod Official Documentation
https://zod.dev

## Digest of ZOD

# Zod Official Documentation (retrieved 2024-06-21)

# Schema Types

## ZodString
Signature: `new ZodString(def?: ZodTypeDef)`
Methods:
- `min(minLength: number, message?: string): ZodString`
- `max(maxLength: number, message?: string): ZodString`
- `length(exact: number, message?: string): ZodString`
- `email(message?: string): ZodString`
- `url(message?: string): ZodString`
- `uuid(message?: string): ZodString`
- `cuid(message?: string): ZodString`
- `datetime(options?: { offset?: boolean|number; message?: string }): ZodString`

## ZodNumber
Signature: `new ZodNumber(def?: ZodTypeDef)`
Methods:
- `min(value: number, message?: string): ZodNumber`
- `max(value: number, message?: string): ZodNumber`
- `int(message?: string): ZodNumber`
- `positive(message?: string): ZodNumber`
- `nonnegative(message?: string): ZodNumber`
- `negative(message?: string): ZodNumber`
- `nonpositive(message?: string): ZodNumber`

## ZodObject
Signature: `new ZodObject<Shape extends ZodRawShape, UnknownKeys extends UnknownKeysParam = 'strip', Catchall extends ZodTypeAny = ZodNever>(def?: ZodObjectDef<Shape,UnknownKeys,Catchall>)`
Methods:
- `merge<Other extends ZodRawShape>(other: ZodObject<Other,UnknownKeysParam,ZodTypeAny>): ZodObject<Shape&Other,UnknownKeysParam,ZodTypeAny>`
- `partial(): ZodObject<{ [K in keyof Shape]?: Shape[K] }, UnknownKeysParam, Catchall>`
- `strict(): ZodObject<Shape,'strict',Catchall>`
- `passthrough(): ZodObject<Shape,'passthrough',Catchall>`

## Parsing Methods
- `parse(data: unknown): Type` throws ZodError on failure
- `safeParse(data: unknown): { success: true; data: Type } | { success: false; error: ZodError }`
- `parseAsync(data: unknown): Promise<Type>`
- `safeParseAsync(data: unknown): Promise<{ success: true; data: Type } | { success: false; error: ZodError }>`

## Error Handling
ZodError extends Error
Properties:
- `issues: ZodIssue[]` where ZodIssue includes `path: (string|number)[]`, `code: ZodIssueCode`, `message: string`, `expected?: string`, `received?: string`
Methods:
- `format(): ZodFormattedError<T>`

## Customization
- `setErrorMap((issue: ZodIssue, ctx: { defaultError: string }) => { message: string })`
- `zodResolver(schema: ZodTypeAny) for React Hook Form`

---
Attribution: Zod Official Documentation
Data Size: 0 bytes


## Attribution
- Source: Zod Official Documentation
- URL: https://zod.dev
- License: License: MIT
- Crawl Date: 2025-05-10T00:03:01.764Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
