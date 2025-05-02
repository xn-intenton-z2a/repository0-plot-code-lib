# MATHJAX

## Crawl Summary
MathJax documentation (v3.2) details advanced configuration and integration for both web and Node.js environments. It specifies input (TeX, MathML, AsciiMath) and output (HTML, SVG, MathML) processors, detailed global configuration options (loader, startup, tex, svg) and exposes API methods like MathJax.typesetPromise() and MathJax.startup.promise. The documentation includes explicit configuration samples, method signatures, and troubleshooting instructions with error handling guidelines.

## Normalised Extract
Table of Contents: 1. Basics and Overview; 2. Web Integration and Node.js Usage; 3. Input Processors; 4. Output Processors; 5. Configuration Options; 6. API Methods; 7. Best Practices / Troubleshooting; 8. Data Metrics and Attribution. Basics: MathJax is an ES6/TypeScript engine for LaTeX, MathML, AsciiMath; supports accessibility. Web Integration: Include via script tag or custom build; for Node.js use asynchronous API via MathJax.startup.promise. Input Processors: Configure with keys tex, mathml, asciimath. Output Processors: Options include html, svg, and mathml with parameters like fontCache: 'global'. Configuration: Global MathJax object with loader, tex, svg, startup properties; custom ready function available. API Methods: MathJax.typesetPromise(): Promise<void>; MathJax.startup.promise: Promise<void>; MathJax.startup.reset(): void. Best Practices: Configure early, use typesetPromise for dynamic content; check MathJax.version for troubleshooting; log errors to console.

## Supplementary Details
Global configuration object sample: window.MathJax = { loader: { load: ['[tex]/autoload', '[tex]/require'] }, tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], packages: {'[+]': ['autoload', 'require']} }, svg: { fontCache: 'global' }, startup: { typeset: false, ready: function() { MathJax.startup.defaultReady(); } } }; API details: MathJax.typesetPromise() returns a Promise<void> used for processing math after DOM updates. In Node.js, await MathJax.startup.promise before calling typesetting methods. Configuration options include input processor options (e.g., tex.inlineMath, mathml.enable) and output processor options (e.g., svg.fontCache set to 'global', html.linebreaks enabled). Troubleshooting: Verify configuration via console.log(MathJax.version) and check error messages; if MathJax.startup is undefined, review global configuration structure.

## Reference Details
API Specifications:
1. MathJax.startup.promise : Promise<void>
   - Description: Resolves when MathJax is loaded.
2. MathJax.typesetPromise() : Promise<void>
   - Parameters: none
   - Returns: Promise that resolves when typesetting completes
   - Usage: MathJax.typesetPromise().then(() => { /* success */ }).catch((err) => { console.error(err); });
3. MathJax.startup.reset() : void
   - Resets MathJax startup state.

SDK Method Signature Example:
// Global configuration object
window.MathJax = {
  loader: { load: ['[tex]/autoload', '[tex]/require'] },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    packages: {'[+]': ['autoload', 'require']}
  },
  svg: { fontCache: 'global' },
  startup: {
    typeset: false,
    ready: function () {
      MathJax.startup.defaultReady();
      // Additional initialization code if required
    }
  }
};

Best Practices and Implementation Pattern:
- Configure MathJax before content loads to avoid flickering.
- In dynamic pages, call MathJax.typesetPromise() after DOM updates.
- For server-side rendering in Node.js, use async/await:
  async function renderMath() {
    await MathJax.startup.promise;
    await MathJax.typesetPromise();
  }

Detailed Troubleshooting Commands:
- Command: console.log(MathJax.version)
  Expected Output: String indicating the version (e.g., '3.2')
- If typesetting fails, review console for errors; revalidate the global configuration structure.
- Check network calls to ensure all components are loaded correctly.

Configuration Options and Effects:
- loader.load: Specifies which modules to load. Default: []
- tex.inlineMath: Array of delimiter pairs. Default: [['$', '$'], ['\\(', '\\)']]
- svg.fontCache: Option to enable global font caching. Default: 'global'
- startup.typeset: Boolean to control automatic typesetting; set false for manual control.


## Information Dense Extract
MathJax v3.2; Global config: { loader: { load: ['[tex]/autoload','[tex]/require'] }, tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], packages: {'[+]': ['autoload','require']} }, svg: { fontCache: 'global' }, startup: { typeset: false, ready: fn } }; API: MathJax.startup.promise: Promise<void>; MathJax.typesetPromise(): Promise<void>; MathJax.startup.reset(): void; Best practices: Pre-configure MathJax, use typesetPromise() post-DOM updates, verify with console.log(MathJax.version); Node.js async/await integration; Troubleshooting: check console errors, validate config structure, network component loading; Data: 18083051 bytes, 6005 links, retrieval date Dec 07, 2024.

