import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import {
  Beranda,
  SaatTeduh,
  Internalisasi,
  Pembina,
  Overview,
  Jadwal,
  Kelas,
  BuatUser,
  DaftarUser,
  Public,
  DataProcessing,
  ResourceMonitor,
  ServerLog,
  Profile,
  NotFound,
} from "./pages";

export default function DashboardRoutes() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/beranda" /> },
        { path: "/dashboard", element: <Navigate to="/dashboard/beranda" /> },
        { path: "beranda", element: <Beranda /> },
        {
          path: "murid/saat-teduh",
          element: (
            <ProtectedRoute level={0}>
              <SaatTeduh />
            </ProtectedRoute>
          ),
        },
        {
          path: "murid/Internalisasi",
          element: (
            <ProtectedRoute level={0}>
              <Internalisasi />
            </ProtectedRoute>
          ),
        },
        {
          path: "pembina",
          element: (
            <ProtectedRoute level={1}>
              <Pembina />
            </ProtectedRoute>
          ),
        },
        { path: "overview", element: <Overview /> },
        {
          path: "manage-kelas/jadwal",
          element: (
            <ProtectedRoute level={2}>
              <Jadwal />
            </ProtectedRoute>
          ),
        },
        {
          path: "manage-kelas/kelas",
          element: (
            <ProtectedRoute level={2}>
              <Kelas />
            </ProtectedRoute>
          ),
        },
        {
          path: "manage-users/buat-user",
          element: (
            <ProtectedRoute level={3}>
              <BuatUser />
            </ProtectedRoute>
          ),
        },
        {
          path: "manage-users/daftar-user",
          element: (
            <ProtectedRoute level={2}>
              <DaftarUser />
            </ProtectedRoute>
          ),
        },
        {
          path: "manage-server/public",
          element: (
            <ProtectedRoute level={3}>
              <Public />
            </ProtectedRoute>
          ),
        },
        {
          path: "manage-server/data-processing",
          element: (
            <ProtectedRoute level={3}>
              <DataProcessing />
            </ProtectedRoute>
          ),
        },
        {
          path: "manage-server/resource-monitor",
          element: (
            <ProtectedRoute level={3}>
              <ResourceMonitor />
            </ProtectedRoute>
          ),
        },
        {
          path: "manage-server/server-log",
          element: (
            <ProtectedRoute level={3}>
              <ServerLog />
            </ProtectedRoute>
          ),
        },
        { path: "profile", element: <Profile /> },
        { path: "*", element: <Navigate to="/404" /> },
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
