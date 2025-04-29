# SERVERLESS_FRAMEWORK

## Crawl Summary
Serverless Framework technical details include a YAML configuration file (serverless.yml) defining service name, provider settings (AWS, runtime nodejs14.x, region, stage, memorySize, timeout), function declarations with event triggers, and plugins (serverless-offline, serverless-prune-plugin, webpack, domain-manager) with custom configuration options. CLI commands such as deploy, invoke local, logs, and remove are specified. API specifications include AWS Lambda handler signature and plugin method definitions.

## Normalised Extract
Table of Contents:
1. Core Serverless Configuration
   - serverless.yml structure with service, provider (aws, runtime, region, stage, memory, timeout) and functions declaration.
2. Function Declaration and Event Bindings
   - Declare function name, handler (e.g. handler.hello) and events (HTTP path and method).
3. Plugin Integration and Custom Configurations
   - Plugins list: serverless-offline (with port configuration), serverless-prune-plugin (with number of versions to preserve), serverless-webpack, serverless-domain-manager.
   - Custom block details: key-value pairs for each plugin.
4. CLI Commands and Deployment Steps
   - serverless deploy, serverless invoke local -f <function>, serverless logs -f <function>, serverless remove.
5. Troubleshooting Procedures
   - Check logs via serverless logs, run in offline mode, validate YAML configuration.

Detailed Technical Information:
Core Configuration: Use serverless.yml to define service. Specify provider: name: aws, runtime: nodejs14.x, region: us-east-1, stage: dev, memorySize: 1024, timeout: 10.
Function Declaration: Under functions, add a function with key 'hello' with handler 'handler.hello' and an HTTP GET event on path '/hello'.
Plugins: Add plugins array with values "serverless-offline", "serverless-prune-plugin". In custom configuration, define serverless-offline port: 3000 and prune settings like automatic: true, number: 3.
CLI and Deployment: Use serverless deploy for deployment. To test locally, use serverless invoke local -f hello. To get function logs run serverless logs -f hello.
Troubleshooting: Validate YAML, review logs, and use serverless offline for local emulation.
API and SDK Methods: AWS Lambda handler signature: function(event: Object, context: Object, callback: Function): Promise<Object>. Plugin APIs expose methods like start() and stop() with Promise return types.

## Supplementary Details
Serverless.yml Configuration Options:
- service: string (e.g., 'my-service')
- provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    stage: 'dev',
    memorySize: 1024,
    timeout: 10
  }
- functions: {
    [functionName]: {
      handler: 'file.method',
      events: [{ http: { path: '/path', method: 'get' } }]
    }
  }
- plugins: Array of plugin names
- custom: {
    serverless-offline: { port: 3000 },
    prune: { automatic: true, number: 3 }
  }

Implementation Steps:
1. Create serverless.yml with the above structure.
2. Write function handler in a file (e.g., handler.js) with signature: async (event, context) => {}
3. Install plugins via npm (npm install serverless-offline serverless-prune-plugin --save-dev)
4. Deploy with 'serverless deploy'.
5. For local testing, run 'serverless offline'.

Troubleshooting:
- For deployment errors, run 'sls deploy --verbose' to get detailed logs.
- Validate YAML using online linters.
- Use 'sls logs -f <function>' to fetch real-time logs.

CLI Commands:
- Deploy: serverless deploy --stage dev
- Invoke function locally: serverless invoke local -f hello
- Show logs: serverless logs -f hello
- Remove deployment: serverless remove


## Reference Details
API Specifications:
- Function Handler Signature:
  function handler(event: Object, context: Object, callback: Function): Promise<Object>

- Plugin API Example:
  class OfflinePlugin {
    constructor(options: { port: number, host?: string })
    start(): Promise<void>
    stop(): Promise<void>
  }

SDK and CLI Commands:
- serverless deploy [--stage <stage>]: Deploy the service to AWS; default stage is 'dev'.
- serverless invoke local -f <functionName>: Invoke the function locally with the event payload.
- serverless logs -f <functionName>: Fetch logs for the specified function.
- serverless remove: Remove deployed service.

Complete Code Example:
// serverless.yml
service: my-service
provider:
  name: aws
  runtime: nodejs14.x
  region: us-east-1
  stage: dev
  memorySize: 1024
  timeout: 10
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get
plugins:
  - serverless-offline
  - serverless-prune-plugin
custom:
  serverless-offline:
    port: 3000
  prune:
    automatic: true
    number: 3

// handler.js
module.exports.hello = async (event, context) => {
  // Log incoming event
  console.log('Event:', event);
  // Return response
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello Serverless' })
  };
};

Best Practices:
- Always validate serverless.yml for syntax errors.
- Use environment-specific configurations by leveraging the 'stage' variable.
- Secure sensitive data through environment variables loaded from .env files using dotenv.
- Test functions locally using serverless-offline before deployment.

Troubleshooting Procedures:
1. YAML Validation:
   Command: yamllint serverless.yml
   Expected Output: No errors.
2. Deployment Debug:
   Command: serverless deploy --verbose
   Expected: Detailed logs of each deployment step.
3. Function Logs:
   Command: serverless logs -f hello
   Expected: Real-time log output from the AWS Lambda function.
4. Local Testing:
   Command: serverless offline
   Expected: Local emulation of AWS API Gateway and Lambda functions running on port 3000.


