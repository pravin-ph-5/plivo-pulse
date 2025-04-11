// hah om sai ram om bhaskaraaya namaha om namaha sivayaa

import express from 'express'
import {
  createComponent,
  getComponents,
  updateComponent,
  deleteComponent,
} from '../controllers/componentController.js'

const router = express.Router()

router
  .route('/:pageId/components')
  .post(createComponent)
  .get(getComponents)

router
  .route('/component/:componentId')
  .put(updateComponent)
  .delete(deleteComponent)

export default router
