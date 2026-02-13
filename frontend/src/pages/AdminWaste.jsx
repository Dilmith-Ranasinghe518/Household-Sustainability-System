import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle, Clock, Filter, RefreshCw } from 'lucide-react';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/apiConfig';

const AdminWaste = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, completed

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await api.get(API_ENDPOINTS.WASTE.ALL);
            setRequests(res.data);
        } catch (err) {
            console.error('Error fetching requests:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await api.put(`${API_ENDPOINTS.WASTE.BY_ID}/${id}`, { status: newStatus });
            // Optimistic update
            setRequests(requests.map(req =>
                req._id === id ? { ...req, status: newStatus } : req
            ));
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status');
            fetchRequests(); // Revert on failure
        }
    };

    const filteredRequests = requests.filter(req => {
        if (filter === 'all') return true;
        return req.status === filter;
    });

    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Waste Pickup Requests</h1>
                    <p className="text-text-muted">Manage environmental waste collection services.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-white p-1 rounded-xl shadow-sm border border-border">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-off-white text-text-main shadow-sm' : 'text-text-muted hover:bg-gray-50'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === 'pending' ? 'bg-yellow-50 text-yellow-700 shadow-sm' : 'text-text-muted hover:bg-gray-50'}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === 'completed' ? 'bg-green-50 text-green-700 shadow-sm' : 'text-text-muted hover:bg-gray-50'}`}
                        >
                            Completed
                        </button>
                    </div>
                    <button onClick={fetchRequests} className="p-2 bg-white border border-border rounded-xl hover:bg-off-white transition-colors shadow-sm text-text-muted">
                        <RefreshCw size={20} />
                    </button>
                </div>
            </header>

            <div className="bg-white rounded-[1.5rem] p-6 shadow-sm glass">
                {loading ? (
                    <div className="text-center py-20 text-text-muted">Loading requests...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">User</th>
                                    <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">Requested Time</th>
                                    <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">Bin Level</th>
                                    <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">Status</th>
                                    <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((req) => (
                                    <tr key={req._id} className="hover:bg-off-white/50 transition-colors">
                                        <td className="p-4 border-b border-border">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">
                                                    {req.user?.username?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <span className="text-sm font-medium">{req.user?.username || 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-border text-sm text-text-muted">
                                            {new Date(req.date).toLocaleString()}
                                        </td>
                                        <td className="p-4 border-b border-border">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                        className={`h-1.5 rounded-full ${req.binLevel > 75 ? 'bg-red-500' : req.binLevel > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                        style={{ width: `${req.binLevel}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-medium">{req.binLevel}%</span>
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-border">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${req.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {req.status === 'completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="p-4 border-b border-border">
                                            {req.status === 'pending' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(req._id, 'completed')}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-primary-teal text-white rounded-lg text-xs font-medium hover:bg-teal-700 transition-colors shadow-sm"
                                                >
                                                    <CheckCircle size={14} />
                                                    Mark Done
                                                </button>
                                            )}
                                            {req.status === 'completed' && (
                                                <button
                                                    disabled
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-400 rounded-lg text-xs font-medium cursor-not-allowed"
                                                >
                                                    Completed
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminWaste;
