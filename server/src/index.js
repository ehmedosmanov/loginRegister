import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import mongoose from 'mongoose'
import { authRouter } from './routes/authRouter.js';
import { userRouter } from './routes/userRouter.js';
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

app.use(cookieParser())


app.use('/auth', authRouter);
app.use('/user', userRouter); 

const PORT = process.env.PORT
const url= process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)
mongoose.connect(url).catch((err) => console.log(`Db Not Connected - ${err}`))

app.listen(PORT, (req,res) => {
    console.log(`Server Connection - ${PORT}`);
})

