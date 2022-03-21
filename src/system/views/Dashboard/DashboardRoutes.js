import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";

import {
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
        { element: <Navigate to="/dashboard/overview" replace /> },
        { path: "/dashboard", element: <Navigate to="/dashboard/overview" /> },
        { path: "murid/saat-teduh", element: <SaatTeduh /> },
        { path: "murid/Internalisasi", element: <Internalisasi /> },
        { path: "pembina", element: <Pembina /> },
        { path: "overview", element: <Overview /> },
        { path: "manage-kelas/jadwal", element: <Jadwal /> },
        { path: "manage-kelas/kelas", element: <Kelas /> },
        { path: "manage-users/buat-user", element: <BuatUser /> },
        { path: "manage-users/daftar-user", element: <DaftarUser /> },
        { path: "manage-server/public", element: <Public /> },
        { path: "manage-server/data-processing", element: <DataProcessing /> },
        {
          path: "manage-server/resource-monitor",
          element: <ResourceMonitor />,
        },
        { path: "manage-server/server-log", element: <ServerLog /> },
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
