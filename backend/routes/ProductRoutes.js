import { Router } from 'express'
import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/ProductModel.js'

const router = Router()

/* 
 * @desc        Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
router.get('/', asyncHandler(async (_, res) => {
    const products = await Product.find({})
    
    res.status(200).json({
        data: products
    })
}))

/* 
 * @desc        Fetch a single product by id
 * @route       GET /api/products/:id
 * @access      Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (!product) {
        res.status(404)
        throw new Error(`Product not found with the id of ${req.params.id}`)
    }

    res.status(200).json({
        data: product
    })
}))

export default router
