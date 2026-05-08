import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RoomContext = createContext(null);

const DEFAULT_ROOMS = [
  {
    id: 'room-cs2',
    name: 'Computer Science 2nd Year',
    category: 'Engineering',
    icon: '💻',
    tags: ['Algorithms', 'Java', 'Web Dev'],
    memberCount: 245,
    description: 'Main hub for 2nd-year CS students. Collaboration, notes, and survival.',
    classrooms: [
      { id: 'c-general', name: 'General Discussion', type: 'discussion', unread: 0, typing: [] },
      { id: 'c-dsa', name: 'DSA Practice', type: 'discussion', unread: 5, typing: [] },
      { id: 'c-notes', name: 'Algorithm Notes', type: 'notes', activeCursors: 2 },
      { id: 'c-live', name: 'Live Lab Session', type: 'live', activeParticipants: 14 },
      { id: 'c-project', name: 'Project Alpha', type: 'project', pendingTasks: 3 }
    ],
    members: [
      { id: 'u1', name: 'Sarah Jenkins', avatar: 'S', role: 'admin', status: 'online', currentClassroom: 'c-notes' },
      { id: 'u2', name: 'Alex Chen', avatar: 'A', role: 'member', status: 'online', currentClassroom: 'c-dsa' },
      { id: 'u3', name: 'Mike T.', avatar: 'M', role: 'member', status: 'offline', currentClassroom: null },
      { id: 'u4', name: 'Emma Watson', avatar: 'E', role: 'moderator', status: 'online', currentClassroom: 'c-live' }
    ]
  },
  {
    id: 'room-med',
    name: 'Medical Entrance Prep 2026',
    category: 'Medicine',
    icon: '🧬',
    tags: ['Biology', 'Chemistry', 'Mock Tests'],
    memberCount: 1024,
    description: 'High-intensity prep group for medical entrance exams.',
    classrooms: [
      { id: 'c-bio', name: 'Biology Doubts', type: 'discussion', unread: 12, typing: [] },
      { id: 'c-chem-notes', name: 'Organic Chem Summary', type: 'notes', activeCursors: 5 },
      { id: 'c-mock', name: 'Weekly Mock Test', type: 'quiz', activeParticipants: 84 }
    ],
    members: [
      { id: 'u5', name: 'Dr. House', avatar: 'D', role: 'admin', status: 'online', currentClassroom: 'c-bio' },
      { id: 'u6', name: 'Lily P.', avatar: 'L', role: 'member', status: 'online', currentClassroom: 'c-chem-notes' }
    ]
  },
  {
    id: 'room-art-hist',
    name: 'Renaissance Art History',
    category: 'Arts & Design',
    icon: '🏛️',
    tags: ['History', 'Painting', 'Italy'],
    memberCount: 128,
    description: 'Deep dive into 14th-16th century European art.',
    classrooms: [
      { id: 'c-art-gen', name: 'General Discussion', type: 'discussion', unread: 2, typing: [] },
      { id: 'c-art-slides', name: 'Lecture Slides', type: 'notes', activeCursors: 1 }
    ],
    members: [
      { id: 'u7', name: 'Leo D.', avatar: 'L', role: 'admin', status: 'online', currentClassroom: 'c-art-gen' }
    ]
  },
  {
    id: 'room-business',
    name: 'Startup Founders Club',
    category: 'Business',
    icon: '📈',
    tags: ['Entrepreneurship', 'Pitching', 'Finance'],
    memberCount: 512,
    description: 'Connect with future founders. Pitch practice and networking.',
    classrooms: [
      { id: 'c-pitch', name: 'Pitch Reviews', type: 'live', activeParticipants: 5 },
      { id: 'c-finance', name: 'Financial Modeling', type: 'notes', activeCursors: 0 },
      { id: 'c-tasks', name: 'MVP Milestones', type: 'project', pendingTasks: 8 }
    ],
    members: [
      { id: 'u8', name: 'Elon M.', avatar: 'E', role: 'admin', status: 'offline', currentClassroom: null },
      { id: 'u9', name: 'Sara S.', avatar: 'S', role: 'member', status: 'online', currentClassroom: 'c-pitch' }
    ]
  },
  {
    id: 'room-math',
    name: 'Calculus Survival Guide',
    category: 'Engineering',
    icon: '📐',
    tags: ['Math', 'Derivatives', 'Integration'],
    memberCount: 890,
    description: 'We suffer through multi-variable calculus together.',
    classrooms: [
      { id: 'c-calc-help', name: 'Homework Help', type: 'discussion', unread: 24, typing: ['Bob R.'] },
      { id: 'c-calc-notes', name: 'Formula Cheatsheets', type: 'notes', activeCursors: 12 }
    ],
    members: [
      { id: 'u10', name: 'Isaac N.', avatar: 'I', role: 'admin', status: 'online', currentClassroom: 'c-calc-notes' },
      { id: 'u11', name: 'Bob R.', avatar: 'B', role: 'member', status: 'online', currentClassroom: 'c-calc-help' }
    ]
  },
  {
    id: 'room-design',
    name: 'UI/UX Design Portfolio',
    category: 'Arts & Design',
    icon: '✨',
    tags: ['Figma', 'Web Design', 'Critique'],
    memberCount: 340,
    description: 'Share your Figma links and get brutal, honest feedback.',
    classrooms: [
      { id: 'c-critique', name: 'Portfolio Reviews', type: 'live', activeParticipants: 2 },
      { id: 'c-inspiration', name: 'Design Inspiration', type: 'discussion', unread: 0, typing: [] }
    ],
    members: [
      { id: 'u12', name: 'Diana R.', avatar: 'D', role: 'admin', status: 'online', currentClassroom: 'c-critique' }
    ]
  },
  {
    id: 'room-lit',
    name: 'Modern World Literature',
    category: 'Arts & Design',
    icon: '📚',
    tags: ['Reading', 'Essays', 'Analysis'],
    memberCount: 210,
    description: 'Discussing 20th-century classics and essay peer reviews.',
    classrooms: [
      { id: 'c-lit-chat', name: 'Book Club', type: 'discussion', unread: 3, typing: [] },
      { id: 'c-lit-essays', name: 'Essay Peer Review', type: 'notes', activeCursors: 4 }
    ],
    members: [
      { id: 'u13', name: 'Virginia W.', avatar: 'V', role: 'admin', status: 'offline', currentClassroom: null }
    ]
  },
  {
    id: 'room-econ',
    name: 'Macroeconomics 101',
    category: 'Business',
    icon: '🌍',
    tags: ['Economics', 'Policy', 'Markets'],
    memberCount: 650,
    description: 'Understanding global markets, inflation, and monetary policy.',
    classrooms: [
      { id: 'c-econ-news', name: 'Market News', type: 'discussion', unread: 8, typing: [] },
      { id: 'c-econ-study', name: 'Exam Prep', type: 'live', activeParticipants: 22 }
    ],
    members: [
      { id: 'u14', name: 'Adam S.', avatar: 'A', role: 'admin', status: 'online', currentClassroom: 'c-econ-study' }
    ]
  },
  {
    id: 'room-psych',
    name: 'Abnormal Psychology',
    category: 'Medicine',
    icon: '🧠',
    tags: ['Psychology', 'DSM-5', 'Case Studies'],
    memberCount: 420,
    description: 'Analyzing clinical cases and studying for the final.',
    classrooms: [
      { id: 'c-psych-cases', name: 'Case Studies', type: 'notes', activeCursors: 3 },
      { id: 'c-psych-chat', name: 'General Chat', type: 'discussion', unread: 0, typing: [] }
    ],
    members: [
      { id: 'u15', name: 'Sigmund F.', avatar: 'S', role: 'admin', status: 'online', currentClassroom: 'c-psych-cases' }
    ]
  },
  {
    id: 'room-law',
    name: 'Pre-Law LSAT Grinders',
    category: 'Arts & Design',
    icon: '⚖️',
    tags: ['LSAT', 'Logic Games', 'Law'],
    memberCount: 880,
    description: 'Daily practice for Logic Games and Reading Comprehension.',
    classrooms: [
      { id: 'c-lsat-logic', name: 'Logic Games Practice', type: 'live', activeParticipants: 45 },
      { id: 'c-lsat-chat', name: 'Tears & Commiseration', type: 'discussion', unread: 56, typing: [] }
    ],
    members: [
      { id: 'u16', name: 'Elle W.', avatar: 'E', role: 'admin', status: 'online', currentClassroom: 'c-lsat-logic' }
    ]
  },
  {
    id: 'room-cyber',
    name: 'Cybersecurity Capture The Flag',
    category: 'Engineering',
    icon: '🛡️',
    tags: ['Hacking', 'Networks', 'Security'],
    memberCount: 150,
    description: 'Practicing for upcoming CTF competitions.',
    classrooms: [
      { id: 'c-ctf-team1', name: 'Team Alpha Sync', type: 'live', activeParticipants: 4 },
      { id: 'c-ctf-tasks', name: 'Vulnerability Checklist', type: 'project', pendingTasks: 12 }
    ],
    members: [
      { id: 'u17', name: 'Alice B.', avatar: 'A', role: 'admin', status: 'online', currentClassroom: 'c-ctf-tasks' }
    ]
  },
  {
    id: 'room-languages',
    name: 'Conversational Japanese',
    category: 'Arts & Design',
    icon: '🎌',
    tags: ['Language', 'Speaking', 'Culture'],
    memberCount: 300,
    description: 'Weekly voice chats to practice speaking Japanese.',
    classrooms: [
      { id: 'c-jp-voice', name: 'Voice Practice', type: 'live', activeParticipants: 8 },
      { id: 'c-jp-vocab', name: 'Vocab Lists', type: 'notes', activeCursors: 0 }
    ],
    members: [
      { id: 'u18', name: 'Kenji M.', avatar: 'K', role: 'admin', status: 'online', currentClassroom: 'c-jp-voice' }
    ]
  }
];

