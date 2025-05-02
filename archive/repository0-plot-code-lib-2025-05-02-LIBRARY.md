LIBRARY_DOCUMENT.md/MATHJAX.md
# LIBRARY_DOCUMENT.md/MATHJAX.md
# MATHJAX

## Crawl Summary
MathJax version 3.x is a modular, ES6 and TypeScript-based JavaScript engine for rendering mathematical notation (LaTeX, MathML, AsciiMath) across all modern browsers and Node.js. Key technical details include support for dynamic typesetting via MathJax.typesetPromise, extensive configuration options (input, output, document, accessibility), and advanced APIs for custom extensions and interactive math processing. The documentation details methods, component APIs, and configuration patterns required for effective integration.

## Normalised Extract
Table of Contents:
1. The Basics: MathJax is an open-source engine for LaTeX, MathML, AsciiMath with web-based fonts for scalability.
2. Including MathJax: Import as a single script or custom bundle; supports browser integration without plugins.
3. Server Usage (NodeJS): Three integration methods; use of MathJax in pre-processing pages server-side using Node.js; configuration for component linking.
4. Input Options: Supports TeX/LaTeX, MathML, AsciiMath; use built-in processors with configurable options.
5. Output Options: Supports HTML-CSS, SVG, and native MathML; handles lazy typesetting, line breaking, and font management.
6. Configuration: Global configuration object; configurable sections include Input Processor Options, Output Processor Options, Document Options, Accessibility Extensions, Contextual Menu Options, and Loader/Startup Options; parameters include loader.load (array of component identifiers) and startup.ready callback.
7. Advanced Topics: Dynamic content rendering, custom extension integration, detailed processing model for synchronization.
8. MathJax API: Key methods include MathJax.typesetPromise(elements?: HTMLElement[]): Promise<void>; Component API for low-level interaction; Direct API for explicit control over processing.
9. Troubleshooting: Check script inclusion, configuration validity, console output for errors, and ensure required components are loaded.

## Supplementary Details
Version: 3.x rewritten in ES6 with TypeScript. Configuration example:
MathJax = {
  loader: { load: ['input/tex', 'output/svg'] },
  startup: {
    typeset: false,
    ready: function () {
      console.log('MathJax is ready');
      MathJax.startup.defaultReady();
    }
  }
};
Key API Method:
- MathJax.typesetPromise:
  Parameters: Optional array of HTMLElements (default: document.querySelectorAll('.math'))
  Returns: Promise<void>
  Usage: Call after dynamic content load to re-typeset formulas.
Implementation Steps:
1. Include MathJax in your page with the correct configuration.
2. For dynamic content, call MathJax.typesetPromise() with affected elements.
3. Monitor console for errors and ensure all required modules are loaded.
Best Practices:
- Pre-process math on the server if possible.
- Use asynchronous API for non-blocking typesetting.
- Validate configuration by logging loader and startup objects.
Troubleshooting Commands:
- Check network requests to verify the correct script is loaded.
- Use browser console to call MathJax.typesetPromise() manually and inspect errors.

## Reference Details
API Specifications:
Method: MathJax.typesetPromise
- Signature: MathJax.typesetPromise(elements?: HTMLElement[]): Promise<void>
- Parameters: elements (optional array of HTMLElements to be typeset; default is all elements with math content)
- Return: Promise<void>; resolves when typesetting completes
- Exceptions: May reject if configuration is incorrect or components are missing

SDK Method Signatures:
- MathJax.startup.ready(): void - Called when MathJax is fully loaded and ready.
- MathJax.config: Object containing loader, startup, input, and output processor configurations.

Example Configuration Code:
// Global configuration object for MathJax
MathJax = {
  loader: { load: ['input/tex', 'output/svg'] },
  startup: {
    typeset: false,
    ready: function () {
      console.log('MathJax is ready');
      MathJax.startup.defaultReady();
    }
  }
};

Implementation Pattern:
1. Include MathJax in your HTML or Node.js environment.
2. Set the configuration object before script inclusion.
3. After dynamic content update, call MathJax.typesetPromise(affectedElements) to update formulas.

Configuration Options:
- loader.load: Array of strings identifying which components to load (e.g., 'input/tex', 'output/svg').
- startup.typeset: Boolean to control whether MathJax automatically typesets on load (default true).
- startup.ready: Callback function executed when MathJax is initialized.

Troubleshooting Procedures:
- Command: Open browser console and execute MathJax.typesetPromise(); check for resolved Promise.
- If errors occur, verify that the configuration object is set and that network requests for component files succeed.
- Use console.log on MathJax.config to inspect current configuration state.

Best Practices:
- Use asynchronous initialization (typesetPromise) to prevent UI blocking.
- Preload only necessary components to reduce load time.
- For Node.js, use appropriate module bundling and verify compatibility with server-side rendering.

