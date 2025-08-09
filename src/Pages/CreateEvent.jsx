import { motion } from "framer-motion";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarPlus, FaHeading, FaListAlt, FaMapMarkerAlt, FaParagraph, FaRegImage, FaSpinner, FaTree,FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Authantication/Context/AuthContext";

const eventTypes = [
  "Tree Plantation",
  "Forest Conservation",
  "Community Gardening",
  "Eco Awareness",
  "Cleanup Drive"
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
    participantsLimit: ""
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
      creatorName: UserData?.displayName || "Anonymous",
      participants: 0
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
        title: "Event Created!",
        text: "Your tree plantation event has been successfully created.",
        confirmButtonColor: "#2E7D32",
        background: '#f8f9fa',
      });

      setForm({
        title: "",
        description: "",
        type: "",
        thumbnail: "",
        location: "",
        date: null,
        participantsLimit: ""
      });

      navigate("/manage-events");
    } catch (error) {
      toast.error(error.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-15 bg-gradient-to-b from-[#E8F5E9] to-[#B2DFDB] dark:from-[#1B5E20] dark:to-[#004D40] py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2E7D32] text-white mb-6 shadow-lg">
            <FaTree className="text-2xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2E7D32] dark:text-[#81C784] mb-3">
            Create New Tree Event
          </h1>
          <p className="text-lg text-[#1B5E20] dark:text-[#C8E6C9] max-w-2xl mx-auto">
            Organize a tree plantation event and bring people together for a greener planet
          </p>
        </div>

        <div className="bg-white/90 dark:bg-[#1B5E20]/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-[#2E7D32]/20 dark:border-[#81C784]/20 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Title */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[#1B5E20] dark:text-[#C8E6C9] font-medium">
                  <FaHeading /> Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Community Tree Planting Day"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#2E7D32]/30 dark:border-[#81C784]/30 focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7] transition-all dark:bg-[#1B5E20]/50 dark:text-white"
                />
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[#1B5E20] dark:text-[#C8E6C9] font-medium">
                  <FaListAlt /> Event Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#2E7D32]/30 dark:border-[#81C784]/30 focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7] transition-all dark:bg-[#1B5E20]/50 dark:text-white"
                >
                  <option value="" disabled>Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Event Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[#1B5E20] dark:text-[#C8E6C9] font-medium">
                  <FaCalendarPlus /> Event Date
                </label>
                <DatePicker
                  selected={form.date}
                  onChange={(date) => setForm({ ...form, date })}
                  minDate={new Date()}
                  placeholderText="Select a date"
                  className="w-full px-4 py-3 rounded-lg border border-[#2E7D32]/30 dark:border-[#81C784]/30 focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7] transition-all dark:bg-[#1B5E20]/50 dark:text-white"
                  required
                  dateFormat="MMMM d, yyyy"
                />
              </div>

              {/* Participants Limit */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[#1B5E20] dark:text-[#C8E6C9] font-medium">
                  <FaUsers /> Participants Limit
                </label>
                <input
                  type="number"
                  name="participantsLimit"
                  value={form.participantsLimit}
                  onChange={handleChange}
                  placeholder="50"
                  min="1"
                  className="w-full px-4 py-3 rounded-lg border border-[#2E7D32]/30 dark:border-[#81C784]/30 focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7] transition-all dark:bg-[#1B5E20]/50 dark:text-white"
                />
              </div>

              {/* Location */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-[#1B5E20] dark:text-[#C8E6C9] font-medium">
                  <FaMapMarkerAlt /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter event address"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#2E7D32]/30 dark:border-[#81C784]/30 focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7] transition-all dark:bg-[#1B5E20]/50 dark:text-white"
                />
              </div>

              {/* Thumbnail URL */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-[#1B5E20] dark:text-[#C8E6C9] font-medium">
                  <FaRegImage /> Thumbnail Image URL
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={form.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#2E7D32]/30 dark:border-[#81C784]/30 focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7] transition-all dark:bg-[#1B5E20]/50 dark:text-white"
                />
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-[#1B5E20] dark:text-[#C8E6C9] font-medium">
                  <FaParagraph /> Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your event details..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-[#2E7D32]/30 dark:border-[#81C784]/30 focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7] transition-all dark:bg-[#1B5E20]/50 dark:text-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg font-bold text-white flex items-center justify-center gap-2 ${
                  loading 
                    ? 'bg-[#2E7D32]/80' 
                    : 'bg-gradient-to-r from-[#2E7D32] to-[#4FC3F7] hover:from-[#4FC3F7] hover:to-[#2E7D32]'
                } transition-all`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Creating Event...
                  </>
                ) : (
                  <>
                    <FaTree /> Create Tree Event
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default CreateEvent;