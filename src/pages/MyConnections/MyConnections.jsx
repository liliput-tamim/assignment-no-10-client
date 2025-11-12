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
      const token = await user.getIdToken();
      const response = await axios.get('http://localhost:3001/api/partner-requests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setConnections(response.data.requests || response.data);
    } catch (error) {
      console.error('Error fetching connections:', error);
      // Mock data for development
      setConnections([
        {
          _id: '1',
          partnerName: 'Sarah Johnson',
          partnerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          subject: 'Mathematics',
          studyMode: 'Online',
          partnerId: '1'
        },
        {
          _id: '2',
          partnerName: 'Mike Chen',
          partnerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          subject: 'Programming',
          studyMode: 'Offline',
          partnerId: '2'
        },
        {
          _id: '3',
          partnerName: 'Emily Davis',
          partnerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          subject: 'Biology',
          studyMode: 'Online',
          partnerId: '3'
        },
        {
          _id: '4',
          partnerName: 'Ahmed Hassan',
          partnerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          subject: 'Physics',
          studyMode: 'Offline',
          partnerId: '4'
        },
        {
          _id: '5',
          partnerName: 'Lisa Wang',
          partnerImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          subject: 'Chemistry',
          studyMode: 'Online',
          partnerId: '5'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (connectionId) => {
    if (window.confirm('Are you sure you want to delete this connection?')) {
      try {
        const token = await user.getIdToken();
        await axios.delete(`http://localhost:3001/api/partner-requests/${connectionId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
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
    setConnections(connections.map(conn => 
      conn._id === updatedConnection._id ? updatedConnection : conn
    ));
    setShowUpdateModal(false);
    setSelectedConnection(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          My Connections
        </h1>

        {connections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No connections found. Start by sending partner requests!</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Partner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Study Mode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {connections.map((connection) => (
                    <tr key={connection._id} className="hover:bg-gray-50">
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
                            <div className="text-sm font-medium text-gray-900">
                              {connection.partnerName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{connection.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {connection.studyMode}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleUpdate(connection)}
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                        >
                          <FaEdit className="mr-1" />
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(connection._id)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center"
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