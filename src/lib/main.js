/* File: src/lib/main.js */

import { fileURLToPath } from "url";
import pkg from "../../package.json" assert { type: "json" };
import { compile } from "mathjs";
import fs from "fs";

// In-memory cache for SVG outputs
const svgCache = new Map();

/**
 * Helper function to create a fallback SVG when no valid data points are generated.
 * This ensures consistency in the output and prioritizes a custom fallback message if provided.
 * 
 * @param {string} [fallbackMessage] - Optional custom fallback message
 * @param {number} svgWidth - Width of the SVG
 * @param {number} svgHeight - Height of the SVG
 * @returns {string} - SVG fallback string
 */
function createFallbackSVG(fallbackMessage, svgWidth, svgHeight) {
  // Use a default multi-line fallback message if none is provided
  const message = fallbackMessage ? fallbackMessage : "No valid data points.\nPlease check the input expression.";
  const lines = message.split("\n");
  return `<svg width=\"${svgWidth}\" height=\"${svgHeight}\" xmlns=\"http://www.w3.org/2000/svg\">\n  <rect x=\"0\" y=\"0\" width=\"${svgWidth}\" height=\"${svgHeight}\" fill=\"white\" stroke=\"black\"/>\n  <text x=\"${svgWidth / 2}\" y=\"${svgHeight / 2}\" text-anchor=\"middle\" fill=\"red\" font-size=\"14\" font-family=\"Arial\">\n    ${lines.map((line, index) => `<tspan x=\"${svgWidth / 2}\" dy=\"${index === 0 ? 0 : 20}\">${line}</tspan>`).join('')}\n  </text>\n</svg>`;
}

/**
 * Generates an SVG plot for a given mathematical expression over a specific range.
 * Optionally, a custom fallback message can be provided to display when no valid data points are found.
 * Additionally, optional logarithmic scaling can be applied to the x and/or y axes.
 * 
 * The plot now includes enhanced visual features: x and y axis lines, tick marks with numeric labels, and grid lines.
 * 
 * @param {string} expression - The mathematical expression to evaluate.
 * @param {number} start - The starting value of x.
 * @param {number} end - The ending value of x.
 * @param {number} step - The increment step for x.
 * @param {string} [fallbackMessage] - Optional custom fallback message for non-finite evaluations.
 * @param {boolean} [logScaleX=false] - If true, apply logarithmic scaling on the x-axis (requires x > 0).
 * @param {boolean} [logScaleY=false] - If true, apply logarithmic scaling on the y-axis (requires y > 0).
 * @param {number} [svgWidth=500] - Width of the output SVG.
 * @param {number} [svgHeight=300] - Height of the output SVG.
 * @returns {string} - SVG string representing the plot or fallback message.
 */
