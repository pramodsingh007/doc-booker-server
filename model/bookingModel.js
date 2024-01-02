import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type:String,
      required: true
    },
    doctorName: {
      type: String,
      required: true,
    },
    userGender: {
      type: String,
      required: true,
    },
    ticketPrice: { type: String, required: true },
    appointmentDate: {
        type:String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('booking',bookingSchema)

export default Booking;