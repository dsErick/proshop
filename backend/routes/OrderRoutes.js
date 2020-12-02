import { Router } from 'express'
import { createOrder } from '../controllers/OrderController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.route('/')
    .post(protect, createOrder)

export default router
