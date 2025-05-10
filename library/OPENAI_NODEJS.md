# OPENAI_NODEJS

## Crawl Summary
Instantiate client with apiKey, baseURL, timeout. Supported methods: createCompletion, createChatCompletion, createEmbedding with Promise returns. Enable streaming via stream: true and process async iterator. Errors thrown as OpenAIError with status and code. TypeScript types defined for request and response objects.

## Normalised Extract
Table of Contents
1 Initialization
2 Authentication
3 Configuration
4 API Methods
5 Streaming Responses
6 Error Handling
7 TypeScript Types

1 Initialization
Import and create instance
    import OpenAI from "openai"
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.openai.com/v1", timeout: 30000 })

2 Authentication
Pass apiKey or set env var OPENAI_API_KEY. Optionally set organization.

3 Configuration
Options: apiKey (required), baseURL (default https://api.openai.com/v1), timeout (ms)

4 API Methods
createCompletion(options, signal?) => Promise<CreateCompletionResponse>
createChatCompletion(options, signal?) => Promise<CreateChatCompletionResponse>
createEmbedding(options, signal?) => Promise<CreateEmbeddingResponse>

5 Streaming Responses
Set options.stream=true. Use for await on response.body async iterator. Parse each chunk.

6 Error Handling
Library throws OpenAIError with name, message, status, code. Use try/catch to inspect error.status and error.code.

7 TypeScript Types
CreateCompletionRequest { model: string ; prompt?: string|string[]; max_tokens?: number; temperature?: number; ... }
CreateCompletionResponse { id: string; object: string; created: number; model: string; choices: [{ text; index; logprobs; finish_reason }]; usage: { prompt_tokens; completion_tokens; total_tokens } }

## Supplementary Details
Environment Variables
OPENAI_API_KEY=your_api_key_here
OPENAI_ORGANIZATION=your_org_id

Client Configuration
baseURL: default "https://api.openai.com/v1"
timeout: default 30000 ms

Axios Internals
Client uses axios with the following defaults:
  headers: { "Authorization": "Bearer <apiKey>", "Content-Type": "application/json" }
  responseType: "stream" when stream=true else "json"

AbortSignal Support
Pass an AbortSignal as second argument to methods to cancel requests:
    const controller = new AbortController()
    openai.createCompletion(req, controller.signal)
    controller.abort()

## Reference Details
Constructor Signature
new OpenAI(options: {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  organization?: string;
}): OpenAI

createCompletion(options: {
  model: string;
  prompt?: string|string[];
  suffix?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  echo?: boolean;
  stop?: string|string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  user?: string;
}, signal?: AbortSignal): Promise<{
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{ text: string; index: number; logprobs: any; finish_reason: string }>;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}>

createChatCompletion(options: {
  model: string;
  messages: Array<{ role: "system"|"user"|"assistant"; content: string }>;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string|string[];
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  user?: string;
}, signal?: AbortSignal): Promise<{
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{ index: number; finish_reason: string; message: { role: string; content: string } }>;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}>

createEmbedding(options: {
  model: string;
  input: string|string[];
  user?: string;
}, signal?: AbortSignal): Promise<{
  data: Array<{ embedding: number[]; index: number }>
  usage: { prompt_tokens: number; total_tokens: number }
}>

Code Example
    import OpenAI from "openai"
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    async function run() {
      try {
        const resp = await openai.createChatCompletion({
          model: "gpt-4",
          messages: [ { role: "user", content: "Hello!" } ],
          stream: true
        })
        for await (const part of resp.body) {
          process.stdout.write(part.choices[0].delta.content)
        }
      } catch (e) {
        console.error(e.status, e.code, e.message)
      }
    }

Best Practices
Implement exponential backoff on 429 and 500 errors:
    let retry=0
    while (retry<5) {
      try { await call() ; break } catch (e) {
        if ([429,502,503,504].includes(e.status)) {
          await new Promise(r=>setTimeout(r,2**retry*100))
          retry++
        } else throw e
      }
    }

Troubleshooting
Command: curl -X GET https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"
Expected: 200 OK with list of models
On 401 check API key
On 429 check rate limits and backoff

## Information Dense Extract
import OpenAI; new OpenAI({apiKey,baseURL,timeout,organization}); methods: createCompletion(req,signal)->Promise completion, createChatCompletion(req,signal)->Promise chatCompletion, createEmbedding(req,signal)->Promise embedding; req types: specify model,string inputs, optional parameters; for streaming set stream=true and for await response.body; errors: throws OpenAIError{name,message,status,code}; default baseURL=https://api.openai.com/v1 timeout=30000; retries on 429/5xx with exponential backoff; use AbortController to cancel; example code above.

## Sanitised Extract
Table of Contents
1 Initialization
2 Authentication
3 Configuration
4 API Methods
5 Streaming Responses
6 Error Handling
7 TypeScript Types

1 Initialization
Import and create instance
    import OpenAI from 'openai'
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: 'https://api.openai.com/v1', timeout: 30000 })

