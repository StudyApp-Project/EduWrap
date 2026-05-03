import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, Video, Sparkles, File, X, ArrowLeft, UserPlus, CheckCircle2, Loader2 } from 'lucide-react';
import styles from './StudyRoom.module.css';

// ── Mock data ────────────────────────────────────────────────
const MOCK_ROOM = {
  name: 'Physics Study Group',
  subject: 'Advanced Physics 301',
};

const MOCK_MEMBERS = [
  { id: 'm1', name: 'Alex R.',      initials: 'AR', status: 'online',  role: 'Host',       isYou: true  },
  { id: 'm2', name: 'Sarah J.',     initials: 'SJ', status: 'online',  role: 'Member',     isYou: false },
  { id: 'm3', name: 'Mike T.',      initials: 'MT', status: 'online',  role: 'Member',     isYou: false },
  { id: 'm4', name: 'Dr. Peterson', initials: 'DP', status: 'online',  role: 'Instructor', isYou: false },
  { id: 'm5', name: 'Lisa K.',      initials: 'LK', status: 'offline', role: 'Member',     isYou: false },
];

const CHAR_LIMIT = 5000;

function storageKey(id) { return `ew_room_notes_${id}`; }

// ── SaveStatus indicator ──────────────────────────────────────
function SaveStatus({ status }) {
  if (status === 'saving') return (
    <span className={styles.saveStatus}>
      <Loader2 size={11} className={styles.spin} /> Saving…
    </span>
  );
  if (status === 'saved') return (
    <span className={`${styles.saveStatus} ${styles.saved}`}>
      <CheckCircle2 size={11} /> Saved
    </span>
  );
  return null;
}