## Sanitised Extract
Table of Contents: 1. Basics and Overview; 2. Web Integration and Node.js Usage; 3. Input Processors; 4. Output Processors; 5. Configuration Options; 6. API Methods; 7. Best Practices / Troubleshooting; 8. Data Metrics and Attribution. Basics: MathJax is an ES6/TypeScript engine for LaTeX, MathML, AsciiMath; supports accessibility. Web Integration: Include via script tag or custom build; for Node.js use asynchronous API via MathJax.startup.promise. Input Processors: Configure with keys tex, mathml, asciimath. Output Processors: Options include html, svg, and mathml with parameters like fontCache: 'global'. Configuration: Global MathJax object with loader, tex, svg, startup properties; custom ready function available. API Methods: MathJax.typesetPromise(): Promise<void>; MathJax.startup.promise: Promise<void>; MathJax.startup.reset(): void. Best Practices: Configure early, use typesetPromise for dynamic content; check MathJax.version for troubleshooting; log errors to console.

## Original Source
MathJax Documentation
https://docs.mathjax.org/en/latest/

## Digest of MATHJAX

# MathJax Documentation Digest

This document provides exact technical details extracted from the MathJax documentation (version 3.2, built Dec 07, 2024). It covers the core configuration options, API methods, integration techniques for both browser and Node.js environments, input and output processor specifications, and detailed best practices for implementation.

## Table of Contents
1. Basics and Overview
2. Web Integration and Node.js Usage
3. Input Processors
4. Output Processors
5. Configuration Options
6. API and Method Signatures
7. Best Practices and Troubleshooting
8. Attribution and Data Metrics

## 1. Basics and Overview
- MathJax is an open-source JavaScript display engine for LaTeX, MathML, and AsciiMath.
- It is built in ES6 using TypeScript and supports both browser and server (Node.js) usage.
- Provides accessibility features including speakable text and interactive expression explorers.

## 2. Web Integration and Node.js Usage
- To include MathJax in a webpage, load the MathJax single-file build or a custom bundle.
- For Node.js, three usage patterns exist: using MathJax via direct API calls, loading components manually, and linking to a hosted copy.

## 3. Input Processors
- Supports TeX/LaTeX, MathML, and AsciiMath as input formats.
- Exact configuration keys include:
  - tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
  - mathml: { enable: true }
  - asciimath: { delimiters: [['`', '`']] }

## 4. Output Processors
- Offers several output formats like HTML with CSS styling, SVG, and MathML.
- Configuration options include:
  - svg: { fontCache: "global", useFontCache: true }
  - html: { linebreaks: true, scale: 1.0 }
  - mathml: {}

## 5. Configuration Options
- Global configuration is set via a global MathJax object. Example configuration:

  window.MathJax = {
    loader: { load: ['[tex]/autoload', '[tex]/require'] },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      packages: {'[+]': ['autoload', 'require']}
    },
    svg: { fontCache: 'global' },
    startup: {
      typeset: false,
      ready: function () {
        MathJax.startup.defaultReady();
        // Additional startup code
      }
    }
  };

- Loader and startup options allow for selective component loading and custom build configuration.

## 6. API and Method Signatures
- MathJax API includes the following key method signatures:

  • MathJax.startup.promise : Promise<void>
    - Returns a promise that resolves when MathJax is fully loaded and configured.

  • MathJax.typesetPromise() : Promise<void>
    - Invokes the typesetting of mathematical expressions on the page.
    - Usage: MathJax.typesetPromise().then(callback).catch(errorCallback);

  • Direct API methods accessible via the Component API:
    - MathJax.startup.reset() : void
      Resets startup configuration and reprocesses the page.

- Errors are thrown as standard JavaScript Error objects with a descriptive message (e.g., configuration errors or missing components).

## 7. Best Practices and Troubleshooting
- Always configure MathJax before the page content loads to avoid reflow issues.
- Use MathJax.typesetPromise() in dynamic content to ensure math is processed after DOM updates.
- For Node.js operations, encapsulate MathJax usage in asynchronous functions and await MathJax.startup.promise.
- Troubleshooting:
    - Check browser console for detailed error messages.
    - Validate configuration object structure. Example validation:
      if (!window.MathJax || !MathJax.startup) { console.error('MathJax is not properly configured.'); }
    - Run a test command: console.log(MathJax.version) to verify loaded version.

## 8. Attribution and Data Metrics
- Data Size: 18083051 bytes
- Links Found: 6005
- Retrieval Date: Dec 07, 2024
- Source: https://docs.mathjax.org/en/latest/
- Built with Sphinx and Read the Docs theme.


## Attribution
- Source: MathJax Documentation
- URL: https://docs.mathjax.org/en/latest/
- License: License: Apache-2.0
- Crawl Date: 2025-05-02T11:47:06.637Z
- Data Size: 18083051 bytes
- Links Found: 6005

## Retrieved
2025-05-02
