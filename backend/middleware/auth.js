import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/UserModel.js'

export const protect = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers
    let token

    if (authorization && authorization.startsWith('Bearer ')) token = authorization.split(' ')[1]

    if (!token) {
        res.status(401)
        throw new Error('Not authorized to access this route')
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)

        next()
    } catch (err) {
        res.status(401)
        throw new Error('Not authorized to access this route')
    }
})
