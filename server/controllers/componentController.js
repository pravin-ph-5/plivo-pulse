// hah om sai ram om bhaskaraaya namaha om namaha sivayaa

import Component from '../models/Component.js'
import Page from '../models/Page.js'

// Create a new component for a page
export const createComponent = async (req, res) => {
  try {
    const { pageId } = req.params
    const { name, description, status = 'operational' } = req.body

    const page = await Page.findById(pageId)
    if (!page) return res.status(404).json({ message: 'Page not found' })

    const component = await Component.create({ name, description, status, page: pageId })

    page.components.push(component._id)
    await page.save()

    res.status(201).json(component)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get all components for a page
export const getComponentsByPage = async (req, res) => {
  try {
    const { pageId } = req.params
    const components = await Component.find({ page: pageId })
    res.status(200).json(components)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update a component
export const updateComponent = async (req, res) => {
  try {
    const { componentId } = req.params
    const updates = req.body

    const updated = await Component.findByIdAndUpdate(componentId, updates, { new: true })
    if (!updated) return res.status(404).json({ message: 'Component not found' })

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete a component
export const deleteComponent = async (req, res) => {
  try {
    const { pageId, componentId } = req.params

    const component = await Component.findByIdAndDelete(componentId)
    if (!component) return res.status(404).json({ message: 'Component not found' })

    // Remove from page
    await Page.findByIdAndUpdate(pageId, { $pull: { components: componentId } })

    res.json({ message: 'Component deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}