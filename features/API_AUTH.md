# API_AUTH Feature Specification

## Overview
This feature introduces a lightweight API key based authentication middleware to secure the HTTP API endpoints. Designed to be implemented as a single source file, the API_AUTH feature ensures that only authorized requests can access core plotting functionalities and diagnostic endpoints. In this update, we enhance the security layer by integrating an optional rate limiting mechanism to mitigate abuse and safeguard the service. This aligns with our mission of being the go-to plot library by providing both accessibility and robust security in one streamlined tool.

## Middleware Integration
- **Authentication:** 
  - Create a dedicated source file (e.g., `src/lib/apiAuth.js`) that exports an Express middleware function.
  - The middleware checks for a valid API key in the request header (`x-api-key`).
  - The valid API key is configured via an environment variable (e.g., `API_KEY`).

- **Error Handling:**
  - Unauthorized requests return a 401 status code along with an informative error message.
  - Valid requests are seamlessly forwarded to the next middleware or handler.

## Rate Limiting Integration
- **Optional Rate Limiting:**
  - Integrate a lightweight rate limiting mechanism (e.g., using a simple in-memory counter or a minimal dependency) to restrict the number of requests from a single IP address.
  - Rate limit thresholds (e.g., requests per minute) can be configured via environment variables (e.g., `RATE_LIMIT_WINDOW` and `RATE_LIMIT_MAX`).
  - Upon exceeding the limit, the middleware returns a 429 status code with a message indicating too many requests.

## Implementation Details
- **Single Source File:** 
  - Both authentication and rate limiting logic are encapsulated in `src/lib/apiAuth.js` for ease of integration and maintainability.
- **Configuration:**
  - Environment variables allow tweaking the API key and rate limiting parameters without altering the core code.
- **Seamless Integration:**
  - Easily plug this middleware into the HTTP API to protect sensitive endpoints such as `/plot`, `/history`, and `/health`.

## Testing and Documentation
- **Unit Tests:**
  - Develop tests simulating requests with both valid and invalid API keys, ensuring unauthorized requests are properly blocked.
  - Include tests to simulate rate limiting, confirming that limits are enforced and appropriate error messages are returned.
- **Documentation Updates:**
  - Update the README.md and HTTP_API.md to document both API_AUTH usage and configuration, including examples for setting rate limiting parameters.
  - Provide troubleshooting guidelines for common issues related to API key validation and rate limiting thresholds.

## Benefits
- **Enhanced Security:**
  - Protects API endpoints from unauthorized access and abuse through combined API key authentication and rate limiting.
- **Simplicity and Flexibility:**
  - Easy to configure, integrate, and extend without significant changes to the existing code base.
- **Mission Alignment:**
  - Strengthens our core value of providing a robust, accessible, and secure plotting library for mathematical formula visualisations.

## Summary
The enhanced API_AUTH feature adds a critical security layer by implementing API key based authentication and an optional rate limiting mechanism. This dual approach ensures that only authorized and well-behaved requests can access the core functionalities, making the tool both secure and reliable for deployments of any scale.