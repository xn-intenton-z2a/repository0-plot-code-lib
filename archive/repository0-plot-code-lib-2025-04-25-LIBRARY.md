library/ZOD_LIBRARY.md
# library/ZOD_LIBRARY.md
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
library/SVG2_SPEC.md
# library/SVG2_SPEC.md
# SVG2_SPEC

## Crawl Summary
This crawl extracted the SVG 2 Candidate Recommendation including detailed sections on document status, rendering model, DOM interfaces for SVG elements, detailed descriptions of basic data types, document structure, CSS styling integration, geometry properties, coordinate systems, path data grammar, basic shapes, text layout, embedded content, and comprehensive painting instructions. Specific technical topics include detailed API and DOM interface names, attribute definitions, transformation mechanisms, and error handling strategies as defined in the SVG 2 specification.

## Normalised Extract
Table of Contents:
1. Status and Document History
   - Candidate Recommendation dated 04 October 2018
   - URLs for candidate, latest and previous versions
2. Rendering Model
   - Rendering tree definition, painters model, stacking context establishment, effects of 'display', 'visibility', and 'opacity'
3. Basic Data Types and DOM Interfaces
   - Definitions of SVGNumber, SVGLength, SVGAngle, and corresponding list interfaces
   - DOM interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement, SVGAnimated* interfaces
4. Document Structure
   - Structure: <svg>, <g>, <defs>, <symbol>, <use>, <switch>, <desc>, <title>, <metadata>
   - Common attributes (id, lang, xml:lang, xml:space, tabindex, data-*) and WAI-ARIA attributes
5. Styling and CSS Integration
   - Use of inline style (<style>) and external style sheets (<link>)
   - Presentation attributes and user agent style sheet details
   - SVGStyleElement interface
6. Geometry Properties
   - Attributes: cx, cy, r, rx, ry, x, y, width, height
7. Coordinate Systems and Transformations
   - 'transform' property, viewBox, preserveAspectRatio, initial viewport concepts
   - DOM interfaces: SVGTransform, SVGTransformList, SVGAnimatedTransformList, SVGPreserveAspectRatio, SVGAnimatedPreserveAspectRatio
8. Paths and Path Data Grammar
   - Definition of <path> element with 'd' attribute commands (moveto, lineto, curves, elliptical arcs, closepath)
   - Grammar rules and error handling for path data
   - SVGPathElement interface
9. Basic Shapes
   - Elements: <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>
   - Corresponding DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGPolylineElement, SVGPolygonElement
10. Text
   - Elements: <text>, <tspan>, <textPath>
   - Attributes: x, y, dx, dy, rotate; properties for inline-size, shape-inside, text-anchor, kerning, glyph orientation
   - DOM interfaces: SVGTextContentElement, SVGTextPositioningElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement
11. Embedded Content
   - Embedding via <image> and <foreignObject>
   - DOM interfaces: SVGImageElement, SVGForeignObjectElement
12. Painting: Filling, Stroking, Markers
   - Fill properties: fill, fill-rule, fill-opacity
   - Stroke properties: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset
   - Marker definitions using <marker> element and properties marker-start, marker-mid, marker-end
   - Additional properties: paint-order, color-interpolation, color-rendering, shape-rendering, text-rendering, image-rendering, and 'will-change'

Each section includes explicit technical definitions, attribute names, DOM interfaces and interfaces method specifications as defined in the SVG 2 specification.

## Supplementary Details
Technical Specifications and Implementation Details:
- Candidate Recommendation: 04 October 2018. URLs provided for candidate, latest, and previous versions.
- DOM Interface Specifications include full names such as SVGElement, SVGGraphicsElement, SVGGeometryElement, and specific SVGAnimatedXXX interfaces for animatable properties.
- Transformation details: 'transform' property accepts matrices, translations, rotations, scaling. The 'viewBox' attribute defines the initial coordinate system. 'preserveAspectRatio' specifies alignment and meet/slice options.
- Path Data: 'd' attribute grammar includes commands (M, L, C, Q, A, Z) with precise semantics; error handling includes checking for out-of-range elliptical arc parameters and zero-length segments.
- Configuration Options: Styling can be applied using inline styles, external CSS, or presentation attributes, with defaults defined by the user agent style sheet. Attributes like tabindex, data-* are supported with exact parameter rules.
- Best Practices: Use <defs> for reusable content, employ <use> with shadow trees for instance reuse, maintain accessibility with proper use of <title> and <desc>, and adhere to SVG DOM interface specifications for dynamic modifications via script.
- Troubleshooting Procedures: Validate SVG files against the SVG 2 specification, check for correct use of namespaces, verify that transformation matrices are computed correctly, and use browser developer tools to inspect computed styles and DOM interfaces. Typical commands include DOM inspection tools or validating against schema (e.g., xmllint) which should return no errors when compliant.

## Reference Details
API Specifications and Code Examples:
1. DOM Interfaces:
   - Interface SVGElement: Base interface for all SVG elements.
   - Interface SVGGraphicsElement: Inherits from SVGElement and adds properties for geometric rendering.
   - Interface SVGPathElement: Methods include:
       getTotalLength() -> number
       getPointAtLength(distance: number) -> DOMPoint
       getPathSegAtLength(distance: number) -> number
   - Interface SVGAnimatedTransformList: Provides access to transformation lists via baseVal and animVal properties.

2. Method Signatures Examples:
   - function createSVGElement(tagName: string): SVGElement
   - function setAttribute(element: SVGElement, name: string, value: string): void
   - Example usage:
       // Create an SVG circle
       const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
       circle.setAttribute('cx', '50');
       circle.setAttribute('cy', '50');
       circle.setAttribute('r', '40');
       circle.setAttribute('fill', 'red');
       document.querySelector('svg').appendChild(circle);

3. Configuration Options:
   - 'viewBox': string; e.g., '0 0 100 100'; defines the coordinate system.
   - 'preserveAspectRatio': string; options include 'xMidYMid meet', 'xMinYMin slice'; defines scaling behavior.
   - 'transform': string; accepts transformation functions like translate(10,20), rotate(45), scale(2).

4. Best Practices:
   - Use <defs> to store reusable elements to reduce duplication.
   - Maintain clear separation of styling by using external CSS when possible.
   - Validate SVG syntax using XML validators and browser developer tools.

5. Troubleshooting Procedures:
   - Command: xmllint --noout --schema svg2.xsd file.svg
     Expected output: file.svg: valid
   - Use browser inspector to verify computed styles and transformation matrices.
   - Check for namespace errors when embedding SVG inside HTML by ensuring the correct XML namespace is declared: xmlns="http://www.w3.org/2000/svg".