export default function StudyRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Notes
  const [notes, setNotes]         = useState(() => localStorage.getItem(storageKey(id)) ?? '');
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved'

  // File upload
  const [files, setFiles]                   = useState([]);
  const [uploading, setUploading]           = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingName, setUploadingName]   = useState('');
  const fileInputRef = useRef(null);

  // ── Auto-save notes with status feedback ──
  useEffect(() => {
    if (saveStatus === 'idle') return;
    setSaveStatus('saving');
    const t = setTimeout(() => {
      localStorage.setItem(storageKey(id), notes);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 700);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  function handleNotesChange(e) {
    if (e.target.value.length > CHAR_LIMIT) return;
    setNotes(e.target.value);
    setSaveStatus('saving');
  }

  // ── File upload simulation ──
  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file || uploading) return;
    setUploading(true);
    setUploadProgress(0);
    setUploadingName(file.name);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => [...prev, {
          id: Date.now(),
          name: file.name,
          size: file.size < 1024
            ? `${file.size} B`
            : file.size < 1024 * 1024
              ? `${(file.size / 1024).toFixed(1)} KB`
              : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        }]);
        setUploading(false);
        setUploadProgress(0);
        setUploadingName('');
      }
      setUploadProgress(progress);
    }, 220);

    e.target.value = '';
  }

  function removeFile(fileId) {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }

  const onlineCount = MOCK_MEMBERS.filter(m => m.status === 'online').length;

  return (
    <div className={styles.room}>

      {/* ── LEFT: Members ── */}
      <aside className={styles.members}>

        {/* Back button */}
        <button
          id="room-back-btn"
          className={styles.backBtn}
          onClick={() => navigate('/rooms')}
        >
          <ArrowLeft size={13} />
          Back to Rooms
        </button>

        {/* Members header */}
        <div className={styles.membersHeader}>
          <h2 className={styles.sectionTitle}>Members</h2>
          <span className={styles.memberCount}>{onlineCount} online</span>
        </div>

        <ul className={styles.memberList}>
          {MOCK_MEMBERS.map(m => (
            <li
              key={m.id}
              className={`${styles.memberItem} ${m.isYou ? styles.memberYou : ''}`}
            >
              <div className={styles.avatarWrap}>
                <div className={styles.avatar}>{m.initials}</div>
                <span
                  className={`${styles.dot} ${m.status === 'online' ? styles.online : styles.offline}`}
                  title={m.status}
                />
              </div>
              <div className={styles.memberInfo}>
                <span className={styles.memberName}>
                  {m.name}{m.isYou && <em className={styles.youTag}> (You)</em>}
                </span>
                <span className={styles.memberRole}>{m.role}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Invite button */}
        <button id="room-invite-btn" className={styles.inviteBtn}>
          <UserPlus size={13} />
          Invite Members
        </button>

        {/* Session Files */}
        <div className={styles.fileSection}>
          <h3 className={styles.fileTitle}>Session Files</h3>

          {/* Upload in-progress row */}
          {uploading && (
            <div className={styles.uploadingRow}>
              <div className={styles.uploadingName}>{uploadingName}</div>
              <div className={styles.progressTrackSm}>
                <div className={styles.progressBarSm} style={{ width: `${uploadProgress}%` }} />
              </div>
              <span className={styles.uploadPct}>{uploadProgress}%</span>
            </div>
          )}

          {files.length === 0 && !uploading ? (
            <p className={styles.emptyFiles}>No files uploaded yet.</p>
          ) : (
            <ul className={styles.fileList}>
              {files.map(f => (
                <li key={f.id} className={styles.fileItem}>
                  <File size={13} className={styles.fileIcon} />
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName}>{f.name}</span>
                    <span className={styles.fileSize}>{f.size}</span>
                  </div>
                  <button
                    onClick={() => removeFile(f.id)}
                    className={styles.fileRemove}
                    aria-label={`Remove ${f.name}`}
                    title="Remove"
                  >
                    <X size={11} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* ── CENTER: Main content ── */}
      <main className={styles.center}>

        {/* Room header */}
        <header className={styles.roomHeader}>
          <div className={styles.roomMeta}>
            <h1 className={styles.roomName}>{MOCK_ROOM.name}</h1>
            <p className={styles.roomSubject}>
              {MOCK_ROOM.subject} · Room {id} · {onlineCount} of {MOCK_MEMBERS.length} online
            </p>
          </div>
          <span className={styles.liveBadge}>● Live</span>
        </header>

        {/* Notes editor */}
        <div className={styles.editorWrap}>
          <div className={styles.editorToolbar}>
            <label className={styles.editorLabel} htmlFor="room-notes">
              Room Notes
            </label>
            <div className={styles.editorMeta}>
              <SaveStatus status={saveStatus} />
              <span className={styles.charCount}>
                {notes.length} / {CHAR_LIMIT}
              </span>
            </div>
          </div>

          {notes.length === 0 && (
            <p className={styles.notesHint}>
              💡 Tip: Notes are saved automatically and visible to all room members.
            </p>
          )}

          <textarea
            id="room-notes"
            className={styles.editor}
            placeholder="Start typing shared notes for this session..."
            value={notes}
            onChange={handleNotesChange}
          />
        </div>

        {/* Quick actions */}
        <div className={styles.actions}>
          <input
            ref={fileInputRef}
            type="file"
            id="room-file-input"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />

          <button
            id="room-upload-btn"
            className={styles.actionBtn}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            title={uploading ? `Uploading ${uploadProgress}%` : 'Upload a file to the session'}
          >
            <Upload size={15} />
            {uploading ? `Uploading ${uploadProgress}%` : 'Upload File'}
          </button>

          <button
            id="room-start-call-btn"
            className={`${styles.actionBtn} ${styles.primaryBtn}`}
            onClick={() => navigate(`/room/${id}/call`)}
            title="Start a video call with room members"
          >
            <Video size={15} />
            Start Call
          </button>

          <button
            id="room-ai-help-btn"
            className={`${styles.actionBtn} ${styles.aiBtn}`}
            title="Get AI assistance for this session"
          >
            <Sparkles size={15} />
            AI Help
          </button>
        </div>
      </main>

    </div>
  );
}
