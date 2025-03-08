import { describe, test, expect, vi } from "vitest";
import * as mainModule from "@src/lib/main.js";

const { main } = mainModule;

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

  test("should prompt for user input when --interactive flag is provided", async () => {
    const spy = vi.spyOn(console, "log");
    // Create a fake readline module
    const fakeInterface = {
      question: (prompt, callback) => { callback("simulated plot command"); },
      close: vi.fn()
    };
    const fakeReadlineModule = {
      createInterface: () => fakeInterface
    };
    
    // Override loadReadline to return our fake module
    vi.spyOn(mainModule, "loadReadline").mockImplementation(() => Promise.resolve(fakeReadlineModule));

    await main(["--interactive"]);
    expect(spy).toHaveBeenCalledWith("Received plot command: simulated plot command");
    spy.mockRestore();
  });

  test("should start Express server when --serve flag is provided", async () => {
    const spy = vi.spyOn(console, "log");
    // Create a fake Express module
    const fakeExpress = () => {
      return {
        get: (path, cb) => {},
        listen: (port, cb) => { cb(); }
      };
    };
    const fakeExpressModule = { default: fakeExpress };
    
    // Override loadExpress to return our fake module
    vi.spyOn(mainModule, "loadExpress").mockImplementation(() => Promise.resolve(fakeExpressModule));

    await main(["--serve"]);
    expect(spy).toHaveBeenCalledWith("Express server running at http://localhost:3000");
    spy.mockRestore();
  });
});
