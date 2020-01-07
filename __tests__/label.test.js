require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Label = require('../lib/models/Label');
const Record = require('../lib/models/Record');

describe('label routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let label;
  let record;
  
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
      title: 'Rocket to Russia',
      label: label._id,
      artist: 'Ramones',
      artist_id: 135478,
      master_id: 39371,
      year: 1977,
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can create a new label', async() => {
    return request(app)
      .post('/api/v1/labels')
      .send({
        name: 'Arbitrary Minds',
        address: [ 
          { city: 'Northampton' },
          { state: 'Massachusetts' },
          { country: 'USA' }
        ]
      })
      .then(res => {expect(res.body).toEqual({
        _id: expect.any(String),
        name: 'Arbitrary Minds',
        address: [ 
          {  city: 'Northampton' },
          {  state: 'Massachusetts' },
          {  country: 'USA' }
        ],
        __v: 0,
        id: expect.any(String),
      });
      });
  });

  it('gets all labels', () => {
    return request(app)
      .get('/api/v1/labels')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          id: expect.any(String),
          name: 'Arbitrary Signs',
        });    
      });
  });
  it('gets a label by id', () => {
    return request(app)
      .get(`/api/v1/labels/${label.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: label.id,
          id: expect.any(String),
          name: 'Arbitrary Signs',
          address: [ 
            {  city: 'Northampton' },
            {  state: 'Massachusetts' },
            {  country: 'USA' }
          ],
          __v: 0, 
          records: [{ title: 'Rocket to Russia',
            _id: record.id,
            label: label.id,
            artist: 'Ramones',
            artist_id: 135478,
            master_id: 39371,
            year: 1977, 
            personel: [],
            __v: 0
          }]
        });    
      });
  });
  it('gets a label by name', () => {
    return request(app)
      .get(`/api/v1/labels/name/${label.name}`)
      .then(res => {
        expect(res.body).toEqual([{
          _id: label.id,
          id: expect.any(String),
          name: 'Arbitrary Signs',
          address: [ 
            {  city: 'Northampton' },
            {  state: 'Massachusetts' },
            {  country: 'USA' }
          ],
          __v: 0, 
          records: [{ title: 'Rocket to Russia',
            _id: record.id,
            label: label.id,
            artist: 'Ramones',
            artist_id: 135478,
            master_id: 39371,
            year: 1977, 
            personel: [],
            __v: 0
          }]
        }]);       
      });
  });
});

