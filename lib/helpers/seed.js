const chance = require('chance').Chance();
const Label = require('../models/Label');
const Record = require('../models/Record');
const Artist = require('../models/Artist');
const User = require('../models/User');
const Note = require('../models/Note');

module.exports = async({ label = 10, records = 50, artists = 100, users = 25,  notes = 200 } = {}) => {
  const labels = await Label.create([...Array(label)].map(() => ({
    name: chance.pickone(['Arbitrary Signs', 'Ecstatic Peace', 'Woodsist', 'All Tomorrow\'s Parties']),
    address: [ 
      { city: chance.last() + 'ville' },
      { state: 'Oregon' },
      { country: 'USA' }
    ] 
  })));
  const createdArtists = await Artist.create([...Array(artists)].map(() => ({
    name: chance.name(),
    instrument: chance.pickone(['guitar', 'bass', 'drums', 'keyboards', 'vocals', 'hunt horn']),
    discogsID: chance.integer(),
    dateofBirth: chance.birthday(),
    dateofDeath: chance.birthday(),
  })));
  const createdRecords = await Record.create([...Array(records)].map(() => ({
    title: chance.sentence(),
    label: chance.pickone(labels.map(label => label._id)),
    personnel: [chance.pickset(createdArtists.map(artist => artist._id), 3)]
    
  })));
  const createdUsers = await User.create([...Array(users)].map(() => ({
    email: chance.name() + '@aol.com',
    passwordHash: chance.string()
  })));
  await Note.create([...Array(notes)].map(() => ({
    user: chance.pickone(createdUsers.map(user => user.id)),
    discogsMasterId: chance.pickone(createdRecords.map(record => record.discogsID)),
    discogsVersionId: chance.integer(),
    condition: chance.pickone(['M', 'Mint', 'NM', 'Near Mint', 'M-', 'VG+', 'VG', 'Very Good', 'G+', 'G', 'Good', 'P', 'Poor', 'F', 'Fair']),
    notes: chance.sentence()
  })));
};
