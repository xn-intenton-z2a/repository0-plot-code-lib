# OPENAI_API

## Crawl Summary
Crawled content from https://platform.openai.com/docs/api-reference/ returned no data. Manually integrated API endpoints include Chat Completions, Completions, Embeddings, and Files with full specifications on endpoints, required parameters, optional configurations, and expected response structures.

## Normalised Extract
Table of Contents:
1. Chat Completions Endpoint
   - Endpoint: POST https://api.openai.com/v1/chat/completions
   - Required: model (string), messages (array<{ role, content }>)
   - Optional: temperature (number, default 1.0), max_tokens (number), top_p (number), n (number), stream (boolean)
   - Returns: ChatCompletionResponse with id, object, created, choices, usage
2. Completions Endpoint
   - Endpoint: POST https://api.openai.com/v1/completions
   - Required: model (string), prompt (string)
   - Optional: temperature, max_tokens, top_p, frequency_penalty, presence_penalty
   - Returns: CompletionResponse
3. Embeddings Endpoint
   - Endpoint: POST https://api.openai.com/v1/embeddings
   - Required: model (e.g., text-embedding-ada-002), input (string or array of strings)
   - Returns: EmbeddingResponse containing embedding vectors
4. Files Endpoint
   - Endpoint: POST https://api.openai.com/v1/files
   - Required: file (multipart) and purpose (string, e.g., 'fine-tune')
   - Returns: FileUploadResponse
5. Error Handling
   - Uses standard HTTP error codes and error detail object
6. Configuration Options
   - Required Headers: Authorization: Bearer <API_KEY>, Content-Type: application/json

## Supplementary Details
Chat Completions Detailed:
- API Endpoint: POST https://api.openai.com/v1/chat/completions
- SDK Method: createChatCompletion(model, messages, options)
- Parameters: model (string), messages (array of { role, content }), options (optional: temperature, max_tokens, top_p, n, stream)
- Default temperature = 1.0
- Response: { id: string, object: string, created: number, choices: [ { index: number, message: { role: string, content: string }, finish_reason: string } ], usage: { prompt_tokens: number, completion_tokens: number, total_tokens: number } }

Completions Detailed:
- API Endpoint: POST https://api.openai.com/v1/completions
- SDK Method: createCompletion(model, prompt, options)
- Parameters similar to chat completions

Embeddings Detailed:
- API Endpoint: POST https://api.openai.com/v1/embeddings
- SDK Method: createEmbedding(model, input)
- Recommended model: text-embedding-ada-002

Files Detailed:
- API Endpoint: POST https://api.openai.com/v1/files
- SDK Method: uploadFile(file, purpose)
- Use for fine-tuning file uploads

Configuration & SDK Initialization:
- Set apiKey in SDK configuration (e.g., process.env.OPENAI_API_KEY)
- Headers: Authorization: Bearer <API_KEY>, Content-Type: application/json

Implementation Sequence:
1. Install SDK (npm install openai)
2. Import and configure client
3. Invoke endpoint method with appropriate parameters
4. Process response; use try-catch to handle errors

Troubleshooting Steps:
- Run: curl https://api.openai.com/v1/models -H 'Authorization: Bearer YOUR_API_KEY'
- Check output for list of models
- Validate API key and network
- Inspect error response details for rate limits or parameter issues

## Reference Details
Chat Completions API:
- Endpoint: POST https://api.openai.com/v1/chat/completions
- Method Signature: createChatCompletion(model: string, messages: Array<{ role: 'system' | 'user' | 'assistant', content: string }>, options?: { temperature?: number, max_tokens?: number, top_p?: number, n?: number, stream?: boolean }): Promise<ChatCompletionResponse>
- Required Parameters: model (string), messages (array), options (optional)
- Return Type: ChatCompletionResponse { id: string, object: string, created: number, choices: Array<{ index: number, message: { role: string, content: string }, finish_reason: string }>, usage: { prompt_tokens: number, completion_tokens: number, total_tokens: number } }

Completions API:
- Endpoint: POST https://api.openai.com/v1/completions
- Method Signature: createCompletion(model: string, prompt: string, options?: { temperature?: number, max_tokens?: number, top_p?: number, frequency_penalty?: number, presence_penalty?: number }): Promise<CompletionResponse>

Embeddings API:
- Endpoint: POST https://api.openai.com/v1/embeddings
- Method Signature: createEmbedding(model: string, input: string | string[]): Promise<EmbeddingResponse>

Files API:
- Endpoint: POST https://api.openai.com/v1/files
- Method Signature: uploadFile(file: File, purpose: string): Promise<FileUploadResponse>

Node.js SDK Example:
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function exampleChatCompletion() {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }],
      temperature: 0.7
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

Configuration:
- API Key: string from environment variable OPENAI_API_KEY
- HTTP Headers: { Authorization: 'Bearer <API_KEY>', 'Content-Type': 'application/json' }

Best Practices:
- Validate responses and implement error handling using try-catch
- Utilize exponential backoff on rate-limit errors

