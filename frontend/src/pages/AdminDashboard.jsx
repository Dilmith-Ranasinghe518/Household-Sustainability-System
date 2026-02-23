import React from 'react';
import {
    Users,
    MapPin,
    TrendingUp,
    AlertTriangle,
    Search,
    Filter,
    Download,
    Settings as SettingsIcon,
    Shield
} from 'lucide-react';

import { motion } from 'framer-motion';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/apiConfig';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({ username: '', email: '', role: '' });
    const [settings, setSettings] = useState({ isRegistrationOtpEnabled: true });
    const [loadingSettings, setLoadingSettings] = useState(true);

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const res = await api.get(API_ENDPOINTS.ADMIN.USERS);
            setUsers(res.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        } finally {
            setLoadingUsers(false);
        }
    };

    const fetchSettings = async () => {
        setLoadingSettings(true);
        try {
            const res = await api.get(API_ENDPOINTS.SETTINGS);
            setSettings(res.data);
        } catch (err) {
            console.error('Error fetching settings:', err);
        } finally {
            setLoadingSettings(false);
        }
    };

    const handleToggleOtp = async () => {
        try {
            const newStatus = !settings.isRegistrationOtpEnabled;
            const res = await api.put(API_ENDPOINTS.SETTINGS, { isRegistrationOtpEnabled: newStatus });
            setSettings(res.data);
            alert(`Registration OTP ${newStatus ? 'enabled' : 'disabled'} successfully`);
        } catch (err) {
            console.error('Error updating settings:', err);
            alert('Failed to update settings');
        }
    };



    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`${API_ENDPOINTS.ADMIN.USERS}/${id}`);
                setUsers(users.filter(u => u._id !== id));
            } catch (err) {
                console.error('Error deleting user:', err);
                alert('Failed to delete user');
            }
        }
    };

    const startEditUser = (user) => {
        setEditingUser(user);
        setEditFormData({ username: user.username, email: user.email, role: user.role });
    };

    const cancelEdit = () => {
        setEditingUser(null);
        setEditFormData({ username: '', email: '', role: '' });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`${API_ENDPOINTS.ADMIN.USERS}/${editingUser._id}`, editFormData);
            setUsers(users.map(u => u._id === editingUser._id ? { ...u, ...res.data.user } : u));
            setEditingUser(null);
            alert('User updated successfully');
        } catch (err) {
            console.error('Error updating user:', err);
            alert('Failed to update user');
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchSettings();
    }, []);

    const pieData = {
        labels: ['Active', 'Pending', 'Suspended'],
        datasets: [{
            data: [350, 45, 12],
            backgroundColor: ['#0ea5a4', '#facc15', '#ff5f56'],
            borderWidth: 0
        }]
    };

    const barData = {
        labels: ['North', 'South', 'East', 'West', 'Central'],
        datasets: [{
            label: 'Sustainability Index by Region',
            data: [78, 82, 65, 89, 72],
            backgroundColor: '#12372a',
            borderRadius: 6
        }]
    };



    if (loadingUsers) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-off-white">
                <div className="w-12 h-12 border-4 border-primary-teal border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Admin Control Center</h1>
                    <p className="text-text-muted">Welcome {user?.username}. System-wide sustainability metrics.</p>
                </div>
                <div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-border rounded-xl font-medium text-text-main shadow-sm hover:bg-off-white transition-colors">
                        <Download size={18} />
                        Export Reports
                    </button>
                </div>
            </header>

            <section className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 flex items-center gap-5 bg-white rounded-[1.25rem] shadow-sm glass"
                    >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-teal-soft-bg"><Users className="text-primary-teal" /></div>
                        <div className="flex-1">
                            <span className="text-sm text-text-muted block mb-1">Total Users</span>
                            <strong className="text-2xl text-forest-dark">{users.length}</strong>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-lg bg-pale-green text-green-800">+5%</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 flex items-center gap-5 bg-white rounded-[1.25rem] shadow-sm glass"
                    >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-soft-yellow-bg"><TrendingUp className="text-warm-yellow" /></div>
                        <div className="flex-1">
                            <span className="text-sm text-text-muted block mb-1">Total CO2 Reduced</span>
                            <strong className="text-2xl text-forest-dark">42.8 Tons</strong>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-lg bg-pale-green text-green-800">+18%</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 flex items-center gap-5 bg-white rounded-[1.25rem] shadow-sm glass"
                    >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#fee2e2]"><AlertTriangle className="text-[#ef4444]" /></div>
                        <div className="flex-1">
                            <span className="text-sm text-text-muted block mb-1">System Alerts</span>
                            <strong className="text-2xl text-forest-dark">3 Active</strong>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-6">
                    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm glass">
                        <h3 className="text-lg font-semibold mb-6">Community Growth</h3>
                        <div className="h-[300px]">
                            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm glass">
                        <h3 className="text-lg font-semibold mb-6">User Status</h3>
                        <div className="h-[300px]">
                            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[1.5rem] p-6 shadow-sm glass">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">User Management</h3>
                        <button onClick={fetchUsers} className="flex items-center gap-2 px-4 py-2 bg-off-white border border-border rounded-xl font-medium text-sm text-text-main hover:bg-gray-100 transition-colors">Refresh List</button>
                    </div>
                    {loadingUsers ? (
                        <div className="text-center py-10">Loading users...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">User</th>
                                        <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">Role</th>
                                        <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">Email</th>
                                        <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u._id}>
                                            <td className="p-4 border-b border-border">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-teal-soft-bg text-primary-teal rounded-full flex items-center justify-center font-bold">{u.username.charAt(0).toUpperCase()}</div>
                                                    <strong className="block text-sm text-text-main">{u.username}</strong>
                                                </div>
                                            </td>
                                            <td className="p-4 border-b border-border">
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{u.role}</span>
                                            </td>
                                            <td className="p-4 border-b border-border text-sm text-text-muted">
                                                {u.email}
                                            </td>
                                            <td className="p-4 border-b border-border">
                                                <div className="flex gap-2">
                                                    <button onClick={() => startEditUser(u)} className="text-blue-500 hover:text-blue-700 font-medium text-sm">Edit</button>
                                                    <button onClick={() => handleDeleteUser(u._id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>


                <div className="bg-white rounded-[1.5rem] p-6 shadow-sm glass">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <SettingsIcon size={20} className="text-primary-teal" />
                        System Settings
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-off-white rounded-xl border border-border">
                        <div>
                            <strong className="block text-sm text-text-main font-bold">Email OTP for Registration</strong>
                            <p className="text-xs text-text-muted mt-1">If disabled, users can complete registration immediately after entering their email.</p>
                        </div>
                        <button
                            onClick={handleToggleOtp}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-2 ring-transparent ring-offset-2 ${settings.isRegistrationOtpEnabled ? 'bg-primary-teal' : 'bg-gray-300'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.isRegistrationOtpEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                </div>

            </section>

            {/* Edit User Modal */}
            {editingUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Edit User</h3>
                        <form onSubmit={handleUpdateUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    value={editFormData.username}
                                    onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                                    className="w-full px-3 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary-teal/50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary-teal/50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    value={editFormData.role}
                                    onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                                    className="w-full px-3 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary-teal/50"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={cancelEdit} className="px-4 py-2 text-text-muted hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary-teal text-white rounded-lg hover:bg-teal-700 transition-colors">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div >
    );
};

export default AdminDashboard;
