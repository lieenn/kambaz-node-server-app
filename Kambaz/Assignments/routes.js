import * as dao from "./dao.js";

function AssignmentRoutes(app) {
  // Find all assignments
  app.get("/api/assignments", async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  });

  // Find assignment by ID
  app.get("/api/assignments/:id", async (req, res) => {
    const { id } = req.params;
    const assignment = await dao.findAssignmentById(id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(assignment);
  });

  // Find assignments by course ID
  app.get("/api/assignments/course/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsByCourse(courseId);
    res.json(assignments);
  });

  // Create a new assignment
  app.post("/api/assignments", async (req, res) => {
    const newAssignment = await dao.createAssignment(req.body);
    res.status(201).json(newAssignment);
  });

  // Update an assignment by ID
  app.put("/api/assignments/:id", async (req, res) => {
    const { id } = req.params;
    const updatedAssignment = await dao.updateAssignment(id, req.body);
    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(updatedAssignment);
  });

  // Delete an assignment by ID
  app.delete("/api/assignments/:id", async (req, res) => {
    const { id } = req.params;
    const deletedAssignment = await dao.deleteAssignment(id);
    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(deletedAssignment);
  });
}

export default AssignmentRoutes;
