# SVG_JS

## Crawl Summary
SVG.js is a lightweight, dependency-free library for creating, manipulating, and animating SVG elements. It provides chainable methods to add elements (like rect, circle, ellipse), manipulate their attributes (fill, move, size), and animate changes over time with an easy-to-read API. Performance benchmarks indicate high efficiency in generating 10000 elements. A modular design supports plugins and custom extensions.

## Normalised Extract
Table of Contents:
1. Installation and Setup
   - Include SVG.js via CDN or npm (npm install @svgdotjs/svg.js)
   - Use script tag <script src='https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js/dist/svg.min.js'></script>
2. Basic Initialization
   - Call SVG().addTo(container) with container as a CSS selector or HTMLElement
   - Returns SVG.Svg instance
   - Example: var draw = SVG().addTo('#drawing')
3. Element Creation
   - Use draw.rect(width, height) to create a rectangle (returns SVG.Rect)
   - Other elements: SVG.Circle, SVG.Ellipse, SVG.Path, etc.
4. Element Manipulation
   - Chain methods: fill(color), move(x, y), size(width, height)
   - Example: draw.rect(100,100).fill('#f06')
5. Animation
   - Use element.animate(duration, ease) for smooth transitions
   - Returns SVG.Runner; duration in milliseconds; ease parameter such as 'easeInOut'
6. Plugins and Extensions
   - Extend functionality using SVG.extend(module, options?)
   - Common plugins include svg.draggable.js, svg.topath.js
Detailed Steps:
- Install library
- Initialize drawing using SVG().addTo
- Create elements with specific dimensions
- Manipulate with chainable methods
- Animate elements with proper easing

## Supplementary Details
Technical Specifications and Implementation Details:
1. Initialization:
   - Method: SVG().addTo(container: string | HTMLElement) -> SVG.Svg
   - Parameters: container (CSS selector or HTMLElement)
   - Returns: SVG.Svg instance
2. Element Creation:
   - Method: draw.rect(width: number, height: number) -> SVG.Rect
   - Parameters: width (number), height (number)
   - Returns: SVG.Rect instance with chainable methods such as fill, move, and size
3. Element Styling:
   - Method: rect.fill(color: string) -> SVG.Rect
   - Parameters: color (string in hex, rgb, or named color)
   - Returns: the same SVG.Rect instance
4. Animation:
   - Method: element.animate(duration: number, ease?: string) -> SVG.Runner
   - Parameters: duration (number in ms), ease (string, default 'linear' if not specified)
   - Returns: SVG.Runner instance to control the animation
5. Plugin Extension:
   - Method: SVG.extend(module, options?)
   - Allows addition of custom methods to SVG.Element or other classes
6. Configuration Options:
   - No global configuration is required; defaults are embedded in method implementations
   - Default easing is 'linear' if no easing parameter provided
Implementation Steps:
   Step 1: Add the SVG.js library to your project
   Step 2: Initialize the drawing surface with SVG().addTo('#container')
   Step 3: Create and customize elements with methods like rect, fill, and move
   Step 4: Animate elements using animate(duration, easing)
   Step 5: Extend functionality with SVG.extend if needed

## Reference Details
API Specifications and SDK Method Signatures:
1. SVG Initialization:
   Method: SVG().addTo(container: string | HTMLElement): SVG.Svg
   - Throws exception if container not found
   Example:
     var draw = SVG().addTo('#drawing');
2. Rectangle Creation:
   Method: draw.rect(width: number, height: number): SVG.Rect
   - Parameters: width, height (numbers)
   - Returns: an instance of SVG.Rect
   Example:
     var rect = draw.rect(100, 100);
3. Element Styling:
   Method: rect.fill(color: string): SVG.Rect
   - Parameter: color in formats such as '#f06', 'rgb(255,0,0)'
   - Returns: same SVG.Rect instance for chaining
   Example:
     rect.fill('#f06');
4. Animation Method:
   Method: element.animate(duration: number, ease?: string): SVG.Runner
   - Parameters: duration in ms (number), optional ease (string, e.g., 'easeInOut')
   - Returns: SVG.Runner; allows chaining and callback on animation end
   Example:
     rect.animate(300, 'easeInOut');
5. Plugin Extension:
   Method: SVG.extend(target: any, extension: Object): void
   - Parameters: target (typically SVG.Element) and an object with key-value pairs for new methods
   Example:
     SVG.extend(SVG.Element, {
       customMethod: function(param: number): void {
         // custom implementation
       }
     });

