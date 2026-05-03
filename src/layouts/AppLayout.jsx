import styles from './AppLayout.module.css';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import ChatPanel from '../components/panels/ChatPanel';
import NotesPanel from '../components/panels/NotesPanel';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar />
        <div className={styles.content}>
          <Outlet />
        </div>
        {/* Panels rendered here — always mounted, visibility controlled by PanelContext */}
        <ChatPanel />
        <NotesPanel />
      </div>
    </div>
  );
}
