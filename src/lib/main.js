#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from 'url';
import math from 'mathjs';

export async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`Welcome to repository0-plot-code-lib CLI: Embracing our mission 'Be a go-to plot library with a CLI, be the jq of formulae visualisations.'\nSelect from modes: --interactive, --serve, --diagnostics, --plot-abs, --export-csv, --export-md, --export-json, --export-html, --export-ascii, --export-svg, --export-xml, --export-latex, --export-txt, --export-r, --bar-chart, --scatter, --plot-parametric, --plot-poly, --lissajous, --lemniscate, --hyperbola, --power-plot or provide plot parameters.\nFor contribution guidelines, please refer to CONTRIBUTING.md.`);
    return;
  }

  if (args.includes('--diagnostics')) {
    console.log(`Diagnostics: Node version: ${process.version}`);
    return;
  }

  if (args.includes('--serve')) {
    try {
      const express = await loadExpress();
      const app = express();
      const port = 3000;
      app.get('/', (req, res) => res.send('Hello from Express server'));
      app.listen(port, () => {
        console.log(`Express server running at http://localhost:${port}`);
      });
    } catch (err) {
      console.error('Error starting server:', err);
    }
    return;
  }

  if (args.includes('--interactive')) {
    try {
      const readline = await loadReadline();
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('Enter a command: ', answer => {
        console.log(`Received plot command: ${answer}`);
        rl.close();
      });
    } catch (err) {
      console.error('Error loading readline module:', err);
    }
    return;
  }

  if (args.includes('--debug')) {
    const funcs = [
      'plotQuadratic', 'calculateDerivative', 'calculateArea', 'plotLinear', 'plotSine', 'plotCosine', 'rotatePoints', 'plotExponential', 'plotLogarithmic',
      'movingAverage', 'plotTangent', 'reflectPoints', 'scalePoints', 'plotSqrt', 'plotPolar', 'plotAbsolute', 'generateRange', 'plotDerivative', 'offsetPoints',
      'plotLogistic', 'plotCubic', 'calculateStandardDeviation', 'calculateCorrelation', 'plotHyperbolic', 'calculateExponentialMovingAverage', 'plotGaussian',
      'exportPlotAsCSV', 'exportPlotAsMarkdown', 'exportPlotAsJSON', 'exportPlotAsHTML', 'exportPlotAsASCII', 'exportPlotAsSVG', 'exportPlotAsXML', 'exportPlotAsLaTeX',
      'exportPlotAsTXT', 'exportPlotAsR', 'plotScatter', 'plotParametric', 'plotBarChart', 'plotEllipse', 'plotPolynomial', 'plotModulatedSine', 'plotSpiral',
      'plotSigmoid', 'plotSinc', 'calculateDefiniteIntegral', 'plotCustom', 'solveQuadraticEquation', 'plotSinCosCombined', 'interpolateData', 'plotBezier',
      'plotLissajous', 'plotBessel', 'plotHyperbola', 'plotLemniscate', 'plotPower', 'plotReLU', 'movingMedian', 'plotInverse', 'cumulativeSum',
      'plotLogLog', 'boxPlot', 'plotDampedOscillation', 'plotRational', 'plotStep'
    ];
    console.log('Aligned with our mission, available plotting functions: ' + funcs.join(', '));
    return;
  }

  // If none of the above flags match, process plot parameters
  console.log(`Processing plot request with parameters: ${JSON.stringify(args)}`);
}

export async function loadExpress() {
  try {
    const module = await import('express');
    return module.default;
  } catch (err) {
    throw new Error('Failed to load express: ' + err.message);
  }
}

export async function loadReadline() {
  try {
    const module = await import('readline');
    return module;
  } catch (err) {
    throw new Error('Failed to load readline: ' + err.message);
  }
}

// Plotting Functions
export function plotQuadratic(a, b, c, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: a * x * x + b * x + c });
  }
  return result;
}

export function calculateDerivative(fn, x, h = 1e-5) {
  return (fn(x + h) - fn(x - h)) / (2 * h);
}

