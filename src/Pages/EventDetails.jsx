import { CalendarDays, MapPin, Tag, User } from "lucide-react";
import { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Authantication/Context/AuthContext";

const EventDetails = () => {
  const { result: event } = useLoaderData(); 
  const {UserData } = useContext(AuthContext);
  


    //handle function add
     const handleJoinEvent = async () => {
      const joinData = {
      eventId: event._id,
      title: event.title,
      EventDate: event.date,
      userEmail: UserData.email
      
    };
    console.log(joinData);


    const res = await fetch("http://localhost:3000/joinEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinData),
    });

    const data = await res.json();
    if (data.success) {
      console.log("Successfully joined the event!");
    } else {
      console.log("You already joined this event or something went wrong.");
      
    }
    

  }

  

  return (
    <section className="pt-24 px-4 min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e3f2fd] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155] flex items-center justify-center transition-colors duration-300">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full py-10 bg-gradient-to-r from-green-400/80 via-teal-400/80 to-blue-400/80 dark:from-slate-800/90 dark:via-slate-700/90 dark:to-slate-900/90 backdrop-blur-md shadow-lg z-10 transition-colors duration-300">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-green-700 via-teal-700 to-blue-700 dark:from-green-300 dark:via-teal-300 dark:to-blue-300 text-transparent bg-clip-text drop-shadow-lg tracking-tight">
          {event.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-200 text-center text-lg mt-2 font-medium tracking-wide">
          Be part of something impactful <span className="animate-bounce inline-block">🌱</span>
        </p>
      </div>

      {/* Card */}
      <div className="relative z-20 w-full max-w-4xl mt-40 mb-12">
        <div className="rounded-3xl shadow-2xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/60 p-0 overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]">
          {/* Image */}
          <div className="relative group">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-80 object-cover transition-all duration-500 group-hover:scale-105"
              style={{ borderTopLeftRadius: "1.5rem", borderTopRightRadius: "1.5rem" }}
            />
            <div className="absolute top-4 right-4 bg-white/80 dark:bg-slate-900/80 px-4 py-1 rounded-full shadow text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-widest">
              {event.type}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Description */}
            <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed font-medium italic border-l-4 border-teal-400 dark:border-teal-600 pl-4 bg-white/60 dark:bg-slate-900/60 py-2">
              {event.description}
            </p>

            {/* Info List */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200 font-semibold">
                <Tag className="w-6 h-6 text-green-600 dark:text-green-400" />
                <span>Type: <span className="font-normal text-gray-600 dark:text-gray-300">{event.type}</span></span>
              </div>
              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200 font-semibold">
                <CalendarDays className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span>Date: <span className="font-normal text-gray-600 dark:text-gray-300">{new Date(event.date).toLocaleDateString()}</span></span>
              </div>
              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200 font-semibold">
                <MapPin className="w-6 h-6 text-red-600 dark:text-red-400" />
                <span>Location: <span className="font-normal text-gray-600 dark:text-gray-300">{event.location}</span></span>
              </div>
              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200 font-semibold">
                <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span>Creator: <span className="font-normal text-gray-600 dark:text-gray-300">{event.creatorEmail}</span></span>
              </div>
            </div>

            {/* Join Button */}
            <div className="text-center pt-4">
              <button
                onClick={handleJoinEvent}
                className="px-10 py-3 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 dark:from-green-700 dark:via-teal-700 dark:to-blue-700 text-white text-xl font-bold rounded-full shadow-lg hover:from-green-600 hover:to-blue-600 dark:hover:from-green-800 dark:hover:to-blue-800 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-700"
              >
                Join Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
