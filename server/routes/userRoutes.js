// hah om sai ram om bhaskarayaa namaha om namaha sivayaa

import express from 'express'
import {
  register,
  login,
  logout,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js'

import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Auth routes
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

// Protected User CRUD routes
router
  .route('/:id')
  .get(authMiddleware, getUser)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser)

export default router