Best Practices and Troubleshooting:
- Always verify that the container exists in the DOM: use document.getElementById('drawing') to check non-null
- Ensure proper order of scripts: include SVG.js before your custom scripts
- For animations failing, validate the easing parameter against supported values
- Use browser developer tools to inspect the rendered SVG and check for console errors
- Use chaining to reduce code verbosity and improve readability

Return Types:
- SVG().addTo: returns SVG.Svg
- draw.rect: returns SVG.Rect
- rect.fill: returns SVG.Rect (chainable)
- element.animate: returns SVG.Runner

Configuration Options:
- npm package: @svgdotjs/svg.js version 3.x
- Default easing: 'linear'

Detailed code commentary is provided in the examples above for clear implementation patterns.

## Information Dense Extract
SVG().addTo(selector:string|HTMLElement)->SVG.Svg; draw.rect(width:number,height:number)->SVG.Rect; rect.fill(color:string)->SVG.Rect; element.animate(duration:number,ease?:string)->SVG.Runner; npm install @svgdotjs/svg.js; default easing 'linear'; extend via SVG.extend(target,extension); check container existence with document.getElementById; performance: 10000 elements benchmark; common plugins: draggable, topath; MIT license.

## Sanitised Extract
Table of Contents:
1. Installation and Setup
   - Include SVG.js via CDN or npm (npm install @svgdotjs/svg.js)
   - Use script tag <script src='https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js/dist/svg.min.js'></script>
2. Basic Initialization
   - Call SVG().addTo(container) with container as a CSS selector or HTMLElement
   - Returns SVG.Svg instance
   - Example: var draw = SVG().addTo('#drawing')
3. Element Creation
   - Use draw.rect(width, height) to create a rectangle (returns SVG.Rect)
   - Other elements: SVG.Circle, SVG.Ellipse, SVG.Path, etc.
4. Element Manipulation
   - Chain methods: fill(color), move(x, y), size(width, height)
   - Example: draw.rect(100,100).fill('#f06')
5. Animation
   - Use element.animate(duration, ease) for smooth transitions
   - Returns SVG.Runner; duration in milliseconds; ease parameter such as 'easeInOut'
6. Plugins and Extensions
   - Extend functionality using SVG.extend(module, options?)
   - Common plugins include svg.draggable.js, svg.topath.js
Detailed Steps:
- Install library
- Initialize drawing using SVG().addTo
- Create elements with specific dimensions
- Manipulate with chainable methods
- Animate elements with proper easing

## Original Source
SVG.js Documentation
https://svgjs.dev/docs/3.0/

## Digest of SVG_JS

# SVG.js Documentation
Retrieved on: 2023-10-17

# Installation
Include the SVG.js library in your project via a script tag or through npm installation.

For CDN usage:
  <script src='https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js/dist/svg.min.js'></script>

For npm installation:
  npm install @svgdotjs/svg.js

# API Overview
The core method to start working with SVG.js is SVG().addTo(container) which returns an SVG.Svg instance that acts as the root.

## Basic Initialization
Method: SVG().addTo(container: string | HTMLElement) -> SVG.Svg
Example:
  var draw = SVG().addTo('#drawing')

## Creating Elements
Method: draw.rect(width: number, height: number) -> SVG.Rect
Example:
  var rect = draw.rect(100, 100).fill('#f06')

Other elements include: SVG.Circle, SVG.Ellipse, SVG.Line, SVG.Path, SVG.Text, etc.

## Element Manipulation
Operations such as modifying attributes, styling, and positioning are accomplished using methods chained to element creation. 
Common methods include:
  - fill(color: string): sets the fill color
  - move(x: number, y: number): positions the element
  - size(width: number, height: number): sets dimensions

## Animation
SVG.js supports animations using the animate method.
Method: element.animate(duration: number, ease?: string) -> SVG.Runner
Example:
  var runner = rect.animate(300, 'easeInOut')

## Plugin and Extension Support
Extend or enhance functionality using:
Method: SVG.extend(module, options?)
This allows subclassing and adding custom methods to existing SVG.js classes.

# Performance and Benchmarks
SVG.js is optimized for speed, supporting operations like generating 10000 rectangles for various scenarios (plain, filled, gradient).
Tested on Intel Core i7-4702MQ @ 2.2GHz.

# License
Released under the MIT License.

# Attribution
Data Size: 5512768 bytes, Retrieved from: https://svgjs.dev/docs/3.0/

## Attribution
- Source: SVG.js Documentation
- URL: https://svgjs.dev/docs/3.0/
- License: MIT
- Crawl Date: 2025-05-01T22:48:16.705Z
- Data Size: 5512768 bytes
- Links Found: 6262

## Retrieved
2025-05-01
