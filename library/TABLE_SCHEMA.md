# TABLE_SCHEMA

## Crawl Summary
Descriptor: JSON object with required "fields": array<FieldDescriptor>. Optional "missingValues": array<string> default [""], "primaryKey": string|array<string>, "foreignKeys": array<ForeignKeyDescriptor>.

FieldDescriptor: object with required properties:
 name:string
 Optional properties:
 title:string, description:string, example:any, type:string default "string", format:string default "default", rdfType:URI, constraints:ConstraintsDescriptor.

Types & Formats:
 string(formats default,email,uri,binary,uuid)
 number(decimalChar:string("."), groupChar:string(null), bareNumber:boolean(true))
 integer(bareNumber:boolean(true))
 boolean(trueValues:string["true","True","TRUE","1"], falseValues:string["false","False","FALSE","0"])
 object, array, date(format default ISO8601 or pattern), time, datetime, year, yearmonth, duration(ISO8601), geopoint(string, array, object), geojson(default, topojson), any.

ConstraintsDescriptor: object with boolean required, boolean unique, integer minLength,maxLength, minimum, maximum (numeric/date/time), pattern:string(XML Schema regex), enum:array<any>.

Missing Values: array<string> default [""].

Primary Key: string or array<string>, implies required constraints.

Foreign Keys: array of { fields:string|string[], reference:{ resource:string, fields:string|string[] } }.


## Normalised Extract
Table of Contents:
1. Descriptor Structure
2. Field Descriptor Properties
3. Supported Types and Formats
4. Constraint Properties
5. Missing Values Handling
6. Defining Primary Keys
7. Defining Foreign Keys

1. Descriptor Structure
 fields: array<FieldDescriptor>
 missingValues: array<string> default [""]
 primaryKey: string|array<string>
 foreignKeys: array<ForeignKeyDescriptor>

2. Field Descriptor Properties
 name (string, required)
 title (string)
 description (string)
 example (any)
 type (string) default "string"
 format (string) default "default"
 rdfType (string URI)
 constraints (object)

3. Supported Types and Formats
 string: default,email,uri,binary,uuid
 number: decimalChar:string("."), groupChar:string(null), bareNumber:boolean(true)
 integer: bareNumber:boolean(true)
 boolean: trueValues:["true","True","TRUE","1"], falseValues:["false","False","FALSE","0"]
 object, array
 date/time/datetime: ISO8601 or pattern string
 year, yearmonth
 duration: ISO8601 PnYnMnDTnHnMnS
 geopoint: string "lon, lat", array [lon,lat], object {lon,lat}
 geojson: default GeoJSON object, topojson
 any: no restrictions

4. Constraint Properties
 required:boolean(default false)
 unique:boolean(default false)
 minLength:integer
 maxLength:integer
 minimum:number|integer|date|time|datetime|year|yearmonth
 maximum:number|integer|date|time|datetime|year|yearmonth
 pattern:string(XML Schema regex)
 enum:array<any>

5. Missing Values Handling
 missingValues:array<string> default [""]
 converts matching strings to null before casting

6. Defining Primary Keys
 primaryKey:string|array<string>
 fields must exist in fields array
 implies required=true

7. Defining Foreign Keys
 foreignKeys: array<{
   fields:string|string[],
   reference:{ resource:string, fields:string|string[] }
 }>


## Supplementary Details
Parameters and Defaults:

decimalChar: string = "."
groupChar: string = null
bareNumber: boolean = true
trueValues: ["true","True","TRUE","1"]
falseValues: ["false","False","FALSE","0"]
missingValues: string[] = [""]

Date Formats:
default: ISO8601 YYYY-MM-DD for date, hh:mm:ss for time, YYYY-MM-DDThh:mm:ssZ for datetime
custom: pattern string following strptime syntax

Duration: ISO8601 extended format PnYnMnDTnHnMnS

Geopoint Formats:
 default: "lon, lat"
 array: [lon, lat]
 object: {"lon":lon, "lat":lat}

GeoJSON: default GeoJSON object, topojson per spec

Implementation Steps:
1. Load descriptor JSON file.
2. Validate descriptor schema: ensure required properties and types.
3. For each field descriptor:
   a. Validate name uniqueness (case-insensitive).
   b. Apply missingValues mapping.
   c. Cast physical values to logical types based on type, format, and additional properties.
4. Test constraints on logical representation.
5. Enforce primaryKey uniqueness and non-null.
6. Resolve foreignKeys: load referenced resources, compare field values.


