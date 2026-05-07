import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, MessageSquare, Users, Sparkles, Zap, Shield, Clock } from 'lucide-react';

const FEATURES = [
  { icon: BookOpen, title: 'Collaborative Notes', desc: 'Real-time note-taking with your study group' },
  { icon: MessageSquare, title: 'Live Chat', desc: 'Instant messaging with typing indicators' },
  { icon: Users, title: 'Study Rooms', desc: 'Create dedicated spaces for each subject' },
  { icon: Sparkles, title: 'AI Assistance', desc: 'Get help with complex topics instantly' },
  { icon: Zap, title: 'Flashcards & Quizzes', desc: 'Test your knowledge with interactive tools' },
  { icon: Shield, title: 'Secure & Private', desc: 'Your data stays safe and encrypted' },
];

const STATS = [
  { value: '10K+', label: 'Active Students' },
  { value: '500+', label: 'Study Groups' },
  { value: '98%', label: 'Satisfaction Rate' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 20%, oklch(0.58 0.22 var(--accent-hue) / 0.2), transparent 60%), radial-gradient(ellipse at 70% 80%, oklch(0.58 0.15 calc(var(--accent-hue) + 40) / 0.15), transparent 60%)' }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-4">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white" style={{ background: 'oklch(0.58 0.22 var(--accent-hue))' }}>
            EW
          </span>
          <span className="text-lg font-bold font-[var(--font-display)]">EduWrap</span>
        </div>
        <button
          className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
          style={{ background: 'oklch(0.58 0.22 var(--accent-hue))' }}
          onClick={() => navigate('/dashboard')}
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border border-[var(--border-default)]"
            style={{ background: 'var(--bg-surface)' }}>
            <Sparkles size={14} style={{ color: 'oklch(0.58 0.22 var(--accent-hue))' }} />
            <span>Now in Beta</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Study Smarter,
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, oklch(0.58 0.22 var(--accent-hue)), oklch(0.65 0.18 calc(var(--accent-hue) + 40)))' }}>
              Together
            </span>
          </h1>

          <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-8 leading-relaxed">
            The all-in-one collaborative workspace for college students.
            Notes, chat, flashcards, and live study sessions — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="landing-get-started"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: 'oklch(0.58 0.22 var(--accent-hue))' }}
              onClick={() => navigate('/dashboard')}
            >
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-[var(--border-strong)] transition-all duration-200 hover:bg-[var(--bg-glass)]"
              style={{ background: 'var(--bg-surface)' }}>
              <Clock size={16} />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-12 mt-14">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold" style={{ color: 'oklch(0.58 0.22 var(--accent-hue))' }}>{stat.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Everything you need to ace your exams
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
              Stop switching between apps. EduWrap brings all your study tools together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-[var(--border-default)] transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5"
                style={{ background: 'var(--bg-surface)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'oklch(0.58 0.22 var(--accent-hue) / 0.1)', color: 'oklch(0.58 0.22 var(--accent-hue))' }}
                >
                  <feature.icon size={20} />
                </div>
                <h3 className="font-semibold mb-1.5">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div
          className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl border border-[var(--border-default)]"
          style={{ background: 'var(--bg-surface)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Ready to transform your study sessions?
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Join thousands of students already using EduWrap to study smarter.
          </p>
          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: 'oklch(0.58 0.22 var(--accent-hue))' }}
            onClick={() => navigate('/dashboard')}
          >
            Start Learning Now
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--border-default)] px-6 md:px-12 py-6">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold text-white" style={{ background: 'oklch(0.58 0.22 var(--accent-hue))' }}>
              EW
            </span>
            <span className="text-sm font-semibold">EduWrap</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 EduWrap. Built for students, by students.
          </p>
        </div>
      </footer>
    </main>
  );
}
