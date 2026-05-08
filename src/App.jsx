import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { RoomProvider } from './contexts/RoomContext';
import { NotesProvider } from './contexts/NotesContext';
import { FlashcardProvider } from './contexts/FlashcardContext';
import { QuizProvider } from './contexts/QuizContext';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';

// Lazy-loaded pages — code-split for better initial load
const Rooms = lazy(() => import('./pages/Rooms'));
const StudyRoom = lazy(() => import('./pages/StudyRoom'));
const Notes = lazy(() => import('./pages/Notes'));
const Flashcards = lazy(() => import('./pages/Flashcards'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Doubts = lazy(() => import('./pages/Doubts'));
const Files = lazy(() => import('./pages/Files'));
const Profile = lazy(() => import('./pages/Profile'));
const SettingsLayout = lazy(() => import('./pages/Settings/SettingsLayout'));
const Sandbox = lazy(() => import('./pages/Sandbox'));

// Loading fallback for lazy-loaded pages
function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-(--border-default) border-t-[color:oklch(0.58_0.22_var(--accent-hue))] rounded-full animate-spin" />
        <span className="text-xs text-(--text-muted)">Loading...</span>
      </div>
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
                  <Suspense fallback={<PageLoader />}>
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
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/rooms" element={<Rooms />} />
                        <Route path="/room/:id" element={<StudyRoom />} />
                        <Route path="/room/:id/call" element={<StudyRoom />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/flashcards" element={<Flashcards />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/doubts" element={<Doubts />} />
                        <Route path="/files" element={<Files />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<SettingsLayout />} />
                        <Route path="/sandbox" element={<Sandbox />} />

                        {/* Catch-all */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Route>
                    </Routes>
                  </Suspense>
                </QuizProvider>
              </FlashcardProvider>
            </NotesProvider>
          </RoomProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
