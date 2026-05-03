import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, FileText, Layers, HelpCircle,
  Folder, User, Settings
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/rooms',     icon: Users,           label: 'Study Rooms' },
  { to: '/notes',     icon: FileText,        label: 'Notes' },
  { to: '/flashcards',icon: Layers,          label: 'Flashcards' },
  { to: '/quiz',      icon: HelpCircle,      label: 'Quiz' },
  { to: '/files',     icon: Folder,          label: 'Files' },
];

const BOTTOM_ITEMS = [
  { to: '/profile',  icon: User,     label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoBox}>EW</span>
        <div>
          <div className={styles.logoTitle}>Global Workspace</div>
          <div className={styles.logoSub}>Academic Pro</div>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <nav className={styles.navBottom}>
        {BOTTOM_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
