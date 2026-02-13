import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserAudits from './pages/UserAudits';
import AdminAudits from './pages/AdminAudits';
import UserWaste from './pages/UserWaste';
import AdminWaste from './pages/AdminWaste';
import './styles/global.css';

import { AuthProvider } from './context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './utils/roles';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow pt-[88px]"> {/* Add padding-top to account for fixed navbar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/audits" element={<UserAudits />} />
                <Route path="/waste" element={<UserWaste />} />
              </Route>

              <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/audits" element={<AdminAudits />} />
                <Route path="/admin/waste" element={<AdminWaste />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
