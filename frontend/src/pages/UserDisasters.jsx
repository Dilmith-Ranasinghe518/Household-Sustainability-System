import React, { useEffect, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import api from "../services/api";
import { API_ENDPOINTS } from "../config/apiConfig";
import DisasterCard from "../components/disasters/DisasterCard";

const UserDisasters = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const types = ["Flood","Fire","Earthquake","Landslide","Storm","Drought","Tsunami","Other"];
  const statuses = ["active","monitoring","resolved"];

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (type) params.type = type;
      if (status) params.status = status;
      if (search) params.search = search;

      const res = await api.get(API_ENDPOINTS.DISASTERS, { params });
      setItems(res.data || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load disasters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Disaster Alerts</h1>
          <p className="text-text-muted">
            Verified alerts created by administrators. Stay prepared and safe.
          </p>
        </div>

        <button
          onClick={fetchData}
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
            placeholder="Search alerts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={fetchData} className="text-sm font-semibold text-primary-teal">
            Apply
          </button>
        </div>

        <select className="px-3 py-2 border border-border rounded-xl text-sm" value={type} onChange={(e)=>setType(e.target.value)}>
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select className="px-3 py-2 border border-border rounded-xl text-sm" value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="">All Status</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <button
          onClick={fetchData}
          className="px-4 py-2 bg-off-white border border-border rounded-xl font-medium text-sm hover:bg-gray-100"
        >
          Apply Filters
        </button>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="text-center py-10 text-text-muted">Loading alerts...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-text-muted">No alerts found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map((d) => (
            <DisasterCard key={d._id} data={d} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDisasters;
