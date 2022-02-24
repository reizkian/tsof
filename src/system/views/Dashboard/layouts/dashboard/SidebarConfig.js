import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import homeIcon from '@iconify/icons-entypo/home';
import { faBible } from '@fortawesome/free-solid-svg-icons'
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
const getFaIcon = (name) => <FontAwesomeIcon icon={name} size="lg"/>;

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home',
    icon: getIcon(homeIcon)
  },
  {
    title: 'Saat Teduh',
    path: '/dashboard/prayers',
    icon: getFaIcon(faBible)
  }
];

export default sidebarConfig;
