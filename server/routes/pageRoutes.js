// hah om sai ram om bhaskaraaya namaha om namaha sivayaa

import express from 'express'
import {
  createPage,
  getAllPagesByUser,
  getPageBySlug,
  updatePage,
  deletePage,
  addTeammate,
  removeTeammate
} from '../controllers/pageController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Public route
router.get('/slug/:slug', getPageBySlug)

// Protected routes
router.use(authMiddleware)

router.get('/', getAllPagesByUser)
router.post('/', createPage)
router.put('/:pageId', updatePage)
router.delete('/:pageId', deletePage)

// Teammates
router.post('/:pageId/teammates', addTeammate)
router.delete('/:pageId/teammates/:userId', removeTeammate)

export default router
