import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { API_ENDPOINTS } from "../config/apiConfig";
import MessageThread from "../components/issues/MessageThread";
import { StatusBadge, PriorityBadge } from "../components/issues/IssueBadge";

const IssueDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const fetchOne = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${API_ENDPOINTS.ISSUES.BY_ID}/${id}`);
      setTicket(res.data);
    } catch (e) {
      console.error(e);
      alert("Failed to load ticket");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOne();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    setSending(true);
    try {
      const res = await api.post(`${API_ENDPOINTS.ISSUES.MESSAGES}/${id}/messages`, { text });
      setTicket(res.data);
      setText("");
    } catch (e) {
      console.error(e);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-text-muted">Loading...</div>;
  if (!ticket) return <div className="text-center py-10 text-text-muted">Ticket not found.</div>;

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="bg-white rounded-2xl p-6 shadow-sm glass border border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{ticket.title}</h1>
            <p className="text-sm text-text-muted mt-1">{ticket.category}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-text-main">
          <div className="text-text-muted">
            Created: <span className="text-text-main font-medium">{new Date(ticket.createdAt).toLocaleString()}</span>
          </div>
          <div className="text-text-muted">
            Updated: <span className="text-text-main font-medium">{new Date(ticket.updatedAt).toLocaleString()}</span>
          </div>

          {(ticket.periodFrom || ticket.periodTo) && (
            <div className="md:col-span-2 text-text-muted">
              Period:{" "}
              <span className="text-text-main font-medium">
                {ticket.periodFrom ? new Date(ticket.periodFrom).toLocaleDateString() : "—"} to{" "}
                {ticket.periodTo ? new Date(ticket.periodTo).toLocaleDateString() : "—"}
              </span>
            </div>
          )}

          {(ticket.monthlyBillLKR || ticket.monthlyKwh) && (
            <div className="md:col-span-2 text-text-muted">
              Provided:{" "}
              <span className="text-text-main font-medium">
                {ticket.monthlyBillLKR ? `LKR ${ticket.monthlyBillLKR}` : "—"} |{" "}
                {ticket.monthlyKwh ? `${ticket.monthlyKwh} kWh` : "—"}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm glass border border-border">
        <h2 className="text-lg font-semibold mb-4">Conversation</h2>
        <MessageThread messages={ticket.messages || []} />

        <div className="mt-5 flex flex-col gap-3">
          <textarea
            className="w-full px-3 py-2 border border-border rounded-xl outline-none min-h-[90px]"
            placeholder="Add a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              disabled={sending}
              onClick={sendMessage}
              className="px-5 py-2 rounded-xl bg-primary-teal text-white font-semibold hover:opacity-95"
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;