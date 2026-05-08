import { createContext, useContext, useState } from 'react';

const DashboardContext = createContext(null);

const MOCK_TASKS = [
  { id: '1', title: 'Finish Physics Chapter 4', completed: false, priority: 'high' },
  { id: '2', title: 'Review Calculus Notes', completed: false, priority: 'medium' },
  { id: '3', title: 'Reply to study group', completed: true, priority: 'low' },
];

const MOCK_ACTIVE_ROOMS = [
  { id: 'r1', name: 'Physics 101 Midterm Prep', participants: 12, category: 'Science' },
  { id: 'r2', name: 'CS50 Study Group', participants: 5, category: 'Programming' },
];

const MOCK_UPCOMING_SESSIONS = [
  { id: 's1', title: 'Calculus Review', time: 'In 15 mins', members: 4 },
  { id: 's2', title: 'Chemistry Lab Prep', time: 'Tomorrow, 2 PM', members: 8 },
];

const MOCK_RECENT_ACTIVITY = [
  { id: 'a1', text: 'You earned the "Night Owl" badge', time: '2h ago', type: 'badge' },
  { id: 'a2', text: 'Alex updated "Cell Biology Notes"', time: '4h ago', type: 'note' },
  { id: 'a3', text: 'Completed "Thermodynamics Quiz" (92%)', time: 'Yesterday', type: 'quiz' },
];

const MOCK_LEADERBOARD = [
  { id: 'l1', name: 'Sarah J.', xp: 12450, rank: 1 },
  { id: 'l2', name: 'Alex C.', xp: 11200, rank: 2 },
  { id: 'l3', name: 'You', xp: 10850, rank: 3 },
  { id: 'l4', name: 'Mike T.', xp: 9800, rank: 4 },
  { id: 'l5', name: 'Emma W.', xp: 9400, rank: 5 },
];

const MOCK_NOTIFICATIONS = [
  { id: 'n1', text: 'Sarah invited you to "Data Structures"', read: false },
  { id: 'n2', text: 'Chemistry Quiz deadline in 2 days', read: false },
  { id: 'n3', text: 'You were mentioned in General Chat', read: true },
];

export function DashboardProvider({ children }) {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (title, priority = 'medium') => {
    if (!title.trim()) return;
    setTasks([{ id: Date.now().toString(), title, completed: false, priority }, ...tasks]);
  };

  return (
    <DashboardContext.Provider value={{
      tasks,
      toggleTask,
      addTask,
      activeRooms: MOCK_ACTIVE_ROOMS,
      upcomingSessions: MOCK_UPCOMING_SESSIONS,
      recentActivity: MOCK_RECENT_ACTIVITY,
      leaderboard: MOCK_LEADERBOARD,
      notifications: MOCK_NOTIFICATIONS,
      dailyGoal: { target: 4, current: 2.5, streak: 12, xpToday: 450 },
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}
