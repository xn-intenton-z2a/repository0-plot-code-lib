import { describe, test, expect, vi } from "vitest";
import { main } from "@src/lib/main.js";

describe("Main Function Behaviour", () => {
  test("should output demo message when no arguments are provided", () => {
    const spy = vi.spyOn(console, "log");
    main([]);
    expect(spy).toHaveBeenCalledWith("Demo Plot: Quadratic function (placeholder). Use flags --interactive, --serve or provide plot parameters.");
    spy.mockRestore();
  });

  test("should output diagnostics when --diagnostics flag is provided", () => {
    const spy = vi.spyOn(console, "log");
    main(["--diagnostics"]);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Diagnostics: Node version:"));
    spy.mockRestore();
  });

  test("should process plot request when plot parameters are provided", () => {
    const spy = vi.spyOn(console, "log");
    const args = ["plot.svg", "quad:1,0,0,-10,10,1"];
    main(args);
    expect(spy).toHaveBeenCalledWith(`Processing plot request with parameters: ${JSON.stringify(args)}`);
    spy.mockRestore();
  });
});
