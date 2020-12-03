import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name field is required']
    },
    rating: {
        type: Number,
        required: [true, 'The rating field is required'],
    },
    comment: {
        type: String,
        required: [true, 'The comment field is required'],
        default: ''
    }
}, {
    timestamps: true
})

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: [true, 'The user field is required']
    },
    name: {
        type: String,
        required: [true, 'The name field is required']
    },
    image: {
        type: String,
        required: [true, 'The image field is required'],
    },
    brand: {
        type: String,
        required: [true, 'The brand field is required']
    },
    category: {
        type: String,
        required: [true, 'The category field is required']
    },
    description: {
        type: String,
        required: [true, 'The description field is required']
    },
    reviews: [ReviewSchema],
    rating: {
        type: Number,
        required: [true, 'The rating field is required'],
        default: 0
    },
    numReviews: {
        type: Number,
        required: [true, 'The number of reviews field is required'],
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'The price field is required'],
        default: 0
    },
    countInStock: {
        type: Number,
        required: [true, 'The count in stock field is required'],
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('Product', ProductSchema)
