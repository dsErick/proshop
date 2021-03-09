import { Router } from 'express'
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/ProductController.js'
import { isAdmin, protect } from '../middleware/auth.js'

const router = Router()

router.route('/')
    .get(getAllProducts)
    .post(protect, isAdmin, createProduct)

router.route('/:id')
    .get(getProductById)
    .put(protect, isAdmin, updateProduct)
    .delete(protect, isAdmin, deleteProduct)

export default router
