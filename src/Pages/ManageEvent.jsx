import { useContext, useEffect, useState } from "react";
import { FaCalendarAlt, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authantication/Context/AuthContext";

const ManageEvent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const { UserData, theme } = useContext(AuthContext); // <-- get theme from context

  useEffect(() => {
    if (UserData?.email) {
      fetch(`http://localhost:3000/addEvent?email=${UserData?.email}`,{
        credentials :"include"
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.result) {
            setData(data.result);
            setError("");
          } else {
            setError("No events found.");
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch events.");
          setLoading(false);
        });
    }
  }, [UserData?.email]);

  // Optional: Delete event handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`http://localhost:3000/addEvent/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result?.deletedCount) {
        setData((prev) => prev.filter((e) => e._id !== id));
        setToast({ type: "success", msg: "Event deleted successfully!" });
      } else {
        setToast({ type: "error", msg: "Failed to delete event." });
      }
    } catch {
      setToast({ type: "error", msg: "Failed to delete event." });
    }
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className={`pt-20 min-h-screen relative transition-colors duration-300
      ${theme === "dark"
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        : "bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100"
      }`
    }>
      
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg font-semibold text-white transition-all
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <h2 className={`text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text drop-shadow-lg tracking-tight
          ${theme === "dark"
            ? "bg-gradient-to-r from-yellow-200 via-pink-400 to-purple-300"
            : "bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-600"
          }`
        }>
          <FaCalendarAlt className="inline-block mr-2 mb-1" /> Manage Your Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <div className={`col-span-full text-center text-lg animate-pulse
              ${theme === "dark" ? "text-gray-400" : "text-gray-400"}`}>
              Loading events...
            </div>
          ) : error ? (
            <div className={`col-span-full text-center text-lg
              ${theme === "dark" ? "text-red-400" : "text-red-500"}`}>
              {error}
            </div>
          ) : data.length === 0 ? (
            <div className={`col-span-full text-center text-lg
              ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
              No events found.
            </div>
          ) : (
            data.map((event) => (
              <div
                key={event._id}
                className={`relative rounded-3xl shadow-2xl border transition-all duration-300 p-7 flex flex-col group overflow-hidden
                  ${theme === "dark"
                    ? "bg-gray-800/80 border-gray-700 hover:shadow-yellow-200"
                    : "bg-white/80 backdrop-blur-md border-purple-200 hover:shadow-purple-300"
                  }`
                }
              >
                <div className="absolute -top-8 -right-8 opacity-10 text-[8rem] pointer-events-none select-none">
                  <FaCalendarAlt />
                </div>
                <h3 className={`text-2xl font-bold mb-3 group-hover:text-pink-600 transition-colors
                  ${theme === "dark" ? "text-yellow-200" : "text-purple-800"}`}>
                  {event?.title || "Untitled Event"}
                </h3>
                <p className={`mb-5 line-clamp-4
                  ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {event?.description || "No description provided."}
                </p>
                <div className="flex-1" />
                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/update/${event._id}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold shadow transition-colors focus:outline-none focus:ring-2
                      ${theme === "dark"
                        ? "bg-gradient-to-r from-yellow-500 to-pink-500 text-gray-900 hover:from-pink-500 hover:to-yellow-500 focus:ring-yellow-300"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 focus:ring-purple-300"
                      }`
                    }
                  >
                    <FaEdit /> Update
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold shadow transition-colors focus:outline-none focus:ring-2
                      ${theme === "dark"
                        ? "bg-gradient-to-r from-red-600 to-pink-500 text-white hover:from-pink-400 hover:to-red-700 focus:ring-red-300"
                        : "bg-gradient-to-r from-red-500 to-pink-400 text-white hover:from-pink-400 hover:to-red-500 focus:ring-red-300"
                      }`
                    }
                    title="Delete Event"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEvent;

