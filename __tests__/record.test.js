require('dotenv').config();
const { getRecord, getRecords } = require('../lib/helpers/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('record routes', () => {

  it('can create a new record', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/signup')
      .send({ email: 'test@tet.com', password: 'password' });
    return agent
      .post('/api/v1/records')
      .send({
        title: 'Ege Bamyasi',
        label: '5e1775bc720ed2a68425d619',
        artist: 'Can',
        discogsArtistId: 17203,
        discogsMasterId: 11693,
        personnel: ['5e1775505fe617a641bbe69b'],
        year: 1972
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Ege Bamyasi',
          label: expect.any(String),
          artist: 'Can',
          discogsArtistId: 17203,
          discogsMasterId: 11693,
          personnel: ['5e1775505fe617a641bbe69b'],
          year: 1972,
          __v: 0
        });
      });
  });
  it('gets all records', async() => {
    const records = await getRecords();

    return request(app)
      .get('/api/v1/records')
      .then(res => {
        expect(res.body).toHaveLength(records.length);
        records.forEach(record => {
          expect(res.body).toContainEqual(record);
        });
      });
  });
  it('gets a record by id', async() => {
    const record = await getRecord();
    return request(app)
      .get(`/api/v1/records/${record._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: record._id,
          title: record.title,
          label: record.label,
          year: record.year,
          artist: record.artist,
          personnel: expect.any(Array),
          discogsMasterId: record.discogsMasterId,
          __v: 0
        });
      });
  });
  it('updates a record', async() => {
    const record = await getRecord();
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/signup')
      .send({ email: 'tes@tet.com', password: 'password' });
    return agent
      .patch(`/api/v1/records/${record._id}`)
      .send({ title: 'Monster Movie' })
      .then(res => {
        expect(res.body).toEqual({
          _id: record._id,
          title: 'Monster Movie',
          label: record.label,
          year: record.year,
          artist: record.artist,
          personnel: expect.any(Array),
          discogsMasterId: record.discogsMasterId,
          __v: 0
        });
      });
  });
  it('deletes a record', async() => {
    const record = await getRecord();
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({ email: 'tet@tet.com', password: 'password' });
    return agent
      .delete(`/api/v1/records/${record._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: record._id,
          title: record.title,
          label: record.label,
          year: record.year,
          artist: record.artist,
          personnel: expect.any(Array),
          discogsMasterId: record.discogsMasterId,
          __v: 0
        });
      });
  });
});
