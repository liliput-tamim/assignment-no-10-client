import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './pages/Home/Home';
import FindPartners from './pages/FindPartners/FindPartners';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import MyConnections from './pages/MyConnections/MyConnections';
import PartnerDetails from './pages/PartnerDetails/PartnerDetails';
import NotFound from './pages/NotFound/NotFound';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/find-partners" element={<FindPartners />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/create-profile" element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
              <Route path="/my-connections" element={<PrivateRoute><MyConnections /></PrivateRoute>} />
              <Route path="/partner/:id" element={<PrivateRoute><PartnerDetails /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;