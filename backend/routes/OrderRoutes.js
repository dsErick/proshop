import { Router } from 'express'
import { createOrder, getMyOrders, getOrderById, updateOrderToPaid } from '../controllers/OrderController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.route('/')
    .post(protect, createOrder)

router.get('/myorders', protect, getMyOrders)

router.route('/:id')
    .get(protect, getOrderById)

router.put('/:id/pay', protect, updateOrderToPaid)

export default router
