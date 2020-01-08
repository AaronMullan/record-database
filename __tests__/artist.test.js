require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Artist = require('../lib/models/Artist');

describe('artist routes', () => {
  beforeAll(() => {
    connect();
  });
  let artist;
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  beforeEach(async() => {
    artist = await Artist.create({
      name: 'Sister Rosetta Tharpe',
      instrument: 'guitar',
      discogsID: 322295,
    });
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can create a new artist', async() => {
    return request(app)
      .post('/api/v1/artists')
      .send({
        name: 'Sarah Louise',
        instrument: 'guitar',
        discogsID: 4289077
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Sarah Louise',
          instrument: 'guitar',
          discogsID: 4289077,
          __v: 0
        });
      });
  });
  it('can get all artists', () => {
    return request(app)
      .get('/api/v1/artists')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          name: 'Sister Rosetta Tharpe',
          discogsID: 322295,
        });
      });
  });
  it('can find an artist by id', () => {
    return request(app)
      .get(`/api/v1/artists/${artist.id}`)
      .then(res =>{
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Sister Rosetta Tharpe',
          instrument: 'guitar',
          discogsID: 322295,
          __v: 0
        });
      });
  });
});
