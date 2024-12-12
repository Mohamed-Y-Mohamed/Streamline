import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/index';

test('GET /projects should return 200', async () => {
  const res = await request(app).get('/projects');
  assert.strictEqual(res.status, 200);
});
