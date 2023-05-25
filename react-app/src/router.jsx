import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";

import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Register from "./views/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;
