import { describe, test, expect } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error and return empty array", () => {
    process.argv = ["node", "src/lib/main.js"];
    const result = main();
    expect(result).toEqual([]);
  });
});

describe("Plot Generation", () => {
  test("generate linear series", () => {
    const result = main(["--expression", "x", "--range", "x=0:10", "--points", "11"]);
    expect(result).toHaveLength(11);
    expect(result[0]).toEqual({ x: 0, y: 0 });
    expect(result[10]).toEqual({ x: 10, y: 10 });
  });

  test("generate sin series", () => {
    const pi = Math.PI;
    const result = main(["--expression", "sin(x)", "--range", `x=0:${pi}`, "--points", "3"]);
    expect(result).toHaveLength(3);
    expect(result[0].y).toBeCloseTo(0);
    expect(result[1].y).toBeCloseTo(1);
    expect(result[2].y).toBeCloseTo(0);
  });

  test("missing flags returns empty array", () => {
    const result = main([]);
    expect(result).toEqual([]);
  });
});
