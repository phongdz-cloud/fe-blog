import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import UserLayout from './components/layout/UserLayout';
import Dashboard from './pages/admin/Dashboard';
import Home from './pages/user/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<div>Posts Management</div>} />
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