These API specifications, method signatures, code examples, configuration options, best practices and troubleshooting steps represent the technical core of the SVG 2 specification directly as defined by W3C.

## Information Dense Extract
SVG2 Candidate Rec 04Oct2018; URLs:Cand:https://www.w3.org/TR/2018/CR-SVG2-20181004/, Latest:https://www.w3.org/TR/SVG2/; Metadata: DataSize=25244860, Links=196440; Sections: Status (Doc history, review annotations), RenderingModel (render tree, painters, stacking), DataTypes (SVGNumber, SVGLength, SVGAnimated*), DocumentStructure (svg, g, defs, symbol, use, switch, metadata), Styling (CSS, style element, SVGStyleElement), Geometry (cx,cy,r,rx,ry,x,y,width,height), CoordinateSystems (transform, viewBox, preserveAspectRatio, SVGTransformList), Paths (d attribute, M,L,C,Q,A,Z, SVGPathElement), BasicShapes (rect, circle, ellipse, line, polyline, polygon), Text (text, tspan, textPath, text-anchor, kerning, white-space, SVGTextElement), Embedded (image, foreignObject), Painting (fill, stroke, marker, paint-order, color-rendering, shape-rendering, SVGMarkerElement); API: Methods: getTotalLength() :number, getPointAtLength(distance:number):DOMPoint; Config: viewBox, preserveAspectRatio, transform; Best Practices: use defs, external CSS, namespace declaration; Troubleshoot: xmllint --schema svg2.xsd file.svg

## Sanitised Extract
Table of Contents:
1. Status and Document History
   - Candidate Recommendation dated 04 October 2018
   - URLs for candidate, latest and previous versions
2. Rendering Model
   - Rendering tree definition, painters model, stacking context establishment, effects of 'display', 'visibility', and 'opacity'
3. Basic Data Types and DOM Interfaces
   - Definitions of SVGNumber, SVGLength, SVGAngle, and corresponding list interfaces
   - DOM interfaces: SVGElement, SVGGraphicsElement, SVGGeometryElement, SVGAnimated* interfaces
4. Document Structure
   - Structure: <svg>, <g>, <defs>, <symbol>, <use>, <switch>, <desc>, <title>, <metadata>
   - Common attributes (id, lang, xml:lang, xml:space, tabindex, data-*) and WAI-ARIA attributes
5. Styling and CSS Integration
   - Use of inline style (<style>) and external style sheets (<link>)
   - Presentation attributes and user agent style sheet details
   - SVGStyleElement interface
6. Geometry Properties
   - Attributes: cx, cy, r, rx, ry, x, y, width, height
7. Coordinate Systems and Transformations
   - 'transform' property, viewBox, preserveAspectRatio, initial viewport concepts
   - DOM interfaces: SVGTransform, SVGTransformList, SVGAnimatedTransformList, SVGPreserveAspectRatio, SVGAnimatedPreserveAspectRatio
8. Paths and Path Data Grammar
   - Definition of <path> element with 'd' attribute commands (moveto, lineto, curves, elliptical arcs, closepath)
   - Grammar rules and error handling for path data
   - SVGPathElement interface
9. Basic Shapes
   - Elements: <rect>, <circle>, <ellipse>, <line>, <polyline>, <polygon>
   - Corresponding DOM interfaces: SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGPolylineElement, SVGPolygonElement
10. Text
   - Elements: <text>, <tspan>, <textPath>
   - Attributes: x, y, dx, dy, rotate; properties for inline-size, shape-inside, text-anchor, kerning, glyph orientation
   - DOM interfaces: SVGTextContentElement, SVGTextPositioningElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement
11. Embedded Content
   - Embedding via <image> and <foreignObject>
   - DOM interfaces: SVGImageElement, SVGForeignObjectElement
12. Painting: Filling, Stroking, Markers
   - Fill properties: fill, fill-rule, fill-opacity
   - Stroke properties: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset
   - Marker definitions using <marker> element and properties marker-start, marker-mid, marker-end
   - Additional properties: paint-order, color-interpolation, color-rendering, shape-rendering, text-rendering, image-rendering, and 'will-change'

Each section includes explicit technical definitions, attribute names, DOM interfaces and interfaces method specifications as defined in the SVG 2 specification.

## Original Source
W3C SVG 2 Documentation
https://www.w3.org/TR/SVG2/

## Digest of SVG2_SPEC

# SVG2 SPECIFICATION

Retrieved on: 2023-10-13

# Document Metadata

This document is the W3C Candidate Recommendation for SVG 2, dated 04 October 2018. It supersedes earlier versions such as the 04 August 2018 Candidate Recommendation and builds upon SVG 1.1 Second Edition. The specification is available at:
- Candidate Recommendation: https://www.w3.org/TR/2018/CR-SVG2-20181004/
- Latest version: https://www.w3.org/TR/SVG2/
- Previous version: https://www.w3.org/TR/2018/CR-SVG2-20180807/

Attribution:
- Data Size: 25244860 bytes
- Links Found: 196440
- Crawled from: https://www.w3.org/TR/SVG2/

# Table of Contents
1. Status and Document History
2. Rendering Model
3. Basic Data Types and DOM Interfaces
4. Document Structure
5. Styling and CSS Integration
6. Geometry Properties
7. Coordinate Systems, Transformations and Units
8. Paths and Path Data Grammar
9. Basic Shapes and Associated DOM Interfaces
10. Text Rendering and Layout
11. Embedded Content
12. Painting: Filling, Stroking and Marker Symbols

# 1. Status and Document History
- Candidate Recommendation dated 04 October 2018
- Expected to advance to Proposed Recommendation no earlier than 04 December 2018
- Contains annotations indicating review status: red (unchanged or new work), yellow (reviewed and rewritten), white (ready for wider review)

# 2. Rendering Model
- Defines the rendering tree, the painters model, and the rendering order.
- Topics include: establishing stacking contexts, rendered versus non-rendered elements, controlling visibility using 'display' and 'visibility', re-used graphics, and group opacity via the 'opacity' property.

# 3. Basic Data Types and DOM Interfaces
- Defines basic numeric types, angles, lengths and clamping rules.
- DOM interfaces include:
  - SVGElement
  - SVGGraphicsElement
  - SVGGeometryElement
  - SVGNumber, SVGLength, SVGAngle and their list interfaces, e.g. SVGNumberList, SVGLengthList, SVGStringList
