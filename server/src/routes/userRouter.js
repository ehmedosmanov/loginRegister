import express from 'express'
import { login, register } from '../controllers/authController.js'
import { deleteUserById } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'

export const userRouter = express.Router()



userRouter.delete('/delete/:id', authenticateToken,deleteUserById); 


// authRouter.get('/profile', authenticateToken, (req, res) => {
//     res.json({ message: 'This is a protected route!', user: req.user });
// }); 