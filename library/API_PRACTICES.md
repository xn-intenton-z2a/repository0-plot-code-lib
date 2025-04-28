# API_PRACTICES

## Crawl Summary
The crawled content reference (vinaysahni.com best practices for RESTful API) emphasizes using resource-based URIs, proper HTTP methods and status codes, versioning, standardized error responses, and security protocols. It recommends exact HTTP response codes and covers troubleshooting via commands.

## Normalised Extract
Table of Contents:
1. URI Structure
   - Use pluralized resource names (e.g. /users, /orders).
   - Avoid redundant nesting unless necessary.
2. HTTP Methods
   - GET for reading, POST for creation, PUT/PATCH for updates, DELETE for removals.
   - Function signatures include: createResource(data: object): Promise<Response>, updateResource(id: string, data: object): Promise<Response>, deleteResource(id: string): Promise<Response>.
3. Status Codes
   - 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401/403 (Unauthorized/Forbidden), 404 (Not Found), 500 (Internal Server Error).
4. Versioning
   - API endpoints versioned via URL prefix such as /v1/.
5. Pagination, Filtering, and Sorting
   - Query parameters: page (default 1), limit (default 25), sort, filter.
6. Security
   - Enforce HTTPS, implement API keys/OAuth2/JWT, rate limiting mechanisms.
7. Error Handling
   - Uniform JSON error format: errorCode, errorMessage, details.
8. Troubleshooting
   - Use curl commands to test endpoints and cross-check HTTP responses and logs.

## Supplementary Details
Configuration Options:
- Server must use express.json() middleware for JSON payload parsing.
- OpenAPI/Swagger configuration: version: '3.0.0', info: { title: 'API', version: '1.0.0' }.
- Environment variables for security keys and OAuth configurations must be set (e.g. API_KEY, JWT_SECRET).
- Rate limiting configuration example: limit 100 requests per minute per IP.

Implementation Steps:
1. Define versioned routes in your Express app (e.g. app.use('/v1', router)).
2. Validate incoming requests with a library (Joi or Zod) using defined schema.
3. Implement error handling middleware to capture and format errors uniformly.
4. Configure HTTPS using SSL certificates and enforce secure connection protocols.

Exact Parameter Values:
- Pagination: page = integer (>=1), limit = integer (min 1, max 100).
- HTTP header: Content-Type must be 'application/json'.
- API keys: Alphanumeric string of length 32 or more, case sensitive.

## Reference Details
API Endpoint Specifications:
GET /v1/users
  - Query Params: page (number, default 1), limit (number, default 25), sort (string), filter (string).
  - Returns: JSON array of user objects with 200 status code.

POST /v1/users
  - Body: { name: string, email: string, password: string }.
  - Returns: Created user object with status 201.

PUT /v1/users/{id}
  - URL Parameter: id (string, required).
  - Body: { name?: string, email?: string }.
  - Returns: Updated user object with status 200.

DELETE /v1/users/{id}
  - URL Parameter: id (string, required).
  - Returns: Status 204 upon successful deletion.

SDK Method Signatures (TypeScript Examples):
function getUsers(page: number = 1, limit: number = 25): Promise<Array<User>>
function createUser(data: { name: string; email: string; password: string }): Promise<User>
function updateUser(id: string, data: { name?: string; email?: string }): Promise<User>
function deleteUser(id: string): Promise<void>

Complete Code Example:
// Express configuration for a RESTful endpoint
import express, { Request, Response } from 'express';
const app = express();
app.use(express.json());

// GET users endpoint
app.get('/v1/users', (req: Request, res: Response): void => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 25;
  // Retrieve users from database using page and limit
  res.status(200).json({ data: [], page, limit });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function): void => {
  res.status(500).json({ errorCode: 'SERVER_ERROR', errorMessage: err.message, details: [] });
});

// Start server
app.listen(3000, () => { console.log('Server running on port 3000'); });

Troubleshooting Commands:
- Test GET endpoint:
  curl -X GET http://localhost:3000/v1/users?page=1&limit=25
- Expected output: JSON with data array, page, and limit values.
- Verify logs for error traces if a 500 error occurs.

Configuration Options and Their Effects:
- express.json() ensures request bodies are parsed as JSON.
- SSL configuration: key and cert file paths must point to valid certificate files for HTTPS enforcement.
- Rate limiting: specify maximum requests allowed per minute; exceeding the limit returns 429 Too Many Requests.

## Information Dense Extract
RESTful API best practices: Resource URIs use plural nouns (/users); HTTP methods: GET, POST, PUT/PATCH, DELETE with corresponding function signatures; status codes: 200, 201, 204, 400, 401/403, 404, 500; versioning via /v1/; pagination params: page (>=1, default1), limit (1-100, default25); security via HTTPS, API keys, OAuth2/JWT; error responses in JSON {errorCode, errorMessage, details}; Express usage with express.json(), error middleware; complete endpoint specs for GET/POST/PUT/DELETE; TypeScript SDK signatures provided; troubleshooting using curl commands; rate limiting to 100 requests per minute.

## Sanitised Extract
Table of Contents:
1. URI Structure
   - Use pluralized resource names (e.g. /users, /orders).
   - Avoid redundant nesting unless necessary.
2. HTTP Methods
   - GET for reading, POST for creation, PUT/PATCH for updates, DELETE for removals.
   - Function signatures include: createResource(data: object): Promise<Response>, updateResource(id: string, data: object): Promise<Response>, deleteResource(id: string): Promise<Response>.
3. Status Codes
   - 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401/403 (Unauthorized/Forbidden), 404 (Not Found), 500 (Internal Server Error).
4. Versioning
   - API endpoints versioned via URL prefix such as /v1/.
5. Pagination, Filtering, and Sorting
   - Query parameters: page (default 1), limit (default 25), sort, filter.
6. Security
   - Enforce HTTPS, implement API keys/OAuth2/JWT, rate limiting mechanisms.
7. Error Handling
   - Uniform JSON error format: errorCode, errorMessage, details.
8. Troubleshooting
   - Use curl commands to test endpoints and cross-check HTTP responses and logs.

## Original Source
HTTP API Design Best Practices
https://www.vinaysahni.com/best-practices-for-a-practical-restful-api

## Digest of API_PRACTICES

# API PRACTICES
Date Retrieved: 2023-10-06

This document outlines actionable guidelines and detailed specifications for RESTful API design. It includes resource URI structure recommendations, HTTP method usage, status code conventions, versioning strategies, error handling protocols, and security best practices.

## URI Structure
- Use plural nouns to represent resources (e.g. /users, /orders).
- Nest resources only when necessary (e.g. /users/{userId}/orders).

## HTTP Methods
- GET: Retrieve resource data.
- POST: Create a new resource. Example signature: function createResource(data: object): Promise<Response>
- PUT/PATCH: Update an existing resource. Example signature: function updateResource(id: string, data: object): Promise<Response>
- DELETE: Remove a resource. Example signature: function deleteResource(id: string): Promise<Response>

## Status Codes
- 200 OK: Successful data retrieval
- 201 Created: Resource successfully created
- 204 No Content: Successful deletion or update with no response body
- 400 Bad Request: Invalid request parameters
- 401 Unauthorized / 403 Forbidden: Authentication/authorization failure
- 404 Not Found: Non-existent resource
- 500 Internal Server Error: Server-side error

## Versioning
- Incorporate versioning in the URL structure (e.g. /v1/users) to maintain backward compatibility.

## Pagination, Filtering and Sorting
- Accept query parameters: page, limit, sort, filter.
- Recommended default values: page=1, limit=25.

## Security
- Serve API exclusively over HTTPS.
- Use API keys, OAuth2, or JWT for authentication.
- Enforce rate limiting to protect against DoS attacks.

## Error Handling
- Uniform error response in JSON format with fields: errorCode, errorMessage, details.
- Example structure: { errorCode: "ERR_INVALID_INPUT", errorMessage: "Invalid input provided", details: [] }

## Best Practices / Implementation Patterns
- Use standardized middleware to parse JSON (e.g. express.json() in Node.js).
- Validate request payloads using libraries like Joi or Zod.
- Document and version all endpoints using OpenAPI/Swagger specifications.
- Maintain comprehensive logging (both successful requests and errors) with correlation IDs for debugging.

## Troubleshooting Procedures
- Use curl commands to verify endpoints:
  curl -X GET http://api.example.com/v1/resource
- Inspect HTTP response codes and JSON error messages for debugging.
- Check server logs for detailed error traces using log identifiers.

Attribution: Extracted from vinaysahni.com best practices and cross-referenced with industry standards.
Data Size during crawl: 0 bytes

## Attribution
- Source: HTTP API Design Best Practices
- URL: https://www.vinaysahni.com/best-practices-for-a-practical-restful-api
- License: Public Domain
- Crawl Date: 2025-04-28T07:59:48.191Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-28
