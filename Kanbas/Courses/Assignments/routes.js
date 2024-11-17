import * as dao from "./dao.js";
import * as assignmentsDao from "./assignments/dao.js";

export default function AssignmentRoutes(app) {
    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assigmentUpdates = req.body;
        assignmentsDao.updateAssignment(assignmentId, assigmentUpdates);
        res.sendStatus(204);
      });

    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        assignmentsDao.deleteModule(assignmentId);
        res.sendStatus(204);
    });

    app.get("/api/assignments/:assignmentId/assignments", (req, res) => {
        const { assignmentId } = req.params;
        const assignments = modulesDao.findAssignmentsForCourse(assignmentId);
        res.json(assignments);
      });

        // Move the POST route inside the function
  app.post("/api/assignments/:assignmentId/assignments", (req, res) => {
    const { assignmentId } = req.params;
    const assignment = {
      ...req.body,
      assignment: assignmentId,
    };
    const newAssignment = modulesDao.createModule(assignment);
    res.send(newAssignment);
  });
    
}