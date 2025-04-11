// hah om sai ram om bhaskaraya namaha om namaha sivayaa

import mongoose from 'mongoose'

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true },
  page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
  verified: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Subscriber', SubscriberSchema)