2 Authentication
Pass apiKey or set env var OPENAI_API_KEY. Optionally set organization.

3 Configuration
Options: apiKey (required), baseURL (default https://api.openai.com/v1), timeout (ms)

4 API Methods
createCompletion(options, signal?) => Promise<CreateCompletionResponse>
createChatCompletion(options, signal?) => Promise<CreateChatCompletionResponse>
createEmbedding(options, signal?) => Promise<CreateEmbeddingResponse>

5 Streaming Responses
Set options.stream=true. Use for await on response.body async iterator. Parse each chunk.

6 Error Handling
Library throws OpenAIError with name, message, status, code. Use try/catch to inspect error.status and error.code.

7 TypeScript Types
CreateCompletionRequest { model: string ; prompt?: string|string[]; max_tokens?: number; temperature?: number; ... }
CreateCompletionResponse { id: string; object: string; created: number; model: string; choices: [{ text; index; logprobs; finish_reason }]; usage: { prompt_tokens; completion_tokens; total_tokens } }

## Original Source
OpenAI Node.js Library Documentation
https://platform.openai.com/docs/libraries/node-js-overview

## Digest of OPENAI_NODEJS

# Initialization

Import module and instantiate client:

    import OpenAI from "openai"
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.openai.com/v1",
      timeout: 30000
    })

# Authentication

Clients read API key from the "apiKey" constructor option or the environment variable OPENAI_API_KEY. An optional "organization" field can be passed for enterprise accounts.

# API Methods

createCompletion(options: CreateCompletionRequest, signal?: AbortSignal): Promise<CreateCompletionResponse>
createChatCompletion(options: CreateChatCompletionRequest, signal?: AbortSignal): Promise<CreateChatCompletionResponse>
createEmbedding(options: CreateEmbeddingRequest, signal?: AbortSignal): Promise<CreateEmbeddingResponse>

# Streaming

To receive partial responses, set stream: true in request options. Handle response.body as an async iterator:

    for await (const chunk of response.body) {
      const payload = JSON.parse(chunk.toString())
      // process payload.choices[0]
    }

# Error Handling

The library throws OpenAIError with properties:

    name: "OpenAIError"
    message: string
    status: number
    code?: string

Catch errors using try/catch and inspect status and code.

# TypeScript Types

CreateCompletionRequest:
  model: string
  prompt?: string|string[]
  suffix?: string
  max_tokens?: number
  temperature?: number
  top_p?: number
  n?: number
  stream?: boolean
  logprobs?: number
  echo?: boolean
  stop?: string|string[]
  presence_penalty?: number
  frequency_penalty?: number
  best_of?: number
  user?: string

CreateCompletionResponse:
  id: string
  object: string
  created: number
  model: string
  choices: Array<{ text: string; index: number; logprobs: any; finish_reason: string }>
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number }


## Attribution
- Source: OpenAI Node.js Library Documentation
- URL: https://platform.openai.com/docs/libraries/node-js-overview
- License: License: OpenAI Terms of Use
- Crawl Date: 2025-05-10T13:08:28.142Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-10
