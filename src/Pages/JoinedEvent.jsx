import { use, useEffect, useState } from "react";
import { AuthContext } from "../Authantication/Context/AuthContext";

const JoinedEvent = () => {
  const BASE_URL = import.meta.env.VITE_URL;
  const [data, setData] = useState([]);
  const { UserData } = use(AuthContext);
  const userEmail = UserData?.email;

  useEffect(() => {
    fetch(`${BASE_URL}/joinEvent?email=${userEmail}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // Sort events by EventDate (ascending)
        const sorted = [...(data.result || [])].sort(
          (a, b) => new Date(a.EventDate) - new Date(b.EventDate)
        );
        setData(sorted);
      })
      .catch((error) => {
        console.error("Error fetching joined events:", error);
      });
  }, [userEmail]);

  return (
    <div className="min-h-screen py-10 px-2 md:px-8 transition-colors duration-300 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl pt-10 md:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              Joined Events
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              All events you have joined are listed below.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <span className="inline-block rounded-full px-6 py-2 text-lg font-semibold shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white dark:from-purple-700 dark:to-blue-700">
              {data.length} Joined
            </span>
          </div>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.length > 0 ? (
            data.map((event) => (
              <div
                key={event._id}
                className="rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between border bg-white border-purple-100 dark:bg-gray-800 dark:border-gray-700"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2 truncate text-purple-700 dark:text-purple-300">
                    {event.title}
                  </h3>
                  <p className="text-sm mb-1 text-gray-500 dark:text-gray-300">
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      User:
                    </span>{" "}
                    {event.userEmail}
                  </p>
                  <p className="text-xs mb-2 text-gray-400 dark:text-gray-500">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      Event ID:
                    </span>{" "}
                    {event.eventId}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200">
                    Joined: {event.EventDate}
                  </span>
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                    Status: Joined
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-lg font-medium text-gray-400 dark:text-gray-500">
                No joined events found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinedEvent;