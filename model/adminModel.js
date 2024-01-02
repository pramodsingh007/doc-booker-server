import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
    },
    photo:{
        type:String,
    },
    role:{
        type:String,
        enum:['admin'],
        default:'admin',
        unique:true
    },
    gender:{
        type:String,
        enum:['male','female']
    }
}) 


const Admin = mongoose.model('admin',adminSchema)

export default Admin
