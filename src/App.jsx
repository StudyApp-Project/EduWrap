import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { PanelProvider } from './contexts/PanelContext';
import AppLayout from './layouts/AppLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import StudyRoom from './pages/StudyRoom';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <PanelProvider>
          <Routes>
            {/* Public route — no AppLayout */}
            <Route path="/" element={<Landing />} />

            {/* App routes — wrapped in AppLayout */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/room/:id" element={<StudyRoom />} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </PanelProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
