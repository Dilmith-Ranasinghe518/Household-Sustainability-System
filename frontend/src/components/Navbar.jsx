import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, User, LogIn, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from './ConfirmModal';
import logoImg from '../assets/logo.jpeg';


const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        setShowLogoutConfirm(true);
        setShowProfileMenu(false);
    };

    const confirmLogout = () => {
        logout();
        navigate('/');
        setShowLogoutConfirm(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        // Only show Dashboard link if logged in, or maybe always?
        // For now adhering to previous list but maybe conditional is better
        { name: 'Dashboard', path: '/dashboard' },
    ];

    if (user?.role === 'admin') {
        navLinks.push({ name: 'Admin', path: '/admin' });
    }

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white/80 backdrop-blur-md border-b border-white/30 shadow-sm' : 'py-5 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group border-none">
                    <img src={logoImg} alt="Sustaincity Logo" className="h-10 w-auto object-cover rounded-xl shadow-md transition-transform group-hover:scale-105" />
                    <span className="text-2xl font-bold text-forest-dark tracking-tight">EcoPulse</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`font-medium transition-colors relative ${location.pathname === link.path
                                    ? 'text-primary-teal after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary-teal after:rounded-full'
                                    : 'text-text-main hover:text-primary-teal'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-6 border-l border-border pl-6">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center gap-3 font-medium text-text-main hover:text-primary-teal transition-colors"
                                >
                                    <div className="w-9 h-9 bg-teal-soft-bg text-primary-teal rounded-full flex items-center justify-center font-bold">
                                        {user?.username?.charAt(0).toUpperCase() || <User size={18} />}
                                    </div>
                                    <span>{user?.username}</span>
                                    <ChevronDown size={16} />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {showProfileMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border overflow-hidden"
                                        >
                                            <div className="p-3 border-b border-border">
                                                <p className="text-sm font-semibold text-text-main">{user?.username}</p>
                                                <p className="text-xs text-text-muted truncate">{user?.email}</p>
                                            </div>
                                            <div className="p-2">
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text-main hover:bg-off-white rounded-lg transition-colors"
                                                    onClick={() => setShowProfileMenu(false)}
                                                >
                                                    <User size={16} /> Profile
                                                </Link>
                                                <Link
                                                    to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text-main hover:bg-off-white rounded-lg transition-colors"
                                                    onClick={() => setShowProfileMenu(false)}
                                                >
                                                    <User size={16} /> Dashboard
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <LogOut size={16} /> Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="font-medium text-text-muted hover:text-forest-dark transition-colors">
                                    Log in
                                </Link>
                                <Link to="/register" className="bg-forest-dark text-white px-6 py-2.5 rounded-full font-semibold shadow-md transition-all hover:bg-deep-eco hover:-translate-y-0.5 hover:shadow-lg">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-forest-dark" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white border-b border-border overflow-hidden md:hidden shadow-lg"
                    >
                        <div className="p-6 flex flex-col gap-5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-text-main"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-border" />
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center gap-3 py-2">
                                        <div className="w-10 h-10 bg-teal-soft-bg text-primary-teal rounded-full flex items-center justify-center font-bold">
                                            {user?.username?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-text-main">{user?.username}</p>
                                            <p className="text-xs text-text-muted">{user?.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="flex items-center gap-3 text-lg font-medium text-red-600"
                                    >
                                        <LogOut size={20} /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-lg font-medium text-text-main">
                                        <LogIn size={20} /> Log in
                                    </Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3 text-lg font-semibold text-primary-teal border border-primary-teal p-3 rounded-xl">
                                        <User size={20} /> Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ConfirmModal
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={confirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out of your account?"
                confirmText="Logout"
                type="danger"
            />
        </nav>
    );
};

export default Navbar;
