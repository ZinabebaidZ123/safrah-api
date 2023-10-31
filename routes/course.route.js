import { Router } from 'express';
const router = Router();

import protectRoute from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';

import {
  addCourseValidator, getSpecificValidator
} from '../utils/validators/course.validator.js';
import {
  addCourse,
  deleteSpecificCourse,
  getAllCourses,
  getSpecificCourse,
  updateSpecificCourse
} from '../controller/course.controller.js';



router.post('/add', protectRoute, allowTo('admin'), addCourseValidator, addCourse);
router.get('/all', protectRoute, allowTo('admin'), getAllCourses);
router.get('/one/:id', protectRoute, allowTo('admin'), getSpecificValidator, getSpecificCourse);
router.patch('/update/:id', protectRoute, allowTo('admin'), getSpecificValidator, updateSpecificCourse);
router.delete('/delete/:id', protectRoute, allowTo('admin'), getSpecificValidator, deleteSpecificCourse);

export default router;