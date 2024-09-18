import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./components/Dashboard.tsx";
import Home from "@/components/Home.tsx";

import UserList from "@/pages/users/UserList.tsx";
import UserAdd from "@/pages/users/UserAdd.tsx";
import UserEdit from "@/pages/users/UserEdit.tsx";

import Login from "@/pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/users/list/",
    element: <UserList />,
  },
  {
    path: "/users/add/",
    element: <UserAdd />,
  },
  {
    path: "/users/edit/:id",
    element: <UserEdit />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
