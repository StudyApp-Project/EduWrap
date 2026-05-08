import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { RoomProvider } from './contexts/RoomContext';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import StudyRoom from './pages/StudyRoom';
import Sandbox from './pages/Sandbox';
import Notes from './pages/Notes';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import { NotesProvider } from './contexts/NotesContext';
import { FlashcardProvider } from './contexts/FlashcardContext';
import { QuizProvider } from './contexts/QuizContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import SettingsLayout from './pages/Settings/SettingsLayout';
import Doubts from './pages/Doubts';

// Stub — built in a later phase
function Stub({ label }) {
  return (
    <div className="flex-1 grid place-items-center text-(--text-secondary) text-sm">
      <p>{label} — coming soon</p>
    </div>
  );
}

// Protected Route Guard
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useUser();
  const location = useLocation();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// Public Route Guard (Redirects to dashboard if already logged in)
function PublicRoute({ children }) {
  const { isLoggedIn } = useUser();
  
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <UserProvider>
    <RoomProvider>

          <NotesProvider>
            <FlashcardProvider>
              <QuizProvider>
              <Routes>
                {/* Public — no AppLayout */}
                <Route path="/" element={<Landing />} />

                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                  <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                  <Route path="/onboarding" element={<PublicRoute><Onboarding /></PublicRoute>} />
                </Route>

                {/* App routes — inside AppLayout */}
                <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/dashboard"     element={<Dashboard />} />
              <Route path="/rooms"         element={<Rooms />} />
              <Route path="/room/:id"      element={<StudyRoom />} />
              <Route path="/room/:id/call" element={<Stub label="Video Call" />} />
              <Route path="/notes"         element={<Notes />} />
              <Route path="/flashcards"    element={<Flashcards />} />


              <Route path="/quiz"          element={<Quiz />} />
              <Route path="/doubts"        element={<Doubts />} />


              <Route path="/files"         element={<Stub label="Files" />} />
<Route path="/profile" element={<Profile />} />
<Route path="/settings" element={<SettingsLayout />} />
              <Route path="/sandbox"       element={<Sandbox />} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
              </Routes>
              </QuizProvider>
            </FlashcardProvider>
          </NotesProvider>
</RoomProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
