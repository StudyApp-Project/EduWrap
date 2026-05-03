import { useParams } from 'react-router-dom';

export default function StudyRoom() {
  const { id } = useParams();
  return (
    <div>
      <h1 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>Study Room</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Room ID: {id} — Phase 2 will build this screen.</p>
    </div>
  );
}
