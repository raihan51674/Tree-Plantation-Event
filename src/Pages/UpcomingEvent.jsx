import { FaCalendarAlt, FaSearch, FaLeaf, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format, isAfter, parseISO } from "date-fns";
import { motion } from "framer-motion";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("");
  const [allTypes, setAllTypes] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/addEvent?searchParams=${search}`,
          { withCredentials: true }
        );

        const now = new Date();
        const upcoming = res.data.result.filter((event) =>
          isAfter(parseISO(event.date), now)
        );
        setEvents(upcoming);

        const types = Array.from(
          new Set(upcoming.map((ev) => ev.type).filter(Boolean))
        );
        setAllTypes(types);

        setError(null);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchEvents, 500);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  const filteredEvents = eventType
    ? events.filter((event) => event.type === eventType)
    : events;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F5E9] to-[#B2DFDB] dark:from-[#1B5E20] dark:to-[#004D40] pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2E7D32] text-white mb-6 shadow-lg">
            <FaCalendarAlt className="text-2xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2E7D32] dark:text-[#81C784] mb-3">
            Upcoming Tree Events
          </h1>
          <p className="text-lg text-[#1B5E20] dark:text-[#C8E6C9] max-w-2xl mx-auto">
            Join our community in making the planet greener
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-xl shadow-md p-6 mb-8 border border-[#2E7D32]/20 dark:border-[#81C784]/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-[#2E7D32] dark:text-[#81C784]" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#2E7D32]/30 dark:border-[#81C784]/30 focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7] transition-all dark:bg-[#1B5E20]/50 dark:text-white"
              />
            </div>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="px-4 py-3 rounded-lg border border-[#2E7D32]/30 dark:border-[#81C784]/30 focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7] transition-all dark:bg-[#1B5E20]/50 dark:text-white"
            >
              <option value="">All Event Types</option>
              {allTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
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
              <FaLeaf className="inline-block" />
            </div>
            <h3 className="text-xl font-medium text-[#1B5E20] dark:text-[#C8E6C9] mb-2">
              {error}
            </h3>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-white/80 dark:bg-[#1B5E20]/80 rounded-xl shadow-md p-12 text-center">
            <div className="text-[#2E7D32] dark:text-[#81C784] text-5xl mb-4">
              <FaLeaf className="inline-block" />
            </div>
            <h3 className="text-xl font-medium text-[#1B5E20] dark:text-[#C8E6C9] mb-2">
              No Upcoming Events Found
            </h3>
            <p className="text-[#1B5E20]/80 dark:text-[#C8E6C9]/80 mb-6">
              {search || eventType ? "Try different search criteria" : "Check back later for new events"}
            </p>
            {search || eventType ? (
              <button
                onClick={() => {
                  setSearch("");
                  setEventType("");
                }}
                className="inline-block px-6 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            ) : null}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event._id}
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-[#2E7D32]/20 dark:border-[#81C784]/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-r from-[#2E7D32] to-[#4FC3F7] flex items-center justify-center">
                  <img
                    src={event.thumbnail || "https://source.unsplash.com/400x200/?tree,planting"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-[#2E7D32] dark:text-[#81C784]">
                      {event.title}
                    </h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#2E7D32]/10 dark:bg-[#81C784]/10 text-[#2E7D32] dark:text-[#81C784]">
                      {event.type}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-[#1B5E20] dark:text-[#C8E6C9]">
                      <FaCalendarAlt className="mr-3 text-[#2E7D32] dark:text-[#81C784]" />
                      <span>{format(parseISO(event.date), "PPPp")}</span>
                    </div>
                    <div className="flex items-center text-[#1B5E20] dark:text-[#C8E6C9]">
                      <FaMapMarkerAlt className="mr-3 text-[#2E7D32] dark:text-[#81C784]" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    {event.participants && (
                      <div className="flex items-center text-[#1B5E20] dark:text-[#C8E6C9]">
                        <FaUsers className="mr-3 text-[#2E7D32] dark:text-[#81C784]" />
                        <span>{event.participants} participants</span>
                      </div>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-[#1B5E20] dark:text-[#C8E6C9] text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  <button
                    onClick={() => navigate(`/events/${event._id}`)}
                    className="w-full mt-4 py-2 bg-gradient-to-r from-[#2E7D32] to-[#4FC3F7] hover:from-[#4FC3F7] hover:to-[#2E7D32] text-white font-medium rounded-lg transition-all"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;