- Interfaces for animatable attributes:
  - SVGAnimatedBoolean, SVGAnimatedEnumeration, SVGAnimatedInteger, SVGAnimatedNumber, SVGAnimatedLength, SVGAnimatedAngle, SVGAnimatedString, SVGAnimatedRect, SVGAnimatedNumberList, SVGAnimatedLengthList
- Other interfaces include SVGUnitTypes, SVGTests, SVGFitToViewBox, SVGZoomAndPan, and SVGURIReference

# 4. Document Structure
- Root element: <svg>
- Grouping element: <g>
- Reusable content defined using <defs>
- Symbol definitions with <symbol>
- Content reuse via <use> and the use-element shadow tree
- Conditional processing with <switch> and attributes such as requiredExtensions and systemLanguage
- Metadata embedding through <desc>, <title>, and <metadata>
- Common attributes: id, lang, xml:lang, xml:space, tabindex, data-* attributes, and WAI-ARIA attributes

# 5. Styling and CSS Integration
- Styling with inline <style> elements and external style sheets via <link> (HTML effect) 
- Element-specific styling via class and style attributes
- Presentation attributes and default user agent styles
- Required CSS features and DOM interface: SVGStyleElement

# 6. Geometry Properties
- Attributes for positioning and sizing shapes: cx, cy (center coordinates), r (radius), rx, ry, x, y, width, height

# 7. Coordinate Systems, Transformations and Units
- Definition of the initial viewport and coordinate system
- Transformation using the 'transform' property and the 'viewBox' and 'preserveAspectRatio' attributes
- Introduction to units and bounding boxes including object bounding box units
- DOM interfaces for transformations: SVGTransform, SVGTransformList, SVGAnimatedTransformList, SVGPreserveAspectRatio, SVGAnimatedPreserveAspectRatio

# 8. Paths and Path Data Grammar
- Definition and usage of the <path> element
- The 'd' attribute defines path commands including:
  - moveto commands
  - lineto commands
  - cubic and quadratic Bézier curves
  - elliptical arc commands
  - closepath commands with segment-completing operations
- Detailed grammar for path data and error handling, including out-of-range arc parameters and zero-length segments
- DOM interface: SVGPathElement

# 9. Basic Shapes and Associated DOM Interfaces
- Supported elements include:
  - <rect>
  - <circle>
  - <ellipse>
  - <line>
  - <polyline>
  - <polygon>
- Corresponding DOM interfaces include: SVGRectElement, SVGCircleElement, SVGEllipseElement, SVGLineElement, SVGAnimatedPoints, SVGPointList, SVGPolylineElement, SVGPolygonElement

# 10. Text Rendering and Layout
- Text is handled by <text> and <tspan> elements
- Attributes for text positioning: x, y, dx, dy, rotate
- Text layout properties such as inline-size, shape-inside, shape-subtract, shape-image-threshold, shape-margin, and shape-padding
- Additional text formatting options including text anchoring ('text-anchor'), kerning, glyph orientation (horizontal and vertical), and white space handling
- Advanced text methods: text on a path using <textPath>
- DOM interfaces: SVGTextContentElement, SVGTextPositioningElement, SVGTextElement, SVGTSpanElement, SVGTextPathElement

# 11. Embedded Content
- Embedding external content via <image> and <foreignObject> elements
- Inclusion of HTML elements within SVG subtrees
- DOM interfaces: SVGImageElement, SVGForeignObjectElement

# 12. Painting: Filling, Stroking and Marker Symbols
- Specification of paint using properties:
  - Fill properties: fill, fill-rule, fill-opacity
  - Stroke properties: stroke, stroke-opacity, stroke-width, stroke-linecap, stroke-linejoin (with miter limit adjustments), stroke-dasharray, stroke-dashoffset
- Definition of markers via the <marker> element with attributes for marker-start, marker-mid, and marker-end
- Control over paint operation order via the 'paint-order' property
- Color space and rendering hints with 'color-interpolation', 'color-rendering', 'shape-rendering', 'text-rendering', and 'image-rendering'
- DOM interface: SVGMarkerElement


## Attribution
- Source: W3C SVG 2 Documentation
- URL: https://www.w3.org/TR/SVG2/
- License: License: W3C Document License
- Crawl Date: 2025-04-25T00:39:08.062Z
- Data Size: 25244860 bytes
- Links Found: 196440

## Retrieved
2025-04-25
library/GNUPLOT.md
# library/GNUPLOT.md
# GNUPLOT

## Crawl Summary
Plot command structure: plot 'data.dat' using 1:2 with lines title 'Graph Title'. Configuration commands include set terminal (png, svg, pdf with options like enhanced font), set output (defines the output file), and axis labeling. Scripting supports sequential command execution in .gp files with variables, loops, and functions. Data files can be loaded with specific file format handling options (CSV, space-delimited) and missing value tokens.

## Normalised Extract
Table of Contents:
1. Command Syntax
2. Configuration Options
3. Scripting and Automation
4. File Formats and Data Handling

1. Command Syntax:
Command: plot 'datafile' using <columns> with <style> title <string>
Example: plot 'data.dat' using 1:2 with lines title Graph
Parameters include file name, column specification, style (lines, points, errorbars), and an optional title. 

2. Configuration Options:
Commands: set terminal, set output, set title, set xlabel, set ylabel
Details: set terminal type accepts png (default at 96 dpi), svg, pdf with options such as enhanced display and font specifications. set output defines the file destination.

3. Scripting and Automation:
Usage: Write commands in a .gp script file. Supports variable assignments (e.g., x = 10), loops (do for [i=1:10]), and function declarations (e.g., f(x)=sin(x)). Execute scripts via command line: gnuplot script.gp. Implements error checking by verifying command outputs interactively.

4. File Formats and Data Handling:
Supports formats: CSV, space-delimited, binary. Use load command to import data. Allows configuration of delimiters and handling of missing data values through specific tokens.

## Supplementary Details
Technical Specifications:
- Plot Command: Requires a data file, using clause for columns (e.g., '1:2'), and style specifier (lines, points, etc.).
- set terminal: Options include png (default, 96 dpi), svg, pdf. Example: set terminal png enhanced font 'Helvetica,10'.
- set output: Accepts a file path string for output. Example: set output 'chart.png'.
- Scripting: Support for inline variable assignment, loop control (do for [...] syntax), and function definitions. Scripts are stored in .gp files and executed with gnuplot command.
- Data Handling: Load data with load 'filename'. Configure file delimiters and define markers for missing data. Reuse previous settings with replot command.
- Configuration defaults and override options are explicitly defined in command syntax.

## Reference Details
Complete API Specifications:
- plot command: Syntax: plot <filename:string> using <columns:string> with <style:enum> title <title:string>
  - Example: plot 'data.dat' using 1:2 with lines title 'Sample Data'
