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
    expect(res.text.startsWith("<svg")).toBe(true);
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