const mongoose = require('mongoose');
const Note = require('./Note');

describe('Note Model', () => {
  it('has a required user', () => {
    const note = new Note({});
    const { errors } = note.validateSync();
    expect(errors.user.message).toEqual('Path `user` is required.');
  });
  it('has a required Discogs master id', () => {
    const note = new Note({});
    const { errors } = note.validateSync();
    expect(errors.discogsMasterId.message).toEqual('Path `discogsMasterId` is required.');
  });
  it('creates a note', () => {
    const note = new Note({
      user: 'zingo@zongo.com',
      discogsMasterId: 64011,
      discogsVersionId: 13197278,
      condition: 'VG+',
      notes: 'Better than the Stooges? Let\'s discuss.'
    });
  });
});
