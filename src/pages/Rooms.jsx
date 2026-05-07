import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Plus, Search, Globe } from 'lucide-react';

const CATEGORIES = [
  { id: 'eng', label: 'Engineering', count: 12, icon: '⚙️' },
  { id: 'med', label: 'Medical',     count: 8,  icon: '🩺' },
  { id: 'com', label: 'Commerce',    count: 15, icon: '📊' },
  { id: 'art', label: 'Arts',        count: 6,  icon: '🎨' },
];

const ACTIVE_ROOMS = [
  { id: '1', name: 'Physics Study Group',  subject: 'Advanced Physics 301',   members: 4, status: 'live' },
  { id: '2', name: 'Calculus Problem Set', subject: 'Chapter 7 — Integration', members: 3, status: 'live' },
];

const PUBLIC_ROOMS = [
  { id: '3', name: 'European History Prep', subject: 'Midterm review session',  members: 22, status: 'scheduled' },
  { id: '4', name: 'Biology Lab Notes',     subject: 'Cell Biology',            members: 14, status: 'idle' },
  { id: '5', name: 'Macroeconomics 101',    subject: 'Supply & Demand',        members: 45, status: 'live' },
];

export default function Rooms() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-auto">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Study Rooms</h1>
          <p className="text-sm text-(--text-secondary) mt-1">Find a community to learn with.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90" style={{ background: 'oklch(0.58 0.22 var(--accent-hue))' }}>
          <Plus size={18} /> Create Room
        </button>
      </header>

      {/* Categories */}
      <section>
        <h2 className="font-semibold mb-3">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <button key={cat.id} className="flex items-center gap-3 p-4 rounded-2xl border border-(--border-default) transition-all hover:shadow-(--shadow-md) hover:-translate-y-0.5" style={{ background: 'var(--bg-surface)' }}>
              <span className="text-2xl">{cat.icon}</span>
              <div className="text-left">
                <span className="text-sm font-medium block">{cat.label}</span>
                <span className="text-[10px] text-(--text-muted)">{cat.count} rooms</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Active Rooms */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-semibold">Your Active Rooms</h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500/10 text-green-500">Live Now</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ACTIVE_ROOMS.map(room => (
            <div key={room.id} className="p-4 rounded-2xl border border-(--border-default) transition-all hover:shadow-(--shadow-md)" style={{ background: 'var(--bg-surface)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'oklch(0.58 0.22 var(--accent-hue) / 0.1)', color: 'oklch(0.58 0.22 var(--accent-hue))' }}>
                  <BookOpen size={18} />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-green-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
                </div>
              </div>
              <h3 className="font-semibold mb-1">{room.name}</h3>
              <p className="text-xs text-(--text-muted) mb-3">{room.subject}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-(--text-muted)"><Users size={12} /> {room.members}</span>
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90" style={{ background: 'oklch(0.58 0.22 var(--accent-hue))' }} onClick={() => navigate(`/room/${room.id}`)}>
                  Enter Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Public Rooms */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Public Rooms</h2>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-(--border-default) bg-(--bg-glass)">
            <Search size={14} className="text-(--text-muted)" />
            <input type="text" placeholder="Find rooms..." className="bg-transparent outline-none text-xs w-32 text-(--text-primary) placeholder:text-(--text-muted)" />
          </div>
        </div>
        <div className="space-y-2">
          {PUBLIC_ROOMS.map(room => (
            <div key={room.id} className="flex items-center gap-4 p-4 rounded-xl border border-(--border-default) transition-all hover:shadow-(--shadow-sm)" style={{ background: 'var(--bg-surface)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-(--bg-glass) text-(--text-secondary)">
                <Globe size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium">{room.name}</h4>
                <p className="text-[10px] text-(--text-muted)">{room.subject}</p>
              </div>
              <span className="hidden sm:flex items-center gap-1 text-xs text-(--text-muted)"><Users size={12} /> {room.members} members</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${room.status === 'live' ? 'bg-green-500/10 text-green-500' : room.status === 'scheduled' ? 'bg-blue-500/10 text-blue-500' : 'bg-(--bg-glass) text-(--text-muted)'}`}>
                {room.status}
              </span>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium border border-(--border-strong) transition-all hover:bg-(--bg-glass)">
                Join Room
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
