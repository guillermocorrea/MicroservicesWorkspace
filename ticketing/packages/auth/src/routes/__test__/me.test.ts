import { currentUser } from './../../middlewares/current-user';
import request from 'supertest';
import { app } from '../../app';

describe('me', () => {
  test('it should return 401 when the user is not authenticated', async () => {
    await request(app).get('/api/users/me').send().expect(401);
  });

  test('it should return user details when the user is authenticated', async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .get('/api/users/me')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
  });
});
