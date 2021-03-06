import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faGraduationCap,
  faUserGear,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const getFaIcon = (name) => <FontAwesomeIcon icon={name} size="lg" />;

const sidebarConfigAdmin = [
  {
    title: "Overview",
    path: "/dashboard/overview",
    icon: getFaIcon(faChartLine),
  },
  {
    title: "Manage Kelas",
    path: "/dashboard/manage-kelas",
    icon: getFaIcon(faGraduationCap),
    children: [
      { title: "Kelas", path: "/dashboard/manage-kelas/kelas" },
      { title: "Jadwal", path: "/dashboard/manage-kelas/jadwal" },
    ],
  },
  {
    title: "Manage Users",
    path: "/dashboard/manage-users",
    icon: getFaIcon(faUserGear),
    children: [
      { title: "Daftar User", path: "/dashboard/manage-users/daftar-user" },
      { title: "Buat User", path: "/dashboard/manage-users/buat-user" },
    ],
  },
  {
    title: "Manage Server",
    path: "/dashboard/manage-server",
    icon: getFaIcon(faCog),
    children: [
      {
        title: "Public",
        path: "/dashboard/manage-server/public",
      },
      {
        title: "Data Processing",
        path: "/dashboard/manage-server/data-processing",
      },
      {
        title: "Resource Monitor",
        path: "/dashboard/manage-server/resource-monitor",
      },
      { title: "Server Log", path: "/dashboard/manage-server/server-log" },
    ],
  },
];

export default sidebarConfigAdmin;
