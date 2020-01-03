require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');


describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can sign up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'bongo@bongo.com', password: 'abc123' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'bongo@bongo.com',
          __v:0
        });
      });
  });
  it('can login a user', async() => {
    const user = await User.create({ email: 'bingo@bongo.com', password: 'admin' });
    return request(app)
      .post('/api/v1/auth/login')
      .send ({ email: 'bingo@bongo.com', password: 'admin' })
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          email: 'bingo@bongo.com',
          __v: 0
        });
      });
  });
});
