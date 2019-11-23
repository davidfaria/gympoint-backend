import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

beforeEach(async () => {
  await truncate();
});

describe('Session', () => {
  it('Should be able to return token with authentication at session', async () => {
    const user = await factory.create('User');

    const { email, password } = user;

    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Should be able to validate session input data', async () => {
    const credentials = {
      email: 'davidfaria89@gmail.com',
      // password: ''
    };

    const response = await request(app)
      .post('/sessions')
      .send(credentials);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation fails');
  });

  it('Verify Authentication with Unregistered User', async () => {
    const credentials = {
      email: 'davidfaria89@gmail.com',
      password: '12345',
    };

    const response = await request(app)
      .post('/sessions')
      .send(credentials);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('User not found');
  });

  it('Should be not able to authenticate with password invalid', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'outrasenhaInvalida',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Password does not match');
  });
});
