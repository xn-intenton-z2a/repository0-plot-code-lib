// SPDX-License-Identifier: MIT
import { test, expect } from 'vitest';
import { run } from '../../src/lib/main.js';

test('run function exists and returns 0 for --help', async () => {
  const code = await run(['--help']);
  expect(code).toBe(0);
});

test('run returns non-zero for invalid args', async () => {
  const code = await run(['--expression', 'y=+++', '--range', '1:1:2', '--file', 'out.svg']);
  expect(code).not.toBe(0);
});
