const mongoose = require('mongoose');

// const personnelSchema = new mongoose.Schema({
//   personnel: {
//     type:mongoose.Schema.Types.ObjectId,
//     ref: 'Artist'
//   }
// });


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
  personnel: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }]
});



module.exports = mongoose.model('Record', schema);
