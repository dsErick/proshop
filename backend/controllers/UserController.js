import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/UserModel.js'

/* 
 * @desc    Authenticate use & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if(user && await user.matchPassword(password)) {
        res.status(200).json({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: user.generateToken()
            }
        })
    } else {
        res.status(422)
        throw new Error(`These credentials do not match our records.`)
    }
})

/* 
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.create({ name, email, password })
    
    res.status(201).json({
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: user.generateToken()
        }
    })
})

/* 
 * @desc    Get logged in user
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error(`User not found with the id of ${req.user._id}`)
    }
    
    res.status(200).json({
        data: user
    })
})

/* 
 * @desc    Update logged in user data
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error(`User not found with the id of ${req.user._id}`)
    }
    
    const { name, email, password } = req.body
    
    user.name = name || user.name
    user.email = email || user.email
    if (password) user.password = password

    await user.save()
    
    res.status(200).json({
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: user.generateToken()
        }
    })
})
