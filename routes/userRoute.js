import {Router} from 'express';
import { deleteUser, getAllUser, getSingleUser, getUserProfile, updateUser } from '../controller/userController.js';
import { authorize,allowAccess } from '../auth/verifyToken.js';


const userRoute = Router()

userRoute.get('/',authorize,allowAccess(['admin']),getAllUser)
userRoute.get('/profile',authorize,allowAccess(['patient']),getUserProfile)
userRoute.get('/:id',authorize,allowAccess(['patient']),getSingleUser)
userRoute.put('/:id',authorize,allowAccess(['patient']),updateUser)
userRoute.delete('/:id',authorize,allowAccess(['patient','admin']),deleteUser)


export default userRoute