// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminActions = () => {
//   const [actions, setActions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchFlagged = async () => {
//     try {
//       const res = await axios.get("/api/actions/flagged");
//       setActions(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Delete this action?");
//     if (!confirm) return;

//     await axios.delete(`/api/actions/${id}`);
//     setActions(actions.filter((a) => a._id !== id));
//   };

//   useEffect(() => {
//     fetchFlagged();
//   }, []);

//   if (loading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h1 className="text-2xl font-bold mb-6">🚩 Flagged Actions</h1>

//       {actions.length === 0 ? (
//         <p>No flagged actions</p>
//       ) : (
//         <div className="space-y-4">
//           {actions.map((action) => (
//             <div
//               key={action._id}
//               className="bg-white rounded-xl shadow p-5 border"
//             >
//               {/* HEADER */}
//               <div className="flex justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold">
//                     {action.title}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     by {action.createdBy?.username}
//                   </p>
//                 </div>

//                 {/* REPORT COUNT */}
//                 <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
//                   🚨 {action.reports.length} Reports
//                 </div>
//               </div>

//               {/* DESCRIPTION */}
//               <p className="mt-2 text-gray-700">
//                 {action.description}
//               </p>

//               {/* IMAGES */}
//               {action.images?.length > 0 && (
//                 <img
//                   src={action.images[0]}
//                   className="mt-3 w-full h-60 object-cover rounded-lg"
//                 />
//               )}

//               {/* REPORT DETAILS */}
//               <div className="mt-4">
//                 <h3 className="font-semibold text-gray-800 mb-2">
//                   Report Reasons:
//                 </h3>

//                 <div className="space-y-2">
//                   {action.reports.map((r, index) => (
//                     <div
//                       key={index}
//                       className="bg-gray-100 p-2 rounded"
//                     >
//                       <span className="font-semibold">
//                         {r.user?.username || "User"}:
//                       </span>{" "}
//                       {r.reason}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* ACTION BUTTON */}
//               <div className="mt-4 flex justify-end">
//                 <button
//                   onClick={() => handleDelete(action._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                 >
//                   Delete Action
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminActions;

import { useEffect, useState } from "react";
import {
  getFlaggedActions,
  deleteAction,
} from "../services/actionService"; // adjust path if needed

const AdminActions = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlagged = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getFlaggedActions(token);

      console.log("FLAGGED:", data);

      setActions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setActions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this action?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      await deleteAction(id, token);

      setActions((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchFlagged();
  }, []);

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
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
  );
};

export default AdminActions;