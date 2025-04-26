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

  test("should return 400 if required query parameter is missing (fileType)", async () => {
    const res = await request(app)
      .get("/plot")
      .query({ expression: "y=sin(x)", range: "x=-1:1,y=-1:1" })
      .expect(400);
    expect(res.text).toContain("Invalid or missing 'fileType'");
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
});
