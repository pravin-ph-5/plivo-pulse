// hah om sai ram om bhaskarayaa namaha om namaha sivayaa

import express from 'express'
import {
  subscribeToPage,
  getSubscribersByPage,
  deleteSubscriber
} from '../controllers/subscriberController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Public subscribe endpoint
router.post('/:pageId', subscribeToPage)

// Admin/Protected subscriber management
router.get('/:pageId', authMiddleware, getSubscribersByPage)
router.delete('/:pageId/:subscriberId', authMiddleware, deleteSubscriber)

export default router
