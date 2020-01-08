require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Record = require('../lib/models/Record');
const Label = require('../lib/models/Label');
const Artist = require('../lib/models/Artist');


describe('record routes', () => {
  beforeAll(() => {
    connect();
  });

  let label;
  let record;
  let artist;
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
      name: 'Jaki Liebezeit',
      instrument: 'drums',
      discogsID: 48582,
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
        label: label._id,
        artist: 'Can',
        artist_id: 17203,
        master_id: 11693,
        personnel: [artist._id],
        year: 1972
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Ege Bamyasi',
          label: label._id.toString(),
          artist: 'Can',
          artist_id: 17203,
          master_id: 11693,
          personnel: [artist._id.toString()],
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
          label: label._id.toString(),
          artist: 'Can',
          artist_id: 17203,
          master_id: 11693,
          personnel:[],
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
          label: label._id.toString(),
          artist: 'Can',
          artist_id: 17203,
          master_id: 11693,
          personnel:[],
          year: 1972,
          __v: 0
        });
      });
  });
  it('updates a record', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/signup')
      .send({ email: 'tes@tet.com', password: 'password' });
    return agent
      .patch(`/api/v1/records/${record.id}`)
      .send({ title: 'Monster Movie' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Monster Movie',
          label: label._id.toString(),
          artist: 'Can',
          artist_id: 17203,
          master_id: 11693,
          personnel:[],
          year: 1972,
          __v: 0
        });
      });
  });
  it('deletes a record', async() => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({ email: 'tet@tet.com', password: 'password' });
    return agent
      .delete(`/api/v1/records/${record.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id:record.id,
          title: 'Ege Bamyasi',
          label: label._id.toString(),
          artist: 'Can',
          artist_id: 17203,
          master_id: 11693,
          personnel:[],
          year: 1972,
          __v: 0
        });
      });
  });
});
