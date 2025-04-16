import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // Get all enrollments
  app.get("/api/enrollments", async (req, res) => {
    try {
      const enrollments = await dao.findAllEnrollments();
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get courses for a specific user
  app.get("/api/users/:userId/courses", async (req, res) => {
    try {
      const { userId } = req.params;
      const courses = await dao.findCoursesForUser(userId);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get users for a specific course
  app.get("/api/courses/:courseId/users", async (req, res) => {
    try {
      const { courseId } = req.params;
      const users = await dao.findUsersForCourse(courseId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Check if a user is enrolled in a course
  app.get(
    "/api/users/:userId/courses/:courseId/enrollment",
    async (req, res) => {
      try {
        const { userId, courseId } = req.params;
        const enrollment = await dao.findEnrollment(userId, courseId);
        if (enrollment) {
          res.json(enrollment);
        } else {
          res.status(404).json({ message: "Enrollment not found" });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );

  // Enroll a user in a course
  app.post("/api/users/:userId/courses/:courseId", async (req, res) => {
    try {
      const { user, course } = req.body;
      const newEnrollment = await dao.enrollUserInCourse(user, course);
      res.json(newEnrollment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Unenroll a user from a course
  app.delete("/api/users/:userId/courses/:courseId", async (req, res) => {
    try {
      const { userId, courseId } = req.params;
      const status = await dao.unenrollUserFromCourse(userId, courseId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/users/:userId/enrollments", async (req, res) => {
    try {
      const { userId } = req.params;
      const enrollments = await dao.findEnrollForUser(userId);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const enrollments = await dao.findEnrollForCourse(courseId);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/users/:userId/courses", async (req, res) => {
    try {
      const { userId } = req.params;
      const enrollments = await dao.findEnrollForUser(userId);
      const courses = enrollments.map((enrollment) => enrollment.course);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/courses/:courseId/users", async (req, res) => {
    try {
      const { courseId } = req.params;
      const enrollments = await dao.findEnrollForCourse(courseId);
      const users = enrollments.map((enrollment) => enrollment.user);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}
