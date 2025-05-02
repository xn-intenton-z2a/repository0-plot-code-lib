# MATHJAX

## Crawl Summary
MathJax v3 is an ES6/TypeScript based JavaScript engine for rendering mathematics in web pages. It supports TeX, MathML, and AsciiMath through a modular architecture that allows on-demand loading of components. Core API includes methods like MathJax.typesetPromise(elements?) for asynchronous typesetting. Key configuration objects include loader, tex, and startup with precise options to control inline and display math processing, output format (HTML, SVG, MathML), and extension loading.

## Normalised Extract
Table of Contents:
1. Inclusion and Configuration
   - Insert MathJax via script tag or Node.js require; configure via window.MathJax object.
   - Example configuration with loader, tex settings (inlineMath, displayMath) and startup callback.
2. API Methods and Component Usage
   - MathJax.typesetPromise(optionalElements: HTMLElement[]): Promise<any>
   - MathJax.startup object with properties typeset (boolean) and ready (function).
3. Expression Processing and Output Options
   - Input processors (TeX, MathML, AsciiMath) transform expressions to output using HTML/CSS or SVG.
   - Configuration options include selection of output processor and document options.
4. Advanced Customizations and Dynamic Content
   - Implement custom extensions using MathJax processing model.
   - Synchronize re-typesetting with dynamic content using API hooks.

Inclusion Example:
window.MathJax = {
  loader: { load: ['[tex]/autoload', '[tex]/require'] },
  tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], displayMath: [['$$', '$$']] },
  startup: { typeset: true, ready: function() { /* Custom init code */ } }
};

API Usage:
Use MathJax.typesetPromise([element1, element2]) to typeset specified elements and chain .then() and .catch() for handling outputs.

Configuration details include setting loader options, choosing input and output processors, and specifying package and accessibility options.

## Supplementary Details
Exact Parameter Values and Configuration Options:
- Loader: { load: ['[tex]/autoload', '[tex]/require'] } loads additional TeX packages.
- Tex Configuration:
  inlineMath: [['$', '$'], ['\\(', '\\)']]
  displayMath: [['$$', '$$']]
  packages: Use package configuration to add or override default settings.
- Startup:
  typeset (default: true) determines whether an initial typesetting occurs.
  ready: Custom callback function executed after initialization.

Implementation Steps:
1. Insert MathJax script in HTML header or load via Node.js require.
2. Create a window.MathJax configuration object with desired options.
3. Invoke MathJax.typesetPromise() post configuration to render mathematics.
4. Handle dynamic content re-typesetting by calling MathJax.typesetPromise() with updated elements.

Best Practices:
- Defer typesetting until content is fully loaded.
- Use custom startup.ready functions to initialize additional modules or logging.
- Validate configuration options against MathJax documentation for version compatibility.

Troubleshooting:
- If typesetting fails, check the console for precise error messages from rejected promises in MathJax.typesetPromise().
- Verify that the correct packages are loaded in the loader configuration.
- Use network tools to confirm that MathJax components are being fetched successfully.

## Reference Details
API Specifications and Code Examples:

1. MathJax Configuration Object (Global Setup):
Property: window.MathJax, Type: Object
Example:
  window.MathJax = {
    loader: {
      load: ['[tex]/autoload', '[tex]/require']
    },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$']],
      packages: { '[+]': ['autoload'] }
    },
    startup: {
      typeset: true,
      ready: function() {
        console.log('MathJax is ready');
        MathJax.startup.defaultReady();
      }
    }
  };

2. API Method: MathJax.typesetPromise(optionalElements: HTMLElement[]): Promise<any>
Signature:
  MathJax.typesetPromise(optionalElements?: HTMLElement[]): Promise<void>
Parameters:
  optionalElements - an array of DOM elements to process; if omitted, processes the entire document.
Return:
  Promise that resolves when typesetting is complete, rejects on error.

Usage Example:
  MathJax.typesetPromise([document.getElementById('math-content')])
    .then(function() {
      console.log('Typesetting completed successfully');
    })
    .catch(function(err) {
      console.error('Typesetting error:', err.message);
    });

3. Direct API Usage - Accessing Extensions:
Method: MathJax.startup.defaultReady(), used as a default initialization call after custom ready.

4. SDK Method Signatures:
- MathJax.startup configuration object:
   typeset: boolean (default true)
   ready: () => void (callback function invoked when startup is complete)

5. Configuration Options Summary:
- loader.load: Array<string> specifying components to load.
- tex.inlineMath and tex.displayMath: Arrays defining symbols for inline and display modes.
- startup.typeset: Boolean enabling/disabling automatic typesetting.

Best Practices:
- Always wrap MathJax.typesetPromise() calls in error handling (.catch) to detect misconfigurations.
- Customize the ready callback in startup to perform additional initializations.

Troubleshooting Procedures:
- Command to force retypesetting:
  MathJax.typesetPromise([updatedElement]).then(() => { console.log('Retypeset complete'); }).catch(err => { console.error('Retypeset failed:', err); });
