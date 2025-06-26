import { use, useEffect, useState } from "react";
import { AuthContext } from "../Authantication/Context/AuthContext";

const JoinedEvent = () => {
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState("light");
  const { UserData } = use(AuthContext);
  const userEmail = UserData?.email;

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Optionally, persist theme to localStorage
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    fetch(`http://localhost:3000/joinEvent?email=${userEmail}`,{
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Joined Events for User:", data.result);
        setData(data.result);
      })
      .catch((error) => {
        console.error("Error fetching joined events:", error);
      });
  }, [userEmail]);

  return (
    <div
      className={`min-h-screen py-10 px-2 md:px-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-purple-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2
              className={`text-2xl pt-10 md:text-3xl font-bold mb-2 ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Joined Events
            </h2>
            <p
              className={`text-sm md:text-base ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              All events you have joined are listed below.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <span
              className={`inline-block rounded-full px-6 py-2 text-lg font-semibold shadow-lg ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-700 to-blue-700 text-white"
                  : "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              }`}
            >
              {data.length} Joined
            </span>
            <button
              onClick={toggleTheme}
              className={`rounded-full px-4 py-2 font-medium shadow ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } transition`}
              aria-label="Toggle dark/light mode"
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.length > 0 ? (
            data.map((event) => (
              <div
                key={event._id}
                className={`rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between border ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-purple-100"
                }`}
              >
                <div>
                  <h3
                    className={`text-xl font-bold mb-2 truncate ${
                      theme === "dark"
                        ? "text-purple-300"
                        : "text-purple-700"
                    }`}
                  >
                    {event.title}
                  </h3>
                  <p
                    className={`text-sm mb-1 ${
                      theme === "dark"
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        theme === "dark"
                          ? "text-gray-200"
                          : "text-gray-700"
                      }`}
                    >
                      User:
                    </span>{" "}
                    {event.userEmail}
                  </p>
                  <p
                    className={`text-xs mb-2 ${
                      theme === "dark"
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        theme === "dark"
                          ? "text-gray-300"
                          : "text-gray-600"
                      }`}
                    >
                      Event ID:
                    </span>{" "}
                    {event.eventId}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      theme === "dark"
                        ? "bg-purple-900 text-purple-200"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    Joined: {event.EventDate}
                  </span>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      theme === "dark"
                        ? "bg-blue-900 text-blue-200"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    Status: Joined
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p
                className={`text-lg font-medium ${
                  theme === "dark"
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
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