export function calculateArea(fn, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  let area = 0;
  for (let i = 0; i < steps; i++) {
    const x1 = xMin + i * dx;
    const x2 = xMin + (i + 1) * dx;
    area += 0.5 * (fn(x1) + fn(x2)) * dx;
  }
  return area;
}

export function plotLinear(m, b, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: m * x + b });
  }
  return result;
}

export function plotSine(amplitude, frequency, phase, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: amplitude * Math.sin(frequency * x + phase) });
  }
  return result;
}

export function plotCosine(amplitude, frequency, phase, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: amplitude * Math.cos(frequency * x + phase) });
  }
  return result;
}

export function rotatePoints(points, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return points.map(({ x, y }) => ({ x: x * cos - y * sin, y: x * sin + y * cos }));
}

export function plotExponential(a, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: Math.pow(a, x) });
  }
  return result;
}

export function plotLogarithmic(b, xMin, xMax, steps = 100) {
  if (xMin <= 0) {
    throw new Error('xMin must be greater than 0 for logarithmic plots');
  }
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: b * Math.log(x) });
  }
  return result;
}

export function movingAverage(data, windowSize) {
  if (windowSize <= 0) {
    throw new Error('Window size must be positive');
  }
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - Math.floor(windowSize / 2));
    const end = Math.min(data.length, i + Math.ceil(windowSize / 2));
    let sum = 0;
    let count = 0;
    for (let j = start; j < end; j++) {
      sum += data[j];
      count++;
    }
    result.push(sum / count);
  }
  return result;
}

export function plotTangent(amplitude, frequency, phase, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    let y = amplitude * Math.tan(frequency * x + phase);
    if (!isFinite(y)) {
      y = null;
    }
    result.push({ x, y });
  }
  return result;
}

export function reflectPoints(points, axis = 'y') {
  return points.map(({ x, y }) => {
    if (axis === 'y') return { x: -x, y };
    if (axis === 'x') return { x, y: -y };
    return { x, y };
  });
}

export function scalePoints(points, factor) {
  return points.map(({ x, y }) => ({ x: x * factor, y: y * factor }));
}

export function plotSqrt(xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: x < 0 ? null : Math.sqrt(x) });
  }
  return result;
}

export function plotPolar(radiusFn, thetaMin, thetaMax, steps = 100) {
  const dTheta = (thetaMax - thetaMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const theta = thetaMin + i * dTheta;
    const r = radiusFn(theta);
    result.push({ theta, r });
  }
  return result;
}

export function plotAbsolute(fn, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: Math.abs(fn(x)) });
  }
  return result;
}

export function generateRange(xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const range = [];
  for (let i = 0; i <= steps; i++) {
    range.push(xMin + i * dx);
  }
  return range;
}

export function plotDerivative(fn, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, derivative: calculateDerivative(fn, x) });
  }
  return result;
}

export function offsetPoints(points, offsetX, offsetY) {
  return points.map(({ x, y }) => ({ x: x + offsetX, y: y + offsetY }));
}

export function plotLogistic(L, k, x0, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: L / (1 + Math.exp(-k * (x - x0))) });
  }
  return result;
}

export function plotCubic(a, b, c, d, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d });
  }
  return result;
}

export function calculateStandardDeviation(data) {
  if (data.length === 0) return 0;
  const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
  const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
  return Math.sqrt(variance);
}

export function calculateCorrelation(dataX, dataY) {
  if (dataX.length !== dataY.length || dataX.length === 0) {
    throw new Error('Arrays must be of the same non-zero length');
  }
  const n = dataX.length;
  const meanX = dataX.reduce((sum, x) => sum + x, 0) / n;
  const meanY = dataY.reduce((sum, y) => sum + y, 0) / n;
  const numerator = dataX.reduce((acc, x, i) => acc + ((x - meanX) * (dataY[i] - meanY)), 0);
  const denominator = Math.sqrt(
    dataX.reduce((acc, x) => acc + Math.pow(x - meanX, 2), 0) *
    dataY.reduce((acc, y) => acc + Math.pow(y - meanY, 2), 0)
  );
  return denominator === 0 ? 0 : numerator / denominator;
}

