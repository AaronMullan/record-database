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
  beforeEach(async() => {
    artist = await Artist.create({
      name: 'Sister Rosetta Tharpe',
      instrument: 'guitar',
      discogsID: 322295,
      dateofBirth: '1915-03-20',
      dateofDeath: '1973-10-08'
    });
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can create a new artist', async() => {
    return request(app)
      .post('/api/v1/artists')
      .send({
        name: 'Sister Rosetta Tharpe',
        instrument: 'guitar',
        discogsID: 322295,
        
      })
      .then(res => {expect(res.body).toEqual({
        _id: expect.any(String),
        name: 'Sister Rosetta Tharpe',
        instrument: 'guitar',
        discogsID: 322295,
        __v: 0
      });
      });
  });
});
