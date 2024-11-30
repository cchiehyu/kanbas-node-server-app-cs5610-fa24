import model from "./model.js";

export const isUserEnrolled = (userId, courseId) => {
  const { enrollments } = Database;
  return enrollments.some(
    enrollment => enrollment.user === userId && enrollment.course === courseId
  );
};

export const findEnrollmentsByCourse = (courseId) => {
  return Database.enrollments.filter(
    enrollment => enrollment.course === courseId
  );
};

export const createEnrollment = (enrollment) => {
  const { enrollments } = Database;
  const newEnrollment = {
    _id: Date.now(),
    ...enrollment
  };
  enrollments.push(newEnrollment);
  return newEnrollment;
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
 