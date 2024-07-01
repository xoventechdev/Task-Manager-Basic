import { TaskModel } from "../../models/tasks/TaskModel.js";

export const createTask = async (req, res) => {
  try {
    let data = req.body;
    data.email = req.email;
    await TaskModel.create(data)
      .then(() => {
        res
          .status(200)
          .json({ status: "success", response: "Task created successfully" });
      })
      .catch((err) => {
        res.status(500).json({ status: "error", response: err.message });
      });
  } catch (error) {
    res.status(500).json({ status: "error", response: err.message });
  }
};

export const allTaskList = async (req, res) => {
  try {
    await TaskModel.find({ email: req.email })
      .then((data) => {
        res.status(200).json({ status: "success", response: data });
      })
      .catch((err) => {
        res.status(500).json({ status: "error", response: err.message });
      });
  } catch (error) {
    res.status(500).json({ status: "error", response: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id, status } = req.params;
    const updatedTask = await TaskModel.updateOne(
      { _id: id },
      { status: status }
    );
    if (updatedTask.modifiedCount === 0) {
      return res.status(404).json({
        status: "error",
        response: "Task with the provided ID not found",
      });
    }
    res.status(200).json({
      status: "success",
      response: "Task status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      response: "An error occurred while updating the task",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    let { id } = req.params;
    await TaskModel.deleteOne({ _id: id })
      .then(() => {
        res.status(200).json({
          status: "success",
          response: "Task deleted successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({ status: "error", response: err.message });
      });
  } catch (error) {
    res.status(500).json({ status: "error", response: error.message });
  }
};

export const listTaskByStatus = async (req, res) => {
  try {
    let { status } = req.params;
    let item = await TaskModel.aggregate([
      { $match: { status: status, email: req.email } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createdDate: "$createdAt",
        },
      },
    ]);

    if (item) {
      res.status(200).json({
        status: "success",
        response: item,
      });
    } else {
      res.status(500).json({ status: "error", response: err.message });
    }
  } catch (error) {
    res.status(500).json({ status: "error", response: err.message });
  }
};

export const countTaskByStatus = async (req, res) => {
  try {
    let item = await TaskModel.aggregate([
      { $match: { email: req.email } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ])
      .then(() => {
        res.status(200).json({
          status: "success",
          response: item,
        });
      })
      .catch((err) => {
        res.status(500).json({ status: "error", response: err.message });
      });
  } catch (error) {
    res.status(500).json({ status: "error", response: err.message });
  }
};
