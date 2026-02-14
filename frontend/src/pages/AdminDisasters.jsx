import React, { useEffect, useMemo, useState } from "react";
import { Plus, RefreshCw, Search } from "lucide-react";
import api from "../services/api";
import { API_ENDPOINTS } from "../config/apiConfig";
import DisasterTable from "../components/disasters/DisasterTable";
import DisasterFormModal from "../components/disasters/DisasterFormModal";

const AdminDisasters = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("");

  const types = ["Flood","Fire","Earthquake","Landslide","Storm","Drought","Tsunami","Other"];
  const statuses = ["active","monitoring","resolved"];
  const severities = ["low","medium","high","critical"];

  const fetchDisasters = async () => {
    setLoading(true);
    try {
      const params = {};
      if (type) params.type = type;
      if (status) params.status = status;
      if (severity) params.severity = severity;
      if (search) params.search = search;

      const res = await api.get(API_ENDPOINTS.DISASTERS, { params });
      setDisasters(res.data || []);
    } catch (e) {
      console.error("Fetch disasters failed:", e);
      alert("Failed to load disasters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisasters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreate = () => {
    setEditing(null);
    setOpenModal(true);
  };

  const onEdit = (row) => {
    setEditing(row);
    setOpenModal(true);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this disaster?")) return;
    try {
      await api.delete(`${API_ENDPOINTS.DISASTERS}/${id}`);
      setDisasters((prev) => prev.filter((d) => d._id !== id));
    } catch (e) {
      console.error("Delete failed:", e);
      alert("Failed to delete");
    }
  };

  const onSubmit = async (payload) => {
    try {
      if (editing?._id) {
        const res = await api.put(`${API_ENDPOINTS.DISASTERS}/${editing._id}`, payload);
        setDisasters((prev) => prev.map((d) => (d._id === editing._id ? res.data : d)));
      } else {
        const res = await api.post(API_ENDPOINTS.DISASTERS, payload);
        setDisasters((prev) => [res.data, ...prev]);
      }
      setOpenModal(false);
      setEditing(null);
    } catch (e) {
      console.error("Save failed:", e);
      alert("Failed to save");
    }
  };

  const filteredCount = useMemo(() => disasters.length, [disasters]);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Disaster Management</h1>
          <p className="text-text-muted">Create, update and track disaster alerts (admin only).</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={fetchDisasters}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl font-medium text-sm shadow-sm hover:bg-off-white"
          >
            <RefreshCw size={16} /> Refresh
          </button>

          <button
            onClick={onCreate}
            className="flex items-center gap-2 px-4 py-2 bg-primary-teal text-white rounded-xl font-semibold text-sm shadow-sm hover:opacity-95"
          >
            <Plus size={16} /> New Disaster
          </button>
        </div>
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
          <button
            onClick={fetchDisasters}
            className="text-sm font-semibold text-primary-teal"
          >
            Apply
          </button>
        </div>

        <select className="px-3 py-2 border border-border rounded-xl text-sm" value={type} onChange={(e)=>setType(e.target.value)}>
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select className="px-3 py-2 border border-border rounded-xl text-sm" value={severity} onChange={(e)=>setSeverity(e.target.value)}>
          <option value="">All Severities</option>
          {severities.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select className="px-3 py-2 border border-border rounded-xl text-sm" value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="">All Status</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <button
          onClick={fetchDisasters}
          className="px-4 py-2 bg-off-white border border-border rounded-xl font-medium text-sm hover:bg-gray-100"
        >
          Apply Filters ({filteredCount})
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-4 shadow-sm glass">
        {loading ? (
          <div className="text-center py-10 text-text-muted">Loading disasters...</div>
        ) : (
          <DisasterTable
            rows={disasters}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </div>

      <DisasterFormModal
        open={openModal}
        onClose={() => { setOpenModal(false); setEditing(null); }}
        onSubmit={onSubmit}
        initial={editing}
      />
    </div>
  );
};

export default AdminDisasters;
