import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout/DashboardLayout';
import { Login } from './pages/Login/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Patients } from './pages/Patients/Patients';
import { PatientProfile } from './pages/Patients/PatientProfile';
import { Appointments } from './pages/Appointments/Appointments';
import { Dentists } from './pages/Dentists/Dentists';

// Placeholder components for other routes
const Placeholder = ({ title }: { title: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-secondary)' }}>
    <h2>{title} (Coming Soon)</h2>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/patients/:id" element={<PatientProfile />} />
              <Route path="/dentists" element={<Dentists />} />
              <Route path="/treatments" element={<Placeholder title="Treatment Plans" />} />
              <Route path="/prescriptions" element={<Placeholder title="Prescriptions" />} />
              <Route path="/billing" element={<Placeholder title="Billing" />} />
              <Route path="/settings" element={<Placeholder title="Settings" />} />
            </Route>
          </Route>
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
