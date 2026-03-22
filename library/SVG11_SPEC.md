SVG11_SPEC

Table of Contents:
1. Required root element attributes and DOCTYPE for SVG 1.1
2. viewBox and coordinate systems (spec authoritative text)
3. polyline points attribute grammar (specified form)
4. Validity requirements for standalone SVG 1.1

1. Required root element attributes and DOCTYPE (exact text)
- XML prolog (optional): <?xml version="1.0" encoding="UTF-8" standalone="no"?>
- DOCTYPE (for strict SVG 1.1 documents): <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> 
- Root svg element must include namespace and version: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" ...>

2. viewBox and coordinate systems (spec authoritative)
- viewBox attribute is defined as: <number> <number> <number> <number> representing min-x, min-y, width, height in user units. It establishes a user coordinate system that is then mapped to the viewport.
- The specification requires correct ordering: min-x min-y width height. Width and height must be positive numbers.

3. polyline points attribute grammar (spec excerpt paraphrase)
- The 'points' attribute is a list of coordinate pairs, where each pair is two numbers (x, y) separated by a comma or whitespace, and pairs are separated by whitespace or commas. Numbers follow SVG number syntax (optional sign, integer or fractional, optional exponent).
- Example valid sequence: "100,200 200,100 300,200"

4. Validity requirements for standalone SVG 1.1
- For strict conformance to SVG 1.1, include the DOCTYPE declaration above and the required namespace and version attributes on the root element.
- For many rendering pipelines (browsers and converters), an svg root with xmlns and version and a valid viewBox is sufficient; however the DOCTYPE ensures canonical SVG 1.1 compliance for validators.

Detailed digest
Content retrieved from https://www.w3.org/TR/SVG11/ on 2026-03-22.
This W3C specification defines the precise syntactic demands for SVG 1.1 documents: the DOCTYPE, the xmlns URI, the required version attribute, the viewBox ordering and semantics, and the precise grammar for attribute content such as polyline points. The rules above are the minimal set required to produce valid SVG 1.1 output for the plotting tool.

Attribution
Source: https://www.w3.org/TR/SVG11/
Bytes retrieved: 15481
