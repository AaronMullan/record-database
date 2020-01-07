const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  instrument: String,
  dateofBirth: Date,
  dateofDeath: Date
});

module.exports = mongoose.model('Artist', schema);
