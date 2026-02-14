import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// Footer removed from here, handled in layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserAudits from './pages/UserAudits';
import AdminAudits from './pages/AdminAudits';
import UserWaste from './pages/UserWaste';
import AdminWaste from './pages/AdminWaste';
import VerifyOTP from './pages/VerifyOTP';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './styles/global.css';

import { AuthProvider } from './context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './utils/roles';

// ✅ NEW: Disaster pages
import UserDisasters from './pages/UserDisasters';
import AdminDisasters from './pages/AdminDisasters';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow pt-[88px]"> {/* Add padding-top to account for fixed navbar */}
            <Routes>
              {/* Public Routes wrapped in PublicLayout */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>

              {/* Protected Routes wrapped in DashboardLayout */}
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/audits" element={<UserAudits />} />
                  <Route path="/waste" element={<UserWaste />} />

                  {/* users can only view */}
                  <Route path="/disasters" element={<UserDisasters />} />
                </Route>
              </Route>

              {/* Admin Routes wrapped in DashboardLayout (Admin Mode) */}
              <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
                <Route element={<DashboardLayout isAdmin={true} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/audits" element={<AdminAudits />} />
                  <Route path="/admin/waste" element={<AdminWaste />} />

                  {/* admins can do anything */}
                  <Route path="/admin/disasters" element={<AdminDisasters />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
