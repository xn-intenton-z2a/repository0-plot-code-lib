# GITHUB_API

## Crawl Summary
Authentication via gh auth login, token usage with GH_TOKEN, GitHub CLI commands for API calls (gh api /octocat --method GET), Octokit.js usage with exact instance creation and request method, curl commands with proper headers, API versioning using X-GitHub-Api-Version header, handling of breaking changes and OpenAPI full specification.

## Normalised Extract
Table of Contents:
1. Authentication
   - Use 'gh auth login' to authenticate via CLI.
   - For token based auth, set GH_TOKEN environment variable. Use GITHUB_TOKEN in actions.
2. GitHub CLI Usage
   - To execute API requests: gh api <path> --method <METHOD>.
   - Example: gh api /octocat --method GET.
   - In GitHub Actions, set up 'gh api' with environment variable GH_TOKEN.
3. Using GitHub App Authentication
   - Configuration: Set APP_ID and store private key (APP_PEM) as secret.
   - Generate token using actions/create-github-app-token@v1; token expires after 60 minutes.
4. Using Octokit.js
   - Install package: npm install octokit.
   - Import: import { Octokit } from "octokit";
   - Instantiate: const octokit = new Octokit({ auth: 'YOUR-TOKEN' });
   - API call: await octokit.request("GET /repos/{owner}/{repo}/issues", { owner: "octocat", repo: "Spoon-Knife" });
5. Using curl
   - Command example: curl --request GET --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" --header "Accept: application/vnd.github+json" --header "Authorization: Bearer YOUR-TOKEN"
6. API Versioning and Breaking Changes
   - Use header X-GitHub-Api-Version:2022-11-28 to specify API version.
   - Breaking changes include parameter or field modifications; refer to changelog when upgrading.
7. OpenAPI Description
   - Complete API documented in an OpenAPI spec covering all endpoints and definitions.

## Supplementary Details
Authentication: Use command 'gh auth login' to initiate, store tokens via GH_TOKEN. GitHub CLI automatically sets Git credentials for HTTPS operations. For GitHub Apps, use configuration variables (APP_ID) and secret (APP_PEM) with actions/create-github-app-token@v1.

Octokit.js Setup: npm install octokit; import { Octokit } from "octokit"; instance creation requires: const octokit = new Octokit({ auth: 'YOUR-TOKEN' }); then use method octokit.request with syntax: (method: string, params: object) with required parameters (owner, repo, etc.).

Curl Usage: Ensure curl is installed; use command syntax with --header for Accept and Authorization. Replace YOUR-TOKEN with the actual access token or secret.

API Versioning: Required header 'X-GitHub-Api-Version' with value '2022-11-28'. Specify header in curl and other HTTP clients.

Configuration Options:
- GH_TOKEN or GITHUB_TOKEN for authentication in scripts and Actions.
- ACTION variables and secrets must be set to avoid exposure.

Implementation Steps:
1. Choose authentication method (CLI, token, or GitHub App).
2. For CLI, install and run 'gh auth login'.
3. For Octokit, install via npm and import module.
4. Call endpoints with correct HTTP method and path.
5. For GitHub Actions, setup environment variables and use actions/create-github-app-token when necessary.
6. Validate responses and check for status codes for troubleshooting.

Troubleshooting:
- On 400 error, verify X-GitHub-Api-Version header and token validity.
- In Octokit, catch errors with try-catch to log error.status and error.response data.
- For curl, check token placement in Authorization header and response codes.

## Reference Details
API Specifications:
- Endpoint: GET /repos/{owner}/{repo}/issues
  Method: GET
  Parameters: owner (string), repo (string)
  Returns: JSON array of issues with fields such as title, user { id }.

GitHub CLI Command:
  Command: gh api /octocat --method GET
  Description: Executes a GET request against the /octocat endpoint.

Octokit.js Method Signature:
  async function request(methodPath: string, params: { [key: string]: any }): Promise<{ data: any }>;
  Example Usage:
    const octokit = new Octokit({ auth: 'YOUR-TOKEN' });
    const result = await octokit.request("GET /repos/{owner}/{repo}/issues", { owner: "octocat", repo: "Spoon-Knife" });

Curl Command Example:
  curl --request GET \
    --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
    --header "Accept: application/vnd.github+json" \
    --header "Authorization: Bearer YOUR-TOKEN"

Configuration Options:
- Header: X-GitHub-Api-Version; Value: 2022-11-28
- Environment Variable: GH_TOKEN or GITHUB_TOKEN

Best Practices:
- Use gh auth login to simplify authentication.
- Store tokens securely in environment variables or secrets.
- Use try-catch blocks in Octokit.js to capture error.status and error.response.data.message.

Troubleshooting Procedures:
1. If response returns 400, check X-GitHub-Api-Version header.
2. If authentication fails, verify token and scope.
3. Use command 'curl --version' to check curl installation.
4. For GitHub Actions, confirm that secrets are correctly set and referenced in workflow.

SDK Method Signatures:
- Octokit.request: (method: string, params: object) => Promise<{ data: any }>
- CLI: gh api <endpoint> --method <HTTP_METHOD>

