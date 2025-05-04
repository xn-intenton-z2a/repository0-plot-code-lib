# SSE_STREAM

## Purpose
Provide a streaming HTTP API endpoint using Server-Sent Events to stream time series points in real time to clients, complementing the existing HTTP and CLI interfaces.

## Behavior
1. When the tool starts with --serve or HTTP_PORT, an Express app exposes a new endpoint:
   • GET /stream  
     Query parameters: expression (required), range (required), points (optional, default 100)  
     Response: Status 200, Content-Type text/event-stream  
     The server writes each point as a Server-Sent Events message with lines:
       data: { x, y }  
     separated by a blank line. After all points are streamed, send an event: `event: end` and terminate the connection.
     Status codes: 400 for missing or invalid parameters, 422 for expression evaluation errors.
2. Include CORS headers on /stream responses consistent with /timeseries and /plot:
   • Access-Control-Allow-Origin from CORS_ORIGINS or '*'
   • Access-Control-Allow-Methods 'GET,OPTIONS'
   • Access-Control-Allow-Headers 'Content-Type'
3. Validate req.query using zod to enforce types and defaults, then invoke parseRange and evaluateExpression to generate data points.
4. On validation or evaluation error, send an SSE event of type error:
   event: error  
   data: { error: <message> }  
   then close the connection with the appropriate HTTP status code.

## Implementation
- In src/lib/main.js detect HTTP mode and add a route GET /stream.
- Use zod schemas to parse and coerce expression, range, and points.
- Set response headers for SSE and CORS before sending any data.
- Loop through each point from evaluateExpression and write an SSE message for each.
- After streaming all points write an end event and call res.end().
- Handle errors by writing a single error event and ending the response.

## Testing
- Add supertest unit tests against the Express server:
  • Successful GET /stream returns status 200, content-type text/event-stream, and streams `data: { x, y }` messages for each point, ending with `event: end`.
  • OPTIONS /stream returns 204 and CORS headers.
  • Missing or invalid parameters yield status 400 with JSON error SSE event.
  • Expression evaluation errors yield status 422 with error SSE event.
  • When CORS_ORIGINS is set, Access-Control-Allow-Origin matches configured origins.