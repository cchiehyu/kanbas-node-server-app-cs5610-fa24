//import Database from "../Database/index.js";
import model from "./model.js";
export function findAllCourses() {
  //return Database.courses;
  return model.find();
}

export function createCourse(course) {
  const isDuplicate = Database.courses.some(
    existingCourse => existingCourse.number.toLowerCase() === course.number.toLowerCase()
  );
 
  if (isDuplicate) {
    console.log(`Course with number ${course.number} already exists`);
    return null;
  }
 
  delete course._id;
  return model.create(course);
  //const newCourse = { ...course, _id: Date.now().toString() };
  //Database.courses = [...Database.courses, newCourse];
  //return newCourse;
 }

 export async function deleteCourse(courseId) {
  try {
    // Delete the course document
    const result = await model.deleteOne({ _id: courseId });
    
    // If course was successfully deleted, clean up related enrollments
    if (result.deletedCount > 0) {
      // Assuming you have an enrollment model
      await enrollmentModel.deleteMany({ course: courseId });
    }
    
    return result;
  } catch (error) {
    throw new Error(`Failed to delete course: ${error.message}`);
  }
}
  
  export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
    //const { courses } = Database;
    //const course = courses.find((course) => course._id === courseId);
    //Object.assign(course, courseUpdates);
    //return course;
  }
  
  export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
  }

  
  