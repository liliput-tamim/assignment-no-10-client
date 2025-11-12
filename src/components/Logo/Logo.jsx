import { FaGraduationCap } from 'react-icons/fa';

const Logo = ({ className = "text-2xl font-bold text-indigo-600" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <FaGraduationCap className="text-3xl" />
      <span>StudyMate</span>
    </div>
  );
};

export default Logo;