const INITIAL_STATE = {
  rooms: DEFAULT_ROOMS,
  activeRoomId: null,
  activeClassroomId: null,
  lastVisited: {}
};

export function RoomProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem('ew_study_os_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge saved state with default rooms to ensure we have the structure
        return { ...parsed, rooms: DEFAULT_ROOMS };
      }
      return INITIAL_STATE;
    } catch (e) {
      return INITIAL_STATE;
    }
  });

  // Emotional Persistence Sync
  useEffect(() => {
    localStorage.setItem('ew_study_os_state', JSON.stringify({
      activeRoomId: state.activeRoomId,
      activeClassroomId: state.activeClassroomId,
      lastVisited: state.lastVisited
    }));
  }, [state.activeRoomId, state.activeClassroomId, state.lastVisited]);

  // LIVE SIMULATION ENGINE
  useEffect(() => {
    if (!state.activeRoomId) return;

    const interval = setInterval(() => {
      setState(prev => {
        const newRooms = prev.rooms.map(room => {
          if (room.id !== prev.activeRoomId) return room;

          // Simulate active typing and unread messages in random classrooms
          const newClassrooms = room.classrooms.map(cr => {
            if (cr.type !== 'discussion') return cr;
            
            let newTyping = [...cr.typing];
            let newUnread = cr.unread;

            // Randomly start typing
            if (Math.random() > 0.8 && newTyping.length < 2) {
              const randomMember = room.members[Math.floor(Math.random() * room.members.length)];
              if (!newTyping.includes(randomMember.name) && randomMember.status === 'online') {
                newTyping.push(randomMember.name);
              }
            }

            // Randomly stop typing and increment unread (if it's not the active classroom)
            if (newTyping.length > 0 && Math.random() > 0.6) {
              newTyping.pop(); // Someone finished typing
              if (prev.activeClassroomId !== cr.id) {
                newUnread += 1;
              }
            }

            return { ...cr, typing: newTyping, unread: newUnread };
          });

          // Randomly toggle member online/offline status
          const newMembers = room.members.map(member => {
            if (Math.random() > 0.95) {
              return { ...member, status: member.status === 'online' ? 'offline' : 'online' };
            }
            return member;
          });

          return { ...room, classrooms: newClassrooms, members: newMembers };
        });

        return { ...prev, rooms: newRooms };
      });
    }, 10000); // Pulse every 10 seconds to reduce lag

    return () => clearInterval(interval);
  }, [state.activeRoomId]);

  const setActiveRoom = useCallback((roomId) => {
    setState(prev => {
      const room = prev.rooms.find(r => r.id === roomId);
      const defaultClassroom = room ? room.classrooms[0].id : null;
      const lastClassroom = prev.lastVisited[roomId] || defaultClassroom;

      return {
        ...prev,
        activeRoomId: roomId,
        activeClassroomId: lastClassroom
      };
    });
  }, []);

  const setActiveClassroom = useCallback((classroomId) => {
    setState(prev => {
      if (!prev.activeRoomId) return prev;
      
      // Clear unreads when entering
      const newRooms = prev.rooms.map(room => {
        if (room.id !== prev.activeRoomId) return room;
        return {
          ...room,
          classrooms: room.classrooms.map(cr => cr.id === classroomId ? { ...cr, unread: 0 } : cr)
        };
      });

      return {
        ...prev,
        rooms: newRooms,
        activeClassroomId: classroomId,
        lastVisited: {
          ...prev.lastVisited,
          [prev.activeRoomId]: classroomId
        }
      };
    });
  }, []);

  const leaveRoom = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeRoomId: null,
      activeClassroomId: null
    }));
  }, []);

  const addRoom = useCallback((newRoomData) => {
    const newRoom = {
      id: `room-custom-${Date.now()}`,
      name: newRoomData.name,
      category: newRoomData.category,
      icon: newRoomData.icon || '📚',
      tags: newRoomData.tags || [],
      memberCount: 1, // Just you
      description: newRoomData.description,
      classrooms: [
        { id: `c-gen-${Date.now()}`, name: 'General Chat', type: 'discussion', unread: 0, typing: [] },
        { id: `c-notes-${Date.now()}`, name: 'Shared Notes', type: 'notes', activeCursors: 0 },
        { id: `c-live-${Date.now()}`, name: 'Live Session', type: 'live', activeParticipants: 0 },
      ],
      members: [
        { id: 'u-you', name: 'You', avatar: 'Y', role: 'admin', status: 'online', currentClassroom: null }
      ]
    };

    setState(prev => ({
      ...prev,
      rooms: [newRoom, ...prev.rooms] // Add to top of list
    }));
    
    return newRoom.id;
  }, []);

  const activeRoom = state.rooms.find(r => r.id === state.activeRoomId);
  const activeClassroom = activeRoom?.classrooms.find(c => c.id === state.activeClassroomId);

  return (
    <RoomContext.Provider value={{
      rooms: state.rooms,
      activeRoom,
      activeClassroom,
      setActiveRoom,
      setActiveClassroom,
      leaveRoom,
      addRoom
    }}>
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error('useRoom must be used inside RoomProvider');
  return ctx;
}