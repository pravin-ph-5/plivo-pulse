// hah om sai ram om bhaskaraaya namaha om namaha sivayaa 

// hah om sai ram om bhaskaraya namaha om namaha sivaya

import Page from '../models/Page.js'
import User from '../models/User.js'
import Component from '../models/Component.js'
import Incident from '../models/Incident.js'
import Maintenance from '../models/Maintenance.js'
import Subscriber from '../models/Subscriber.js'

// Create a new page
export const createPage = async (req, res) => {
  try {
    const { name, slug } = req.body
    const ownerId = req.user.id // assuming user ID comes from JWT middleware

    const existing = await Page.findOne({ slug })
    if (existing) return res.status(400).json({ message: 'Slug already taken' })

    const page = await Page.create({
      name,
      slug,
      owner: ownerId,
      teammates: [{ user: ownerId, role: 'admin' }]
    })

    res.status(201).json(page)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get all pages owned by the current user
export const getAllPagesByUser = async (req, res) => {
  try {
    const userId = req.user.id
    const pages = await Page.find({ owner: userId })
      .populate('components')
      .populate('incidents')
      .populate('maintenance')
      .populate('subscriptions')
      .populate('teammates.user', 'name email')

    res.json(pages)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get public page by slug
export const getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const page = await Page.findOne({ slug })
      .populate('components')
      .populate('incidents')
      .populate('maintenance')

    if (!page) return res.status(404).json({ message: 'Page not found' })

    res.json(page)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update page info (name or slug)
export const updatePage = async (req, res) => {
  try {
    const { pageId } = req.params
    const { name, slug } = req.body

    const updated = await Page.findByIdAndUpdate(
      pageId,
      { $set: { name, slug } },
      { new: true }
    )

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete a page
export const deletePage = async (req, res) => {
  try {
    const { pageId } = req.params

    const page = await Page.findById(pageId)
    if (!page) return res.status(404).json({ message: 'Page not found' })

    // Remove referenced documents
    await Component.deleteMany({ _id: { $in: page.components } })
    await Incident.deleteMany({ _id: { $in: page.incidents } })
    await Maintenance.deleteMany({ _id: { $in: page.maintenance } })
    await Subscriber.deleteMany({ _id: { $in: page.subscriptions } })

    await Page.findByIdAndDelete(pageId)

    res.json({ message: 'Page and associated data deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Add a teammate
export const addTeammate = async (req, res) => {
  try {
    const { pageId } = req.params
    const { userId, role } = req.body

    const page = await Page.findById(pageId)
    if (!page) return res.status(404).json({ message: 'Page not found' })

    const alreadyExists = page.teammates.find(t => t.user.toString() === userId)
    if (alreadyExists) return res.status(400).json({ message: 'User already added' })

    page.teammates.push({ user: userId, role })
    await page.save()

    res.json(page)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Remove a teammate
export const removeTeammate = async (req, res) => {
  try {
    const { pageId, userId } = req.params

    const page = await Page.findById(pageId)
    if (!page) return res.status(404).json({ message: 'Page not found' })

    page.teammates = page.teammates.filter(t => t.user.toString() !== userId)
    await page.save()

    res.json({ message: 'Teammate removed successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}
