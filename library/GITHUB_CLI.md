# GITHUB_CLI

## Crawl Summary
Authentication: gh auth login uses OAuth or token, flags: --hostname. Stores tokens in OS credential store. Configuration: gh config set <key> <value> writes to config file; keys include editor, git_protocol, pager; environment overrides with GH_HOST, GITHUB_TOKEN, GH_ENTERPRISE_TOKEN. Aliases: gh alias set defines shortcuts, flags --shell, --clobber; supports positional placeholders. API: gh api <endpoint> supports GET/POST, flags: --method, --header, --raw-field, --field, --input, --paginate, --slurp, --jq, --template, --cache; endpoint placeholder substitution for {owner}, {repo}, {branch}; JSON and GraphQL support.

## Normalised Extract
Table of Contents:
1. Authentication Setup
2. Configuration Management
3. Aliases Definition
4. API Requests

1. Authentication Setup
Command: gh auth login [--hostname <hostname>]
  - Default target: github.com
  - Flags:
      --hostname <hostname> : specify Enterprise server
  - Environment variables:
      GITHUB_TOKEN        : PAT fallback
      GH_ENTERPRISE_TOKEN : enterprise automation token
  - Behavior:
      Initiate OAuth flow; store token in OS credential store; non-interactive if GITHUB_TOKEN set.

2. Configuration Management
Command: gh config set <key> <value>
  - Storage: ~/.config/gh/config.yml or hosts.yml
  - Keys and value types:
      editor       : string, default from $EDITOR
      git_protocol : string, allowed [https, ssh], default https
      pager        : boolean, default true
  - Overrides:
      GH_HOST, GITHUB_TOKEN, GH_ENTERPRISE_TOKEN

3. Aliases Definition
Command: gh alias set <alias> <expansion> [--shell] [--clobber]
  - Define alias stored in ~/.config/gh/aliases.yml
  - Flags:
      --shell, -s   : evaluate via sh interpreter
      --clobber     : overwrite existing alias
  - Placeholders:
      $1, $2, …     : positional argument substitution

4. API Requests
Command: gh api <endpoint> [flags]
  - Endpoint: v3 path or 'graphql' for v4
  - Placeholder substitution: {owner}, {repo}, {branch}
  - Flags:
      --method <method>         : override HTTP method (default GET or POST when fields present)
      --header <key:value>      : add HTTP header
      --raw-field <k=v>         : add string parameter (switches to POST)
      --field <k=v>             : add typed parameter: true|false|null|number|@file|{owner}
      --input <file>            : request body from file or stdin
      --paginate                : fetch all pages
      --slurp                   : wrap pages in array
      --jq <expr>               : filter response with jq
      --template <tmpl>         : Go template formatting
      --cache <duration>        : cache duration
      --include                 : include HTTP response status and headers
      --silent                  : suppress body output
      --preview <names>         : API preview names
      --verbose                 : include request/response details


## Supplementary Details
Authentication Steps:
1. Run gh auth login
   - Prompts: Select GitHub.com or Enterprise
   - If Enterprise: specify --hostname <hostname>
   - Complete OAuth in browser or paste token
2. Non-interactive:
   export GITHUB_TOKEN=<token>
   gh auth status  # verify

Configuration Steps:
1. gh config set editor vim
2. gh config set git_protocol ssh
3. gh config set pager false
4. Verify: gh config list

Alias Examples:
1. gh alias set bugs 'issue list --label=bug'
2. gh alias set pv 'pr view'
3. gh alias set --shell igrep 'gh issue list --label="$1" | grep "$2"'
4. List: gh alias list

API Usage Patterns:
1. GET request with query: gh api -X GET search/issues -f q='repo:cli/cli is:open'
2. POST with body fields: gh api repos/{owner}/{repo}/issues -F title='My Issue' -F body='Details'
3. GraphQL query: gh api graphql -f query='query { viewer { login }}'
4. Pagination: gh api --paginate repos/{owner}/{repo}/issues --jq '.[].number'
5. Cache: gh api --cache 1h repos/{owner}/{repo}/releases


## Reference Details
1. gh auth login [--hostname <hostname>]
  Flags:
    --hostname <string>    Hostname for Enterprise
  Env:
    GITHUB_TOKEN (string)
    GH_ENTERPRISE_TOKEN (string)
  Exit codes:
    0 on success
    non-zero on error

2. gh config set <key> <value>
  key:string editor, git_protocol, pager
  value:string or boolean
  File: ~/.config/gh/config.yml

3. gh alias set <alias> <expansion> [--shell] [--clobber]
  alias:string
  expansion:string
  Flags:
    --shell, -s
    --clobber
  File: ~/.config/gh/aliases.yml

4. gh api <endpoint> [flags]
  endpoint:string     e.g. repos/{owner}/{repo}/issues or graphql
  Flags:
    -X, --method <string>           Default GET or POST
    -H, --header <key:value>
    -f, --raw-field <key=value>
    -F, --field <key=value>
    --input <file>
    --paginate
    --slurp
    -q, --jq <string>
    -t, --template <string>
    --cache <duration>
    -i, --include
    --silent
    -p, --preview <names>
    --verbose
  Returns: JSON to stdout; non-zero on HTTP error

Troubleshooting:
1. Authentication failure: gh auth status  # check token
2. Alias not found: gh alias list; verify aliases.yml permissions
3. API 404: verify endpoint path and {owner}/{repo} substitution
4. Pagination timeout: add --cache or --paginate to manage rate limits

Best Practices:
- Use gh api for custom scripting instead of curl
- Define reusable GraphQL queries via --input file
- Cache frequent reads with --cache


