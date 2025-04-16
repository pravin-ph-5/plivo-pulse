// hah om sai ram om bhaskaraaya namaha om namaha sivayaa

import Page from '../models/Page.js'
import Component from '../models/Component.js'
import Incident from '../models/Incident.js'
import Maintenance from '../models/Maintenance.js'
import Subscriber from '../models/Subscriber.js'

export const createPage = async (req, res) => {
  try {
    const { name, slug } = req.body
    const ownerId = req.user

    const existing = await Page.findOne({ slug })
    if (existing) return res.status(400).json({ message: 'Slug already taken' })

    // Step 1: Create the page with only required fields
    const page = new Page({
      name,
      slug,
      owner: ownerId
    })

    // Step 2: Save page first to get the page._id
    await page.save()

    // Step 3: Create default component (API)
    const apiComponent = await Component.create({
      name: 'API',
      status: 'operational',
      page: page._id
    })

    // Step 4: Attach the component to page
    page.components.push(apiComponent._id)

    // Optional: Add owner as default teammate
    page.teammates.push({ user: ownerId, role: 'admin' })

    await page.save()

    res.status(201).json(page)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}


// Get all pages owned by current user
export const getAllPagesByUser = async (req, res) => {
  try {
    const pages = await Page.find({ owner: req.user.id })
      .populate('components')
      .populate('incidents')
      .populate('maintenance')
      .populate('subscriptions')
      .populate('teammates.user', 'name email')

    res.status(200).json(pages)
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

    res.status(200).json(page)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update page (name, slug)
export const updatePage = async (req, res) => {
  try {
    const { pageId } = req.params
    const { name, slug } = req.body

    const updated = await Page.findByIdAndUpdate(
      pageId,
      { $set: { name, slug } },
      { new: true }
    )

    res.status(200).json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete a page and all its associated data
export const deletePage = async (req, res) => {
  try {
    const { pageId } = req.params

    const page = await Page.findById(pageId)
    if (!page) return res.status(404).json({ message: 'Page not found' })

    await Component.deleteMany({ _id: { $in: page.components } })
    await Incident.deleteMany({ _id: { $in: page.incidents } })
    await Maintenance.deleteMany({ _id: { $in: page.maintenance } })
    await Subscriber.deleteMany({ _id: { $in: page.subscriptions } })

    await Page.findByIdAndDelete(pageId)

    res.status(200).json({ message: 'Page and associated data deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Add a teammate to a page
export const addTeammate = async (req, res) => {
  try {
    const { pageId } = req.params
    const { userId, role } = req.body

    const page = await Page.findById(pageId)
    if (!page) return res.status(404).json({ message: 'Page not found' })

    const exists = page.teammates.some(t => t.user.toString() === userId)
    if (exists) return res.status(400).json({ message: 'User already a teammate' })

    page.teammates.push({ user: userId, role })
    await page.save()

    res.status(200).json(page)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Remove a teammate from a page
export const removeTeammate = async (req, res) => {
  try {
    const { pageId, userId } = req.params

    const page = await Page.findById(pageId)
    if (!page) return res.status(404).json({ message: 'Page not found' })

    page.teammates = page.teammates.filter(t => t.user.toString() !== userId)
    await page.save()

    res.status(200).json({ message: 'Teammate removed successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}
