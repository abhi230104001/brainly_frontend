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
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Router>
        <ToastContainer />
      </ItemProvider>
    </AuthProvider>
  );
}

export default App;
