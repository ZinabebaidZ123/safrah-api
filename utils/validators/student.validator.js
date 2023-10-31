import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  body,
  query
} from 'express-validator';
import Student from '../../models/Student.js';
import BadRequest from '../../errors/badRequest.js';
import Course from '../../models/Course.js';
import NotFoundError from '../../errors/notFound.js';



export const addStudentValidator = [
  body('ID').notEmpty().isNumeric().withMessage('ID required and must be numeric value'),
  body("name").notEmpty().withMessage('name required'),
  body('courseId').isNumeric().withMessage('courseId required and must be numeric value')
    .custom(async (val) => {
      const course = await Course.findOne({ courseId: val });
      if (!course)
        throw new NotFoundError(`No course for this id: ${val}`)
      return true
    }),
  body('degree').isNumeric().withMessage('degree required and must be numeric value'),
  body('evaluation').isString().withMessage('evaluation required and must be numeric value')
    .custom((val) => {
      const arrOfEvaluations = [
        'A',
        '-A',
        '+B',
        'B',
        '-B',
        '+C',
        'C',
        'F'
      ];
      if (!arrOfEvaluations.includes(val))
        throw new BadRequest(`evaluation must be A, -A, +B, B, -B, +C, C or F`)
      return true
    }),
  validatorMiddleware
];

export const getDataValidator = [
  query('ID')
    .custom(async (val) => {
      const student = await Student.findOne({ ID: val });
      if (!student)
        throw new BadRequest(`No found student for this ID: ${val}`)
      return true
    }),
  validatorMiddleware,
]

