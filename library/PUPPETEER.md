PUPPETEER

Table of contents

- Quick summary
- Core API and usage patterns
- Rendering SVG to PNG via headless browser
- Key options and installation notes
- Reference details (signatures for main methods)
- Troubleshooting and implementation examples
- Detailed digest (source excerpt + retrieval date)
- Attribution and crawl data

Quick summary

Puppeteer is a high-level JavaScript library to control Chrome or Firefox using DevTools Protocol or WebDriver BiDi. It is commonly used to render HTML/SVG in a headless browser and capture screenshots as PNGs, enabling faithful rasterization of complex SVGs using the browser's rendering engine.

Core API and usage patterns

- Install: npm i puppeteer (downloads a compatible Chromium binary). For library-only usage without downloading Chromium use puppeteer-core.
- Launching: const browser = await puppeteer.launch(options)
- Pages: const page = await browser.newPage(); pages act like browser tabs and expose navigation, DOM, and screenshot APIs.
- Rendering flow for SVG to PNG:
  - Create or load an HTML document containing the SVG (page.setContent(htmlString)).
  - Optionally set viewport size with page.setViewport({width, height}).
  - Use page.screenshot({path: 'out.png', omitBackground: true}) or capture a Buffer by omitting path.
  - Close browser when finished: await browser.close().

Rendering SVG to PNG via headless browser (practical pattern)

- For single-file conversion:
  - Launch a browser with minimal options: const browser = await puppeteer.launch({args: ['--no-sandbox']})
  - const page = await browser.newPage();
  - await page.setContent('<svg ...>...</svg>');
  - await page.setViewport({width: desiredWidth, height: desiredHeight});
  - const buffer = await page.screenshot({type: 'png', omitBackground: true});
  - fs.writeFileSync('output.png', buffer);
- For batch conversions, reuse a single browser instance and create multiple pages or reuse a page by updating its content.

Key options and installation notes

- Installing puppeteer downloads a Chromium binary by default; this increases install size. Use puppeteer-core if you will provide your own browser binary.
- Launch options: see official docs for options such as executablePath, headless, args, defaultViewport.
- Security: running headless browsers in containerized environments typically requires --no-sandbox or additional kernel capabilities; prefer secure runtime policies and limit privileges.

Reference details (API signatures and parameter lists)

- puppeteer.launch(options?: LaunchOptions) -> Promise<Browser>
  - options: object with keys like headless?: boolean, executablePath?: string, args?: string[], defaultViewport?: {width:number,height:number}
  - Returns: Promise resolving to a Browser instance

- Browser.newPage() -> Promise<Page>
  - Creates a new Page (tab) in the browser

- Page.setContent(html: string, options?: {waitUntil?: string|string[], timeout?: number}) -> Promise<void>
  - Sets the HTML content for the page and waits until the specified lifecycle state

- Page.setViewport(viewport: {width:number,height:number,deviceScaleFactor?:number,isMobile?:boolean}) -> Promise<void>

- Page.screenshot(options?: {path?:string,type?:'png'|'jpeg',quality?:number,clip?:{x:number,y:number,width:number,height:number},omitBackground?:boolean,fullPage?:boolean}) -> Promise<Buffer>
  - Returns a Buffer containing the image bytes if no path is specified; writes file to path when path is provided.

Troubleshooting and implementation examples

- Blank screenshots: ensure the page content has fully loaded or wait for a selector; use page.waitForSelector or the waitUntil option in setContent/goto.
- Large installs: to avoid Chromium download, use puppeteer-core and supply an installed Chrome/Chromium via executablePath.
- In containers, Chromium may require additional libraries; consult the Puppeteer troubleshooting guide for required system dependencies.
- For precise SVG rendering matching browsers, Puppeteer is preferred because it uses real browser rendering rather than JS-based SVG rasterizers.

Detailed digest (source excerpt and retrieval date)

- Excerpt (selected lines from README):
  - "Puppeteer is a JavaScript library which provides a high-level API to control Chrome or Firefox over the DevTools Protocol or WebDriver BiDi. Puppeteer runs in the headless (no visible UI) by default"
  - Installation example: npm i puppeteer # Downloads compatible Chrome during installation.
  - Example flow in README: const browser = await puppeteer.launch(); const page = await browser.newPage(); await page.goto('https://developer.chrome.com/'); await page.setViewport({width:1080,height:1024}); await page.screenshot({path:'screenshot.png'}); await browser.close();
- Retrieval date: 2026-03-20
- Crawl size: 2302 bytes (raw README fetched)

Attribution and crawl data

- Source: https://raw.githubusercontent.com/puppeteer/puppeteer/main/README.md and https://pptr.dev/
- Retrieved: 2026-03-20
- Raw bytes fetched: 2302 bytes
