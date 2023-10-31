import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body,
  param
} from 'express-validator';
import Program from '../../models/Program.js';
import NotFoundError from '../../errors/notFound.js';
import Course from '../../models/Course.js';
import BadRequest from '../../errors/badRequest.js';

export const addCourseValidator = [
  body('courseId').notEmpty().isNumeric().withMessage('courseId required and must be numeric value')
    .custom(async (val) => {
      const course = await Course.findOne({ courseId: val });
      if (course)
        throw new BadRequest('courseId must be unique numeric value')
      return true
    }),
  body('name').notEmpty().withMessage('name required'),
  body('program').notEmpty().isMongoId().withMessage('program required and must be ObjectId')
    .custom(async (val) => {
      const program = await Program.findById(val)
      if (!program)
        throw new NotFoundError(`No program for this id: ${val}`)
      return true
    }),
  validatorMiddleware
];

export const getSpecificValidator = [
  param('id')
    .custom(async (val) => {
      const course = await Course.findById(val)
      if (!course)
        throw new NotFoundError(`No course for this id: ${val}`)
      return true
    }),
  validatorMiddleware
];