- set terminal: Syntax: set terminal <type:string> [options]
  - Example: set terminal png enhanced font 'Helvetica,10'
  - Accepted types: png, svg, pdf, with configurable options for resolution and font.
- set output: Syntax: set output <filename:string>
  - Example: set output 'output.png'
- Scripting Example:
  set terminal pdf
  set output 'output.pdf'
  set title 'Graph Example'
  plot 'data.dat' using 1:2 with linespoints title 'Data Plot'
- Troubleshooting Procedures:
  1. Verify file existence using ls -l <filename>
  2. Check syntax in interactive mode by executing commands one by one.
  3. Reset session with reset command before replotting.
- Best Practices:
  * Always set terminal and output prior to plotting.
  * Use clear and descriptive titles for better readability.
  * Comment scripts using # for inline documentation.
  * Validate data format compatibility before loading.


## Information Dense Extract
plot 'data.dat' using 1:2 with lines title 'Graph Title'; set terminal png enhanced font 'Helvetica,10'; set output 'chart.png'; script: variables, do for loops, function definitions f(x)=sin(x); load 'data.dat', CSV delimitation, missing token handling; troubleshooting: check file existence, syntax validation, reset command; API: plot(filename:string, using:string, with:style, title:string), set terminal(type:string, options), set output(filename:string)

## Sanitised Extract
Table of Contents:
1. Command Syntax
2. Configuration Options
3. Scripting and Automation
4. File Formats and Data Handling

1. Command Syntax:
Command: plot 'datafile' using <columns> with <style> title <string>
Example: plot 'data.dat' using 1:2 with lines title Graph
Parameters include file name, column specification, style (lines, points, errorbars), and an optional title. 

2. Configuration Options:
Commands: set terminal, set output, set title, set xlabel, set ylabel
Details: set terminal type accepts png (default at 96 dpi), svg, pdf with options such as enhanced display and font specifications. set output defines the file destination.

3. Scripting and Automation:
Usage: Write commands in a .gp script file. Supports variable assignments (e.g., x = 10), loops (do for [i=1:10]), and function declarations (e.g., f(x)=sin(x)). Execute scripts via command line: gnuplot script.gp. Implements error checking by verifying command outputs interactively.

4. File Formats and Data Handling:
Supports formats: CSV, space-delimited, binary. Use load command to import data. Allows configuration of delimiters and handling of missing data values through specific tokens.

## Original Source
Gnuplot Documentation
https://www.gnuplot.info/documentation.html

## Digest of GNUPLOT

# GNUPLOT DOCUMENTATION

Retrieved Date: 2023-10-05

## Table of Contents
1. Command Syntax
2. Configuration Options
3. Scripting and Automation
4. File Formats and Data Handling

## 1. Command Syntax
The primary plotting command follows the format:
   plot 'datafile' using <columns> with <style> title <string>
Example: plot 'data.dat' using 1:2 with lines title 'Graph Title'
Additional options support errorbars and custom axis ranges.

## 2. Configuration Options
Key configuration commands include:
   set terminal <type> [options]
      - Options: png (default, 96 dpi), svg, pdf
      - Example: set terminal png enhanced font 'Helvetica,10'
   set output <filename>
      - Specifies the output file path. Example: set output 'chart.png'
   set title <string>
   set xlabel <string>
   set ylabel <string>
Other settings: grid, border, margin configurations are available with explicit defaults.

## 3. Scripting and Automation
Gnuplot scripts use a sequential command structure in .gp files. Example usage:
   set terminal pdf
   set output 'output.pdf'
   set title 'Graph Example'
   plot 'data.dat' using 1:2 with linespoints title 'Data Plot'
Scripting supports:
   - Variable definition (e.g. x = 10)
   - Iterative loops (e.g. do for [i=1:10])
   - Function definitions (e.g. f(x) = sin(x))
Error handling can be simulated by checking file existence and command validity in interactive mode.

## 4. File Formats and Data Handling
Gnuplot supports multiple data formats including CSV, space-delimited text, and binary input files. Features include:
   - Data loading: load 'data.dat'
   - File format configuration: Specify delimiters and quote characters
   - Handling missing values through designated tokens

Attribution: Crawled from https://www.gnuplot.info/documentation.html (Data Size: 0 bytes)

## Attribution
- Source: Gnuplot Documentation
- URL: https://www.gnuplot.info/documentation.html
- License: License: GPL
- Crawl Date: 2025-04-22T04:49:19.032Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-22
library/JAVASCRIPT_MODULES.md
# library/JAVASCRIPT_MODULES.md
# JAVASCRIPT_MODULES

## Crawl Summary
Module system overview; Canvas Module: create(wrapperId, parentElement, width, height) returns {ctx, id}, createReportList(wrapperId) returns list id; Square Module: constant name = 'square', draw(ctx, length, x, y, color) returns {length, x, y, color}, reportArea(length, reportList), reportPerimeter(length, reportList); Export syntax: named exports, default exports, aggregated exports; Import examples using relative paths, import maps for remapping; Use dynamic import() for asynchronous loading; Top-Level await to delay evaluation until promises resolve; Handling cyclic imports by asynchronous access; Strategies for writing isomorphic modules; Troubleshooting MIME types, local server, and file extension issues.

## Normalised Extract
Table of Contents:
1. Modules Overview
2. Canvas Module
3. Square Module
4. Export & Import Syntax
5. Import Maps
6. Dynamic Import
7. Top Level Await
8. Cyclic Imports
9. Isomorphic Modules
10. Troubleshooting

Modules Overview:
- Enabling ES modules in browsers and Node.js with proper file extensions and MIME type configuration.

Canvas Module:
- create(wrapperId: string, parentElement: HTMLElement, width: number, height: number): Object { ctx: CanvasRenderingContext2D, id: string }.
- createReportList(wrapperId: string): string (returns list id).

Square Module:
- Constant: name = 'square'.
- draw(ctx: CanvasRenderingContext2D, length: number, x: number, y: number, color: string): Object { length, x, y, color }.
- reportArea(length: number, reportList: string): void.
- reportPerimeter(length: number, reportList: string): void.

Export & Import Syntax:
- Use export keyword: export const name = 'square'; export function draw(...) {...};
- Default export: export default randomSquare;
- Import using: import { name, draw } from './modules/square.js'; or import randomSquare from './modules/square.js';

Import Maps:
- JSON object mapping module specifiers to URL paths. Example:
  { "imports": { "square": "./shapes/square.js" } }.
- Support for remapping bare module names and URL prefixes.

