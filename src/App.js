import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  { path: "/auth", element: <LoginPage /> },
  { path: "/home", element: <HomePage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
