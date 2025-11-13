import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';
import UpdateModal from '../../components/UpdateModal/UpdateModal';

const MyConnections = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  useEffect(() => {
    fetchConnections();
  }, [user]);

  const fetchConnections = async () => {
    try {
      const userEmail = user?.email || 'anonymous@example.com';
      console.log('🔍 Fetching connections for email:', userEmail);
      
      // First check all requests in database
      try {
        const allRequests = await axios.get('http://localhost:4000/requests/all');
        console.log('📊 All requests in database:', allRequests.data);
      } catch (debugError) {
        console.log('Could not fetch all requests for debugging');
      }
      
      const response = await axios.get(`http://localhost:4000/requests/${userEmail}`);
      console.log('✅ API response for user:', response.data);
      console.log('📈 Number of requests found:', response.data.length);
      
      if (response.data.length === 0) {
        console.log('⚠️ No requests found for this user');
        setConnections([]);
        return;
      }
      
      // Transform the data to match the expected format
      const transformedConnections = response.data.map((request, index) => {
        console.log(`🔄 Transforming request ${index + 1}:`, request);
        return {
          _id: request._id,
          partnerName: request.partnerDetails?.name || 'Unknown Partner',
          partnerImage: request.partnerDetails?.profileimage || `https://ui-avatars.com/api/?name=${encodeURIComponent(request.partnerDetails?.name || 'Unknown')}&background=4f46e5&color=fff&size=150`,
          subject: request.partnerDetails?.subject || 'Unknown Subject',
          studyMode: request.partnerDetails?.studyMode || 'Unknown Mode',
          partnerId: request.partnerId,
          message: request.message,
          status: request.status
        };
      });
      
      console.log('🎯 Final transformed connections:', transformedConnections);
      setConnections(transformedConnections);
    } catch (error) {
      console.error('❌ Error fetching connections:', error);
      console.error('Error details:', error.response?.data);
      setConnections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (connectionId) => {
    if (window.confirm('Are you sure you want to delete this connection?')) {
      try {
        await axios.delete(`http://localhost:4000/requests/${connectionId}`);
        setConnections(connections.filter(conn => conn._id !== connectionId));
        toast.success('Connection deleted successfully!');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete connection');
        console.error(error);
      }
    }
  };

  const handleUpdate = (connection) => {
    setSelectedConnection(connection);
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = (updatedConnection) => {
    // Refresh connections after update
    fetchConnections();
    setShowUpdateModal(false);
    setSelectedConnection(null);
    toast.success('Connection updated successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          My Connections
        </h1>

        {connections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No connections found. Start by sending partner requests!</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Partner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Study Mode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {connections.map((connection) => (
                    <tr key={connection._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={connection.partnerImage}
                            alt={connection.partnerName}
                            className="w-10 h-10 rounded-full object-cover mr-4"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(connection.partnerName)}&background=4f46e5&color=fff&size=150`;
                            }}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {connection.partnerName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{connection.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {connection.studyMode}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleUpdate(connection)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center"
                        >
                          <FaEdit className="mr-1" />
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(connection._id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 inline-flex items-center"
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Update Modal */}
        {showUpdateModal && selectedConnection && (
          <UpdateModal
            connection={selectedConnection}
            onClose={() => {
              setShowUpdateModal(false);
              setSelectedConnection(null);
            }}
            onSuccess={handleUpdateSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default MyConnections;