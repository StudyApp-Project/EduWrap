import styles from './Topbar.module.css';
import { Bell, HelpCircle, Plus, Search } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { usePanel } from '../../contexts/PanelContext';

export default function Topbar() {
  const { user } = useUser();
  const { toggleChat, toggleNotes } = usePanel();

  return (
    <header className={styles.topbar}>
      <div className={styles.search}>
        <Search size={14} />
        <input type="text" placeholder="Search..." id="topbar-search" />
      </div>

      <nav className={styles.links}>
        <a href="/dashboard">Dashboard</a>
        <a href="/rooms">Study Rooms</a>
        <a href="/notes">Notes</a>
      </nav>

      <div className={styles.actions}>
        <button id="topbar-create" className={styles.createBtn}>
          <Plus size={14} />
          Create
        </button>
        <button id="topbar-notifications" aria-label="Notifications">
          <Bell size={16} />
        </button>
        <button id="topbar-help" aria-label="Help">
          <HelpCircle size={16} />
        </button>
        <button
          id="topbar-avatar"
          className={styles.avatar}
          aria-label="User menu"
        >
          {user.name.charAt(0)}
        </button>
      </div>
    </header>
  );
}
