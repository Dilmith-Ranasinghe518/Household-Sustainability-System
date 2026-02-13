import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/apiConfig';
import AuditForm from '../components/AuditForm';
import { useAuth } from '../context/AuthContext';

const UserAudits = () => {
    const { user } = useAuth();
    const [audits, setAudits] = useState([]);
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
    const [editingAudit, setEditingAudit] = useState(null);

    const fetchAudits = async () => {
        try {
            const res = await api.get(API_ENDPOINTS.AUDIT.BASE);
            setAudits(res.data);
        } catch (err) {
            console.error('Error fetching audits:', err);
        }
    };

    useEffect(() => {
        fetchAudits();
    }, []);

    const handleSaveAudit = async (formData) => {
        try {
            if (editingAudit) {
                await api.put(`${API_ENDPOINTS.AUDIT.BY_ID}/${editingAudit._id}`, formData);
            } else {
                await api.post(API_ENDPOINTS.AUDIT.BASE, formData);
            }
            fetchAudits();
            setIsAuditModalOpen(false);
            setEditingAudit(null);
        } catch (err) {
            console.error('Error saving audit:', err);
            alert('Failed to save audit');
        }
    };

    const handleDeleteAudit = async (id) => {
        if (window.confirm('Are you sure you want to delete this audit?')) {
            try {
                await api.delete(`${API_ENDPOINTS.AUDIT.BY_ID}/${id}`);
                fetchAudits();
            } catch (err) {
                console.error('Error deleting audit:', err);
                alert('Failed to delete audit');
            }
        }
    };

    const openNewAuditModal = () => {
        setEditingAudit(null);
        setIsAuditModalOpen(true);
    };

    const openEditAuditModal = (audit) => {
        setEditingAudit(audit);
        setIsAuditModalOpen(true);
    };

    return (
        <div className="flex min-h-screen bg-off-white">
            <Sidebar />
            <main className="flex-1 ml-[70px] md:ml-[260px] p-6 md:p-10 min-w-0 transition-all duration-300">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Audits</h1>
                        <p className="text-text-muted">Manage your sustainability audit history.</p>
                    </div>
                    <button
                        onClick={openNewAuditModal}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-teal text-white rounded-xl font-medium text-sm hover:bg-teal-700 transition-colors shadow-lg shadow-primary-teal/20"
                    >
                        <Plus size={18} />
                        New Audit
                    </button>
                </header>

                <section>
                    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm glass">
                        {audits.length === 0 ? (
                            <div className="text-center py-10 text-text-muted">
                                <p>You haven't performed any audits yet.</p>
                                <button onClick={openNewAuditModal} className="text-primary-teal font-semibold mt-2 hover:underline">Start your first audit</button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">Date</th>
                                            <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">Score</th>
                                            <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">Status</th>
                                            <th className="text-left p-4 border-b border-border text-text-muted font-semibold text-[13px] uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {audits.map((audit) => (
                                            <tr key={audit._id} className="hover:bg-off-white/50 transition-colors">
                                                <td className="p-4 border-b border-border text-sm font-medium text-text-main">
                                                    {new Date(audit.date).toLocaleDateString()}
                                                </td>
                                                <td className="p-4 border-b border-border">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${audit.score >= 80 ? 'bg-green-100 text-green-800' :
                                                            audit.score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                        }`}>
                                                        {audit.score} / 100
                                                    </span>
                                                </td>
                                                <td className="p-4 border-b border-border">
                                                    <span className="text-sm text-text-muted">Completed</span>
                                                </td>
                                                <td className="p-4 border-b border-border">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => openEditAuditModal(audit)}
                                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteAudit(audit._id)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>

                <AuditForm
                    isOpen={isAuditModalOpen}
                    onClose={() => setIsAuditModalOpen(false)}
                    onSubmit={handleSaveAudit}
                    initialData={editingAudit}
                />
            </main>
        </div>
    );
};

export default UserAudits;
