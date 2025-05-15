import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type TodoFormState = {
  title: string;
  description: string;
};

const TodoApp = () => {
  const [formData, setFormData] = useState<TodoFormState>({
    title: "",
    description: "",
  });
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let editingTodo = location.state?.todo;

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description,
      });
    }
  }, [editingTodo]);

  const handleAuth = async () => {
    if (isLoggedIn) {
      try {
        await axios.post(
          "http://localhost:3000/api/v1/auth/logout",
          {},
          { withCredentials: true }
        );
        setIsLoggedIn(false);
        navigate("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    } else {
      navigate("/login");
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingTodo) {
        await axios.put(
          `http://localhost:3000/api/v1/todos/${editingTodo._id}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post("http://localhost:3000/api/v1/todos", formData, {
          withCredentials: true,
        });
      }
  
      setFormData({ title: "", description: "" });
      navigate("/todos");
    }  catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4 px-8 flex justify-between items-center border-b border-slate-200">
        <div className="text-2xl font-semibold text-slate-800">MyToDo</div>

        <button
          onClick={handleAuth}
          className="text-sm cursor-pointer bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </nav>

      {/* To-Do Form */}
      <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-md border border-slate-200 rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-lg font-medium mb-6 text-slate-700">
            Add a New To-Do
          </h2>
          <Link
            to="/todos"
            className=" cursor-pointer text-shadow-slate-800 px-4 py-2 rounded-md hover:font-semibold transition"
          >
            Todos
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-slate-600">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-slate-600">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter description"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-500 transition"
          >
            {editingTodo ? "Update To-Do" : "Add To-Do"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoApp;
