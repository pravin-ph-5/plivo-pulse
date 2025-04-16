// hah om sai ram om bhaskarayaa namaha om namaha sivayaa

import express from 'express'
import {
  createIncident,
  getIncidentsByPage,
  updateIncident,
  deleteIncident
} from '../controllers/incidentController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Protected routes
router.post('/', authMiddleware, createIncident)
router.get('/:pageId', authMiddleware, getIncidentsByPage)
router.put('/:incidentId', authMiddleware, updateIncident)
router.delete('/:incidentId/:pageId', authMiddleware, deleteIncident)

export default router
