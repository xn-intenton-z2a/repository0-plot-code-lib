import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { main, createServer } from "@src/lib/main.js";
import request from "supertest";
import fs from "fs";

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

// New tests for data file plotting support

describe("Data File Plotting", () => {
  let logSpy;
  let errSpy;
  let exitSpy;
  let readSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((code) => { throw new Error("process.exit"); });
    readSpy = vi.spyOn(fs, "readFileSync");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("load JSON data and plot ASCII to console", () => {
    readSpy.mockReturnValue('[{"x":0,"y":0},{"x":1,"y":1}]');
    expect(() => main(["plot","--data","data.json","--width","4","--height","2"]))
      .not.toThrow();
    expect(readSpy).toHaveBeenCalledWith("data.json","utf8");
    const chart = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    const stars = (chart.match(/\*/g) || []).length;
    expect(stars).toBe(2);
    const lines = chart.split("\n");
    expect(lines).toHaveLength(2);
    expect(lines[0]).toHaveLength(4);
  });

  test("load YAML data and plot ASCII", () => {
    readSpy.mockReturnValue("- x: 0\n  y: 0\n- x: 2\n  y: 2");
    expect(() => main(["plot","--data","data.yaml","--width","3","--height","2"]))
      .not.toThrow();
    const chart = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    expect((chart.match(/\*/g) || []).length).toBe(2);
  });

  test("load CSV data and plot ASCII", () => {
    readSpy.mockReturnValue("x,y\n0,0\n3,1");
    expect(() => main(["plot","--data","data.csv","--width","4","--height","2"]))
      .not.toThrow();
    const chart = logSpy.mock.calls[logSpy.mock.calls.length - 1][0];
    expect((chart.match(/\*/g) || []).length).toBe(2);
  });

  test("unsupported extension error", () => {
    expect(() => main(["plot","--data","file.txt"]))
      .toThrow("process.exit");
    expect(errSpy).toHaveBeenCalledWith("Unsupported file extension: .txt");
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  test("expression precedence over data", () => {
    readSpy.mockReturnValue('[{"x":0,"y":0}]');
    expect(() => main([
      "plot","--data","data.json","--expression","x","--width","2","--height","2"
    ])).not.toThrow();
    expect(errSpy).toHaveBeenCalledWith(
      "Warning: --expression provided, ignoring --data"
    );
  });

  test("--output flag writes file and confirms", () => {
    const writeSpy = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    readSpy.mockReturnValue('[{"x":0,"y":0},{"x":1,"y":1}]');
    expect(() => main([
      "plot","--data","data.json","--width","4","--height","2","--output","chart.txt"
    ])).not.toThrow();
    expect(writeSpy).toHaveBeenCalledWith(
      "chart.txt",
      expect.any(String),
      "utf8"
    );
    expect(logSpy).toHaveBeenCalledWith("Wrote ASCII chart to chart.txt");
    writeSpy.mockRestore();
  });
});
