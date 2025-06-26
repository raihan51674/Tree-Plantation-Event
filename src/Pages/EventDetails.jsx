import { CalendarDays, Tag } from "lucide-react";
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
    <section className="pt-17 px-4 min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e3f2fd] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155] flex items-center justify-center transition-colors duration-300">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full py-10 bg-gradient-to-r from-green-400/80 via-teal-400/80 to-blue-400/80 dark:from-slate-800/90 dark:via-slate-700/90 dark:to-slate-900/90 backdrop-blur-md shadow-lg z-10 transition-colors duration-300">
        <h1 className="text-5xl pt-15 md:text-6xl font-extrabold text-center bg-gradient-to-r from-green-700 via-teal-700 to-blue-700 dark:from-green-300 dark:via-teal-300 dark:to-blue-300 text-transparent bg-clip-text drop-shadow-lg tracking-tight">
          {event.title}
        </h1>
        <p className="text-center text-lg mt-2 font-medium tracking-wide text-gray-700 dark:text-gray-200">
          Be part of something impactful{" "}
          <span className="inline-block animate-bounce">🌱</span>
        </p>
      </header>

      {/* Event Card */}
      <div className="relative z-20 w-full max-w-4xl mt-40 mb-12">
        <div className="rounded-3xl shadow-2xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/60 overflow-hidden transition duration-300 hover:shadow-3xl hover:scale-[1.01]">
          {/* Event Image */}
          <div className="relative group">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-3xl"
            />
            <span className="absolute top-4 right-4 bg-white/80 dark:bg-slate-900/80 px-4 py-1 rounded-full shadow text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-widest">
              {event.type}
            </span>
          </div>

          {/* Event Info */}
          <div className="p-8 space-y-8">
            <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed font-medium italic border-l-4 border-teal-400 dark:border-teal-600 pl-4 bg-white/60 dark:bg-slate-900/60 py-2">
              {event.description}
            </p>

            {/* Event Details Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <DetailItem
                icon={<Tag className="text-green-600 dark:text-green-400" />}
                label="Type"
                value={event.type}
              />
              <DetailItem
                icon={
                  <CalendarDays className="text-blue-600 dark:text-blue-400" />
                }
                label="Date"
                value={new Date(event.date).toLocaleDateString()}
              />
            </div>
            {/* Join Event Button */}
            <button
              onClick={handleJoinEvent}
              disabled={hasJoined}
              className={`px-10 py-3 text-xl font-bold text-white bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 dark:from-green-700 dark:via-teal-700 dark:to-blue-700 rounded-full shadow-lg transition duration-300 hover:scale-105 hover:from-green-600 hover:to-blue-600 dark:hover:from-green-800 dark:hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-700 ${
                hasJoined ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {hasJoined ? "Joined" : "Join Event"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable detail item
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200 font-semibold">
    {icon}
    <span>
      {label}:{" "}
      <span className="font-normal text-gray-600 dark:text-gray-300">
        {value}
      </span>
    </span>
  </div>
);

export default EventDetails;
