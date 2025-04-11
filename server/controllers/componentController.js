// hah om sai ram om bhaskaraaya namaha om namaha sivayaa

import Component from '../models/Component.js'
import Page from '../models/Page.js'

// Create a new component for a page
export const createComponent = async (req, res) => {
  try {
    const { pageId } = req.params
    const { name, description, status, group } = req.body

    const page = await Page.findById(pageId)
    if (!page) return res.status(404).json({ message: 'Page not found' })

    const newComponent = new Component({ name, description, status, group, page: pageId })
    await newComponent.save()

    res.status(201).json(newComponent)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get all components for a specific page
export const getComponents = async (req, res) => {
  try {
    const { pageId } = req.params
    const components = await Component.find({ page: pageId })
    res.status(200).json(components)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// Update a component by ID
export const updateComponent = async (req, res) => {
  try {
    const { componentId } = req.params
    const updated = await Component.findByIdAndUpdate(componentId, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Component not found' })

    res.status(200).json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// Delete a component by ID
export const deleteComponent = async (req, res) => {
  try {
    const { componentId } = req.params
    const deleted = await Component.findByIdAndDelete(componentId)
    if (!deleted) return res.status(404).json({ message: 'Component not found' })

    res.status(200).json({ message: 'Component deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
