import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Reval from '../Animation/Reval';
import { AuthContext } from '../Authantication/Context/AuthContext';

const Profile = () => {
  const { UserData, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: UserData?.displayName || '',
    email: UserData?.email || ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the updateUser function to update the user's data
    updateUser(formData);
    setIsEditing(false); // Close the edit form after submitting
  };

  return (
    <Reval>
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
        <Helmet>
          <title>User Profile</title>
          <meta name="description" content="Track your subscriptions easily." />
        </Helmet>
        <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 p-6 text-white text-center">
            <img
              src={UserData?.photoURL || 'https://i.pravatar.cc/150?img=3'}
              alt={`${UserData?.displayName || 'User'}'s profile`}
              className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md"
            />
            <h2 className="text-2xl font-bold mt-4">
              {UserData?.displayName}
            </h2>
            <p className="text-sm">
              {UserData?.email}
            </p>
          </div>

          {/* Account Information */}
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Account Information</h3>

            {!isEditing ? (
              <>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-800">Full Name</p>
                  <p>{UserData?.displayName}</p>
                </div>

                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-800">Email Address</p>
                  <p>{UserData?.email}</p>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="text-sm text-gray-600 mb-4">
                  <p className="font-medium text-gray-800">Full Name</p>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
                    required
                  />
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <p className="font-medium text-gray-800">Email Address</p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-2 px-6 rounded-full shadow-md"
                  >
                    Save Changes
                  </button>
                  <button
                  >
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Edit and Go Back Buttons */}
          <div className="p-6 pt-0 text-center space-y-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-2 px-6 rounded-full shadow-md"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-2 px-6 rounded-full shadow-md"
              >
                Cancel Edit
              </button>
            )}
            <div>
              <button
                onClick={() => navigate(-1)}
                className="mt-2 text-indigo-600 hover:underline text-sm"
              >
                ← Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </Reval>
  );
};

export default Profile;
