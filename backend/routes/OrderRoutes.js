import { Router } from 'express'
import { createOrder, getOrderById, updateOrderToPaid } from '../controllers/OrderController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.route('/')
    .post(protect, createOrder)

router.route('/:id')
    .get(protect, getOrderById)

router.put('/:id/pay', protect, updateOrderToPaid)

export default router
