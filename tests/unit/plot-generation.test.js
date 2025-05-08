import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("flow-sync mode", () => {
  test("should generate synchronized timestamps and values", () => {
    const logMock = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});
    process.argv = [
      "node",
      "src/lib/main.js",
      "--flow-sync",
      "--start",
      "0",
      "--end",
      "4",
      "--step",
      "2",
      "x",
      "2*x",
    ];
    main();
    expect(logMock).toHaveBeenCalledTimes(1);
    const [output] = logMock.mock.calls[0];
    const obj = JSON.parse(output);
    expect(obj.timestamps).toEqual([0, 2, 4]);
    expect(obj.series).toHaveLength(2);
    expect(obj.series[0]).toEqual({
      expression: "x",
      values: [0, 2, 4],
    });
    expect(obj.series[1]).toEqual({
      expression: "2*x",
      values: [0, 4, 8],
    });
    logMock.mockRestore();
  });
});