export function plotHyperbolic(c, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: Math.abs(x) < 1e-10 ? null : c / x });
  }
  return result;
}

export function calculateExponentialMovingAverage(data, alpha = 0.5) {
  if (data.length === 0) return [];
  const result = [data[0]];
  for (let i = 1; i < data.length; i++) {
    result.push(alpha * data[i] + (1 - alpha) * result[i - 1]);
  }
  return result;
}

export function plotGaussian(amplitude, mean, sigma, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    const exponent = -Math.pow(x - mean, 2) / (2 * sigma * sigma);
    result.push({ x, y: amplitude * Math.exp(exponent) });
  }
  return result;
}

export function exportPlotAsCSV(points) {
  if (!points.length) return '';
  const keys = Object.keys(points[0]);
  let csv = keys.join(",") + "\n";
  csv += points.map(point => keys.map(k => point[k]).join(",")).join("\n");
  return csv;
}

export function exportPlotAsMarkdown(points) {
  if (!points.length) return '';
  const keys = Object.keys(points[0]);
  let md = "| " + keys.join(" | ") + " |\n";
  md += "| " + keys.map(() => '---').join(" | ") + " |\n";
  points.forEach(point => {
    md += "| " + keys.map(k => point[k]).join(" | ") + " |\n";
  });
  return md.trim();
}

export function exportPlotAsJSON(points) {
  return JSON.stringify(points, null, 2);
}

export function exportPlotAsHTML(points) {
  if (!points.length) return '';
  const keys = Object.keys(points[0]);
  let html = '<table><thead><tr>' + keys.map(k => '<th>' + k + '</th>').join('') + '</tr></thead><tbody>';
  points.forEach(point => {
    html += '<tr>' + keys.map(k => '<td>' + point[k] + '</td>').join('') + '</tr>';
  });
  html += '</tbody></table>';
  return html;
}

export function exportPlotAsASCII(points) {
  if (!points.length) return '';
  const keys = Object.keys(points[0]);
  let header = keys.map(k => k.toUpperCase().padEnd(10)).join(' | ');
  let separator = keys.map(() => "----------").join('-+-');
  let rows = points.map(point => keys.map(k => String(point[k]).padEnd(10)).join(' | '));
  return [header, separator, ...rows].join('\n');
}

export function exportPlotAsSVG(points) {
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300">';
  points.forEach((pt, index) => {
    svg += `<text x="10" y="${20 * (index + 1)}">${JSON.stringify(pt)}</text>`;
  });
  svg += '</svg>';
  return svg;
}

export function exportPlotAsXML(points) {
  let xml = '<points>';
  points.forEach(pt => {
    xml += '<point>';
    for (const key in pt) {
      xml += `<${key}>${pt[key]}</${key}>`;
    }
    xml += '</point>';
  });
  xml += '</points>';
  return xml;
}

export function exportPlotAsLaTeX(points) {
  if (!points.length) return '';
  const keys = Object.keys(points[0]);
  let latex = "\\begin{tabular}{|" + "c|".repeat(keys.length) + "}\n\\hline\n";
  latex += keys.map(k => k.toUpperCase()).join(" & ") + " \\ \n\\hline\n";
  points.forEach(point => {
    latex += keys.map(k => point[k]).join(" & ") + " \\ \n\\hline\n";
  });
  latex += "\\end{tabular}";
  return latex;
}

export function exportPlotAsTXT(points) {
  if (!points.length) return '';
  return points.map(pt => `x: ${pt.x}, y: ${pt.y}`).join('\n');
}

export function exportPlotAsR(points) {
  if (!points.length) return '';
  const keys = Object.keys(points[0]);
  let rOutput = keys.join(', ') + '\n';
  rOutput += points.map(pt => keys.map(k => pt[k]).join(', ')).join('\n');
  return rOutput;
}

export function plotScatter(count) {
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push({ x: Math.random() * 10, y: Math.random() * 10 });
  }
  return points;
}

export function plotBarChart(points) {
  return points.map(p => `x: ${p.x.toFixed(2)} | ${'*'.repeat(Math.max(1, Math.round(Math.abs(p.y))) )}`).join('\n');
}

