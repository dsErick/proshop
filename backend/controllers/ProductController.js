import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/ProductModel.js'

/** 
 * @desc        Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
export const getAllProducts = asyncHandler(async (_, res) => {
    const products = await Product.find({})
    
    res.status(200).json({ data: products })
})


/** 
 * @desc        Fetch a single product by id
 * @route       GET /api/products/:id
 * @access      Public
 */
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (!product) {
        res.status(404)
        throw new Error(`Product not found with the id of ${req.params.id}`)
    }

    res.status(200).json({ data: product })
})

/**
 * @desc        Remove product by id
 * @route       DELETE /api/products/:id
 * @access      Private/Admin
 */
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(404)
        throw new Error(`Product not found with the id of ${req.params.id}`)
    }

    await product.remove()

    res.status(204).send()
})
