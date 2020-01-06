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

  let label;
  beforeEach(async() => {
    label = await Label.create({
      name: 'Arbitrary Signs',
      city: 'Northampton',
      state: 'Massachusetts',
      country: 'USA'
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
          {  _id: expect.any(String), city: 'Northampton' },
          {  _id: expect.any(String), state: 'Massachusetts' },
          {  _id: expect.any(String), country: 'USA' }
        ],
        __v: 0
      });
      });
  });
});
