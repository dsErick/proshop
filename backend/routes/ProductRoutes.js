import { Router } from 'express'
import { getAllProducts, getProductById, deleteProduct } from '../controllers/ProductController.js'
import { isAdmin, protect } from '../middleware/auth.js'

const router = Router()

router.route('/')
    .get(getAllProducts)

router.route('/:id')
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)

export default router
