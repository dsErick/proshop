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
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    } else {
        res.status(422)
        throw new Error(`These credentials do not match our records.`)
    }
})
