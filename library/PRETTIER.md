# PRETTIER

## Crawl Summary
Prettier formats code by parsing it to an AST and printing it based on configured options such as printWidth, tabWidth, trailingComma, etc. It supports multiple languages (JavaScript, TypeScript, CSS, HTML, JSON, GraphQL, Markdown, YAML) and integrates with various editors. It offers both CLI and API usage with options like objectWrap, experimentalOperatorPosition, and experimentalTernaries. Prettier enforces a consistent style by reprinting code and can be configured through .prettierrc files and command-line flags.

## Normalised Extract
Table of Contents:
1. Overview
2. Formatting Engine
3. Supported Options
4. API Method Signature
5. CLI and Configuration
6. Editor Integrations
7. Best Practices
8. Troubleshooting

Overview:
Prettier is an opinionated formatter that ignores original styling and formats code based on the AST and defined options.

Formatting Engine:
Reprints code by parsing to an AST and formatting it with specific rules including line length and wrapping.

Supported Options:
printWidth (default 80), tabWidth (default 2), useTabs (default false), semi (default true), singleQuote (default false), trailingComma (options: "none", "es5", "all"; default "es5"), bracketSpacing (default true), arrowParens (default "always"), parser (string identifier), experimental options: objectWrap (boolean), experimentalOperatorPosition (boolean), tsconfig (string), experimentalTernaries (boolean).

API Method Signature:
format(source: string, options?: Options): string

CLI and Configuration:
Command: npx prettier --write "src/**/*.js"
Configuration File: .prettierrc with JSON/YAML format containing option keys with their default values and effects.

Editor Integrations:
Support for VS Code, Sublime Text, Vim, Emacs with on-save formatting.

Best Practices:
Integrate Prettier as a pre-commit hook, use in conjunction with linters for code quality, and run in batch mode for existing codebases.

Troubleshooting:
Use --debug-check and --check flags to verify configuration and identify non-conforming files.

## Supplementary Details
Technical Specifications:
- Options with defaults: printWidth: 80, tabWidth: 2, useTabs: false, semi: true, singleQuote: false, trailingComma: "es5", bracketSpacing: true, arrowParens: "always".
- Experimental Options: objectWrap, experimentalOperatorPosition, experimentalTernaries, and support for TS config files.
- API: format(source: string, options?: Options): string returns formatted string.
- Configuration File (.prettierrc): JSON formatted file with keys matching options.
- CLI: npx prettier --write <glob pattern>
- Implementation Steps: Parse code to AST, remove original styling, re-print code with configured options, wrap lines based on printWidth.
- Example Code: require('prettier').format(source, options) and using CLI commands.
- Configuration Effects: Changing trailingComma from "es5" to "all" inserts commas in all possible locations; modifying printWidth adjusts line wrapping.
- Best practices include integrating with pre-commit hooks and editor on-save triggers.

## Reference Details
API Specifications:
Method: format(source: string, options?: Options): string
Options Interface:
{
  printWidth?: number;    // Default: 80
  tabWidth?: number;      // Default: 2
  useTabs?: boolean;      // Default: false
  semi?: boolean;         // Default: true
  singleQuote?: boolean;  // Default: false
  trailingComma?: 'none' | 'es5' | 'all'; // Default: 'es5'
  bracketSpacing?: boolean; // Default: true
  arrowParens?: 'avoid' | 'always'; // Default: 'always'
  parser: string;         // Required, e.g., 'babel', 'typescript', etc.
  objectWrap?: boolean;        // Optional, new in 3.5
  experimentalOperatorPosition?: boolean; // Optional experimental flag
  tsconfig?: string;           // Optional, path to TS config file
  experimentalTernaries?: boolean; // Optional experimental ternary formatting flag
}

Example Code Usage:
// Import Prettier module
const prettier = require('prettier');

// Define source code to format
const sourceCode = "foo(arg1, arg2, arg3, arg4);";

// Define formatting options
const options = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  parser: 'babel',
  objectWrap: false,
  experimentalOperatorPosition: false
};

// Format the code
const formattedCode = prettier.format(sourceCode, options);
console.log(formattedCode);

CLI Command:
Run: npx prettier --write "src/**/*.js"

Configuration File Example (.prettierrc):
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always"
}

Troubleshooting Commands:
- To check formatting without writing changes: npx prettier --check "src/**/*.js"
- To run in debug mode: npx prettier --debug-check "src/file.js"

Best Practices:
- Integrate Prettier with pre-commit hooks using husky.
- Combine with ESLint: configure ESLint to ignore formatting issues.
- Regularly update Prettier configuration to include experimental options when needed for new language features.


## Information Dense Extract
Prettier formats code by parsing into AST and reprinting. Options: printWidth=80, tabWidth=2, useTabs=false, semi=true, singleQuote=false, trailingComma='es5', bracketSpacing=true, arrowParens='always', parser required. API: format(source: string, options?: Options): string. CLI: npx prettier --write "src/**/*.js". Config file: .prettierrc JSON with option keys. Experimental options: objectWrap, experimentalOperatorPosition, experimentalTernaries, tsconfig for TypeScript. Integration with editors available. Troubleshooting: use --check and --debug-check. Example code provided with require('prettier') and formatting invocation.

