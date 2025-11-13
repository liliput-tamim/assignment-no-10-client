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
      const response = await axios.get('http://localhost:4000/partners/top-rated');
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
          rating: 4.8,
          gradient: 'from-pink-500 to-rose-500',
          bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20'
        },
        {
          _id: '2',
          name: 'Mike Chen',
          profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          subjects: ['Computer Science', 'Programming'],
          skills: ['JavaScript', 'Python'],
          rating: 4.9,
          gradient: 'from-blue-500 to-cyan-500',
          bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
        },
        {
          _id: '3',
          name: 'Emily Davis',
          profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          subjects: ['Biology', 'Chemistry'],
          skills: ['Research', 'Lab Work'],
          rating: 4.7,
          gradient: 'from-green-500 to-emerald-500',
          bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
        },
        {
          _id: '4',
          name: 'Alex Rodriguez',
          profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          subjects: ['Engineering', 'Calculus'],
          skills: ['CAD Design', 'Analysis'],
          rating: 4.6,
          gradient: 'from-purple-500 to-indigo-500',
          bgGradient: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20'
        },
        {
          _id: '5',
          name: 'Lisa Wang',
          profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          subjects: ['Economics', 'Statistics'],
          skills: ['Data Analysis', 'Research'],
          rating: 4.8,
          gradient: 'from-orange-500 to-red-500',
          bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
        },
        {
          _id: '6',
          name: 'David Kim',
          profileImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
          subjects: ['History', 'Literature'],
          skills: ['Writing', 'Critical Thinking'],
          rating: 4.5,
          gradient: 'from-teal-500 to-cyan-500',
          bgGradient: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20'
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
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900/30 transition-colors relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            ⭐ Top Study Partners
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with our highest-rated study partners and accelerate your learning journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {partners.map((partner, index) => (
            <div 
              key={partner._id} 
              className={`group relative bg-gradient-to-br ${partner.bgGradient || 'from-white to-gray-50 dark:from-gray-800 dark:to-gray-700'} rounded-2xl p-8 hover:scale-105 transition-all duration-500 h-full flex flex-col text-center shadow-xl hover:shadow-2xl border border-white/50 dark:border-gray-700/50 backdrop-blur-sm`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rank Badge */}
              <div className={`absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r ${partner.gradient || 'from-indigo-500 to-purple-500'} text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                #{index + 1}
              </div>
              
              {/* Profile Image with Gradient Ring */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-r ${partner.gradient || 'from-indigo-500 to-purple-500'} rounded-full p-1 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="bg-white dark:bg-gray-800 rounded-full p-1">
                    <img 
                      src={partner.profileImage} 
                      alt={partner.name} 
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=4f46e5&color=fff&size=150`;
                      }}
                    />
                  </div>
                </div>
                <div className={`absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r ${partner.gradient || 'from-indigo-500 to-purple-500'} rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center`}>
                  <FaStar className="text-white text-xs" />
                </div>
              </div>
              
              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {partner.name}
              </h3>
              
              {/* Subjects */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {partner.subjects?.map((subject, idx) => (
                  <span 
                    key={idx} 
                    className={`bg-gradient-to-r ${partner.gradient || 'from-indigo-500 to-purple-500'} text-white text-sm font-medium px-3 py-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    {subject}
                  </span>
                ))}
              </div>
              
              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {partner.skills?.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Rating */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`text-lg ${
                        i < Math.floor(partner.rating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-300 dark:text-gray-600'
                      } group-hover:scale-110 transition-transform duration-300`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-lg">
                  {partner.rating}
                </span>
              </div>
              
              {/* View Profile Button */}
              <button 
                className={`bg-gradient-to-r ${partner.gradient || 'from-indigo-600 to-purple-600'} text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 w-full mt-auto group-hover:from-indigo-700 group-hover:to-purple-700`}
                onClick={() => handleViewProfile(partner._id)}
              >
                View Profile
              </button>
              
              {/* Decorative Elements */}
              <div className={`absolute top-4 left-4 w-2 h-2 bg-gradient-to-r ${partner.gradient || 'from-indigo-400 to-purple-400'} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className={`absolute bottom-4 right-4 w-1 h-1 bg-gradient-to-r ${partner.gradient || 'from-pink-400 to-rose-400'} rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
        
        {/* View All Partners Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/find-partners')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Partners →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopPartners;