import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import connectDatabase from './utils/db.js';
import reviewRoute from './routes/reviewRoute.js';
import doctorRoute from './routes/doctorRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import adminRoute from './routes/adminRoute.js';
import emailRoute from './routes/emailRoute.js';


dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

//midddleware
app.use(cors({
    origin:[ "https://checkout.stripe.com","http://localhost:5173"],
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization']
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'))

//routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/admin',adminRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/doctors',doctorRoute)
app.use('/api/v1/reviews',reviewRoute)
app.use('/api/v1/bookings',bookingRoute)
app.use('/api/v1/emails',emailRoute)





app.listen(PORT,()=>{
    connectDatabase().then(()=>{
        console.log(`server runing on port ${PORT}`)
    })
})