export function plotParametric(xFn, yFn, tMin, tMax, steps = 100) {
  const dt = (tMax - tMin) / steps;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = tMin + i * dt;
    points.push({ t, x: xFn(t), y: yFn(t) });
  }
  return points;
}

export function solveQuadraticEquation(a, b, c) {
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    return [];
  }
  const sqrtDisc = Math.sqrt(discriminant);
  const root1 = (-b + sqrtDisc) / (2 * a);
  const root2 = (-b - sqrtDisc) / (2 * a);
  return [root1, root2];
}

export function plotSinCosCombined(amplitude, frequency, phase, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({
      x,
      sin: amplitude * Math.sin(frequency * x + phase),
      cos: amplitude * Math.cos(frequency * x + phase)
    });
  }
  return result;
}

export function interpolateData(xData, yData, x) {
  if (xData.length !== yData.length || xData.length === 0) {
    throw new Error('Data arrays must be of the same non-zero length');
  }
  if (x < xData[0] || x > xData[xData.length - 1]) {
    return null;
  }
  for (let i = 0; i < xData.length - 1; i++) {
    if (xData[i] <= x && x <= xData[i + 1]) {
      const t = (x - xData[i]) / (xData[i + 1] - xData[i]);
      return yData[i] * (1 - t) + yData[i + 1] * t;
    }
  }
  return null;
}

export function plotBezier(controlPoints, steps = 100) {
  if (!Array.isArray(controlPoints) || controlPoints.length === 0) return [];
  const bezierPoint = (points, t) => {
    while (points.length > 1) {
      const newPoints = [];
      for (let i = 0; i < points.length - 1; i++) {
        const x = points[i].x * (1 - t) + points[i + 1].x * t;
        const y = points[i].y * (1 - t) + points[i + 1].y * t;
        newPoints.push({ x, y });
      }
      points = newPoints;
    }
    return points[0];
  };
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    result.push(bezierPoint([...controlPoints], t));
  }
  return result;
}

export function plotLissajous(amplX, amplY, freqX, freqY, phase, tMin, tMax, steps = 100) {
  const dt = (tMax - tMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const t = tMin + i * dt;
    result.push({
      t,
      x: amplX * Math.sin(freqX * t + phase),
      y: amplY * Math.sin(freqY * t)
    });
  }
  return result;
}

export function plotBessel(order, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  let besselFn = math.besselJ || math.besselj;
  if (typeof besselFn !== 'function') {
    if (order === 0) {
      besselFn = function(x, order) {
        let sum = 0;
        const nTerms = 20;
        for (let m = 0; m < nTerms; m++) {
          sum += Math.pow(-1, m) / (factorial(m) * factorial(m)) * Math.pow(x / 2, 2 * m);
        }
        return sum;
      };
      function factorial(n) {
        return n <= 1 ? 1 : n * factorial(n - 1);
      }
    } else {
      throw new Error('Bessel function not found in mathjs and fallback only implemented for order 0');
    }
  }
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: besselFn(x, order) });
  }
  return result;
}

export function plotHyperbola(a, b, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    if (Math.abs(x) < a) {
      result.push({ x, yPositive: null, yNegative: null });
    } else {
      const yVal = b * Math.sqrt((x * x) / (a * a) - 1);
      result.push({ x, yPositive: yVal, yNegative: -yVal });
    }
  }
  return result;
}

export function plotLemniscate(a, tMin, tMax, steps = 100) {
  const dt = (tMax - tMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const t = tMin + i * dt;
    const cos2t = Math.cos(2 * t);
    let r = null;
    if (cos2t >= 0) {
      r = Math.sqrt(2 * a * a * cos2t);
    }
    result.push({ t, x: r !== null ? r * Math.cos(t) : null, y: r !== null ? r * Math.sin(t) : null });
  }
  return result;
}

export function plotPolynomial(coeffs, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  const degree = coeffs.length - 1;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    let y = 0;
    for (let j = 0; j < coeffs.length; j++) {
      y += coeffs[j] * Math.pow(x, degree - j);
    }
    result.push({ x, y });
  }
  return result;
}

