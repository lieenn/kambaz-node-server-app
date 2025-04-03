import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // Get all enrollments
  app.get("/api/enrollments", (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  });

  // Get enrollments for a specific user
  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  });

  // Get users enrolled in a specific course
  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    const userIds = dao.findUsersForCourse(courseId);
    res.json(userIds);
  });

  // Check if a user is enrolled in a course
  app.get("/api/users/:userId/courses/:courseId/enrollments", (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = dao.findEnrollment(userId, courseId);
    if (enrollment) {
      res.json(enrollment);
    } else {
      res.status(404).json({ message: "Enrollment not found" });
    }
  });

  // Enroll a user in a course
  app.post("/api/enrollments", (req, res) => {
    const { user: userId, course: courseId } = req.body;
    const newEnrollment = dao.enrollUserInCourse(userId, courseId);
    res.json(newEnrollment);
  });

  // Unenroll a user from a course
  app.delete("/api/users/:userId/courses/:courseId/enrollments", (req, res) => {
    const { userId, courseId } = req.params;
    const status = dao.unenrollUserFromCourse(userId, courseId);
    res.json(status);
  });
}
