const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: String,
  artist_id: Number,
  master_id: Number,
  year: Number
});

module.exports = mongoose.model('Record', schema);
