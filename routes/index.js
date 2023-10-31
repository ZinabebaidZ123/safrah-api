import userRoute from './user.route.js';
import programRoute from './program.route.js';
import courseRoute from './course.route.js';
import studentRoute from './student.route.js';
import departmentRoute from './department.route.js';

export default (app) => {
  app.use('/api/v1/department', departmentRoute);
  app.use('/api/v1/auth', userRoute);
  app.use('/api/v1/program', programRoute);
  app.use('/api/v1/course', courseRoute);
  app.use('/api/v1/student', studentRoute);
};
