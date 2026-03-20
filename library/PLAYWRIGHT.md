PLAYWRIGHT

Extracted technical reference for Playwright Test assertions and Locator API (focused on testing SVG content and element attributes).

Table of contents
1. Overview
2. Locator creation and selection
3. Locator methods useful for DOM attribute inspection
4. Assertion API (expect) relevant methods
5. Pattern: verifying SVG polyline points and point count
6. Supplementary details (timeouts, auto-wait, soft asserts)
7. Reference API signatures (precise)
8. Detailed digest (source snippets)
9. Attribution and data sizes

1. Overview
Playwright Test provides two complementary primitives used in tests: Locators and Assertions.
- Locators are composable, auto-waiting handles to DOM elements that resolve at action time.
- Assertions (expect) are augmented matchers that automatically retry until success or timeout.

2. Locator creation and selection
- page.locator(selector, options?) -> Locator: general selector (CSS, XPath, strict selectors supported).
- page.getByRole(role, options?) -> Locator: ARIA-based selection helpers.
- page.getByTestId(id) -> Locator: test-id helper (if used in markup).
Notes: Prefer page.getByRole or page.locator over ElementHandle to avoid racy operations; locators are resilient to dynamic changes and will retry actions.

3. Locator methods useful for DOM attribute inspection
- Locator.getAttribute(name[, options]) -> Promise<string | null>
  Returns the attribute value (string) or null if attribute missing.
- Locator.count() -> Promise<number>
  Returns number of elements currently matched by the locator.
- Locator.nth(index) -> Locator
  Returns a Locator for the n-th matched element (zero-based).
- Locator.first() / Locator.last() -> Locator
  Convenience to target the first/last match.
- Locator.inputValue() -> Promise<string>
  Reads input value for inputs.
- Locator.isVisible() -> Promise<boolean>
  Boolean visibility check.
- Locator.boundingBox() -> Promise<{ x:number, y:number, width:number, height:number } | null>
  Returns layout box or null for invisible elements.

4. Assertion API (expect) relevant methods
- await expect(locator).toHaveCount(count[, { timeout }])
  Asserts locator matches exact number of elements; auto-retries until timeout.
- await expect(locator).toHaveAttribute(name, expected[, { timeout }])
  Asserts attribute equals string or matches RegExp; supports null expectation to assert missing attribute.
- await expect(locator).toHaveText(expected[, { timeout }])
  Text content matching; can be string, RegExp, or array form.
- await expect(locator).toContainText(expected[, { timeout }])
  Substring/partial match convenience.
- await expect(locator).toHaveValue(expected[, { timeout }])
- expect.configure({ timeout, soft })
  Configure default timeout and soft assertion behaviour; expect.soft(...) can be used for non-fatal checks.

5. Pattern: verifying SVG polyline points and point count (implementation-ready)
Goal: verify that a rendered <polyline> element contains the expected number of data points.
Steps (robust, avoid brittle parsing):
1. Select the polyline element: use page.locator('svg polyline') or a more specific selector.
2. Obtain the points attribute: pointsAttr = await locator.first().getAttribute('points')
   - If pointsAttr is null, fail the test (element present but attribute missing).
3. Parsing approaches (choose one based on expected formatting):
   A. Whitespace-separated coordinate pairs (standard):
      - Split by whitespace to produce coordinate pairs: pairs = pointsAttr.trim().split(/\s+/)
      - Each pair is typically "x,y". The point count is pairs.length.
   B. Fallback: numeric token matching (handles comma/space variations):
      - Extract all numeric tokens with a floating-point number matcher; tokenCount = matches.length
      - PointCount = Math.floor(tokenCount / 2)
4. Assertion: expect(pointCount).toBe(EXPECTED_NUMBER)
Notes:
- Use locator.first() when a single polyline is expected; when multiple polylines exist, use locator.nth(index) or iterate with locator.count().
- Avoid relying on SVG element ordering; prefer accessible selectors or test-ids where possible.

6. Supplementary details (timeouts, auto-wait, soft asserts)
- Locators and expect both auto-retry: actions and assertions will keep retrying until the configured timeout.
- Global timeout may be configured in Playwright config; per-call override is available via options (e.g., { timeout: 10000 }).
- Soft assertions: expect.soft allows tests to continue after a failing check; collect failures and assert at the end if needed.

7. Reference API signatures (precise)
- page.locator(selector: string, options?: LocatorOptions): Locator
- page.getByRole(role: string, options?: RoleOptions): Locator
- Locator.getAttribute(name: string, options?: { timeout?: number }): Promise<string | null>
- Locator.count(options?: { timeout?: number }): Promise<number>
- Locator.nth(index: number): Locator
- Locator.first(): Locator
- Locator.last(): Locator
- Locator.inputValue(options?: { timeout?: number }): Promise<string>
- Locator.isVisible(options?: { timeout?: number }): Promise<boolean>
- Locator.boundingBox(options?: { timeout?: number }): Promise<{ x:number, y:number, width:number, height:number } | null>
- expect(locatorOrValue).toHaveCount(count: number, options?: { timeout?: number }): Promise<void>
- expect(locatorOrValue).toHaveAttribute(name: string, expected: string | RegExp | null, options?: { timeout?: number }): Promise<void>
- expect(locatorOrValue).toHaveText(expected: string | RegExp | Array<string> | null, options?: { timeout?: number }): Promise<void>
- expect.configure(options: { timeout?: number, soft?: boolean }): ExpectConfigured

8. Detailed digest (selected lines extracted from sources; retrieval 2026-03-20)
- From Playwright test-assertions (snippet):
  "await expect(locator).toHaveCount() List has exact number of children"
  "await expect(locator).toHaveAttribute() Element has a DOM attribute"
  "expect(value).not.toEqual(0); await expect(locator).not.toContainText('some text');"
  "const slowExpect = expect.configure({ timeout: 10000 }); await slowExpect(locator).toHaveText('Submit');"
- From Playwright Locator API (snippet):
  "Locator is the central piece of Playwright's auto-waiting and retry-ability."
  "await locator.getAttribute(name); await locator.getAttribute(name, options);"
  "const count = await page.getByRole('listitem').count();"
  "Returns locator to the n-th matching element. It's zero based, nth(0) selects the first element."
  "locator.getAttribute"

9. Attribution and data sizes (retrieved 2026-03-20)
- https://playwright.dev/docs/test-assertions — 150697 bytes
- https://playwright.dev/docs/api/class-locator — 449510 bytes

Source retrieval note: selected API lines were extracted from the pages above on 2026-03-20 for inclusion in this project library. Use the original pages for full context and latest updates.

End of PLAYWRIGHT reference.
