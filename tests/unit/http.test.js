import { describe, test, expect } from "vitest";
import request from "supertest";
import { app } from "@src/lib/main.js";


describe("GET /plot Content Negotiation", () => {
  test("should return SVG when Accept: image/svg+xml", async () => {
    const res = await request(app)
      .get("/plot")
      .set("Accept", "image/svg+xml")
      .expect("Content-Type", /image\/svg\+xml/)
      .expect("Vary", /Accept/)
      .expect(200);
    // Ensure SVG content is defined and is a string
    const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
    expect(typeof svgText).toBe('string');
    expect(svgText.startsWith("<svg")).toBe(true);
    // Check for dynamic axis labels
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
    expect(
      signature.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    ).toBe(true);
  });

  test("should return JSON when Accept: application/json", async () => {
    const res = await request(app)
      .get("/plot")
      .set("Accept", "application/json")
      .expect("Content-Type", /application\/json/)
      .expect("Vary", /Accept/)
      .expect(200);
    expect(res.body).toEqual({ data: [] });
  });

  test("should return 406 for unsupported Accept", async () => {
    const res = await request(app)
      .get("/plot")
      .set("Accept", "text/plain")
      .expect("Vary", /Accept/)
      .expect(406);
    expect(res.text).toBe("Not Acceptable");
  });
});

// New tests for dynamic plot generation via query parameters

describe("GET /plot Dynamic Query Parameter Plot Generation", () => {
  test("should generate dynamic SVG plot when valid query parameters are provided", async () => {
    const res = await request(app)
      .get("/plot")
      .query({ expression: "y=sin(x)", range: "x=-1:1,y=-1:1", fileType: "svg" })
      .expect("Content-Type", /image\/svg\+xml/)
      .expect(200);
    const svgText = res.text || (Buffer.isBuffer(res.body) ? res.body.toString("utf8") : "");
    expect(typeof svgText).toBe('string');
    expect(svgText.startsWith("<svg")).toBe(true);
    expect(svgText).toContain("Plot for: y=sin(x) in range x=-1:1,y=-1:1");
    expect(svgText).toContain("<polyline");
    // Verify axis labels are present
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
      .query({ expression: "y=log(x)", range: "x=0:10,y=0:5", format: "application/json" })
      .expect("Content-Type", /application\/json/)
      .expect(200);
    expect(res.body).toEqual({ expression: "y=log(x)", range: "x=0:10,y=0:5", message: "Plot generation details" });
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
    expect(res.text).toContain("Error: 'range' query parameter is malformed");
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
    // Using an expression that leads to division by zero at x=0
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
    // Check for German formatting (comma as decimal separator)
    expect(svgText).toContain("x-axis: 0,12 to 10,57");
    expect(svgText).toContain("y-axis: -1,235 to 5,679");
  });

  test("should include ARIA attributes in SVG axis labels", async () => {
    const res = await request(app)
      .get("/plot")
      .query({ expression: "y=sin(x)", range: "x=0:10,y=0:10", fileType: "svg" })
      .expect(200);
    const svgText = res.text;
    expect(svgText).toContain('aria-label="x-axis: 0 to 10"');
    expect(svgText).toContain('aria-label="y-axis: 0 to 10"');
  });
});
