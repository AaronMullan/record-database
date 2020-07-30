require('dotenv').config();
const { getLabel, getLabels } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('label routes', () => {

  it('can create a new label', () => {
    return request(app)
      .post('/api/v1/labels')
      .send({
        name: 'Arbitrary Minds',
        address: [ 
          { city: 'Borthampton' },
          { state: 'Massachusetts' },
          { country: 'USA' }
        ]
      })
      .then(res => {expect(res.body).toEqual({
        _id: expect.any(String),
        name: 'Arbitrary Minds',
        address: [ 
          {  city: 'Borthampton' },
          {  state: 'Massachusetts' },
          {  country: 'USA' }
        ],
        __v: 0,
        id: expect.any(String),
      });
      });
  });

  it('gets all labels', async() => {
    const labels = await getLabels();

    return request(app)
      .get('/api/v1/labels')
      .then(res => {
        expect(res.body).toHaveLength(labels.length);
        labels.forEach(label => {
          expect(res.body).toContainEqual({
            _id: label.id,
            id: label.id,
            name: label.name

          });
        });    
      });
  });
  it('gets a label by id', async() => {
    const label = await getLabel();
    return request(app)
      .get(`/api/v1/labels/${label._id}`)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: label.id,
          id: label.id,
          name: label.name,
          address: label.address,
          records: expect.any(Array)
        });    
      });
  });
});

