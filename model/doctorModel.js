import {Schema, model} from 'mongoose';
import mongodb from 'mongodb';

const doctorSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    photo: { type: String },
    gender: { type: String },
    ticketPrice: { type: Number },
    role: {
      type: String,
    },
  
    // Fields for doctors only
    specialization: { type: String },
    qualifications: {
      type: Array,
    },
  
    experiences: {
      type: Array,
    },
  
    bio: { type: String, maxLength: 50 },
    about: { type: String },
    timeSlots: { type: Array },
    reviews: [{ type: mongodb.ObjectId, ref: "Review" }],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [{ type: mongodb.ObjectId, ref: "Appointment" }],
  });

const Doctor = model('doctor',doctorSchema)

export default Doctor 