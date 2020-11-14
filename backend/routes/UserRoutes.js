import { Router } from 'express'
import { authUser, getUserProfile } from '../controllers/UserController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)

export default router
