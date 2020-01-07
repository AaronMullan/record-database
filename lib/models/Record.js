const mongoose = require('mongoose');

const personelSchema = new mongoose.Schema({
  personel: {
    type:mongoose.Schema.Types.String,
    ref: 'Artist'
  }
});


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
  artist_id: Number,
  master_id: Number,
  year: Number,
  personel: [personelSchema]
});

module.exports = mongoose.model('Record', schema);
