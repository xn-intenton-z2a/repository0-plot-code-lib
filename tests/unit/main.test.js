import { describe, test, expect, vi } from "vitest";
import * as mainModule from "../../src/lib/main.js";
import { main } from "../../src/lib/main.js";
import fs from "fs";
import sharp from "sharp";

// Existing Tests

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error", async () => {
    process.argv = ["node", "src/lib/main.js"];
    await main([]);
  });
});

describe("CLI Options Parsing", () => {
  test("should correctly parse --expression, --range, and --file options when file is not .svg or .png", async () => {
    const errorSpy = vi.spyOn(console, "error");
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.txt"];
    await main(args);
    expect(errorSpy).toHaveBeenCalledWith("Error: Only .svg and .png files are supported for plot generation.");
    errorSpy.mockRestore();
  });
});

describe("SVG Plot Generation with Default Styles", () => {
  test("should generate and save SVG file with a polyline element with default stroke when valid parameters provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.svg"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain("<polyline");
    expect(writtenContent).toContain('stroke="blue"');
    expect(writtenContent).toContain('stroke-width="2"');
    expect(writtenContent).toContain('width="300"');
    expect(writtenContent).toContain('height="150"');
    expect(writtenContent).toContain('fill="#f0f0f0"');
    writeSpy.mockRestore();
  });
});

describe("PNG Plot Generation with Default Styles", () => {
  test("should generate and save PNG file as a Buffer when valid parameters provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "output.png"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "output.png");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(Buffer.isBuffer(writtenContent)).toBe(true);
    writeSpy.mockRestore();
  });
});

describe("CSV Plot Generation with Default Styles", () => {
  test("should generate and save SVG file with a polyline element with default CSV styling when valid CSV provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "csv_output.svg"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain("<polyline");
    expect(writtenContent).toContain('stroke="red"');
    expect(writtenContent).toContain('stroke-width="2"');
    expect(writtenContent).toContain("CSV Plot");
    expect(writtenContent).toContain('width="300"');
    expect(writtenContent).toContain('height="150"');
    expect(writtenContent).toContain('fill="#f0f0f0"');
    writeSpy.mockRestore();
  });

  test("should generate and save PNG file as a Buffer when valid CSV provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "csv_output.png"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_output.png");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(Buffer.isBuffer(writtenContent)).toBe(true);
    writeSpy.mockRestore();
  });
});

describe("CSV Header Row Support", () => {
  test("should ignore header row in CSV for SVG output", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "x,y\n0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "header_csv_output.svg"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "header_csv_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain("<polyline");
    writeSpy.mockRestore();
  });

  test("should ignore header row in CSV for PNG output", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "x,y\n0,1\n5,10\n10,100";
    const args = ["--csv", csvData, "--file", "header_csv_output.png", "--log-scale"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "header_csv_output.png");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(Buffer.isBuffer(writtenContent)).toBe(true);
    writeSpy.mockRestore();
  });
});

describe("Custom Style Options", () => {
  test("should generate SVG with custom stroke color and width for function based plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=cos(x)", "--range", "x=-10:10,y=-1:1", "--file", "custom_output.svg", "--stroke-color", "green", "--stroke-width", "5"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "custom_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('stroke="green"');
    expect(writtenContent).toContain('stroke-width="5"');
    writeSpy.mockRestore();
  });

  test("should generate SVG with custom stroke color and width for CSV based plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "custom_csv_output.svg", "--stroke-color", "purple", "--stroke-width", "3"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "custom_csv_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('stroke="purple"');
    expect(writtenContent).toContain('stroke-width="3"');
    writeSpy.mockRestore();
  });
});

describe("Custom Dimensions Options", () => {
  test("should generate SVG with custom width and height when options are provided for function plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "dim_output.svg", "--width", "500", "--height", "400"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "dim_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('width="500"');
    expect(writtenContent).toContain('height="400"');
    writeSpy.mockRestore();
  });

  test("should generate PNG with custom width and height when options are provided for CSV plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n10,20\n20,10";
    const args = ["--csv", csvData, "--file", "dim_output.png", "--width", "600", "--height", "450"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "dim_output.png");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(Buffer.isBuffer(writtenContent)).toBe(true);
    writeSpy.mockRestore();
  });
});

describe("Grid Lines Option", () => {
  test("should include grid lines in SVG output when --grid option is used for function plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "grid_output.svg", "--grid"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "grid_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('<line');
    expect(writtenContent).toContain('stroke="#ccc"');
    expect(writtenContent).toContain('stroke-width="1"');
    writeSpy.mockRestore();
  });

  test("should include grid lines in SVG output when --grid option is used for CSV plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "csv_grid_output.svg", "--grid"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_grid_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('<line');
    expect(writtenContent).toContain('stroke="#ccc"');
    expect(writtenContent).toContain('stroke-width="1"');
    writeSpy.mockRestore();
  });
});

