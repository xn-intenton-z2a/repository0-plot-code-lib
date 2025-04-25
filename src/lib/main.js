#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

export async function main(args) {
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
