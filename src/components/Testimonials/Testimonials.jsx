import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "Engineering Student",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "StudyMate helped me find amazing study partners for my engineering courses. My grades improved significantly!",
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
    },
    {
      id: 2,
      name: "Jessica Kim",
      role: "Medical Student",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The platform is incredibly user-friendly. I've made lasting friendships and academic connections through StudyMate.",
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
    },
    {
      id: 3,
      name: "David Thompson",
      role: "Business Student",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Finding study partners with similar schedules and learning styles has never been easier. Highly recommend!",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20 transition-colors relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our amazing community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`group relative bg-gradient-to-br ${testimonial.bgGradient} rounded-2xl p-8 hover:scale-105 transition-all duration-500 h-full flex flex-col border border-white/50 dark:border-gray-700/50 backdrop-blur-sm shadow-xl hover:shadow-2xl`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon with Gradient */}
              <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                <FaQuoteLeft className="text-white text-xl" />
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6 italic text-lg flex-grow font-medium">
                "{testimonial.text}"
              </p>
              
              {/* Rating Stars */}
              <div className="flex items-center mb-6 justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className="text-yellow-400 text-lg mx-0.5 group-hover:scale-110 transition-transform duration-300" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              
              {/* User Info */}
              <div className="flex items-center mt-auto">
                <div className="relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover mr-4 ring-4 ring-white/50 group-hover:ring-white/80 transition-all duration-300"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r ${testimonial.gradient} rounded-full border-2 border-white`}></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{testimonial.role}</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-r ${testimonial.gradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className={`absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r ${testimonial.gradient} rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Ready to join our community of successful students?
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;