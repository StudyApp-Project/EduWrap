import { useState, useRef, useEffect } from 'react';
import { usePanel } from '../../contexts/PanelContext';
import { X, Send } from 'lucide-react';
import styles from './Panel.module.css';

const DUMMY_MESSAGES = [
  { id: 1, author: 'Sarah J.', text: 'Hey! Did everyone read chapter 4?', time: '10:42 AM', self: false },
  { id: 2, author: 'You',      text: 'Yes, the kinematics section was tricky.', time: '10:43 AM', self: true },
  { id: 3, author: 'Mike T.',  text: 'Same. The net force equation confused me.',  time: '10:44 AM', self: false },
];

export default function ChatPanel() {
  const { chatOpen, toggleChat } = usePanel();
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (chatOpen) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatOpen]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), author: 'You', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), self: true },
    ]);
    setInput('');
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <aside className={`${styles.panel} ${chatOpen ? styles.panelVisible : styles.panelHidden}`}>
      <header className={styles.header}>
        <span className={styles.title}>Chat</span>
        <button id="chat-panel-close" onClick={toggleChat} aria-label="Close chat">
          <X size={16} />
        </button>
      </header>

      <div className={styles.messageList}>
        {messages.map(msg => (
          <div key={msg.id} className={`${styles.message} ${msg.self ? styles.self : ''}`}>
            {!msg.self && <div className={styles.author}>{msg.author}</div>}
            <div className={styles.bubble}>{msg.text}</div>
            <div className={styles.time}>{msg.time}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className={styles.inputRow}>
        <input
          id="chat-input"
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          className={styles.input}
        />
        <button id="chat-send" onClick={sendMessage} className={styles.sendBtn} aria-label="Send">
          <Send size={14} />
        </button>
      </div>
    </aside>
  );
}
