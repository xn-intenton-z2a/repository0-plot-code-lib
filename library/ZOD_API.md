# ZOD_API

## Crawl Summary
Zod core consists of schema builders (string, number, boolean, object, array, tuple, union, intersection, enum, nativeEnum), validation methods (parse, safeParse, parseAsync, safeParseAsync), type inference via z.infer, transformation (transform), refinement (refine, superRefine), schema utilities (partial, required, extend, omit, pick, strict), and error handling (ZodError.errors, ZodError.format)

## Normalised Extract
Table of Contents:
1. Schema Builders
2. Validation Methods
3. Type Inference
4. Transformation & Refinement
5. Schema Utilities
6. Error Handling

1. Schema Builders
 z.string(): ZodString
 z.number(): ZodNumber
 z.boolean(): ZodBoolean
 z.object(shape: Record<string, ZodType>): ZodObject<Shape>
 z.array(type: ZodType): ZodArray<T>
 z.tuple(types: ZodType[]): ZodTuple
 z.union(schemas: ZodType[]): ZodUnion
 z.intersection(a: ZodType, b: ZodType): ZodIntersection
 z.enum(values: [string, ...string[]]): ZodEnum
 z.nativeEnum(E: object): ZodNativeEnum

2. Validation Methods
 schema.parse(data: unknown): T
 schema.safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }
 schema.parseAsync(data: unknown): Promise<T>
 schema.safeParseAsync(data: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>

3. Type Inference
 type T = z.infer<typeof schema>

4. Transformation & Refinement
 schema.transform<U>(fn: (val: T) => U): ZodEffects<T, U>
 schema.refine(predicate: (val: T) => boolean, message?: string): this
 schema.superRefine((val: T, ctx: RefinementCtx) => void): this

5. Schema Utilities
 objectSchema.partial(): ZodObject<Partial<Shape>>
 objectSchema.required(): ZodObject<Shape>
 objectSchema.extend<NewShape>(shape: NewShape): ZodObject<Shape & NewShape>
 objectSchema.omit<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Omit<Shape, Keys>>
 objectSchema.pick<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Pick<Shape, Keys>>
 objectSchema.strict(strip?: boolean): ZodObject<Shape>

6. Error Handling
 error.errors: { path: (string | number)[]; message: string; code: string }[]
 error.format(): Record<string, { _errors: string[] }>

## Supplementary Details
String Schema Methods: min(min: number, message?: string), max(max: number, message?: string), length(exact: number, message?: string), email(message?: string), url(message?: string), regex(pattern: RegExp, message?: string), uuid(message?: string), optional(), nullable(), default(def: string), transform(fn: (val: string) => U).

Number Schema Methods: min(min: number, message?: string), max(max: number, message?: string), int(message?: string), positive(message?: string), negative(message?: string), nonnegative(message?: string), nonpositive(message?: string), finite(message?: string).

Refinement Options: second argument refine(predicate, { message: string; params?: Record<string, any> }).

Default Behaviors: parse throws ZodError; safeParse returns success flag; parseAsync and safeParseAsync async support for asynchronous refinements.

Schema Composition: z.object.requires exact shape; strict(true) removes unknown keys; default values via default().

Type Utilities: z.infer<Type>; z.input<Type> to extract input type.


## Reference Details
Function z.string(): ZodString
Class ZodString extends ZodType<string, ZodStringDef, string> {
  min(min: number, message?: string): this;
  max(max: number, message?: string): this;
  length(exact: number, message?: string): this;
  email(message?: string): this;
  url(message?: string): this;
  regex(pattern: RegExp, message?: string): this;
  uuid(message?: string): this;
  optional(): ZodOptional<this>;
  nullable(): ZodNullable<this>;
  default(def: string): ZodDefault<this>;
  transform<U>(fn: (val: string) => U): ZodEffects<string, U>;
  safeParse(data: unknown): { success: boolean; data?: string; error?: ZodError };
  parse(data: unknown): string;
}

Function z.number(): ZodNumber
Class ZodNumber extends ZodType<number, ZodNumberDef, number> {
  min(min: number, message?: string): this;
  max(max: number, message?: string): this;
  int(message?: string): this;
  positive(message?: string): this;
  negative(message?: string): this;
  nonnegative(message?: string): this;
  nonpositive(message?: string): this;
  finite(message?: string): this;
  safeParse(data: unknown): { success: boolean; data?: number; error?: ZodError };
  parse(data: unknown): number;
}

Function z.object<Shape>(shape: Shape): ZodObject<Shape>
Class ZodObject<Shape> extends ZodType<{ [K in keyof Shape]: Infer<Shape[K]> }, ZodObjectDef, unknown> {
  parse(data: unknown): { [K in keyof Shape]: Infer<Shape[K]> };
  safeParse(data: unknown): { success: boolean; data?: { [K in keyof Shape]: Infer<Shape[K]> }; error?: ZodError };
  partial(): ZodObject<Partial<Shape>>;
  required(): ZodObject<Shape>;
  extend<NewShape>(shape: NewShape): ZodObject<Shape & NewShape>;
  omit<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Omit<Shape, Keys>>;
  pick<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Pick<Shape, Keys>>;
  strict(strip?: boolean): ZodObject<Shape>;
}

Full Code Example:
import { z } from 'zod';

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(30),
  email: z.string().email(),
  age: z.number().int().min(0).max(120).optional(),
  preferences: z.record(z.string(), z.any()).default({}),
});

