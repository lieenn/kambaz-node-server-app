import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllAssignments() {
  return Database.assignments;
}

export function findAssignmentById(id) {
  return Database.assignments.find((assignment) => assignment._id === id);
}

export function findAssignmentsByCourse(courseId) {
  return Database.assignments.filter(
    (assignment) => assignment.course === courseId
  );
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function updateAssignment(id, assignment) {
  const index = Database.assignments.findIndex((a) => a._id === id);
  if (index !== -1) {
    Database.assignments[index] = {
      ...Database.assignments[index],
      ...assignment,
    };
    return Database.assignments[index];
  }
  return null;
}

export function deleteAssignment(id) {
  const assignment = findAssignmentById(id);
  if (assignment) {
    Database.assignments = Database.assignments.filter((a) => a._id !== id);
    return assignment;
  }
  return null;
}
