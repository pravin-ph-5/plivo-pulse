// hah om sai ram om bhaskarayaa namaha om namaha sivayaa

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StatusPage' }],
    role: { type: String, enum: ['admin', 'contributor', 'viewer'], default: 'admin' },
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StatusPage' }],
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
