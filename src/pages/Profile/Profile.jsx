import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-indigo-600 px-8 py-12 text-center">
            <div className="mb-6">
              {(isEditing ? formData.photoURL : user?.photoURL) ? (
                <img 
                  src={isEditing ? formData.photoURL : user.photoURL} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-24 h-24 rounded-full mx-auto bg-white flex items-center justify-center" style={{display: (isEditing ? formData.photoURL : user?.photoURL) ? 'none' : 'flex'}}>
                <FaUser className="text-4xl text-indigo-600" />
              </div>
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
                    <p className="text-lg text-gray-900">{isEditing ? formData.displayName || 'Not provided' : user.displayName || 'Not provided'}</p>
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
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors w-full flex items-center justify-center space-x-2"
                    >
                      <FaEdit />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                        <input
                          type="text"
                          value={formData.displayName}
                          onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter your display name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo URL</label>
                        <input
                          type="url"
                          value={formData.photoURL}
                          onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter photo URL"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSaveProfile}
                          disabled={loading}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                        >
                          <FaSave />
                          <span>{loading ? 'Saving...' : 'Save'}</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              displayName: user?.displayName || '',
                              photoURL: user?.photoURL || ''
                            });
                          }}
                          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <FaTimes />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  )}
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