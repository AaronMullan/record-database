const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  instrument: String,
  discogsID: Number,
  dateofBirth: Date,
  dateofDeath: Date
});

module.exports = mongoose.model('Artist', schema);
