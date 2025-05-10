import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { main, createServer } from "@src/lib/main.js";
import request from "supertest";

describe("Expression Plot Data Generation", () => {
  let logSpy;
  let errSpy;
  let exitSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((code) => { throw new Error("process.exit"); });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("default domain and samples", () => {
    expect(() => main(["plot", "--expression", "x^2"]))
      .not.toThrow();
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    const data = JSON.parse(output);
    expect(data).toHaveLength(100);
    expect(data[0].y).toBeCloseTo(100);
    expect(data[data.length - 1].y).toBeCloseTo(100);
  });

  test("custom domain and samples", () => {
    expect(() =>
      main(["plot", "--expression", "x", "--xmin", "0", "--xmax", "2", "--samples", "3"]))
      .not.toThrow();
    const output = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    const data = JSON.parse(output);
    expect(data).toHaveLength(3);
    expect(data[0].x).toBe(0);
    expect(data[2].x).toBe(2);
    expect(data).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]);
  });

  test("invalid expression", () => {
    expect(() => main(["plot", "--expression", "sin("])).toThrow("process.exit");
    expect(errSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error evaluating expression "sin("')
    );
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});

describe("HTTP API Endpoints", () => {
  const app = createServer({});

  test("GET /plot returns JSON array with default domain 0 to samples-1", async () => {
    const response = await request(app)
      .get('/plot?expression=x&samples=3');
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/);
    expect(response.body).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]);
  });

  test("GET /plot with ascii returns ASCII chart", async () => {
    const response = await request(app)
      .get('/plot?expression=x&samples=3&outputFormat=ascii');
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/plain/);
    const matches = response.text.match(/\*/g) || [];
    expect(matches).toHaveLength(3);
    const lines = response.text.split('\n');
    expect(lines).toHaveLength(24);
  });

  test("GET /stats returns JSON stats", async () => {
    const response = await request(app)
      .get('/stats?expression=x^2&samples=5');
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/);
    expect(response.body).toEqual({
      x_min: 0,
      x_max: 4,
      x_mean: 2,
      x_median: 2,
      x_stddev: 1.4142,
      y_min: 0,
      y_max: 16,
      y_mean: 6,
      y_median: 4,
      y_stddev: 5.8992,
    });
  });

  test("GET /stats missing expression returns 400", async () => {
    const response = await request(app)
      .get('/stats?samples=5');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Expression parameter is required" });
  });

  test("GET /plot samples <2 returns 400", async () => {
    const response = await request(app)
      .get('/plot?expression=x&samples=1');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "samples must be >= 2" });
  });
});
