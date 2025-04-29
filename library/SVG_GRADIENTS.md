# SVG_GRADIENTS

## Crawl Summary
SVG gradients are defined using <linearGradient> and <radialGradient> elements with attributes such as x1, y1, x2, y2 for linear gradients and cx, cy, r, fx, fy for radial gradients. Stop elements (<stop>) are used to specify color transitions with attributes offset and stop-color. Implementation requires embedding these definitions in <defs> and referencing the gradients via fill attribute. Precise coordinate values and default settings are specified for effective gradient rendering.

## Normalised Extract
Table of Contents:
1. Linear Gradient Implementation
   - Element: linearGradient
   - Attributes: id (string), x1 (default 0%), y1 (default 0%), x2 (default 100%), y2 (default 0%)
   - Stop Definition: stop element with offset (0% to 100%) and stop-color (color string)
   - Example: <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='0%'> with two stops: 0% => #ff0, 100% => #f00
2. Radial Gradient Implementation
   - Element: radialGradient
   - Attributes: id (string), cx (default 50%), cy (default 50%), r (radius), fx (optional, defaults to center), fy (optional)
   - Stop Definition: Same as linear gradient
   - Example: <radialGradient id='grad2' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'> with stops: 0% => #00f, 100% => #0ff
3. Usage Pattern
   - Embed gradient definitions inside a <defs> block within an <svg> element
   - Reference the gradient in shape elements using fill attribute like fill='url(#grad1)'
4. Best Practices
   - Maintain valid SVG namespaces
   - Validate percentages and coordinate values
   - Use clear and unique IDs for gradient elements
5. Troubleshooting
   - Verify <defs> is correctly placed and referenced
   - Check browser compatibility and validate SVG syntax

## Supplementary Details
Linear Gradient Specifications:
- id: Unique identifier string for gradient reference.
- x1: Default value '0%'; accepts percentage or coordinate values.
- y1: Default value '0%'.
- x2: Default value '100%'.
- y2: Default value '0%'.
- Stop Specification: Each stop must include an offset (0%-100%) and a stop-color attribute.

Radial Gradient Specifications:
- id: Unique identifier string for gradient reference.
- cx: Default '50%'; center x coordinate of the gradient.
- cy: Default '50%'; center y coordinate of the gradient.
- r: Radius value, required to define the spread of the gradient.
- fx, fy: Optional focal points; if not set, default to center values.
- Stop Specification: Each stop similar to linear gradient.

Implementation Steps:
1. Define the gradient within a <defs> element.
2. Provide all necessary attributes with correct default values if applicable.
3. Reference the gradient using fill='url(#yourGradientID)'.
4. Test gradient rendering in multiple browsers.

Configuration Options:
- Gradient direction for linear gradients is set via x1, y1, x2, y2. Changing these alters the gradient vector.
- For radial gradients, adjusting cx, cy, and r manipulates the center and radius, directly affecting gradient appearance.

## Reference Details
API Specifications for SVG Gradients:

Element: linearGradient
- Signature: <linearGradient id="string" x1="coordinate" y1="coordinate" x2="coordinate" y2="coordinate"> ... </linearGradient>
- Parameters: id (string), x1 (string, percentage or coordinate), y1 (string), x2 (string), y2 (string)
- Return: Renders a linear gradient definition passed to referenced elements
- Exceptions: Undefined id will result in unrendered gradient

Element: radialGradient
- Signature: <radialGradient id="string" cx="coordinate" cy="coordinate" r="coordinate" [fx="coordinate"] [fy="coordinate"]> ... </radialGradient>
- Parameters: id (string), cx (string), cy (string), r (string), fx (string, optional), fy (string, optional)
- Return: Renders a radial gradient for fill/stroke usage
- Exceptions: Missing required parameters cause rendering issues

Stop Element:
- Signature: <stop offset="percentage" stop-color="color" />
- Parameters: offset (string, 0% to 100%), stop-color (color string)
- Return: Defines a color stop in the gradient

Complete SVG Example:
<svg width="300" height="200">
  <defs>
    <linearGradient id="gradExample" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff0" />
      <stop offset="100%" stop-color="#f00" />
    </linearGradient>
    <radialGradient id="radialExample" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="#00f" />
      <stop offset="100%" stop-color="#0ff" />
    </radialGradient>
  </defs>
  <rect fill="url(#gradExample)" width="300" height="100" />
  <circle fill="url(#radialExample)" cx="150" cy="150" r="50" />
</svg>

