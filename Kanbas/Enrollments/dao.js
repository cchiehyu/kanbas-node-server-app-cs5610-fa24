import model from "./model.js";

export const findEnrollmentsByCourse = async (courseId) => {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments;
};

export const createEnrollment = async (enrollment) => {
  const newEnrollment = await model.create(enrollment);
  return newEnrollment;
};

export const isUserEnrolled = async (userId, courseId) => {
  const enrollment = await model.findOne({ 
    user: userId, 
    course: courseId 
  });
  return enrollment !== null;
};

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}
 