const result = userSchema.safeParse(input);
if (!result.success) {
  console.error(result.error.format());
} else {
  const user: unknown = result.data;
}

Best Practices:
Pin select rules early. Chain validations for clarity. Use safeParse for error handling. Leverage default() for fallback values.

Troubleshooting:
Command: node validate.js
Expected: parsed object or uncaught ZodError
If error, call error.format() to inspect field-level messages.

## Information Dense Extract
z.string():ZodString[min(number,msg),max, length, email, url, regex, uuid, optional, nullable, default, transform] safeParse(data):{success,data?,error?},parse(data):string; z.number():ZodNumber[min,max,int,positive,negative,nonnegative,nonpositive,finite]; z.object(shape):ZodObject[parse, safeParse, partial, required, extend, omit, pick, strict]; z.array(type):ZodArray[min,max,length]; z.union, z.intersection, z.tuple, z.enum, z.nativeEnum; transform<U>(fn):ZodEffects; refine(fn,msg), superRefine(fn); z.infer<Type>; ZodError.errors[{path,message,code}], error.format();

## Sanitised Extract
Table of Contents:
1. Schema Builders
2. Validation Methods
3. Type Inference
4. Transformation & Refinement
5. Schema Utilities
6. Error Handling

1. Schema Builders
 z.string(): ZodString
 z.number(): ZodNumber
 z.boolean(): ZodBoolean
 z.object(shape: Record<string, ZodType>): ZodObject<Shape>
 z.array(type: ZodType): ZodArray<T>
 z.tuple(types: ZodType[]): ZodTuple
 z.union(schemas: ZodType[]): ZodUnion
 z.intersection(a: ZodType, b: ZodType): ZodIntersection
 z.enum(values: [string, ...string[]]): ZodEnum
 z.nativeEnum(E: object): ZodNativeEnum

2. Validation Methods
 schema.parse(data: unknown): T
 schema.safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }
 schema.parseAsync(data: unknown): Promise<T>
 schema.safeParseAsync(data: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>

3. Type Inference
 type T = z.infer<typeof schema>

4. Transformation & Refinement
 schema.transform<U>(fn: (val: T) => U): ZodEffects<T, U>
 schema.refine(predicate: (val: T) => boolean, message?: string): this
 schema.superRefine((val: T, ctx: RefinementCtx) => void): this

5. Schema Utilities
 objectSchema.partial(): ZodObject<Partial<Shape>>
 objectSchema.required(): ZodObject<Shape>
 objectSchema.extend<NewShape>(shape: NewShape): ZodObject<Shape & NewShape>
 objectSchema.omit<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Omit<Shape, Keys>>
 objectSchema.pick<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Pick<Shape, Keys>>
 objectSchema.strict(strip?: boolean): ZodObject<Shape>

6. Error Handling
 error.errors: { path: (string | number)[]; message: string; code: string }[]
 error.format(): Record<string, { _errors: string[] }>

## Original Source
Zod Official Documentation
https://zod.dev

## Digest of ZOD_API

# Zod API Reference

## Schema Builders

z.string(): Returns ZodString
z.number(): Returns ZodNumber
z.boolean(): Returns ZodBoolean
z.object(shape: Record<string, ZodType>): Returns ZodObject
z.array(type: ZodType): Returns ZodArray
z.tuple(types: ZodType[]): Returns ZodTuple
z.union(schemas: ZodType[]): Returns ZodUnion
z.intersection(a: ZodType, b: ZodType): Returns ZodIntersection
z.enum(values: [string, ...string[]]): Returns ZodEnum
z.nativeEnum(E: object): Returns ZodNativeEnum

## Validation Methods

parse(data: unknown): T  
safeParse(data: unknown): { success: boolean; data?: T; error?: ZodError }  
parseAsync(data: unknown): Promise<T>  
safeParseAsync(data: unknown): Promise<{ success: boolean; data?: T; error?: ZodError }>

## Type Inference

type Output = z.infer<typeof schema>

## Transformation & Refinement

transform<U>(fn: (val: T) => U): ZodEffects<T, U>  
refine(predicate: (val: T) => boolean, message?: string): this  
superRefine((val: T, ctx: RefinementCtx) => void): this

## Schema Utilities

partial(): ZodObject<Partial<Shape>>  
required(): ZodObject<Shape>  
extend<NewShape>(shape: NewShape): ZodObject<Shape & NewShape>  
omit<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Omit<Shape, Keys>>  
pick<Keys extends keyof Shape>(keys: Keys[]): ZodObject<Pick<Shape, Keys>>  
strict(strip?: boolean): ZodObject<Shape>

## Error Handling

ZodError.errors: Array<{ path: (string | number)[]; message: string; code: string }>  
ZodError.format(): Record<string, { _errors: string[] }>

Date Retrieved: 2024-06-13
Attribution: Zod Official Documentation
Data Size: 0 bytes

## Attribution
- Source: Zod Official Documentation
- URL: https://zod.dev
- License: License: MIT
- Crawl Date: 2025-05-04T08:49:23.075Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-04
