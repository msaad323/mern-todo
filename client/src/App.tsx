import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Todos from "@/pages/Todos";
import { AuthProvider } from "./context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    // Public Routes
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <Signup />,
    },
    {
      element: <PrivateRoute />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/todos", element: <Todos /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