- Expected Output: Console log of successful typesetting; errors display detailed message if configuration or network issues exist.

Complete API Reference: Refer to method signatures as listed above with parameter types and default values for precise integration.

## Information Dense Extract
MathJax v3; Global window.MathJax config; loader.load: ['[tex]/autoload','[tex]/require']; tex.inlineMath: [['$','$'],['\\(', '\\)']]; tex.displayMath: [['$$','$$']]; startup.typeset: true; startup.ready: custom function; API: MathJax.typesetPromise(optionalElements?: HTMLElement[]) -> Promise<void>; usage: MathJax.typesetPromise([element]).then(...).catch(...); best practice: defer typesetting until after DOM load; troubleshooting: check rejected promise error messages; retypeset command: MathJax.typesetPromise([element]); detailed signature for MathJax.startup with defaultReady method; complete configuration includes loader, tex, startup objects; customization via packages; dynamic content handled via explicit retyping call.

## Sanitised Extract
Table of Contents:
1. Inclusion and Configuration
   - Insert MathJax via script tag or Node.js require; configure via window.MathJax object.
   - Example configuration with loader, tex settings (inlineMath, displayMath) and startup callback.
2. API Methods and Component Usage
   - MathJax.typesetPromise(optionalElements: HTMLElement[]): Promise<any>
   - MathJax.startup object with properties typeset (boolean) and ready (function).
3. Expression Processing and Output Options
   - Input processors (TeX, MathML, AsciiMath) transform expressions to output using HTML/CSS or SVG.
   - Configuration options include selection of output processor and document options.
4. Advanced Customizations and Dynamic Content
   - Implement custom extensions using MathJax processing model.
   - Synchronize re-typesetting with dynamic content using API hooks.

Inclusion Example:
window.MathJax = {
  loader: { load: ['[tex]/autoload', '[tex]/require'] },
  tex: { inlineMath: [['$', '$'], ['''(', ''')']], displayMath: [['$$', '$$']] },
  startup: { typeset: true, ready: function() { /* Custom init code */ } }
};

API Usage:
Use MathJax.typesetPromise([element1, element2]) to typeset specified elements and chain .then() and .catch() for handling outputs.

Configuration details include setting loader options, choosing input and output processors, and specifying package and accessibility options.

## Original Source
MathJax Documentation
https://docs.mathjax.org/en/latest/

## Digest of MATHJAX

# MathJAX Documentation Digest

Retrieved Date: 2024-12-07

# Overview
MathJax is an open-source JavaScript engine designed for displaying mathematical notation including LaTeX, MathML, and AsciiMath. Version 3 is a rewrite in ES6/TypeScript offering modularity, high configurability, and improved support both for browser and server (Node.js) environments.

# Inclusion and Configuration
- How to include MathJax: Insert a script tag in the webpage or require it in Node.js applications.
- Example configuration object:
  window.MathJax = {
    loader: { load: ['[tex]/autoload', '[tex]/require'] },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$']]
    },
    startup: {
      typeset: true,
      ready: function () {
        // Custom initialization code
      }
    }
  };

# Components and API Usage
- MathJax is modular; components are loaded on-demand.
- API methods include MathJax.typesetPromise(elements?) which returns a Promise after processing designated elements.
- Direct API usage to interact with typesetting engine and dynamic expressions.

# Expression Processing
- MathJax processes mathematics from raw TeX, MathML and AsciiMath into HTML/CSS or SVG output.
- Configuration options include input processor, output processor, document options, and accessibility settings.

# Advanced Topics
- Dynamic content handling by re-typesetting on content change.
- Custom extensions: Developers may create custom modules with complete integration into MathJax's processing model.
- Synchronizing code with MathJax processing through provided API hooks.

# API Method Details
- MathJax.typesetPromise(optionalElements: HTMLElement[]): Promise<any>
   Parameters:
     - optionalElements: Array of DOM elements to be typeset (if omitted, whole document is processed).
   Return: Promise that resolves when typesetting is complete or rejects with an error.

- MathJax.startup configuration object
   Properties:
     - typeset (boolean): If true, auto-typesets after configuration; default is true.
     - ready (function): Callback to run once the startup process is complete.

- MathJax configuration options:
   - loader: Defines components to load with syntax: { load: [ 'component1', 'component2', ... ] }.
   - tex: Configuration for TeX input processor including inlineMath, displayMath, and package options.
   - output: Options for output format including HTML-CSS, SVG, or MathML with associated configuration parameters.

# Attribution
Data Size: 16452337 bytes; Source: https://docs.mathjax.org/en/latest/ compiled on 2024-12-07


## Attribution
- Source: MathJax Documentation
- URL: https://docs.mathjax.org/en/latest/
- License: License: Apache-2.0
- Crawl Date: 2025-05-02T08:49:49.851Z
- Data Size: 16452337 bytes
- Links Found: 5453

## Retrieved
2025-05-02