export function plotModulatedSine(amplitude, frequency, modulation, phase, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: amplitude * Math.sin(frequency * x + phase) * (1 + modulation * Math.cos(x)) });
  }
  return result;
}

export function plotSpiral(spiralConstant, thetaMin, thetaMax, steps = 100) {
  const dtheta = (thetaMax - thetaMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const theta = thetaMin + i * dtheta;
    const r = spiralConstant * theta;
    result.push({ theta, x: r * Math.cos(theta), y: r * Math.sin(theta) });
  }
  return result;
}

export function plotSigmoid(xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: 1 / (1 + Math.exp(-x)) });
  }
  return result;
}

export function plotSinc(xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    const y = x === 0 ? 1 : Math.sin(x) / x;
    result.push({ x, y });
  }
  return result;
}

export function calculateDefiniteIntegral(fn, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  let area = 0;
  for (let i = 0; i < steps; i++) {
    const x1 = xMin + i * dx;
    const x2 = xMin + (i + 1) * dx;
    area += 0.5 * (fn(x1) + fn(x2)) * dx;
  }
  return area;
}

export function plotCustom() {
  return [];
}

export function plotEllipse(a, b, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const t = xMin + i * dx;
    result.push({ t, x: a * Math.cos(t), y: b * Math.sin(t) });
  }
  return result;
}

export function plotPower(power, coefficient, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: coefficient * Math.pow(x, power) });
  }
  return result;
}

export function plotReLU(m, b, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    const y = m * x + b;
    result.push({ x, y: y > 0 ? y : 0 });
  }
  return result;
}

export function movingMedian(data, windowSize = 3) {
  if (data.length === 0) return [];
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - Math.floor(windowSize / 2));
    const end = Math.min(data.length, i + Math.ceil(windowSize / 2));
    const window = data.slice(start, end);
    const sorted = [...window].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    result.push(median);
  }
  return result;
}

export function plotInverse(xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    let y = null;
    if (Math.abs(x) > 1e-10) {
      y = 1 / x;
    }
    result.push({ x, y });
  }
  return result;
}

export function cumulativeSum(data) {
  const result = [];
  let sum = 0;
  for (const num of data) {
    sum += num;
    result.push(sum);
  }
  return result;
}

export function plotLogLog(fn, xMin, xMax, steps = 100) {
  if (xMin <= 0 || xMax <= 0) {
    throw new Error('xMin and xMax must be greater than 0 for log-log plots');
  }
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    const fx = fn(x);
    if (fx <= 0) {
      result.push({ x: Math.log(x), y: null });
    } else {
      result.push({ x: Math.log(x), y: Math.log(fx) });
    }
  }
  return result;
}

export function boxPlot(data) {
  if (!data.length) return null;
  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const median = sorted.length % 2 !== 0 ? sorted[Math.floor(sorted.length / 2)] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  const Q1 = (() => {
    const lower = sorted.slice(0, Math.floor(sorted.length / 2));
    return lower.length % 2 !== 0 ? lower[Math.floor(lower.length / 2)] : (lower[lower.length / 2 - 1] + lower[lower.length / 2]) / 2;
  })();
  const Q3 = (() => {
    const upper = sorted.slice(Math.ceil(sorted.length / 2));
    return upper.length % 2 !== 0 ? upper[Math.floor(upper.length / 2)] : (upper[upper.length / 2 - 1] + upper[upper.length / 2]) / 2;
  })();
  return { min, Q1, median, Q3, max };
}

export function plotDampedOscillation(amplitude, decay, frequency, phase, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    const y = amplitude * Math.exp(-decay * x) * Math.sin(frequency * x + phase);
    result.push({ x, y });
  }
  return result;
}

export function plotRational(numer, denom, xMin, xMax, steps = 100) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    let y = null;
    if (denom(x) !== 0) {
      y = numer(x) / denom(x);
    }
    result.push({ x, y });
  }
  return result;
}

export function plotStep(xMin, xMax, steps = 10) {
  const dx = (xMax - xMin) / steps;
  const result = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    result.push({ x, y: x >= 0 ? 1 : 0 });
  }
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