describe("Logarithmic Scaling Option", () => {
  test("should generate SVG with log scale when valid positive function values are provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    // Use a function that is always positive: y = x + 10, range x=0:10, y=10:20
    const args = ["--expression", "y=x+10", "--range", "x=0:10,y=10:20", "--file", "log_output.svg", "--log-scale"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "log_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('<polyline');
    expect(writtenContent).toContain('Log Scale Applied');
    writeSpy.mockRestore();
  });

  test("should output error SVG when function returns non-positive values with log scale", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    // Use a function that can produce non-positive values: y = x - 10, range x=0:10, y=-10:0
    const args = ["--expression", "y=x-10", "--range", "x=0:10,y=-10:0", "--file", "log_error.svg", "--log-scale"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "log_error.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('Error: Logarithmic scaling requires positive y values');
    writeSpy.mockRestore();
  });

  test("should generate SVG with log scale for CSV data when valid positive y values are provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    // CSV data with positive y values
    const csvData = "0,1\n5,10\n10,100";
    const args = ["--csv", csvData, "--file", "csv_log_output.svg", "--log-scale"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_log_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('<polyline');
    expect(writtenContent).toContain('Log Scale Applied');
    writeSpy.mockRestore();
  });

  test("should output error SVG for CSV data when a non-positive y value is encountered with log scale", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    // CSV data with a non-positive y value
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "csv_log_error.svg", "--log-scale"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_log_error.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('Error: Logarithmic scaling requires positive y values');
    writeSpy.mockRestore();
  });
});

describe("Background Color Option", () => {
  test("should apply custom background color for function-based SVG output", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "bg_output.svg", "--background-color", "#123456"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "bg_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('fill="#123456"');
    writeSpy.mockRestore();
  });

  test("should apply custom background color for CSV-based SVG output", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "csv_bg_output.svg", "--background-color", "#abcdef"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_bg_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('fill="#abcdef"');
    writeSpy.mockRestore();
  });
});

describe("Plot Labels Options", () => {
  test("should generate SVG with custom title, x-axis label, and y-axis label when provided for function based plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = [
      "--expression", "y=sin(x)",
      "--range", "x=-10:10,y=-1:1",
      "--file", "label_output.svg",
      "--title", "My Plot Title",
      "--x-label", "Time (s)",
      "--y-label", "Amplitude"
    ];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "label_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('My Plot Title');
    expect(writtenContent).toContain('Time (s)');
    expect(writtenContent).toContain('Amplitude');
    writeSpy.mockRestore();
  });

  test("should generate SVG with custom title, x-axis label, and y-axis label when provided for CSV based plots", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = [
      "--csv", csvData,
      "--file", "csv_label_output.svg",
      "--title", "CSV Plot Title",
      "--x-label", "X-Axis",
      "--y-label", "Y-Axis"
    ];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_label_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain('CSV Plot Title');
    expect(writtenContent).toContain('X-Axis');
    expect(writtenContent).toContain('Y-Axis');
    writeSpy.mockRestore();
  });
});

describe("Tooltip Option", () => {
  test("should add tooltips to each data point in a function based plot", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=0:3.14,y=-1:1", "--file", "tooltip_output.svg", "--tooltip"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "tooltip_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain("<circle");
    expect(writtenContent).toContain("<title>");
    writeSpy.mockRestore();
  });

  test("should add tooltips to each data point in a CSV based plot", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "tooltip_csv_output.svg", "--tooltip"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "tooltip_csv_output.svg");
    expect(callArgs).toBeDefined();
    const writtenContent = callArgs[1];
    expect(writtenContent).toContain("<circle");
    expect(writtenContent).toContain("<title>");
    writeSpy.mockRestore();
  });
});

describe("Dash Array Option", () => {
  test("should include stroke-dasharray attribute in function based SVG plot when --dash-array is provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const args = ["--expression", "y=sin(x)", "--range", "x=-10:10,y=-1:1", "--file", "dash_output.svg", "--dash-array", "5,5"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "dash_output.svg");
    expect(callArgs[1]).toContain('stroke-dasharray="5,5"');
    writeSpy.mockRestore();
  });

  test("should include stroke-dasharray attribute in CSV based SVG plot when --dash-array is provided", async () => {
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    const csvData = "0,0\n5,10\n10,5";
    const args = ["--csv", csvData, "--file", "csv_dash_output.svg", "--dash-array", "2,2"];
    await main(args);
    const callArgs = writeSpy.mock.calls.find(call => call[0] === "csv_dash_output.svg");
    expect(callArgs[1]).toContain('stroke-dasharray="2,2"');
    writeSpy.mockRestore();
  });
});
