import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllEnrollments() {
  return Database.enrollments;
}

export function findEnrollmentsForUser(userId) {
  return Database.enrollments.filter(
    (enrollment) => enrollment.user === userId
  );
}

export function findEnrollment(userId, courseId) {
  return Database.enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
}

export function enrollUserInCourse(userId, courseId) {
  // Check if already enrolled
  const existingEnrollment = findEnrollment(userId, courseId);
  if (existingEnrollment) {
    return existingEnrollment;
  }

  const newEnrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId,
  };

  Database.enrollments.push(newEnrollment);
  console.log("Enrollment created:", newEnrollment);
  console.log("Current enrollments:", Database.enrollments);
  return newEnrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
  const initialLength = Database.enrollments.length;
  console.log("Before unenroll:", Database.enrollments);

  Database.enrollments = Database.enrollments.filter(
    (enrollment) =>
      !(enrollment.user === userId && enrollment.course === courseId)
  );

  console.log("After unenroll:", Database.enrollments);
  return {
    success: initialLength > Database.enrollments.length,
    status: "OK",
  };
}
