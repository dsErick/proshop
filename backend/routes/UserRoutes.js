import { Router } from 'express'
import { authUser, registerUser, getUserProfile, updateUserProfile, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController.js'
import OrderRoutes from './OrderRoutes.js'
import { isAdmin, protect } from '../middleware/auth.js'

const router = Router()

// Re-route into the order routers
router.use('/:userId/orders', protect, isAdmin, OrderRoutes)

router.route('/')
    .get(protect, isAdmin, getAllUsers)
    .post(registerUser)

router.post('/login', authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id')
    .get(protect, isAdmin, getUserById)
    .put(protect, isAdmin, updateUser)
    .delete(protect, isAdmin, deleteUser)

export default router
