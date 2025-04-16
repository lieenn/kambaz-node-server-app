//import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export async function findAllCourses() {
  const courses = await model.find();
  return courses;
}

export async function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  const actualCourse = await model.create(newCourse);
  return actualCourse;
}

export async function deleteCourse(courseId) {
  const status = await model.deleteOne({ _id: courseId });
  return status;
}

export async function updateCourse(courseId, courseUpdates) {
  const status = await model.updateOne(
    { _id, courseId },
    { $set: courseUpdates }
  );
  return status;
}
