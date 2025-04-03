import * as dao from "./dao.js";

function AssignmentRoutes(app) {
  // Find all assignments
  app.get("/api/assignments", (req, res) => {
    const assignments = dao.findAllAssignments();
    res.json(assignments);
  });

  // Find assignments by course ID - this specific route MUST come before the generic :id route
  app.get("/api/assignments/course/:courseId", (req, res) => {
    const { courseId } = req.params;
    console.log(`Finding assignments for course: ${courseId}`);
    const assignments = dao.findAssignmentsByCourse(courseId);
    console.log(`Found ${assignments.length} assignments`);
    res.json(assignments);
  });

  // Find assignment by ID
  app.get("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = dao.findAssignmentById(id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(assignment);
  });

  // Create a new assignment
  app.post("/api/assignments", (req, res) => {
    const newAssignment = dao.createAssignment(req.body);
    res.status(201).json(newAssignment);
  });

  // Update an assignment by ID
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const updatedAssignment = dao.updateAssignment(id, req.body);
    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(updatedAssignment);
  });

  // Delete an assignment by ID
  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const deletedAssignment = dao.deleteAssignment(id);
    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(deletedAssignment);
  });
}

export default AssignmentRoutes;
