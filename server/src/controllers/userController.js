import { User } from "../models/userModel.js";
import mongoose from "mongoose";

export const getAllUsers = async (req,res) => {
    try {
        const users = await User.find()  
        res.status(200).json({message: users})  
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export const getUserById = async (req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        if(!user) return res.status(404).json({message: 'User Not Found'})
        res.status(200).json({message: user})
    } catch (error) {
        res.status(500).json({message:error.message})   
    }
}

export const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



