import mongoose from "mongoose";

const {Schema} = mongoose

const userSchema = new Schema({
    username: {type:String, required: true},
    password: {type: String, required: true},
    isAdmin: {type:Boolean,default: false }
})


export const User = mongoose.model('Users', userSchema)