import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';


const reviewSchema = new mongoose.Schema({
    doctor:{
        type:ObjectId
    },
    user:{
        type:Object
    },
    reviewText:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5,
        default:0
    }

},{timestamps:true})

const Review = mongoose.model('review',reviewSchema)

export default Review