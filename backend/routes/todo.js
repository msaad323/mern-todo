import express from "express";
import { fetchTodo, createTodo, updateTodo, deleteTodo } from "../controllers/todo.js";

const router = express.Router();

router.route("/").get(fetchTodo).post(createTodo)
router.route("/:id").put(updateTodo).delete(deleteTodo)

export default router;
