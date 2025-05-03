import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './components/layout/AdminLayout';
import UserLayout from './components/layout/UserLayout';
import Dashboard from './pages/admin/Dashboard';
import Posts from './pages/admin/Posts';
import Home from './pages/user/Home';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<Posts />} />
          <Route path="users" element={<div>Users Management</div>} />
          <Route path="settings" element={<div>Settings</div>} />
        </Route>

        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="posts" element={<div>Posts</div>} />
          <Route path="about" element={<div>About</div>} />
          <Route path="contact" element={<div>Contact</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
