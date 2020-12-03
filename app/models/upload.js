const mongoose = require('mongoose')
// storing this data in mongo
// not storing the actual file,
// STORING THE REFERENCE OF THE FILE
// REFERENCE IS THE URL(How we keep the track of the file)
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
  },
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Upload', uploadSchema)
