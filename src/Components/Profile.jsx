import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Edit, Check, X, ChevronLeft,Clock,MapPin, Calendar, Settings, Leaf } from 'lucide-react';
import Reval from '../Animation/Reval';
import { AuthContext } from '../Authantication/Context/AuthContext';

const Profile = () => {
  const { UserData, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: UserData?.displayName || '',
    email: UserData?.email || '',
    bio: UserData?.bio || 'Environmental enthusiast passionate about sustainability',
    location: UserData?.location || 'Green Valley'
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Stats for environmental impact
  const userStats = [
    { label: "Trees Planted", value: "42", icon: <Leaf className="h-5 w-5" /> },
    { label: "Events Joined", value: "6", icon: <Check className="h-5 w-5" /> },
    { label: "Volunteer Hours", value: "28", icon: <Clock className="h-5 w-5" /> }
  ];

  return (
    <Reval>
      <div className="min-h-screen dark:from-[#0a2e1a] dark:to-[#052e16] p-4 sm:p-6">
        <Helmet>
          <title>User Profile | Green Initiative</title>
          <meta name="description" content="View and manage your profile" />
        </Helmet>

        <div className="max-w-4xl mx-auto">
          {/* Header with back button and theme toggle */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-[#2E7D32] dark:text-green-300 hover:text-[#1B5E20] dark:hover:text-green-200 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/80 dark:bg-gray-800 shadow-sm hover:bg-[#2E7D32]/10 dark:hover:bg-green-900/30 transition-colors"
              aria-label="Toggle theme"
            >
              <Settings className="h-5 w-5 text-[#2E7D32] dark:text-green-300" />
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Profile Header */}
            <div className="relative bg-gradient-to-r from-[#2E7D32] to-[#4FC3F7] dark:from-[#1B5E20] dark:to-[#0288D1] p-6 sm:p-8 text-center">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                  Eco Warrior
                </span>
              </div>
              
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={UserData?.photoURL || 'https://i.pravatar.cc/150?img=3'}
                  alt={`${UserData?.displayName || 'User'}'s profile`}
                  className="w-24 h-24 rounded-full border-4 border-white/80 shadow-lg object-cover"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-1">
                {UserData?.displayName || 'Green Member'}
              </h1>
              <p className="text-white/90">{UserData?.email}</p>
            </div>

            {/* Profile Content */}
            <div className="p-6 sm:p-8">
              {!isEditing ? (
                <>
                  {/* User Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {userStats.map((stat, index) => (
                      <div key={index} className="bg-[#2E7D32]/5 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                        <div className="flex justify-center text-[#2E7D32] dark:text-green-300 mb-1">
                          {stat.icon}
                        </div>
                        <div className="text-xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#2E7D32] dark:text-green-300 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                        About Me
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {formData.bio}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-full bg-[#4FC3F7]/10 text-[#4FC3F7]">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</h4>
                          <p className="text-gray-800 dark:text-white">{UserData?.displayName}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-full bg-[#4FC3F7]/10 text-[#4FC3F7]">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                          <p className="text-gray-800 dark:text-white">{UserData?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-full bg-[#4FC3F7]/10 text-[#4FC3F7]">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
                          <p className="text-gray-800 dark:text-white">{formData.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-full bg-[#4FC3F7]/10 text-[#4FC3F7]">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</h4>
                          <p className="text-gray-800 dark:text-white">June 2022</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#2E7D32] hover:bg-[#1B5E20] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E7D32] dark:focus:ring-green-300 transition-colors"
                    >
                      <Edit className="h-5 w-5 mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-lg font-semibold text-[#2E7D32] dark:text-green-300 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                    Edit Profile
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[#2E7D32] focus:border-[#2E7D32] dark:focus:ring-green-300 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[#2E7D32] focus:border-[#2E7D32] dark:focus:ring-green-300 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[#2E7D32] focus:border-[#2E7D32] dark:focus:ring-green-300 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-[#2E7D32] focus:border-[#2E7D32] dark:focus:ring-green-300 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 mt-6">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#2E7D32] hover:bg-[#1B5E20] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E7D32] dark:focus:ring-green-300 transition-colors"
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-full shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                      <X className="h-5 w-5 mr-2" />
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reval>
  );
};

export default Profile;