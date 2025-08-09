import { useContext, useEffect, useState } from "react";
import { FaCalendarAlt, FaEdit, FaTrashAlt, FaTree, FaUsers, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Authantication/Context/AuthContext";

const ManageEvent = () => {
  const BASE_URL = import.meta.env.VITE_URL;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { UserData } = useContext(AuthContext);
  const [deletingId, setDeletingId] = useState(null);

  const fetchEvents = () => {
    if (!UserData?.email) return;

    setLoading(true);
    fetch(`${BASE_URL}/addEvent?email=${UserData.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.result) {
          // Sort events by date (newest first)
          const sortedEvents = [...data.result].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setEvents(sortedEvents);
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
  try {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Delete Event?",
      html: `
        <div class="text-left">
          <p class="text-gray-700 dark:text-gray-200 mb-2">Are you sure you want to delete this tree plantation event?</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">This will permanently remove the event and all associated data.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2E7D32",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: '#f8f9fa',
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/leaf-fall.gif")
        left top
        no-repeat
      `,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });

    // Exit if user cancels
    if (!result.isConfirmed) return;

    // Set loading state
    setDeletingId(id);

    // Make API request
    const res = await fetch(`${BASE_URL}/addEvent/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    // Handle response
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete event");
    }

    const data = await res.json();

    // Check for successful deletion
    if (data.deletedCount > 0 || data.success) {
      // Update UI immediately
      setEvents(prev => prev.filter(e => e._id !== id));

      // Show success message
      await Swal.fire({
        title: "Success!",
        text: "The event has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#2E7D32",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    } else {
      throw new Error("Event not found or already deleted");
    }
  } catch (error) {
    console.error("Delete error:", error);
    
    // Show error message
    await Swal.fire({
      title: "Error!",
      html: `
        <div class="text-left">
          <p class="text-gray-700 dark:text-gray-200">Failed to delete event.</p>
          <p class="text-sm text-red-500 dark:text-red-400 mt-2">${error.message}</p>
        </div>
      `,
      icon: "error",
      confirmButtonColor: "#d33"
    });
  } finally {
    // Reset loading state
    setDeletingId(null);
  }
};
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F5E9] to-[#B2DFDB] dark:from-[#1B5E20] dark:to-[#004D40] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2E7D32] text-white mb-6 shadow-lg">
            <FaTree className="text-2xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2E7D32] dark:text-[#81C784] mb-3">
            Manage Your Events
          </h1>
          <p className="text-lg text-[#1B5E20] dark:text-[#C8E6C9] max-w-2xl mx-auto">
            Organize and manage all your tree plantation initiatives
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white/90 dark:bg-[#1B5E20]/90 backdrop-blur-sm rounded-xl shadow-md p-6 mb-8 border border-[#2E7D32]/20 dark:border-[#81C784]/20">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="p-3 rounded-full bg-[#2E7D32]/10 dark:bg-[#81C784]/10">
                <FaCalendarAlt className="text-[#2E7D32] dark:text-[#81C784] text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#1B5E20] dark:text-[#C8E6C9]">
                  Your Events Overview
                </h3>
                <p className="text-sm text-[#1B5E20]/80 dark:text-[#C8E6C9]/80">
                  {events.length} active events
                </p>
              </div>
            </div>
            <Link
              to="/create-event"
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#2E7D32] to-[#4FC3F7] text-white font-medium rounded-lg hover:from-[#4FC3F7] hover:to-[#2E7D32] transition-all"
            >
              <FaTree /> Create New Event
            </Link>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/80 dark:bg-[#1B5E20]/80 rounded-xl shadow-md p-6 h-80 animate-pulse">
                <div className="h-6 w-3/4 bg-[#2E7D32]/20 dark:bg-[#81C784]/20 rounded mb-4"></div>
                <div className="h-4 w-full bg-[#2E7D32]/10 dark:bg-[#81C784]/10 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-[#2E7D32]/10 dark:bg-[#81C784]/10 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-[#2E7D32]/10 dark:bg-[#81C784]/10 rounded mb-6"></div>
                <div className="h-10 w-full bg-[#2E7D32]/10 dark:bg-[#81C784]/10 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-white/80 dark:bg-[#1B5E20]/80 rounded-xl shadow-md p-8 text-center">
            <div className="text-red-500 dark:text-red-400 text-4xl mb-4">
              <FaTree className="inline-block" />
            </div>
            <h3 className="text-xl font-medium text-[#1B5E20] dark:text-[#C8E6C9] mb-2">
              {error}
            </h3>
            <button
              onClick={fetchEvents}
              className="mt-4 px-6 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white/80 dark:bg-[#1B5E20]/80 rounded-xl shadow-md p-12 text-center">
            <div className="text-[#2E7D32] dark:text-[#81C784] text-5xl mb-4">
              <FaTree className="inline-block" />
            </div>
            <h3 className="text-xl font-medium text-[#1B5E20] dark:text-[#C8E6C9] mb-2">
              No Events Found
            </h3>
            <p className="text-[#1B5E20]/80 dark:text-[#C8E6C9]/80 mb-6">
              You haven't created any tree plantation events yet.
            </p>
            <Link
              to="/create-event"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#4FC3F7] text-white font-medium rounded-lg hover:from-[#4FC3F7] hover:to-[#2E7D32] transition-all"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-[#2E7D32]/20 dark:border-[#81C784]/20 hover:shadow-lg transition-all duration-300"
              >
                {/* Event Header */}
                <div className="h-40 bg-gradient-to-r from-[#2E7D32] to-[#4FC3F7] flex items-center justify-center relative">
                  <FaTree className="text-6xl text-white/30" />
                  <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-[#2E7D32]">
                    {event.type || "Plantation"}
                  </span>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2E7D32] dark:text-[#81C784] mb-2 truncate">
                    {event.title || "Tree Planting Event"}
                  </h3>
                  <p className="text-[#1B5E20] dark:text-[#C8E6C9] mb-4 line-clamp-3">
                    {event.description || "No description available"}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-[#1B5E20] dark:text-[#C8E6C9]">
                      <FaUsers className="mr-3 text-[#2E7D32] dark:text-[#81C784]" />
                      <span>{event.participants || 0} participants</span>
                    </div>
                    <div className="flex items-center text-[#1B5E20] dark:text-[#C8E6C9]">
                      <FaMapMarkerAlt className="mr-3 text-[#2E7D32] dark:text-[#81C784]" />
                      <span className="truncate">{event.location || "Location not specified"}</span>
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
                      disabled={deletingId === event._id}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors ${
                        deletingId === event._id
                          ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                    >
                      {deletingId === event._id ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <>
                          <FaTrashAlt /> Delete
                        </>
                      )}
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