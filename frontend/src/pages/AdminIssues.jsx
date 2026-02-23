import React, { useEffect, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import api from "../services/api";
import { API_ENDPOINTS } from "../config/apiConfig";
import { StatusBadge, PriorityBadge } from "../components/issues/IssueBadge";
import MessageThread from "../components/issues/MessageThread";

const AdminIssues = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [reply, setReply] = useState("");
  const [saving, setSaving] = useState(false);

  const statuses = ["new", "need_more_info", "in_progress", "resolved", "closed"];
  const priorities = ["low", "medium", "high"];

  const fetchAll = async () => {
    setLoading(true);
    try {
      const params = {};
      if (status) params.status = status;
      if (priority) params.priority = priority;
      if (search) params.search = search;

      const res = await api.get(API_ENDPOINTS.ISSUES.BASE, { params });
      setItems(res.data || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load issues (admin)");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openTicket = async (id) => {
    try {
      const res = await api.get(`${API_ENDPOINTS.ISSUES.BY_ID}/${id}`);
      setSelected(res.data);
      setReply("");
    } catch (e) {
      console.error(e);
      alert("Failed to load ticket");
    }
  };

  const updateMeta = async (field, value) => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await api.put(`${API_ENDPOINTS.ISSUES.BY_ID}/${selected._id}`, { [field]: value });
      setSelected(res.data);
      setItems((prev) => prev.map((t) => (t._id === selected._id ? res.data : t)));
    } catch (e) {
      console.error(e);
      alert("Failed to update ticket");
    } finally {
      setSaving(false);
    }
  };

  const sendReply = async () => {
    if (!selected || !reply.trim()) return;
    setSaving(true);
    try {
      const res = await api.post(`${API_ENDPOINTS.ISSUES.MESSAGES}/${selected._id}/messages`, { text: reply });
      setSelected(res.data);
      setItems((prev) => prev.map((t) => (t._id === selected._id ? res.data : t)));
      setReply("");
    } catch (e) {
      console.error(e);
      alert("Failed to send reply");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Manage Issues</h1>
          <p className="text-text-muted">Review user tickets and provide energy-saving advice.</p>
        </div>

        <button
          onClick={fetchAll}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl font-medium text-sm shadow-sm hover:bg-off-white"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </header>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm glass flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-xl bg-off-white flex-1">
          <Search size={18} className="text-text-muted" />
          <input
            className="w-full bg-transparent outline-none text-sm"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={fetchAll} className="text-sm font-semibold text-primary-teal">Apply</button>
        </div>

        <select className="px-3 py-2 border border-border rounded-xl text-sm" value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="">All Status</option>
          {["new","need_more_info","in_progress","resolved","closed"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select className="px-3 py-2 border border-border rounded-xl text-sm" value={priority} onChange={(e)=>setPriority(e.target.value)}>
          <option value="">All Priority</option>
          {["low","medium","high"].map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <button
          onClick={fetchAll}
          className="px-4 py-2 bg-off-white border border-border rounded-xl font-medium text-sm hover:bg-gray-100"
        >
          Apply Filters
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.3fr] gap-6">
        {/* LEFT: list */}
        <div className="bg-white rounded-2xl p-4 shadow-sm glass border border-border">
          <h3 className="text-lg font-semibold mb-4">Tickets</h3>

          {loading ? (
            <div className="text-center py-10 text-text-muted">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-text-muted">No tickets found.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((t) => (
                <button
                  key={t._id}
                  onClick={() => openTicket(t._id)}
                  className={`text-left p-4 rounded-xl border border-border hover:bg-off-white transition ${
                    selected?._id === t._id ? "bg-off-white" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <div className="font-semibold">{t.title}</div>
                      <div className="text-xs text-text-muted">{t.category}</div>
                      <div className="text-xs text-text-muted mt-1">
                        {t.createdBy?.username ? `By: ${t.createdBy.username}` : "By: user"}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <StatusBadge status={t.status} />
                      <PriorityBadge priority={t.priority} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: details */}
        <div className="bg-white rounded-2xl p-5 shadow-sm glass border border-border">
          {!selected ? (
            <div className="text-center py-16 text-text-muted">Select a ticket to view details.</div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold">{selected.title}</h3>
                  <p className="text-sm text-text-muted">{selected.category}</p>
                  <p className="text-xs text-text-muted mt-1">
                    Created: {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <select
                    className="px-3 py-2 border border-border rounded-xl text-sm"
                    value={selected.status}
                    onChange={(e) => updateMeta("status", e.target.value)}
                    disabled={saving}
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>

                  <select
                    className="px-3 py-2 border border-border rounded-xl text-sm"
                    value={selected.priority}
                    onChange={(e) => updateMeta("priority", e.target.value)}
                    disabled={saving}
                  >
                    {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <h4 className="text-md font-semibold mb-3">Conversation</h4>
              <MessageThread messages={selected.messages || []} />

              <div className="mt-5 flex flex-col gap-3">
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-xl outline-none min-h-[90px]"
                  placeholder="Write admin advice..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    disabled={saving}
                    onClick={sendReply}
                    className="px-5 py-2 rounded-xl bg-primary-teal text-white font-semibold hover:opacity-95"
                  >
                    {saving ? "Sending..." : "Send Advice"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminIssues;