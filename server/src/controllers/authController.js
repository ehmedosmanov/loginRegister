import { User } from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password: hash
        });
        await newUser.save();
        res.status(200).json({ message: "User has been created." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const login = async (req,res) => {
    try {
        const {username,password} = req.body
        const user = await User.findOne({username:username})

        if(!user || !(bcrypt.compareSync(password, user.password))) {
            return res.status(401).json({message: "Wrong User"})
        }

        const token = jwt.sign({
            userId: user._id,
            isAdmin: user.isAdmin
        }, 'mySecretKey123', {expiresIn:'60s'})

        res.cookie('token', token, { maxAge: 60 * 1000, httpOnly: true });
        res.json({token})
    } catch (error) {
        res.status(500).json({message:error.message})   
    }
}