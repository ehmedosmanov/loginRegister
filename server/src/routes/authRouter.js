import express from 'express'
import { login, register } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

export const authRouter = express.Router()


authRouter.post("/register", register)

authRouter.post("/login", login)


authRouter.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route!', user: req.user });
}); 