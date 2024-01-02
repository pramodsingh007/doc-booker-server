import {Router} from 'express';
import { authorize,allowAccess } from '../auth/verifyToken.js';
import { deleteAdmin, getAdmin, getAdminProfile, updateAdmin } from '../controller/adminController.js';


const adminRoute = Router()


adminRoute.get('/profile',authorize,allowAccess(['admin']),getAdminProfile)
adminRoute.put('/:id',authorize,allowAccess(['admin']),updateAdmin)
adminRoute.delete('/:id',authorize,allowAccess(['admin']),deleteAdmin)
adminRoute.get('/:id',authorize,allowAccess(['admin']),getAdmin)


export default adminRoute