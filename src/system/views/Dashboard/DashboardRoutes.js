import { Navigate, useRoutes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "./layouts/dashboard";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import User from "./pages/User";
import Profile from "./pages/Profile";
import ManageClass from "./pages/ManageClass";

import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import NotFound from "./pages/Page404";

export default function DashboardRoutes() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" replace /> },
        { path: "home", element: <DashboardApp /> },
        { path: "profile", element: <Profile /> },
        { path: "user", element: <User /> },
        { path: "products", element: <Products /> },
        { path: "manageclass", element: <ManageClass /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "kelas-pengajaran" },
        { path: "signin" },
        { path: "register" },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
