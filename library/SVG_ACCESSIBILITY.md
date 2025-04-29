# SVG_ACCESSIBILITY

## Crawl Summary
Data extracted from the crawl indicates emphasis on using native SVG markup for accessibility. Key specifications include mandatory use of <title> for a concise description, optional <desc> for in-depth description, and configuration of aria-labelledby to reference these elements. Role is set to "img", ensuring assistive tools correctly interpret the content.

## Normalised Extract
Table of Contents:
1. Accessibility Markup
   - Include a role attribute on the <svg> element set to 'img'.
2. Title and Description Elements
   - Use a <title> element with a unique id positioned as the first child of <svg>.
   - Optionally include a <desc> element with a unique id for extended descriptions.
3. ARIA Configuration
   - Set the aria-labelledby attribute on <svg> to reference the <title> and <desc> element ids (e.g., 'svgTitle svgDesc').
4. Implementation Pattern
   - Pattern for accessible SVG: create <svg> with role, include <title>, optionally add <desc>, and set aria-labelledby.

Detailed Technical Information:
- Element: svg
  Attributes: role="img", aria-labelledby="{titleID} {descID}"
- Element: title
  Requirement: Must be the first child; id must be referenced in aria-labelledby.
- Element: desc
  Optional: Provides additional information; id must be unique and referenced in aria-labelledby if used.

## Supplementary Details
Configuration Options:
- Role: 'img' (default for accessible SVG elements)
- <title> element: Must have a unique id; placed as the first child inside <svg>.
- <desc> element: Optional but recommended for extended descriptions; must have a unique id if included.
- aria-labelledby: Should include IDs of both <title> and <desc> (if present), e.g., aria-labelledby='svgTitle svgDesc'.

Implementation Steps:
1. Create an <svg> element with role 'img'.
2. Add a <title> element as the first child with a unique id.
3. Optionally add a <desc> element with a unique id.
4. Set the aria-labelledby attribute on <svg> to point to the <title> (and <desc> if available).

Best Practices:
- Always check id uniqueness when multiple SVGs are rendered on the same page.
- Validate with accessibility tools to ensure proper narration by screen readers.

## Reference Details
API Specification for Accessible SVG Helper Library:

Function: makeAccessibleSVG
Signature: function makeAccessibleSVG(svgElement: Element, title: string, description?: string): Element
Parameters:
- svgElement: The target SVG DOM element to be enhanced.
- title: A string representing the concise title to be set inside a <title> element.
- description (optional): A string for the optional description in a <desc> element.
Return Type: Element – the modified SVG element with accessibility attributes.
Exceptions: Throws Error if svgElement is null or not an SVG element.

Implementation Pattern:
1. Validate svgElement is an instance of SVGElement.
2. Create and insert a <title> element with a unique id; assign the text from 'title'.
3. If 'description' is provided, create and insert a <desc> element with a unique id.
4. Set svgElement's attribute role='img'.
5. Set aria-labelledby attribute on svgElement to reference the ids from <title> and <desc>.

Code Example:
// Example usage in JavaScript:

function makeAccessibleSVG(svgElement, title, description) {
  if (!(svgElement instanceof SVGElement)) {
    throw new Error('Provided element is not an SVGElement');
  }
  var titleId = 'svgTitle_' + Date.now();
  var titleElem = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  titleElem.setAttribute('id', titleId);
  titleElem.textContent = title;
  svgElement.insertBefore(titleElem, svgElement.firstChild);

  var labelledby = titleId;
  if (description) {
    var descId = 'svgDesc_' + Date.now();
    var descElem = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
    descElem.setAttribute('id', descId);
    descElem.textContent = description;
    svgElement.insertBefore(descElem, svgElement.childNodes[1]);
    labelledby += ' ' + descId;
  }
  svgElement.setAttribute('role', 'img');
  svgElement.setAttribute('aria-labelledby', labelledby);
  return svgElement;
}

