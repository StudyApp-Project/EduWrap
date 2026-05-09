import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FileContext = createContext(null);

// ─── RICH MOCK FILES ───
const MOCK_FILES = [
  {
    id: 'file_001', name: 'Quicksort Analysis.pdf', type: 'pdf',
    size: '2.4 MB', sizeBytes: 2516582, category: 'DSA', folder: null,
    isStarred: true, isPinned: false, downloadCount: 24,
    source: { type: 'study-room', roomName: 'CS 2nd Year', classroomName: 'DSA Practice', sharedBy: 'Alex Chen', action: 'Shared during discussion' },
    related: { doubts: ['dbt_001'], flashcards: [], rooms: ['room-cs2'] },
    owner: { id: 'u2', name: 'Alex Chen', initials: 'AC' },
    createdAt: '2d ago', lastAccessedAt: '1h ago',
  },
  {
    id: 'file_002', name: 'Newton\'s Laws Cheatsheet.pdf', type: 'pdf',
    size: '1.1 MB', sizeBytes: 1153434, category: 'Physics', folder: null,
    isStarred: false, isPinned: true, downloadCount: 56,
    source: { type: 'study-room', roomName: 'Physics 101', classroomName: 'Mechanics', sharedBy: 'Dr. Lisa Wong', action: 'Posted as lecture material' },
    related: { doubts: ['dbt_005'], flashcards: [], rooms: [] },
    owner: { id: 'u10', name: 'Dr. Lisa Wong', initials: 'LW' },
    createdAt: '1w ago', lastAccessedAt: '3h ago',
  },
  {
    id: 'file_003', name: 'React Hooks Deep Dive.md', type: 'doc',
    size: '45 KB', sizeBytes: 46080, category: 'Coding', folder: null,
    isStarred: false, isPinned: false, downloadCount: 12,
    source: { type: 'ai-generated', action: 'AI Summary from study session' },
    related: { doubts: ['dbt_006'], flashcards: [], rooms: ['room-cs2'] },
    owner: { id: 'me', name: 'You', initials: 'Y' },
    createdAt: '5h ago', lastAccessedAt: '5h ago',
  },
  {
    id: 'file_004', name: 'Organic Chemistry Reactions.png', type: 'image',
    size: '3.8 MB', sizeBytes: 3984588, category: 'Chemistry', folder: null,
    isStarred: true, isPinned: false, downloadCount: 89,
    source: { type: 'study-room', roomName: 'Medical Entrance Prep', classroomName: 'Organic Chem Summary', sharedBy: 'Lily P.', action: 'Shared as study material' },
    related: { doubts: ['dbt_007'], flashcards: [], rooms: ['room-med'] },
    owner: { id: 'u6', name: 'Lily P.', initials: 'LP' },
    createdAt: '3d ago', lastAccessedAt: '6h ago',
  },
  {
    id: 'file_005', name: 'Binary Search Implementation.py', type: 'code',
    size: '2.1 KB', sizeBytes: 2150, category: 'DSA', folder: null,
    isStarred: false, isPinned: false, downloadCount: 8,
    source: { type: 'study-room', roomName: 'CS 2nd Year', classroomName: 'DSA Practice', sharedBy: 'Sarah Jenkins', action: 'Shared in classroom chat' },
    related: { doubts: [], flashcards: [], rooms: ['room-cs2'] },
    owner: { id: 'u1', name: 'Sarah Jenkins', initials: 'SJ' },
    createdAt: '1d ago', lastAccessedAt: '12h ago',
  },
  {
    id: 'file_006', name: 'DSA Sorting Flashcards Source.pdf', type: 'pdf',
    size: '5.2 MB', sizeBytes: 5452595, category: 'DSA', folder: null,
    isStarred: false, isPinned: false, downloadCount: 3,
    source: { type: 'flashcard', action: 'Uploaded for flashcard generation' },
    related: { doubts: [], flashcards: ['fc_dsa_01'], rooms: [] },
    owner: { id: 'me', name: 'You', initials: 'Y' },
    createdAt: '4d ago', lastAccessedAt: '2d ago',
  },
  {
    id: 'file_007', name: 'CNN vs RNN Architecture Diagram.png', type: 'image',
    size: '1.6 MB', sizeBytes: 1677722, category: 'AI/ML', folder: null,
    isStarred: true, isPinned: false, downloadCount: 42,
    source: { type: 'study-room', roomName: 'AI Research Lab', classroomName: 'Deep Learning', sharedBy: 'Marcus Lee', action: 'Posted as reference material' },
    related: { doubts: ['dbt_004'], flashcards: [], rooms: [] },
    owner: { id: 'u2', name: 'Marcus Lee', initials: 'ML' },
    createdAt: '5d ago', lastAccessedAt: '1d ago',
  },
  {
    id: 'file_008', name: 'Thermodynamics Quiz Prep.pdf', type: 'pdf',
    size: '890 KB', sizeBytes: 911360, category: 'Physics', folder: null,
    isStarred: false, isPinned: false, downloadCount: 15,
    source: { type: 'quiz', action: 'Uploaded for quiz generation' },
    related: { doubts: [], flashcards: [], rooms: [] },
    owner: { id: 'me', name: 'You', initials: 'Y' },
    createdAt: '1w ago', lastAccessedAt: '5d ago',
  },
  {
    id: 'file_009', name: 'Fourier Transform Summary.md', type: 'doc',
    size: '28 KB', sizeBytes: 28672, category: 'Maths', folder: null,
    isStarred: false, isPinned: false, downloadCount: 31,
    source: { type: 'ai-generated', action: 'AI-generated study sheet' },
    related: { doubts: ['dbt_010'], flashcards: [], rooms: [] },
    owner: { id: 'me', name: 'You', initials: 'Y' },
    createdAt: '2d ago', lastAccessedAt: '8h ago',
  },
  {
    id: 'file_010', name: 'Interview Prep Roadmap.pdf', type: 'pdf',
    size: '4.5 MB', sizeBytes: 4718592, category: 'Interview Prep', folder: 'fld_002',
    isStarred: true, isPinned: true, downloadCount: 128,
    source: { type: 'upload', action: 'Manually uploaded' },
    related: { doubts: [], flashcards: [], rooms: [] },
    owner: { id: 'me', name: 'You', initials: 'Y' },
    createdAt: '2w ago', lastAccessedAt: '4h ago',
  },
  {
    id: 'file_011', name: 'TCP-UDP Comparison Notes.md', type: 'doc',
    size: '15 KB', sizeBytes: 15360, category: 'Coding', folder: null,
    isStarred: false, isPinned: false, downloadCount: 7,
    source: { type: 'ai-generated', action: 'Exported from Notes' },
    related: { doubts: ['dbt_002'], flashcards: [], rooms: ['room-cs2'] },
    owner: { id: 'me', name: 'You', initials: 'Y' },
    createdAt: '1d ago', lastAccessedAt: '1d ago',
  },
  {
    id: 'file_012', name: 'Lecture Recording - Calculus III.mp4', type: 'video',
    size: '245 MB', sizeBytes: 256901120, category: 'Maths', folder: 'fld_001',
    isStarred: false, isPinned: false, downloadCount: 18,
    source: { type: 'study-room', roomName: 'Calculus Survival Guide', classroomName: 'Homework Help', sharedBy: 'Isaac N.', action: 'Recorded live session' },
    related: { doubts: [], flashcards: [], rooms: ['room-math'] },
    owner: { id: 'u10', name: 'Isaac N.', initials: 'IN' },
    createdAt: '3d ago', lastAccessedAt: '2d ago',
  },
  {
    id: 'file_013', name: 'DP vs Greedy Cheatsheet.pdf', type: 'pdf',
    size: '1.8 MB', sizeBytes: 1887437, category: 'DSA', folder: null,
    isStarred: true, isPinned: false, downloadCount: 67,
    source: { type: 'study-room', roomName: 'CS 2nd Year', classroomName: 'DSA Practice', sharedBy: 'Priya Sharma', action: 'Shared as exam prep material' },
    related: { doubts: ['dbt_008'], flashcards: [], rooms: ['room-cs2'] },
    owner: { id: 'u5', name: 'Priya Sharma', initials: 'PS' },
    createdAt: '4d ago', lastAccessedAt: '6h ago',
  },
  {
    id: 'file_014', name: 'Polymorphism Explained.md', type: 'doc',
    size: '12 KB', sizeBytes: 12288, category: 'Coding', folder: null,
    isStarred: false, isPinned: false, downloadCount: 19,
    source: { type: 'ai-generated', action: 'AI Summary from doubt discussion' },
    related: { doubts: ['dbt_009'], flashcards: [], rooms: [] },
    owner: { id: 'me', name: 'You', initials: 'Y' },
    createdAt: '3d ago', lastAccessedAt: '1d ago',
  },
  {
    id: 'file_015', name: 'System Design Patterns.pdf', type: 'pdf',
    size: '8.3 MB', sizeBytes: 8703795, category: 'Interview Prep', folder: 'fld_002',
    isStarred: false, isPinned: false, downloadCount: 94,
    source: { type: 'upload', action: 'Manually uploaded' },
    related: { doubts: [], flashcards: [], rooms: [] },
    owner: { id: 'me', name: 'You', initials: 'Y' },
    createdAt: '1w ago', lastAccessedAt: '2d ago',
  },
  {
    id: 'file_016', name: 'Le Chatelier Equilibrium Notes.pdf', type: 'pdf',
    size: '920 KB', sizeBytes: 942080, category: 'Chemistry', folder: 'fld_001',
    isStarred: false, isPinned: false, downloadCount: 11,
    source: { type: 'study-room', roomName: 'Medical Entrance Prep', classroomName: 'Organic Chem Summary', sharedBy: 'Prof. Ahmed', action: 'Lecture handout' },
    related: { doubts: ['dbt_007'], flashcards: [], rooms: ['room-med'] },
    owner: { id: 'u12', name: 'Prof. Ahmed', initials: 'PA' },
    createdAt: '6d ago', lastAccessedAt: '3d ago',
  },
];

