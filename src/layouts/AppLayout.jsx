import styles from './AppLayout.module.css';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import ChatPanel from '../components/panels/ChatPanel';
import NotesPanel from '../components/panels/NotesPanel';
import { Outlet } from 'react-router-dom';
import { usePanel } from '../contexts/PanelContext';

export default function AppLayout() {
  const { chatOpen, notesOpen } = usePanel();

  // Calculate right offset so content doesn't slide under open panels
  const panelCount = (chatOpen ? 1 : 0) + (notesOpen ? 1 : 0);
  const contentStyle = { paddingRight: panelCount * 300 };

  return (
    <div className={styles.shell}>
      <Sidebar />

      <div className={styles.main}>
        <Topbar />

        <div className={styles.content} style={contentStyle}>
          <Outlet />
        </div>

        {/* Always mounted — visibility controlled inside each panel via PanelContext */}
        <ChatPanel />
        <NotesPanel />
      </div>
    </div>
  );
}
