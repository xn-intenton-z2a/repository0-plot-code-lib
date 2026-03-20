PUPPETEER

TABLE OF CONTENTS:
1. Quick usage and intent
2. Rendering SVG to PNG (step-by-step)
3. API reference (Browser, Page, launch, screenshot, setContent, goto)
4. Options and common parameters
5. Troubleshooting and CI notes
6. Supplementary details
7. Detailed digest and retrieval metadata

NORMALISED EXTRACT:
- Puppeteer exposes a programmatic API for controlling Chromium/Chrome: primary entry is the top-level puppeteer object that provides launch and connect helpers.
- Launch sequence: puppeteer.launch([options]) -> Promise<Browser>
  - Browser methods: browser.newPage() -> Promise<Page>, browser.close() -> Promise<void>
- Page lifecycle: page = await browser.newPage(); await page.setViewport({width, height}); await page.setContent(html, options?) -> Promise<void>; await page.goto(url, options?) -> Promise<Response | null>
- Rasterization: page.screenshot(options) -> Promise<Buffer | string> depending on encoding option. For PNG output, screenshot({type: 'png', path?: string, encoding?: 'binary' | 'base64', omitBackground?: boolean, fullPage?: boolean, clip?: {x,y,width,height}}) returns a raw PNG buffer when no encoding is specified.
- Common pattern to convert SVG string to PNG: set HTML content containing the raw SVG or set the page content directly to the SVG string, set the viewport to the intended raster size, then page.screenshot({type:'png',omitBackground:true}) to obtain PNG bytes.

DETAILED API SIGNATURES (reference details):
- puppeteer.launch(options?: LaunchOptions) -> Promise<Browser>
  - LaunchOptions (most relevant fields): headless?: boolean | 'new'; args?: string[]; executablePath?: string; defaultViewport?: {width: number; height: number}; timeout?: number; ignoreHTTPSErrors?: boolean
- browser.newPage() -> Promise<Page>
- page.setContent(html: string, options?: {waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2', timeout?: number}) -> Promise<void>
- page.goto(url: string, options?: {timeout?: number, waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2'}) -> Promise<Response | null>
- page.screenshot(options?: {path?: string, type?: 'png' | 'jpeg', quality?: number, fullPage?: boolean, clip?: {x: number, y: number, width: number, height: number}, omitBackground?: boolean, encoding?: 'base64' | 'binary'}) -> Promise<Buffer | string>
- browser.close() -> Promise<void>

RENDERING SVG TO PNG (step-by-step actionable pattern):
1. Build a standalone SVG string that includes width/height and a viewBox attribute. Ensure the SVG is valid SVG 1.1 and contains the coordinate system expected by the renderer.
2. Launch Chromium in headless mode suitable for CI: puppeteer.launch({headless: true, args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage']}).
3. Create a page: const page = await browser.newPage(); await page.setViewport({width: W, height: H});
4. Set content: await page.setContent(svgString, {waitUntil: 'networkidle0'});
5. Screenshot: const pngBuffer = await page.screenshot({type: 'png', omitBackground: true});
6. Persist: await fs.promises.writeFile('output.png', pngBuffer);
7. Close: await browser.close();

OPTIONS AND COMMON PARAMETERS:
- headless: when true Puppeteer runs without a UI; in CI use headless:true and pass the recommended args to avoid sandboxing issues.
- args: pass Chromium flags required by the environment (common: --no-sandbox, --disable-setuid-sandbox, --disable-dev-shm-usage).
- viewport vs SVG viewBox: set page viewport to the desired pixel dimensions; having a viewBox inside the SVG ensures scalable vector content maps correctly to the viewport.
- screenshot.omitBackground: when true, background is transparent (useful for exporting plots as PNG with transparent background).

TROUBLESHOOTING & CI NOTES:
- On GitHub Actions and other CI runners, Chromium dependencies are usually present on the ubuntu-latest images, but launching Chromium may require the flags above.
- If puppeteer fails to install or launch due to missing system libraries, consider using the 'puppeteer-core' package and a separate Chromium binary, or use sharp/canvg as alternative rasterizers in CI.
- When screenshots are blank, ensure page.setContent completed and the SVG includes explicit width/height or viewBox and the page viewport matches expected size.

SUPPLEMENTARY DETAILS:
- Puppeteer returns raw buffers for page.screenshot by default; pass encoding: 'base64' to get base64 strings when needed for embedding.
- The API is Promise-based and intended for async/await usage; handle timeouts and navigation waits explicitly using waitUntil options.

DETAILED DIGEST (source extraction):
- Source pages used: https://pptr.dev/ and https://github.com/puppeteer/puppeteer — retrieved 2026-03-20. Data size fetched during crawl: ~111700 bytes (pptr.dev) and page metadata for GitHub repo: ~264700 bytes.

ATTRIBUTION:
Primary source: Puppeteer official docs (https://pptr.dev/) and project repository (https://github.com/puppeteer/puppeteer). Retrieved 2026-03-20.
