#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

export async function main(args) {
  // Check for --help flag and display usage message if found
  if (args.includes("--help")) {
    const usage = `Usage: node src/lib/main.js [options]

Options:
  --file <output>        Specify output file for the plot. If the filename ends with ".png", a PNG file is generated; otherwise, an SVG file is created.
  --expression <expr>    Specify the mathematical expression to plot. (Not currently implemented)
  --range <range>        Specify the range for the plot in the format "x=start:end,y=start:end". (Not currently implemented)
  --help                 Display this help message and exit.

Examples:
  node src/lib/main.js --file output.svg
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:10,y=-1:1" --file plot.png
`;
    console.log(usage);
    process.exit(0);
  }

  let outputFile = null;
  // Parse arguments to find the --file flag and its value
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--file" && i + 1 < args.length) {
      outputFile = args[i + 1];
      break;
    }
  }

  // Dummy SVG content to simulate a plot
  const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
  <rect width="100%" height="100%" fill="lightblue" />
  <circle cx="150" cy="100" r="80" fill="green" />
</svg>`;

  if (outputFile) {
    if (outputFile.endsWith(".png")) {
      try {
        // Convert SVG data to PNG using sharp
        const pngBuffer = await sharp(Buffer.from(svgData)).png().toBuffer();
        fs.writeFileSync(outputFile, pngBuffer);
        console.log(`PNG file written to ${outputFile}`);
      } catch (error) {
        console.error("Error converting SVG to PNG:", error);
        process.exit(1);
      }
    } else {
      // Write SVG data directly to file
      fs.writeFileSync(outputFile, svgData);
      console.log(`SVG file written to ${outputFile}`);
    }
  } else {
    console.log(`SVG Output:\n${svgData}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  // Call main and handle promise rejections
  main(args).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
