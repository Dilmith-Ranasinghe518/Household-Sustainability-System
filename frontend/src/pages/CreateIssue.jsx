import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { API_ENDPOINTS } from "../config/apiConfig";

const CreateIssue = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("High Bill");
  const [periodFrom, setPeriodFrom] = useState("");
  const [periodTo, setPeriodTo] = useState("");
  const [monthlyBillLKR, setMonthlyBillLKR] = useState("");
  const [monthlyKwh, setMonthlyKwh] = useState("");
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  const categories = [
    "High Bill",
    "Spike",
    "Appliance Usage",
    "Billing Confusion",
    "Savings Advice",
    "Other",
  ];

  const submit = async (e) => {
    e.preventDefault();

    if (!title || !text) {
      alert("Title and message are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title,
        category,
        text,
        periodFrom: periodFrom || null,
        periodTo: periodTo || null,
        monthlyBillLKR: monthlyBillLKR ? Number(monthlyBillLKR) : null,
        monthlyKwh: monthlyKwh ? Number(monthlyKwh) : null,
      };

      const res = await api.post(API_ENDPOINTS.ISSUES.BASE, payload);
      navigate(`/issues/${res.data._id}`);
    } catch (e2) {
      console.error(e2);
      alert("Failed to create issue");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Create Issue</h1>
      <p className="text-text-muted mb-6">
        Describe your power usage problem and get admin advice.
      </p>

      <form
        onSubmit={submit}
        className="bg-white rounded-2xl p-6 shadow-sm glass border border-border grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            className="w-full px-3 py-2 border border-border rounded-xl outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: Bill is high this month"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full px-3 py-2 border border-border rounded-xl"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Bill (LKR) (optional)
          </label>
          <input
            className="w-full px-3 py-2 border border-border rounded-xl outline-none"
            value={monthlyBillLKR}
            onChange={(e) => setMonthlyBillLKR(e.target.value)}
            placeholder="18500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly kWh (optional)
          </label>
          <input
            className="w-full px-3 py-2 border border-border rounded-xl outline-none"
            value={monthlyKwh}
            onChange={(e) => setMonthlyKwh(e.target.value)}
            placeholder="420"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From (optional)
          </label>
          <input
            className="w-full px-3 py-2 border border-border rounded-xl"
            type="date"
            value={periodFrom}
            onChange={(e) => setPeriodFrom(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To (optional)
          </label>
          <input
            className="w-full px-3 py-2 border border-border rounded-xl"
            type="date"
            value={periodTo}
            onChange={(e) => setPeriodTo(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message *
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-xl outline-none min-h-[140px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Explain what you noticed and what advice you need..."
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/issues")}
            className="px-4 py-2 rounded-xl border border-border hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            type="submit"
            className="px-5 py-2 rounded-xl bg-primary-teal text-white font-semibold hover:opacity-95"
          >
            {saving ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIssue;