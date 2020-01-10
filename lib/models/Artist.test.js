const mongoose = require('mongoose');
const Artist = require('./Artist');

describe('Artist model', () => {
  it('has a required name', () => {
    const artist = new Artist({});
    const { errors } = artist.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('creates an artist', () => {
    const dateofBirth = new Date('1938-05-26');
    const dateofDeath = new Date('2017-01-22');
    const artist = new Artist({
      name: 'Jaki Liebezeit',
      instrument: 'drums',
      discogsId: 48582,
      dateofBirth,
      dateofDeath
    });
    expect(artist.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      id: expect.any(String),
      name: 'Jaki Liebezeit',
      instrument: 'drums',
      discogsId: 48582,
      dateofBirth,
      dateofDeath,
    });
  });
});
