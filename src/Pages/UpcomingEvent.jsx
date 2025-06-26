import axios from "axios";
import { format, isAfter, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState(""); // new state for event type filter
  const [allTypes, setAllTypes] = useState([]); // state to store all event types
  const navigate = useNavigate();

  // Get base URL from environment variable
  const BASE_URL = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/addEvent?searchParams=${search}`,{
          withCredentials: true, // Include credentials for CORS
        }
        );
        const now = new Date();
        const upcoming = res.data.result.filter((event) =>
          isAfter(parseISO(event.date), now)
        );
        setEvents(upcoming);
        // Extract unique event types for the filter dropdown
        const types = Array.from(
          new Set(upcoming.map((ev) => ev.type).filter(Boolean))
        );
        setAllTypes(types);
        setError(null);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [search]);

  // Filter events by selected type
  const filteredEvents = eventType
    ? events.filter((event) => event.type === eventType)
    : events;

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">Loading events...</p>
    );
  if (error)
    return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl pt-10 font-extrabold mb-8 text-center text-emerald-700 dark:text-emerald-300 tracking-tight">
        Upcoming Events
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <input
          type="text"
          name="title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full max-w-xs px-4 py-2 rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        >
          <option value="">All Types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500">
          No upcoming events available.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-emerald-200 transition-shadow flex flex-col overflow-hidden border border-emerald-100"
            >
              <img
                src={
                  event.thumbnail ||
                  "https://source.unsplash.com/400x200/?event"
                }
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Location:</span> {event.location}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Type:</span> {event.type}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Date:</span>{" "}
                  {format(parseISO(event.date), "PPP")}
                </p>
                {event.description && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                    {event.description}
                  </p>
                )}
                <div className="mt-auto pt-4 flex justify-end">
                  <button
                    onClick={() => navigate(`/events/${event._id}`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
                  >
                    View Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
