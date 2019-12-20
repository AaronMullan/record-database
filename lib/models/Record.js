const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: String,
  artistURL: String,
  versions_url: String,
  year: String
});
