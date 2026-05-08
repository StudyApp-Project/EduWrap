import { createContext, useContext, useState, useEffect } from 'react';
import { processPDFFromUrl, processPDFFromFile, getPDFText } from '../services/pdfService';

const NotesContext = createContext(undefined);

const PUBLIC_PDFS = [
  '0edabb6c92634ccb85df21c7bc9598f7.pdf',
  '1a82d02e9818480b80f497dc977edf0e.pdf',
  '3d6b43f1871b4f159b93d33462cb93f4.pdf',
  '81257b03aa5f4197835d18e4a529bc94.pdf',
  'c1e3ac993ae34d0592d720c4eebbde59.pdf',
  'cdbb23eea3764074be2ca12901a1a053.pdf',
  'ea7dc9ff429d45b381b5e22577a51fa4.pdf'
];

const DEFAULT_NOTES = [
  {
    id: 'default-1',
    type: 'text',
    title: 'Welcome to EduWrap Notes',
    content: '# Welcome to EduWrap Notes!\n\nThis is a minimal, distraction-free environment for you to jot down ideas, class notes, and summaries.\n\n## Features\n- **Auto-save**: Your notes are automatically saved to your browser as you type.\n- **Import**: You can import `.txt` or `.md` files using the button in the sidebar.\n- **Markdown Support**: While this is a plain text editor for now, you can write markdown to format your thoughts easily.\n\nHappy studying!',
    tags: ['welcome'],
    lastEdited: new Date().toISOString(),
  },
  ...PUBLIC_PDFS.map(filename => ({
    id: `pdf-${filename}`,
    type: 'pdf',
    title: filename,
    url: `/pdfs/${filename}`, // URL path to the static file
    tags: ['pdf', 'imported'],
    lastEdited: new Date().toISOString(),
  }))
];

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('eduwrap_notes');
    let loadedNotes = [];
    if (saved) {
      try {
        loadedNotes = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notes from local storage', e);
      }
    }
    
    // Merge public PDFs if they are not already in loadedNotes
    const newNotes = loadedNotes.length > 0 ? [...loadedNotes] : [...DEFAULT_NOTES];
    
    PUBLIC_PDFS.forEach(filename => {
      if (!newNotes.find(n => n.id === `pdf-${filename}`)) {
        newNotes.push({
          id: `pdf-${filename}`,
          type: 'pdf',
          title: filename,
          url: `/pdfs/${filename}`,
          tags: ['pdf', 'imported'],
          lastEdited: new Date().toISOString(),
        });
      }
    });

    return newNotes;
  });

  const [activeNoteId, setActiveNoteId] = useState(null);
  const [indexingStatus, setIndexingStatus] = useState({});

  useEffect(() => {
    localStorage.setItem('eduwrap_notes', JSON.stringify(notes));
  }, [notes]);

  // Background indexing of PDF text
  useEffect(() => {
    const indexPDFs = async () => {
      for (const note of notes) {
        if (note.type === 'pdf' && note.url) {
          try {
            setIndexingStatus(prev => ({ ...prev, [note.id]: 'indexing' }));
            await processPDFFromUrl(note.id, note.url);
            setIndexingStatus(prev => ({ ...prev, [note.id]: 'done' }));
          } catch (e) {
            console.error(`Failed to index ${note.title}:`, e);
            setIndexingStatus(prev => ({ ...prev, [note.id]: 'error' }));
          }
        }
      }
    };
    // Run indexing in background
    setTimeout(indexPDFs, 2000);
  }, [notes]); // Re-run if notes change (like a new pdf is added)

  const addNote = () => {
    const newNote = {
      id: crypto.randomUUID(),
      type: 'text',
      title: '',
      content: '',
      tags: [],
      lastEdited: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    return newNote.id;
  };

  const updateNote = (id, updates) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updates, lastEdited: new Date().toISOString() }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(null);
    }
  };

  const importNote = async (file) => {
    return new Promise((resolve, reject) => {
      const isPdf = file.name.toLowerCase().endsWith('.pdf');
      
      if (isPdf) {
        // PDF flow
        const id = crypto.randomUUID();
        // Extract text and store in IndexedDB
        processPDFFromFile(id, file)
          .then(() => {
            // Create a blob URL to display the PDF locally in iframe
            const blobUrl = URL.createObjectURL(file);
            const newNote = {
              id,
              type: 'pdf',
              title: file.name.replace(/\.[^/.]+$/, ""),
              url: blobUrl, // Note: blob URLs expire when the page closes, so they won't persist across refresh
              tags: ['imported', 'pdf'],
              lastEdited: new Date().toISOString(),
            };
            setNotes((prev) => [newNote, ...prev]);
            setActiveNoteId(newNote.id);
            resolve(newNote);
          })
          .catch(reject);
      } else {
        // Text flow
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          const title = file.name.replace(/\.[^/.]+$/, "");
          const newNote = {
            id: crypto.randomUUID(),
            type: 'text',
            title,
            content,
            tags: ['imported'],
            lastEdited: new Date().toISOString(),
          };
          setNotes((prev) => [newNote, ...prev]);
          setActiveNoteId(newNote.id);
          resolve(newNote);
        };
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      }
    });
  };

  const exportNote = (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note || note.type === 'pdf') return; // Cannot export PDFs directly

    const blob = new Blob([note.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title || 'Untitled Note'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        activeNoteId,
        setActiveNoteId,
        addNote,
        updateNote,
        deleteNote,
        importNote,
        exportNote,
        indexingStatus,
        getPDFText
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
