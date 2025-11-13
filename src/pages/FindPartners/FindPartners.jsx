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

  const getPartnerGradient = (index) => {
    const gradients = [
      { gradient: 'from-pink-500 to-rose-500', bg: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20' },
      { gradient: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' },
      { gradient: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' },
      { gradient: 'from-purple-500 to-indigo-500', bg: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20' },
      { gradient: 'from-orange-500 to-red-500', bg: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20' },
      { gradient: 'from-teal-500 to-cyan-500', bg: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20' }
    ];
    return gradients[index % gradients.length];
  };

  const fetchPartners = async () => {
    try {
      const response = await axios.get('http://localhost:4000/partners');
      const partnersData = response.data || [];
      
      // Transform backend data to match frontend format
      const transformedData = partnersData.map((partner, index) => ({
        _id: partner._id,
        name: partner.name,
        profileimage: partner.profileimage || `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=4f46e5&color=fff&size=150`,
        subject: partner.subject,
        studyMode: partner.studyMode || 'Online',
        experienceLevel: partner.experienceLevel,
        ...getPartnerGradient(index)
      }));
      
      setPartners(transformedData);
    } catch (error) {
      console.error('Error fetching partners:', error);
      setPartners([]);
    } finally {
      setLoading(false);
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading partners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Find Study Partners
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover amazing study partners who share your academic interests and goals
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transition-colors">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by subject, name, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <FaSort className="text-gray-500 dark:text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-w-[140px]"
                >
                  <option value="">Sort By</option>
                  <option value="name">Name</option>
                  <option value="experience">Experience</option>
                </select>
              </div>
              
              {(searchTerm || sortBy) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSortBy('');
                  }}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{filteredPartners.length} partner{filteredPartners.length !== 1 ? 's' : ''} found</span>
            {searchTerm && (
              <span>Searching for: <span className="font-medium text-indigo-600 dark:text-indigo-400">"{searchTerm}"</span></span>
            )}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <div key={partner._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={partner.profileimage}
                    alt={partner.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-indigo-100 dark:ring-indigo-900 group-hover:ring-indigo-200 dark:group-hover:ring-indigo-800 transition-all duration-300"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=4f46e5&color=fff&size=150`;
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{partner.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full inline-block">{partner.subject}</p>
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Mode: <span className="font-medium">{partner.studyMode}</span></p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Level: <span className="font-medium">{partner.experienceLevel}</span></p>
                </div>
                <button
                  onClick={() => handleViewProfile(partner._id)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors group-hover:scale-105 duration-300"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <FaSearch className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Partners Found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search terms or clear filters to see all partners.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSortBy('');
                }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Show All Partners
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPartners;