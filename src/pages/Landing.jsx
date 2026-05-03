import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg-base)' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>EduWrap</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>All-in-One Collaborative Study Workspace</p>
        <button
          id="landing-get-started"
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '10px 24px',
            background: 'var(--accent)',
            color: 'white',
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Get Started
        </button>
      </div>
    </main>
  );
}
