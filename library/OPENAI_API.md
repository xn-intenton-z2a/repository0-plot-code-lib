# OPENAI_API

## Crawl Summary
Authentication via Bearer tokens; POST endpoints (e.g., /v1/completions) requiring specific parameters (model, prompt, max_tokens, temperature, etc.); detailed response objects with id, model, created timestamp, and choices array. Includes exact HTTP header and cURL examples for direct implementation.

## Normalised Extract
Table of Contents:
1. Authentication
   - Header format: Authorization: Bearer <API_KEY>
2. API Endpoints and Methods
   - Completions endpoint details:
     * Endpoint: POST https://api.openai.com/v1/completions
     * Method signature: async function createCompletion(model: string, prompt: string, options?: { max_tokens?: number, temperature?: number, top_p?: number, n?: number, stream?: boolean, stop?: string | string[] }): Promise<CompletionResponse>
     * Parameters:
       - model (string, required)
       - prompt (string, required)
       - max_tokens (number, optional, default: 16)
       - temperature (number, optional, default: 1)
       - top_p (number, optional, default: 1)
       - n (number, optional, default: 1)
       - stream (boolean, optional, default: false)
       - stop (string or array, optional)
   - Additional endpoints: Chat completions, Edits, Embeddings, Files
3. Example Code Usage
   - Node.js example with fetch
   - cURL usage example
4. Configuration Options and Best Practices
   - Timeout settings, error handling (HTTP 400, 401), rate limiting information.
5. Troubleshooting Procedures
   - Detailed steps to diagnose common issues using HTTP status codes and sample validation commands.

Complete technical details include explicit method signatures, parameter type definitions, sample code implementations, and configuration parameters with defaults.

## Supplementary Details
Detailed Specifications:
- Parameter Values:
  * max_tokens: number (default 16), must be integer.
  * temperature: float (default 1.0), range 0-2.
  * top_p: float (default 1.0), range 0-1.
- Configuration Options:
  * HTTP Timeout: Recommended 30 seconds.
  * Retries: Implement exponential backoff starting from 1 second doubling up to 16 seconds.
- Implementation Steps:
  1. Validate API key and permission scopes.
  2. Structure request JSON with required fields.
  3. Use secure HTTPS request to endpoint.
  4. Parse JSON response and check for error codes.
  5. Log and handle exceptions using try/catch blocks.
- Example Detailed Code (Node.js):
```js
const https = require('https');

function callOpenAICompletion(apiKey, model, prompt) {
  const data = JSON.stringify({
    model: model,
    prompt: prompt,
    max_tokens: 50,
    temperature: 0.7
  });

  const options = {
    hostname: 'api.openai.com',
    path: '/v1/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Content-Length': data.length
    },
    timeout: 30000
  };

  const req = https.request(options, (res) => {
    let chunks = '';
    res.on('data', (chunk) => { chunks += chunk; });
    res.on('end', () => { console.log(JSON.parse(chunks)); });
  });

  req.on('error', (e) => { console.error(`Problem with request: ${e.message}`); });
  req.write(data);
  req.end();
}

callOpenAICompletion('YOUR_API_KEY', 'text-davinci-003', 'Once upon a time');
```


## Reference Details
Complete API Specifications:

1. Completions Endpoint:
   - Method: POST
   - URL: https://api.openai.com/v1/completions
   - Request Headers:
     * Content-Type: application/json
     * Authorization: Bearer <API_KEY>
   - Request Body Example:
     {
       "model": "text-davinci-003",
       "prompt": "Once upon a time",
       "max_tokens": 50,
       "temperature": 0.7,
       "top_p": 1,
       "n": 1,
       "stream": false,
       "stop": null
     }
   - SDK Method Signature (TypeScript):
     ```ts
     interface CompletionRequest {
       model: string;
       prompt: string;
       max_tokens?: number;
       temperature?: number;
       top_p?: number;
       n?: number;
       stream?: boolean;
       stop?: string | string[] | null;
     }

     interface CompletionChoice {
       text: string;
       index: number;
       logprobs?: any;
       finish_reason: string;
     }

     interface CompletionResponse {
       id: string;
       object: string;
       created: number;
       model: string;
       choices: CompletionChoice[];
     }

     async function createCompletion(request: CompletionRequest): Promise<CompletionResponse> {
       // Implementation using fetch or axios
     }
     ```
   - Example cURL Command:
     ```bash
     curl https://api.openai.com/v1/completions \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer YOUR_API_KEY" \
       -d '{
         "model": "text-davinci-003",
         "prompt": "Once upon a time",
         "max_tokens": 50,
         "temperature": 0.7
       }'
     ```

2. Error Handling and Troubleshooting:
   - Common HTTP status codes: 400 (Bad Request), 401 (Unauthorized), 429 (Too Many Requests).
   - Retry Procedure: On status 429 or network errors, implement exponential backoff: initial delay of 1s, doubling each retry, with a maximum of 16 seconds.
   - Logging: Log request and response bodies for diagnostic purposes.
   - Debugging: Use verbose mode with cURL (`curl -v ...`) to inspect header details.

