import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import {
  BookOpen, Users, Clock, TrendingUp, Zap, Plus,
  ArrowRight, Calendar, CheckCircle2, AlertCircle,
  Flame, Star, Target, Award
} from 'lucide-react';

const QUICK_ACTIONS = [
  { icon: Plus, label: 'New Study Room', to: '/rooms', color: 'oklch(0.58 0.22 var(--accent-hue))' },
  { icon: BookOpen, label: 'Create Notes', to: '/notes', color: '#22c55e' },
  { icon: Users, label: 'Join Group', to: '/rooms', color: '#f59e0b' },
  { icon: Zap, label: 'Take Quiz', to: '/quiz', color: '#ec4899' },
];

const RECENT_ACTIVITY = [
  { id: 1, title: 'Joined Physics Study Group', time: '2 hours ago', icon: Users },
  { id: 2, title: 'Created notes for Calculus Ch.7', time: '5 hours ago', icon: BookOpen },
  { id: 3, title: 'Completed Physics Quiz', time: 'Yesterday', icon: CheckCircle2 },
  { id: 4, title: 'Earned 5-day streak!', time: '2 days ago', icon: Flame },
];

const UPCOMING_SESSIONS = [
  { id: 1, title: 'Physics 301 Review', subject: 'Advanced Physics', time: 'Today, 3:00 PM', members: 4 },
  { id: 2, title: 'Calculus Problem Set', subject: 'Chapter 7 — Integration', time: 'Tomorrow, 10:00 AM', members: 3 },
  { id: 3, title: 'Biology Lab Prep', subject: 'Cell Biology', time: 'Friday, 2:00 PM', members: 2 },
];

const ACHIEVEMENTS = [
  { icon: Star, title: 'First Notes', desc: 'Created your first set of notes', unlocked: true },
  { icon: Users, title: 'Social Butterfly', desc: 'Joined 5 study groups', unlocked: true },
  { icon: Target, title: 'Quiz Master', desc: 'Scored 100% on a quiz', unlocked: false },
  { icon: Award, title: 'Streak Champion', desc: 'Maintained a 7-day streak', unlocked: false },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();

  const levelProgress = (user.xp % 1000) / 10;
  const nextLevelXP = ((Math.floor(user.xp / 1000) + 1) * 1000);

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-auto">
      {/* Welcome Header */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-sm text-(--text-secondary) mt-1">
            Ready to continue your learning journey?
          </p>
        </div>
        <button
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ background: 'oklch(0.58 0.22 var(--accent-hue))' }}
        >
          <Plus size={16} />
          Create Room
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: TrendingUp, label: 'Total XP', value: user.xp.toLocaleString(), color: 'oklch(0.58 0.22 var(--accent-hue))' },
          { icon: Flame, label: 'Day Streak', value: user.streak, color: '#f97316' },
          { icon: CheckCircle2, label: 'Current Level', value: user.level, color: '#22c55e' },
          { icon: Users, label: 'Study Groups', value: 12, color: '#3b82f6' },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-2xl border border-(--border-default) transition-all hover:shadow-(--shadow-md)" style={{ background: 'var(--bg-surface)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={18} />
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-xs text-(--text-muted)">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Level Progress */}
      <div className="p-4 rounded-2xl border border-(--border-default)" style={{ background: 'var(--bg-surface)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'oklch(0.58 0.22 var(--accent-hue) / 0.12)', color: 'oklch(0.58 0.22 var(--accent-hue))' }}>
            Level {user.level}
          </span>
          <span className="text-xs text-(--text-muted)">{user.xp.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-glass)' }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${levelProgress}%`, background: 'oklch(0.58 0.22 var(--accent-hue))' }} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quick Actions */}
        <div className="p-4 rounded-2xl border border-(--border-default)" style={{ background: 'var(--bg-surface)' }}>
          <h2 className="font-semibold mb-3">Quick Actions</h2>
          <div className="space-y-2">
            {QUICK_ACTIONS.map((action, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-(--bg-glass) group"
                onClick={() => navigate(action.to)}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${action.color}15`, color: action.color }}>
                  <action.icon size={16} />
                </div>
                <span className="text-sm flex-1 text-left">{action.label}</span>
                <ArrowRight size={14} className="text-(--text-muted) group-hover:text-(--text-primary) transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-4 rounded-2xl border border-(--border-default)" style={{ background: 'var(--bg-surface)' }}>
          <h2 className="font-semibold mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-(--bg-glass) text-(--text-secondary)">
                  <a.icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{a.title}</div>
                  <div className="text-[10px] text-(--text-muted)">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="p-4 rounded-2xl border border-(--border-default) lg:col-span-2" style={{ background: 'var(--bg-surface)' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Upcoming Sessions</h2>
            <button className="flex items-center gap-1 text-xs text-(--text-secondary) hover:text-(--text-primary) transition-colors" onClick={() => navigate('/rooms')}>
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {UPCOMING_SESSIONS.map((s) => (
              <button
                key={s.id}
                className="text-left p-4 rounded-xl border border-(--border-default) transition-all hover:shadow-(--shadow-md) hover:-translate-y-0.5 bg-(--bg-glass)"
                onClick={() => navigate(`/room/${s.id}`)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} style={{ color: 'oklch(0.58 0.22 var(--accent-hue))' }} />
                  <span className="text-sm font-medium">{s.title}</span>
                </div>
                <div className="text-xs text-(--text-muted) mb-3">{s.subject}</div>
                <div className="flex items-center gap-3 text-[10px] text-(--text-muted)">
                  <span className="flex items-center gap-1"><Clock size={10} /> {s.time}</span>
                  <span className="flex items-center gap-1"><Users size={10} /> {s.members}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="p-4 rounded-2xl border border-(--border-default) lg:col-span-2" style={{ background: 'var(--bg-surface)' }}>
          <h2 className="font-semibold mb-3">Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${a.unlocked ? '' : 'opacity-40'}`}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: a.unlocked ? 'oklch(0.58 0.22 var(--accent-hue) / 0.12)' : 'var(--bg-glass)', color: a.unlocked ? 'oklch(0.58 0.22 var(--accent-hue))' : 'var(--text-muted)' }}>
                  <a.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{a.title}</div>
                  <div className="text-[10px] text-(--text-muted)">{a.desc}</div>
                </div>
                {!a.unlocked && <AlertCircle size={14} className="text-(--text-muted)" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