## Information Dense Extract
MathJax v3.x, ES6/TypeScript, modular design, supports LaTeX, MathML, AsciiMath. API: MathJax.typesetPromise(elements?:HTMLElement[]):Promise<void>; startup.ready callback; configuration object with loader.load (['input/tex','output/svg']), startup.typeset flag, input/output processor options, document options; supporting dynamic content, custom extensions; troubleshooting via browser console, network request inspection, configuration logging. Implementation pattern: include script, set global MathJax config, call typesetPromise() on dynamic updates; best practice: minimize loaded modules and pre-process server-side where possible.

## Sanitised Extract
Table of Contents:
1. The Basics: MathJax is an open-source engine for LaTeX, MathML, AsciiMath with web-based fonts for scalability.
2. Including MathJax: Import as a single script or custom bundle; supports browser integration without plugins.
3. Server Usage (NodeJS): Three integration methods; use of MathJax in pre-processing pages server-side using Node.js; configuration for component linking.
4. Input Options: Supports TeX/LaTeX, MathML, AsciiMath; use built-in processors with configurable options.
5. Output Options: Supports HTML-CSS, SVG, and native MathML; handles lazy typesetting, line breaking, and font management.
6. Configuration: Global configuration object; configurable sections include Input Processor Options, Output Processor Options, Document Options, Accessibility Extensions, Contextual Menu Options, and Loader/Startup Options; parameters include loader.load (array of component identifiers) and startup.ready callback.
7. Advanced Topics: Dynamic content rendering, custom extension integration, detailed processing model for synchronization.
8. MathJax API: Key methods include MathJax.typesetPromise(elements?: HTMLElement[]): Promise<void>; Component API for low-level interaction; Direct API for explicit control over processing.
9. Troubleshooting: Check script inclusion, configuration validity, console output for errors, and ensure required components are loaded.

## Original Source
MathJax Documentation
https://docs.mathjax.org/en/latest/

## Digest of MATHJAX

# MathJax Documentation

This document compiles the most critical technical details from the MathJax documentation (version 3.x) as crawled on Dec 07, 2024. The information includes versioning details, usage in browser and Node.js environments, detailed configuration options, and API methods which allow dynamic typesetting of mathematical content.

## Version and Architecture
- MathJax is a complete rewrite in ES6 with TypeScript support.
- Version 3.x introduces a modular architecture that enables loading only required components.
- Designed for both client-side (browser) and server-side (Node.js) usage.

## Table of Contents
1. The Basics
2. Including MathJax in a Web Page
3. MathJax on a Server Using NodeJS
4. MathJax Input Options
5. MathJax Output Options
6. Configuration Options
7. Advanced Topics
8. The MathJax API
9. Troubleshooting and Best Practices

## 1. The Basics
- MathJax is an open-source JavaScript display engine supporting LaTeX, MathML, and AsciiMath.
- It uses web-based fonts for scalable, high-quality typesetting.

## 2. Including MathJax in a Web Page
- Include MathJax via a single file or bundled assets.
- Custom builds are possible to host locally.

## 3. MathJax on a Server Using NodeJS
- Provides methods to pre-process mathematics server-side using Node.
- Offers three usage approaches including direct component linking.

## 4. MathJax Input Options
- Supports TeX/LaTeX, MathML, and AsciiMath notation.

## 5. MathJax Output Options
- Output formats include HTML-CSS, SVG, and native MathML.
- Provides features for lazy typesetting, line breaking, and font support.

## 6. Configuration Options
- Extensive configuration is available via:
  - Input Processor Options
  - Output Processor Options
  - Document Options
  - Accessibility, Contextual Menu, and Startup Loader Options
- Configuring MathJax involves defining a global configuration object with properties like loader.load and startup.ready.

## 7. Advanced Topics
- Dynamic content typesetting and custom extensions to suit specific site needs.
- Detailed processing model allowing synchronised updates and interactive exploration of mathematical expressions.

## 8. The MathJax API
- Provides methods for interactive and dynamic mathematics on web pages.
- Key API: MathJax.typesetPromise()
  - Signature: MathJax.typesetPromise(elements?: HTMLElement[]): Promise<void>
  - Used to re-typeset portions of a page when dynamic content changes.
- Other API components include a Component API and a Direct API for low-level control.

## 9. Troubleshooting and Best Practices
- Ensure proper script inclusion and configuration setup.
- Use console logs to catch errors during startup and typesetting.
- Verify that required components (input, output processors) are loaded.
- Best practices involve pre-compiling mathematics on the server where possible to reduce browser load.

Retrieved on: Dec 07, 2024
Attribution: MathJax is sponsored by NumFOCUS; Data size: 12401672 bytes.

## Attribution
- Source: MathJax Documentation
- URL: https://docs.mathjax.org/en/latest/
- License: License: Apache-2.0
- Crawl Date: 2025-05-02T20:24:03.917Z
- Data Size: 12401672 bytes
- Links Found: 5054

## Retrieved
2025-05-02
