import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/OrderModel.js'

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
