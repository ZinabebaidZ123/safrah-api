import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  courseId: {
    type: Number,
    required: [true, 'courseId required'],
    unique: [true, 'courseId unique']
  },
  name: {
    type: String,
    required: [true, 'name required']
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: 'Program',
    required: [true, 'program required']
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student',
  }],
}, { timestamps: true });


courseSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

export default model('Course', courseSchema);