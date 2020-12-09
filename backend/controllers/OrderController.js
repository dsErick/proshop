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
 * @desc        Get logged in user orders
 * @route       GET /api/orders/myorders
 * @access      Private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt')
    
    res.status(200).json({ data: orders })
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
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    })
    
    res.status(201).json({ data: order })
})

/* 
 * @desc        Update order to paid
 * @route       PUT /api/orders/:id/pay
 * @access      Private
 */
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const { id, status, updateTime, emailAddress } = req.body
    const order = await Order.findById(req.params.id)
    
    if (!order) {
        res.status(404)
        throw new Error(`Order not found with the id of ${req.params.id}`)
    }

    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
        id,
        status,
        updateTime,
        emailAddress,
    }

    await order.save()

    res.status(200).json({ data: order })
})
