import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaStar, FaMapMarkerAlt, FaClock, FaGraduationCap, FaUsers } from 'react-icons/fa';
import axios from 'axios';

const PartnerDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    fetchPartnerDetails();
  }, [id]);

  const fetchPartnerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/partners/${id}`);
      setPartner(response.data);
    } catch (error) {
      console.error('Error fetching partner details:', error);
      // Mock data for development
      setPartner({
        _id: id,
        name: 'Sarah Johnson',
        profileimage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
        subject: 'Mathematics',
        studyMode: 'Online',
        availabilityTime: 'Evening 6-9 PM',
        location: 'Dhaka, Bangladesh',
        experienceLevel: 'Intermediate',
        rating: 4.8,
        patnerCount: 15,
        email: 'sarah@example.com'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async () => {
    if (!user) {
      toast.error('Please login to send partner request');
      return;
    }

    setRequesting(true);
    try {
      const token = await user.getIdToken();
      
      // Send partner request
      await axios.post('http://localhost:4000/requests', {
        partnerId: partner._id,
        message: `I would like to study ${partner.subject} with you.`
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Increment partner count


      toast.success('Partner request sent successfully!');
      setPartner(prev => ({ ...prev, patnerCount: prev.patnerCount + 1 }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send partner request');
      console.error(error);
    } finally {
      setRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Partner Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The partner profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-indigo-600 px-8 py-12 text-center">
            <img
              src={partner.profileimage}
              alt={partner.name}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white mb-6"
            />
            <h1 className="text-3xl font-bold text-white mb-2">{partner.name}</h1>
            <p className="text-indigo-100 text-lg">{partner.subject}</p>
            <div className="flex items-center justify-center mt-4">
              <FaStar className="text-yellow-400 mr-2" />
              <span className="text-white font-semibold">{partner.rating}</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="px-8 py-8 dark:bg-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaGraduationCap className="text-indigo-600 text-xl" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience Level</p>
                    <p className="text-lg text-gray-900 dark:text-white">{partner.experienceLevel}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaClock className="text-indigo-600 text-xl" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Availability</p>
                    <p className="text-lg text-gray-900">{partner.availabilityTime}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-indigo-600 text-xl" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Location</p>
                    <p className="text-lg text-gray-900">{partner.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">M</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Study Mode</p>
                    <p className="text-lg text-gray-900">{partner.studyMode}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaUsers className="text-indigo-600 text-xl" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Partner Count</p>
                    <p className="text-lg text-gray-900">{partner.patnerCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={handleSendRequest}
                disabled={requesting || partner.email === user?.email}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {requesting ? 'Sending Request...' : 'Send Partner Request'}
              </button>
              {partner.email === user?.email && (
                <p className="text-sm text-gray-500 mt-2">This is your own profile</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;