Implementation Pattern:
1. Create a <defs> element inside the <svg> tag.
2. Define gradient elements with all required attributes.
3. Use unique IDs to reference the gradients using the fill attribute.
4. Validate the SVG output in multiple browsers with common troubleshooting: inspect elements using developer tools, verify that <defs> block is present, and check for typos in attribute names.

Troubleshooting Procedures:
- Run command: xmllint --noout --schema http://www.w3.org/Graphics/SVG/svg.xsd yourfile.svg to validate SVG structure.
- Expected output: No errors if the structure is correct.
- If gradient does not render, check if the ID used in fill attribute matches exactly with the defined gradient ID.
- For browser issues, test with multiple browsers and ensure SVG namespace (xmlns="http://www.w3.org/2000/svg") is set on the <svg> element.

## Information Dense Extract
linearGradient: <linearGradient id=string, x1=0%, y1=0%, x2=100%, y2=0%> with stops (<stop offset=0%-100%, stop-color=hex/rgb>); radialGradient: <radialGradient id=string, cx=50%, cy=50%, r=required, fx optional, fy optional> with stops; usage: embed in <defs> and reference using fill=url(#id); troubleshooting: validate SVG structure via xmllint; common issues: mismatched IDs, missing defs, SVG namespace required.

## Sanitised Extract
Table of Contents:
1. Linear Gradient Implementation
   - Element: linearGradient
   - Attributes: id (string), x1 (default 0%), y1 (default 0%), x2 (default 100%), y2 (default 0%)
   - Stop Definition: stop element with offset (0% to 100%) and stop-color (color string)
   - Example: <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='0%'> with two stops: 0% => #ff0, 100% => #f00
2. Radial Gradient Implementation
   - Element: radialGradient
   - Attributes: id (string), cx (default 50%), cy (default 50%), r (radius), fx (optional, defaults to center), fy (optional)
   - Stop Definition: Same as linear gradient
   - Example: <radialGradient id='grad2' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'> with stops: 0% => #00f, 100% => #0ff
3. Usage Pattern
   - Embed gradient definitions inside a <defs> block within an <svg> element
   - Reference the gradient in shape elements using fill attribute like fill='url(#grad1)'
4. Best Practices
   - Maintain valid SVG namespaces
   - Validate percentages and coordinate values
   - Use clear and unique IDs for gradient elements
5. Troubleshooting
   - Verify <defs> is correctly placed and referenced
   - Check browser compatibility and validate SVG syntax

## Original Source
CSS-Tricks: Guide to SVG Gradients
https://css-tricks.com/guide-svg-gradients/

## Digest of SVG_GRADIENTS

# SVG Gradients

This document covers the detailed implementation and technical specifications for using SVG gradients. It includes definitions for linear and radial gradients, exact attribute specifications, and code examples to apply gradients in an SVG element.

## Linear Gradient

Definition: Use the <linearGradient> element inside <defs>.

Attributes:
- id: Unique identifier (string).
- x1, y1: Start point coordinates (percentage or number). Default: x1="0%", y1="0%".
- x2, y2: End point coordinates (percentage or number). Default: x2="100%", y2="0%".

Stops Definition:
- Use <stop> elements to define colors.
- stop offset: A value from 0% to 100% indicating the position of the color stop.
- stop-color: Color value (hex, rgb, etc).

Example:
<svg width="300" height="200">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff0" />
      <stop offset="100%" stop-color="#f00" />
    </linearGradient>
  </defs>
  <rect fill="url(#grad1)" width="300" height="200" />
</svg>

## Radial Gradient

Definition: Use the <radialGradient> element inside <defs>.

Attributes:
- id: Unique identifier (string).
- cx, cy: Center of the gradient (percentage or number); defaults typically to "50%".
- r: Radius of the gradient (percentage, number).
- fx, fy: Focal point for the gradient (optional, defaults to center).

Example:
<svg width="300" height="200">
  <defs>
    <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="#00f" />
      <stop offset="100%" stop-color="#0ff" />
    </radialGradient>
  </defs>
  <rect fill="url(#grad2)" width="300" height="200" />
</svg>

## Implementing Gradients

1. Always include the gradient definitions inside a <defs> element.
2. Reference the gradient using fill="url(#ID)" where ID is the gradient's unique identifier.
3. Ensure proper SVG namespace declarations when embedding in HTML.
4. Validate coordinate values and percentages for responsive design.

Date Retrieved: 2023-10-04

Attribution: Crawled from CSS-Tricks Guide to SVG Gradients with a data size of 0 bytes.

## Attribution
- Source: CSS-Tricks: Guide to SVG Gradients
- URL: https://css-tricks.com/guide-svg-gradients/
- License: Unknown (CSS-Tricks)
- Crawl Date: 2025-04-29T16:51:57.471Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-04-29
