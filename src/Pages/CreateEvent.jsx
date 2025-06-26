import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendarPlus,
  FaHeading,
  FaListAlt,
  FaMapMarkerAlt,
  FaMoon,
  FaParagraph,
  FaRegImage,
  FaSpinner,
  FaSun,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Authantication/Context/AuthContext";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Fundraising",
  "Awareness",
];

const CreateEvent = () => {
  const { UserData } = useContext(AuthContext) || {};
  const email = UserData?.email || "";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    thumbnail: "",
    location: "",
    date: null,
  });

  const [loading, setLoading] = useState(false);

  // Dark/Light mode state
  const [darkMode, setDarkMode] = useState(() => {
    // Try to get from localStorage or default to system preference
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Effect to toggle dark class on <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.date) {
      toast.error("Please choose a future date for the event.");
      return;
    }

    const eventData = {
      ...form,
      date: form.date.toISOString(),
      creatorEmail: email,
    };

    try {
      setLoading(true);
      await axios.post("/addEvent", eventData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Event created and added to the database.",
        confirmButtonColor: "#10B981",
      });

      setForm({
        title: "",
        description: "",
        type: "",
        thumbnail: "",
        location: "",
        date: null,
      });

      navigate("/upcomingEvents");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-2 sm:px-4 py-10 sm:py-20 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-slate-800 dark:to-slate-900 min-h-screen">
      {/* Dark/Light mode toggle button */}
      <div className="flex justify-end max-w-4xl mx-auto mb-4">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-4 sm:p-8 md:p-12"
      >
        <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 sm:mb-8">
          <FaCalendarPlus className="text-emerald-500 dark:text-emerald-400" />
          Create a New Event
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200 text-sm sm:text-base">
              <FaHeading /> Title
            </span>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Event title"
              required
              className="input text-sm sm:text-base py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200 text-sm sm:text-base">
              <FaListAlt /> Event Type
            </span>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="input text-sm sm:text-base py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="" disabled>
                Select type
              </option>
              {eventTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200 text-sm sm:text-base">
              <FaRegImage /> Thumbnail Image URL
            </span>
            <input
              type="url"
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="input text-sm sm:text-base py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200 text-sm sm:text-base">
              <FaMapMarkerAlt /> Location
            </span>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Dhaka, Bangladesh"
              required
              className="input text-sm sm:text-base py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200 text-sm sm:text-base">
              <FaCalendarPlus /> Event Date
            </span>
            <DatePicker
              selected={form.date}
              onChange={(date) => setForm((prev) => ({ ...prev, date }))}
              minDate={new Date()}
              placeholderText="Select date"
              className="input w-full text-sm sm:text-base py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              dateFormat="dd/MM/yyyy"
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200 text-sm sm:text-base">
              <FaParagraph /> Description
            </span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell us what this event is about..."
              required
              rows={4}
              className="input resize-none text-sm sm:text-base py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </label>

          <motion.button
            whileHover={{ scale: !loading ? 1.03 : 1 }}
            whileTap={{ scale: !loading ? 0.97 : 1 }}
            type="submit"
            disabled={loading}
            className="md:col-span-2 mt-2 inline-flex justify-center items-center gap-2 rounded-xl px-4 sm:px-6 py-2 sm:py-3 font-semibold text-white text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 active:scale-[.98] transition"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Creating...
              </>
            ) : (
              <>
                <FaCalendarPlus /> Create Event
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default CreateEvent;


