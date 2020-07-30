const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  instrument: String,
  discogsId: Number,
  dateofBirth: Date,
  dateofDeath: Date
}, {
  toJSON: {
    virtuals:true
  }
});

schema.virtual('records', {
  ref:'Record',
  localField: '_id',
  foreignField: 'personnel'
});

module.exports = mongoose.model('Artist', schema);
