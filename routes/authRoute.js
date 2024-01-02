import {Router} from 'express';
import {loginUser, logoutUser, registerUser,verifyUser} from '../controller/authController.js';



const authRoute = Router()

authRoute.post('/register',registerUser)
authRoute.post('/login',loginUser)
authRoute.post('/logout',logoutUser)
authRoute.get('/verify',verifyUser)



export default authRoute