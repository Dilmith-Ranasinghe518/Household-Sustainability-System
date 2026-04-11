import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { likeAction, reportAction, unlikeAction } from "../../services/actionService";
import ActionComments from "./ActionComments";
import ActionEditModal from "./ActionEditModal";
import ActionImageGrid from "./ActionImageGrid";
import ImagePreviewModal from "./ImagePreviewModal";
import { Heart, MessageCircle, AlertTriangle  } from "lucide-react";
import { toast } from "react-toastify";

const getUserId = (value) => value?._id || value?.id || value || "";

const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
};

const categoryStyleMap = {
  "Waste Reduction": "bg-lime-100 text-lime-700",
  "Energy Efficiency": "bg-yellow-100 text-yellow-700",
  "Water Conservation": "bg-sky-100 text-sky-700",
  "Sustainable DIY": "bg-violet-100 text-violet-700",
  "Eco Shopping": "bg-pink-100 text-pink-700",
  "Community Action": "bg-emerald-100 text-emerald-700",
};

const ActionCard = ({
  action,
  currentUser,
  token,
  onUpdateSingle,
  onDelete,
  onSaveEdit,
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [liking, setLiking] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

const [reportOpen, setReportOpen] = useState(false);
const [reportReason, setReportReason] = useState("");
const [deleteOpen, setDeleteOpen] = useState(false);

  const currentUserId = getUserId(currentUser);
  const createdById = getUserId(action.createdBy);

  const isOwner = String(createdById) === String(currentUserId);

  const isLiked = useMemo(() => {
    return (action.likes || []).some(
      (like) => String(getUserId(like.user)) === String(currentUserId)
    );
  }, [action.likes, currentUserId]);

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      setLiking(true);
      const updated = isLiked
        ? await unlikeAction(action._id, token)
        : await likeAction(action._id, token);

      onUpdateSingle(updated);
    } catch (err) {
      alert(err?.response?.data?.msg || "Failed to update like");
    } finally {
      setLiking(false);
    }
  };

  // const handleReport = async () => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //     return;
  //   }
  //   const reason = window.prompt("Enter report reason:");
  //   if (!reason || !reason.trim()) return;
  // const handleReport = async () => {
  //   const reason = window.prompt("Enter report reason:");
  //   if (!reason || !reason.trim()) return;

  //   try {
  //     setReporting(true);
  //     await reportAction(action._id, reason.trim(), token);
  //     alert("Reported successfully");
  //   } catch (err) {
  //     alert(err?.response?.data?.msg || "Failed to report");
  //   } finally {
  //     setReporting(false);
  //   }
  // };

  const handleReport = () => {
  setReportOpen(true);
};

const submitReport = async () => {
  if (!reportReason.trim()) return;

  try {
    setReporting(true);
    await reportAction(action._id, reportReason.trim(), token);
    setReportOpen(false);
    setReportReason("");
    
    toast.success("Reported successfully");
  } catch (err) {
    alert(err?.response?.data?.msg || "Failed to report");
  } finally {
    setReporting(false);
  }
};

  // const handleDelete = async () => {
  //   const ok = window.confirm("Are you sure you want to delete this action?");
  //   if (!ok) return;
  //   await onDelete(action._id);
  // };

  const handleDelete = () => {
  setDeleteOpen(true);
};