## Sanitised Extract
Table of Contents:
1. Overview
2. Formatting Engine
3. Supported Options
4. API Method Signature
5. CLI and Configuration
6. Editor Integrations
7. Best Practices
8. Troubleshooting

Overview:
Prettier is an opinionated formatter that ignores original styling and formats code based on the AST and defined options.

Formatting Engine:
Reprints code by parsing to an AST and formatting it with specific rules including line length and wrapping.

Supported Options:
printWidth (default 80), tabWidth (default 2), useTabs (default false), semi (default true), singleQuote (default false), trailingComma (options: 'none', 'es5', 'all'; default 'es5'), bracketSpacing (default true), arrowParens (default 'always'), parser (string identifier), experimental options: objectWrap (boolean), experimentalOperatorPosition (boolean), tsconfig (string), experimentalTernaries (boolean).

API Method Signature:
format(source: string, options?: Options): string

CLI and Configuration:
Command: npx prettier --write 'src/**/*.js'
Configuration File: .prettierrc with JSON/YAML format containing option keys with their default values and effects.

Editor Integrations:
Support for VS Code, Sublime Text, Vim, Emacs with on-save formatting.

Best Practices:
Integrate Prettier as a pre-commit hook, use in conjunction with linters for code quality, and run in batch mode for existing codebases.

Troubleshooting:
Use --debug-check and --check flags to verify configuration and identify non-conforming files.

## Original Source
Prettier Documentation
https://prettier.io/docs/en/index.html

## Digest of PRETTIER

# Prettier API and Configuration

Date Retrieved: 2023-10-04

## Overview
Prettier is an opinionated code formatter that formats code by parsing it into an AST and printing it according to its own set of rules. It supports multiple languages including JavaScript (and JSX), Angular, Vue, Flow, TypeScript, CSS, Less, SCSS, HTML, Ember/Handlebars, JSON, GraphQL, Markdown (including GFM and MDX v1), and YAML.

## Formatting Engine
- Reprints code from scratch by ignoring original styling and formatting according to configured parameters.
- Uses maximum line length and other options to determine line breaks and wrapping.

## Supported Options and Defaults
- printWidth: number (default: 80) - Maximum line length before wrapping
- tabWidth: number (default: 2) - Number of spaces per indentation level
- useTabs: boolean (default: false) - Indent lines with tabs instead of spaces
- semi: boolean (default: true) - Print semicolons at ends of statements
- singleQuote: boolean (default: false) - Use single instead of double quotes
- trailingComma: string (default: "es5") - Print trailing commas where valid ("none", "es5", "all")
- bracketSpacing: boolean (default: true) - Print spaces between brackets in object literals
- arrowParens: string (default: "always") - Include parentheses around a sole arrow function parameter ("avoid" for omission)
- parser: string - Specifies which parser to use (e.g., "babel", "flow", "typescript", "css", "html", "json", "graphql", etc.)

## API Method Signatures
- format(source: string, options?: Options): string
  - Options interface includes all the supported options as listed above.

Example Options Interface:

  interface Options {
    printWidth?: number;
    tabWidth?: number;
    useTabs?: boolean;
    semi?: boolean;
    singleQuote?: boolean;
    trailingComma?: "none" | "es5" | "all";
    bracketSpacing?: boolean;
    arrowParens?: "avoid" | "always";
    parser: string;
    // Additional experimental options:
    objectWrap?: boolean; // New in version 3.5
    experimentalOperatorPosition?: boolean; // New experimental option
    tsconfig?: string; // Path to TypeScript config file
    experimentalTernaries?: boolean; // New flag for nested ternary formatting
  }

Example SDK Usage:

  const prettier = require("prettier");
  const sourceCode = "foo(arg1, arg2, arg3, arg4);";
  const formatted = prettier.format(sourceCode, {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    bracketSpacing: true,
    arrowParens: "always",
    parser: "babel"
  });
  console.log(formatted);

## CLI Commands and Configuration Files
- Run Prettier via CLI: npx prettier --write "src/**/*.js"
- Use .prettierrc file for configuration with JSON or YAML format listing the above options.

Example .prettierrc Content:

  {
    "printWidth": 80,
    "tabWidth": 2,
    "useTabs": false,
    "semi": true,
    "singleQuote": false,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "arrowParens": "always"
  }

## Editor Integrations
- Plugins available for VS Code, Sublime Text, Vim, Emacs, and others. On save formatting is supported for seamless integration.

## Best Practices
- Use Prettier in pre-commit hooks to enforce code style consistency.
- Combine Prettier with linters (e.g., ESLint) where Prettier handles formatting and linters handle code quality.
- For large codebases run Prettier in batch mode (e.g., through CLI) to format the entire project at once.

## Troubleshooting Procedures
- Use the flag --debug-check to verify configuration settings.
- If formatting issues occur, run: npx prettier --check "src/**/*.js" to identify files that do not conform.
- For detailed performance issues, refer to the CLI: A Performance Deep Dive guide and run performance benchmarking commands as documented.

## Attribution and Data Size
- Data size obtained during crawling: 1033383 bytes
- Source URL: https://prettier.io/docs/en/index.html


## Attribution
- Source: Prettier Documentation
- URL: https://prettier.io/docs/en/index.html
- License: MIT License
- Crawl Date: 2025-04-28T01:08:49.804Z
- Data Size: 1033383 bytes
- Links Found: 2569

## Retrieved
2025-04-28
