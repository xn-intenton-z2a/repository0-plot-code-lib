# OPENAPI_3_1

## Crawl Summary
Versioning: openapi field (string) MUST use major.minor.patch. Root Object: required fields openapi, info, paths; optional servers, components, security, tags, externalDocs. Info: title and version required. Server: url with template variables, description, variables (enum, default, description). Path templating: use {param}, match to path parameters, no unescaped reserved chars. Parameter Object: name,in,style,explode,required,deprecated,allowEmptyValue,allowReserved,schema or content, examples. RequestBody: description, content (one media-type), required. Responses: map status codes to Response Objects. Response: description, headers, content, links. SecuritySchemes: types apiKey, http, oauth2, openIdConnect with required fields. OAuthFlows: implicit,authorizationCode,password,clientCredentials with flow objects. Schema: JSON Schema Draft 2020-12 superset, properties for composition, inheritance, XML modeling, dialects, deprecated.

## Normalised Extract
Table of Contents
1. Versioning
2. Root Object
3. Info
4. Servers
5. Path Templating
6. Parameters
7. Request Bodies
8. Responses
9. Security Schemes
10. Schema Objects

1. Versioning
openapi: string, format major.minor.patch, required at root, tooling ignores patch

2. Root Object
Fields:
  openapi: string (REQUIRED)
  info: Info Object (REQUIRED)
  servers: [Server Object] (default [{url:'/'}])
  paths: <string, Path Item | Reference> (REQUIRED)
  components: Components Object
  security: [SecurityRequirement]
  tags: [Tag]
  externalDocs: ExternalDoc

3. Info
Fields:
  title: string (REQUIRED)
  version: string (REQUIRED)
  description: string
  termsOfService: URL
  contact: Contact Object
  license: License Object

4. Servers
Fields:
  url: string with {variable} templates (REQUIRED)
  description: string
  variables: map<name, ServerVariable>

5. Path Templating
Rules:
  template syntax: /path/{param}
  each {param} must map to path parameter definition
  characters '/', '?', '#' must be percent-encoded

6. Parameters
Fields:
  name, in (path/query/header/cookie), required, style, explode, deprecated, allowEmptyValue, allowReserved , schema or content
Serialization:
  style values: matrix, label, form, simple, spaceDelimited, pipeDelimited, deepObject
  explode controls delimiter behavior

7. Request Bodies
Fields:
  description, content map<mediaType, MediaTypeObj>, required

8. Responses
Map<statusCode|'default', Response Obj>
Response:
  description (REQUIRED), headers, content, links

9. Security Schemes
Types:
  apiKey: in, name
  http: scheme, bearerFormat
  oauth2: flows
  openIdConnect: openIdConnectUrl

10. Schema
Conforms to JSON Schema 2020-12, adds:
  discriminator, xml, externalDocs, deprecated
Supports composition: allOf, oneOf, anyOf, not; formats: int32,int64,float,double,byte,binary,date,dateTime,password


## Supplementary Details
OpenAPI CLI Validation:
- Install: npm install -g @openapitools/openapi-generator-cli
- Validate: openapi validate -i openapi.yaml
- Output: OK or error messages pointing to line numbers

Tooling Best Practices:
- Name root document openapi.json or openapi.yaml
- Use YAML 1.2 Failsafe profile: keys are strings, tags limited to JSON Schema
- Always specify server variables enum and default
- For path parameters, always set required: true
- Prefer form+explode=true for query arrays

Reference Resolution:
- Relative URIs resolved per RFC3986, base document URI
- $ref resolution: JSON Pointer per RFC6901

Version Compatibility:
- Tools supporting 3.1 must accept all 3.1.*; ignore patch
- Minor non-backwards changes may occur; test critical flows when upgrading


## Reference Details
# Object Schemas

## OpenAPI Object
```json
{
  "type": "object",
  "required": ["openapi","info","paths"],
  "properties": {
    "openapi": {"type":"string","pattern":"^[0-9]+\\.[0-9]+\\.[0-9]+$"},
    "info": {"$ref":"#/components/schemas/InfoObject"},
    "servers": {"type":"array","items":{"$ref":"#/components/schemas/ServerObject"}},
    "paths": {"$ref":"#/components/schemas/PathsObject"},
    "components": {"$ref":"#/components/schemas/ComponentsObject"},
    "security": {"type":"array","items":{"$ref":"#/components/schemas/SecurityRequirementObject"}},
    "tags": {"type":"array","items":{"$ref":"#/components/schemas/TagObject"}},
    "externalDocs": {"$ref":"#/components/schemas/ExternalDocumentationObject"}
  }
}
```

## Info Object
```json
{
  "type": "object",
  "required": ["title","version"],
  "properties": {
    "title": {"type":"string"},
    "version": {"type":"string"},
    "description": {"type":"string"},
    "termsOfService": {"type":"string","format":"uri"},
    "contact": {"$ref":"#/components/schemas/ContactObject"},
    "license": {"$ref":"#/components/schemas/LicenseObject"}
  }
}
```

