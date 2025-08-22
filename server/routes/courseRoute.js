import express from 'express';
import { get } from 'mongoose';
import { getAllCourse ,getCourseId} from '../controllers/courseController.js';

const courseRouter = express.Router();

courseRouter.get('/all', getAllCourse)
courseRouter.get('/:id',getCourseId)

export default courseRouter;