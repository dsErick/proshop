import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
    timestamps: true,
    versionKey: false
})

// Hash user password if it was modified
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) next()

    this.password = await bcrypt.hash(this.password, 10)
})

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Generate JWT with user id
UserSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '2d' })
}

// Check for any options in toObject()
if (!UserSchema.options.toObject) UserSchema.options.toObject = {}

// Delete password field and set token for toObject()
UserSchema.options.toObject.transform = function(doc, ret) {
    delete ret.password
    ret.token = doc.generateToken()
    return ret
}

export default mongoose.model('User', UserSchema)
