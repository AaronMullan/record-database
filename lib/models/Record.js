const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  label: {
    type: mongoose.Schema.Types.String,
    ref: 'Label',
    required: true
  },
  artist: String,
  artist_id: Number,
  master_id: Number,
  year: Number
});

module.exports = mongoose.model('Record', schema);
