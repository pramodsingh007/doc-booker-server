import {Router} from 'express';
import { approveDoctor, deleteDoctor, findDoctor, getAllApprovedDoctor, getAllDoctor, getDoctorProfile, getSingleDoctor, updateDoctor } from '../controller/doctorController.js';
import { authorize,allowAccess } from '../auth/verifyToken.js';


const doctorRoute = Router()

doctorRoute.get('/',authorize,allowAccess(['patient','doctor','admin']),getAllDoctor)
doctorRoute.get('/approved',authorize,allowAccess(['patient','doctor','admin']),getAllApprovedDoctor)
doctorRoute.post('/find-doctor',authorize,allowAccess(['patient','admin','doctor']),findDoctor)
doctorRoute.post('/change-status',authorize,allowAccess(['admin']),approveDoctor)
doctorRoute.get('/profile',authorize,allowAccess(['doctor','admin']),getDoctorProfile)
doctorRoute.get('/:id',authorize,allowAccess(['doctor','patient','admin']),getSingleDoctor)
doctorRoute.put('/:id',authorize,allowAccess(['doctor','admin']),updateDoctor)
doctorRoute.delete('/:id',authorize,allowAccess(['doctor','admin']),deleteDoctor)


export default doctorRoute