Detailed Code Example in GitHub Actions:
---
name: Use API
on: [workflow_dispatch]
jobs:
  use_api:
    runs-on: ubuntu-latest
    permissions:
      issues: read
    steps:
      - name: Check out repo content
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '16.17.0'
          cache: npm
      - name: Install dependencies
        run: npm install octokit
      - name: Generate token
        id: generate-token
        uses: actions/create-github-app-token@v1
        with:
          app-id: ${{ vars.APP_ID }}
          private-key: ${{ secrets.APP_PEM }}
      - name: Run script
        run: node .github/actions-scripts/use-the-api.mjs
        env:
          TOKEN: ${{ steps.generate-token.outputs.token }}
---
This complete specification is intended for developer use without external references.

## Information Dense Extract
gh auth login; GH_TOKEN env; gh api /octocat --method GET; Octokit: import { Octokit } from 'octokit'; const octokit = new Octokit({ auth: 'YOUR-TOKEN' }); await octokit.request('GET /repos/{owner}/{repo}/issues', { owner: 'octocat', repo: 'Spoon-Knife' }); curl --request GET --url 'https://api.github.com/repos/octocat/Spoon-Knife/issues' --header 'Accept: application/vnd.github+json' --header 'Authorization: Bearer YOUR-TOKEN'; Header X-GitHub-Api-Version:2022-11-28; GitHub App: APP_ID, APP_PEM, actions/create-github-app-token@v1; API: full OpenAPI spec; Troubleshooting: check error.status, verify token, header errors; Configuration: GITHUB_TOKEN, secrets, node version '16.17.0';

## Sanitised Extract
Table of Contents:
1. Authentication
   - Use 'gh auth login' to authenticate via CLI.
   - For token based auth, set GH_TOKEN environment variable. Use GITHUB_TOKEN in actions.
2. GitHub CLI Usage
   - To execute API requests: gh api <path> --method <METHOD>.
   - Example: gh api /octocat --method GET.
   - In GitHub Actions, set up 'gh api' with environment variable GH_TOKEN.
3. Using GitHub App Authentication
   - Configuration: Set APP_ID and store private key (APP_PEM) as secret.
   - Generate token using actions/create-github-app-token@v1; token expires after 60 minutes.
4. Using Octokit.js
   - Install package: npm install octokit.
   - Import: import { Octokit } from 'octokit';
   - Instantiate: const octokit = new Octokit({ auth: 'YOUR-TOKEN' });
   - API call: await octokit.request('GET /repos/{owner}/{repo}/issues', { owner: 'octocat', repo: 'Spoon-Knife' });
5. Using curl
   - Command example: curl --request GET --url 'https://api.github.com/repos/octocat/Spoon-Knife/issues' --header 'Accept: application/vnd.github+json' --header 'Authorization: Bearer YOUR-TOKEN'
6. API Versioning and Breaking Changes
   - Use header X-GitHub-Api-Version:2022-11-28 to specify API version.
   - Breaking changes include parameter or field modifications; refer to changelog when upgrading.
7. OpenAPI Description
   - Complete API documented in an OpenAPI spec covering all endpoints and definitions.

## Original Source
GitHub REST API Documentation
https://docs.github.com/en/rest

## Digest of GITHUB_API

# GitHub REST API Documentation

Retrieved on: 2023-10-XX

# Authentication
- Use GitHub CLI command: gh auth login
  - Prompts: GitHub.com or Other (enter hostname)
  - Stores credentials for HTTPS operations
- Token based authentication:
  - Environment variable: GH_TOKEN
  - Use built-in GITHUB_TOKEN for actions or create a personal access token

# GitHub CLI Usage

## Making Requests
- Command syntax: gh api <path> --method <METHOD>
- Example: gh api /octocat --method GET

## In GitHub Actions
- Set environment variable: GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
- Example workflow step:
  - Run: gh api https://api.github.com/repos/octocat/Spoon-Knife/issues

# Using GitHub App Authentication

- Store App ID in configuration variable (e.g. APP_ID)
- Generate a private key stored as a secret (APP_PEM)
- Use action: actions/create-github-app-token@v1 to generate temporary token (expires after 60 minutes)

# Using Octokit.js (JavaScript)

## Setup and Import
- Installation: npm install octokit
- Import: import { Octokit } from "octokit";
- Create instance: const octokit = new Octokit({ auth: 'YOUR-TOKEN' });

## Making a Request
- Example:
  await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: "octocat",
    repo: "Spoon-Knife"
  });

## Usage in GitHub Actions
- Setup Node.js, checkout repository, install dependencies
- Use environment variable TOKEN for authentication

# Using curl

## Command Line Usage
- Syntax:
  curl --request GET \
    --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
    --header "Accept: application/vnd.github+json" \
    --header "Authorization: Bearer YOUR-TOKEN"

## In GitHub Actions
- Use secrets.GITHUB_TOKEN to set GH_TOKEN in environment
- Command example within workflow step

# API Versioning

- Use header: X-GitHub-Api-Version:2022-11-28
- Default version if header not provided is 2022-11-28
- If unsupported version specified, returns 400 error

# Breaking Changes

- Breaking changes include removal or renaming of parameters, response fields, or operations
- New API version introduced to handle breaking changes
- Changes include:
  - Removing an entire operation
  - Changing parameter types
  - Adding new required parameters

# OpenAPI Specification

- Full API is described in an OpenAPI-compliant document
- Covers all endpoints and details required for integration


## Attribution
- Source: GitHub REST API Documentation
- URL: https://docs.github.com/en/rest
- License: GitHub Documentation License
- Crawl Date: 2025-04-28T20:48:14.309Z
- Data Size: 1103797 bytes
- Links Found: 12216

## Retrieved
2025-04-28
