import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaSort } from 'react-icons/fa';
import axios from 'axios';

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    filterAndSortPartners();
  }, [partners, searchTerm, sortBy]);

  const fetchPartners = async () => {
    // Set loading to false immediately and show mock data
    setLoading(false);
    
    // Mock data for development (always available)
    const mockData = [
        {
          _id: '1',
          name: 'Sarah Johnson',
          profileimage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          subject: 'Mathematics',
          studyMode: 'Online',
          experienceLevel: 'Intermediate'
        },
        {
          _id: '2',
          name: 'Mike Chen',
          profileimage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          subject: 'Programming',
          studyMode: 'Offline',
          experienceLevel: 'Expert'
        },
        {
          _id: '3',
          name: 'Emily Davis',
          profileimage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          subject: 'Biology',
          studyMode: 'Online',
          experienceLevel: 'Beginner'
        },
        {
          _id: '4',
          name: 'John Smith',
          profileimage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          subject: 'Physics',
          studyMode: 'Offline',
          experienceLevel: 'Expert'
        },
        {
          _id: '5',
          name: 'Lisa Wang',
          profileimage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          subject: 'Chemistry',
          studyMode: 'Online',
          experienceLevel: 'Intermediate'
        },
        {
          _id: '6',
          name: 'Ahmed Hassan',
          profileimage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          subject: 'English',
          studyMode: 'Offline',
          experienceLevel: 'Beginner'
        },
        {
          _id: '7',
          name: 'Maria Garcia',
          profileimage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
          subject: 'History',
          studyMode: 'Online',
          experienceLevel: 'Expert'
        },
        {
          _id: '8',
          name: 'David Kim',
          profileimage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
          subject: 'Economics',
          studyMode: 'Offline',
          experienceLevel: 'Intermediate'
        },
        {
          _id: '9',
          name: 'Anna Petrov',
          profileimage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
          subject: 'Art',
          studyMode: 'Online',
          experienceLevel: 'Beginner'
        },
        {
          _id: '10',
          name: 'Carlos Rodriguez',
          profileimage: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
          subject: 'Geography',
          studyMode: 'Offline',
          experienceLevel: 'Expert'
        },
        {
          _id: '11',
          name: 'Fatima Ali',
          profileimage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
          subject: 'Psychology',
          studyMode: 'Online',
          experienceLevel: 'Intermediate'
        },
        {
          _id: '12',
          name: 'James Wilson',
          profileimage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
          subject: 'Philosophy',
          studyMode: 'Offline',
          experienceLevel: 'Beginner'
        }
      ];
    
    setPartners(mockData);
    
    // Try to fetch from API in background
    try {
      const response = await axios.get('http://localhost:3001/api/profiles');
      const partnersData = response.data.profiles || response.data || [];
      if (partnersData.length > 0) {
        setPartners(partnersData);
      }
    } catch (error) {
      console.log('API not available, using mock data');
    }
  };

  const filterAndSortPartners = () => {
    let filtered = partners.filter(partner =>
      partner.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'experience') {
      const experienceOrder = { 'Beginner': 1, 'Intermediate': 2, 'Expert': 3 };
      filtered.sort((a, b) => experienceOrder[a.experienceLevel] - experienceOrder[b.experienceLevel]);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredPartners(filtered);
  };

  const handleViewProfile = (partnerId) => {
    navigate(`/partner/${partnerId}`);
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
          Find Study Partners
        </h1>

        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <FaSort className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="experience">Experience Level</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by subject or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <div key={partner._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <img
                  src={partner.profileimage}
                  alt={partner.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{partner.name}</h3>
                <p className="text-indigo-600 font-medium mb-2">{partner.subject}</p>
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Mode: {partner.studyMode}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Level: {partner.experienceLevel}</p>
                </div>
                <button
                  onClick={() => handleViewProfile(partner._id)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <FaSearch className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Partners Found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">We couldn't find any study partners matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSortBy('');
                }}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPartners;