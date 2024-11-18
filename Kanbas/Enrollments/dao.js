import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const newEnrollment = { 
    _id: Date.now(), 
    user: userId, 
    course: courseId 
  };
  enrollments.push(newEnrollment);
  return newEnrollment;  // Return the created enrollment
}

export const deleteEnrollment = (userId, courseId) => {
  const { enrollments } = Database;
  const enrollmentToDelete = enrollments.find(
    enrollment => enrollment.user === userId && enrollment.course === courseId
  );
  if (enrollmentToDelete) {
    Database.enrollments = enrollments.filter(
      enrollment => !(enrollment.user === userId && enrollment.course === courseId)
    );
    return enrollmentToDelete;  // Return the deleted enrollment
  }
  return null;
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
  const { enrollments } = Database;
  return enrollments.filter(
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

export const findAllEnrollments = () => {
  return Database.enrollments;
};
