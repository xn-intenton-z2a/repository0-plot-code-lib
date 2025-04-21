# OPENAI_API

## Crawl Summary
Endpoint Details: Completions and Chat Completions endpoints with full request/response specifications including parameter types, default values, and response JSON object structures. Includes troubleshooting error responses and full header requirements.

## Normalised Extract
## Table of Contents
1. Endpoints Overview
2. Completions API
3. Chat Completions API
4. Error Handling
5. Code Examples

---

### 1. Endpoints Overview
Direct API calls require proper header configuration including API key authorization and content type specification. Base URL: https://api.openai.com/v1/

### 2. Completions API
**Endpoint:** POST /v1/completions

**Parameters:**
- model (string, required): e.g., "text-davinci-003"
- prompt (string/array, required): Text or prompt array to generate a response
- suffix (string, optional): Text to append
- max_tokens (integer, optional): Default 16
- temperature (number, optional): Default 1
- top_p (number, optional): Default 1
- n (integer, optional): Number of completions, default 1
- stream (boolean, optional): Streaming option, default false
- logprobs (integer, optional): Log probability count
- stop (string/array, optional): Stop sequences

**Response Structure:** JSON with keys id, object, created, model, choices (text, index, logprobs, finish_reason), usage (prompt_tokens, completion_tokens, total_tokens).

### 3. Chat Completions API
**Endpoint:** POST /v1/chat/completions

**Parameters:**
- model (string, required): e.g., "gpt-3.5-turbo"
- messages (array, required): List of { role, content } objects
- temperature (number, optional): Default 1
- top_p (number, optional): Default 1
- n (integer, optional): Default 1
- stream (boolean, optional): Default false
- stop (string/array, optional): Stop sequences

**Response Structure:** JSON with id, object, created, model, choices (index, message with role and content, finish_reason) and usage details.

### 4. Error Handling
Standardized JSON error responses include error message, type, parameter causing error, and error code. Example error: "Invalid API Key provided" with code "invalid_api_key".

### 5. Code Examples
Provides working Node.js examples utilizing axios and cURL commands for both completions and chat completions endpoints.


## Supplementary Details
#### Detailed Specifications and Implementation Steps

- Set up HTTP POST request to the API URL with the following headers:
  - 'Content-Type': 'application/json'
  - 'Authorization': 'Bearer YOUR_API_KEY'

- For the Completions endpoint, construct JSON body with required fields:
  {
    "model": "text-davinci-003",
    "prompt": "Your prompt here",
    "max_tokens": 7,             // Optional, default 16
    "temperature": 0.5,          // Optional, default 1
    "top_p": 1,                  // Optional, default 1
    "n": 1,                      // Optional, default 1
    "stream": false,             // Optional, default false
    "logprobs": null,            // Optional
    "stop": null                 // Optional
  }

- For Chat Completions, ensure messages array is structured properly:
  [
    { "role": "user", "content": "Hello, world!" },
    { "role": "assistant", "content": "Response..." }
  ]

- Troubleshooting Steps:
  1. Validate API key and header format.
  2. Check HTTP status codes; for 4xx or 5xx, inspect error JSON for details.
  3. Use provided curl examples to isolate issues.
  4. Verify JSON schema against API specification if errors persist.


## Reference Details
### API Specifications

#### Completions Endpoint Specification
- **Method:** POST
- **URL:** https://api.openai.com/v1/completions
- **Headers:**
  - Content-Type: application/json
  - Authorization: Bearer YOUR_API_KEY

**Request JSON Schema:**
{
  "model": "string",          // Required, e.g., "text-davinci-003"
  "prompt": "string or array",  // Required
  "suffix": "string",           // Optional
  "max_tokens": "integer",      // Optional, default 16
  "temperature": "number",      // Optional, default 1
  "top_p": "number",            // Optional, default 1
  "n": "integer",               // Optional, default 1
  "stream": "boolean",          // Optional, default false
  "logprobs": "integer|null",   // Optional
  "stop": "string or array|null"// Optional
}

**Response JSON Schema:**
{
  "id": "string",
  "object": "string",
  "created": "integer",
  "model": "string",
  "choices": [
    {
      "text": "string",
      "index": "integer",
      "logprobs": "object|null",
      "finish_reason": "string"
    }
  ],
  "usage": {
    "prompt_tokens": "integer",
    "completion_tokens": "integer",
    "total_tokens": "integer"
  }
}

#### Chat Completions Endpoint Specification
- **Method:** POST
- **URL:** https://api.openai.com/v1/chat/completions
- **Headers:** Same as above

**Request JSON Schema:**
{
  "model": "string",   // Required, e.g., "gpt-3.5-turbo"
  "messages": [          // Required, array of message objects
    {
      "role": "string",    // "system", "user", or "assistant"
      "content": "string"  // Message text
    }
  ],
  "temperature": "number", // Optional, default 1
  "top_p": "number",       // Optional, default 1
  "n": "integer",          // Optional, default 1
  "stream": "boolean",     // Optional, default false
  "stop": "string or array|null" // Optional
}

