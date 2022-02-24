import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
const getFaIcon = (name) => <FontAwesomeIcon icon={name} size="lg"/>;

const sidebarConfigAdmin = [
  {
    title: "Manage Kelas",
    path: "/dashboard/manageclass",
    icon: getIcon(fileTextFill),
  },
  {
    title: "Analytics",
    path: "/dashboard/user",
    icon: getFaIcon(faChartLine),
  },
  {
    title: "Product",
    path: "/dashboard/products",
    icon: getIcon(shoppingBagFill),
  },
];

export default sidebarConfigAdmin;