Dynamic Import:
- Syntax: import(moduleSpecifier).then((Module) => { ... });
- Returns a Promise resolving to the module object, e.g., Module.Square for class-based modules.

Top Level Await:
- Use await at module scope. Example in getColors.js: export default await fetch("../data/colors.json").then(r=>r.json());

Cyclic Imports:
- Handle cyclic dependencies by delaying usage of imported values (e.g., using setTimeout) or restructuring modules to avoid cycles.

Isomorphic Modules:
- Separate core logic and platform-specific bindings; use feature detection (typeof window, process) and polyfills via dynamic imports.

Troubleshooting:
- Verify correct MIME type (text/javascript) for module files.
- Use a local server to avoid CORS when using file://.
- Adjust OS file extension handling to prevent .mjs.js issues.

## Supplementary Details
Canvas Module Implementation:
- create(wrapperId, parentElement, width, height): Requires valid HTML element and numeric dimensions; returns { ctx: CanvasRenderingContext2D, id: string }.
- createReportList(wrapperId): Inserts <ul> element into element with id=wrapperId; returns unique list id.

Square Module Implementation:
- Constant name: 'square'.
- draw(ctx, length, x, y, color): Uses ctx.fillRect(x, y, length, length) and sets ctx.fillStyle; returns object with keys: length, x, y, color.
- reportArea(length, reportList): Calculates area as length^2; writes output to reportList element.
- reportPerimeter(length, reportList): Calculates perimeter as 4 * length; outputs to reportList element.

Export & Import Patterns:
- Named export pattern: Place export in front of declarations or aggregated at end using export { function1, const1 }.
- Default export requires use of 'export default' without curly braces and is imported without braces.

Import Maps Configuration:
- JSON file specifying mappings with keys and corresponding URL paths. Keys with trailing slashes denote path prefixes.
- Example mapping for packages like lodash: 'lodash': '/node_modules/lodash-es/lodash.js', 'lodash/': '/node_modules/lodash-es/'.

Dynamic Module Loading:
- Use import() as a function; returns a Promise.
- Example: import('./modules/square.js').then(Module => { new Module.Square(...).draw(); });

Top Level Await:
- Use 'await' at module level; ensures module does not execute further until promise resolves. 
- Requires importing module to also use async context.

Cyclic Imports Handling:
- Avoid immediate use of imported values; use asynchronous functions (e.g., setTimeout) to defer usage.
- Restructure modules when possible to merge or create intermediary modules.

Isomorphic Module Best Practices:
- Separate 'core' logic from environment specific binding.
- Employ feature detection checks: if (typeof process !== 'undefined') { ... } else if (typeof window !== 'undefined') { ... }.
- Use polyfill libraries via dynamic import if global features (like fetch) are absent.

Troubleshooting Procedures:
- Command to check MIME type via curl: curl -I http://localhost/path/to/module.js | grep Content-Type
- Ensure local server is used: e.g., run 'npx http-server' for testing.
- Check browser console for strict MIME type errors and revise server configuration accordingly.

## Reference Details
API Specifications:
Canvas Module:
- function create(wrapperId: string, parentElement: HTMLElement, width: number, height: number): { ctx: CanvasRenderingContext2D, id: string } - Creates a canvas element inside a div with id=wrapperId, appended to parentElement. Throws error if parameters are invalid.
- function createReportList(wrapperId: string): string - Inserts an unordered list in the element with id wrapperId. Returns list id.

Square Module:
- const name: string = 'square'
- function draw(ctx: CanvasRenderingContext2D, length: number, x: number, y: number, color: string): { length: number, x: number, y: number, color: string } - Draws a square on the canvas with given dimensions and color; must use ctx.fillStyle and ctx.fillRect. Returns object with properties.
- function reportArea(length: number, reportList: string): void - Calculates area (length*length) and appends result to element identified by reportList.
- function reportPerimeter(length: number, reportList: string): void - Calculates perimeter (4*length) and outputs to reportList.

Export/Import Syntax:
- Named export: export { name, draw, reportArea, reportPerimeter };
- Default export example: export default randomSquare;
- Import usage: import { name, draw } from './modules/square.js';
- Renaming imports: import { draw as drawSquare } from './modules/square.js';
- Import all as namespace: import * as Module from './modules/module.js';

Dynamic Import:
- Syntax: import('./modules/myModule.js').then((Module) => { /* use Module features */ });
- Returns Promise resolving to module object with exported members.

Configuration Options:
- Module file type: .js must be served with MIME type text/javascript.
- Import maps JSON example: { "imports": { "square": "./shapes/square.js" } }. Keys with trailing '/' indicate path prefixes.

Best Practices:
- Use export default for single main function in module; use named exports for multiple functions.
- Place all import declarations at file top for dependency clarity.
- When using dynamic imports, ensure module file paths are relative and error-handled using Promise.catch.

Troubleshooting Commands:
- Check server MIME type: curl -I http://server/path/module.js
- Local testing: Use a local server (e.g., npx http-server) to avoid CORS issues.
- For cyclic import issues, log intermediate values using setTimeout to ensure module initialization.

Code Examples:
// square.js
export const name = 'square';
export function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);
  return { length, x, y, color };
}
export function reportArea(length, reportList) {
  const area = length * length;
  document.getElementById(reportList).innerText = 'Area: ' + area;
}
export function reportPerimeter(length, reportList) {
  const perimeter = 4 * length;
  document.getElementById(reportList).innerText = 'Perimeter: ' + perimeter;
}

// Importing in main.js
import { name, draw, reportArea, reportPerimeter } from './modules/square.js';

// Dynamic import example
document.querySelector('.square').addEventListener('click', () => {
  import('./modules/square.js').then(Module => {
    const square = Module.draw(canvasCtx, 50, 50, 100, 'blue');
    Module.reportArea(square.length, reportListId);
    Module.reportPerimeter(square.length, reportListId);
  });
});

## Information Dense Extract
Modules Overview: ES modules enable split code loading. Canvas Module: create(wrapperId, parentElement, width, height) -> {ctx, id}; createReportList(wrapperId) -> string. Square Module: const name='square'; draw(ctx, length, x, y, color) -> {length, x, y, color}; reportArea(length, reportList): void; reportPerimeter(length, reportList): void. Export syntax: named exports (export { ... }), default export (export default function), renaming imports (as keyword), namespace import (import * as Module). Import Maps: JSON mapping for bare module names; keys with trailing '/' denote path prefixes. Dynamic Import: import('module.js').then(Module => {...}). Top Level Await: export default await fetch(...).then(...). Cyclic Imports: Use asynchronous access to avoid ReferenceError. Isomorphic modules: Separate core logic, use feature detection, and polyfills. Troubleshooting: Ensure MIME type text/javascript, use local server, check file extensions.

