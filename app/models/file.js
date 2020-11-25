const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
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
}, {
  timestamps: true
})

module.exports = mongoose.model('File', fileSchema)
