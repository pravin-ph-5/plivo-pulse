// hah om sai ram om bhaskarayaa namaha om namaha sivayaa

import express from 'express'
import {
  createMaintenance,
  getMaintenanceById,
  getAllMaintenances,
  updateMaintenance,
  deleteMaintenance
} from '../controllers/maintenanceController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, createMaintenance)
router.get('/:pageId/:maintenanceId', authMiddleware, getMaintenanceById)
router.get('/:pageId/', authMiddleware, getAllMaintenances)
router.put('/:maintenanceId', authMiddleware, updateMaintenance)
router.delete('/:maintenanceId/:pageId', authMiddleware, deleteMaintenance)

export default router
