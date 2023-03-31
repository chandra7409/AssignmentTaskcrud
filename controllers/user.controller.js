const Task = require("../models/Task.model");

const CreateTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "some internal server error" });
  }
};

const UpdateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = req.body.task;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "some internal server error" });
  }
};

const GetTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "some internal server error" });
  }
};

const GetAllTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "some internal server error" });
  }
};

const DeleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "some internal server error" });
  }
};

module.exports = {
  CreateTask,
  UpdateTask,
  GetTask,
  GetAllTask,
  DeleteTask,
};
