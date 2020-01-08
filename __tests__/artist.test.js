require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Artist = require('../lib/models/Artist');
const Record = require('../lib/models/Record');
const Label = require('../lib/models/Label');

describe('artist routes', () => {
  beforeAll(() => {
    connect();
  });
  let artist;
  let record;
  let label;
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  beforeEach(async() => {
    label = await Label.create({
      name: 'Arbitrary Signs',
      address: [ 
        { city: 'Northampton' },
        { state: 'Massachusetts' },
        { country: 'USA' }
      ]
    });
    record = await Record.create({
      title: 'Ege Bamyasi',
      artist: 'Can',
      label: label._id,
      artist_id: 17203,
      master_id: 11693,
      year: 1972
    });
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
          id: expect.any(String),
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
          id: expect.any(String),
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
          id: expect.any(String),
          name: 'Sister Rosetta Tharpe',
          instrument: 'guitar',
          discogsID: 322295,
          records: [],
          __v: 0
        });
      });
  });
});