## Sanitised Extract
Table of Contents:
1. Modules Overview
2. Canvas Module
3. Square Module
4. Export & Import Syntax
5. Import Maps
6. Dynamic Import
7. Top Level Await
8. Cyclic Imports
9. Isomorphic Modules
10. Troubleshooting

Modules Overview:
- Enabling ES modules in browsers and Node.js with proper file extensions and MIME type configuration.

Canvas Module:
- create(wrapperId: string, parentElement: HTMLElement, width: number, height: number): Object { ctx: CanvasRenderingContext2D, id: string }.
- createReportList(wrapperId: string): string (returns list id).

Square Module:
- Constant: name = 'square'.
- draw(ctx: CanvasRenderingContext2D, length: number, x: number, y: number, color: string): Object { length, x, y, color }.
- reportArea(length: number, reportList: string): void.
- reportPerimeter(length: number, reportList: string): void.

Export & Import Syntax:
- Use export keyword: export const name = 'square'; export function draw(...) {...};
- Default export: export default randomSquare;
- Import using: import { name, draw } from './modules/square.js'; or import randomSquare from './modules/square.js';

Import Maps:
- JSON object mapping module specifiers to URL paths. Example:
  { 'imports': { 'square': './shapes/square.js' } }.
- Support for remapping bare module names and URL prefixes.

Dynamic Import:
- Syntax: import(moduleSpecifier).then((Module) => { ... });
- Returns a Promise resolving to the module object, e.g., Module.Square for class-based modules.

Top Level Await:
- Use await at module scope. Example in getColors.js: export default await fetch('../data/colors.json').then(r=>r.json());

Cyclic Imports:
- Handle cyclic dependencies by delaying usage of imported values (e.g., using setTimeout) or restructuring modules to avoid cycles.

Isomorphic Modules:
- Separate core logic and platform-specific bindings; use feature detection (typeof window, process) and polyfills via dynamic imports.

Troubleshooting:
- Verify correct MIME type (text/javascript) for module files.
- Use a local server to avoid CORS when using file://.
- Adjust OS file extension handling to prevent .mjs.js issues.

## Original Source
MDN ECMAScript Modules Documentation
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

## Digest of JAVASCRIPT_MODULES

# JavaScript Modules Documentation

Retrieved: 2023-10-06

## Overview
This document covers the use of ES modules in JavaScript as described in the MDN documentation. It includes exact API specifications, method signatures, configuration details, and code examples directly from the crawled content.

## Canvas Module
- Function: create(wrapperId: string, parentElement: HTMLElement, width: number, height: number)
  - Description: Creates a canvas element inside a wrapper <div> with the given id. The wrapper is appended to the specified parent element.
  - Returns: An object { ctx: CanvasRenderingContext2D, id: string }.

- Function: createReportList(wrapperId: string)
  - Description: Creates an unordered list in the specified wrapper element to output report data.
  - Returns: The generated list's id as a string.

## Square Module
- Constant: name = "square"

- Function: draw(ctx: CanvasRenderingContext2D, length: number, x: number, y: number, color: string)
  - Description: Draws a square on the canvas with the given properties.
  - Returns: An object { length: number, x: number, y: number, color: string }.

- Function: reportArea(length: number, reportList: string)
  - Description: Writes the square's area to the specified report list.
  - Returns: void.

- Function: reportPerimeter(length: number, reportList: string)
  - Description: Writes the square's perimeter to the specified report list.
  - Returns: void.

## Export & Import Syntax
- Named export example:
  - export const name = "square";
  - export function draw(ctx, length, x, y, color) { ... };

- Aggregated export:
  - export { name, draw, reportArea, reportPerimeter };

- Default export example:
  - export default randomSquare;

- Importing example:
  - import { name, draw, reportArea, reportPerimeter } from "./modules/square.js";
  - import randomSquare from "./modules/square.js";

## Import Maps
- JSON mapping sample:
  {
    "imports": {
      "square": "./shapes/square.js",
      "lodash": "/node_modules/lodash-es/lodash.js",
      "lodash/": "/node_modules/lodash-es/"
    }
  }
- Usage: Allows bare module names to be resolvable and supports remapping entire URL prefixes.

## Dynamic Import
- Syntax: import(moduleSpecifier).then((Module) => { ... });
- Example:
  import("./modules/square.js").then((Module) => {
    const square1 = new Module.Square(ctx, listId, 50, 50, 100, "blue");
    square1.draw();
    square1.reportArea();
    square1.reportPerimeter();
  });

## Top Level Await
- Usage: Await can be used at module scope.
- Example in getColors.js:
  const colors = fetch("../data/colors.json").then(response => response.json());
  export default await colors;
- Import in main.js:
  import colors from "./modules/getColors.js";

## Cyclic Imports
- Description: Modules importing each other can lead to cyclic dependencies. Use asynchronous access (e.g., setTimeout) to ensure values are defined.
- Example:
  In a.js: import { b } from "./b.js"; export const a = 2;
  In b.js: import { a } from "./a.js"; setTimeout(() => { console.log(a); }, 10); export const b = 1;

## Isomorphic Modules
- Techniques for creating modules that run both on browser and Node.js:
  - Separate core logic from platform-specific binding.
  - Feature detection (e.g., typeof window !== "undefined").
  - Use dynamic import for polyfills (e.g., node-fetch for fetch in Node.js).

## Troubleshooting
- Ensure module files (.js or .mjs) are served with the correct MIME type (e.g., text/javascript).
- Run via a local server to avoid CORS errors when using file:// URLs.
- Disable automatic file extension changes (macOS may append .js to .mjs).

## Attribution
Data Size: 6471614 bytes; Links Found: 41782; Retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

## Attribution
- Source: MDN ECMAScript Modules Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- License: License: CC-BY-SA 2.5
- Crawl Date: 2025-04-24T04:49:28.385Z
- Data Size: 6471614 bytes
- Links Found: 41782

## Retrieved
2025-04-24
library/COMMAND_LINE.md
# library/COMMAND_LINE.md
# COMMAND_LINE

## Crawl Summary
Bash basics including reading man pages, using text editors (nano, vim, Emacs), file redirection (> , >>, <, 2>&1), globbing and quoting, job control (using &, ctrl-z, jobs, fg/bg), history and alias management, and shell scripting best practices (set -euo pipefail, trap, variable expansion). Also detailed commands for processing files (find, grep, awk, sed), system debugging (top, htop, iostat, vmstat, netstat, ss, lsof), and handling OS specific toolsets for macOS and Windows. Includes exact SSH configuration parameters and command examples for troubleshooting.