**Response JSON Schema:**
{
  "id": "string",
  "object": "string",
  "created": "integer",
  "model": "string",
  "choices": [
    {
      "index": "integer",
      "message": {
        "role": "string",
        "content": "string"
      },
      "finish_reason": "string"
    }
  ],
  "usage": {
    "prompt_tokens": "integer",
    "completion_tokens": "integer",
    "total_tokens": "integer"
  }
}

### SDK Method Signature Example (Node.js using axios)

/*
 * Function: getChatCompletion
 * Parameters:
 *   - apiKey: string
 *   - model: string
 *   - messages: Array<{role: string, content: string}>
 *   - temperature?: number (default = 1)
 * Returns:
 *   - Promise resolving with chat completion JSON response
 */
async function getChatCompletion(apiKey, model, messages, temperature = 1) {
  const axios = require('axios');
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model,
    messages,
    temperature
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });
  return response.data;
}

// Full troubleshooting commands:
// 1. Validate API key with a simple GET request if available.
// 2. Use curl command for baseline testing:
//    curl https://api.openai.com/v1/completions -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_API_KEY" -d '{ "model": "text-davinci-003", "prompt": "test", "max_tokens": 7 }'
// 3. Check HTTP status code and error object for guidance on fixes.


## Original Source
OpenAI API Documentation
https://platform.openai.com/docs/api-reference

## Digest of OPENAI_API

# OpenAI API Documentation

**Retrieved Date:** 2023-10-08

## Overview
This document provides direct technical details from the OpenAI API documentation including complete API specifications, method signatures, configuration options, complete code examples, implementation patterns, and troubleshooting procedures.

## Endpoints

### Completions Endpoint
- **URL:** POST https://api.openai.com/v1/completions
- **Required Headers:**
  - Content-Type: application/json
  - Authorization: Bearer YOUR_API_KEY

#### Request Body Parameters
| Parameter    | Type           | Required | Default   | Description |
|--------------|----------------|----------|-----------|-------------|
| model        | string         | Yes      | N/A       | The name of the model to use (e.g., "text-davinci-003") |
| prompt       | string or array| Yes      | N/A       | The prompt(s) to generate completions for |
| suffix       | string         | No       | null      | The text to append after the completion |
| max_tokens   | integer        | No       | 16        | The maximum number of tokens to generate |
| temperature  | number         | No       | 1         | Sampling temperature to use |
| top_p        | number         | No       | 1         | Nucleus sampling probability |
| n            | integer        | No       | 1         | How many completions to generate |
| stream       | boolean        | No       | false     | Whether to stream back partial progress |
| logprobs     | integer        | No       | null      | Include the log probabilities on the top tokens |
| stop         | string or array| No       | null      | Up to 4 sequences where the API will stop generating further tokens |

#### Response
Returns a JSON object with the following structure:
```json
{
  "id": "cmpl-XXXXX",
  "object": "text_completion",
  "created": 1614807341,
  "model": "text-davinci-003",
  "choices": [
    {
      "text": "Generated completion text",
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 5,
    "completion_tokens": 7,
    "total_tokens": 12
  }
}
```

### Chat Completions Endpoint
- **URL:** POST https://api.openai.com/v1/chat/completions

#### Request Body Parameters
| Parameter    | Type           | Required | Default   | Description |
|--------------|----------------|----------|-----------|-------------|
| model        | string         | Yes      | N/A       | The name of the chat model to use (e.g., "gpt-3.5-turbo") |
| messages     | array          | Yes      | N/A       | A list of message objects describing the conversation. Each object has:
   - role (string): "system", "user", or "assistant"
   - content (string): The content of the message
| temperature  | number         | No       | 1         | Sampling temperature for response variation |
| top_p        | number         | No       | 1         | Nucleus sampling probability |
| n            | integer        | No       | 1         | Number of completions to generate |
| stream       | boolean        | No       | false     | Whether to stream responses |
| stop         | string or array| No       | null      | Sequence(s) at which the API will stop generating further tokens |

#### Response
Returns a JSON object with the structure:
```json
{
  "id": "chatcmpl-XXXXX",
  "object": "chat.completion",
  "created": 1614807341,
  "model": "gpt-3.5-turbo",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Response message text"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 25,
    "total_tokens": 35
  }
}
```

## Error Handling

### Common Error Response
Errors are typically returned with an HTTP status code other than 200. A sample error response:
```json
{
  "error": {
    "message": "Invalid API Key provided",
    "type": "invalid_request_error",
    "param": null,
    "code": "invalid_api_key"
  }
}
```

## Example Code

### Node.js (using axios) - Completions
```javascript
const axios = require('axios');

async function getCompletion() {
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-003",
      prompt: "Say this is a test",
      max_tokens: 7,
      temperature: 0.5
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

getCompletion();
```

### cURL Example - Chat Completions
```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "Hello, world!"}],
      "temperature": 0.7
  }'
```


## Attribution
- Source: OpenAI API Documentation
- URL: https://platform.openai.com/docs/api-reference
- License: Unknown
- Crawl Date: 2025-04-21T17:47:04.067Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-21
