import Database from "../Database/index.js";

export function findAllCourses() {
  return Database.courses;
}

export function createCourse(course) {
    const newCourse = { ...course, _id: Date.now().toString() };
    Database.courses = [...Database.courses, newCourse];
    return newCourse;
  }

  export function deleteCourse(courseId) {
    const { courses, enrollments } = Database;
    Database.courses = courses.filter((course) => course._id !== courseId);
    Database.enrollments = enrollments.filter(
      (enrollment) => enrollment.course !== courseId
  );}
  