## Parameter Object
```json
{
  "type": "object",
  "required": ["name","in"],
  "properties": {
    "name": {"type":"string"},
    "in": {"type":"string","enum":["query","header","path","cookie"]},
    "required": {"type":"boolean","default":false},
    "deprecated": {"type":"boolean","default":false},
    "allowEmptyValue": {"type":"boolean","default":false},
    "style": {"type":"string"},
    "explode": {"type":"boolean"},
    "allowReserved": {"type":"boolean"},
    "schema": {"$ref":"#/components/schemas/SchemaObject"},
    "content": {"type":"object"},
    "example": {},
    "examples": {"type":"object"}
  }
}
```

## RequestBody Object
```json
{
  "type": "object",
  "properties": {
    "description": {"type":"string"},
    "content": {"type":"object","minProperties":1},
    "required": {"type":"boolean","default":false}
  }
}
```

## Response Object
```json
{
  "type": "object",
  "required": ["description"],
  "properties": {
    "description": {"type":"string"},
    "headers": {"type":"object"},
    "content": {"type":"object"},
    "links": {"type":"object"}
  }
}
```

## SecurityScheme Object
```json
{
  "type": "object",
  "required": ["type"],
  "properties": {
    "type": {"type":"string","enum":["apiKey","http","oauth2","openIdConnect"]},
    "name": {"type":"string"},
    "in": {"type":"string","enum":["query","header","cookie"]},
    "scheme": {"type":"string"},
    "bearerFormat": {"type":"string"},
    "flows": {"$ref":"#/components/schemas/OAuthFlowsObject"},
    "openIdConnectUrl": {"type":"string","format":"uri"}
  }
}
```

# Code Examples

### Minimal OpenAPI 3.1 YAML
```yaml
openapi: "3.1.0"
info:
  title: "Sample API"
  version: "1.0.0"
paths:
  /pets/{petId}:
    get:
      operationId: getPetById
      parameters:
        - name: petId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
components:
  schemas:
    Pet:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
```

# Troubleshooting

1. Invalid path parameter:
   Command: openapi validate -i api.yaml
   Error: "Missing required path parameter 'petId' in path '/pets/{petId}'"
2. YAML parse error:
   Expected: proper indentation
   Fix: ensure two-space indent for nested levels
3. $ref resolution:
   Error: "Unresolved reference '#/components/schemas/Unknown'"
   Fix: define schema under components/schemas


