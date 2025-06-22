import React from 'react';
import { format } from "date-fns";

const EventCard = ({ event }) => {
  return (
     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
      <img
        src={event.thumbnail || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-emerald-800 dark:text-emerald-400">{event.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{event.description}</p>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{event.type}</span>
          <span>{format(new Date(event.date), "dd MMM yyyy")}</span>
        </div>
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{event.location}</p>
      </div>
    </div>
  );
};

export default EventCard;