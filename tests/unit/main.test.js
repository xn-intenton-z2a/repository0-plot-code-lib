import { describe, test, expect } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("New Extended Functions", () => {
  test("plotLogLogReal returns non-empty array", () => {
    const result = mainModule.plotLogLogReal(1, 10, 1);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test("plotStepFunctionReal returns correct step values", () => {
    const result = mainModule.plotStepFunctionReal(0, 10, 1, 2);
    expect(result[0].y).toBe(0);
    expect(result[2].y).toBe(1);
  });
});