Troubleshooting Procedures:
- If the SVG is not announced by screen readers, verify that the <title> element is the first child and that the aria-labelledby attribute correctly references the ids.
- Use browser developer tools to inspect the DOM and check for id conflicts.
- Run accessibility audit tools (e.g., Axe) to identify any missing attributes.

Configuration Options and Their Effects:
- role: Setting to 'img' ensures the SVG is interpreted as an image.
- aria-labelledby: Proper configuration links accessible text to the SVG.

Best Practice: Always generate unique ids for each SVG instance to avoid conflicts in aria-labelledby references.

## Information Dense Extract
SVG element with role='img'; include <title> (unique id, first child) and optional <desc> (unique id). Set aria-labelledby='titleID [descID]'. API: makeAccessibleSVG(svgElement: Element, title: string, description?: string): Element. Validate SVGElement, throw Error if invalid. Ensure unique id generation (e.g., using Date.now()). Check DOM for id collisions; use Axe for auditing.

## Sanitised Extract
Table of Contents:
1. Accessibility Markup
   - Include a role attribute on the <svg> element set to 'img'.
2. Title and Description Elements
   - Use a <title> element with a unique id positioned as the first child of <svg>.
   - Optionally include a <desc> element with a unique id for extended descriptions.
3. ARIA Configuration
   - Set the aria-labelledby attribute on <svg> to reference the <title> and <desc> element ids (e.g., 'svgTitle svgDesc').
4. Implementation Pattern
   - Pattern for accessible SVG: create <svg> with role, include <title>, optionally add <desc>, and set aria-labelledby.

Detailed Technical Information:
- Element: svg
  Attributes: role='img', aria-labelledby='{titleID} {descID}'
- Element: title
  Requirement: Must be the first child; id must be referenced in aria-labelledby.
- Element: desc
  Optional: Provides additional information; id must be unique and referenced in aria-labelledby if used.

## Original Source
MDN SVG Accessibility
https://developer.mozilla.org/en-US/docs/Web/SVG/Accessibility

## Digest of SVG_ACCESSIBILITY

# SVG Accessibility Technical Details

Retrieved on: 2023-10-07

## Overview
This document provides in-depth technical details on implementing accessibility in SVG images. It details the use of native SVG elements and ARIA attributes including <title>, <desc>, role, and aria-labelledby for ensuring SVG content is accessible to assistive technologies.

## Key Specifications
- SVG must include a <title> element as the first child if it is used for accessibility purposes. The <desc> element is optional but recommended to provide extended description.
- The <svg> element should have a role attribute set appropriately (often role="img") to inform assistive technology about its purpose.
- Use the aria-labelledby attribute on the <svg> element to reference the IDs of the <title> and <desc> elements. For example, aria-labelledby="svgTitle svgDesc".
- Ensure unique IDs for <title> and <desc> elements in a page to prevent conflicts.

## Configuration Details
- Default role: "img"
- Mandatory elements: <title> must always be present and comprise a concise title; <desc> may be added for extended descriptions.
- ARIA Configuration: Set aria-labelledby attribute on the <svg> element to include the ids from <title> and <desc>.

## Code and Implementation Patterns
Developers should follow this pattern for accessible SVG:
1. Create an <svg> element with role="img".
2. Insert a <title> element with a unique id (e.g. "svgTitle").
3. Optionally, insert a <desc> element with a matching unique id (e.g. "svgDesc").
4. Add the attribute aria-labelledby="svgTitle svgDesc" to the <svg>.

Example structure:

<svg role="img" aria-labelledby="svgTitle svgDesc" ...>
  <title id="svgTitle">Descriptive Title</title>
  <desc id="svgDesc">Extended description of SVG content for screen readers.</desc>
  ...
</svg>

## Attribution and Data Size
- Data Size: 0 bytes as per crawl result
- Source: MDN SVG Accessibility (Entry 20)


## Attribution
- Source: MDN SVG Accessibility
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Accessibility
- License: CC BY-SA
- Crawl Date: 2025-04-29T19:48:30.117Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-29
