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

  // Embedded teammates using the separated schema
  teammates: [TeammateSchema],

  // Referencing components, incidents, maintenance and subscribers
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component'
  }],
  incidents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident'
  }],
  maintenance: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Maintenance'
  }],
  subscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscriber'
  }],

  createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.model('Page', PageSchema)
