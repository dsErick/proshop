import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: [true, 'The user field is required']
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],
    shippingAddress: {
        address: {
            type: String,
            required: [true, 'The address field is required']
        },
        city: {
            type: String,
            required: [true, 'The city field is required']
        },
        postalCode: {
            type: String,
            required: [true, 'The postal code field is required']
        },
        country: {
            type: String,
            required: [true, 'The country field is required']
        }
    },
    paymentMethod: {
        type: String,
        required: [true, 'The payment method field is required']
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        updateTime: { type: String },
        emailAddress: { type: String }
    },
    taxPrice: {
        type: Number,
        required: [true, 'The tax price field is required'],
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: [true, 'The shipping price field is required'],
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: [true, 'The total price field is required'],
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('Order', OrderSchema)
