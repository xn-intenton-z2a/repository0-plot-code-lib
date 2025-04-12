/* File: src/lib/main.js */

import { fileURLToPath } from "url";

// Inline implementation of generatePlot to avoid missing module errors
export function generatePlot(expression, start, end, step) {
  // Rudimentary implementation: returns a simple SVG with plot details
  return `<svg xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="20">Plot: ${expression}, start: ${start}, end: ${end}, step: ${step}</text>
  </svg>`;
}

export function main(args = []) {
  if (args.includes("--plot")) {
    const exprIdx = args.indexOf("--expr");
    const startIdx = args.indexOf("--start");
    const endIdx = args.indexOf("--end");

    if (exprIdx === -1 || startIdx === -1 || endIdx === -1) {
      console.error("Missing required parameters for plotting: --expr, --start, --end");
      process.exit(1);
      return; // Ensure no further execution in testing environments
    }

    const expression = args[exprIdx + 1];
    const start = parseFloat(args[startIdx + 1]);
    if (isNaN(start)) {
      console.error("Invalid numeric value for --start");
      process.exit(1);
      return;
    }
    const end = parseFloat(args[endIdx + 1]);
    if (isNaN(end)) {
      console.error("Invalid numeric value for --end");
      process.exit(1);
      return;
    }
    const stepIdx = args.indexOf("--step");
    let step = 0.1;
    if (stepIdx !== -1) {
      step = parseFloat(args[stepIdx + 1]);
      if (isNaN(step)) {
        console.error("Invalid numeric value for --step");
        process.exit(1);
        return;
      }
    }

    try {
      const svg = generatePlot(expression, start, end, step);
      console.log(svg);
    } catch (e) {
      console.error("Error generating plot:", e.message);
      process.exit(1);
    }
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
