import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findModulesForCourse(courseId) {
  const modules = await model.find({ course: courseId });
  return modules;
  // const { modules } = Database;
  // return modules.filter((module) => module.course === courseId);
}

export async function createModule(module) {
  const newModule = { ...module, _id: uuidv4() };
  const actualModule = await model.create(newModule);
  return actualModule;
  // const newModule = { ...module, _id: uuidv4() };
  // Database.modules = [...Database.modules, newModule];
  // return newModule;
}

export async function deleteModule(moduleId) {
  // const { modules } = Database;
  // Database.modules = modules.filter((module) => module._id !== moduleId);
  const status = await model.deleteOne({ _id: moduleId });
  return status;
}

export async function updateModule(moduleId, moduleUpdates) {
  // const { modules } = Database;
  // const module = modules.find((module) => module._id === moduleId);
  // Object.assign(module, moduleUpdates);
  // return module;
  const status = await model.updateOne({ _id: moduleId }, moduleUpdates);
  return status;
}