export function generatePlot(expression, start, end, step, fallbackMessage, logScaleX = false, logScaleY = false, svgWidth = 500, svgHeight = 300) {
  // Create a cache key based on the function arguments
  const cacheKey = JSON.stringify(["generatePlot", expression, start, end, step, fallbackMessage, logScaleX, logScaleY, svgWidth, svgHeight]);
  if (svgCache.has(cacheKey)) {
    return svgCache.get(cacheKey);
  }

  let points = [];
  const margin = 20;
  const compiled = compile(expression);
  for (let x = start; x <= end; x += step) {
    try {
      const y = compiled.evaluate({ x });
      if (Number.isFinite(y)) {
        // If logarithmic scale is enabled, skip non-positive values
        if (logScaleX && x <= 0) continue;
        if (logScaleY && y <= 0) continue;
        points.push({ x, y });
      }
    } catch (_err) {
      // Ignore evaluation errors
    }
  }

  // If no valid points, return fallback SVG
  if (points.length === 0) {
    const fallbackSVG = createFallbackSVG(fallbackMessage, svgWidth, svgHeight);
    svgCache.set(cacheKey, fallbackSVG);
    return fallbackSVG;
  }

  // Apply logarithmic transformation if enabled
  const transformedXValues = points.map(p => logScaleX ? Math.log10(p.x) : p.x);
  const transformedYValues = points.map(p => logScaleY ? Math.log10(p.y) : p.y);
  const minXTrans = Math.min(...transformedXValues);
  const maxXTrans = Math.max(...transformedXValues);
  const minYTrans = Math.min(...transformedYValues);
  const maxYTrans = Math.max(...transformedYValues);
  const xRange = maxXTrans - minXTrans || 1;
  const yRange = maxYTrans - minYTrans || 1;

  // Build polyline for the data points
  const svgPoints = points
    .map(({ x, y }) => {
      const tx = logScaleX ? Math.log10(x) : x;
      const ty = logScaleY ? Math.log10(y) : y;
      const scaledX = ((tx - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
      const scaledY = svgHeight - (((ty - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
      return `${scaledX},${scaledY}`;
    })
    .join(" ");

  // Create grid lines, axis lines and tick marks with labels
  let gridLines = "";
  let tickMarks = "";

  // X-axis ticks and grid lines
  if (logScaleX) {
    const minExp = Math.floor(minXTrans);
    const maxExp = Math.ceil(maxXTrans);
    for (let exp = minExp; exp <= maxExp; exp++) {
      const tickValue = Math.pow(10, exp);
      const scaledX = ((exp - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
      gridLines += `<line class="grid-line" x1="${scaledX}" y1="${margin}" x2="${scaledX}" y2="${svgHeight - margin}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${scaledX}" y1="${svgHeight - margin}" x2="${scaledX}" y2="${svgHeight - margin + 5}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${scaledX}" y="${svgHeight - margin + 15}" text-anchor="middle" font-size="10">${tickValue.toFixed(2)}</text>\n`;
    }
  } else {
    const tickCount = 5;
    const xTickInterval = (maxXTrans - minXTrans) / tickCount;
    for (let i = 0; i <= tickCount; i++) {
      const xTickValue = minXTrans + i * xTickInterval;
      const scaledX = ((xTickValue - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
      gridLines += `<line class="grid-line" x1="${scaledX}" y1="${margin}" x2="${scaledX}" y2="${svgHeight - margin}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${scaledX}" y1="${svgHeight - margin}" x2="${scaledX}" y2="${svgHeight - margin + 5}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${scaledX}" y="${svgHeight - margin + 15}" text-anchor="middle" font-size="10">${xTickValue.toFixed(2)}</text>\n`;
    }
  }

  // Y-axis ticks and grid lines
  if (logScaleY) {
    const minExp = Math.floor(minYTrans);
    const maxExp = Math.ceil(maxYTrans);
    for (let exp = minExp; exp <= maxExp; exp++) {
      const tickValue = Math.pow(10, exp);
      const scaledY = svgHeight - (((exp - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
      gridLines += `<line class="grid-line" x1="${margin}" y1="${scaledY}" x2="${svgWidth - margin}" y2="${scaledY}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${margin - 5}" y1="${scaledY}" x2="${margin}" y2="${scaledY}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${margin - 7}" y="${scaledY + 3}" text-anchor="end" font-size="10">${tickValue.toFixed(2)}</text>\n`;
    }
  } else {
    const tickCount = 5;
    const yTickInterval = (maxYTrans - minYTrans) / tickCount;
    for (let i = 0; i <= tickCount; i++) {
      const yTickValue = minYTrans + i * yTickInterval;
      const scaledY = svgHeight - (((yTickValue - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
      gridLines += `<line class="grid-line" x1="${margin}" y1="${scaledY}" x2="${svgWidth - margin}" y2="${scaledY}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${margin - 5}" y1="${scaledY}" x2="${margin}" y2="${scaledY}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${margin - 7}" y="${scaledY + 3}" text-anchor="end" font-size="10">${yTickValue.toFixed(2)}</text>\n`;
    }
  }

  // Axis lines
  const xAxisLine = `<line class="axis x-axis" x1="${margin}" y1="${svgHeight - margin}" x2="${svgWidth - margin}" y2="${svgHeight - margin}" stroke="black" stroke-width="2" />`;
  const yAxisLine = `<line class="axis y-axis" x1="${margin}" y1="${margin}" x2="${margin}" y2="${svgHeight - margin}" stroke="black" stroke-width="2" />`;

  // Build the final SVG content
  const svgContent = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">\n    <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black"/>\n    <g class="grid">\n${gridLines}</g>\n    <g class="axes">\n${xAxisLine}\n${yAxisLine}</g>\n    <g class="ticks">\n${tickMarks}</g>\n    <polyline points="${svgPoints}" fill="none" stroke="blue" stroke-width="2"/>\n  </svg>`;

  svgCache.set(cacheKey, svgContent);
  return svgContent;
}

/**
 * Generates an interactive SVG plot for a given mathematical expression with tooltips and zoom/pan functionality.
 * The interactive features include on-hover tooltips for data points and basic zooming/panning via mouse events.
 * 
 * @param {string} expression - The mathematical expression to evaluate.
 * @param {number} start - The starting value of x.
 * @param {number} end - The ending value of x.
 * @param {number} step - The increment step for x.
 * @param {string} [fallbackMessage] - Optional custom fallback message for non-finite evaluations.
 * @param {boolean} [logScaleX=false] - If true, apply logarithmic scaling on the x-axis.
 * @param {boolean} [logScaleY=false] - If true, apply logarithmic scaling on the y-axis.
 * @param {number} [svgWidth=500] - Width of the output SVG.
 * @param {number} [svgHeight=300] - Height of the output SVG.
 * @returns {string} - Interactive SVG string.
 */
export function generateInteractivePlot(expression, start, end, step, fallbackMessage, logScaleX = false, logScaleY = false, svgWidth = 500, svgHeight = 300) {
  // Create a cache key
  const cacheKey = JSON.stringify(["generateInteractivePlot", expression, start, end, step, fallbackMessage, logScaleX, logScaleY, svgWidth, svgHeight]);
  if (svgCache.has(cacheKey)) {
    return svgCache.get(cacheKey);
  }

  let points = [];
  const margin = 20;
  const compiled = compile(expression);
  for (let x = start; x <= end; x += step) {
    try {
      const y = compiled.evaluate({ x });
      if (Number.isFinite(y)) {
        if (logScaleX && x <= 0) continue;
        if (logScaleY && y <= 0) continue;
        points.push({ x, y });
      }
    } catch (_err) {}
  }
  
  if (points.length === 0) {
    const fallbackSVG = createFallbackSVG(fallbackMessage, svgWidth, svgHeight);
    svgCache.set(cacheKey, fallbackSVG);
    return fallbackSVG;
  }

  const transformedXValues = points.map(p => logScaleX ? Math.log10(p.x) : p.x);
  const transformedYValues = points.map(p => logScaleY ? Math.log10(p.y) : p.y);
  const minXTrans = Math.min(...transformedXValues);
  const maxXTrans = Math.max(...transformedXValues);
  const minYTrans = Math.min(...transformedYValues);
  const maxYTrans = Math.max(...transformedYValues);
  const xRange = maxXTrans - minXTrans || 1;
  const yRange = maxYTrans - minYTrans || 1;

  // Build polyline points
  const svgPoints = points.map(({ x, y }) => {
    const tx = logScaleX ? Math.log10(x) : x;
    const ty = logScaleY ? Math.log10(y) : y;
    const scaledX = ((tx - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
    const scaledY = svgHeight - (((ty - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
    return { scaledX, scaledY, originalX: x, originalY: y };
  });

  // Generate grid lines, tick marks, and axes (same as generatePlot)
  let gridLines = "";
  let tickMarks = "";

  if (logScaleX) {
    const minExp = Math.floor(minXTrans);
    const maxExp = Math.ceil(maxXTrans);
    for (let exp = minExp; exp <= maxExp; exp++) {
      const tickValue = Math.pow(10, exp);
      const scaledX = ((exp - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
      gridLines += `<line class="grid-line" x1="${scaledX}" y1="${margin}" x2="${scaledX}" y2="${svgHeight - margin}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${scaledX}" y1="${svgHeight - margin}" x2="${scaledX}" y2="${svgHeight - margin + 5}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${scaledX}" y="${svgHeight - margin + 15}" text-anchor="middle" font-size="10">${tickValue.toFixed(2)}</text>\n`;
    }
  } else {
    const tickCount = 5;
    const xTickInterval = (maxXTrans - minXTrans) / tickCount;
    for (let i = 0; i <= tickCount; i++) {
      const xTickValue = minXTrans + i * xTickInterval;
      const scaledX = ((xTickValue - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
      gridLines += `<line class="grid-line" x1="${scaledX}" y1="${margin}" x2="${scaledX}" y2="${svgHeight - margin}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${scaledX}" y1="${svgHeight - margin}" x2="${scaledX}" y2="${svgHeight - margin + 5}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${scaledX}" y="${svgHeight - margin + 15}" text-anchor="middle" font-size="10">${xTickValue.toFixed(2)}</text>\n`;
    }
  }

  if (logScaleY) {
    const minExp = Math.floor(minYTrans);
    const maxExp = Math.ceil(maxYTrans);
    for (let exp = minExp; exp <= maxExp; exp++) {
      const tickValue = Math.pow(10, exp);
      const scaledY = svgHeight - (((exp - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
      gridLines += `<line class="grid-line" x1="${margin}" y1="${scaledY}" x2="${svgWidth - margin}" y2="${scaledY}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${margin - 5}" y1="${scaledY}" x2="${margin}" y2="${scaledY}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${margin - 7}" y="${scaledY + 3}" text-anchor="end" font-size="10">${tickValue.toFixed(2)}</text>\n`;
    }
  } else {
    const tickCount = 5;
    const yTickInterval = (maxYTrans - minYTrans) / tickCount;
    for (let i = 0; i <= tickCount; i++) {
      const yTickValue = minYTrans + i * yTickInterval;
      const scaledY = svgHeight - (((yTickValue - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
      gridLines += `<line class="grid-line" x1="${margin}" y1="${scaledY}" x2="${svgWidth - margin}" y2="${scaledY}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${margin - 5}" y1="${scaledY}" x2="${margin}" y2="${scaledY}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${margin - 7}" y="${scaledY + 3}" text-anchor="end" font-size="10">${yTickValue.toFixed(2)}</text>\n`;
    }
  }

  const xAxisLine = `<line class="axis x-axis" x1="${margin}" y1="${svgHeight - margin}" x2="${svgWidth - margin}" y2="${svgHeight - margin}" stroke="black" stroke-width="2" />`;
  const yAxisLine = `<line class="axis y-axis" x1="${margin}" y1="${margin}" x2="${margin}" y2="${svgHeight - margin}" stroke="black" stroke-width="2" />`;

  // Build polyline string
  const polylinePoints = svgPoints.map(p => `${p.scaledX},${p.scaledY}`).join(" ");

  // Generate circle elements for each point with interactive event handlers
  const circles = svgPoints.map(p => `<circle cx="${p.scaledX}" cy="${p.scaledY}" r="3" fill="red" onmousemove="showTooltip(evt, ${p.originalX}, ${p.originalY})" onmouseout="hideTooltip()" />`).join("\n");

  // Assemble the interactive SVG content with an embedded tooltip and script
  const svgContent = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">\n    <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black"/>\n    <g class="grid">\n${gridLines}</g>\n    <g class="axes">\n${xAxisLine}\n${yAxisLine}</g>\n    <g class="ticks">\n${tickMarks}</g>\n    <polyline points="${polylinePoints}" fill="none" stroke="blue" stroke-width="2"/>\n    <g class="interactive-points">\n${circles}</g>\n    <text id="svg-tooltip" style="display:none; fill:black; font-size:12px; pointer-events:none;" />\n    <script type="application/ecmascript"><![CDATA[\n      function showTooltip(evt, x, y) {\n        var tooltip = document.getElementById('svg-tooltip');\n        tooltip.setAttribute('x', evt.offsetX + 10);\n        tooltip.setAttribute('y', evt.offsetY + 10);\n        tooltip.textContent = 'x: ' + x.toFixed(2) + ', y: ' + y.toFixed(2);\n        tooltip.style.display = 'block';\n      }\n      function hideTooltip() {\n        var tooltip = document.getElementById('svg-tooltip');\n        tooltip.style.display = 'none';\n      }\n      // Zoom and Pan functionality\n      var svg = document.getElementsByTagName('svg')[0];\n      if(!svg.getAttribute('viewBox')) {\n        svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('width') + ' ' + svg.getAttribute('height'));\n      }\n      var isPanning = false, startPoint = {x:0, y:0}, startViewBox = svg.getAttribute('viewBox').split(' ').map(Number);\n      svg.addEventListener('mousedown', function(evt) {\n        isPanning = true;\n        startPoint = {x: evt.clientX, y: evt.clientY};\n        startViewBox = svg.getAttribute('viewBox').split(' ').map(Number);\n      });\n      svg.addEventListener('mousemove', function(evt) {\n        if(isPanning) {\n          var dx = evt.clientX - startPoint.x;\n          var dy = evt.clientY - startPoint.y;\n          svg.setAttribute('viewBox', (startViewBox[0] - dx) + ' ' + (startViewBox[1] - dy) + ' ' + startViewBox[2] + ' ' + startViewBox[3]);\n        }\n      });\n      svg.addEventListener('mouseup', function() { isPanning = false; });\n      svg.addEventListener('wheel', function(evt) {\n        evt.preventDefault();\n        var vb = svg.getAttribute('viewBox').split(' ').map(Number);\n        var scale = (evt.deltaY > 0) ? 1.1 : 0.9;\n        svg.setAttribute('viewBox', vb[0] + ' ' + vb[1] + ' ' + (vb[2] * scale) + ' ' + (vb[3] * scale));\n      });\n    ]]></script>\n  </svg>`;

  svgCache.set(cacheKey, svgContent);
  return svgContent;
}

/**
 * Generates an interactive SVG multi-plot for multiple mathematical expressions. Each expression is plotted with distinct colors,
 * interactive tooltips for data points, and the overall SVG supports zooming and panning.
 * 
 * @param {string[]} expressions - Array of math expressions.
 * @param {number} start - Starting x value.
 * @param {number} end - Ending x value.
 * @param {number} step - Increment step for x.
 * @param {string} [fallbackMessage] - Fallback message if expressions yield no valid points.
 * @param {boolean} [logScaleX=false] - Apply log scale on x-axis.
 * @param {boolean} [logScaleY=false] - Apply log scale on y-axis.
 * @param {number} [svgWidth=500] - SVG width.
 * @param {number} [svgHeight=300] - SVG height.
 * @returns {string} - Interactive multi-plot SVG string.
 */
export function generateInteractiveMultiPlot(expressions, start, end, step, fallbackMessage, logScaleX = false, logScaleY = false, svgWidth = 500, svgHeight = 300) {
  const cacheKey = JSON.stringify(["generateInteractiveMultiPlot", expressions, start, end, step, fallbackMessage, logScaleX, logScaleY, svgWidth, svgHeight]);
  if (svgCache.has(cacheKey)) {
    return svgCache.get(cacheKey);
  }

  const margin = 20;
  const tickCount = 5;
  const colors = ["blue", "red", "green", "orange", "purple", "magenta", "cyan"];
  const series = [];
  let allValidPoints = [];

  // Process each expression
  expressions.forEach(expr => {
    let points = [];
    const compiled = compile(expr);
    for (let x = start; x <= end; x += step) {
      try {
        const y = compiled.evaluate({ x });
        if (Number.isFinite(y)) {
          if (logScaleX && x <= 0) return;
          if (logScaleY && y <= 0) return;
          points.push({ x, y });
          allValidPoints.push({ x, y });
        }
      } catch (_err) {}
    }
    series.push({ expression: expr, points });
  });

  if (allValidPoints.length === 0) {
    const fallbackSVG = createFallbackSVG(fallbackMessage, svgWidth, svgHeight);
    svgCache.set(cacheKey, fallbackSVG);
    return fallbackSVG;
  }

  const transformedXValues = allValidPoints.map(p => logScaleX ? Math.log10(p.x) : p.x);
  const transformedYValues = allValidPoints.map(p => logScaleY ? Math.log10(p.y) : p.y);
  const minXTrans = Math.min(...transformedXValues);
  const maxXTrans = Math.max(...transformedXValues);
  const minYTrans = Math.min(...transformedYValues);
  const maxYTrans = Math.max(...transformedYValues);
  const xRange = maxXTrans - minXTrans || 1;
  const yRange = maxYTrans - minYTrans || 1;

  let polylines = "";
  let circlesGroup = "";
  series.forEach((serie, index) => {
    if (serie.points.length > 0) {
      const svgPoints = serie.points.map(({ x, y }) => {
        const tx = logScaleX ? Math.log10(x) : x;
        const ty = logScaleY ? Math.log10(y) : y;
        const scaledX = ((tx - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
        const scaledY = svgHeight - (((ty - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
        return { scaledX, scaledY, originalX: x, originalY: y };
      });
      const pointsStr = svgPoints.map(p => `${p.scaledX},${p.scaledY}`).join(" ");
      const color = colors[index % colors.length];
      polylines += `<polyline points="${pointsStr}" fill="none" stroke="${color}" stroke-width="2"/>\n`;
      const circles = svgPoints.map(p => `<circle cx="${p.scaledX}" cy="${p.scaledY}" r="3" fill="${color}" onmousemove="showTooltip(evt, ${p.originalX}, ${p.originalY})" onmouseout="hideTooltip()" />`).join("\n");
      circlesGroup += circles + "\n";
    }
  });

  let gridLines = "";
  let tickMarks = "";

  if (logScaleX) {
    const minExp = Math.floor(minXTrans);
    const maxExp = Math.ceil(maxXTrans);
    for (let exp = minExp; exp <= maxExp; exp++) {
      const tickValue = Math.pow(10, exp);
      const scaledX = ((exp - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
      gridLines += `<line class="grid-line" x1="${scaledX}" y1="${margin}" x2="${scaledX}" y2="${svgHeight - margin}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${scaledX}" y1="${svgHeight - margin}" x2="${scaledX}" y2="${svgHeight - margin + 5}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${scaledX}" y="${svgHeight - margin + 15}" text-anchor="middle" font-size="10">${tickValue.toFixed(2)}</text>\n`;
    }
  } else {
    const xTickInterval = (maxXTrans - minXTrans) / tickCount;
    for (let i = 0; i <= tickCount; i++) {
      const xTickValue = minXTrans + i * xTickInterval;
      const scaledX = ((xTickValue - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
      gridLines += `<line class="grid-line" x1="${scaledX}" y1="${margin}" x2="${scaledX}" y2="${svgHeight - margin}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${scaledX}" y1="${svgHeight - margin}" x2="${scaledX}" y2="${svgHeight - margin + 5}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${scaledX}" y="${svgHeight - margin + 15}" text-anchor="middle" font-size="10">${xTickValue.toFixed(2)}</text>\n`;
    }
  }

  if (logScaleY) {
    const minExp = Math.floor(minYTrans);
    const maxExp = Math.ceil(maxYTrans);
    for (let exp = minExp; exp <= maxExp; exp++) {
      const tickValue = Math.pow(10, exp);
      const scaledY = svgHeight - (((exp - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
      gridLines += `<line class="grid-line" x1="${margin}" y1="${scaledY}" x2="${svgWidth - margin}" y2="${scaledY}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${margin - 5}" y1="${scaledY}" x2="${margin}" y2="${scaledY}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${margin - 7}" y="${scaledY + 3}" text-anchor="end" font-size="10">${tickValue.toFixed(2)}</text>\n`;
    }
  } else {
    const yTickInterval = (maxYTrans - minYTrans) / tickCount;
    for (let i = 0; i <= tickCount; i++) {
      const yTickValue = minYTrans + i * yTickInterval;
      const scaledY = svgHeight - (((yTickValue - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
      gridLines += `<line class="grid-line" x1="${margin}" y1="${scaledY}" x2="${svgWidth - margin}" y2="${scaledY}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${margin - 5}" y1="${scaledY}" x2="${margin}" y2="${scaledY}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${margin - 7}" y="${scaledY + 3}" text-anchor="end" font-size="10">${yTickValue.toFixed(2)}</text>\n`;
    }
  }

  const xAxisLine = `<line class="axis x-axis" x1="${margin}" y1="${svgHeight - margin}" x2="${svgWidth - margin}" y2="${svgHeight - margin}" stroke="black" stroke-width="2" />`;
  const yAxisLine = `<line class="axis y-axis" x1="${margin}" y1="${margin}" x2="${margin}" y2="${svgHeight - margin}" stroke="black" stroke-width="2" />`;

  // Build polylines for each series are already generated in 'polylines'
  const svgContent = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">\n    <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black"/>\n    <g class="grid">\n${gridLines}</g>\n    <g class="axes">\n${xAxisLine}\n${yAxisLine}</g>\n    <g class="ticks">\n${tickMarks}</g>\n    ${polylines}\n    <g class="interactive-points">\n${circlesGroup}</g>\n    <g class="legend">\n      ${series.map((serie, index) => {
        const color = colors[index % colors.length];
        const legendX = svgWidth - 110;
        const legendY = 20 + index * 15;
        return `<rect x="${legendX}" y="${legendY - 12}" width="10" height="10" fill="${color}" />\n<text x="${legendX + 15}" y="${legendY - 2}" font-size="10" fill="black">${serie.expression}</text>`;
      }).join("\n")}\n    </g>\n    <text id="svg-tooltip" style="display:none; fill:black; font-size:12px; pointer-events:none;" />\n    <script type="application/ecmascript"><![CDATA[\n      function showTooltip(evt, x, y) {\n        var tooltip = document.getElementById('svg-tooltip');\n        tooltip.setAttribute('x', evt.offsetX + 10);\n        tooltip.setAttribute('y', evt.offsetY + 10);\n        tooltip.textContent = 'x: ' + x.toFixed(2) + ', y: ' + y.toFixed(2);\n        tooltip.style.display = 'block';\n      }\n      function hideTooltip() {\n        var tooltip = document.getElementById('svg-tooltip');\n        tooltip.style.display = 'none';\n      }\n      var svg = document.getElementsByTagName('svg')[0];\n      if(!svg.getAttribute('viewBox')) {\n        svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('width') + ' ' + svg.getAttribute('height'));\n      }\n      var isPanning = false, startPoint = {x:0, y:0}, startViewBox = svg.getAttribute('viewBox').split(' ').map(Number);\n      svg.addEventListener('mousedown', function(evt) {\n        isPanning = true;\n        startPoint = {x: evt.clientX, y: evt.clientY};\n        startViewBox = svg.getAttribute('viewBox').split(' ').map(Number);\n      });\n      svg.addEventListener('mousemove', function(evt) {\n        if(isPanning) {\n          var dx = evt.clientX - startPoint.x;\n          var dy = evt.clientY - startPoint.y;\n          svg.setAttribute('viewBox', (startViewBox[0] - dx) + ' ' + (startViewBox[1] - dy) + ' ' + startViewBox[2] + ' ' + startViewBox[3]);\n        }\n      });\n      svg.addEventListener('mouseup', function() { isPanning = false; });\n      svg.addEventListener('wheel', function(evt) {\n        evt.preventDefault();\n        var vb = svg.getAttribute('viewBox').split(' ').map(Number);\n        var scale = (evt.deltaY > 0) ? 1.1 : 0.9;\n        svg.setAttribute('viewBox', vb[0] + ' ' + vb[1] + ' ' + (vb[2] * scale) + ' ' + (vb[3] * scale));\n      });\n    ]]></script>\n  </svg>`;

  svgCache.set(cacheKey, svgContent);
  return svgContent;
}

// Alias generateSVGPlot to generatePlot for new API usage
export const generateSVGPlot = generatePlot;

// CLI related helper functions
function writeOutput(fileName, svg) {
  if (fileName.toLowerCase().endsWith('.png')) {
    import('sharp').then(({ default: sharp }) => {
      sharp(Buffer.from(svg)).png().toBuffer().then(pngBuffer => {
        fs.writeFileSync(fileName, pngBuffer);
        console.log("PNG file generated successfully.");
      }).catch(err => {
        console.error("Error during SVG to PNG conversion:", err.message);
        process.exit(1);
      });
    });
  } else {
    fs.writeFileSync(fileName, svg, "utf-8");
    console.log(svg);
  }
}

function showHelp() {
  console.log(`repository0-plot-code-lib: A versatile CLI tool for plotting mathematical functions.\n    \nUsage: node src/lib/main.js [options]\n\nOptions:\n  -h, --help          display help information\n  -v, --version       display version information\n  --diagnostics       enable diagnostics mode\n  --plot              generate a plot. Use either legacy parameters (--expr, --start, --end, [--step]) or the new syntax:\n                      --plot "<expression>" --xmin <number> --xmax <number> --points <integer greater than 1> [--fallback "custom message"]\n  --plots             generate a multi-plot with multiple comma-separated expressions.\n  --fallback          (optional) specify a custom fallback message for cases where expression evaluation yields non-finite values\n  --logscale-x        (optional) apply logarithmic scale to the x-axis (requires x > 0)\n  --logscale-y        (optional) apply logarithmic scale to the y-axis (requires y > 0)\n  --width             (optional) specify the width of the output SVG (default is 500)\n  --height            (optional) specify the height of the output SVG (default is 300)\n  --interactive       (optional) generate an interactive SVG with tooltips and zoom/pan functionality\n  --file              (optional) specify output file name (default is output.svg). Use extension to override format (e.g., output.png).\n`);
}

function showVersion() {
  console.log(pkg.version);
}

function showDiagnostics(args) {
  console.log("Diagnostics Mode Enabled");
  console.log("Parsed Arguments:", args);
  console.log("Node.js Version:", process.version);
  console.log("Current Working Directory:", process.cwd());
}

async function handlePlot(args) {
  let width = 500;
  let height = 300;
  const widthIdx = args.indexOf("--width");
  if (widthIdx !== -1 && args.length > widthIdx + 1) {
    width = parseInt(args[widthIdx + 1], 10);
  }
  const heightIdx = args.indexOf("--height");
  if (heightIdx !== -1 && args.length > heightIdx + 1) {
    height = parseInt(args[heightIdx + 1], 10);
  }

  const fileIdx = args.indexOf("--file");
  const fileName = (fileIdx !== -1 && args.length > fileIdx + 1) ? args[fileIdx + 1] : "output.svg";

  let fallbackMessage;
  const fallbackIdx = args.indexOf("--fallback");
  if (fallbackIdx !== -1 && args.length > fallbackIdx + 1) {
    fallbackMessage = args[fallbackIdx + 1];
  }

  const logScaleX = args.includes("--logscale-x");
  const logScaleY = args.includes("--logscale-y");

  const interactive = args.includes("--interactive");

  // New flag for multi-plot (--plots) takes precedence
  const plotsFlagIdx = args.indexOf("--plots");
  if (plotsFlagIdx !== -1 && args.length > plotsFlagIdx + 1) {
    const expressionsArg = args[plotsFlagIdx + 1];
    const expressions = expressionsArg.split(",").map(e => e.trim());
    const xminIdx = args.indexOf("--xmin");
    const xmaxIdx = args.indexOf("--xmax");
    const pointsIdx = args.indexOf("--points");
    if (xminIdx === -1 || xmaxIdx === -1 || pointsIdx === -1) {
      console.error("Missing required parameters for SVG plotting: --xmin, --xmax, --points");
      process.exit(1);
      return;
    }
    const xmin = parseFloat(args[xminIdx + 1]);
    const xmax = parseFloat(args[xmaxIdx + 1]);
    if (xmin >= xmax) {
      console.error("Invalid range: --xmin must be less than --xmax");
      process.exit(1);
      return;
    }
    const pointsCount = parseInt(args[pointsIdx + 1], 10);
    const step = (xmax - xmin) / pointsCount;
    let svg;
    if (interactive) {
      svg = generateInteractiveMultiPlot(expressions, xmin, xmax, step, fallbackMessage, logScaleX, logScaleY, width, height);
    } else {
      svg = generateMultiPlot(expressions, xmin, xmax, step, fallbackMessage, logScaleX, logScaleY, width, height);
    }
    await writeOutput(fileName, svg);
    return;
  }

  // Determine if using new CLI syntax: --plot <expression> ...
  const plotIndex = args.indexOf("--plot");
  const nextArg = args[plotIndex + 1];
  if (nextArg && !nextArg.startsWith("--")) {
    // Check if multiple expressions are provided via comma separation
    if (nextArg.indexOf(",") !== -1) {
      const expressions = nextArg.split(",").map(e => e.trim());
      const xminIdx = args.indexOf("--xmin");
      const xmaxIdx = args.indexOf("--xmax");
      const pointsIdx = args.indexOf("--points");
      if (xminIdx === -1 || xmaxIdx === -1 || pointsIdx === -1) {
        console.error("Missing required parameters for SVG plotting: --xmin, --xmax, --points");
        process.exit(1);
        return;
      }
      const xmin = parseFloat(args[xminIdx + 1]);
      const xmax = parseFloat(args[xmaxIdx + 1]);
      if (xmin >= xmax) {
        console.error("Invalid range: --xmin must be less than --xmax");
        process.exit(1);
        return;
      }
      const pointsCount = parseInt(args[pointsIdx + 1], 10);
      const step = (xmax - xmin) / pointsCount;
      let svg;
      if (interactive) {
        svg = generateInteractiveMultiPlot(expressions, xmin, xmax, step, fallbackMessage, logScaleX, logScaleY, width, height);
      } else {
        svg = generateMultiPlot(expressions, xmin, xmax, step, fallbackMessage, logScaleX, logScaleY, width, height);
      }
      await writeOutput(fileName, svg);
      return;
    } else {
      // Single expression case
      const expression = nextArg;
      const xminIdx = args.indexOf("--xmin");
      const xmaxIdx = args.indexOf("--xmax");
      const pointsIdx = args.indexOf("--points");
      if (xminIdx === -1 || xmaxIdx === -1 || pointsIdx === -1) {
        console.error("Missing required parameters for SVG plotting: --xmin, --xmax, --points");
        process.exit(1);
        return;
      }
      const xmin = parseFloat(args[xminIdx + 1]);
      const xmax = parseFloat(args[xmaxIdx + 1]);
      if (xmin >= xmax) {
        console.error("Invalid range: --xmin must be less than --xmax");
        process.exit(1);
        return;
      }
      const pointsCount = parseInt(args[pointsIdx + 1], 10);
      const step = (xmax - xmin) / pointsCount;
      let svg;
      if (interactive) {
        svg = generateInteractivePlot(expression, xmin, xmax, step, fallbackMessage, logScaleX, logScaleY, width, height);
      } else {
        svg = generateSVGPlot(expression, xmin, xmax, step, fallbackMessage, logScaleX, logScaleY, width, height);
      }
      await writeOutput(fileName, svg);
      return;
    }
  } else {
    // Legacy syntax using --expr, --start, --end, and optional --step
    const exprIdx = args.indexOf("--expr");
    const startIdx = args.indexOf("--start");
    const endIdx = args.indexOf("--end");

    if (exprIdx === -1 || startIdx === -1 || endIdx === -1) {
      console.error("Missing required parameters for plotting: --expr, --start, --end");
      process.exit(1);
      return;
    }

    const expression = args[exprIdx + 1];

    const start = parseFloat(args[startIdx + 1]);
    const end = parseFloat(args[endIdx + 1]);

    if (start >= end) {
      console.error("Invalid range: --start must be less than --end");
      process.exit(1);
      return;
    }

    const stepIdx = args.indexOf("--step");
    let step = 0.1;
    if (stepIdx !== -1) {
      step = parseFloat(args[stepIdx + 1]);
    }

    let svg;
    if (interactive) {
      svg = generateInteractivePlot(expression, start, end, step, fallbackMessage, logScaleX, logScaleY, width, height);
    } else {
      svg = generatePlot(expression, start, end, step, fallbackMessage, logScaleX, logScaleY, width, height);
    }
    await writeOutput(fileName, svg);
  }
}

export async function main(args = []) {
  if (args.length === 0) {
    const fileName = "output.svg";
    const svg = generatePlot("sin(x)", 0, 6.28, 0.1, undefined, false, false);
    await writeOutput(fileName, svg);
    return;
  }
  if (args.includes("--help") || args.includes("-h")) {
    showHelp();
    return;
  }
  if (args.includes("--version") || args.includes("-v")) {
    showVersion();
    return;
  }
  if (args.includes("--diagnostics")) {
    showDiagnostics(args);
    return;
  }
  if (args.includes("--plot") || args.includes("--plots")) {
    await handlePlot(args);
    return;
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
