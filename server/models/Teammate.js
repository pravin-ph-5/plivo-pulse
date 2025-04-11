// hah om sai ram om bhaskaraaya namaha om namaha sivayaa 

import mongoose from 'mongoose'

const TeammateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'contributor-full', 'contributor-readwrite', 'viewer'],
    default: 'viewer'
  }
}, { _id: false }) // Embed without a new _id field

export default TeammateSchema
