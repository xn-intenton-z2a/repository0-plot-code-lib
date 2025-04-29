# SVG_TITLE

## Crawl Summary
SVG <title> element provides an accessible, short-text description for SVG graphics. It must be the first child element (for SVG 1.1 compatibility). Supports only global attributes. Recommended to use aria-labelledby when visible text exists. Browser support is widespread since January 2020. Example usage and detailed configuration are provided.

## Normalised Extract
Table of Contents:
  1. Overview
     - Accessible description for SVG elements
     - Not rendered in graphics; functions as tooltip
  2. Implementation Details
     - Must be first child of parent for SVG 1.1 compatibility
     - Use aria-labelledby if descriptive visible text is available
     - Supports only global attributes (id, class, style, etc.)
  3. Example Code
     - <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
         <circle cx="5" cy="5" r="4">
           <title>I'm a circle</title>
         </circle>
         <rect x="11" y="1" width="8" height="8">
           <title>I'm a square</title>
         </rect>
       </svg>
  4. Best Practices
     - Position <title> as first child for backward compatibility
     - Use aria-labelledby for greater accessibility when possible
  5. Technical Specifications
     - Content: Any elements or text; Attributes: Global only
     - Spec Reference: SVG 2

## Supplementary Details
Exact Configuration and Implementation Details:
- Placement: <title> must be the first child within its parent container in SVG documents to maintain backward compatibility with SVG 1.1.
- Global Attributes: Only global attributes are permitted (e.g., id, class, style, tabindex). There are no specialized attributes for <title>.
- Function: Provides an accessible name, displayed as a tooltip by browsers.
- Browser Compatibility: Fully supported across major browsers since January 2020.
- Recommended Enhancement: Use aria-labelledby on related elements when descriptive text is also visible on the page for improved accessibility.

## Reference Details
API and Implementation Specifications:
1. Element: <title>
   - Description: Provides a short-text, accessible description for SVG elements.
   - Allowed Attributes: Global attributes (id: string, class: string, style: string, etc.)
   - Placement Requirement: Must be the first child element in its parent container for SVG 1.1 compatibility.
   - Return/Effect: No direct return value; improves accessibility and provides tooltips in browsers.
2. Example Implementation:
   - Code:
     svg {
       height: 100%;
     }
     <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
       <circle cx="5" cy="5" r="4">
         <title>I'm a circle</title>
       </circle>
       <rect x="11" y="1" width="8" height="8">
         <title>I'm a square</title>
       </rect>
     </svg>
   - Comments: Ensure <title> is the first child in its parent element. If text is visible elsewhere, prefer use of aria-labelledby.
3. Configuration Options:
   - No additional configuration values are required beyond standard global attributes.
4. Best Practices:
   - Always include a <title> element for accessibility in SVG graphics.
   - Position the <title> as the first child for backward compatibility.
   - Use additional ARIA attributes (e.g., aria-labelledby) when the description is also provided in visible text.
5. Troubleshooting Procedures:
   - Check DOM order to ensure <title> is the first child; if not, reposition it.
   - Verify that global attributes are used correctly if custom styling is needed.
   - Confirm via browser dev tools that tooltips appear on hover over SVG graphic elements.
   - If accessibility issues occur, cross-check with ARIA guidelines and ensure proper implementation of aria-labelledby.

## Information Dense Extract
SVG <title>: Provides accessible text for SVG. Must be first child for SVG 1.1. Global attributes only (id, class, style). Tooltip display in browsers. Example: <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg"> <circle cx="5" cy="5" r="4"><title>I'm a circle</title></circle> <rect x="11" y="1" width="8" height="8"><title>I'm a square</title></rect></svg>. Best practice: Use aria-labelledby when visible text exists. API: No return values, used solely for accessibility enhancement. Troubleshooting: Ensure correct DOM order and use global attributes as needed.

## Sanitised Extract
Table of Contents:
  1. Overview
     - Accessible description for SVG elements
     - Not rendered in graphics; functions as tooltip
  2. Implementation Details
     - Must be first child of parent for SVG 1.1 compatibility
     - Use aria-labelledby if descriptive visible text is available
     - Supports only global attributes (id, class, style, etc.)
  3. Example Code
     - <svg viewBox='0 0 20 10' xmlns='http://www.w3.org/2000/svg'>
         <circle cx='5' cy='5' r='4'>
           <title>I'm a circle</title>
         </circle>
         <rect x='11' y='1' width='8' height='8'>
           <title>I'm a square</title>
         </rect>
       </svg>
  4. Best Practices
     - Position <title> as first child for backward compatibility
     - Use aria-labelledby for greater accessibility when possible
  5. Technical Specifications
     - Content: Any elements or text; Attributes: Global only
     - Spec Reference: SVG 2

## Original Source
MDN SVG <title> and <desc> Documentation
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title

## Digest of SVG_TITLE

# SVG TITLE

## Overview
The <title> element in SVG provides an accessible, short-text description of any SVG container or graphics element. Although its content is not rendered as part of the graphic, browsers typically display it as a tooltip. It is a critical component for improving accessibility in SVGs.

## Implementation Details
- Placement: For backward compatibility with SVG 1.1, the <title> element must be the first child of its parent element.
- Accessibility: When an element can be described by visible text elsewhere, it is recommended to use the aria-labelledby attribute instead.
- Global Attributes: The <title> element supports only global attributes (class, id, style, etc.).
- Browser Compatibility: Widely supported across devices and browsers, available since January 2020.

## Example Usage
<html>, <body>, and <svg> should be styled appropriately. Example:

  svg {
    height: 100%;
  }

  <svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="4">
      <title>I'm a circle</title>
    </circle>
    <rect x="11" y="1" width="8" height="8">
      <title>I'm a square</title>
    </rect>
  </svg>

## Technical Specifications
- Permitted Content: Any elements or character data
- Specification Reference: Scalable Vector Graphics (SVG) 2
- Usage Context: Descriptive element for accessibility

## Crawling & Attribution
- Data Size: 1540368 bytes
- Links Found: 43620
- Retrieval Date: 2023-10-06

## Attribution
- Source: MDN SVG <title> and <desc> Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title
- License: CC BY-SA
- Crawl Date: 2025-04-29T10:51:35.623Z
- Data Size: 1540368 bytes
- Links Found: 43620

## Retrieved
2025-04-29