Troubleshooting:
- Command: curl https://api.openai.com/v1/models -H 'Authorization: Bearer YOUR_API_KEY'
- Expected: JSON list of model details; on failure, verify API key and connectivity

## Information Dense Extract
POST /v1/chat/completions: model:string, messages: Array<{role,content}>, options:{temperature(default1.0),max_tokens,top_p,n,stream} -> ChatCompletionResponse{id,object,created,choices[],usage}; POST /v1/completions: model:string, prompt:string, options:{temperature,max_tokens,top_p,frequency_penalty,presence_penalty} -> CompletionResponse; POST /v1/embeddings: model:string (prefer text-embedding-ada-002), input:string|string[] -> EmbeddingResponse; POST /v1/files: file:multipart, purpose:string ('fine-tune') -> FileUploadResponse; SDK Node.js: use openai npm with configuration {apiKey}; HTTP Headers: Authorization:Bearer <API_KEY>, Content-Type:application/json; recommend try-catch and curl testing.

## Sanitised Extract
Table of Contents:
1. Chat Completions Endpoint
   - Endpoint: POST https://api.openai.com/v1/chat/completions
   - Required: model (string), messages (array<{ role, content }>)
   - Optional: temperature (number, default 1.0), max_tokens (number), top_p (number), n (number), stream (boolean)
   - Returns: ChatCompletionResponse with id, object, created, choices, usage
2. Completions Endpoint
   - Endpoint: POST https://api.openai.com/v1/completions
   - Required: model (string), prompt (string)
   - Optional: temperature, max_tokens, top_p, frequency_penalty, presence_penalty
   - Returns: CompletionResponse
3. Embeddings Endpoint
   - Endpoint: POST https://api.openai.com/v1/embeddings
   - Required: model (e.g., text-embedding-ada-002), input (string or array of strings)
   - Returns: EmbeddingResponse containing embedding vectors
4. Files Endpoint
   - Endpoint: POST https://api.openai.com/v1/files
   - Required: file (multipart) and purpose (string, e.g., 'fine-tune')
   - Returns: FileUploadResponse
5. Error Handling
   - Uses standard HTTP error codes and error detail object
6. Configuration Options
   - Required Headers: Authorization: Bearer <API_KEY>, Content-Type: application/json

## Original Source
OpenAI API Documentation
https://platform.openai.com/docs/api-reference/

## Digest of OPENAI_API

# OpenAI API Documentation
Retrieved Date: 2023-10-06

## Chat Completions Endpoint
Endpoint: POST https://api.openai.com/v1/chat/completions
Method Signature: function createChatCompletion(model: string, messages: Array<{ role: 'system' | 'user' | 'assistant', content: string }>, options?: { temperature?: number, max_tokens?: number, top_p?: number, n?: number, stream?: boolean }): Promise<ChatCompletionResponse>
Required Parameters:
- model: string (required)
- messages: array of objects (required)
Optional Parameters:
- temperature: number (default 1.0)
- max_tokens: number
- top_p: number
- n: number
- stream: boolean
Response: ChatCompletionResponse object with keys: id, object, created, choices (array), usage (object)

## Completions Endpoint
Endpoint: POST https://api.openai.com/v1/completions
Method Signature: function createCompletion(model: string, prompt: string, options?: { temperature?: number, max_tokens?: number, top_p?: number, frequency_penalty?: number, presence_penalty?: number }): Promise<CompletionResponse>
Required:
- model: string
- prompt: string
Optional parameters follow similar conventions as chat completions.

## Embeddings Endpoint
Endpoint: POST https://api.openai.com/v1/embeddings
Method Signature: function createEmbedding(model: string, input: string | string[]): Promise<EmbeddingResponse>
Notes:
- Commonly used model: text-embedding-ada-002
- Input can be a single string or array of strings

## Files Endpoint
Endpoint: POST https://api.openai.com/v1/files
Method Signature: function uploadFile(file: File, purpose: string): Promise<FileUploadResponse>
Parameters:
- file: multipart file upload
- purpose: string (e.g., 'fine-tune')

## Error Handling
Standard HTTP error codes are used. The error response body contains details such as error code, message, and type.

## Configuration
Headers:
- Authorization: Bearer <API_KEY>
- Content-Type: application/json
SDK: Available for Node.js, Python, etc. Node.js usage example provided below.

## Example Node.js SDK Usage
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function exampleChatCompletion() {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }],
      temperature: 0.7
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

## Troubleshooting
- Validate API key via header check: Ensure Authorization header is 'Bearer <YOUR_API_KEY>'
- Use curl command:
  curl https://api.openai.com/v1/models -H 'Authorization: Bearer YOUR_API_KEY'
- Check network connectivity and error codes for guidance.


## Attribution
- Source: OpenAI API Documentation
- URL: https://platform.openai.com/docs/api-reference/
- License: License: N/A
- Crawl Date: 2025-05-02T12:59:27.929Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-02
