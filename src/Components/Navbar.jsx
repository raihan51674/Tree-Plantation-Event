import { useContext, useEffect, useRef, useState } from 'react';
import { CgLogIn } from 'react-icons/cg';
import { FaAngleDown, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Authantication/Context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { SignOutUser, UserData, darkMode, setDarkMode } = useContext(AuthContext);

  const profileRef = useRef(null);

  // Close profile dropdown on outside click
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500
      ${darkMode ? 'bg-gray-900 border-b border-gray-800 shadow-lg' : 'bg-white border-b border-gray-200 shadow-md'}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={scrollToTop}
          className={`flex items-center gap-2 text-3xl font-extrabold tracking-tight select-none
            ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-700 hover:text-green-600'}`}
          aria-label="Home"
        >
          <span>Green</span>
          <span className="font-light">Earth</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/upcomingEvents"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-lg
              transition-colors duration-300
              ${
                isActive
                  ? darkMode
                    ? 'bg-green-700 text-white shadow-lg'
                    : 'bg-green-100 text-green-700 shadow-md'
                  : darkMode
                  ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                  : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
              }`
            }
            aria-current="page"
          >
            <FaCalendarAlt className="text-xl" />
            Upcoming Events
          </NavLink>

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-3 rounded-lg cursor-pointer select-none
            transition-colors duration-300
            ${
              darkMode
                ? 'text-yellow-400 hover:bg-gray-800'
                : 'text-gray-700 hover:bg-green-100'
            }
            `}
          >
            <span
              className={`text-2xl transition-transform duration-500 ${
                darkMode ? 'rotate-0' : 'rotate-12'
              }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </span>
          </button>

          {/* Auth Area */}
          {!UserData ? (
            <NavLink
              to="/auth/login"
              className={`flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full
                font-semibold shadow-lg transition-transform duration-300
                hover:scale-105 select-none`}
            >
              <CgLogIn className="text-2xl" />
              Login
            </NavLink>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(prev => !prev)}
                className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-shadow"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                aria-label="User menu"
              >
                <img
                  src={UserData.photoURL || '/default-avatar.png'}
                  alt={UserData.displayName || 'User'}
                  className="w-11 h-11 rounded-full border-2 border-green-500 object-cover shadow-md"
                  draggable={false}
                />
                <FaAngleDown
                  className={`text-green-400 transition-transform duration-300 ${
                    profileOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  size={18}
                  aria-hidden="true"
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div
                  className={`absolute right-0 mt-3 w-60 rounded-xl bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700 shadow-2xl
                    ring-1 ring-black ring-opacity-5
                    transition-opacity duration-300 opacity-100 z-50`}
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {UserData.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {UserData.email}
                    </p>
                  </div>
                  <nav className="flex flex-col py-2 text-gray-700 dark:text-gray-300">
                    {[
                      { name: 'Create Event', to: '/create-event' },
                      { name: 'Manage Events', to: '/manage-events' },
                      { name: 'Joined Events', to: '/joined-events' },
                      { name: 'Profile', to: '/auth/profile' },
                    ].map(({ name, to }) => (
                      <NavLink
                        key={to}
                        to={to}
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-green-600 hover:text-white transition-colors rounded-lg"
                      >
                        {name}
                      </NavLink>
                    ))}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </nav>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`md:hidden p-3 rounded-lg transition-colors duration-300
            ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          {open ? <IoCloseSharp size={28} /> : <IoMdMenu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-20 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg
          overflow-hidden transition-[max-height] duration-300 ease-in-out
          ${open ? 'max-h-screen py-5' : 'max-h-0'}`}
        style={{ zIndex: 49 }}
      >
        <div className="flex flex-col px-5 space-y-3">
          <NavLink
            to="/upcomingEvents"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold
              transition-colors duration-200
              ${
                isActive
                  ? darkMode
                    ? 'bg-green-700 text-white shadow-inner'
                    : 'bg-green-100 text-green-700 shadow-inner'
                  : darkMode
                  ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                  : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
              }`
            }
          >
            <FaCalendarAlt />
            Upcoming Events
          </NavLink>

          <button
            onClick={toggleTheme}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200
              ${
                darkMode
                  ? 'text-yellow-400 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-green-100'
              }`}
          >
            {darkMode ? '☀️' : '🌙'}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {!UserData ? (
            <NavLink
              to="/auth/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 text-white transition-transform duration-300 hover:scale-105"
            >
              <CgLogIn size={22} />
              Login
            </NavLink>
          ) : (
            <>
              {[
                { name: 'Create Event', to: '/create-event' },
                { name: 'Manage Events', to: '/manage-events' },
                { name: 'Joined Events', to: '/joined-events' },
                { name: 'Profile', to: '/auth/profile' },
              ].map(({ name, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-green-600 hover:text-white transition-colors"
                >
                  <FaUser size={20} />
                  {name}
                </NavLink>
              ))}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-red-600 hover:bg-red-600 hover:text-white transition-colors"
              >
                <CgLogIn size={22} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
