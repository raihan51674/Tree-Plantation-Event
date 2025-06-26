import { motion } from 'framer-motion';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FaCalendarPlus,
  FaHeading,
  FaListAlt,
  FaMapMarkerAlt,
  FaParagraph,
  FaRegImage,
  FaSpinner,
  FaUser,
} from "react-icons/fa";
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const ManageUpdate = () => {
  const BASE_URL = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const updateData = useLoaderData();
  const {
    title,
    creatorEmail,
    date,
    description,
    type,
    thumbnail,
    location,
    _id,
  } = updateData?.result || {};

  const [form, setForm] = useState({
    title: title || '',
    description: description || '',
    type: type || '',
    thumbnail: thumbnail || '',
    location: location || '',
    date: date ? new Date(date) : null,
    creatorEmail: creatorEmail || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = {
      ...form,
      date: form.date ? new Date(form.date).toISOString() : null,
    };

    try {
      const res = await fetch(`${BASE_URL}/addEvent/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      console.log('Update Response:', result);
      // Show SweetAlert on success
      Swal.fire({
        icon: 'success',
        title: 'Successfull update',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/upcomingEvents');
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-2 sm:px-4 py-10 sm:py-20 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-slate-800 dark:to-slate-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-4 sm:p-8 md:p-12"
      >
        <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 sm:mb-8">
          <FaCalendarPlus className="text-emerald-500 dark:text-emerald-400" />
          Update Event
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Title */}
          <Input label="Title" icon={<FaHeading />} name="title" value={form.title} onChange={handleChange} />

          {/* Type */}
          <Input label="Event Type" icon={<FaListAlt />} name="type" value={form.type} onChange={handleChange} />

          {/* Thumbnail */}
          <Input label="Thumbnail Image URL" icon={<FaRegImage />} name="thumbnail" value={form.thumbnail} onChange={handleChange} full />

          {/* Location */}
          <Input label="Location" icon={<FaMapMarkerAlt />} name="location" value={form.location} onChange={handleChange} />

          {/* Date */}
          <div className="flex flex-col gap-2">
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
          </div>

          {/* Creator Email */}
          <Input label="Creator Email" icon={<FaUser />} name="creatorEmail" value={form.creatorEmail} onChange={handleChange} />

          {/* Description */}
          <div className="flex flex-col gap-2 md:col-span-2">
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
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: !loading ? 1.03 : 1 }}
            whileTap={{ scale: !loading ? 0.97 : 1 }}
            type="submit"
            disabled={loading}
            className="md:col-span-2 mt-2 inline-flex justify-center items-center gap-2 rounded-xl px-4 sm:px-6 py-2 sm:py-3 font-semibold text-white text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 active:scale-[.98] transition"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Updating...
              </>
            ) : (
              <>
                <FaCalendarPlus /> Update Event
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

// Reusable Input Field
const Input = ({ label, icon, name, value, onChange, type = 'text', full }) => (
  <label className={`flex flex-col gap-2 ${full ? 'md:col-span-2' : ''}`}>
    <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200 text-sm sm:text-base">
      {icon} {label}
    </span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="input text-sm sm:text-base py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
    />
  </label>
);

export default ManageUpdate;
