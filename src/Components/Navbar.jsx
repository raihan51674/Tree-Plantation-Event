import { useContext, useEffect, useRef, useState } from 'react';
import { CgLogIn } from 'react-icons/cg';
import { FaAngleDown, FaFirefoxBrowser, FaHome, FaUser } from 'react-icons/fa';
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

  // links visible for everyone
  const commonLinks = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/upcomingEvents', label: 'Upcoming Events', icon: <FaFirefoxBrowser /> },
  ];

  // links shown inside profile dropdown (logged-in)
  const profileLinks = [
    { to: '/create-event', label: 'Create Event' },
    { to: '/manage-events', label: 'Manage Events' },
    { to: '/joined-events', label: 'Joined Events' },
    { to: '/auth/profile', label: 'Profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 shadow-lg dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={scrollToTop}
          className="text-2xl font-bold text-blue-700 dark:text-white"
        >
          Tree<span className="text-gray-800 dark:text-gray-300">Plantation</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {commonLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition hover:text-blue-600 ${
                  isActive ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}

          {/* Dark/Light toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded text-sm text-black dark:text-white"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Auth area */}
          {!UserData ? (
            // ---------- Logged-out ----------
            <NavLink
              to="/auth/login"
              className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              <CgLogIn />
              <span>Login</span>
            </NavLink>
          ) : (
            // ---------- Logged-in ----------
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(prev => !prev)}
                className="flex items-center focus:outline-none"
                aria-haspopup="true"
                aria-expanded={profileOpen}
              >
                <img
                  src={UserData.photoURL || '/default-avatar.png'}
                  alt={UserData.displayName || 'User'}
                  className="w-10 h-10 rounded-full border-2 border-blue-500 shadow cursor-pointer"
                />
                <FaAngleDown className="ml-1 text-gray-600 dark:text-gray-300" />
              </button>

              {/* dropdown */}
              {profileOpen && (
                <div className="absolute right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md mt-2 w-48 py-2 animate-fadeIn">
                  {profileLinks.map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {label}
                    </NavLink>
                  ))}
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-black dark:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <IoCloseSharp size={26} /> : <IoMdMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 shadow-lg ${
          open ? 'max-h-screen py-4 px-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col space-y-3">
          {commonLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition hover:text-blue-600 ${
                  isActive ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}

          {/* Dark/Light toggle mobile */}
          <button
            onClick={() => {
              toggleTheme();
              setOpen(false);
            }}
            aria-label="Toggle dark mode"
            className=" px-3 py-2 rounded-md font-medium text-sm text-left text-black dark:text-white"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>

          {!UserData ? (
            // ------- logged-out -------
            <NavLink
              to="/auth/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              <CgLogIn />
              <span>Login</span>
            </NavLink>
          ) : (
            // ------- logged-in -------
            <>
              {profileLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600"
                >
                  <FaUser />
                  <span>{label}</span>
                </NavLink>
              ))}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-red-600 hover:text-red-700"
              >
                <CgLogIn />
                <span>Sign Out</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
