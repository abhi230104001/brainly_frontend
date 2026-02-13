import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ItemProvider } from './context/ItemContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <AuthProvider>
      <ItemProvider>
        <Router>
          <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-gray-100">
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<LandingPage />} />
              </Routes>
            </div>
          </div>
        </Router>
        <ToastContainer />
      </ItemProvider>
    </AuthProvider>
  );
}

export default App;