const MOCK_FOLDERS = [
  { id: 'fld_001', name: 'Semester 4', icon: '📚', color: 'accent' },
  { id: 'fld_002', name: 'Placement Prep', icon: '🎯', color: 'green' },
  { id: 'fld_003', name: 'Important PDFs', icon: '📌', color: 'red' },
  { id: 'fld_004', name: 'AI Notes', icon: '🤖', color: 'purple' },
];

const LIVE_ACTIVITY = [
  { id: 'a1', user: 'Alex Chen', action: 'shared', fileName: 'Quicksort Analysis.pdf', target: 'DSA Practice', time: '2m ago' },
  { id: 'a2', user: 'Priya Sharma', action: 'uploaded', fileName: 'DP vs Greedy Cheatsheet.pdf', target: null, time: '15m ago' },
  { id: 'a3', user: 'AI Assistant', action: 'generated', fileName: 'React Hooks Deep Dive.md', target: null, time: '1h ago' },
  { id: 'a4', user: 'Dr. Lisa Wong', action: 'shared', fileName: 'Newton\'s Laws Cheatsheet.pdf', target: 'Physics 101', time: '3h ago' },
  { id: 'a5', user: 'Marcus Lee', action: 'downloaded', fileName: 'Interview Prep Roadmap.pdf', target: null, time: '5h ago' },
];

