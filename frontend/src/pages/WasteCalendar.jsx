import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, MapPin, Trash2, Plus, Clock, Filter, ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/apiConfig';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../utils/roles';

const WasteCalendar = () => {
    const { user } = useAuth();
    const canModify = user?.role === ROLES.ADMIN || user?.role === ROLES.COLLECTOR;

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        type: 'General',
        area: ''
    });

    const types = ['General', 'Recyclable', 'Organic', 'Hazardous', 'E-Waste', 'Other'];

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await api.get(API_ENDPOINTS.WASTE.CALENDAR);
            setEvents(res.data);
        } catch (err) {
            console.error('Error fetching calendar events:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleOpenModal = (event = null) => {
        if (event) {
            setEditingEvent(event);
            setFormData({
                title: event.title,
                description: event.description || '',
                date: new Date(event.date).toISOString().split('T')[0],
                type: event.type,
                area: event.area
            });
        } else {
            setEditingEvent(null);
            setFormData({
                title: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                type: 'General',
                area: ''
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await api.put(`${API_ENDPOINTS.WASTE.CALENDAR}/${editingEvent._id}`, formData);
            } else {
                await api.post(API_ENDPOINTS.WASTE.CALENDAR, formData);
            }
            fetchEvents();
            setShowModal(false);
        } catch (err) {
            console.error('Error saving event:', err);
            alert('Failed to save event');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await api.delete(`${API_ENDPOINTS.WASTE.CALENDAR}/${id}`);
            fetchEvents();
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    };

    // Calendar logic
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const days = [];
        const totalDays = daysInMonth(year, month);
        const firstDay = firstDayOfMonth(year, month);

        // Prev month padding
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 border-b border-r border-border bg-off-white/20"></div>);
        }

        // Current month days
        for (let d = 1; d <= totalDays; d++) {
            const dateStr = new Date(year, month, d).toISOString().split('T')[0];
            const dayEvents = events.filter(e => new Date(e.date).toISOString().split('T')[0] === dateStr);
            const isToday = new Date().toISOString().split('T')[0] === dateStr;

            days.push(
                <div key={d} className={`h-32 border-b border-r border-border p-2 overflow-y-auto transition-colors hover:bg-off-white/30 ${isToday ? 'bg-primary-teal/5' : ''}`}>
                    <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm font-bold ${isToday ? 'bg-primary-teal text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-text-muted'}`}>{d}</span>
                    </div>
                    <div className="space-y-1">
                        {dayEvents.map(event => (
                            <div
                                key={event._id}
                                onClick={() => handleOpenModal(event)}
                                className={`text-[10px] p-1 rounded border cursor-pointer truncate ${event.type === 'Organic' ? 'bg-green-100 border-green-200 text-green-700' :
                                    event.type === 'Recyclable' ? 'bg-blue-100 border-blue-200 text-blue-700' :
                                        event.type === 'Hazardous' ? 'bg-red-100 border-red-200 text-red-700' :
                                            event.type === 'E-Waste' ? 'bg-purple-100 border-purple-200 text-purple-700' :
                                                'bg-gray-100 border-gray-200 text-gray-700'
                                    }`}
                                title={`${event.title} - ${event.area}`}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return days;
    };

    const nextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    const prevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));

    return (
        <div className="flex flex-col gap-6">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Collection Calendar</h1>
                    <p className="text-text-muted">Stay updated with waste collection schedules in your area.</p>
                </div>
                {canModify && (
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-primary-teal text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-primary-teal/20 hover:-translate-y-0.5 transition-all"
                    >
                        <Plus size={20} /> Add Event
                    </button>
                )}
            </header>

            <div className="bg-white rounded-[2rem] shadow-sm glass border border-border overflow-hidden">
                <div className="p-6 flex justify-between items-center bg-forest-dark text-white">
                    <h2 className="text-xl font-bold font-heading">
                        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                        <button onClick={() => setCurrentDate(new Date())} className="px-3 text-sm font-bold hover:bg-white/10 rounded-lg transition-colors">Today</button>
                        <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div className="grid grid-cols-7 bg-off-white text-text-muted text-[10px] font-bold uppercase tracking-wider text-center py-2 border-b border-border">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
                </div>

                <div className="grid grid-cols-7">
                    {renderCalendar()}
                </div>
            </div>

            {/* Event Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2rem] w-full max-w-lg p-8 shadow-2xl border border-border"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold">
                                    {editingEvent ? (canModify ? 'Edit Event' : 'Event Details') : 'Add Collection Event'}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-red-500 text-2xl">×</button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1 text-forest-dark">Title</label>
                                    <input
                                        type="text"
                                        required
                                        disabled={!canModify}
                                        className="w-full p-3 bg-off-white rounded-xl border border-border focus:ring-2 focus:ring-primary-teal/20 disabled:opacity-70"
                                        placeholder="e.g., Plastic Collection"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1 text-forest-dark">Date</label>
                                        <input
                                            type="date"
                                            required
                                            disabled={!canModify}
                                            className="w-full p-3 bg-off-white rounded-xl border border-border focus:ring-2 focus:ring-primary-teal/20 disabled:opacity-70"
                                            value={formData.date}
                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1 text-forest-dark">Type</label>
                                        <select
                                            disabled={!canModify}
                                            className="w-full p-3 bg-off-white rounded-xl border border-border focus:ring-2 focus:ring-primary-teal/20 disabled:opacity-70"
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            {types.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1 text-forest-dark">Area/Location</label>
                                    <input
                                        type="text"
                                        required
                                        disabled={!canModify}
                                        className="w-full p-3 bg-off-white rounded-xl border border-border focus:ring-2 focus:ring-primary-teal/20 disabled:opacity-70"
                                        placeholder="e.g., Sector 7"
                                        value={formData.area}
                                        onChange={e => setFormData({ ...formData, area: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1 text-forest-dark">Description</label>
                                    <textarea
                                        disabled={!canModify}
                                        className="w-full p-3 bg-off-white rounded-xl border border-border focus:ring-2 focus:ring-primary-teal/20 h-24 disabled:opacity-70"
                                        placeholder="Additional details..."
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                </div>

                                {canModify && (
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-primary-teal text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition-all"
                                        >
                                            {editingEvent ? 'Update' : 'Create'} Event
                                        </button>
                                        {editingEvent && (
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(editingEvent._id)}
                                                className="bg-red-50 text-red-600 px-4 rounded-xl hover:bg-red-100 transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WasteCalendar;
