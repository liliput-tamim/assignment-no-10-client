import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../Logo/Logo';

const Header = () => {
  const { user, logout } = useAuth();
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
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/find-partners" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Find Partners
            </Link>
            
            {user ? (
              <>
                <Link to="/create-profile" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  Create Partner Profile
                </Link>
                <Link to="/my-connections" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  My Connections
                </Link>
                
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
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link 
                        to="/profile" 
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
            >
              {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link 
                to="/" 
                className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/find-partners" 
                className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Partners
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/create-profile" 
                    className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Create Partner Profile
                  </Link>
                  <Link 
                    to="/my-connections" 
                    className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Connections
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    Logout
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