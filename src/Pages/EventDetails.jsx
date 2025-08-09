import { CalendarDays, Tag, MapPin, Users, Clock, Leaf } from "lucide-react";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Authantication/Context/AuthContext";

const EventDetails = () => {
  const BASE_URL = import.meta.env.VITE_URL;
  const { result: event } = useLoaderData();
  const { UserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinEvent = async () => {
    if (hasJoined) {
      Swal.fire({
        icon: "info",
        title: "Already Joined",
        text: "You have already joined this event.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const joinData = {
      eventId: event._id,
      title: event.title,
      EventDate: event.date,
      userEmail: UserData.email,
    };

    try {
      const res = await fetch(`${BASE_URL}/joinEvent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(joinData),
      });

      const data = await res.json();

      if (data.result) {
        setHasJoined(true);
        Swal.fire({
          icon: "success",
          title: "Joined!",
          text: "Successfully joined the event!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/joined-events");
        });
      } else {
        setHasJoined(true);
        Swal.fire({
          icon: "info",
          title: "Already Joined",
          text: "You have already joined or something went wrong.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error joining event.",
      });
      console.error("Error joining event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-[#ecfdf5] dark:from-[#0a2e1a] dark:to-[#052e16]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#2E7D32]/10 dark:bg-[#2E7D32]/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#2E7D32] dark:text-green-300 mb-6">
              {event.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join us in making the world greener, one tree at a time
            </p>
            <div className="mt-8 flex justify-center">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#2E7D32] text-white">
                <Leaf className="mr-2 h-4 w-4" />
                {event.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Event Image */}
          <div className="relative h-64 sm:h-80 md:h-96">
            <img
              className="w-full h-full object-cover"
              src={event.thumbnail}
              alt={event.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold">{event.title}</h2>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h3 className="text-xl font-semibold text-[#2E7D32] dark:text-green-400 mb-4">
                  About the Event
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-[#2E7D32] dark:text-green-400 mb-4">
                    Why Participate?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-[#4FC3F7]">
                        ✓
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">
                        Combat climate change by increasing green cover
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-[#4FC3F7]">
                        ✓
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">
                        Learn about native plant species and their benefits
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-[#4FC3F7]">
                        ✓
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">
                        Connect with like-minded environmental enthusiasts
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="bg-[#f8fafc] dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#2E7D32] dark:text-green-400 mb-6">
                    Event Details
                  </h3>
                  <div className="space-y-5">
                    <DetailItem
                      icon={<CalendarDays className="text-[#4FC3F7]" />}
                      label="Date"
                      value={new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    />
                    <DetailItem
                      icon={<Clock className="text-[#4FC3F7]" />}
                      label="Time"
                      value="9:00 AM - 2:00 PM"
                    />
                    <DetailItem
                      icon={<MapPin className="text-[#4FC3F7]" />}
                      label="Location"
                      value="Central Park, Green Valley"
                    />
                    <DetailItem
                      icon={<Users className="text-[#4FC3F7]" />}
                      label="Participants"
                      value="120+ registered"
                    />
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                      What to bring:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2E7D32]/10 text-[#2E7D32] dark:bg-green-900/30 dark:text-green-200">
                        Reusable water bottle
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2E7D32]/10 text-[#2E7D32] dark:bg-green-900/30 dark:text-green-200">
                        Sun protection
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2E7D32]/10 text-[#2E7D32] dark:bg-green-900/30 dark:text-green-200">
                        Comfortable shoes
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleJoinEvent}
                    disabled={hasJoined}
                    className={`w-full py-3 px-6 rounded-lg text-lg font-semibold text-white transition-all duration-300 ${
                      hasJoined
                        ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                        : "bg-[#2E7D32] hover:bg-[#1B5E20] shadow-lg hover:shadow-[#2E7D32]/40"
                    }`}
                  >
                    {hasJoined ? (
                      <span className="flex items-center justify-center">
                        <span className="mr-2">✓</span> You're Registered!
                      </span>
                    ) : (
                      "Join This Event"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-[#2E7D32]/5 dark:bg-[#052e16] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#2E7D32] dark:text-green-300 mb-6">
              Our Collective Impact
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Together, we're making a difference in our community and the planet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ImpactStat number="1,200+" label="Trees Planted" />
            <ImpactStat number="50+" label="Events Organized" />
            <ImpactStat number="5,000+" label="Volunteers Engaged" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable detail item component
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#4FC3F7]/10 flex items-center justify-center text-[#4FC3F7]">
      {icon}
    </div>
    <div className="ml-4">
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </dt>
      <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
        {value}
      </dd>
    </div>
  </div>
);

// Impact stat component
const ImpactStat = ({ number, label }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
    <p className="text-4xl font-bold text-[#2E7D32] dark:text-green-400 mb-2">
      {number}
    </p>
    <p className="text-lg text-gray-600 dark:text-gray-300">{label}</p>
  </div>
);

export default EventDetails;