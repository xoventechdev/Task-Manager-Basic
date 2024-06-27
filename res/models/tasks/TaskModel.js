import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true, default: "new" }, // Can be 'ToDo', 'InProgress', 'Done', 'Completed'
    email: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TaskModel = mongoose.model("Task", taskSchema);
