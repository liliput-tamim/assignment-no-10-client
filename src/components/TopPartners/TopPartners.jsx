import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const TopPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopPartners();
  }, []);

  const fetchTopPartners = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/partners/top');
      setPartners(response.data);
    } catch (error) {
      console.error('Error fetching partners:', error);
      setPartners([
        {
          _id: '1',
          name: 'Sarah Johnson',
          profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          subjects: ['Mathematics', 'Physics'],
          skills: ['Problem Solving', 'Tutoring'],
          rating: 4.8
        },
        {
          _id: '2',
          name: 'Mike Chen',
          profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          subjects: ['Computer Science', 'Programming'],
          skills: ['JavaScript', 'Python'],
          rating: 4.9
        },
        {
          _id: '3',
          name: 'Emily Davis',
          profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          subjects: ['Biology', 'Chemistry'],
          skills: ['Research', 'Lab Work'],
          rating: 4.7
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (partnerId) => {
    if (!user) {
      sessionStorage.setItem('redirectPath', `/partner/${partnerId}`);
      navigate('/login');
      return;
    }
    navigate(`/partner/${partnerId}`);
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="text-xl text-gray-600">Loading top partners...</div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Top Study Partners
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {partners.map((partner) => (
            <div key={partner._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col text-center">
              <img 
                src={partner.profileImage} 
                alt={partner.name} 
                className="w-20 h-20 rounded-full object-cover mx-auto mb-6"
              />
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{partner.name}</h3>
              
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {partner.subjects.map((subject, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {subject}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {partner.skills.map((skill, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold text-gray-900 dark:text-white">{partner.rating}</span>
              </div>
              
              <button 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full mt-auto"
                onClick={() => handleViewProfile(partner._id)}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPartners;