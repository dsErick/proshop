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

        if (!req.user) throw true

        next()
    } catch (err) {
        res.status(401)

        if (err.name === 'TokenExpiredError') throw new Error('Authentication token expired')

        throw new Error('Not authorized to access this route')
    }
})

export const isAdmin = asyncHandler(async (req, res, next) => {
    if (!req.user.isAdmin) {
        res.status(403)
        throw new Error('Not authorized to access this route')
    }

    next()
})
