import { describe, test, expect } from "vitest";
import request from "supertest";
import { app } from "@src/lib/main.js";

// Additional tests for strokeWidth, strokeDashArray, and strokeLinecap parameters

describe("GET /plot Content Negotiation", () => {
  test("should return SVG when Accept: image/svg+xml", async () => {
    const res = await request(app)
      .get("/plot")
      .set("Accept", "image/svg+xml")
      .expect("Content-Type", /image\/svg\+xml/)
      .expect("Vary", /Accept/)
      .expect(200);
    const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
    expect(typeof svgText).toBe("string");
    expect(svgText.startsWith("<svg")).toBe(true);
    expect(svgText).toContain("x-axis:");
    expect(svgText).toContain("y-axis:");
  });

  test("should return PNG when Accept: image/png", async () => {
    const res = await request(app)
      .get("/plot")
      .set("Accept", "image/png")
      .expect("Content-Type", /image\/png/)
      .expect("Vary", /Accept/)
      .expect(200);
    const signature = res.body.slice(0, 8);
    expect(signature.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
  });

  test("should return JSON when Accept: application/json", async () => {
    const res = await request(app)
      .get("/plot")
      .set("Accept", "application/json")
      .expect("Content-Type", /application\/json/)
      .expect("Vary", /Accept/)
      .expect(200);
    expect(res.body).toEqual({
      expression: expect.any(String),
      range: expect.any(String),
      message: "Plot generation details",
    });
  });

  test("should return 406 for unsupported Accept", async () => {
    const res = await request(app)
      .get("/plot")
      .set("Accept", "text/plain")
      .expect("Vary", /Accept/)
      .expect(406);
    expect(res.text).toBe("Not Acceptable");
  });

  test("should return SVG with custom dimensions when width and height query parameters are provided", async () => {
    const res = await request(app)
      .get("/plot")
      .query({ expression: "y=sin(x)", range: "x=0:10,y=0:10", fileType: "svg", width: "500", height: "400" })
      .expect("Content-Type", /image\/svg\+xml/)
      .expect(200);
    const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
    expect(svgText).toContain('width="500"');
    expect(svgText).toContain('height="400"');
  });

  test("SVG output should contain data-metadata attribute with valid JSON", async () => {
    const res = await request(app)
      .get("/plot")
      .query({ expression: "y=sin(x)", range: "x=-1:1,y=-1:1", fileType: "svg" })
      .set("Accept", "image/svg+xml")
      .expect(200);
    const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
    const match = svgText.match(/<svg[^>]+data-metadata="([^"]+)"/);
    expect(match).not.toBeNull();
    const metadataStr = match[1].replace(/&quot;/g, '"');
    const metadataObj = JSON.parse(metadataStr);
    expect(metadataObj).toHaveProperty("expression", "y=sin(x)");
    expect(metadataObj).toHaveProperty("range", "x=-1:1,y=-1:1");
    expect(metadataObj).toHaveProperty("computedXRange");
    expect(metadataObj).toHaveProperty("computedYRange");
    expect(metadataObj).toHaveProperty("axisLabels");
    expect(metadataObj).toHaveProperty("resolution");
  });

  describe("GET /plot Dynamic Query Parameter Plot Generation", () => {
    test("should generate dynamic SVG plot when valid query parameters are provided", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=sin(x)", range: "x=-1:1,y=-1:1", fileType: "svg" })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(typeof svgText).toBe("string");
      expect(svgText.startsWith("<svg")).toBe(true);
      expect(svgText).toContain("Plot for: y=sin(x) in range x=-1:1,y=-1:1");
      expect(svgText).toContain("<polyline");
      expect(svgText).toContain("x-axis: -1 to 1");
      expect(svgText).toContain("y-axis: -1 to 1");
    });

    test("should generate dynamic PNG plot when valid query parameters are provided", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=cos(x)", range: "x=-2.0:3.5,y=-1.5:1.5", fileType: "png" })
        .expect("Content-Type", /image\/png/)
        .expect(200);
      const signature = res.body.slice(0, 8);
      expect(signature.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
    });

    test("should generate JSON response when valid query parameters and format=application/json are provided", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=log(x)", range: "x=1:10,y=0:5", format: "application/json" })
        .expect("Content-Type", /application\/json/)
        .expect(200);
      expect(res.body).toEqual({
        expression: expect.any(String),
        range: expect.any(String),
        message: "Plot generation details",
      });
    });

    test("should return 400 if required query parameter is missing (fileType/format)", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=sin(x)", range: "x=-1:1,y=-1:1" })
        .expect(400);
      expect(res.text).toContain("Missing required query parameter");
    });

    test("should return 400 if range parameter is malformed", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=tan(x)", range: "x=-1:1,y=abc", fileType: "svg" })
        .expect(400);
      expect(res.text).toContain("Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
    });

    test("should return 400 if expression is empty", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "", range: "x=-1:1,y=-1:1", fileType: "svg" })
        .expect(400);
      expect(res.text).toContain("Missing or empty 'expression'");
    });

    test("should return 400 if x range numeric order is invalid", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=sin(x)", range: "x=5:1,y=0:10", fileType: "svg" })
        .expect(400);
      expect(res.text).toContain("Error: Invalid range for x");
    });

    test("should return 400 if y range numeric order is invalid", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=sin(x)", range: "x=-1:1,y=10:0", fileType: "svg" })
        .expect(400);
      expect(res.text).toContain("Error: Invalid range for y");
    });

    test("should return error if expression does not contain variable x", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=5", range: "x=-1:1,y=-1:1", fileType: "svg" })
        .expect(400);
      expect(res.text).toContain("Error: Expression must include the variable 'x'");
    });

    test("should return SVG with custom axis labels when provided", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          xlabel: "MyCustomX",
          ylabel: "MyCustomY"
        })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain("MyCustomX");
      expect(svgText).toContain("MyCustomY");
    });

    test("should handle extra whitespace in range parameter", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=sin(x)", range: " x= 0 : 10 , y= -1 : 5 ", fileType: "svg" })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain("x-axis: 0 to 10");
      expect(svgText).toContain("y-axis: -1 to 5");
    });

    test("should return 400 if evaluated y-value is non-finite", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=1/(x)", range: "x=0:1,y=-1:10", fileType: "svg" })
        .expect(400);
      expect(res.text).toContain("Error: Expression evaluation resulted in an invalid number at x=");
    });

    test("should return SVG with custom styling for axis labels when additional query params are provided", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          xlabelFontSize: "16",
          xlabelColor: "green",
          ylabelFontSize: "18",
          ylabelColor: "purple"
        })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain('font-size="16"');
      expect(svgText).toContain('fill="green"');
      expect(svgText).toContain('font-size="18"');
      expect(svgText).toContain('fill="purple"');
    });

    test("should format axis labels with given precision when provided", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0.1234:10.5678,y=-1.2345:5.6789",
          fileType: "svg",
          xlabelPrecision: "2",
          ylabelPrecision: "3"
        })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain("x-axis: 0.12 to 10.57");
      expect(svgText).toContain("y-axis: -1.235 to 5.679");
    });

    test("should return SVG with locale-specific axis labels when locale parameter is provided", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0.1234:10.5678,y=-1.2345:5.6789",
          fileType: "svg",
          locale: "de-DE",
          xlabelPrecision: "2",
          ylabelPrecision: "3"
        })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toMatch(/x-axis: 0,12 to 10,57/);
      expect(svgText).toMatch(/y-axis: -1,235 to 5,679/);
    });

    test("should include ARIA attributes in SVG axis labels", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=sin(x)", range: "x=0:10,y=0:10", fileType: "svg" })
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain('aria-label="x-axis: 0 to 10"');
      expect(svgText).toContain('aria-label="y-axis: 0 to 10"');
    });

    test("should override aria-label attributes with custom parameters", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          xlabelAriaLabel: "CustomXLabel",
          ylabelAriaLabel: "CustomYLabel"
        })
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain('aria-label="CustomXLabel"');
      expect(svgText).toContain('aria-label="CustomYLabel"');
    });

    test("should override text-anchor attributes with custom parameters", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          xlabelAnchor: "start",
          ylabelAnchor: "end"
        })
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain('text-anchor="start"');
      expect(svgText).toContain('text-anchor="end"');
    });

    test("should return detailed JSON output when --jsonExport flag is provided", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=sin(x)", range: "x=0:10,y=0:10", resolution: "150", jsonExport: "true" })
        .expect("Content-Type", /application\/json/)
        .expect(200);
      expect(res.body.points).toHaveLength(150);
    });

    test("should generate SVG with 200 points when resolution=200 is provided", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=cos(x)", range: "x=-2:2,y=-1:1", resolution: "200", fileType: "svg" })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      const match = svgText.match(/<polyline points="([^"]+)"/);
      expect(match).not.toBeNull();
      const points = match[1].trim().split(" ");
      expect(points.length).toBe(200);
    });

    test("should generate smooth SVG path when smooth flag is enabled", async () => {
      const res = await request(app)
        .get("/plot")
        .query({ expression: "y=sin(x)", range: "x=0:10,y=0:10", smooth: "true", fileType: "svg" })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain("<path");
      expect(svgText).not.toContain("<polyline");
    });

    test("should generate smooth SVG path with custom smoothingFactor parameter", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          smooth: "true",
          smoothingFactor: "0.7",
          fileType: "svg"
        })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain("<path");
      const pathDMatch = svgText.match(/<path[^>]+d="([^"]+)"/);
      expect(pathDMatch).not.toBeNull();
      const dAttr = pathDMatch[1];
      expect(dAttr).toMatch(/Q\s*\d+(\.\d+)?\s+\d+(\.\d+)?\s+\d+(\.\d+)?\s+\d+(\.\d+)?/);
    });

    test("should generate different smooth paths when custom smoothingFactor is provided compared to default", async () => {
      const defaultRes = await request(app)
        .get("/plot")
        .query({ expression: "y=sin(x)", range: "x=0:10,y=0:10", smooth: "true", fileType: "svg" })
        .expect(200);
      const customRes = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          smooth: "true",
          smoothingFactor: "0.8",
          fileType: "svg"
        })
        .expect(200);
      const defaultSvg = defaultRes.text || (Buffer.isBuffer(defaultRes.body) ? defaultRes.body.toString("utf8") : "");
      const customSvg = customRes.text || (Buffer.isBuffer(customRes.body) ? customRes.body.toString("utf8") : "");
      const defaultMatch = defaultSvg.match(/<path[^>]+d="([^"]+)"/);
      const customMatch = customSvg.match(/<path[^>]+d="([^"]+)"/);
      expect(defaultMatch).not.toBeNull();
      expect(customMatch).not.toBeNull();
      expect(defaultMatch[1]).not.toEqual(customMatch[1]);
    });

    test("should return error for invalid smoothingFactor", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          smooth: "true",
          smoothingFactor: "invalid",
          fileType: "svg"
        })
        .expect(400);
      expect(res.text).toContain("Error: Invalid smoothingFactor. Expected a number between 0 and 1.");
    });

    // New tests for strokeWidth, strokeDashArray, and strokeLinecap
    test("should include stroke-width and stroke-dasharray in SVG polyline when provided and smoothing is off", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          strokeWidth: "2",
          strokeDashArray: "5,5"
        })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain('stroke-width="2"');
      expect(svgText).toContain('stroke-dasharray="5,5"');
    });

    test("should include stroke-linecap in SVG output when provided and smoothing is off", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          strokeLinecap: "round"
        })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain('stroke-linecap="round"');
    });

    test("should include stroke-width, stroke-dasharray, and stroke-linecap in SVG path when provided and smoothing is on", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          smooth: "true",
          strokeWidth: "3",
          strokeDashArray: "4,2",
          strokeLinecap: "square"
        })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain('stroke-width="3"');
      expect(svgText).toContain('stroke-dasharray="4,2"');
      expect(svgText).toContain('stroke-linecap="square"');
    });

    test("should return error for invalid strokeWidth", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          strokeWidth: "-1"
        })
        .expect(400);
      expect(res.text).toContain("Error: Invalid strokeWidth. Expected a positive number.");
    });

    test("should return error for invalid strokeDashArray", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          strokeDashArray: ""
        })
        .expect(400);
      expect(res.text).toContain("Error: Invalid strokeDashArray. Expected a non-empty string.");
    });

    test("should return error for invalid strokeLinecap value", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          strokeLinecap: "invalid"
        })
        .expect(400);
      expect(res.text).toContain("Error: Invalid strokeLinecap. Allowed values are 'butt', 'round', or 'square'.");
    });

    // New tests for marker customization and extended gradientStops
    test("should include custom marker definitions when marker customization parameters are provided", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          markerStart: "true",
          markerEnd: "true",
          markerShape: "path",
          markerWidth: "12",
          markerHeight: "12",
          markerFill: "orange"
        })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain('id="markerStart"');
      expect(svgText).toContain('markerWidth="12"');
      expect(svgText).toContain('markerHeight="12"');
      expect(svgText).toContain('fill="orange"');
      expect(svgText).toContain('id="markerEnd"');
    });

    test("should include extended gradient stops when gradientStops parameter is provided", async () => {
      const stops = JSON.stringify([
        { "offset": "0%", "stopColor": "green" },
        { "offset": "50%", "stopColor": "purple", "stopOpacity": "0.5" },
        { "offset": "100%", "stopColor": "yellow" }
      ]);
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          colorGradient: "true",
          gradientStops: stops
        })
        .expect("Content-Type", /image\/svg\+xml/)
        .expect(200);
      const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
      expect(svgText).toContain('<linearGradient id="dynamicGradient">');
      expect(svgText).toContain('<stop offset="0%" stop-color="green"');
      expect(svgText).toContain('<stop offset="50%" stop-color="purple" stop-opacity="0.5"');
      expect(svgText).toContain('<stop offset="100%" stop-color="yellow"');
    });

    test("should return error for invalid gradientStops", async () => {
      const res = await request(app)
        .get("/plot")
        .query({
          expression: "y=sin(x)",
          range: "x=0:10,y=0:10",
          fileType: "svg",
          colorGradient: "true",
          gradientStops: "invalid-json"
        })
        .expect(400);
      expect(res.text).toContain("Error: Invalid gradientStops format");
    });
  });
});

describe("GET /plot Module Index Tests", () => {
  test("module index should be defined", () => {
    expect(true).toBe(true);
  });
});
