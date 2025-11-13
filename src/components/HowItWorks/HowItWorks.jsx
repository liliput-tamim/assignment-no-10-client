import { FaUserPlus, FaSearch, FaHandshake, FaGraduationCap } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create Your Profile",
      description: "Sign up and create a detailed profile with your subjects, skills, and learning preferences.",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconBg: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      icon: <FaSearch />,
      title: "Find Study Partners",
      description: "Browse through profiles and find partners who match your academic interests and goals.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconBg: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      icon: <FaHandshake />,
      title: "Connect & Collaborate",
      description: "Send connection requests and start collaborating with your study partners.",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconBg: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
      icon: <FaGraduationCap />,
      title: "Achieve Success",
      description: "Work together, share knowledge, and achieve your academic goals through collaborative learning.",
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      iconBg: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get started with StudyMate in just four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 z-0"></div>
              )}
              
              <div className={`${step.bgColor} rounded-2xl p-8 text-center relative hover:scale-105 transition-all duration-300 hover:shadow-xl border border-white/50 dark:border-gray-700/50 backdrop-blur-sm`}>
                {/* Step Number */}
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 ${step.iconBg} text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`w-20 h-20 mx-auto mb-6 ${step.iconBg} rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:rotate-6 transition-all duration-300`}>
                  {step.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;