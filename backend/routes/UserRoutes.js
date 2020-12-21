import { Router } from 'express'
import { authUser, registerUser, getUserProfile, updateUserProfile, getAllUsers, deleteUser } from '../controllers/UserController.js'
import { isAdmin, protect } from '../middleware/auth.js'

const router = Router()

router.route('/')
    .get(protect, isAdmin, getAllUsers)
    .post(registerUser)

router.post('/login', authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id')
    .delete(protect, isAdmin, deleteUser)

export default router
