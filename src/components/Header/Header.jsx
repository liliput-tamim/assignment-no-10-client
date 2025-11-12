import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FaUserCircle, FaChevronDown, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import Logo from '../Logo/Logo';

const Header = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/find-partners" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium transition-colors">
              Find Partners
            </Link>
            
            {user ? (
              <>
                <Link to="/create-profile" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium transition-colors">
                  Create Partner Profile
                </Link>
                <Link to="/my-connections" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium transition-colors">
                  My Connections
                </Link>
                
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <FaSun className="w-5 h-5 text-yellow-500" /> : <FaMoon className="w-5 h-5 text-gray-600" />}
                </button>
                
                <div className="relative">
                  <button 
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <FaUserCircle className="w-8 h-8 text-gray-600" />
                    )}
                    <FaChevronDown className="w-3 h-3 text-gray-600" />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                      <Link 
                        to="/profile" 
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
            >
              {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
              <Link 
                to="/" 
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/find-partners" 
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Partners
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/create-profile" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Create Partner Profile
                  </Link>
                  <Link 
                    to="/my-connections" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Connections
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium"
                  >
                    Logout
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 font-medium"
                  >
                    {isDark ? <FaSun className="w-4 h-4 mr-2" /> : <FaMoon className="w-4 h-4 mr-2" />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium mx-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;