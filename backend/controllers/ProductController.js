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
 * @desc        Create a product
 * @route       POST /api/products
 * @access      Private/Admin
 */
export const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create({
        user: req.user._id,
        name: 'Sample name',
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        description: 'Sample description',
        rating: 0,
        numReviews: 0,
        price: 0,
        countInStock: 0
    })

    res.status(201).json({ data: product })
})

/**
 * @desc        Update product by id
 * @route       PUT /api/products/:id
 * @access      Private/Admin
 */
export const updateProduct = asyncHandler(async (req, res) => {
    const { name, image, brand, category, description, price, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(404)
        throw new Error(`Product not found with the id of ${req.params.id}`)
    }

    product.name = name || product.name
    product.image = image || product.image
    product.brand = brand || product.brand
    product.price = price || product.price
    product.category = category || product.category
    product.description = description || product.description
    product.countInStock = countInStock || product.countInStock

    await product.save()

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
