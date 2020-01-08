const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  discogsMasterId: {
    type: Number,
    required: true
  },
  discogsVersionId: Number,
  condition: {
    type: String,
    enum: ['M', 'Mint', 'NM', 'Near Mint', 'M-', 'VG+', 'VG', 'Very Good', 'G+', 'G', 'Good', 'P', 'Poor', 'F', 'Fair']
  },
  notes: String
});

module.exports = mongoose.model('Note', schema);
