#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import express from "express";
import fs from "fs";
import path from "path";

const app = express();

app.get("/plot", (req, res) => {
  const accepted = req.accepts(["image/svg+xml", "image/png", "application/json"]);
  res.vary("Accept");
  if (!accepted) {
    return res.status(406).send("Not Acceptable");
  }
  switch (accepted) {
    case "image/svg+xml":
      res
        .type("image/svg+xml")
        .send('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
      break;
    case "image/png": {
      const pngBase64 =
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
      const img = Buffer.from(pngBase64, "base64");
      res.type("image/png").send(img);
      break;
    }
    case "application/json":
      res.json({ data: [] });
      break;
    default:
      res.status(406).send("Not Acceptable");
  }
});

export function main(args = process.argv.slice(2)) {
  // Check for CLI_PLOT mode: if any of the CLI flags are provided, require all flags.
  const hasExpression = args.includes("--expression");
  const hasRange = args.includes("--range");
  const hasFile = args.includes("--file");

  if (hasExpression || hasRange || hasFile) {
    if (!hasExpression || !hasRange || !hasFile) {
      console.error("Error: --expression, --range, and --file flags are required together.");
      process.exit(1);
    }
    const expressionIdx = args.indexOf("--expression");
    const rangeIdx = args.indexOf("--range");
    const fileIdx = args.indexOf("--file");
    const expression = args[expressionIdx + 1];
    const range = args[rangeIdx + 1]; // currently unused but reserved for future enhancements
    const fileOutput = args[fileIdx + 1];

    if (!expression || !range || !fileOutput) {
      console.error("Error: Missing required values for --expression, --range, or --file.");
      process.exit(1);
    }

    const ext = path.extname(fileOutput).toLowerCase();
    if (ext === ".svg") {
      const content = `<svg xmlns="http://www.w3.org/2000/svg"><!-- Plot for expression: ${expression} --></svg>`;
      fs.writeFileSync(fileOutput, content, "utf8");
      console.log(`SVG plot generated at ${fileOutput}`);
      return;
    } else if (ext === ".png") {
      const pngBase64 =
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
      const buffer = Buffer.from(pngBase64, "base64");
      fs.writeFileSync(fileOutput, buffer);
      console.log(`PNG plot generated at ${fileOutput}`);
      return;
    } else {
      console.error(`Error: Unsupported file extension '${ext}'. Only .svg and .png are supported.`);
      process.exit(1);
    }
  }

  if (args.includes("--serve")) {
    app.listen(3000, () => {
      console.log("Server listening on :3000");
    });
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

export { app };

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
