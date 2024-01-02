import User from "../model/userModel.js"
import {ObjectId} from 'mongodb';
import bcrypt from 'bcryptjs';

export const getAllUser = async(req,res)=>{
    const users = await User.find({}).select('-password')
    return res.status(200).json({status:true,data:users})

}

export const getSingleUser = async(req,res)=>{
    console.log(req.cookie)
    const id = req.params.id
    try{
        if(id.length < 24){
            return res.status(403).json({status:false,message:'Invalid user id'})
        }
        const user = await User.findOne({_id:new ObjectId(id)}).select('-password')

    if(!user){
        return res.status(404).json({status:false,message:'User not exist'})
    }

    return res.status(200).json({status:true,data:{user}})
    }catch{
        return res.status(501).json({status:false,message:'Internal server error'})
    }

}

export const updateUser = async(req,res)=>{
    const id = req.params.id
    const {password} = req.body

    try{
        const user = await User.findOne({_id:new ObjectId(id)})

    //if user not exist
    if(!user){
        return res.status(404).json({status:false,message:'User not exist'})
    }
    
    //if password has to update 
    if(password){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        await User.updateOne({_id:new ObjectId(id)},{$set:{...req.body,password:hash}})
        return res.status(200).json({status:true,message:'User successfully updated'})
    }

    await User.updateOne({_id:new ObjectId(id)},{$set:{...req.body}})

    return res.status(200).json({status:true,message:'User successfully updated'})
    }catch{
        return res.status(501).json({status:false,message:'Internal server error'})
    }



}

export const deleteUser = async(req,res)=>{
    const id = req.params.id

    try{
        const user = await User.findOne({_id:new ObjectId(id)})
        if(!user){
            return res.status(404).json({status:false,message:'User not exist'})
        }
        await User.deleteOne({_id:new ObjectId(id)})
        return res.status(200).json({status:true,message:'User successfully deleted'})
    }catch{
        return res.status(501).json({status:false,message:'Internal server error'})
    }

}

export const getUserProfile = async(req,res)=>{
    const id = req.id
    console.log(id)
    try{
        //if invalid user id
        if(id.length < 24){
            return res.status(403).json({status:false,message:'Invalid user id'})
        }
        const user = await User.findOne({_id:new ObjectId(id)}).select('-password')
    //if user not exist
    if(!user){
        return res.status(404).json({status:false,message:'User not exist'})
    }

    return res.status(201).json({status:true,data:user})
    }catch{
        return res.status(501).json({status:false,message:'Internal server error'})
    }
}


