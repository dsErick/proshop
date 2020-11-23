import { Router } from 'express'
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/UserController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.route('/')
    .post(registerUser)

router.post('/login', authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router
