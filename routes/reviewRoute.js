import {Router} from 'express';
import { createReview, getAllReviews, getStats } from '../controller/reviewController.js';
import { authorize,allowAccess } from '../auth/verifyToken.js';


const reviewRoute = Router()

reviewRoute.get('/stats/:docId',authorize,allowAccess(['patient','doctor','admin']),getStats)
reviewRoute.post('/',authorize,allowAccess(['patient']),createReview)
reviewRoute.get('/:doctor',authorize,allowAccess(['patient','doctor']),getAllReviews)


export default reviewRoute