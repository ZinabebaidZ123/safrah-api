import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  _id: false,
  programID: {
    type: Schema.Types.ObjectId,
    ref:'Program'
  },
  id: {
    type: Schema.Types.ObjectId,
    ref:'Course'
  },
  courseId: {
    type: Number,
    required: [true,'courseId required']
  },
  degree: {
    type: Number,
    required: [true, 'degree required']
  },
  evaluation: {
    type: String,
    required: [true, 'evaluation required'],
    enum: [
      'A',
      '-A',
      '+B',
      'B',
      '-B',
      '+C',
      'C',
      'F'
    ]
  },
  image: String,
}) 

const studentSchema = new Schema({
  ID: {
    type: Number,
    required: [true, 'ID required'],
    unique: [true, 'ID unique']
  },
  name: {
    type: String,
    required: [true, 'name required']
  },
  courses: [courseSchema],
}, { timestamps: true });

studentSchema.set('strictPopulate', false);

studentSchema.pre(/^find/, function (next) {
  this.select("-__v -createdAt -updatedAt");
  next()
});

export default model('Student', studentSchema);