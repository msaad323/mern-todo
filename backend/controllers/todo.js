import Todo from "../models/todo.js";
import asyncHandler from 'express-async-handler';

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTodo = await Todo.create({
      userId: req.user.id,
      title,
      description,
    });

    res.status(201).json({
      status: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.error("Create Todo Error:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const fetchTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos", error: err.message });
  }
};

export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  if (todo.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updated = await Todo.findByIdAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );

  if (!updated) {
    res.status(400);
    throw new Error("Failed to update todo");
  }
  res.json(updated);
});


export const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
    //   userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete todo", err });
  }
};