## Information Dense Extract
Commands: gh auth login [--hostname]; gh config set key value; gh alias set name expansion [--shell][--clobber]; gh api endpoint [--method][--header][--raw-field][--field][--input][--paginate][--slurp][--jq][--template][--cache][--include][--silent][--preview][--verbose]. Config keys: editor(string), git_protocol(https|ssh), pager(true|false). Auth env: GITHUB_TOKEN, GH_ENTERPRISE_TOKEN, GH_HOST. Aliases file: ~/.config/gh/aliases.yml. API placeholders: {owner},{repo},{branch}. Default HTTP method: GET, POST if fields. Field type coercion: true,false,null,number,@file. GraphQL exact usage: gh api graphql -f query='...'. Pagination: --paginate,+--slurp. Caching: --cache duration. Output filter: --jq expr, --template tmpl. Include headers: --include. Use --verbose for debugging.

## Sanitised Extract
Table of Contents:
1. Authentication Setup
2. Configuration Management
3. Aliases Definition
4. API Requests

1. Authentication Setup
Command: gh auth login [--hostname <hostname>]
  - Default target: github.com
  - Flags:
      --hostname <hostname> : specify Enterprise server
  - Environment variables:
      GITHUB_TOKEN        : PAT fallback
      GH_ENTERPRISE_TOKEN : enterprise automation token
  - Behavior:
      Initiate OAuth flow; store token in OS credential store; non-interactive if GITHUB_TOKEN set.

2. Configuration Management
Command: gh config set <key> <value>
  - Storage: ~/.config/gh/config.yml or hosts.yml
  - Keys and value types:
      editor       : string, default from $EDITOR
      git_protocol : string, allowed [https, ssh], default https
      pager        : boolean, default true
  - Overrides:
      GH_HOST, GITHUB_TOKEN, GH_ENTERPRISE_TOKEN

3. Aliases Definition
Command: gh alias set <alias> <expansion> [--shell] [--clobber]
  - Define alias stored in ~/.config/gh/aliases.yml
  - Flags:
      --shell, -s   : evaluate via sh interpreter
      --clobber     : overwrite existing alias
  - Placeholders:
      $1, $2,      : positional argument substitution

4. API Requests
Command: gh api <endpoint> [flags]
  - Endpoint: v3 path or 'graphql' for v4
  - Placeholder substitution: {owner}, {repo}, {branch}
  - Flags:
      --method <method>         : override HTTP method (default GET or POST when fields present)
      --header <key:value>      : add HTTP header
      --raw-field <k=v>         : add string parameter (switches to POST)
      --field <k=v>             : add typed parameter: true|false|null|number|@file|{owner}
      --input <file>            : request body from file or stdin
      --paginate                : fetch all pages
      --slurp                   : wrap pages in array
      --jq <expr>               : filter response with jq
      --template <tmpl>         : Go template formatting
      --cache <duration>        : cache duration
      --include                 : include HTTP response status and headers
      --silent                  : suppress body output
      --preview <names>         : API preview names
      --verbose                 : include request/response details

## Original Source
GitHub CLI Manual
https://cli.github.com/manual/

## Digest of GITHUB_CLI

# GitHub CLI Manual (Retrieved 2024-06-01)

Data Size: 1231234 bytes
Links Found: 45187
Error: None

## Authentication

### gh auth login [--hostname <hostname>]

Authenticate with GitHub.com or GitHub Enterprise Server.

Parameters:
  --hostname <hostname>    Hostname for GitHub Enterprise (Server ≥2.20)

Environment:
  GITHUB_TOKEN            Personal access token fallback
  GH_ENTERPRISE_TOKEN     Token for scripting/automation

Behavior:
  Prompts for OAuth flow or uses existing token.
  Persists credentials to keychain or OS credential store.


## Configuration

### gh config set <key> <value>

Set persistent configuration in ~/.config/gh/hosts.yml or ~/.config/gh/config.yml.

Configuration keys:
  editor: string           Preferred editor (default: system $EDITOR)
  git_protocol: string     git vs ssh (default: https)
  pager: true|false        Paging output (default: true)

Environment variables:
  GH_HOST                 Default hostname override
  GITHUB_TOKEN            Token-based auth
  GH_ENTERPRISE_TOKEN     Enterprise automation token


## Aliases

### gh alias set <alias> <expansion> [--shell] [--clobber]
Define custom shortcuts for commands.

Options:
  --shell, -s             Evaluate expansion in shell
  --clobber               Overwrite existing alias

Placeholders:
  $1, $2, …               Positional arguments insertion

Storage:
  ~/.config/gh/aliases.yml


## API Requests

### gh api <endpoint> [flags]

Make authenticated HTTP requests to GitHub APIs.

Endpoint:
  Path to v3 endpoint (e.g. repos/{owner}/{repo}/issues)
  graphql for v4

Flags:
  -X, --method <string>           HTTP method (default: GET or POST when fields used)
  -H, --header <key:value>        Add HTTP header
  -f, --raw-field <key=value>     Add string parameter
  -F, --field <key=value>         Typed parameter (true|false|null|number|@file)
  --input <file>                  Request body file (- for stdin)
  --paginate                      Fetch all pages sequentially
  --slurp                         Wrap paginated output in one array
  --jq <string>                   Filter output via jq
  --template <string>             Format JSON output via Go template
  --cache <duration>              Cache response (e.g. "60m")

JSON output:
  Prints response body by default; use --include to show headers/status.


## Attribution
- Source: GitHub CLI Manual
- URL: https://cli.github.com/manual/
- License: License: MIT
- Crawl Date: 2025-05-10T05:03:30.581Z
- Data Size: 1231234 bytes
- Links Found: 45187

## Retrieved
2025-05-10
