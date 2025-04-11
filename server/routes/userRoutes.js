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

const router = express.Router()

// Auth routes
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

// User CRUD using route()
router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

export default router
