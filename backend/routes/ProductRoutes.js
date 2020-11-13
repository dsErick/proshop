import { Router } from 'express'
import { getAllProducts, getProductById } from '../controllers/ProductController.js'

const router = Router()

router.route('/')
    .get(getAllProducts)

router.route('/:id')
    .get(getProductById)

export default router
