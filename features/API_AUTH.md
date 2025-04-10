# API_AUTH Feature Specification

## Overview
This feature introduces a lightweight API key based authentication middleware to secure the HTTP API endpoints. Designed to be implemented as a single source file, the API_AUTH feature ensures that only authorized requests can access core plotting functionalities and diagnostic endpoints. This aligns with our mission of being the go-to plot library by providing both accessibility and security in one streamlined tool.

## Implementation Details
- **Middleware Integration:**
  - Create a new source file (e.g., `src/lib/apiAuth.js`) that exports an Express middleware function.
  - The middleware will check for a valid API key in the request header (`x-api-key`).
  
- **Configuration:**
  - The valid API key is set via an environment variable (e.g., `API_KEY`).
  - Developers can override or adjust the API key without modifying the core code, supporting flexible deployment.

- **Error Handling:**
  - Unauthorized requests return a 401 status code with an informative error message.
  - Valid requests are forwarded to the next middleware or API handler without delay.

- **Integration:**
  - Designed to be easily plugged into the HTTP API. Users can apply this middleware to protect sensitive endpoints such as `/plot`, `/history`, and `/health`.
  - Encourages minimal intrusion by keeping authentication logic isolated and maintainable.

## Testing and Documentation
- **Unit Tests:**
  - Develop tests simulating both valid and invalid API key scenarios.
  - Ensure that middleware correctly blocks unauthorized access and allows valid requests.

- **Documentation Updates:**
  - Update README.md and HTTP_API.md to document the usage of the API_AUTH feature, including configuration examples.
  - Provide guidance for troubleshooting common API key issues and secure deployment practices.

## Benefits
- **Enhanced Security:** Protects API endpoints from unauthorized access, ensuring that only valid requests reach the core functionalities.
- **Simplicity and Flexibility:** Easy to configure and integrate, requiring minimal changes to existing code bases while offering robust security.
- **Mission Alignment:** Strengthens the repository's position as a go-to tool for formula visualisations by addressing both usability and security concerns.

## Summary
The API_AUTH feature adds a critical security layer to the HTTP API by implementing an API key based authentication mechanism. It is straightforward to configure, test, and integrate, making it an ideal addition for deployments that need secure access management without sacrificing performance or usability.