import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Settings,
    LogOut,
    Leaf,
    BarChart3,
    User,
    ShieldCheck,
    Zap,
    Recycle,
    Droplets,
    FileText
} from 'lucide-react';


const Sidebar = ({ isAdmin = false }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const userMenuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'My Audits', path: '/audits', icon: <FileText size={20} /> },
        { name: 'Waste Mgmt', path: '/waste', icon: <Recycle size={20} /> },
        { name: 'Energy', path: '#', icon: <Zap size={20} /> },

        { name: 'Water', path: '#', icon: <Droplets size={20} /> },
        { name: 'Profile', path: '#', icon: <User size={20} /> },
    ];

    const adminMenuItems = [
        { name: 'Admin Overview', path: '/admin', icon: <ShieldCheck size={20} /> },
        { name: 'Audit Logs', path: '/admin/audits', icon: <FileText size={20} /> },
        { name: 'Waste Requests', path: '/admin/waste', icon: <Recycle size={20} /> },
        { name: 'Analytics', path: '#', icon: <BarChart3 size={20} /> },
        { name: 'Users', path: '#', icon: <User size={20} /> },
        { name: 'Settings', path: '#', icon: <Settings size={20} /> },
    ];

    const menuItems = isAdmin ? adminMenuItems : userMenuItems;

    return (
        <aside className="fixed left-0 top-[88px] z-40 h-[calc(100vh-88px)] w-[70px] md:w-[260px] bg-forest-dark text-white flex flex-col transition-all duration-300 shadow-xl">
            {/* Branding removed as it's in the global Navbar */}

            <nav className="flex-1 py-6 px-3 flex flex-col gap-2 items-center md:items-stretch">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-3 md:px-4 md:py-3.5 rounded-xl font-medium transition-all w-full ${location.pathname === item.path
                            ? 'bg-primary-teal text-white shadow-lg shadow-primary-teal/20'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                            }`}
                        title={item.name}
                    >
                        {item.icon}
                        <span className="hidden md:block">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10 flex justify-center md:justify-start">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-3.5 rounded-xl font-medium text-white/70 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
                >
                    <LogOut size={20} />
                    <span className="hidden md:block">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
