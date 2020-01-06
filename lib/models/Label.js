const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: String,
  state: String,
  country: String
}, {
  _id:false
});
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address:[addressSchema]
});

module.exports = mongoose.model('Label', schema);
