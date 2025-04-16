// hah om sai ram om bhaskaraya namaha om namaha sivaya

import express from 'express'
import {
  createComponent,
  getComponentsByPage,
  updateComponent,
  deleteComponent
} from '../controllers/componentController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// /api/pages/:pageId/components
router.post('/:pageId/components', authMiddleware, createComponent)
router.get('/:pageId/components', getComponentsByPage)
router.put('/:pageId/components/:componentId', authMiddleware, updateComponent)
router.delete('/:pageId/components/:componentId', authMiddleware, deleteComponent)

export default router
