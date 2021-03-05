import { Router } from 'express'
import { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderToPaid } from '../controllers/OrderController.js'
import { isAdmin, protect } from '../middleware/auth.js'

const router = Router({ mergeParams: true })

router.route('/')
    .get(protect, isAdmin, getAllOrders)
    .post(protect, createOrder)

router.get('/myorders', protect, getMyOrders)

router.route('/:id')
    .get(protect, getOrderById)

router.put('/:id/pay', protect, updateOrderToPaid)

export default router
