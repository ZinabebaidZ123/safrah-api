import {
  StatusCodes
} from "http-status-codes";
import asyncHandler from 'express-async-handler';
import Course from "../models/Course.js";
import { setPagination } from "../utils/pagination.js";
import Program from "../models/Program.js";
import Student from "../models/Student.js";

export const addCourse = asyncHandler(async (req, res) => {
  const course = await Course.create({
    courseId: req.body.courseId,
    name: req.body.name,
    program: req.body.program,
  });

  await Program.findByIdAndUpdate(
    req.body.program,
    { $addToSet: { courses: course?._id } }
  );
  res.status(StatusCodes.CREATED)
    .json({
      status: "Success",
      course
    });
});

export const getAllCourses = asyncHandler(async (req, res) => {
  const { limit, pagination, skip } = await setPagination(Course, req);
  const allCourses = await Course.find({}).populate({
    path: 'students',
    select:'ID name'
  }).populate({
    path: 'program',
    select:'name'
  })
    .limit(limit).skip(skip);
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      count: allCourses.length,
      pagination,
      allCourses
    });
});

export const getSpecificCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'students',
    select: 'ID name courses'
  }).populate({
    path: 'program',
    select: 'name'
  });
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      course
    });
});

export const updateSpecificCourse = asyncHandler(async (req, res) => {
  const updateCourse = await Course.findByIdAndUpdate(
    req.params.id,
    {
      courseId: req.body.ID,
      name: req.body.name,
      program: req.body.program,
    },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      updateCourse
    });
});

export const deleteSpecificCourse = asyncHandler(async (req, res) => { 
  const course = await Course.findByIdAndRemove(req.params.id);
  await Program.findByIdAndUpdate(
    course.program,
    { $pull: { courses: course?._id } },
    { new: true, runValidators: true }
  );
  await Student.updateMany(
    { "courses.id": course?._id },
    { $pull: { courses: { id: course?._id } } },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK)
    .json({
      status: "Success",
      message:"Course deleted successfully"
    });
})