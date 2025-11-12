import { FaUserPlus, FaSearch, FaHandshake, FaGraduationCap } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create Your Profile",
      description: "Sign up and create a detailed profile with your subjects, skills, and learning preferences."
    },
    {
      icon: <FaSearch />,
      title: "Find Study Partners",
      description: "Browse through profiles and find partners who match your academic interests and goals."
    },
    {
      icon: <FaHandshake />,
      title: "Connect & Collaborate",
      description: "Send connection requests and start collaborating with your study partners."
    },
    {
      icon: <FaGraduationCap />,
      title: "Achieve Success",
      description: "Work together, share knowledge, and achieve your academic goals through collaborative learning."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              
              <div className="text-5xl text-indigo-600 mb-6 flex justify-center">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;