const confirmDelete = async () => {
  await onDelete(action._id);
  setDeleteOpen(false);

  toast.success("Action deleted successfully");
};

  return (
    <>
      <article className="overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-sm backdrop-blur">
        <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-5">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                {(action?.createdBy?.username || "U").slice(0, 1).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {action?.createdBy?.username || "User"}
                </p>
                <p className="text-xs text-slate-500">{timeAgo(action.createdAt)}</p>
              </div>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              categoryStyleMap[action.category] || "bg-slate-100 text-slate-700"
            }`}
          >
            {action.category}
          </span>
        </div>

        <div className="px-5 pb-4">
          <h3 className="text-lg font-bold leading-7 text-slate-800">{action.title}</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {action.description}
          </p>
        </div>

        {!!action.images?.length && (
          <div className="px-5 pb-4">
            <ActionImageGrid
            images={action.images}
            onImageClick={(index) => {
              setSelectedIndex(index);
              setShowModal(true);
            }}
          />
          </div>

          
        )}

        <div className="flex flex-wrap items-center gap-3 px-5 pb-4 text-sm text-slate-500">
          <div className="rounded-full bg-emerald-50 px-3 py-1.5 font-medium text-emerald-700">
            🌿 Eco Score: {action.environmentalScore ?? 0}
          </div>
          <div className="relative group">
          <div className="rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-700 cursor-pointer">
            💬 Engagement: {action.engagementScore ?? 0}
          </div>

          {/* TOOLTIP */}
          <div className="absolute left-0 mt-2 hidden w-60 rounded-lg bg-slate-800 p-3 text-xs text-white shadow-lg group-hover:block z-10">
            <p>❤️ Likes: {action.likes?.length || 0} × 2 = {(action.likes?.length || 0) * 2} </p>
            <p>💬 Comments: {action.comments?.length || 0} × 3 = {(action.comments?.length || 0) * 3} </p>
            <hr className="my-1 border-slate-600" />
            <p className="font-semibold">
              💬 Total = (Likes × 2) + (Comments × 3)
            </p>
          </div>
        </div>
          <div className="relative group">
          <div className="rounded-full bg-amber-50 px-3 py-1.5 font-medium text-amber-700 cursor-pointer">
            ⚡ Total: {action.totalScore ?? 0}
          </div>

          {/* TOOLTIP */}
          <div className="absolute left-0 mt-2 hidden w-56 rounded-lg bg-slate-800 p-3 text-xs text-white shadow-lg group-hover:block z-10">
            <p>🌿 Eco Score: {action.environmentalScore ?? 0}</p>
            <p>💬 Engagement: {action.engagementScore ?? 0}</p>
            <hr className="my-1 border-slate-600" />
            <p className="font-semibold">
              ⚡ Total = Eco + Engagement
            </p>
          </div>
        </div>
        </div>

        <div className="flex items-center justify-between border-t border-b border-slate-100 px-5 py-3 text-sm text-slate-600">
          <div className="font-medium">{action.likes?.length || 0} likes</div>
          <div className="font-medium">{action.comments?.length || 0} comments</div>
        </div>

        <div className="grid grid-cols-2 gap-2 px-5 py-3 sm:grid-cols-4">
          <button
            onClick={handleLikeToggle}
            disabled={liking}
            className="flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 transition active:scale-90"
            >
            <Heart
                size={22}
                className={`transition-all duration-200 ${
                isLiked
                    ? "fill-red-500 text-red-500 scale-125"
                    : "text-gray-400 hover:text-red-400"
                }`}
            />

            <span className="text-sm font-semibold text-slate-700">
                {action.likes?.length || 0}
            </span>
            </button>

            <button
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login");
                return;
              }
              setShowComments(!showComments);
            }}
            className="flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 transition active:scale-90 bg-slate-100 hover:bg-slate-200"
            >
            <MessageCircle size={20} className="text-gray-600" />
            <span className="text-sm font-semibold text-slate-700">
                {action.comments?.length || 0}
            </span>
            </button>

          {!isOwner && (
            <button
              onClick={handleReport}
              title="Report"
              className="flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 transition active:scale-90 bg-slate-100 hover:bg-slate-200"
            >
              <AlertTriangle size={20} strokeWidth={2} className="text-slate-500" />
            </button>
          )}
          
          {isOwner ? (
            <>
              <button
                onClick={() => setEditOpen(true)}
                className="rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="rounded-2xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <div />
              <div />
            </>
          )}
        </div>

        {showComments && (
            <div className="px-5 pb-5">
                <ActionComments
                action={action}
                currentUser={currentUser}
                token={token}
                onUpdateSingle={onUpdateSingle}
                />
            </div>
            )}
      </article>

      <ActionEditModal
        open={editOpen}
        action={action}
        onClose={() => setEditOpen(false)}
        onSave={onSaveEdit}
      />

      {showModal && (
        <ImagePreviewModal
          images={action.images}
          startIndex={selectedIndex}
          onClose={() => setShowModal(false)}
        />
      )}

      {reportOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="mb-3 text-lg font-semibold">Report Action</h2>

      <input
        value={reportReason}
        onChange={(e) => setReportReason(e.target.value)}
        placeholder="Enter reason..."
        className="w-full rounded-xl border px-4 py-2 outline-none"
      />

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => setReportOpen(false)}
          className="rounded-xl bg-gray-200 px-4 py-2"
        >
          Cancel
        </button>

        <button
          onClick={submitReport}
          className="rounded-xl bg-red-500 px-4 py-2 text-white"
        >
          Report
        </button>
      </div>
    </div>
  </div>
)}

{deleteOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="text-lg font-semibold">Delete Action</h2>

      <p className="mt-2 text-sm text-gray-600">
        Are you sure you want to delete this action?
      </p>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => setDeleteOpen(false)}
          className="rounded-xl bg-gray-200 px-4 py-2"
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          className="rounded-xl bg-red-500 px-4 py-2 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default ActionCard;
