require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Label = require('../lib/models/Label');

describe('label routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let label;
  beforeEach(async() => {
    label = await Label.create({
      name: 'Arbitrary Signs',
      address: [ 
        { city: 'Northampton' },
        { state: 'Massachusetts' },
        { country: 'USA' }
      ]
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
        __v: 0
      });
      });
  });

  it('gets all labels', () => {
    return request(app)
      .get('/api/v1/labels')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          name: 'Arbitrary Signs',
          address: [ 
            {  city: 'Northampton' },
            {  state: 'Massachusetts' },
            {  country: 'USA' }
          ],
          __v: 0
        });    
      });
  });
  it('gets a label by id', () => {
    return request(app)
      .get(`/api/v1/labels/${label.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: label.id,
          name: 'Arbitrary Signs',
          address: [ 
            {  city: 'Northampton' },
            {  state: 'Massachusetts' },
            {  country: 'USA' }
          ],
          __v: 0
        });    
      });

  });
});

