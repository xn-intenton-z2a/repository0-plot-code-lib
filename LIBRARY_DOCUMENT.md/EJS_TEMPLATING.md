# EJS_TEMPLATING

## Crawl Summary
EJS templating uses plain JavaScript embedded in scriptlet tags with syntax such as <% code %> for processing and <%= variable %> for output. It caches intermediate functions for high performance and provides error feedback with template line numbers for effective debugging. Configuration options include cache, delimiter customization, and filename for error tracing.

## Normalised Extract
Table of Contents:
1. USING_PLAIN_JS
   - Use plain JavaScript within scriptlet tags <% %> to embed code directly into HTML templates.
2. TEMPLATE_SYNTAX
   - Standard tags: <% code %>, <%= output %> for HTML escaping, and <%- output %> for raw HTML.
3. PERFORMANCE_OPTIMIZATION
   - Caches intermediate JS functions when cache option is enabled for faster rendering.
4. DEBUGGING
   - EJS throws JavaScript exceptions with specific template line numbers; use the filename option for error tracking.
5. CONFIGURATION_OPTIONS
   - cache (boolean): enables caching when set to true.
   - delimiter (string): changes default template delimiters.
   - filename (string): used for error tracing and caching improvements.

Detailed Information:
USING_PLAIN_JS: Write standard JavaScript inside EJS templates without additional preprocessing or new syntax.
TEMPLATE_SYNTAX: Use <% %> to execute code; <%= %> to output HTML escaped strings; <%- %> to render unescaped content.
PERFORMANCE_OPTIMIZATION: Enable caching to store compiled templates and decrease processing time in production environments.
DEBUGGING: Standard JavaScript errors include line numbers; configuration of the filename parameter can aid in pinpointing errors.
CONFIGURATION_OPTIONS: Options such as cache, delimiter, and filename allow customization according to environment and project needs.

## Supplementary Details
Technical Specifications:
- ejs.render API: Accepts a template string, an optional data object, and an options object. Options include:
  * cache: Boolean flag to enable caching (default false).
  * delimiter: Custom delimiter character to override the default <% and %> (default undefined).
  * filename: String used for caching and improved error messages (default undefined).
- ejs.compile API: Outputs a compiled function that, when called with a data object, returns a rendered string.
Implementation Steps:
1. Create an EJS template file with scriptlet tags.
2. Call ejs.render with the template string, data, and options.
3. Enable caching in production by setting cache: true.
4. For debugging, use the filename parameter to receive errors with specific template line numbers.

Configuration Examples:
Options = { cache: true, delimiter: '%', filename: 'template.ejs' } effectively enable caching, change the delimiter to use % instead of <%, and set the template name for error tracking.

## Reference Details
Complete API Specifications:
Method: ejs.render
Signature: ejs.render(template: string, data?: object, options?: { cache?: boolean, filename?: string, delimiter?: string, openDelimiter?: string, closeDelimiter?: string }): string
Return: Rendered string containing HTML content

Method: ejs.compile
Signature: ejs.compile(template: string, options?: { cache?: boolean, filename?: string, delimiter?: string, openDelimiter?: string, closeDelimiter?: string }): (data?: object) => string
Return: A function which when executed with a data object returns a rendered HTML string

Complete Code Example:
// Import the ejs module
const ejs = require('ejs');

// Sample template string
const templateString = '<h1><%= title %></h1>';

// Render using ejs.render
const renderedOutput = ejs.render(templateString, { title: 'Hello World' }, { cache: true, filename: 'template.ejs' });
console.log(renderedOutput);

// Compile the template for repeated use
const compiledTemplate = ejs.compile(templateString, { cache: true, filename: 'template.ejs' });
const output = compiledTemplate({ title: 'Hello World' });
console.log(output);

Troubleshooting Procedures:
1. If an error occurs, check that all scriptlet tags are correctly closed.
2. Verify that the data object properly passes all required keys.
3. Use the filename option to obtain precise error line numbers.
4. For caching issues, ensure that the cache flag is set appropriately and that stale templates are not being served.

