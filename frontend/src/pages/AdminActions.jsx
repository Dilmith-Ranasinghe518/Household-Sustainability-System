import { useEffect, useState } from "react";
import {
  getFlaggedActions,
  deleteAction,
} from "../services/actionService"; 
import { toast } from "react-toastify";

const AdminActions = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchFlagged = async () => {
  try {
    const token = localStorage.getItem("token");

    const data = await getFlaggedActions(token);

    console.log("FLAGGED:", data);

    setActions(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("FETCH ERROR:", err);

    toast.error(
      err?.response?.data?.msg || "Failed to load flagged actions ❌"
    );

    setActions([]);
  } finally {
    setLoading(false);
  }
};
  
const handleDelete = (id) => {
  setSelectedId(id);
  setDeleteOpen(true);
};

const confirmDelete = async () => {
  try {
    const token = localStorage.getItem("token");

    await deleteAction(selectedId, token);

    setActions((prev) =>
      prev.filter((a) => a._id !== selectedId)
    );

    toast.success("Action deleted successfully ✅");
  } catch (err) {
    console.error("DELETE ERROR:", err);

    toast.error(
      err?.response?.data?.msg || "Delete failed ❌"
    );
  } finally {
    setDeleteOpen(false);
    setSelectedId(null);
  }
};
  useEffect(() => {
    fetchFlagged();
  }, []);

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <>
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">
        🚩 Flagged Actions
      </h1>

      {actions.length === 0 ? (
        <p>No flagged actions</p>
      ) : (
        <div className="space-y-4">
          {actions.map((action) => (
            <div
              key={action._id}
              className="bg-white rounded-xl shadow p-5 border"
            >
              {/* HEADER */}
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {action.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    by{" "}
                    {action.createdBy?.username ||
                      "Unknown"}
                  </p>
                </div>

                {/* REPORT COUNT */}
                <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                  🚨 {action.reports?.length || 0} Reports
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-2 text-gray-700">
                {action.description}
              </p>

              {/* IMAGE */}
              {action.images?.length > 0 && (
                <img
                  src={action.images[0]}
                  alt="action"
                  className="mt-3 w-full h-60 object-cover rounded-lg"
                />
              )}

              {/* REPORT DETAILS */}
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Report Reasons:
                </h3>

                <div className="space-y-2">
                  {action.reports?.map((r, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-2 rounded"
                    >
                      <span className="font-semibold">
                        {r.user?.username || "User"}:
                      </span>{" "}
                      {r.reason}
                    </div>
                  ))}
                </div>
              </div>

              {/* DELETE BUTTON */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDelete(action._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete Action
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
        </div>

    {/* 🔥 DELETE MODAL HERE */}
    {deleteOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="text-lg font-semibold">
            Delete Action
          </h2>

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

export default AdminActions;