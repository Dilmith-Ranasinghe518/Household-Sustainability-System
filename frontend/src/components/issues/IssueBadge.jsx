import React from "react";

export const StatusBadge = ({ status }) => {
  const base = "px-2.5 py-1 rounded-lg text-xs font-semibold";

  const map = {
    new: "bg-blue-100 text-blue-800",
    need_more_info: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-orange-100 text-orange-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-700",
  };

  return <span className={`${base} ${map[status] || "bg-gray-100 text-gray-700"}`}>{status}</span>;
};

export const PriorityBadge = ({ priority }) => {
  const base = "px-2.5 py-1 rounded-lg text-xs font-semibold";

  const map = {
    low: "bg-gray-100 text-gray-700",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-700",
  };

  return <span className={`${base} ${map[priority] || "bg-gray-100 text-gray-700"}`}>{priority}</span>;
};