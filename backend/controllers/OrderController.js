import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/OrderModel.js'

/* 
 * @desc        Fetch a single order by id
 * @route       GET /api/orders/:id
 * @access      Private
 */
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        res.status(404)
        throw new Error(`Order not found with the id of ${req.params.id}`)
    }

    res.status(200).json({ data: order })
})

/* 
 * @desc        Create new order
 * @route       POST /api/orders
 * @access      Private
 */
export const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0 ) {
        res.status(400)
        throw new Error('The order items have not been choosen')
    }

    const order = await Order.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        taxPrice,
        totalPrice
    })
    
    res.status(201).json({
        data: order
    })
})
