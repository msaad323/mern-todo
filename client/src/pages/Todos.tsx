import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Todo = {
  _id: string;
  title: string;
  description: string;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("https://mern-todo-npc5.onrender.com/api/v1/todos", {
          withCredentials: true,
        });
        setTodos(res.data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`https://mern-todo-npc5.onrender.com/api/v1/todos/${id}`, {
        withCredentials: true,
      });
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="text-gray-600 text-lg font-medium">Loading Todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Todos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="relative bg-white rounded-xl shadow-md p-5 border border-gray-200"
          >
            <h3 className="text-xl font-semibold">{todo.title}</h3>
            <p className="text-gray-600 mt-2">{todo.description}</p>
            <button
              onClick={() => navigate("/", { state: { todo } })}
              className="absolute bottom-3 right-10 cursor-pointer text-gray-500 hover:text-gray-700 transition"
              aria-label="Edit todo"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="absolute bottom-3 right-3 cursor-pointer text-red-500 hover:text-red-700 transition"
              aria-label="Delete todo"
            >
              <Trash size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
