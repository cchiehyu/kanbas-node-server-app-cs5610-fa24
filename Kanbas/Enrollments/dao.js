import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export const deleteEnrollment = (userId, courseId) => {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    enrollment => !(enrollment.user === userId && enrollment.course === courseId)
  );
};

export const unenrollUserFromCourse = (userId, courseId) => {
  return deleteEnrollment(userId, courseId);
};

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
 