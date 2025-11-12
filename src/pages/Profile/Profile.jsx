import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-indigo-600 px-8 py-12 text-center">
            <div className="mb-6">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-full mx-auto bg-white flex items-center justify-center">
                  <FaUser className="text-4xl text-indigo-600" />
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-indigo-100">Manage your account information</p>
          </div>
          
          <div className="px-8 py-8">
            {user ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <FaUser className="text-indigo-600 text-xl" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-lg text-gray-900">{user.displayName || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-indigo-600 text-xl" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <p className="text-lg text-gray-900">{user.email}</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full">
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Please log in to view your profile.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;