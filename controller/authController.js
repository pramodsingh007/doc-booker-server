import User from "../model/userModel.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Doctor from "../model/doctorModel.js";
import Admin from "../model/adminModel.js";

export const registerUser = async (req,res)=>{
    const {email,password,role} = req.body

   try{
    let user
    const foundUser  = await User.findOne({email})
    const foundDoctor  = await Doctor.findOne({email})
    const foundAdmin  = await Admin.findOne({email})

    if(foundDoctor){
        user = foundDoctor
    }
    if(foundUser){
        user = foundUser
    }
    if(foundAdmin){
        user = foundAdmin
    }


    //if user is admin and already exist 
    if(role==='admin'&&user){
        return res.status(403).json({'status':false,message:'Admin already exists'})
    }

    //if user exist
    if(user){
        return res.status(403).json({'status':false,message:'User already exists'})
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    
    if(role==='patient'){
        const newUser = await User.create({...req.body,password:hash})
        newUser.save()
        .then(()=>{
            return res.status(200).json({status:true,message:'User successfull registered'})
        })
    }

    if(role==='doctor'){
        const newDoctor = await Doctor.create({...req.body,password:hash})
        newDoctor.save()
        .then(()=>{
            return res.status(200).json({status:true,message:'Doctor successfull registered'})
        })
    }
    if(role==='admin'){
        const admin = await Admin.create({...req.body,password:hash})
        admin.save()
        .then(()=>{
            return res.status(200).json({status:true,message:'Admin successfull registered'})
        })
    }
   
   }catch(e){
    console.log(e)
    return res.status(500).json({status:false,message:'Internal server error'})
   }
}     

export const loginUser = async(req,res)=>{
    const {email,password} = req.body
    try{
        let user
        const foundUser  = await User.findOne({email})
        const foundDoctor  = await Doctor.findOne({email})
        const foundAdmin  = await Admin.findOne({email})

        if(foundDoctor){
            user=foundDoctor
        }
        if(foundUser){
            user=foundUser
        }
        if(foundAdmin){
            user=foundAdmin
        }
    //checking if user not exist
    if(!user){
        return res.status(404).json({status:false,message:'User not exist'})
    }

    const isPasswordMached = await bcrypt.compare(password,user.password)
    //checking if password maches
    if(!isPasswordMached){
        return res.status(401).json({status:false,message:'Invalid password'})
    }
    
    const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECREAT_KEY,{expiresIn:'7d'})
    return res.status(200).cookie('token',token,{httpOnly:false}).json({status:true,message:'Login successfull',token,data:{_id:user._id,email:user.email,name:user.name,role:user.role}})
    }catch{
        return res.status(500).json({status:false,message:'Internal server error'})
    }


}

export const logoutUser = (req,res)=>{
    jwt.destroy()
    res.status(200).json({status:true,message:"Logout Successfully"})
}


export const verifyUser = (req,res)=>{
    const token = req.headers.authorization.split(' ')[1]
   try{
    if(!token){
        return res.status(401).json({status:false,message:'User not authenticated'})
    }
    const auth = jwt.verify(token,process.env.JWT_SECREAT_KEY)
    console.log(auth)

    return res.status(201).json({status:true,message:'Successfully Authenticated',data:auth})
   }catch{
    return res.status(401).json({status:false,message:'Invlid token'})
   }

}