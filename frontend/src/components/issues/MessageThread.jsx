import React from "react";

const MessageThread = ({ messages = [] }) => {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((m) => {
        const isAdmin = m.senderRole === "admin";
        return (
          <div
            key={m._id || `${m.senderId}-${m.createdAt}`}
            className={`p-4 rounded-2xl border border-border ${
              isAdmin ? "bg-[#f3f4f6]" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-semibold ${isAdmin ? "text-purple-700" : "text-primary-teal"}`}>
                {isAdmin ? "Admin Advice" : "User"}
              </span>
              <span className="text-xs text-text-muted">{new Date(m.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-sm text-text-main whitespace-pre-wrap">{m.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MessageThread;