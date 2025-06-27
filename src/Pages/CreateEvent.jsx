import { motion } from "framer-motion";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendarPlus,
  FaHeading,
  FaListAlt,
  FaMapMarkerAlt,
  FaParagraph,
  FaRegImage,
  FaSpinner,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Authantication/Context/AuthContext";

// axios.defaults.baseURL = import.meta.env.VITE_URL || "http://localhost:3000";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Fundraising",
  "Awareness",
];

const CreateEvent = () => {
  const BASE_URL = import.meta.env.VITE_URL;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.date || form.date < new Date()) {
      toast.error("Please choose a valid future date.");
      return;
    }

    const eventData = {
      ...form,
      date: form.date.toISOString(),
      creatorEmail: email,
    };

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/addEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"

        },
        credentials: "include",
        body: JSON.stringify(eventData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event.");
      }
      const res = await response.json();
      console.log("Event created successfully:", res);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Event has been created successfully.",
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
    <section className="px-4 py-10 sm:py-20 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-slate-800 dark:to-slate-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 sm:p-12"
      >
        <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-8">
          <FaCalendarPlus /> Create a New Event
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <FormField
            icon={<FaHeading />}
            label="Title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Event title"
            required
          />

          {/* Event Type */}
          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200 text-base">
              <FaListAlt /> Event Type
            </span>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="input py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="" disabled>Select type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>

          {/* Thumbnail */}
          <FormField
            icon={<FaRegImage />}
            label="Thumbnail Image URL"
            name="thumbnail"
            type="url"
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
            className="md:col-span-2"
          />

          {/* Location */}
          <FormField
            icon={<FaMapMarkerAlt />}
            label="Location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            placeholder="Dhaka, Bangladesh"
            required
          />

          {/* Event Date */}
          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200 text-base">
              <FaCalendarPlus /> Event Date
            </span>
            <DatePicker
              selected={form.date}
              onChange={(date) => setForm((prev) => ({ ...prev, date }))}
              minDate={new Date()}
              placeholderText="Select date"
              className="input w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              dateFormat="dd/MM/yyyy"
              required
            />
          </label>

          {/* Description */}
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200 text-base">
              <FaParagraph /> Description
            </span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell us what this event is about..."
              required
              rows={4}
              className="input resize-none py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </label>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: !loading ? 1.03 : 1 }}
            whileTap={{ scale: !loading ? 0.97 : 1 }}
            type="submit"
            disabled={loading}
            className="md:col-span-2 mt-4 inline-flex justify-center items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 transition"
          >
            {loading ? <><FaSpinner className="animate-spin" /> Creating...</> : <><FaCalendarPlus /> Create Event</>}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

// Reusable Input Field
const FormField = ({ icon, label, ...props }) => (
  <label className={`flex flex-col gap-2 ${props.className || ""}`}>
    <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200 text-base">
      {icon} {label}
    </span>
    <input
      {...props}
      className="input py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
    />
  </label>
);

export default CreateEvent;
