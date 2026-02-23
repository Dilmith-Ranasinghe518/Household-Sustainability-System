import React from "react";
import { Link } from "react-router-dom";
import { StatusBadge, PriorityBadge } from "./IssueBadge";

const IssueCard = ({ item }) => {
  return (
    <Link
      to={`/issues/${item._id}`}
      className="block bg-white rounded-2xl p-5 shadow-sm glass border border-border hover:bg-off-white transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-sm text-text-muted">{item.category}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <StatusBadge status={item.status} />
          <PriorityBadge priority={item.priority} />
        </div>
      </div>

      <div className="mt-3 text-xs text-text-muted">
        Created: {new Date(item.createdAt).toLocaleString()}
      </div>

      {item.messages?.length > 0 && (
        <p className="mt-3 text-sm text-text-main line-clamp-2">
          <span className="font-semibold">Last message: </span>
          {item.messages[item.messages.length - 1].text}
        </p>
      )}
    </Link>
  );
};

export default IssueCard;