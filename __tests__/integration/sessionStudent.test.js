import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

beforeEach(async () => {
  await truncate();
});

describe('Session Student', () => {
  it('Should be able to return student after login by ID', async () => {
    const student = await factory.create('Student');

    const { id } = student;
    const response = await request(app)
      .post('/sessionsStudent')
      .send({ id });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(student.name);
  });
});
