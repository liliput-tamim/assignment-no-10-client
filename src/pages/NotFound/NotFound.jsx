import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-indigo-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <FaHome className="mr-2" />
            Go Back Home
          </Link>
          
          <Link
            to="/find-partners"
            className="inline-flex items-center justify-center w-full bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
          >
            <FaSearch className="mr-2" />
            Find Study Partners
          </Link>
        </div>

        <div className="mt-12">
          <div className="text-6xl mb-4">🎓</div>
          <p className="text-gray-500 text-sm">
            Don't worry, there are plenty of study partners waiting for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;