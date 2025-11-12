import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          <div className="max-w-md">
            <Logo className="text-2xl font-bold text-indigo-400 mb-4" />
            <p className="text-gray-300 leading-relaxed">
              Connect with perfect study partners and enhance your learning experience through collaborative education.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors text-2xl">
              <FaXTwitter />
            </a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors text-2xl">
              <FaLinkedin />
            </a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors text-2xl">
              <FaInstagram />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 dark:border-gray-600 mt-8 pt-6 text-center">
          <p className="text-gray-400">&copy; 2024 StudyMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;