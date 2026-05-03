import { useState, useEffect } from 'react';
import { usePanel } from '../../contexts/PanelContext';
import { X } from 'lucide-react';
import styles from './Panel.module.css';

const STORAGE_KEY = 'ew_notes';

export default function NotesPanel() {
  const { notesOpen, toggleNotes } = usePanel();
  const [text, setText] = useState(() => localStorage.getItem(STORAGE_KEY) ?? '');

  // Auto-save on change
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, text);
    }, 600);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <aside className={`${styles.panel} ${styles.notesPanel} ${notesOpen ? styles.panelVisible : styles.panelHidden}`}>
      <header className={styles.header}>
        <span className={styles.title}>Notes</span>
        <span className={styles.saveHint}>Auto-saved</span>
        <button id="notes-panel-close" onClick={toggleNotes} aria-label="Close notes">
          <X size={16} />
        </button>
      </header>

      <textarea
        id="notes-textarea"
        className={styles.notesArea}
        placeholder="Jot down your notes here..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </aside>
  );
}
