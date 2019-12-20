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

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let record;
  beforeEach(async() => {
    record = await Record.create({
      title: 'Ege Bamyasi',
      artist: 'Can',
      artist_url: 'https://api.discogs.com/artists/17203',
      versions_url: 'https://api.discogs.com/masters/11693/versions',
      year: 1972
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can create a new record', () => {
    return request(app)
      .post('/api/v1/records')
      .send({
        title: 'Ege Bamyasi',
        artist: 'Can',
        artist_url: 'https://api.discogs.com/artists/17203',
        versions_url: 'https://api.discogs.com/masters/11693/versions',
        year: 1972
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Ege Bamyasi',
          artist: 'Can',
          artist_url: 'https://api.discogs.com/artists/17203',
          versions_url: 'https://api.discogs.com/masters/11693/versions',
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
          artist_url: 'https://api.discogs.com/artists/17203',
          versions_url: 'https://api.discogs.com/masters/11693/versions',
          year: 1972,
          __v: 0
        });
      });
  });
});
