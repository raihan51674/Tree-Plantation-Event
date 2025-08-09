import { useEffect, useState } from "react";
import { FaCalendarAlt,FaTree, FaCheckCircle, FaLeaf, FaUsers } from "react-icons/fa";
import { AuthContext } from "../Authantication/Context/AuthContext";
import { use } from "react";

const JoinedEvent = () => {
  const BASE_URL = import.meta.env.VITE_URL;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { UserData } = use(AuthContext);
  const userEmail = UserData?.email;

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/joinEvent?email=${userEmail}`, {
          credentials: "include",
        });
        const data = await response.json();
        
        if (data.result) {
          // Sort events by date (newest first)
          const sortedEvents = [...data.result].sort(
            (a, b) => new Date(b.EventDate) - new Date(a.EventDate)
          );
          setEvents(sortedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching joined events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchJoinedEvents();
    }
  }, [userEmail]);

  return (
    <div className="min-h-screen  dark:from-[#1B5E20] dark:to-[#004D40] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2E7D32] text-white mb-6 shadow-lg">
            <FaCheckCircle className="text-2xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2E7D32] dark:text-[#81C784] mb-3">
            Your Joined Events
          </h1>
          <p className="text-lg text-[#1B5E20] dark:text-[#C8E6C9] max-w-2xl mx-auto">
            All the tree plantation events you've registered for
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-xl shadow-md p-6 mb-8 border border-[#2E7D32]/20 dark:border-[#81C784]/20">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="p-3 rounded-full bg-[#2E7D32]/10 dark:bg-[#81C784]/10">
                <FaLeaf className="text-[#2E7D32] dark:text-[#81C784] text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#1B5E20] dark:text-[#C8E6C9]">
                  Your Participation
                </h3>
                <p className="text-sm text-[#1B5E20]/80 dark:text-[#C8E6C9]/80">
                  Contributing to a greener planet
                </p>
              </div>
            </div>
            <div className="bg-[#2E7D32] dark:bg-[#4FC3F7] text-white px-6 py-2 rounded-full font-bold shadow-lg">
              {events.length} Events Joined
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/80 dark:bg-[#1B5E20]/80 rounded-xl shadow-md p-6 h-64 animate-pulse">
                <div className="h-6 w-3/4 bg-[#2E7D32]/20 dark:bg-[#81C784]/20 rounded mb-4"></div>
                <div className="h-4 w-full bg-[#2E7D32]/10 dark:bg-[#81C784]/10 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-[#2E7D32]/10 dark:bg-[#81C784]/10 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-[#2E7D32]/10 dark:bg-[#81C784]/10 rounded mb-6"></div>
                <div className="h-8 w-full bg-[#2E7D32]/10 dark:bg-[#81C784]/10 rounded"></div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-xl shadow-md p-12 text-center">
            <div className="text-[#2E7D32] dark:text-[#81C784] text-5xl mb-4">
              <FaLeaf className="inline-block" />
            </div>
            <h3 className="text-xl font-medium text-[#1B5E20] dark:text-[#C8E6C9] mb-2">
              No Events Joined Yet
            </h3>
            <p className="text-[#1B5E20]/80 dark:text-[#C8E6C9]/80 mb-6">
              You haven't joined any tree plantation events yet.
            </p>
            <a
              href="/upcomingEvents"
              className="inline-block px-6 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium rounded-lg transition-colors"
            >
              Browse Upcoming Events
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-[#2E7D32]/20 dark:border-[#81C784]/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-r from-[#2E7D32] to-[#4FC3F7] flex items-center justify-center">
                  <FaTree className="text-6xl text-white/30" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2E7D32] dark:text-[#81C784] mb-2 truncate">
                    {event.title || "Tree Plantation Event"}
                  </h3>
                  <div className="flex items-center gap-2 text-[#1B5E20] dark:text-[#C8E6C9] mb-3">
                    <FaUsers className="text-[#2E7D32] dark:text-[#81C784]" />
                    <span>Organized by: {event.userEmail || "Community"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1B5E20] dark:text-[#C8E6C9] mb-4">
                    <FaCalendarAlt className="text-[#2E7D32] dark:text-[#81C784]" />
                    <span>Joined on: {new Date(event.EventDate).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#2E7D32]/10 dark:bg-[#81C784]/10 text-[#2E7D32] dark:text-[#81C784]">
                      Confirmed
                    </span>
                    <a
                      href={`/event-details/${event.eventId}`}
                      className="text-sm font-medium text-[#2E7D32] dark:text-[#81C784] hover:underline"
                    >
                      View Details
                    </a>
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

export default JoinedEvent;