## Information Dense Extract
openapi: string(major.minor.patch) required; info.title(string) required; info.version(string) required; servers: [{url:string,variables:{name:{enum:[string],default:string,description:string}}]; paths:{'<path>':PathItem|Ref}; components:{schemas,responses,parameters,examples,headers,requestBodies,callbacks,links,securitySchemes,headers,pathItems}; security:[{<scheme>:[]}]; tags:[{name:string,description:string}]; externalDocs:{description:string,url:string}. PathItem:get,put,post,delete,options,head,patch,trace,parameters:[Parameter|Ref],servers:[Server]. Parameter:name:string,in:enum;required:boolean;style:string;explode:boolean;schema:Schema|content:{<mediaType>:MediaType}. MediaType:schema:Schema,examples,encoding. RequestBody:content:{mediaType:MediaType},required:boolean. Responses:{statusCode:{description:string,headers:{},content:{mediaType:MediaType},links:{}}}. Schema:JSONSchema2020-12 superset;properties,type,required,format,allOf,oneOf,anyOf,not,$ref,discriminator,xml,deprecated. SecurityScheme:type:enum;apiKey(name,in),http(scheme,bearerFormat),oauth2(flows:{implicit,authorizationCode,password,clientCredentials}),openIdConnect(openIdConnectUrl). OAuthFlow:{authorizationUrl,tokenUrl,refreshUrl,scopes:{key:value}}. Validation: openapi validate -i file. Best practices: yaml failsafe, default server '/', percent-encode reserved chars in path values, set required:true for path params, prefer form+explode for arrays.

## Sanitised Extract
Table of Contents
1. Versioning
2. Root Object
3. Info
4. Servers
5. Path Templating
6. Parameters
7. Request Bodies
8. Responses
9. Security Schemes
10. Schema Objects

1. Versioning
openapi: string, format major.minor.patch, required at root, tooling ignores patch

2. Root Object
Fields:
  openapi: string (REQUIRED)
  info: Info Object (REQUIRED)
  servers: [Server Object] (default [{url:'/'}])
  paths: <string, Path Item | Reference> (REQUIRED)
  components: Components Object
  security: [SecurityRequirement]
  tags: [Tag]
  externalDocs: ExternalDoc

3. Info
Fields:
  title: string (REQUIRED)
  version: string (REQUIRED)
  description: string
  termsOfService: URL
  contact: Contact Object
  license: License Object

4. Servers
Fields:
  url: string with {variable} templates (REQUIRED)
  description: string
  variables: map<name, ServerVariable>

5. Path Templating
Rules:
  template syntax: /path/{param}
  each {param} must map to path parameter definition
  characters '/', '?', '#' must be percent-encoded

6. Parameters
Fields:
  name, in (path/query/header/cookie), required, style, explode, deprecated, allowEmptyValue, allowReserved , schema or content
Serialization:
  style values: matrix, label, form, simple, spaceDelimited, pipeDelimited, deepObject
  explode controls delimiter behavior

7. Request Bodies
Fields:
  description, content map<mediaType, MediaTypeObj>, required

8. Responses
Map<statusCode|'default', Response Obj>
Response:
  description (REQUIRED), headers, content, links

9. Security Schemes
Types:
  apiKey: in, name
  http: scheme, bearerFormat
  oauth2: flows
  openIdConnect: openIdConnectUrl

10. Schema
Conforms to JSON Schema 2020-12, adds:
  discriminator, xml, externalDocs, deprecated
Supports composition: allOf, oneOf, anyOf, not; formats: int32,int64,float,double,byte,binary,date,dateTime,password

## Original Source
OpenAPI 3.1 Specification
https://spec.openapis.org/oas/v3.1.0.html

## Digest of OPENAPI_3_1

# OpenAPI Specification v3.1.0

Retrieved: 2024-06-18

## 1. Versioning Scheme
- Field: openapi (string, REQUIRED)
- Format: "major.minor.patch" (e.g., "3.1.0"); tooling must treat major.minor as feature set, ignore patch.

## 2. OpenAPI Root Object
```yaml
openapi: string (REQUIRED)
info: Info Object (REQUIRED)
servers: [ Server Object ] (default: [{ url: "/" }])
paths: { <path>: Path Item Object | Reference Object } (REQUIRED)
components: Components Object
security: [ Security Requirement Object ]
tags: [ Tag Object ]
externalDocs: External Documentation Object
``` 

## 3. Info Object
```yaml
title: string (REQUIRED)
version: string (REQUIRED)
description: string
termsOfService: URL
toS: string
contact: Contact Object
license: License Object
``` 

## 4. Server Object
```yaml
url: string (REQUIRED, supports {variable})
description: string
templates: { <name>: Server Variable Object }
``` 

## 5. Server Variable Object
```yaml
enum: [string]
default: string (REQUIRED, must be in enum if enum present)
description: string
``` 

## 6. Path Templating
- Syntax: /resource/{param}/sub
- Each {param} must correspond to a path parameter definition.
- Values must not contain unescaped "/", "?", or "#".

## 7. Parameter Object
```yaml
name: string (REQUIRED)
in: ["path","query","header","cookie"] (REQUIRED)
required: boolean (true if in=path)
deprecated: boolean (default false)
allowEmptyValue: boolean (query only)
style: string (default per in: path=simple, query=form, header=simple, cookie=form)
explode: boolean (default per style)
allowReserved: boolean (query only)
schema: Schema Object
content: { <media-type>: Media Type Object }
example: any
examples: { <name>: Example Object | Reference Object }
``` 

## 8. Request Body Object
```yaml
description: string
content: { <media-type>: Media Type Object } (REQUIRED, one entry)
required: boolean (default false)
``` 

## 9. Responses Object
```yaml
<statusCode or "default">: Response Object | Reference Object (REQUIRED)
``` 

## 10. Response Object
```yaml
description: string (REQUIRED)
headers: { <name>: Header Object | Reference Object }
content: { <media-type>: Media Type Object }
links: { <name>: Link Object | Reference Object }
``` 

## 11. Security Scheme Object
```yaml
type: ["apiKey","http","oauth2","openIdConnect"] (REQUIRED)
scheme: string (http only, e.g., "basic", "bearer")
bearerFormat: string (bearer only)
name: string (apiKey only)
in: ["query","header","cookie"] (apiKey only)
flows: OAuth Flows Object (oauth2 only)
openIdConnectUrl: URL (openIdConnect only)
``` 

## 12. OAuth Flows Object
```yaml
implicit: OAuth Flow Object
authorizationCode: OAuth Flow Object
password: OAuth Flow Object
clientCredentials: OAuth Flow Object
``` 

## 13. Schema Object
- Conforms to JSON Schema Draft 2020-12
- Supports properties, required, type, format, allOf, anyOf, oneOf, not, $ref, discriminator, xml, example, deprecated, etc.


## Attribution
- Source: OpenAPI 3.1 Specification
- URL: https://spec.openapis.org/oas/v3.1.0.html
- License: License: OpenAPI Specification License
- Crawl Date: 2025-05-10T15:01:18.933Z
- Data Size: 15989114 bytes
- Links Found: 57019

## Retrieved
2025-05-10
