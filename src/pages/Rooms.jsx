import { useNavigate } from 'react-router-dom';
import styles from './Rooms.module.css';
import { Users, Clock, BookOpen } from 'lucide-react';

const MOCK_ROOMS = [
  { id: '1', name: 'Physics Study Group',   subject: 'Advanced Physics 301',   members: 4, status: 'live',      lastActive: 'Now' },
  { id: '2', name: 'European History Prep', subject: 'Midterm review session',  members: 2, status: 'scheduled', lastActive: 'In 2 hours' },
  { id: '3', name: 'Calculus Problem Set',  subject: 'Chapter 7 — Integration', members: 3, status: 'live',      lastActive: 'Now' },
  { id: '4', name: 'Biology Lab Notes',     subject: 'Cell Biology',            members: 1, status: 'idle',       lastActive: '3 hours ago' },
];

const STATUS_LABEL = { live: 'Live', scheduled: 'Scheduled', idle: 'Idle' };

export default function Rooms() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Study Rooms</h1>
        <p className={styles.sub}>Join an active session or create a new one.</p>
      </div>

      <div className={styles.grid}>
        {MOCK_ROOMS.map(room => (
          <button
            key={room.id}
            id={`room-card-${room.id}`}
            className={styles.card}
            onClick={() => navigate(`/room/${room.id}`)}
          >
            <div className={styles.cardTop}>
              <div className={styles.iconWrap}>
                <BookOpen size={18} />
              </div>
              <span className={`${styles.badge} ${styles[room.status]}`}>
                {STATUS_LABEL[room.status]}
              </span>
            </div>

            <div className={styles.cardBody}>
              <h2 className={styles.roomName}>{room.name}</h2>
              <p className={styles.roomSubject}>{room.subject}</p>
            </div>

            <div className={styles.cardFoot}>
              <span className={styles.meta}>
                <Users size={12} /> {room.members} members
              </span>
              <span className={styles.meta}>
                <Clock size={12} /> {room.lastActive}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
