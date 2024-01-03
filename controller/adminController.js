import Admin from "../model/adminModel.js"
import {ObjectId} from 'mongodb';
import bcrypt from 'bcryptjs';



export const getAdmin = async(req,res)=>{
    const id = req.params.id
    try{
        if(id.length < 24){
            return res.status(403).json({status:false,message:'Invalid Admin id'})
        }
        const admin = await Admin.findOne({_id:new ObjectId(id)}).select('-password')

    if(!admin){
        return res.status(404).json({status:false,message:'Admin not exist'})
    }

    return res.status(200).json({status:true,data:{admin}})
    }catch{
        return res.status(501).json({status:false,message:'Internal server error'})
    }

}

export const updateAdmin = async(req,res)=>{
    const id = req.params.id
    const {password} = req.body

    try{
        const admin = await Admin.findOne({_id:new ObjectId(id)})

    //if user not exist
    if(!admin){
        return res.status(404).json({status:false,message:'Admin not exist'})
    }
    
    //if password has to update 
    if(password){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        await Admin.updateOne({_id:new ObjectId(id)},{$set:{...req.body,password:hash}})
        return res.status(200).json({status:true,message:'Admin successfully updated'})
    }

    await Admin.updateOne({_id:new ObjectId(id)},{$set:{...req.body}})

    return res.status(200).json({status:true,message:'Admin successfully updated'})
    }catch{
        return res.status(501).json({status:false,message:'Internal server error'})
    }



}

export const deleteAdmin = async(req,res)=>{
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

export const getAdminProfile = async(req,res)=>{
    const id = req.id
    try{
        //if invalid user id
        if(id.length < 24){
            return res.status(403).json({status:false,message:'Invalid user id'})
        }
        const user = await Admin.findOne({_id:new ObjectId(id)}).select('-password')
    //if user not exist
    if(!user){
        return res.status(404).json({status:false,message:'User not exist'})
    }

    return res.status(201).json({status:true,data:user})
    }catch{
        return res.status(501).json({status:false,message:'Internal server error'})
    }
}