Best Practices:
- Keep business logic out of templates; use templates solely for presentation.
- Always sanitize user input when injecting into HTML to avoid XSS vulnerabilities.
- Test templates with unit tests to ensure rendering consistency.

## Information Dense Extract
EJS.TEMPLATING: Uses plain JavaScript within <% %> tags; API ejs.render(template:string, data?:object, options?:{cache?:boolean, filename?:string, delimiter?:string}) returns string; ejs.compile returns (data?:object)=>string; Options: cache (boolean), delimiter (string), filename (string); Features include inline JavaScript execution, caching for performance, error messages with line numbers; Best practices include minimal logic in templates, using filename for debugging, proper cache management; Troubleshoot by verifying tag closures, data object content, and cache configuration.

## Sanitised Extract
Table of Contents:
1. USING_PLAIN_JS
   - Use plain JavaScript within scriptlet tags <% %> to embed code directly into HTML templates.
2. TEMPLATE_SYNTAX
   - Standard tags: <% code %>, <%= output %> for HTML escaping, and <%- output %> for raw HTML.
3. PERFORMANCE_OPTIMIZATION
   - Caches intermediate JS functions when cache option is enabled for faster rendering.
4. DEBUGGING
   - EJS throws JavaScript exceptions with specific template line numbers; use the filename option for error tracking.
5. CONFIGURATION_OPTIONS
   - cache (boolean): enables caching when set to true.
   - delimiter (string): changes default template delimiters.
   - filename (string): used for error tracing and caching improvements.

Detailed Information:
USING_PLAIN_JS: Write standard JavaScript inside EJS templates without additional preprocessing or new syntax.
TEMPLATE_SYNTAX: Use <% %> to execute code; <%= %> to output HTML escaped strings; <%- %> to render unescaped content.
PERFORMANCE_OPTIMIZATION: Enable caching to store compiled templates and decrease processing time in production environments.
DEBUGGING: Standard JavaScript errors include line numbers; configuration of the filename parameter can aid in pinpointing errors.
CONFIGURATION_OPTIONS: Options such as cache, delimiter, and filename allow customization according to environment and project needs.

## Original Source
EJS Templating Documentation
https://ejs.co/

## Digest of EJS_TEMPLATING

# EJS TEMPLATING

Date Retrieved: 2023-10-04

## Overview
EJS (Embedded JavaScript) is a templating language designed to integrate plain JavaScript directly into HTML. It leverages JavaScript in scriptlet tags for dynamic content generation and enables fast rendering via function caching.

## API Methods
- ejs.render(template: string, data?: object, options?: { cache?: boolean, filename?: string, delimiter?: string, openDelimiter?: string, closeDelimiter?: string }): string
- ejs.compile(template: string, options?: { cache?: boolean, filename?: string, delimiter?: string, openDelimiter?: string, closeDelimiter?: string }): (data?: object) => string

## Configuration Options
- cache: Default is false; when true, caches the compiled functions for subsequent calls.
- delimiter: Default delimiters are <% and %> but can be overridden using the 'delimiter', 'openDelimiter', and 'closeDelimiter' options.
- filename: Optional parameter for better error tracing and caching.

## Core Usage
1. Embed plain JavaScript inside <% %> for processing.
2. Output HTML using <%= %> to escape or <%- %> to render raw HTML.
3. Leverage caching to boost performance in production environments.

## Debugging
- Errors raise standard JavaScript exceptions with template line numbers included.
- Common practice is to log actual errors and use the filename option to pinpoint template issues.

## Best Practices
- Use meaningful filenames for templates to aid in debugging.
- Enable caching (cache: true) in production for sped-up rendering.
- Keep JavaScript within the template minimal for maintainability.

## Attribution
Data Size: 9176 bytes; Source URL: https://ejs.co/; Retrieved on: 2023-10-04

## Attribution
- Source: EJS Templating Documentation
- URL: https://ejs.co/
- License: License: MIT
- Crawl Date: 2025-05-02T18:31:34.951Z
- Data Size: 9176 bytes
- Links Found: 33

## Retrieved
2025-05-02
