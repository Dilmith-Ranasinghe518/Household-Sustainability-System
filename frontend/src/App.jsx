import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
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
import { ToastContainer } from "react-toastify";

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './utils/roles';

// ✅ Disaster pages
import UserDisasters from './pages/UserDisasters';
import AdminDisasters from './pages/AdminDisasters';

// ✅ NEW: Issue pages (create these files)
import UserIssues from './pages/UserIssues';
import CreateIssue from './pages/CreateIssue';
import IssueDetails from './pages/IssueDetails';
import AdminIssues from './pages/AdminIssues';
import AdminScoring from './pages/AdminScoring';
import CollectorDashboard from './pages/CollectorDashboard';
import WasteCalendar from './pages/WasteCalendar';
import Profile from './pages/Profile';

import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <ToastContainer 
            position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored"
          />
          <div className="flex-grow pt-[88px]">
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>

              {/* User Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/audits" element={<UserAudits />} />
                  <Route path="/waste" element={<UserWaste />} />

                  {/* users can only view */}
                  <Route path="/disasters" element={<UserDisasters />} />

                  {/* ✅ NEW: Support Center routes */}
                  <Route path="/issues" element={<UserIssues />} />
                  <Route path="/calendar" element={<WasteCalendar />} />
                  <Route path="/issues/create" element={<CreateIssue />} />
                  <Route path="/issues/:id" element={<IssueDetails />} />
                  <Route path="/profile" element={<Profile />} />

                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/marketplace/:id" element={<ProductDetails />} />
                </Route>
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
                <Route element={<DashboardLayout isAdmin={true} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/audits" element={<AdminAudits />} />
                  <Route path="/admin/waste" element={<AdminWaste />} />

                  {/* admins can do anything */}
                  <Route path="/admin/disasters" element={<AdminDisasters />} />

                  {/* ✅ NEW: Admin Issues */}
                  <Route path="/admin/issues" element={<AdminIssues />} />
                  <Route path="/admin/scoring" element={<AdminScoring />} />
                </Route>
              </Route>

              {/* Collector Protected Routes */}
              <Route element={<ProtectedRoute roles={[ROLES.COLLECTOR]} />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/collector/dashboard" element={<CollectorDashboard />} />
                  <Route path="/waste" element={<CollectorDashboard />} />
                  <Route path="/profile" element={<Profile />} />
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