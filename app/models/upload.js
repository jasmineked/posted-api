const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  }
  // url: {
  //   type: String,
  //   required: true
  // }
}, {
  timestamps: true
})

module.exports = mongoose.model('Upload', uploadSchema)