3. Best Practices Implementation Code Sample:
   ```js
   async function safeCreateCompletion(apiKey, model, prompt) {
     let attempt = 0;
     const maxAttempts = 5;
     let delay = 1000; // 1 second
     while (attempt < maxAttempts) {
       try {
         const response = await createCompletion({ model, prompt, max_tokens: 50, temperature: 0.7 });
         return response;
       } catch (error) {
         if (attempt === maxAttempts - 1) throw error;
         await new Promise(resolve => setTimeout(resolve, delay));
         delay *= 2;
         attempt++;
       }
     }
   }
   ```

This documentation provides developers with precise API endpoints, method signatures, configuration values, full code examples, and troubleshooting steps necessary for direct integration and use of OpenAI's API.

## Original Source
OpenAI API Documentation
https://platform.openai.com/docs/api-reference

## Digest of OPENAI_API

# OPENAI API DOCUMENTATION

**Retrieved Date:** 2023-10-06

## 1. Authentication
- All API requests require an HTTP header: 
  - `Authorization: Bearer <API_KEY>`

## 2. Endpoints and Methods

### 2.1 Completions Endpoint
- **Endpoint:** `POST https://api.openai.com/v1/completions`
- **Description:** Generate text completions based on a provided prompt.
- **Method Signature (SDK Example):**
  ```js
  async function createCompletion(model: string, prompt: string, options?: {
    max_tokens?: number,
    temperature?: number,
    top_p?: number,
    n?: number,
    stream?: boolean,
    stop?: string | string[]
  }): Promise<CompletionResponse>;
  ```
- **Parameters:**
  - `model` (string, required): Identifier of the model (e.g., "text-davinci-003").
  - `prompt` (string, required): The input text for the model to complete.
  - `max_tokens` (number, optional, default: 16): Maximum number of tokens to generate.
  - `temperature` (number, optional, default: 1): Sampling temperature.
  - `top_p` (number, optional, default: 1): Nucleus sampling parameter.
  - `n` (number, optional, default: 1): Number of completions to generate.
  - `stream` (boolean, optional, default: false): Whether to stream partial progress.
  - `stop` (string or array, optional): Up to 4 sequences where the API will stop generating further tokens.
- **Response:**
  - `id` (string): Unique identifier for the completion.
  - `object` (string): Type of object returned, e.g., "text_completion".
  - `created` (number): Unix timestamp of creation.
  - `model` (string): The model used for generation.
  - `choices` (array): Array of completion choices, each containing:
    - `text` (string): The generated text.
    - `index` (number): The index of the completion.
    - `logprobs` (nullable): Log probability details.
    - `finish_reason` (string): Reason the generation stopped.

### 2.2 Other Endpoints
- **Chat Completions:** `POST https://api.openai.com/v1/chat/completions`
  - Uses a similar parameter structure with messages array; refer to SDK docs for detailed method signature.
- **Edits, Embeddings, and Files Endpoints:** Follow analogous patterns with required model, prompt, and additional parameters as per API requirements.

## 3. Example Code Usage

### 3.1 Node.js Example using fetch:
```js
const fetch = require('node-fetch');

async function createCompletion() {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: 'Once upon a time',
      max_tokens: 50,
      temperature: 0.7
    })
  });
  const data = await response.json();
  console.log(data);
}

createCompletion();
```

### 3.2 cURL Example:
```bash
curl https://api.openai.com/v1/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "text-davinci-003",
    "prompt": "Once upon a time",
    "max_tokens": 50,
    "temperature": 0.7
  }'
```

## 4. Configuration Options and Best Practices
- **Timeouts:** Set appropriate timeouts for HTTP requests; e.g., 30 seconds.
- **Error Handling:** Catch HTTP errors and inspect response status codes; typical errors include 400 (Bad Request) and 401 (Unauthorized).
- **Rate Limiting:** Monitor headers for rate limit info (e.g., `X-RateLimit-Remaining`).
- **Best Practices:**
  - Always validate input parameters before calling the API.
  - Retry logic in case of transient errors.
  - Securely store and manage API keys.

## 5. Troubleshooting Procedures
- **Common Errors and Commands:**
  - *401 Unauthorized:* Ensure your API key is active and correctly placed in the header.
  - *400 Bad Request:* Verify JSON payload; use a JSON linter to validate your request.
  - Re-run a sample query using cURL to isolate potential code issues.

**Data Size:** 0 bytes

**Attribution:** Extracted from OpenAI API Documentation via https://platform.openai.com/docs/api-reference

## Attribution
- Source: OpenAI API Documentation
- URL: https://platform.openai.com/docs/api-reference
- License: N/A
- Crawl Date: 2025-04-21T02:21:14.180Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-21
