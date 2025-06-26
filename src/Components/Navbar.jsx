import { useContext, useEffect, useRef, useState } from 'react';
import { CgLogIn } from 'react-icons/cg';
import { FaAngleDown, FaFirefoxBrowser, FaUser } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Authantication/Context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false); // mobile menu
  const [profileOpen, setProfileOpen] = useState(false); // profile dropdown

  const { SignOutUser, UserData, darkMode, setDarkMode } = useContext(AuthContext);

  const profileRef = useRef(null);

  // close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  const handleSignOut = () => {
    SignOutUser();
    setOpen(false);
    setProfileOpen(false);
  };

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/90 via-blue-50/80 to-white/90 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-xl backdrop-blur-lg border-b border-blue-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-20">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={scrollToTop}
          className="flex items-center gap-2 text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-green-500 to-blue-400 bg-clip-text text-transparent select-none min-w-0"
        >
          <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-600 shadow-lg flex items-center justify-center text-white font-bold mr-1">🌱</span>
          <span className="truncate">
            Tree<span className="font-light text-gray-700 dark:text-gray-200">Plantation</span>
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-7">
          {/* Always show Upcoming Events */}
          <NavLink
            to="/upcomingEvents"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600'
              }`
            }
          >
            <FaFirefoxBrowser />
            <span>Upcoming Events</span>
          </NavLink>

          {/* Dark/Light mode toggle */}
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg bg-blue-50 dark:bg-gray-800 text-xl transition hover:bg-blue-100 dark:hover:bg-gray-700"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '🌙' : '☀️'}
          </button>

          {/* Auth area */}
          {!UserData ? (
            <NavLink
              to="/auth/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-200 bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 transition"
            >
              <CgLogIn />
              <span>Login</span>
            </NavLink>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(prev => !prev)}
                className="flex items-center gap-2 focus:outline-none group"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                title={UserData.displayName || 'User'} // Tooltip on hover
              >
                <img
                  src={UserData.photoURL || '/default-avatar.png'}
                  alt={UserData.displayName || 'User'}
                  className="w-11 h-11 rounded-full border-2 border-blue-400 shadow-md object-cover transition group-hover:scale-105"
                />
                <FaAngleDown className={`ml-1 text-blue-500 dark:text-blue-300 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              {/* dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-blue-100 dark:border-gray-700 py-3 animate-fadeIn z-50">
                  <div className="px-5 pb-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                    <div className="font-bold text-gray-800 dark:text-gray-100">{UserData.displayName || 'User'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{UserData.email}</div>
                  </div>
                  <NavLink
                    to="/create-event"
                    onClick={() => setProfileOpen(false)}
                    className="block px-5 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                  >
                    Create Event
                  </NavLink>
                  <NavLink
                    to="/manage-events"
                    onClick={() => setProfileOpen(false)}
                    className="block px-5 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                  >
                    Manage Events
                  </NavLink>
                  <NavLink
                    to="/joined-events"
                    onClick={() => setProfileOpen(false)}
                    className="block px-5 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                  >
                    Joined Events
                  </NavLink>
                  <NavLink
                    to="/auth/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-5 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-5 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-gray-800 rounded-lg transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-blue-700 dark:text-blue-300 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <IoCloseSharp size={30} /> : <IoMdMenu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden w-full transition-all duration-300 ease-in-out bg-gradient-to-b from-white/95 via-blue-50/90 to-white/95 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-xl border-t border-blue-100 dark:border-gray-800 ${
          open ? 'max-h-screen py-6 px-4 sm:px-6 overflow-y-auto' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col space-y-4">
          {/* Always show Upcoming Events */}
          <NavLink
            to="/upcomingEvents"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600'
              }`
            }
          >
            <FaFirefoxBrowser />
            <span>Upcoming Events</span>
          </NavLink>

          {/* Dark/Light mode toggle mobile */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold bg-blue-50 dark:bg-gray-800 text-xl transition hover:bg-blue-100 dark:hover:bg-gray-700"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '🌙' : '☀️'}
            <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          {/* Auth area mobile */}
          {!UserData ? (
            <NavLink
              to="/auth/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-200 bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 transition"
            >
              <CgLogIn />
              <span>Login</span>
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/create-event"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              >
                <FaUser />
                <span>Create Event</span>
              </NavLink>
              <NavLink
                to="/manage-events"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              >
                <FaUser />
                <span>Manage Events</span>
              </NavLink>
              <NavLink
                to="/joined-events"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              >
                <FaUser />
                <span>Joined Events</span>
              </NavLink>
              <NavLink
                to="/auth/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              >
                <FaUser />
                <span>Profile</span>
              </NavLink>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-red-600 hover:text-red-700 bg-red-50 dark:bg-gray-800 transition"
              >
                <CgLogIn />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
