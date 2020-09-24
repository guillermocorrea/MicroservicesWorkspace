import request from 'supertest';
import { app } from '../../app';

test('it returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

test('it returns a 400 when the email is invalid', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'wrong email',
      password: 'password',
    })
    .expect(400);
});

test('it returns a 400 when the password is invalid', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'wrong@email.com',
      password: '',
    })
    .expect(400);
});

test('it returns a 400 with missing email and password', async () => {
  await request(app).post('/api/users/signup').send({}).expect(400);
});

test('it dissallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

test('it should set a cookie after succesful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
