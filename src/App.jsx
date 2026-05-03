import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { PanelProvider } from './contexts/PanelContext';
import AppLayout from './layouts/AppLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import StudyRoom from './pages/StudyRoom';

// Stub — built in a later phase
function Stub({ label }) {
  return (
    <div style={{ display: 'grid', placeItems: 'center', flex: 1, color: 'var(--text-secondary)', fontSize: 14 }}>
      <p>{label} — coming soon</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <PanelProvider>
          <Routes>
            {/* Public — no AppLayout */}
            <Route path="/" element={<Landing />} />

            {/* App routes — inside AppLayout */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard"     element={<Dashboard />} />
              <Route path="/rooms"         element={<Rooms />} />
              <Route path="/room/:id"      element={<StudyRoom />} />
              <Route path="/room/:id/call" element={<Stub label="Video Call" />} />
              <Route path="/notes"         element={<Stub label="Notes" />} />
              <Route path="/flashcards"    element={<Stub label="Flashcards" />} />
              <Route path="/quiz"          element={<Stub label="Quiz" />} />
              <Route path="/files"         element={<Stub label="Files" />} />
              <Route path="/profile"       element={<Stub label="Profile" />} />
              <Route path="/settings"      element={<Stub label="Settings" />} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </PanelProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
