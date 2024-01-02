import Doctor from '../model/doctorModel.js';
import Review from '../model/reviewModel.js';
import {ObjectId} from 'mongodb';
import User from '../model/userModel.js';

export const getAllReviews = async(req,res)=>{
    const {doctor} = req.params
    try{
        if(doctor.length<24){
            return res.status(403).json({status:false,message:'Invalid doctor id'})
        }    
        const isDoctor = await Doctor.findOne({_id:new ObjectId(doctor)})
        //if doctor is not founded
        if(!isDoctor){
            return res.status(403).json({status:false,message:'Invalid doctor id'})
        }

        const review = await Review.find({doctor:new ObjectId(doctor)})
        return res.status(200).json({status:true,data:review})
    }catch(e){
        console.log(e)
        return res.status(501).json({status:false,message:'Internal server error'})
    }
}

export const createReview = async(req,res)=>{
    console.log(req.body)
    const {doctor,reviewText,rating} = req.body
    try{
        const user = await User.findOne({_id:new ObjectId(req.id)}).select('-password')
        console.log(user)
        await Review.create({doctor:new ObjectId(doctor),user:user,reviewText:reviewText,rating:rating})
        return res.status(200).json({status:true,message:'Review successfully submitted'})
    }catch(e){
        console.log(e)
        return res.status(501).json({status:false,message:'Internal server error'})
    }
}

export const getStats = async(req,res)=>{
        const {docId} = req.params
        

        try{
            if(docId.length<24){
                return res.status(403).json({status:false,message:'Invalid doctor id'})
            }    
            const isDoctor = await Doctor.findOne({_id:new ObjectId(docId)})
            //if doctor is not founded
            if(!isDoctor){
                return res.status(403).json({status:false,message:'Invalid doctor id'})
            }

            const data = await Review.aggregate([
                {$match:{doctor:new ObjectId(docId)}},
                {$group:{_id:'$doctor',numOfRating:{$sum:1},averageRating:{$avg:'$rating'}}}
            ])  
           return res.status(200).json({status:true,data:data[0]})

        }catch(e){
            console.log(e)
            return res.status(501).json({status:false,message:'Internal server error'})
        }
}