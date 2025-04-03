import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
  return Database.courses;
}

export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );
  return enrolledCourses;
}

// New function to find all courses not enrolled by a user
export function findCoursesNotEnrolledByUser(userId) {
  const { courses, enrollments } = Database;
  const notEnrolledCourses = courses.filter(
    (course) =>
      !enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === course._id
      )
  );
  return notEnrolledCourses;
}

export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  Database.courses = [...Database.courses, newCourse];
  return newCourse;
}

export function deleteCourse(courseId) {
  const { courses, enrollments } = Database;
  Database.courses = courses.filter((course) => course._id !== courseId);
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
  );
  return { status: "OK" };
}

export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database;
  const course = courses.find((course) => course._id === courseId);
  if (course) {
    Object.assign(course, courseUpdates);
    return course;
  }
  return null;
}
