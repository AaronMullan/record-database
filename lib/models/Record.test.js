const mongoose = require('mongoose');
const Record = require('./Record');
const Label = require('./Label');

describe('Record model', () => {


  it('has a required title', () => {
    const record = new Record({});
    const { errors } = record.validateSync();
    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('has a required label', () => {
    const record = new Record({});
    const { errors } = record.validateSync();
    expect(errors.label.message).toEqual('Path `label` is required.');
  });
  it('creates a record', async() => {
    const label = await new Label({
      name: 'Arbitrary Signs',
      address: [ 
        { city: 'Northampton' },
        { state: 'Massachusetts' },
        { country: 'USA' }
      ]
    });
    const record = new Record({
      title: 'Rocket to Russia',
      label: label._id,
      artist: 'Ramones',
      artist_id: 135478,
      discogsMasterId: 39371,
      year: 1977,
      
      
    });
    expect(record.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'Rocket to Russia',
      label: label._id,
      artist: 'Ramones',
      artist_id: 135478,
      discogsMasterId: 39371,
      year: 1977,
      personnel: []
    });
  });
});
