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
            data: user.toObject()
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
        data: user.toObject()
    })
})

/* 
 * @desc    Get logged in user
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        data: req.user.toObject()
    })
})

/* 
 * @desc    Update logged in user data
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    
    req.user.name = name || req.user.name
    req.user.email = email || req.user.email
    if (password) req.user.password = password

    await req.user.save()
    
    res.status(200).json({
        data: req.user.toObject()
    })
})

/* 
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (_, res) => {
    const users = await User.find({})
    
    res.status(200).json({ data: users })
})

/* 
 * @desc    Delete user by id
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(404)
        throw new Error(`User not found with the id of ${req.params.id}`)
    }

    await user.remove()
    
    res.status(200).json({ data: {} })
})