## Reference Details
JSON Schema for table-schema.json (draft-07):
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["fields"],
  "properties": {
    "fields": { "type": "array", "items": { "$ref": "#/definitions/field" } },
    "missingValues": { "type": "array", "items": { "type": "string" }, "default": [""] },
    "primaryKey": { "anyOf": [ {"type": "string"}, {"type": "array","items": {"type": "string"} } ] },
    "foreignKeys": { "type": "array", "items": { "$ref": "#/definitions/foreignKey" } }
  },
  "definitions": {
    "field": {
      "type": "object",
      "required": ["name"],
      "properties": {
        "name": { "type": "string" },
        "title": { "type": "string" },
        "description": { "type": "string" },
        "example": {},
        "type": { "type": "string" },
        "format": { "type": "string" },
        "rdfType": { "type": "string", "format": "uri" },
        "constraints": { "$ref": "#/definitions/constraints" }
      }
    },
    "constraints": {
      "type": "object",
      "properties": {
        "required": { "type": "boolean", "default": false },
        "unique": { "type": "boolean", "default": false },
        "minLength": { "type": "integer" },
        "maxLength": { "type": "integer" },
        "minimum": {},
        "maximum": {},
        "pattern": { "type": "string" },
        "enum": { "type": "array" }
      }
    },
    "foreignKey": {
      "type": "object",
      "required": ["fields","reference"],
      "properties": {
        "fields": { "anyOf": [ {"type":"string"},{"type":"array","items":{"type":"string"}} ] },
        "reference": {
          "type": "object",
          "required": ["resource","fields"],
          "properties": {
            "resource": { "type": "string" },
            "fields": { "anyOf": [ {"type":"string"},{"type":"array","items":{"type":"string"}} ] }
          }
        }
      }
    }
  }
}

Example Usage in Python:
from frictionless import Schema, Field, Resource, validate

schema = Schema(
    fields=[Field(name="id", type="integer"), Field(name="name", type="string")]
)
resource = Resource(path="data.csv", schema=schema)
report = validate(resource)
if report.valid:
    print("Table valid")
else:
    print(report.flatten())

Command-Line Validation:
$ frictionless validate data.csv --schema schema.json
# Expected: no errors on valid data

Troubleshooting:
Invalid name in field descriptor:
Error: Field name must be non-empty string

Missing key in descriptor:
Error: Descriptor missing required property 'fields'

Type casting error:
ValueError: invalid literal for int() with base 10: 'abc'


## Information Dense Extract
Descriptor:{fields:Array<FieldDescriptor>}FieldsDescriptor: {name:String(required),title:String,description:String,example:any,type:String(default"string"),format:String(default"default"),rdfType:StringURI,constraints:{required:Boolean,unique:Boolean,minLength:Int,maxLength:Int,minimum:any,maximum:any,pattern:String,enum:Array<any>}}Optional:{missingValues:Array<String>(default[""]),primaryKey:String|Array<String>,foreignKeys:Array<{fields:String|Array<String>,reference:{resource:String,fields:String|Array<String>}}>}.Types:{string[default,email,uri,binary,uuid],number{decimalChar:".",groupChar:null,bareNumber:true},integer{bareNumber:true},boolean{trueValues:["true","True","TRUE","1"],falseValues:["false","False","FALSE","0"]},object,array,date/time/datetime[ISO8601|pattern],year,yearmonth,duration[ISO8601],geopoint[string:"lon,lat",array,object],geojson[default,topojson],any}.Constraints apply logical. MissingValues pre-cast null. PrimaryKey non-null unique. ForeignKey links: fields+reference(resource,fields).

## Sanitised Extract
Table of Contents:
1. Descriptor Structure
2. Field Descriptor Properties
3. Supported Types and Formats
4. Constraint Properties
5. Missing Values Handling
6. Defining Primary Keys
7. Defining Foreign Keys

1. Descriptor Structure
 fields: array<FieldDescriptor>
 missingValues: array<string> default ['']
 primaryKey: string|array<string>
 foreignKeys: array<ForeignKeyDescriptor>

2. Field Descriptor Properties
 name (string, required)
 title (string)
 description (string)
 example (any)
 type (string) default 'string'
 format (string) default 'default'
 rdfType (string URI)
 constraints (object)

3. Supported Types and Formats
 string: default,email,uri,binary,uuid
 number: decimalChar:string('.'), groupChar:string(null), bareNumber:boolean(true)
 integer: bareNumber:boolean(true)
 boolean: trueValues:['true','True','TRUE','1'], falseValues:['false','False','FALSE','0']
 object, array
 date/time/datetime: ISO8601 or pattern string
 year, yearmonth
 duration: ISO8601 PnYnMnDTnHnMnS
 geopoint: string 'lon, lat', array [lon,lat], object {lon,lat}
 geojson: default GeoJSON object, topojson
 any: no restrictions

