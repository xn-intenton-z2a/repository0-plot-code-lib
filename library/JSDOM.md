JSDOM

Table of contents
- Normalised extract: core capabilities
- Creating and using a JSDOM instance
- Options that affect script execution and resource loading
- DOM access and common globals
- Integrating node-canvas and other DOM shims
- Reference details: constructors and static helpers
- Memory management and teardown
- Troubleshooting and best practices
- Digest and retrieval details
- Attribution

Normalised extract: core capabilities
jsdom is a widely used JavaScript implementation of web standards for Node, providing a DOM, window, and document objects suitable for unit tests and server-side parsing of HTML. The primary entry point is the JSDOM class which can create a virtual DOM from an HTML string, a file, or a URL. JSDOM exposes a window object with document, console, location, and common DOM APIs compatible with browser semantics. It supports controlled script execution via the runScripts option and delayed resource loading via the resources option.

Creating and using a JSDOM instance
- Constructor: new JSDOM(htmlString, options) returns a JSDOM instance with dom.window and dom.window.document.
- Static helpers: JSDOM.fragment(html) creates a DocumentFragment; JSDOM.fromFile(path, options) and JSDOM.fromURL(url, options) provide convenient async constructors returning a JSDOM instance.
- Typical test pattern: create dom = new JSDOM(minimalHtml); assign global.window = dom.window; global.document = dom.window.document; run test assertions; call dom.window.close() to free resources.

Options that affect script execution and resource loading
- runScripts: 'outside-only' | 'dangerously' | undefined. 'dangerously' executes inline and external scripts (unsafe for untrusted HTML). 'outside-only' executes only scripts run from the outside vm context.
- resources: 'usable' allows external resources to be fetched and executed as they become available; default behavior is to not load external resources.
- url, referrer, contentType: set base URL and MIME type for the parsed document.
- Virtual console: pass a VirtualConsole instance to route console output from the virtual window back to Node.

DOM access and common globals
- dom.window.document is a full Document instance with createElement, querySelector, getElementById, etc.
- dom.serialize() returns the HTML serialization of the current DOM state.
- Event constructors and dispatching are available on dom.window.

Integrating node-canvas and other DOM shims
- For tests involving Canvas, integrate the node-canvas library and assign a Canvas implementation into the virtual window, e.g., set global.HTMLCanvasElement.prototype.getContext to a function returning a node-canvas context; specific integration patterns are required because jsdom does not ship a native Canvas implementation.
- For other browser APIs (WebGL, WebRTC), provide shims or mock implementations via setupFiles in test frameworks.

Reference details: constructors and static helpers
- new JSDOM(html?: string, options?: { url?: string, referrer?: string, contentType?: string, runScripts?: 'dangerously'|'outside-only', resources?: 'usable'|'skip', virtualConsole?: VirtualConsole }) -> JSDOM
- JSDOM.fragment(html: string) -> DocumentFragment
- JSDOM.fromFile(path: string, options?) -> Promise<JSDOM>
- JSDOM.fromURL(url: string, options?) -> Promise<JSDOM>
- JSDOM.prototype.serialize() -> string
- dom.window.close() -> void  // release resources

Memory management and teardown
- Always call dom.window.close() when a JSDOM instance is no longer needed to prevent memory leaks and lingering timers.
- Avoid storing references to dom.window or DOM nodes beyond test scope; prefer re-creating new JSDOM instances per test or using beforeEach/afterEach to manage lifecycle.

Troubleshooting and best practices
- If scripts or resources are not executed, verify runScripts and resources options and prefer explicit inline scripts for deterministic tests.
- For network-dependent resources, use fromFile/fromURL or mock fetch to control external dependencies in tests.
- For Canvas-based rendering tests, test logic that depends on Canvas results using node-canvas headless rendering and compare pixel buffers or serialized data.

Digest and retrieval details
- Source URL: https://github.com/jsdom/jsdom
- Retrieval date: 2026-03-20
- Crawled HTML size (approx): 584.9 KB
- Digest: repository README and API reference confirm constructor signatures (new JSDOM, fromFile, fromURL), useful options (runScripts, resources), and recommended integration patterns for Node-based testing and DOM emulation. The README also documents security considerations for running scripts and memory management guidance.

Attribution
- Source: jsdom GitHub repository — https://github.com/jsdom/jsdom
- Data retrieved: 2026-03-20, approx 584.9 KB HTML