const DEFAULT_STATE = {
  files: MOCK_FILES,
  folders: MOCK_FOLDERS,
  activity: LIVE_ACTIVITY,
};

export function FileProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem('ew_files_data');
      return stored ? JSON.parse(stored) : DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('ew_files_data', JSON.stringify(state));
  }, [state]);

  const addFile = useCallback((fileData) => {
    const newFile = {
      id: `file_${Date.now()}`,
      ...fileData,
      isStarred: false,
      isPinned: false,
      downloadCount: 0,
      related: { doubts: [], flashcards: [], rooms: [] },
      createdAt: 'just now',
      lastAccessedAt: 'just now',
    };
    setState(prev => ({ ...prev, files: [newFile, ...prev.files] }));
    return newFile.id;
  }, []);

  const toggleStar = useCallback((fileId) => {
    setState(prev => ({
      ...prev,
      files: prev.files.map(f => f.id === fileId ? { ...f, isStarred: !f.isStarred } : f),
    }));
  }, []);

  const togglePin = useCallback((fileId) => {
    setState(prev => ({
      ...prev,
      files: prev.files.map(f => f.id === fileId ? { ...f, isPinned: !f.isPinned } : f),
    }));
  }, []);

  const moveToFolder = useCallback((fileId, folderId) => {
    setState(prev => ({
      ...prev,
      files: prev.files.map(f => f.id === fileId ? { ...f, folder: folderId } : f),
    }));
  }, []);

  const deleteFile = useCallback((fileId) => {
    setState(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId),
    }));
  }, []);

  const addFolder = useCallback((folderData) => {
    const newFolder = {
      id: `fld_${Date.now()}`,
      ...folderData,
    };
    setState(prev => ({ ...prev, folders: [...prev.folders, newFolder] }));
    return newFolder.id;
  }, []);

  const incrementDownload = useCallback((fileId) => {
    setState(prev => ({
      ...prev,
      files: prev.files.map(f => f.id === fileId ? { ...f, downloadCount: f.downloadCount + 1 } : f),
    }));
  }, []);

  // Derived stats
  const totalSize = state.files.reduce((acc, f) => acc + f.sizeBytes, 0);
  const storageUsed = totalSize > 1073741824
    ? `${(totalSize / 1073741824).toFixed(1)} GB`
    : `${(totalSize / 1048576).toFixed(0)} MB`;

  const filesByType = state.files.reduce((acc, f) => {
    acc[f.type] = (acc[f.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <FileContext.Provider value={{
      ...state,
      addFile, toggleStar, togglePin, moveToFolder, deleteFile,
      addFolder, incrementDownload,
      storageUsed, storageTotal: '5 GB', filesByType,
      totalFiles: state.files.length,
    }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const ctx = useContext(FileContext);
  if (!ctx) throw new Error('useFiles must be used inside FileProvider');
  return ctx;
}
