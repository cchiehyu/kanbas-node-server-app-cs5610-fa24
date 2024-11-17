import Database from "../Database/index.js";

export function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }
  
export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
   }
   
export function createAssignment(module) {
    const newAssignment = { ...assignmen, _id: Date.now().toString() };
    Database.assignment = [...Database.assignments, newAssignment];
    return newAssignment;
  }
  
export function finAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}