import { format } from "date-fns";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="relative bg-gradient-to-br from-white via-emerald-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-emerald-100 dark:border-gray-700 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={event.thumbnail || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={event.title}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
          {event.type}
        </span>
      </div>
      <div className="p-7">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs px-2 py-1 rounded-full font-medium shadow-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {format(new Date(event.date), "dd MMM yyyy")}
          </span>
          <span className="inline-flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full font-medium shadow-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
              <path d="M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {event.location}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-emerald-800 dark:text-emerald-400 tracking-tight">
          {event.title}
        </h3>
        <p className="text-base text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">
          {event.description}
        </p>
        <div className="flex justify-end">
          <Link
            to={`/events/${event._id}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold text-sm px-6 py-2 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
