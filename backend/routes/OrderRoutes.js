import { Router } from 'express'
import { createOrder, getOrderById } from '../controllers/OrderController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.route('/')
    .post(protect, createOrder)

router.route('/:id')
    .get(protect, getOrderById)

export default router