4. Constraint Properties
 required:boolean(default false)
 unique:boolean(default false)
 minLength:integer
 maxLength:integer
 minimum:number|integer|date|time|datetime|year|yearmonth
 maximum:number|integer|date|time|datetime|year|yearmonth
 pattern:string(XML Schema regex)
 enum:array<any>

5. Missing Values Handling
 missingValues:array<string> default ['']
 converts matching strings to null before casting

6. Defining Primary Keys
 primaryKey:string|array<string>
 fields must exist in fields array
 implies required=true

7. Defining Foreign Keys
 foreignKeys: array<{
   fields:string|string[],
   reference:{ resource:string, fields:string|string[] }
 }>

## Original Source
Frictionless Data Table Schema (JSON Table Schema)
https://specs.frictionlessdata.io/table-schema/

## Digest of TABLE_SCHEMA

# Table Schema

A simple format to declare a schema for tabular data expressible in JSON.

## Descriptor

The descriptor must be a JSON object with:

Required Properties:

fields: array of field descriptors ordered as in the CSV/logical table.

Optional Properties:

missingValues: array<string> (default [""])
primaryKey: string or array<string>
foreignKeys: array<foreignKey>

The descriptor may include additional custom properties.

Example:

```json
{
  "fields": [
    {"name": "id", "type": "integer"},
    {"name": "name", "type": "string"}
  ],
  "missingValues": ["", "NA"],
  "primaryKey": "id",
  "foreignKeys": [
    {
      "fields": ["country_id"],
      "reference": {"resource": "countries","fields": ["id"]}
    }
  ]
}
```

## Field Descriptors

A field descriptor is a JSON object with:

Required:

name: string

Optional:

title: string
description: string
example: any
type: string (default "string")
format: string (default "default")
rdfType: URI string
constraints: constraints-descriptor object

Example:

```json
{
  "name": "age",
  "title": "Age of person",
  "type": "integer",
  "format": "default",
  "example": 30,
  "description": "Age in years",
  "constraints": {"required": true, "minimum": 0}
}
```

## Types and Formats

The "type" property is based on JSON Schema types with additions:

string: formats: default, email, uri, binary, uuid
number: decimal lexical rules, properties: decimalChar:string(default"."), groupChar:string(default null), bareNumber:boolean(default true)
integer: as number without fractions, bareNumber:boolean(default true)
boolean: values cast via trueValues and falseValues arrays (defaults ["true","True","TRUE","1"], ["false","False","FALSE","0"])
object: valid JSON object
array: valid JSON array
date, time, datetime: ISO8601 or pattern string following Python/C strptime
year, yearmonth: gYear, gYearMonth
duration: ISO8601 duration PnYnMnDTnHnMnS
geopoint: default string "lon, lat", array [lon,lat], or object {lon,lat}
geojson: default GeoJSON object or topojson
any: accept any type

## Constraints

Property    Type          AppliesTo        Description

required    boolean       all fields       cannot be null if true
unique      boolean       all fields       values must be unique
minLength   integer       string,array,object   minimum number of items/characters
maxLength   integer       string,array,object   maximum items/characters
minimum     integer,number,date,time,datetime,year,yearmonth   minimum value
maximum     integer,number,date,time,datetime,year,yearmonth   maximum value
pattern     string (XML Schema regex)  string    regex to validate value
enum        array<any>    all fields       must match one of the array values

Constraints apply on logical representation.

## Missing Values

missingValues: array<string> default [""]. Strings to treat as null prior to casting.

Example:

```json
"missingValues": ["", "-"]
```

## Primary Key

primaryKey: string or array<string>. Fields that uniquely identify rows. Implies required: true on those fields.

Example:

```json
"primaryKey": ["id","code"]
```
```

## Foreign Keys

foreignKeys: array of objects:

fields: string or array<string> (source fields)
reference: object {
  resource: string (resource name or "" for self),
  fields: string or array<string> (target fields)
}

Example:

```json
"foreignKeys": [
  {
    "fields": "parent_id",
    "reference": {"resource": "", "fields": "id"}
  }
]
```


## Attribution
- Source: Frictionless Data Table Schema (JSON Table Schema)
- URL: https://specs.frictionlessdata.io/table-schema/
- License: License
- Crawl Date: 2025-04-26T06:49:19.442Z
- Data Size: 7764831 bytes
- Links Found: 16278

## Retrieved
2025-04-26