## Information Dense Extract
serverless.yml: service=my-service, provider={name: aws, runtime: nodejs14.x, region: us-east-1, stage: dev, memorySize:1024, timeout:10}, functions: {hello: {handler: handler.hello, events:[{http:{path:'/hello', method:'get'}}]}}, plugins: [serverless-offline, serverless-prune-plugin], custom: {serverless-offline: {port:3000}, prune: {automatic:true, number:3}}; Lambda handler signature: function handler(event:Object, context:Object, callback:Function):Promise<Object>; CLI: serverless deploy, invoke local, logs, remove; Code example provided in handler.js; troubleshooting: yamllint check, deploy --verbose, logs -f hello, offline for local debugging.

## Sanitised Extract
Table of Contents:
1. Core Serverless Configuration
   - serverless.yml structure with service, provider (aws, runtime, region, stage, memory, timeout) and functions declaration.
2. Function Declaration and Event Bindings
   - Declare function name, handler (e.g. handler.hello) and events (HTTP path and method).
3. Plugin Integration and Custom Configurations
   - Plugins list: serverless-offline (with port configuration), serverless-prune-plugin (with number of versions to preserve), serverless-webpack, serverless-domain-manager.
   - Custom block details: key-value pairs for each plugin.
4. CLI Commands and Deployment Steps
   - serverless deploy, serverless invoke local -f <function>, serverless logs -f <function>, serverless remove.
5. Troubleshooting Procedures
   - Check logs via serverless logs, run in offline mode, validate YAML configuration.

Detailed Technical Information:
Core Configuration: Use serverless.yml to define service. Specify provider: name: aws, runtime: nodejs14.x, region: us-east-1, stage: dev, memorySize: 1024, timeout: 10.
Function Declaration: Under functions, add a function with key 'hello' with handler 'handler.hello' and an HTTP GET event on path '/hello'.
Plugins: Add plugins array with values 'serverless-offline', 'serverless-prune-plugin'. In custom configuration, define serverless-offline port: 3000 and prune settings like automatic: true, number: 3.
CLI and Deployment: Use serverless deploy for deployment. To test locally, use serverless invoke local -f hello. To get function logs run serverless logs -f hello.
Troubleshooting: Validate YAML, review logs, and use serverless offline for local emulation.
API and SDK Methods: AWS Lambda handler signature: function(event: Object, context: Object, callback: Function): Promise<Object>. Plugin APIs expose methods like start() and stop() with Promise return types.

## Original Source
Serverless Framework Documentation
https://www.serverless.com/framework/docs/

## Digest of SERVERLESS_FRAMEWORK

# Serverless Framework Documentation

Retrieved: 2025-??-?? (Using current retrieval date as provided, e.g., 2025-04-17 is one of the dates in the crawl)

## Core Configuration
- File: serverless.yml
- Service declaration: service: my-service
- Provider configuration:
  provider:
    name: aws
    runtime: nodejs14.x
    region: us-east-1
    stage: dev
    memorySize: 1024
    timeout: 10

## Functions Declaration
- Example function declaration:
  functions:
    hello:
      handler: handler.hello
      events:
        - http:
            path: hello
            method: get

## Plugins and Custom Configurations
- Plugins are declared under the plugins section. Common plugins include:
  - serverless-offline: Emulates AWS Lambda and API Gateway locally
  - serverless-prune-plugin: Deletes older function versions
  - serverless-webpack: Bundles lambda functions with Webpack
  - serverless-domain-manager: Handles customization of API Gateway domains

Custom configuration is handled under the custom field:
custom:
  serverless-offline:
    port: 3000
  prune:
    automatic: true
    number: 3

## CLI Commands and Deployment
- Deployment: serverless deploy
- Local invocation: serverless invoke local -f hello
- Logs retrieval: serverless logs -f hello
- Removal: serverless remove

## Advanced Settings
- Environment Variables: Use dotenv or inline definition under provider.environment
- IAM Role Customizations: Define per function under functions.[functionName].iamRoleStatements

## Troubleshooting
- Check logs: serverless logs -f <functionName>
- Run in offline mode to debug: serverless offline
- Validate YAML configuration: use online YAML lint tools

## API and SDK Method Signatures
- AWS Lambda handler sample:
  function handler(event: Object, context: Object, callback: Function): Promise<Object> {
    // implementation
  }

- Serverless Plugin API example:
  class OfflinePlugin {
    constructor(options: { port: number, host?: string })
    start(): Promise<void>
    stop(): Promise<void>
  }

## Code Example
// File: serverless.yml
service: my-service

provider:
  name: aws
  runtime: nodejs14.x
  region: us-east-1
  stage: dev
  memorySize: 1024
  timeout: 10

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get

plugins:
  - serverless-offline
  - serverless-prune-plugin

custom:
  serverless-offline:
    port: 3000
  prune:
    automatic: true
    number: 3

// File: handler.js
module.exports.hello = async (event, context) => {
  // Example Lambda function
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello Serverless' })
  };
};


## Attribution
- Source: Serverless Framework Documentation
- URL: https://www.serverless.com/framework/docs/
- License: Apache 2.0
- Crawl Date: 2025-04-29T13:54:47.403Z
- Data Size: 649952 bytes
- Links Found: 2105

## Retrieved
2025-04-29
