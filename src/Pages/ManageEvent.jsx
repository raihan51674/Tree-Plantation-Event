import { useContext, useEffect, useState } from "react";
import { FaCalendarAlt, FaEdit, FaTrashAlt, FaTree, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Authantication/Context/AuthContext";

const ManageEvent = () => {
  const BASE_URL = import.meta.env.VITE_URL;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const { UserData } = useContext(AuthContext);

  const fetchEvents = () => {
    if (!UserData?.email) return;

    setLoading(true);
    fetch(`${BASE_URL}/addEvent?email=${UserData.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.result) {
          setEvents(data.result);
          setError("");
        } else {
          setError("No events found.");
          setEvents([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch events.");
        setEvents([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, [UserData?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Event?",
      text: "This will permanently remove the event",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2E7D32",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Delete",
      background: '#f8f9fa',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${BASE_URL}/addEvent/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result?.deletedCount) {
        setEvents((prev) => prev.filter((e) => e._id !== id));
        setToast({ type: "success", msg: "Event deleted successfully!" });
        Swal.fire({
          title: "Deleted!",
          text: "Your event has been removed.",
          icon: "success",
          confirmButtonColor: "#2E7D32",
        });
      } else {
        setToast({ type: "error", msg: "Failed to delete event." });
        Swal.fire("Error", "Failed to delete event.", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setToast({ type: "error", msg: "Failed to delete event." });
      Swal.fire("Error", "Failed to delete event.", "error");
    }

    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-[#E8F5E9] to-[#B2DFDB] dark:from-[#1B5E20] dark:to-[#004D40]">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg font-medium text-white transition-all ${
            toast.type === "success" ? "bg-[#2E7D32]" : "bg-red-500"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2E7D32] dark:text-[#81C784] mb-4">
            <FaCalendarAlt className="inline-block mr-3 mb-1" />
            Manage Your Events
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[#1B5E20] dark:text-[#C8E6C9]">
            View, edit, or delete your upcoming tree plantation events
          </p>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#2E7D32]/20 mb-4"></div>
              <div className="h-6 w-48 bg-[#2E7D32]/20 rounded mb-2"></div>
              <div className="h-4 w-64 bg-[#2E7D32]/20 rounded"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-xl text-red-500 dark:text-red-400 mb-4">{error}</div>
            <button 
              onClick={fetchEvents}
              className="px-6 py-2 bg-[#2E7D32] text-white rounded-lg hover:bg-[#1B5E20] transition-colors"
            >
              Retry
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-xl text-[#1B5E20] dark:text-[#C8E6C9] mb-4">
              You haven't created any events yet
            </div>
            <Link
              to="/create-event"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#4FC3F7] text-white font-medium rounded-lg hover:from-[#4FC3F7] hover:to-[#2E7D32] transition-all"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-[#2E7D32]/20 dark:border-[#81C784]/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Event Image */}
                <div className="h-48 bg-gradient-to-r from-[#2E7D32] to-[#4FC3F7] flex items-center justify-center">
                  <FaTree className="text-6xl text-white/30" />
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#2E7D32] dark:text-[#81C784] mb-3">
                    {event?.title || "Untitled Event"}
                  </h3>
                  <p className="text-[#1B5E20] dark:text-[#C8E6C9] mb-5 line-clamp-3">
                    {event?.description || "No description provided."}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-[#1B5E20] dark:text-[#C8E6C9]">
                      <FaUsers className="mr-3 text-[#2E7D32] dark:text-[#81C784]" />
                      <span>{event.participants || 0} Participants</span>
                    </div>
                    <div className="flex items-center text-[#1B5E20] dark:text-[#C8E6C9]">
                      <FaMapMarkerAlt className="mr-3 text-[#2E7D32] dark:text-[#81C784]" />
                      <span>{event.location || "Location not specified"}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/update/${event._id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium rounded-lg transition-colors"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvent;