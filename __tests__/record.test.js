require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Record = require('../lib/models/Record');


describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  
  let record;
  beforeEach(async() => {
    record = await Record.create({
      title: 'Ege Bamyasi',
      artist: 'Can',
      artist_id: 17203,
      master_id: 11693,
      year: 1972
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can create a new record', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/signup')
      .send({ email: 'test@tet.com', password: 'password' });
    return agent
      .post('/api/v1/records')
      .send({
        title: 'Ege Bamyasi',
        artist: 'Can',
        artist_id: 17203,
        master_id: 11693,
        year: 1972
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Ege Bamyasi',
          artist: 'Can',
          artist_id: 17203,
          master_id: 11693,
          year: 1972,
          __v: 0
        });
      });
  });
  it('gets a record by id', () => {
    return request(app)
      .get(`/api/v1/records/${record.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id:record.id,
          title: 'Ege Bamyasi',
          artist: 'Can',
          artist_id: 17203,
          master_id: 11693,
          year: 1972,
          __v: 0
        });
      });
  });
  it('gets all records', () => {
    return request(app)
      .get('/api/v1/records')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          title: 'Ege Bamyasi',
          artist: 'Can',
          artist_id: 17203,
          master_id: 11693,
          year: 1972,
          __v: 0
        });
      });
  });
  it('updates a record', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/signup')
      .send({ email: 'test@tet.com', password: 'password' });
    return agent
      .patch(`/api/v1/records/${record.id}`)
      .send({ title: 'Monster Movie' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Monster Movie',
          artist: 'Can',
          artist_id: 17203,
          master_id: 11693,
          year: 1972,
          __v: 0
        });
      });
  });
  it('deletes a record', async() => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({ email: 'test@tet.com', password: 'password' });
    return agent
      .delete(`/api/v1/records/${record.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id:record.id,
          title: 'Ege Bamyasi',
          artist: 'Can',
          artist_id: 17203,
          master_id: 11693,
          year: 1972,
          __v: 0
        });
      });
  });
});
