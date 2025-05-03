import { describe, test, expect, vi } from 'vitest';
import { main } from '@src/lib/main.js';
import fs from 'fs';

// Helper to capture console output
function captureOutput(callback) {
  const log = [];
  const originalLog = console.log;
  console.log = (msg) => log.push(msg);
  try {
    callback();
  } finally {
    console.log = originalLog;
  }
  return log;
}

// Clean up files created during tests
function removeFile(filepath) {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
}

// Tests for refactored CLI argument parsing
describe('CLI Dual Output Functionality', () => {
  test('should output text preview when --file is not provided', () => {
    const output = captureOutput(() => {
      main(['--expression', 'y=cos(x)', '--range', 'x=0:10']);
    });
    expect(output[0]).toBe('Text Preview of Plot:');
    expect(output.find(line => line.includes('x:'))).toBeDefined();
  });

  test('should generate SVG file when --file with .svg is provided', () => {
    const testSvg = 'test-output.svg';
    removeFile(testSvg);
    const output = captureOutput(() => {
      main(['--expression', 'y=sin(x)', '--range', 'x=-10:10', '--file', testSvg]);
    });
    expect(fs.existsSync(testSvg)).toBe(true);
    const fileContent = fs.readFileSync(testSvg, 'utf-8');
    expect(fileContent).toContain('<svg');
    expect(output[0]).toContain('SVG plot generated');
    removeFile(testSvg);
  });

  test('should generate PNG file when --file with .png is provided', () => {
    const testPng = 'test-output.png';
    removeFile(testPng);
    const output = captureOutput(() => {
      main(['--expression', 'y=sin(x)', '--range', 'x=-5:5', '--file', testPng]);
    });
    expect(fs.existsSync(testPng)).toBe(true);
    const fileContent = fs.readFileSync(testPng, 'utf-8');
    expect(fileContent).toContain('PNG PLOT DATA');
    expect(output[0]).toContain('PNG plot generated');
    removeFile(testPng);
  });

  test('should error when mandatory parameters are missing', () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`process.exit: ${code}`); });
    expect(() => {
      main(['--range', 'x=0:10']);
    }).toThrow(/process.exit: 1/);
    expect(() => {
      main(['--expression', 'y=sin(x)']);
    }).toThrow(/process.exit: 1/);
    spy.mockRestore();
  });

  test('should error with invalid range format', () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`process.exit: ${code}`); });
    expect(() => {
      main(['--expression', 'y=sin(x)', '--range', 'invalid-range']);
    }).toThrow(/process.exit: 1/);
    spy.mockRestore();
  });

  test('should error with unsupported file extension', () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`process.exit: ${code}`); });
    expect(() => {
      main(['--expression', 'y=sin(x)', '--range', 'x=0:10', '--file', 'output.jpg']);
    }).toThrow(/process.exit: 1/);
    spy.mockRestore();
  });

  test('should error with unsupported expression', () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`process.exit: ${code}`); });
    expect(() => {
      main(['--expression', 'y=tan(x)', '--range', 'x=0:10']);
    }).toThrow(/process.exit: 1/);
    spy.mockRestore();
  });
});

// Tests for custom dimension options
describe('Custom Dimension Options', () => {
  test('should generate SVG with custom width and height when specified', () => {
    const testSvg = 'test-dimensions.svg';
    removeFile(testSvg);
    const output = captureOutput(() => {
      main(['--expression', 'y=sin(x)', '--range', 'x=-10:10', '--file', testSvg, '--width', '800', '--height', '600']);
    });
    expect(fs.existsSync(testSvg)).toBe(true);
    const fileContent = fs.readFileSync(testSvg, 'utf-8');
    expect(fileContent).toContain('width="800"');
    expect(fileContent).toContain('height="600"');
    removeFile(testSvg);
  });

  test('should generate PNG with custom dimensions in placeholder text', () => {
    const testPng = 'test-dimensions.png';
    removeFile(testPng);
    const output = captureOutput(() => {
      main(['--expression', 'y=cos(x)', '--range', 'x=0:10', '--file', testPng, '--width', '1024', '--height', '768']);
    });
    expect(fs.existsSync(testPng)).toBe(true);
    const fileContent = fs.readFileSync(testPng, 'utf-8');
    expect(fileContent).toContain('Width: 1024');
    expect(fileContent).toContain('Height: 768');
    removeFile(testPng);
  });

  test('should error with invalid non-numeric width', () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`process.exit: ${code}`); });
    expect(() => {
      main(['--expression', 'y=sin(x)', '--range', 'x=-10:10', '--width', 'abc']);
    }).toThrow(/process.exit: 1/);
    spy.mockRestore();
  });

  test('should error with zero or negative height', () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`process.exit: ${code}`); });
    expect(() => {
      main(['--expression', 'y=sin(x)', '--range', 'x=-10:10', '--height', '-300']);
    }).toThrow(/process.exit: 1/);
    expect(() => {
      main(['--expression', 'y=sin(x)', '--range', 'x=-10:10', '--height', '0']);
    }).toThrow(/process.exit: 1/);
    spy.mockRestore();
  });
});
