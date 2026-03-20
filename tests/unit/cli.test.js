// SPDX-License-Identifier: MIT
import { test, expect } from 'vitest';
import { execFileSync } from 'child_process';

test('cli --help prints usage', () => {
  const out = execFileSync('node', ['src/lib/main.js', '--help'], { encoding: 'utf8' });
  expect(out).toContain('Usage');
});

// Basic CLI run that writes a file (SVG)
test('cli can generate svg file', async () => {
  const out = 'tests/unit/cli_out.svg';
  try {
    execFileSync('node', ['src/lib/main.js', '--expression', 'y=x', '--range', '0:1:2', '--file', out], { encoding: 'utf8' });
    // If no error, file should exist
    const fs = await import('fs');
    const exists = fs.existsSync(out);
    expect(exists).toBe(true);
    const content = fs.readFileSync(out, 'utf8');
    expect(content).toContain('<polyline');
  } finally {
    try { const fs = await import('fs'); fs.existsSync(out) && fs.unlinkSync(out); } catch (e) {}
  }
});
