const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: String,
  artist_url: String,
  versions_url: String,
  year: Number
});

module.exports = mongoose.model('Record', schema);
