import { useContext, useEffect, useState } from "react";
import { FaCalendarAlt, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Authantication/Context/AuthContext";

const ManageEvent = () => {
  const BASE_URL = import.meta.env.VITE_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const { UserData } = useContext(AuthContext);

  const fetchData = () => {
    if (!UserData?.email) return;

    setLoading(true);
    fetch(`${BASE_URL}/addEvent?email=${UserData.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.result) {
          setData(data.result);
          setError("");
        } else {
          setError("No events found.");
          setData([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch events.");
        setData([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [UserData?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${BASE_URL}/addEvent/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result?.deletedCount) {
        // ✅ Remove from UI
        setData((prev) => prev.filter((e) => e._id !== id));
        setToast({ type: "success", msg: "Event deleted successfully!" });
        Swal.fire("Deleted!", "Your event has been deleted.", "success");
      } else {
        setToast({ type: "error", msg: "Failed to delete event." });
        Swal.fire("Failed!", "Failed to delete event.", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setToast({ type: "error", msg: "Failed to delete event." });
      Swal.fire("Failed!", "Failed to delete event.", "error");
    }

    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg font-semibold text-white transition-all ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text drop-shadow-lg tracking-tight bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-600 dark:from-yellow-200 dark:via-pink-400 dark:to-purple-300">
          <FaCalendarAlt className="inline-block mr-2 mb-1" /> Manage Your Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <div className="col-span-full text-center text-lg text-gray-400 animate-pulse">
              Loading events...
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-lg text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : data.length === 0 ? (
            <div className="col-span-full text-center text-lg text-gray-500">
              No events found.
            </div>
          ) : (
            data.map((event) => (
              <div
                key={event._id}
                className="relative p-7 rounded-3xl shadow-2xl border bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-purple-200 dark:border-gray-700 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute -top-8 -right-8 opacity-10 text-[8rem] pointer-events-none select-none">
                  <FaCalendarAlt />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-pink-600 text-purple-800 dark:text-yellow-200 transition-colors">
                  {event?.title || "Untitled Event"}
                </h3>
                <p className="mb-5 line-clamp-4 text-gray-600 dark:text-gray-300">
                  {event?.description || "No description provided."}
                </p>
                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/update/${event._id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold shadow focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 dark:from-yellow-500 dark:to-pink-500 dark:text-gray-900 dark:hover:from-pink-500 dark:hover:to-yellow-500 dark:focus:ring-yellow-300"
                  >
                    <FaEdit /> Update
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    title="Delete Event"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold shadow focus:outline-none focus:ring-2 focus:ring-red-300 bg-gradient-to-r from-red-500 to-pink-400 text-white hover:from-pink-400 hover:to-red-500 dark:from-red-600 dark:to-pink-500 dark:hover:from-pink-400 dark:hover:to-red-700 dark:focus:ring-red-300"
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
