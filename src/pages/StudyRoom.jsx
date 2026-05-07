import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MessageSquare, FileText, MoreVertical, Video, Sparkles, UserPlus
} from 'lucide-react';
import RoomChat from './StudyRoomComponents/RoomChat';
import RoomNotes from './StudyRoomComponents/RoomNotes';

const MOCK_ROOM = { name: 'Physics Study Group', subject: 'Advanced Physics 301' };

const MOCK_MEMBERS = [
  { id: 'm1', name: 'Alex R.', initials: 'AR', status: 'online', role: 'Host', isYou: true, bg: 'oklch(0.58 0.22 270)' },
  { id: 'm2', name: 'Sarah J.', initials: 'SJ', status: 'online', role: 'Member', isYou: false, bg: 'oklch(0.58 0.22 145)' },
  { id: 'm3', name: 'Mike T.', initials: 'MT', status: 'online', role: 'Member', isYou: false, bg: 'oklch(0.58 0.22 45)' },
  { id: 'm4', name: 'Dr. Peterson', initials: 'DP', status: 'online', role: 'Instructor', isYou: false, bg: 'oklch(0.58 0.22 240)' },
];

export default function StudyRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');

  const onlineCount = MOCK_MEMBERS.filter(m => m.status === 'online').length;

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="hidden md:flex flex-col w-56 border-r border-(--border-default) shrink-0" style={{ background: 'var(--bg-elevated)' }}>
        <button className="flex items-center gap-2 px-4 py-3 text-xs text-(--text-secondary) hover:text-(--text-primary) transition-colors" onClick={() => navigate('/rooms')}>
          <ArrowLeft size={14} /> Back to Rooms
        </button>

        <div className="px-3 py-2">
          <h2 className="text-[10px] uppercase tracking-wider text-(--text-muted) font-semibold mb-2 px-1">Channels</h2>
          <div className="space-y-0.5">
            {[
              { id: 'chat', icon: MessageSquare, label: '# study-chat' },
              { id: 'notes', icon: FileText, label: '# shared-notes' },
            ].map(ch => (
              <button
                key={ch.id}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all ${
                  activeTab === ch.id
                    ? 'bg-[color:oklch(0.58_0.22_var(--accent-hue)_/_0.12)] text-[color:oklch(0.58_0.22_var(--accent-hue))] font-medium'
                    : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-glass)'
                }`}
                onClick={() => setActiveTab(ch.id)}
              >
                <ch.icon size={14} />
                <span>{ch.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-3 py-2 mt-2">
          <div className="flex items-center justify-between px-1 mb-2">
            <h2 className="text-[10px] uppercase tracking-wider text-(--text-muted) font-semibold">Members</h2>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 font-medium">{onlineCount}</span>
          </div>
          <ul className="space-y-1">
            {MOCK_MEMBERS.map(m => (
              <li key={m.id} className="flex items-center gap-2 px-1 py-1.5 rounded-lg">
                <div className="relative w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ background: m.bg }}>
                  {m.initials}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 ${m.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} style={{ borderColor: 'var(--bg-elevated)' }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs truncate">{m.name}</div>
                  <div className="text-[9px] text-(--text-muted)">{m.role}</div>
                </div>
              </li>
            ))}
          </ul>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 mt-2 rounded-lg text-xs text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-glass) transition-colors">
            <UserPlus size={14} /> Invite Member
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-4 py-3 border-b border-(--border-default) shrink-0" style={{ background: 'var(--bg-elevated)' }}>
          <div>
            <h1 className="text-sm font-semibold">{MOCK_ROOM.name}</h1>
            <p className="text-[10px] text-(--text-muted)">{MOCK_ROOM.subject} · {activeTab === 'chat' ? 'Chat' : 'Notes'}</p>
          </div>
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:bg-(--bg-glass) transition-colors" onClick={() => navigate(`/room/${id}/call`)}>
              <Video size={14} /> <span className="hidden sm:inline">Call</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:bg-(--bg-glass) transition-colors">
              <Sparkles size={14} /> <span className="hidden sm:inline">AI</span>
            </button>
            <button className="p-1.5 rounded-lg hover:bg-(--bg-glass) transition-colors">
              <MoreVertical size={14} />
            </button>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-hidden">
          {activeTab === 'chat' ? <RoomChat /> : <RoomNotes roomId={id} />}
        </div>
      </main>
    </div>
  );
}
