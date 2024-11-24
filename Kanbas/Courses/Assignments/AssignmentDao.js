import Database from "../../Database/index.js";

export function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    if (assignment) {
        Object.assign(assignment, assignmentUpdates);
    }
    return assignment;
}
  
export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
}
   
export function createAssignment(assignment) {
    if (!Database.assignments) {
        Database.assignments = [];
    }
    const newAssignment = {
        ...assignment,
        _id: Date.now().toString()
    };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}
  
export function findAssignmentsForCourse(courseId) { 
    const { assignments } = Database;
    return assignments.filter((assignment) => assignment.course === courseId);
}