## Normalised Extract
Table of Contents:
1. Bash Basics
   - Use of man bash, text editors (nano, vim, Emacs) with examples.
2. Redirection and Expansion
   - Operators: >, >>, <, 2>&1; file globbing with *, quoting, variable expansion (${var:-default}).
3. Job and Process Management
   - Commands: &, ctrl-z, jobs, fg, bg, kill, pgrep, pkill, process substitution example: diff /etc/hosts <(ssh somehost cat /etc/hosts).
4. Command History and Aliases
   - Usage: history, !n, !$, !!; alias definition: alias ll='ls -latr'.
5. Shell Scripting Practices
   - Strict mode commands: set -euo pipefail; trap "echo 'error: Script failed: see failed command above'" ERR; examples of variable and arithmetic expansion.
6. Data Processing and Command Chaining
   - Use of find, grep, xargs (with options -L, -P, -I{}), awk for column summing, and sort/uniq for set operations.
7. System Debugging
   - Tools: top, htop, iostat, vmstat, free, dstat, glances; network tools: netstat, ss, lsof; debugging with strace, ltrace, gdb, examining /proc files, and dmesg.
8. One-Liners
   - Examples include summing columns with awk, diffing JSON with jq and colordiff, and recursive file listings with find -ls.
9. OS Specific Sections
   - macOS: Homebrew, pbcopy/pbpaste, open, mdfind; Windows: Cygwin, WSL, MinGW commands for Unix environments.

Detailed Technical Information:
- Bash command usage: man, type, help, apropos.
- Redirection: example command: some-command >logfile 2>&1, with optional </dev/null.
- Variable expansion: ${name:?error message}, ${name:-default}, arithmetic: i=$(( (i+1)%5 )).
- Process substitution: diff /etc/hosts <(ssh host cat /etc/hosts).
- SSH configuration: TCPKeepAlive=yes, ServerAliveInterval=15, ServerAliveCountMax=6, Compression=yes, ControlMaster auto, ControlPath /tmp/%r@%h:%p, ControlPersist yes.
- Script debugging: include set -x, set -e, set -u, and trap usage.
- Xargs examples: find . -name '*.py' | xargs grep some_function, cat hosts | xargs -I{} ssh root@{} hostname.
- One-liner for summing third column: awk '{ x += $3 } END { print x }' myfile.
- Set operations using sort and uniq commands with proper flags.
- Binary file and encoding tools: hd, hexdump, xxd, iconv, uconv.
- OS-specific adaptations for macOS and Windows environments.

## Supplementary Details
Supplementary Technical Specifications:
- SSH Config Options:
   TCPKeepAlive: yes
   ServerAliveInterval: 15 (seconds)
   ServerAliveCountMax: 6
   Compression: yes
   ControlMaster: auto
   ControlPath: /tmp/%r@%h:%p
   ControlPersist: yes
- Bash Strict Mode Script:
   set -euo pipefail
   trap "echo 'error: Script failed: see failed command above'" ERR
- Redirection Examples:
   Standard output and error: some-command >logfile 2>&1
   Use of process substitution: diff /etc/hosts <(ssh somehost cat /etc/hosts)
- Variable and Arithmetic Expansion:
   Existence check: ${var:?Error message if unset}
   Default usage: ${var:-default}
   Arithmetic: i=$(( (i + 1) % 5 ))
- Xargs Command with Options:
   find . -name '*.py' | xargs -L 1 -P 4 -I{} grep 'pattern' {}
- One-Liner Examples:
   Summing a column: awk '{ x += $3 } END { print x }' myfile
   JSON diff: diff <(jq --sort-keys . file1.json) <(jq --sort-keys . file2.json) | colordiff

## Reference Details
Reference Technical Specifications:
- API-like Commands for Shell Scripting:
   Function: taocl()
     Purpose: Retrieves a random tip from the command line guide.
     Implementation:
       curl -s https://raw.githubusercontent.com/jlevy/the-art-of-command-line/master/README.md |
       sed '/cowsay[.]png/d' |
       pandoc -f markdown -t html |
       xmlstarlet fo --html --dropdtd |
       xmlstarlet sel -t -v "(html/body/ul/li[count(p)>0])[RANDOM mod last()+1]" |
       xmlstarlet unesc |
       fmt -80 |
       iconv -t US
     Parameters: None, returns formatted command tip string.
- Full Shell Command Specifications:
   - Redirection:
         Command: some-command >logfile 2>&1
         Description: Redirects both stdout and stderr to logfile; use </dev/null to detach from terminal.
   - Process Substitution:
         Command: diff /etc/hosts <(ssh somehost cat /etc/hosts)
         Description: Compares a local file with remote file output via ssh.
   - Strict Mode in Bash:
         Script Header:
            set -euo pipefail
            trap "echo 'error: Script failed: see failed command above'" ERR
         Return: Script aborts on first error, prints custom error message.
   - Xargs Options:
         Command: find . -name '*.py' | xargs -L 1 -P 4 -I{} grep 'pattern' {}
         Options:
            -L: Number of lines per execution
            -P: Number of parallel processes
            -I{}: Placeholder substitution
   - SSH Config Sample:
         Settings:
            TCPKeepAlive=yes
            ServerAliveInterval=15
            ServerAliveCountMax=6
            Compression=yes
            ControlMaster auto
            ControlPath /tmp/%r@%h:%p
            ControlPersist yes
         Effect: Maintains persistent, compressed connections with auto-reconnection.
- Troubleshooting Procedures:
   - Use dmesg to check system messages: dmesg | tail
   - Use lsof to identify deleted file handles: lsof | grep deleted
   - Use strace to trace system calls: strace -p <pid>
   - Use diffstat with rsync for file synchronization issues: rsync -r --delete source/ destination/ && diff -r source/ destination/ | diffstat
- Best Practices:
   - Always quote variables: e.g., "$VAR"
   - Use null-delimited file lists with -print0 and xargs -0 in find commands for spaces in filenames.
   - Implement robust error handling in scripts using strict mode and trap.
   - Regularly update SSH configurations for secure and stable remote sessions.

