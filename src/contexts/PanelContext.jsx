import { createContext, useContext, useState } from 'react';

const PanelContext = createContext(null);

export function PanelProvider({ children }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const toggleChat = () => setChatOpen(prev => !prev);
  const toggleNotes = () => setNotesOpen(prev => !prev);

  return (
    <PanelContext.Provider value={{ chatOpen, notesOpen, toggleChat, toggleNotes }}>
      {children}
    </PanelContext.Provider>
  );
}

export function usePanel() {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error('usePanel must be used inside PanelProvider');
  return ctx;
}
