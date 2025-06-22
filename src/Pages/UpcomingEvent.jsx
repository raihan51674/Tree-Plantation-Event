import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";

const UpcomingEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/addEvent");
        console.log("Fetched data:", response.data); // Check response structure here
        setEvents(response.data.result || []); // <-- use result array here
        setLoading(false);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading events...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;
  if (events.length === 0) return <div className="p-4 text-center">No upcoming events.</div>;

  return (
        <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-emerald-700 pt-15">
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvent;
