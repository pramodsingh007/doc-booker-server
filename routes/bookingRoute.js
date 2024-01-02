import express from 'express';
import { checkout, getBookings, postAppointment } from '../controller/bookingController.js';
import { allowAccess, authorize } from '../auth/verifyToken.js';

const bookingRoute = express.Router()


bookingRoute.post('/',authorize,allowAccess(['patient']),postAppointment)
bookingRoute.post('/checkout',authorize,allowAccess(['patient']),checkout)
bookingRoute.get('/',authorize,allowAccess(['patient','doctor','admin']),getBookings)



export default bookingRoute