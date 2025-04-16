//import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findAllAssignments() {
  return model.find();
}

export async function findAssignmentById(id) {
  return model.findById(id);
}

export async function findAssignmentsByCourse(courseId) {
  return model.find({ course: courseId });
}

export async function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  const actualAssignment = await model.create(newAssignment);
  return actualAssignment;
}

export async function updateAssignment(id, assignment) {
  return model.updateOne({ _id: id }, { $set: assignment });
}

export async function deleteAssignment(id) {
  return model.deleteOne({ _id: id });
}
