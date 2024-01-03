import Doctor from "../model/doctorModel.js"
import {ObjectId} from 'mongodb';
import bcrypt from 'bcryptjs';

export const getAllDoctor = async(req,res)=>{
    const doctors = await Doctor.find({}).select('-password')
    return res.status(200).json({status:true,data:doctors})

}
export const getAllApprovedDoctor = async(req,res)=>{
    const doctors = await Doctor.find({isApproved:'approved'}).select('-password')
    return res.status(200).json({status:true,data:doctors})

}

export const getSingleDoctor = async(req,res)=>{
    const id = req.params.id
    try{
        if(id.length < 24){
            return res.status(403).json({status:false,message:'Invalid user id'})
        }
        const user = await Doctor.findOne({_id:new ObjectId(id)}).select('-password')

    if(!user){
        return res.status(404).json({status:false,message:'Doctor not exist'})
    }

    return res.status(200).json({status:true,data:user})
    }catch{
        return res.status(501).json({status:false,message:'Internal server error'})
    }

}

export const updateDoctor = async(req,res)=>{
    const id = req.params.id
    const {password} = req.body

    try{
        const user = await Doctor.findOne({_id:new ObjectId(id)})

    //if user not exist
    if(!user){
        return res.status(404).json({status:false,message:'Doctor not exist'})
    }
    
    //if password has to update 
    if(password){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        await Doctor.updateOne({_id:new ObjectId(id)},{$set:{...req.body,password:hash}})
        return res.status(200).json({status:true,message:'Doctor successfully updated'})
    }

    await Doctor.updateOne({_id:new ObjectId(id)},{$set:{...req.body}})

    return res.status(200).json({status:true,message:'Doctor successfully updated'})
    }catch{
        return res.status(501).json({status:false,message:'Internal server error'})
    }



}

export const deleteDoctor = async(req,res)=>{
    const id = req.params.id

    try{
        const user = await Doctor.findOne({_id:new ObjectId(id)})
        if(!user){
            return res.status(404).json({status:false,message:'Doctor not exist'})
        }
        await Doctor.deleteOne({_id:new ObjectId(id)})
        return res.status(200).json({status:true,message:'Doctor successfully deleted'})
    }catch{
        return res.status(501).json({status:false,message:'Internal server error'})
    }

}


export const getDoctorProfile = async(req,res)=>{
    const id = req.id
    try{
        //if invalid user id
        if(id.length < 24){
            return res.status(403).json({status:false,message:'Invalid doctor id'})
        }
        const user = await Doctor.findOne({_id:new ObjectId(id)}).select('-password')
    //if user not exist
    if(!user){
        return res.status(404).json({status:false,message:'Doctor not exist'})
    }

    return res.status(201).json({status:true,data:user})
    }catch{
        return res.status(501).json({status:false,message:'Internal server error'})
    }
}



export const findDoctor = async(req,res)=>{
        const {query} = req.body
        
        try{
            const shortByName = await Doctor.find({name:{ $regex:query, $options: 'i' }}).exec()
            const shortBySpecialization = await Doctor.find({specialization:{ $regex:query, $options: 'i' }}).exec()
            res.json({data:[...shortByName,...shortBySpecialization]})
        }catch{
            return res.status(501).json({status:false,message:'Internal server error'})
        }
        
        
}


export const approveDoctor = async(req,res)=>{
    
    const {id,status} = req.body
    try{
        await Doctor.updateOne({_id:new ObjectId(id)},{$set:{isApproved:status}})
        res.status(200).json({status:true,message:'Doctor status changed'})
    }catch{
        res.status(501).json({status:false,message:'Internal server error'})
    }
}