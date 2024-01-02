import { ObjectId } from "mongodb"
import Booking from "../model/bookingModel.js"
import User from "../model/userModel.js"
import Doctor from "../model/doctorModel.js"
import { Stripe } from 'stripe';
import dotenv from 'dotenv';

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const postAppointment = async(req,res)=>{
    const userId = req.id
    const {doctor,ticketPrice,appointmentDate} = req.body
    try{
        const foundedUser = await User.findOne({_id:new ObjectId(userId)})
        const   foundedDoctor = await Doctor.findOne({_id:new ObjectId(doctor)})
        const data = {
            doctor,
            ticketPrice,
            appointmentDate,
            user:userId,
            doctorName:foundedDoctor.name,
            userName:foundedUser.name,
            userGender:foundedUser.gender
        }
        const newBooking = await Booking.create(data)
        res.status(200).json({status:true,message:'Appointment created successfully',data:newBooking})
    }catch(e){
        res.status(501).json({status:false,message:'Internal Server Error'})
    }
}


export const getBookings = async(req,res)=>{
    const id = req.id
    const role = req.role
    

    try{
        if(role==='doctor'){
            const doctorBookings  = await Booking.find({doctor:new ObjectId(id)})
            return res.status(200).json({status:true,data:doctorBookings})
        }
        if(role==='patient'){
            const userBookings  = await Booking.find({user:new ObjectId(id)})
            return res.status(200).json({status:true,data:userBookings})
        }
        if(role==='admin'){
            const userBookings  = await Booking.find({})
            return res.status(200).json({status:true,data:userBookings})
        }
        
        
    }catch{
        res.status(501).json({status:false,message:'Internal Server Error'})
    }
}



export const checkout = async(req,res)=>{
    

    const {name,price} = req.body
    try {
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types:['card'],
          line_items: [
            {
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:name
                    },
                    unit_amount:(price*100)
                },
                quantity:1
        }
          ],
          // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
          success_url: 'http://localhost:5173/patient/profile/me',
          cancel_url:'http://localhost:5173/',
          
        });
    
        return res.json({url:session.url});
      } catch (e) {
        console.log(e)
    }
            
}   