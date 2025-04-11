// hah om sai ram om bhaskaraya namaha om namaha sivayaa

import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwtSign from '../utils/JWT_Sign.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ name, email, password: hashedPassword })

    const token = jwtSign({ id: newUser._id })
    res.status(201).json({ user: newUser, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server Error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwtSign({ id: user._id })
    res.status(200).json({ user, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server Error' })
  }
}

export const logout = (req, res) => {
  // Stateless, so logout happens client-side.
  res.status(200).json({ message: 'Logged out successfully' })
}

// Read user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('pages subscriptions')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: 'Server Error' })
  }
}

// Update user
export const updateUser = async (req, res) => {
  try {
    const updates = req.body
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: 'Server Error' })
  }
}

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Server Error' })
  }
}
