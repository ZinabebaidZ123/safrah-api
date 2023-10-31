import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Program from "../models/Program.js";

export const addStudent = asyncHandler(async (req, res) => {
  let student = await Student.findOne({ ID: req.body.ID });
  const course = await Course.findOne({ courseId: req.body.courseId });
  if (req.file) {
    req.body.courses = { image: `${process.env.BASE_URL}/certificate/${req.file.filename}` };
  }
  const { courseId, degree, evaluation } = req.body;
  req.body.courses = {
    ...req.body.courses,
    programID: course.program,
    id: course?._id,
    courseId,
    degree,
    evaluation
  };
  if (student) {
    student = await Student.findOneAndUpdate(
      { ID: req.body.ID },
      { $addToSet: { courses: req.body.courses } },
      { new: true, runValidators: true }
    );
    await Course.findOneAndUpdate(
      { courseId: courseId },
      { $addToSet: { students: student?._id } }
    );
    return res.status(StatusCodes.CREATED).json({
      status: "Success",
      student
    });
  }
  student = await Student.create(req.body);
  await Course.findOneAndUpdate(
    { courseId: courseId },
    { $addToSet: { students: student?._id } }
  );
  res.status(StatusCodes.CREATED).json({
    status: "Success",
    student
  });
});

export const getStudentData = asyncHandler(async (req, res) => {
  // Get Program 
  const program = await Program.findOne({ ID: req.query.programID });
  // Get Courses depend on program and student ID
  const student = await Student.findOne({ ID: req.query.ID }).populate({
    path: 'courses.id',
    select:'name'
  });

  const courses = student?.courses
    .filter((course) => course.programID.toString() === program._id.toString());
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      courses
    })
})