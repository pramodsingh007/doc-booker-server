import jwt from 'jsonwebtoken';
import Doctor from '../model/doctorModel.js';
import {ObjectId} from 'mongodb';
import User from '../model/userModel.js';
import Admin from '../model/adminModel.js';

export const authorize = (req,res,next)=>{
    const authToken = req.headers.authorization
    
    
    if(!authToken || !authToken.startsWith('Bearer ')){
        return res.status(401).json({status:false,message:'User not authenticated'})
    }

    //verify token
    try{
        const token  = authToken.split(' ')[1]
    const {id,role} = jwt.verify(token,process.env.JWT_SECREAT_KEY)
    req.id = id
    req.role = role
    next()
    }catch{
        return res.status(401).json({status:false,message:'Not authenticated invalid token'})
    }
}

export const allowAccess = (roles)=>{
    return async(req,res,next)=>{
        let user

        try{
            const foundDoctor = await Doctor.findOne({_id:new ObjectId(req.id)})
            const foundUser = await User.findOne({_id:new ObjectId(req.id)})
            const foundAdmin = await Admin.findOne({_id:new ObjectId(req.id)})

        if(foundDoctor){
            user = foundDoctor
        }
        if(foundUser){
            user = foundUser
        }
        if(foundAdmin){
            user = foundAdmin
        }

        if(!roles.includes(user.role)){
            return res.status(401).json({status:false,message:'You are not authorized'})
        }
        next()
        }catch{
            return res.status(401).json({status:false,message:'You are not authorized'})
        }
    }
}