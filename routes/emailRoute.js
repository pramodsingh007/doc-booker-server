import express from 'express';
import { sendEmail } from '../controller/emailController.js';


const emailRoute = express.Router()


emailRoute.post('/',sendEmail)



export default emailRoute;