## Information Dense Extract
man bash; nano/vim/emacs; man, apropos, help, type; redirection: >, >>, 2>&1, </dev/null; globbing: *, quoting; variable expansion: ${var:?}, ${var:-default}; arithmetic: $(( (i+1)%5 )); process substitution: diff /etc/hosts <(ssh host cat /etc/hosts); job control: &, ctrl-z, jobs, fg, bg, kill, pgrep, pkill; history: history, !n, !$, !!; alias: alias ll='ls -latr'; xargs: -L 1, -P, -I{}; SSH config: TCPKeepAlive=yes, ServerAliveInterval=15, ServerAliveCountMax=6, Compression=yes, ControlMaster auto, ControlPath /tmp/%r@%h:%p, ControlPersist yes; strict mode: set -euo pipefail, trap "echo 'error: Script failed'" ERR; awk summing: awk '{ x += $3 } END { print x }'; JSON diff: diff <(jq --sort-keys . file1.json) <(jq --sort-keys . file2.json) | colordiff; troubleshooting: dmesg, lsof, strace; OS-specific: macOS (brew, pbcopy, open), Windows (Cygwin, WSL, MinGW)

## Sanitised Extract
Table of Contents:
1. Bash Basics
   - Use of man bash, text editors (nano, vim, Emacs) with examples.
2. Redirection and Expansion
   - Operators: >, >>, <, 2>&1; file globbing with *, quoting, variable expansion (${var:-default}).
3. Job and Process Management
   - Commands: &, ctrl-z, jobs, fg, bg, kill, pgrep, pkill, process substitution example: diff /etc/hosts <(ssh somehost cat /etc/hosts).
4. Command History and Aliases
   - Usage: history, !n, !$, !!; alias definition: alias ll='ls -latr'.
5. Shell Scripting Practices
   - Strict mode commands: set -euo pipefail; trap 'echo 'error: Script failed: see failed command above'' ERR; examples of variable and arithmetic expansion.
6. Data Processing and Command Chaining
   - Use of find, grep, xargs (with options -L, -P, -I{}), awk for column summing, and sort/uniq for set operations.
7. System Debugging
   - Tools: top, htop, iostat, vmstat, free, dstat, glances; network tools: netstat, ss, lsof; debugging with strace, ltrace, gdb, examining /proc files, and dmesg.
8. One-Liners
   - Examples include summing columns with awk, diffing JSON with jq and colordiff, and recursive file listings with find -ls.
9. OS Specific Sections
   - macOS: Homebrew, pbcopy/pbpaste, open, mdfind; Windows: Cygwin, WSL, MinGW commands for Unix environments.

Detailed Technical Information:
- Bash command usage: man, type, help, apropos.
- Redirection: example command: some-command >logfile 2>&1, with optional </dev/null.
- Variable expansion: ${name:?error message}, ${name:-default}, arithmetic: i=$(( (i+1)%5 )).
- Process substitution: diff /etc/hosts <(ssh host cat /etc/hosts).
- SSH configuration: TCPKeepAlive=yes, ServerAliveInterval=15, ServerAliveCountMax=6, Compression=yes, ControlMaster auto, ControlPath /tmp/%r@%h:%p, ControlPersist yes.
- Script debugging: include set -x, set -e, set -u, and trap usage.
- Xargs examples: find . -name '*.py' | xargs grep some_function, cat hosts | xargs -I{} ssh root@{} hostname.
- One-liner for summing third column: awk '{ x += $3 } END { print x }' myfile.
- Set operations using sort and uniq commands with proper flags.
- Binary file and encoding tools: hd, hexdump, xxd, iconv, uconv.
- OS-specific adaptations for macOS and Windows environments.

## Original Source
The Art of Command Line
https://github.com/jlevy/the-art-of-command-line

## Digest of COMMAND_LINE

# The Art of Command Line
Retrieved on: 2023-10-30
Data Size: 1079626 bytes

# Basics
- Use man bash for detailed Bash documentation.
- Text editors: nano, vim, Emacs. Vim example: 'vi filename'.
- Documentation access: man, apropos, help for bash builtins, type command to check executability.

# Redirection and Expansion
- Redirection operators: > (overwrite), >> (append), < for input, 2>&1 to combine stdout and stderr.
- File globbing: use * for matching, quoting (" vs '), variable expansion (${var:-default}).
- Brace and arithmetic expansion: Example: {1..10}, arithmetic i=$(( (i + 1) % 5 )).

# Job and Process Management
- Background jobs: use &, ctrl-z, jobs, fg, bg, kill, pgrep, pkill.
- Process substitution: diff /etc/hosts <(ssh somehost cat /etc/hosts).

# Command History and Aliases
- History commands: history, !n, !$, !!.
- Alias creation: alias ll='ls -latr'.

# Shell Scripting Practices
- Strict modes: set -euo pipefail with trap on ERR, e.g.,
  set -euo pipefail
  trap "echo 'error: Script failed: see failed command above'" ERR
- Variable expansions: ${name:?error}, ${var%suffix} and ${var#prefix}.

# Data Processing and Command Chaining
- Commands: find, grep, awk, sed. Example: find . -name '*.py' | xargs grep some_function.
- Use xargs with options: -L for items per line, -P for parallelism, -I{} for placeholders.

# System Debugging
- Monitoring: top, htop, iostat, vmstat, free, dstat, glances.
- Networking: netstat -lntp, ss, lsof -iTCP -sTCP:LISTEN -P -n.
- Debugging tools: strace, ltrace, gdb, /proc files, dmesg.

# One-Liners and Text Processing
- Set operations with sort/uniq: union, intersection, difference.
- JSON normalization: diff <(jq --sort-keys . file1.json) <(jq --sort-keys . file2.json) | colordiff.
- Example awk summing: awk '{ x += $3 } END { print x }' myfile.

# OS Specific Sections
- macOS: Use brew/port, pbcopy/pbpaste, open, mdfind.
- Windows: Cygwin, WSL, MinGW, Cash; commands like ping, ipconfig, tracert.

# Advanced Usage and Troubleshooting
- SSH configuration example:
      TCPKeepAlive=yes
      ServerAliveInterval=15
      ServerAliveCountMax=6
      Compression=yes
      ControlMaster auto
      ControlPath /tmp/%r@%h:%p
      ControlPersist yes
- Handling long argument lists: use find and xargs when encountering "Argument list too long" error.
- Binary file commands: hd, hexdump, xxd.
- Text encoding conversions: iconv, uconv.

# Attribution
Source: The Art of Command Line by jlevy; retrieved from https://github.com/jlevy/the-art-of-command-line

## Attribution
- Source: The Art of Command Line
- URL: https://github.com/jlevy/the-art-of-command-line
- License: License: CC BY-SA 3.0
- Crawl Date: 2025-04-23T04:50:28.278Z
- Data Size: 1079626 bytes
- Links Found: 5720

## Retrieved
2025-04-23
