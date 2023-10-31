import { Router } from 'express';
const router = Router();

import protectRoute from '../middleware/authMiddleware.js';
import { allowTo } from '../controller/user.controller.js';


import {
  addStudentValidator, getDataValidator,
} from '../utils/validators/student.validator.js';
import { addStudent, getStudentData } from '../controller/student.controller.js';
import { uploadSingleImage } from '../middleware/uploadImageMiddleWare.js';





router.post(
  '/add',
  protectRoute,
  allowTo('admin'),
  uploadSingleImage('image','certificate'),
  addStudentValidator,
  addStudent
);

router.get('/get/data', getDataValidator, getStudentData);


export default router;