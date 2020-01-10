const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  label: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Label',
    required: true
  },
  artist: String,
  discogsArtistId: Number,
  discogsMasterId: Number,
  year: Number,
  personnel: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }]
});



module.exports = mongoose.model('Record', schema);
