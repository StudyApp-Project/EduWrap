import styles from './Topbar.module.css';
import { Bell, HelpCircle, Plus, Search, MessageSquare, FileText } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { usePanel } from '../../contexts/PanelContext';

export default function Topbar() {
  const { user } = useUser();
  const { chatOpen, notesOpen, toggleChat, toggleNotes } = usePanel();

  return (
    <header className={styles.topbar}>
      <div className={styles.search}>
        <Search size={14} />
        <input type="text" placeholder="Search..." id="topbar-search" />
      </div>

      <nav className={styles.links}>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.activeLink : ''}>Dashboard</NavLink>
        <NavLink to="/rooms"     className={({ isActive }) => isActive ? styles.activeLink : ''}>Study Rooms</NavLink>
        <NavLink to="/notes"     className={({ isActive }) => isActive ? styles.activeLink : ''}>Notes</NavLink>
      </nav>

      <div className={styles.actions}>
        {/* Panel toggles */}
        <button
          id="topbar-toggle-notes"
          onClick={toggleNotes}
          aria-label="Toggle Notes"
          className={notesOpen ? styles.activeToggle : ''}
          title="Notes"
        >
          <FileText size={16} />
        </button>

        <button
          id="topbar-toggle-chat"
          onClick={toggleChat}
          aria-label="Toggle Chat"
          className={chatOpen ? styles.activeToggle : ''}
          title="Chat"
        >
          <MessageSquare size={16} />
        </button>

        <div className={styles.divider} />

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

        <button id="topbar-avatar" className={styles.avatar} aria-label="User menu">
          {user.name.charAt(0)}
        </button>
      </div>
    </header>
  );
}
