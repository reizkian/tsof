import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faUsers } from "@fortawesome/free-solid-svg-icons";

const getFaIcon = (name) => <FontAwesomeIcon icon={name} size="lg" />;

const sidebarConfigUser = [
  {
    title: "Murid",
    path: "/dashboard/murid",
    icon: getFaIcon(faUserGraduate),
    children: [
      { title: "Saat teduh", path: "/dashboard/murid/saat-teduh" },
      { title: "Internalisasi", path: "/dashboard/murid/internalisasi" },
    ],
  },
  {
    title: "Pembina",
    path: "/dashboard/pembina",
    icon: getFaIcon(faUsers),
  },
];

export default sidebarConfigUser;
