const mongoose = require('mongoose');
const Note = require('./Note');
const User = require('./User');
const connect = require('..//utils/connect');

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
  it('creates a note', async() => {
    const user = await new User({ email: 'binoo@bongo.com', password: 'admin' });
    const note = new Note({
      user: user._id,
      discogsMasterId: 64011,
      discogsVersionId: 13197278,
      condition: 'VG+',
      notes: 'Better than the Stooges? Let\'s discuss.'
    });
    expect(note.toJSON()).toEqual({
      _id: note._id,
      user: user._id,
      discogsMasterId: 64011,
      discogsVersionId: 13197278,
      condition: 'VG+',
      notes: 'Better than the Stooges? Let\'s discuss.'
    });
  });
});
