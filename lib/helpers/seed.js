const chance = require('chance').Chance();
const Label = require('../models/Label');
const Record = require('../models/Record');
const Artist = require('../models/Artist');
const User = require('../models/User');

module.exports = async({ label = 10, records = 50, artists = 100, users = 25 } = {}) => {
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
    instrument: chance.pickone(['guitar', 'bass', 'drums', 'keyboards', 'vocals', 'hunt horn',]),
    discogsID: chance.integer(),
    dateofBirth: chance.birthday(),
    dateofDeath: chance.birthday(),
  })));
  const createdRecords = await Record.create([...Array(records)].map(() => ({
    title: chance.sentence(),
    label: chance.pickone(labels.map(label => label._id)),
    personnel: [chance.pickset(createdArtists.map(artist => artist._id), 3)]
    
  })));
  await User.create([...Array(users)].map(() => ({
    email: chance.name() + '@aol.com',
    passwordHash: chance.string()
  })))
};