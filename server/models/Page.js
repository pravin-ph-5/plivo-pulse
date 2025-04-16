// hah om sai ram om bhaskaraaya namaha om namaha sivayaa

import mongoose from 'mongoose'
import TeammateSchema from './Teammate.js'

const PageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  teammates: {
    type: [TeammateSchema],
    default: []  // Now optional
  },

  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component',
    default: [] // Now optional
  }],
  incidents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident',
    default: []
  }],
  maintenance: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Maintenance',
    default: []
  }],
  subscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscriber',
    default: []
  }]
}, { timestamps: true })

export default mongoose.model('Page', PageSchema)
