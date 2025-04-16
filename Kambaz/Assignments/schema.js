import mongoose from "mongoose";
const assingmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    description: String,
    available: String,
    due: String,
  },
  { collection: "assignments" }
);
export default assingmentSchema;
