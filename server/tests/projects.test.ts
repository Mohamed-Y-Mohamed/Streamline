import request from 'supertest';
import app from '../src/index';

describe('Projects API', () => {
  it('GET /projects should return a 200 status', async () => {
    const response = await request(app).get('/projects');
    expect(response.status).toBe(200);
  });

  it('POST /projects should return a 200 status', async () => {
    const response = await request(app)
      .post('/projects')
      .send({ name: 'Test Project', description: 'Test Description' });
    expect(response.status).toBe(200);
  });
});
