const mongoose = require('mongoose');
const Record = require('./Record');

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
  it('creates a record', () => {
    const record = new Record({
      title: 'Rocket to Russia',
      label: 'Sire',
      artist: 'Ramones',
      artist_id: 135478,
      master_id: 39371,
      year: 1977,
      
      
    });
    expect(record.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'Rocket to Russia',
      label: 'Sire',
      artist: 'Ramones',
      artist_id: 135478,
      master_id: 39371,
      year: 1977,
      personel: []
      
      
    });
  });
});
