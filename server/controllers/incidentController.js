// hah om sai ram om bhaskarayaa namaha om namaha sivayaa

import Incident from '../models/Incident.js'
import Page from '../models/Page.js'
import Component from '../models/Component.js'

// Create Incident and link it to component(s) and page
export const createIncident = async (req, res) => {
  try {
    const { title, description, type, stage, componentIds, pageId } = req.body

    if (!componentIds || componentIds.length === 0) {
      return res.status(400).json({ message: 'At least one component is required' })
    }

    // Create incident
    const incident = await Incident.create({
      title,
      description,
      type,
      stage,
      component: componentIds // This is an array
    })

    // Attach incident to page
    await Page.findByIdAndUpdate(pageId, { $push: { incidents: incident._id } })

    // Attach incident to all components
    await Component.updateMany(
      { _id: { $in: componentIds } },
      { $push: { incidents: incident._id } }
    )

    res.status(201).json(incident)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create incident' })
  }
}

// Get all incidents for a page (with component details)
export const getIncidentsByPage = async (req, res) => {
  try {
    const { pageId } = req.params
    const page = await Page.findById(pageId).populate({
      path: 'incidents',
      populate: { path: 'component', select: 'name status' }
    })

    if (!page) return res.status(404).json({ message: 'Page not found' })

    res.status(200).json(page.incidents)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to get incidents' })
  }
}

// Update Incident
export const updateIncident = async (req, res) => {
  try {
    const { incidentId } = req.params
    const updated = await Incident.findByIdAndUpdate(incidentId, req.body, { new: true })

    if (!updated) return res.status(404).json({ message: 'Incident not found' })

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update incident' })
  }
}

// Delete Incident (removes from page & components too)
export const deleteIncident = async (req, res) => {
  try {
    const { incidentId, pageId } = req.params

    const incident = await Incident.findById(incidentId)
    if (!incident) return res.status(404).json({ message: 'Incident not found' })

    // Remove from Page
    await Page.findByIdAndUpdate(pageId, { $pull: { incidents: incidentId } })

    // Remove from all linked Components
    await Component.updateMany(
      { _id: { $in: incident.component } },
      { $pull: { incidents: incidentId } }
    )

    // Delete the Incident
    await Incident.findByIdAndDelete(incidentId)

    res.json({ message: 'Incident deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete incident' })
  }
}
