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

// Tests for CLI Dual Output Functionality
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
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`Error: --expression and --range are required arguments.\n${'Usage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]'}`); });
    expect(() => {
      main(['--range', 'x=0:10']);
    }).toThrow(/Usage: node src\/lib\/main\.js/);
    expect(() => {
      main(['--expression', 'y=sin(x)']);
    }).toThrow(/Usage: node src\/lib\/main\.js/);
    spy.mockRestore();
  });

  test('should error with invalid range format', () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`Error: invalid range format for part 'invalid-range'. Expected format axis=low:high. Example: x=-10:10\nUsage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]`); });
    expect(() => {
      main(['--expression', 'y=sin(x)', '--range', 'invalid-range']);
    }).toThrow(/Usage: node src\/lib\/main\.js/);
    spy.mockRestore();
  });

  test('should error with unsupported file extension', () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`Error: --file must have a .svg or .png extension. Example: output.svg or output.png\nUsage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]`); });
    expect(() => {
      main(['--expression', 'y=sin(x)', '--range', 'x=0:10', '--file', 'output.jpg']);
    }).toThrow(/Usage: node src\/lib\/main\.js/);
    spy.mockRestore();
  });

  test('should error with unsupported expression', () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`Error: Unsupported expression 'y=tan(x)'. Supported expressions: y=sin(x) and y=cos(x). Example: y=sin(x)\nUsage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]`); });
    expect(() => {
      main(['--expression', 'y=tan(x)', '--range', 'x=0:10']);
    }).toThrow(/Usage: node src\/lib\/main\.js/);
    spy.mockRestore();
  });

  test('should include usage guidance in error message when mandatory parameters are missing', () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`Error: --expression and --range are required arguments.\nUsage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]`); });
    try {
      main(['--range', 'x=0:10']);
    } catch (e) {
      expect(e.message).toContain('Usage: node src/lib/main.js');
    }
    spy.mockRestore();
  });

  // New tests for help flag and no-argument scenario
  test('should display usage message when help flag is provided (--help)', () => {
    const output = captureOutput(() => {
      try {
        main(['--help']);
      } catch (e) {}
    });
    expect(output[0]).toContain('Usage: node src/lib/main.js');
    expect(output[0]).toContain('Required parameters: --expression, --range');
  });

  test('should display usage message when help flag is provided (-h)', () => {
    const output = captureOutput(() => {
      try {
        main(['-h']);
      } catch (e) {}
    });
    expect(output[0]).toContain('Usage: node src/lib/main.js');
    expect(output[0]).toContain('Required parameters: --expression, --range');
  });

  test('should display usage message when no arguments are provided', () => {
    const output = captureOutput(() => {
      main([]);
    });
    expect(output[0]).toContain('Usage: node src/lib/main.js');
    expect(output[0]).toContain('Required parameters: --expression, --range');
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
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`Error: --width must be a positive number.\nUsage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]`); });
    expect(() => {
      main(['--expression', 'y=sin(x)', '--range', 'x=-10:10', '--width', 'abc']);
    }).toThrow(/Usage: node src\/lib\/main\.js/);
    spy.mockRestore();
  });

  test('should error with zero or negative height', () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`Error: --height must be a positive number.\nUsage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]`); });
    expect(() => {
      main(['--expression', 'y=sin(x)', '--range', 'x=-10:10', '--height', '-300']);
    }).toThrow(/Usage: node src\/lib\/main\.js/);
    expect(() => {
      main(['--expression', 'y=sin(x)', '--range', 'x=-10:10', '--height', '0']);
    }).toThrow(/Usage: node src\/lib\/main\.js/);
    spy.mockRestore();
  });
});
