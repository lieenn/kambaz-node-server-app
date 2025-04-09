import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";

export default function CourseRoutes(app) {
  // Get all courses
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  // CRUD operations for courses
  app.post("/api/courses", (req, res) => {
    const newCourse = dao.createCourse(req.body);
    res.json(newCourse);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.json(status);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.json(status);
  });

  // Module routes
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.json(newModule);
  });

  // Assignment routes
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsByCourse(courseId);
    res.json(assignments);
  });

  app.get("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignment = assignmentsDao.findAssignmentById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(assignment);
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = assignmentsDao.createAssignment(assignment);
    res.json(newAssignment);
  });

  app.put("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const updatedAssignment = assignmentsDao.updateAssignment(
      assignmentId,
      req.body
    );
    res.json(updatedAssignment);
  });

  app.delete("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const deletedAssignment = assignmentsDao.deleteAssignment(assignmentId);
    res.json(deletedAssignment);
  });
}
