import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name field is required.']
    },
    email: {
        type: String,
        required: [true, 'The email field is required.'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'The email format is invalid.'
        ]
    },
    password: {
        type: String,
        required: [true, 'The password field is required.'],
        minlength: [6, 'The password field must be at least 6 characters.'],
        select: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema)
